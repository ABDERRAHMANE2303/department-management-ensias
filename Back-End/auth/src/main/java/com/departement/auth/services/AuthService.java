package com.departement.auth.services;

import com.departement.auth.dto.LoginRequest;
import com.departement.auth.dto.LoginResponse;
import com.departement.auth.repositories.UtilisateurRepository;
import com.departement.commonmodels.entities.Utilisateur;
import com.departement.commonmodels.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.departement.auth.dto.UserDTO;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UtilisateurRepository utilisateurRepository, JwtUtil jwtUtil) {
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            // Find user by email
            Optional<Utilisateur> userOptional = utilisateurRepository.findByEmail(loginRequest.getEmail());

            if (userOptional.isEmpty()) {
                throw new RuntimeException("User not found");
            }

            Utilisateur user = userOptional.get();

            // Check if account is active
            if (!user.isEstActif()) {
                throw new RuntimeException("Account is disabled");
            }

            // Verify password using BCrypt
            boolean passwordMatches = passwordEncoder.matches(
                    loginRequest.getPassword(),
                    user.getMotDePasseHash());

            if (!passwordMatches) {
                throw new RuntimeException("Invalid credentials");
            }

            // Update last login timestamp
            user.setDerniereConnexion(LocalDateTime.now());
            utilisateurRepository.save(user);

            // Generate JWT token
            String token = jwtUtil.generateToken(
                    user.getId(),
                    user.getEmail(),
                    user.getRole(),
                    user.getDepartementId(),
                    user.getFormationId());

            // Create UserDTO (don't send entity directly)
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setNom(user.getNom());
            userDTO.setPrenom(user.getPrenom());
            userDTO.setEmail(user.getEmail());
            userDTO.setNomUtilisateur(user.getNomUtilisateur());
            userDTO.setRole(user.getRole());
            userDTO.setDepartementId(user.getDepartementId());
            userDTO.setFormationId(user.getFormationId());
            userDTO.setEstActif(user.isEstActif());
            userDTO.setSpecialite(user.getSpecialite());
            userDTO.setTitre(user.getTitre());
            userDTO.setPhone(user.getPhone());
            userDTO.setImage(user.getImage());
            userDTO.setDerniereConnexion(user.getDerniereConnexion());

            // Create response with token and user DTO
            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setUser(userDTO);

            System.out.println("Login attempt for: " + loginRequest.getEmail());
            System.out.println("Password matches: " + passwordMatches);
            System.out.println("Generated token: " + token);

            return response;
        } catch (RuntimeException e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace(); // Add this to see the full stack trace in logs
            throw e; // Re-throw to be handled by controller
        }
    }
}