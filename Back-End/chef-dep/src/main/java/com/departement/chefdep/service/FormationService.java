package com.departement.chefdep.service;

import com.departement.chefdep.dto.FormationDTO;
import com.departement.chefdep.repository.FormationRepository;
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
        Optional<Formation> formationOpt = formationRepository.findById(id);
        return formationOpt.map(this::convertToDTO).orElse(null);
    }

    public FormationDTO createFormation(FormationDTO formationDTO) {
        Formation formation = new Formation();
        BeanUtils.copyProperties(formationDTO, formation);
        formation = formationRepository.save(formation);
        return convertToDTO(formation);
    }

    public FormationDTO updateFormation(String id, FormationDTO formationDTO) {
        Optional<Formation> formationOpt = formationRepository.findById(id);
        if (formationOpt.isPresent()) {
            Formation formation = formationOpt.get();

            // Update fields
            formation.setName(formationDTO.getName());
            formation.setShortName(formationDTO.getShortName());
            formation.setSlug(formationDTO.getSlug());
            formation.setDescription(formationDTO.getDescription());
            formation.setCoordinateurId(formationDTO.getCoordinateurId());

            formation = formationRepository.save(formation);
            return convertToDTO(formation);
        }
        return null;
    }

    public boolean deleteFormation(String id) {
        Optional<Formation> formationOpt = formationRepository.findById(id);
        if (formationOpt.isPresent()) {
            formationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private FormationDTO convertToDTO(Formation formation) {
        FormationDTO dto = new FormationDTO();
        BeanUtils.copyProperties(formation, dto);
        return dto;
    }
}