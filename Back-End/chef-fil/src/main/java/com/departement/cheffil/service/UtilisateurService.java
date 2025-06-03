package com.departement.cheffil.service;

import com.departement.cheffil.dto.UtilisateurDTO;
import com.departement.cheffil.repositories.UtilisateurRepository;
import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    private final String uploadDir = "/app/uploads/";

    public List<UtilisateurDTO> getProfesseursByDepartementId(String departementId) {
        List<Utilisateur> professeurs = utilisateurRepository.findByDepartementIdAndRole(departementId, "prof");
        return professeurs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UtilisateurDTO getUtilisateurById(String id) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        return utilisateur.map(this::convertToDTO).orElse(null);
    }

    public UtilisateurDTO updateUtilisateur(String id, UtilisateurDTO utilisateurDTO) {
        Optional<Utilisateur> existingUtilisateur = utilisateurRepository.findById(id);
        if (existingUtilisateur.isPresent()) {
            Utilisateur utilisateur = existingUtilisateur.get();
            // Preserve role and ID
            String role = utilisateur.getRole();
            utilisateurDTO.setId(id);
            utilisateurDTO.setRole(role);
            
            BeanUtils.copyProperties(utilisateurDTO, utilisateur);
            Utilisateur updatedUtilisateur = utilisateurRepository.save(utilisateur);
            return convertToDTO(updatedUtilisateur);
        }
        return null;
    }

    public String uploadProfileImage(String userId, MultipartFile file) {
        try {
            // Create uploads directory if it doesn't exist
            Files.createDirectories(Paths.get(uploadDir));
            
            // Generate unique filename
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            
            // Save file
            Files.write(filePath, file.getBytes());
            
            // Update user's image path in the database
            Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findById(userId);
            if (utilisateurOpt.isPresent()) {
                Utilisateur utilisateur = utilisateurOpt.get();
                utilisateur.setImage("/api/cf/images/" + fileName);
                utilisateurRepository.save(utilisateur);
                return "/api/cf/images/" + fileName;
            }
            return null;
        } catch (IOException e) {
            return null;
        }
    }
    
    public UtilisateurDTO getCurrentUser(String userId) {
        return getUtilisateurById(userId);
    }

    private UtilisateurDTO convertToDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        BeanUtils.copyProperties(utilisateur, dto);
        
        // Set additional fields based on role
        dto.setCoordinator(utilisateur.getRole().equals("cf"));
        dto.setChefDep(utilisateur.getRole().equals("cd"));
        
        return dto;
    }
}