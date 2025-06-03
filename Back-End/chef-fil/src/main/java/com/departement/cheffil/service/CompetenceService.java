package com.departement.cheffil.service;

import com.departement.cheffil.dto.CompetenceDTO;
import com.departement.cheffil.repositories.CompetenceRepository;
import com.departement.commonmodels.entities.Competence;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompetenceService {

    @Autowired
    private CompetenceRepository competenceRepository;

    public List<CompetenceDTO> getCompetencesByFormationId(String formationId) {
        List<Competence> competences = competenceRepository.findByFormationId(formationId);
        return competences.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CompetenceDTO getCompetenceById(String id) {
        Optional<Competence> competence = competenceRepository.findById(id);
        return competence.map(this::convertToDTO).orElse(null);
    }

    public CompetenceDTO createCompetence(CompetenceDTO competenceDTO) {
        Competence competence = new Competence();
        BeanUtils.copyProperties(competenceDTO, competence);
        Competence savedCompetence = competenceRepository.save(competence);
        return convertToDTO(savedCompetence);
    }

    public CompetenceDTO updateCompetence(String id, CompetenceDTO competenceDTO) {
        Optional<Competence> existingCompetence = competenceRepository.findById(id);
        if (existingCompetence.isPresent()) {
            Competence competence = existingCompetence.get();
            competenceDTO.setId(id);
            BeanUtils.copyProperties(competenceDTO, competence);
            Competence updatedCompetence = competenceRepository.save(competence);
            return convertToDTO(updatedCompetence);
        }
        return null;
    }

    public boolean deleteCompetence(String id) {
        if (competenceRepository.existsById(id)) {
            competenceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CompetenceDTO convertToDTO(Competence competence) {
        CompetenceDTO dto = new CompetenceDTO();
        BeanUtils.copyProperties(competence, dto);
        return dto;
    }
}