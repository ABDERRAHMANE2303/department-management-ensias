package com.departement.cheffil.controller;

import com.departement.cheffil.dto.FormationDTO;
import com.departement.cheffil.service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cf/formations")
public class FormationController {

    @Autowired
    private FormationService formationService;

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<FormationDTO>> getFormationsByDepartmentId(
            @PathVariable String departmentId) {
        List<FormationDTO> formations = formationService.getFormationsByDepartmentId(departmentId);
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

    @GetMapping("/by-coordinator/{coordinateurId}")
    public ResponseEntity<?> getFormationByCoordinateurId(@PathVariable String coordinateurId) {
        FormationDTO formation = formationService.getFormationByCoordinateurId(coordinateurId);
        if (formation != null) {
            return ResponseEntity.ok(formation);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No formation found for coordinator with ID: " + coordinateurId);
    }

    @PostMapping
    public ResponseEntity<FormationDTO> createFormation(@RequestBody FormationDTO formationDTO) {
        FormationDTO createdFormation = formationService.createFormation(formationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFormation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFormation(
            @PathVariable String id,
            @RequestBody FormationDTO formationDTO) {
        FormationDTO updatedFormation = formationService.updateFormation(id, formationDTO);
        if (updatedFormation != null) {
            return ResponseEntity.ok(updatedFormation);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Formation not found with ID: " + id);
    }
}