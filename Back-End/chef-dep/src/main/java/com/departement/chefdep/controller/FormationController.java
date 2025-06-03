package com.departement.chefdep.controller;

import com.departement.chefdep.dto.FormationDTO;
import com.departement.chefdep.service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cd/formations")
public class FormationController {

    @Autowired
    private FormationService formationService;

    @GetMapping("/departement/{departementId}")
    public ResponseEntity<List<FormationDTO>> getFormationsByDepartementId(
            @PathVariable String departementId) {
        List<FormationDTO> formations = formationService.getFormationsByDepartmentId(departementId);
        return ResponseEntity.ok(formations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFormationById(@PathVariable String id) {
        FormationDTO formation = formationService.getFormationById(id);
        if (formation != null) {
            return ResponseEntity.ok(formation);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Formation not found with ID: " + id);
    }

    @PostMapping
    public ResponseEntity<FormationDTO> createFormation(
            @RequestBody FormationDTO formationDTO) {
        FormationDTO created = formationService.createFormation(formationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFormation(
            @PathVariable String id,
            @RequestBody FormationDTO formationDTO) {
        FormationDTO updated = formationService.updateFormation(id, formationDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Formation not found with ID: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFormation(@PathVariable String id) {
        boolean deleted = formationService.deleteFormation(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Formation not found with ID: " + id);
    }
}