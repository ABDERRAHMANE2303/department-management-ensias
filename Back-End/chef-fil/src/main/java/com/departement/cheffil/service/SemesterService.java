package com.departement.cheffil.service;

import com.departement.cheffil.dto.SemesterDTO;
import com.departement.cheffil.repositories.SemesterRepository;
import com.departement.commonmodels.entities.Semester;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    public List<SemesterDTO> getSemestersByFormationId(String formationId) {
        List<Semester> semesters = semesterRepository.findByFormationIdOrderByNumberAsc(formationId);
        return semesters.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SemesterDTO getSemesterById(String id) {
        Optional<Semester> semester = semesterRepository.findById(id);
        return semester.map(this::convertToDTO).orElse(null);
    }

    public SemesterDTO createSemester(SemesterDTO semesterDTO) {
        Semester semester = new Semester();
        BeanUtils.copyProperties(semesterDTO, semester);
        Semester savedSemester = semesterRepository.save(semester);
        return convertToDTO(savedSemester);
    }

    public SemesterDTO updateSemester(String id, SemesterDTO semesterDTO) {
        Optional<Semester> existingSemester = semesterRepository.findById(id);
        if (existingSemester.isPresent()) {
            Semester semester = existingSemester.get();
            semesterDTO.setId(id);
            BeanUtils.copyProperties(semesterDTO, semester);
            Semester updatedSemester = semesterRepository.save(semester);
            return convertToDTO(updatedSemester);
        }
        return null;
    }

    public boolean deleteSemester(String id) {
        if (semesterRepository.existsById(id)) {
            semesterRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private SemesterDTO convertToDTO(Semester semester) {
        SemesterDTO dto = new SemesterDTO();
        BeanUtils.copyProperties(semester, dto);
        return dto;
    }
}