package com.departement.chefdep.controller;

import com.departement.chefdep.dto.ModuleDTO;
import com.departement.chefdep.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cd/modules")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("/professeur/{professeurId}")
    public ResponseEntity<List<ModuleDTO>> getModulesByProfesseurId(
            @PathVariable String professeurId) {
        List<ModuleDTO> modules = moduleService.getModulesByProfesseurId(professeurId);
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/formation/{formationId}")
    public ResponseEntity<List<ModuleDTO>> getModulesByFormationId(
            @PathVariable String formationId) {
        List<ModuleDTO> modules = moduleService.getModulesByFormationId(formationId);
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/formation/{formationId}/semester/{semesterId}")
    public ResponseEntity<List<ModuleDTO>> getModulesByFormationAndSemester(
            @PathVariable String formationId,
            @PathVariable String semesterId) {
        List<ModuleDTO> modules = moduleService.getModulesByFormationAndSemester(formationId, semesterId);
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getModuleById(@PathVariable String id) {
        ModuleDTO module = moduleService.getModuleById(id);
        if (module != null) {
            return ResponseEntity.ok(module);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Module not found with ID: " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateModule(
            @PathVariable String id,
            @RequestBody ModuleDTO moduleDTO) {
        ModuleDTO updated = moduleService.updateModule(id, moduleDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Module not found with ID: " + id);
    }
}