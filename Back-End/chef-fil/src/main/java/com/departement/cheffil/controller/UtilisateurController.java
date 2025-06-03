package com.departement.cheffil.controller;

import com.departement.cheffil.dto.UtilisateurDTO;
import com.departement.cheffil.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cf")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping("/professeurs/departement/{departementId}")
    public ResponseEntity<List<UtilisateurDTO>> getProfesseursByDepartementId(
            @PathVariable String departementId) {
        List<UtilisateurDTO> professeurs = utilisateurService.getProfesseursByDepartementId(departementId);
        return ResponseEntity.ok(professeurs);
    }

    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<?> getUtilisateurById(@PathVariable String id) {
        UtilisateurDTO utilisateur = utilisateurService.getUtilisateurById(id);
        if (utilisateur != null) {
            return ResponseEntity.ok(utilisateur);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Utilisateur not found with ID: " + id);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("User-ID") String userId) {
        // In a real app, you would get the user ID from the security context
        UtilisateurDTO currentUser = utilisateurService.getCurrentUser(userId);
        if (currentUser != null) {
            return ResponseEntity.ok(currentUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Current user not found");
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(
            @RequestHeader("User-ID") String userId,
            @RequestBody UtilisateurDTO utilisateurDTO) {
        // In a real app, you would get the user ID from the security context
        UtilisateurDTO updatedUser = utilisateurService.updateUtilisateur(userId, utilisateurDTO);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Failed to update user profile");
    }

    @PostMapping("/me/image")
    public ResponseEntity<?> uploadProfileImage(
            @RequestHeader("User-ID") String userId,
            @RequestParam("image") MultipartFile file) {
        // In a real app, you would get the user ID from the security context
        String imagePath = utilisateurService.uploadProfileImage(userId, file);
        if (imagePath != null) {
            return ResponseEntity.ok().body(imagePath);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to upload profile image");
    }
}