package com.departement.cheffil.service;

import com.departement.cheffil.dto.FormationDTO;
import com.departement.cheffil.repositories.FormationRepository;
import com.departement.commonmodels.entities.Formation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepository;

    public List<FormationDTO> getFormationsByDepartmentId(String departmentId) {
        List<Formation> formations = formationRepository.findByDepartmentId(departmentId);
        return formations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FormationDTO getFormationById(String id) {
        Optional<Formation> formation = formationRepository.findById(id);
        return formation.map(this::convertToDTO).orElse(null);
    }

    public FormationDTO getFormationByCoordinateurId(String coordinateurId) {
        Optional<Formation> formation = formationRepository.findByCoordinateurId(coordinateurId);
        return formation.map(this::convertToDTO).orElse(null);
    }

    public FormationDTO createFormation(FormationDTO formationDTO) {
        Formation formation = new Formation();
        BeanUtils.copyProperties(formationDTO, formation);
        Formation savedFormation = formationRepository.save(formation);
        return convertToDTO(savedFormation);
    }

    public FormationDTO updateFormation(String id, FormationDTO formationDTO) {
        Optional<Formation> existingFormation = formationRepository.findById(id);
        if (existingFormation.isPresent()) {
            Formation formation = existingFormation.get();
            // Don't update the ID
            formationDTO.setId(id);
            BeanUtils.copyProperties(formationDTO, formation);
            Formation updatedFormation = formationRepository.save(formation);
            return convertToDTO(updatedFormation);
        }
        return null;
    }

    private FormationDTO convertToDTO(Formation formation) {
        FormationDTO dto = new FormationDTO();
        BeanUtils.copyProperties(formation, dto);
        return dto;
    }
}