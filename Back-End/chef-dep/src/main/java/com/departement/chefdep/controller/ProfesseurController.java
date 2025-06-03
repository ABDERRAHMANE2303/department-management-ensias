package com.departement.chefdep.controller;

import com.departement.chefdep.dto.ProfesseurDTO;
import com.departement.chefdep.service.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cd/professeurs")
public class ProfesseurController {

    @Autowired
    private ProfesseurService professeurService;

    @GetMapping("/departement/{departementId}")
    public ResponseEntity<List<ProfesseurDTO>> getProfesseursByDepartementId(
            @PathVariable String departementId) {
        List<ProfesseurDTO> professeurs = professeurService.getProfesseursByDepartementId(departementId);
        return ResponseEntity.ok(professeurs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProfesseurById(@PathVariable String id) {
        ProfesseurDTO professeur = professeurService.getProfesseurById(id);
        if (professeur != null) {
            return ResponseEntity.ok(professeur);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Professeur not found with ID: " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfesseur(
            @PathVariable String id,
            @RequestBody ProfesseurDTO professeurDTO) {
        ProfesseurDTO updated = professeurService.updateProfesseur(id, professeurDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Professeur not found with ID: " + id);
    }

    @PutMapping("/{professeurId}/assign/{formationId}")
    public ResponseEntity<?> assignCoordinator(
            @PathVariable String professeurId,
            @PathVariable String formationId) {
        boolean assigned = professeurService.assignAsCoordinator(professeurId, formationId);
        if (assigned) {
            return ResponseEntity.ok().body("Professeur assigned as coordinator successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Failed to assign professeur as coordinator");
    }
}