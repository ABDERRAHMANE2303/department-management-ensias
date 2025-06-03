package com.departement.chefdep.controller;

import com.departement.chefdep.dto.DepartementDTO;
import com.departement.chefdep.service.DepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cd/departements")
public class DepartementController {

    @Autowired
    private DepartementService departementService;
    
    @GetMapping("/by-chef/{chefId}")
    public ResponseEntity<?> getDepartementByChefId(@PathVariable String chefId) {
        DepartementDTO departement = departementService.getDepartementByChefId(chefId);
        if (departement != null) {
            return ResponseEntity.ok(departement);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("No departement found for chef with ID: " + chefId);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getDepartementById(@PathVariable String id) {
        DepartementDTO departement = departementService.getDepartementById(id);
        if (departement != null) {
            return ResponseEntity.ok(departement);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Departement not found with ID: " + id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDepartement(@PathVariable String id, 
                                             @RequestBody DepartementDTO departementDTO) {
        DepartementDTO updated = departementService.updateDepartement(id, departementDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Departement not found with ID: " + id);
    }
    
    @PostMapping("/{id}/increment-views")
    public ResponseEntity<?> incrementViews(@PathVariable String id) {
        departementService.incrementViews(id);
        return ResponseEntity.ok().build();
    }
}