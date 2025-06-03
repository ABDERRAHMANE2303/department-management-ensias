package com.departement.cheffil.controller;

import com.departement.cheffil.dto.ModuleDTO;
import com.departement.cheffil.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cf/modules")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("/semester/{semesterId}")
    public ResponseEntity<List<ModuleDTO>> getModulesBySemesterId(
            @PathVariable String semesterId) {
        List<ModuleDTO> modules = moduleService.getModulesBySemesterId(semesterId);
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<ModuleDTO>> getModulesByProfessorId(
            @PathVariable String professorId) {
        List<ModuleDTO> modules = moduleService.getModulesByProfessorId(professorId);
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

    @PostMapping
    public ResponseEntity<ModuleDTO> createModule(@RequestBody ModuleDTO moduleDTO) {
        ModuleDTO createdModule = moduleService.createModule(moduleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdModule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateModule(
            @PathVariable String id,
            @RequestBody ModuleDTO moduleDTO) {
        ModuleDTO updatedModule = moduleService.updateModule(id, moduleDTO);
        if (updatedModule != null) {
            return ResponseEntity.ok(updatedModule);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Module not found with ID: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable String id) {
        boolean deleted = moduleService.deleteModule(id);
        if (deleted) {
            return ResponseEntity.ok().body("Module deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Module not found with ID: " + id);
    }

    @PutMapping("/{moduleId}/assign-professor/{professorId}")
    public ResponseEntity<?> assignProfessorToModule(
            @PathVariable String moduleId,
            @PathVariable String professorId) {
        boolean assigned = moduleService.assignProfessorToModule(moduleId, professorId);
        if (assigned) {
            return ResponseEntity.ok().body("Professor assigned to module successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Failed to assign professor to module");
    }
}