package com.departement.cheffil.controller;

import com.departement.cheffil.dto.SemesterDTO;
import com.departement.cheffil.service.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cf/semesters")
public class SemesterController {

    @Autowired
    private SemesterService semesterService;

    @GetMapping("/formation/{formationId}")
    public ResponseEntity<List<SemesterDTO>> getSemestersByFormationId(
            @PathVariable String formationId) {
        List<SemesterDTO> semesters = semesterService.getSemestersByFormationId(formationId);
        return ResponseEntity.ok(semesters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSemesterById(@PathVariable String id) {
        SemesterDTO semester = semesterService.getSemesterById(id);
        if (semester != null) {
            return ResponseEntity.ok(semester);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Semester not found with ID: " + id);
    }

    @PostMapping
    public ResponseEntity<SemesterDTO> createSemester(@RequestBody SemesterDTO semesterDTO) {
        SemesterDTO createdSemester = semesterService.createSemester(semesterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSemester);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSemester(
            @PathVariable String id,
            @RequestBody SemesterDTO semesterDTO) {
        SemesterDTO updatedSemester = semesterService.updateSemester(id, semesterDTO);
        if (updatedSemester != null) {
            return ResponseEntity.ok(updatedSemester);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Semester not found with ID: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSemester(@PathVariable String id) {
        boolean deleted = semesterService.deleteSemester(id);
        if (deleted) {
            return ResponseEntity.ok().body("Semester deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Semester not found with ID: " + id);
    }
}