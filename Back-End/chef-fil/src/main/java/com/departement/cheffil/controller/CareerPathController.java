package com.departement.cheffil.controller;

import com.departement.cheffil.dto.CareerPathDTO;
import com.departement.cheffil.service.CareerPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cf/career-paths")
public class CareerPathController {

    @Autowired
    private CareerPathService careerPathService;

    @GetMapping("/formation/{formationId}")
    public ResponseEntity<List<CareerPathDTO>> getCareerPathsByFormationId(
            @PathVariable String formationId) {
        List<CareerPathDTO> careerPaths = careerPathService.getCareerPathsByFormationId(formationId);
        return ResponseEntity.ok(careerPaths);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCareerPathById(@PathVariable String id) {
        CareerPathDTO careerPath = careerPathService.getCareerPathById(id);
        if (careerPath != null) {
            return ResponseEntity.ok(careerPath);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Career path not found with ID: " + id);
    }

    @PostMapping
    public ResponseEntity<CareerPathDTO> createCareerPath(@RequestBody CareerPathDTO careerPathDTO) {
        CareerPathDTO createdCareerPath = careerPathService.createCareerPath(careerPathDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCareerPath);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCareerPath(
            @PathVariable String id,
            @RequestBody CareerPathDTO careerPathDTO) {
        CareerPathDTO updatedCareerPath = careerPathService.updateCareerPath(id, careerPathDTO);
        if (updatedCareerPath != null) {
            return ResponseEntity.ok(updatedCareerPath);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Career path not found with ID: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCareerPath(@PathVariable String id) {
        boolean deleted = careerPathService.deleteCareerPath(id);
        if (deleted) {
            return ResponseEntity.ok().body("Career path deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Career path not found with ID: " + id);
    }
}