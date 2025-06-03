package com.departement.cheffil.controller;

import com.departement.cheffil.dto.CompetenceDTO;
import com.departement.cheffil.service.CompetenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cf/competences")
public class CompetenceController {

    @Autowired
    private CompetenceService competenceService;

    @GetMapping("/formation/{formationId}")
    public ResponseEntity<List<CompetenceDTO>> getCompetencesByFormationId(
            @PathVariable String formationId) {
        List<CompetenceDTO> competences = competenceService.getCompetencesByFormationId(formationId);
        return ResponseEntity.ok(competences);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCompetenceById(@PathVariable String id) {
        CompetenceDTO competence = competenceService.getCompetenceById(id);
        if (competence != null) {
            return ResponseEntity.ok(competence);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Competence not found with ID: " + id);
    }

    @PostMapping
    public ResponseEntity<CompetenceDTO> createCompetence(@RequestBody CompetenceDTO competenceDTO) {
        CompetenceDTO createdCompetence = competenceService.createCompetence(competenceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCompetence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompetence(
            @PathVariable String id,
            @RequestBody CompetenceDTO competenceDTO) {
        CompetenceDTO updatedCompetence = competenceService.updateCompetence(id, competenceDTO);
        if (updatedCompetence != null) {
            return ResponseEntity.ok(updatedCompetence);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Competence not found with ID: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompetence(@PathVariable String id) {
        boolean deleted = competenceService.deleteCompetence(id);
        if (deleted) {
            return ResponseEntity.ok().body("Competence deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Competence not found with ID: " + id);
    }
}