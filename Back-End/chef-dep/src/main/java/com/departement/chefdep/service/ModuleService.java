package com.departement.chefdep.service;

import com.departement.chefdep.dto.ModuleDTO;
import com.departement.chefdep.repository.ModuleRepository;
import com.departement.chefdep.repository.UtilisateurRepository;
import com.departement.commonmodels.entities.Module;
import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public List<ModuleDTO> getModulesByProfesseurId(String professeurId) {
        // Fix: Change "professeurId" to "professorId" to match repository method
        List<Module> modules = moduleRepository.findByProfessorId(professeurId);
        return modules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ModuleDTO> getModulesByFormationId(String formationId) {
        // This method needs to be updated since formationId doesn't exist in Module
        // entity
        // For now, return an empty list or throw an exception
        return List.of();
    }

    public List<ModuleDTO> getModulesByFormationAndSemester(String formationId, String semesterId) {
        // Since we don't have formationId in the Module entity,
        // only filter by semesterId
        List<Module> modules = moduleRepository.findBySemesterId(semesterId);
        return modules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ModuleDTO getModuleById(String id) {
        Optional<Module> moduleOpt = moduleRepository.findById(id);
        return moduleOpt.map(this::convertToDTO).orElse(null);
    }

    public ModuleDTO updateModule(String id, ModuleDTO moduleDTO) {
        Optional<Module> moduleOpt = moduleRepository.findById(id);
        if (moduleOpt.isPresent()) {
            Module module = moduleOpt.get();

            // Update fields
            module.setName(moduleDTO.getName());
            module.setDescription(moduleDTO.getDescription());
            module.setProfessorId(moduleDTO.getProfesseurId());
            // module.setCreditHours(moduleDTO.getCreditHours());
            // module.setSyllabus(moduleDTO.getSyllabus());
            // module.setOrderIndex(moduleDTO.getOrderIndex());

            module = moduleRepository.save(module);
            return convertToDTO(module);
        }
        return null;
    }

    private ModuleDTO convertToDTO(Module module) {
        ModuleDTO dto = new ModuleDTO();
        BeanUtils.copyProperties(module, dto);

        // Get professor name if available
        if (module.getProfessorId() != null) {
            Optional<Utilisateur> professeur = utilisateurRepository.findById(module.getProfessorId());
            professeur.ifPresent(p -> {
                dto.setProfesseurNom(p.getNom());
                dto.setProfesseurPrenom(p.getPrenom());
            });
        }

        return dto;
    }
}