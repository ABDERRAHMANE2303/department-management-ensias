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

        // Verify password using BCrypt (same as admin service)
        boolean passwordMatches = passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getMotDePasseHash()
        );

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
                user.getFormationId()
        );

        // Create response with token and user (password excluded automatically)
        LoginResponse response = new LoginResponse();
        response.setToken(token);

        // Clear password hash before returning user object
        user.setMotDePasseHash(null);
        response.setUser(user);

        return response;
    }
}