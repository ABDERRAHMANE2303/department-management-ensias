package com.departement.cheffil.service;

import com.departement.cheffil.dto.ModuleDTO;
import com.departement.cheffil.repositories.ModuleRepository;
import com.departement.cheffil.repositories.UtilisateurRepository;
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

    public List<ModuleDTO> getModulesBySemesterId(String semesterId) {
        List<Module> modules = moduleRepository.findBySemesterId(semesterId);
        return modules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ModuleDTO> getModulesByProfessorId(String professorId) {
        List<Module> modules = moduleRepository.findByProfessorId(professorId);
        return modules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ModuleDTO getModuleById(String id) {
        Optional<Module> module = moduleRepository.findById(id);
        return module.map(this::convertToDTO).orElse(null);
    }

    public ModuleDTO createModule(ModuleDTO moduleDTO) {
        Module module = new Module();
        BeanUtils.copyProperties(moduleDTO, module);
        Module savedModule = moduleRepository.save(module);
        return convertToDTO(savedModule);
    }

    public ModuleDTO updateModule(String id, ModuleDTO moduleDTO) {
        Optional<Module> existingModule = moduleRepository.findById(id);
        if (existingModule.isPresent()) {
            Module module = existingModule.get();
            moduleDTO.setId(id);
            BeanUtils.copyProperties(moduleDTO, module);
            Module updatedModule = moduleRepository.save(module);
            return convertToDTO(updatedModule);
        }
        return null;
    }

    public boolean deleteModule(String id) {
        if (moduleRepository.existsById(id)) {
            moduleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean assignProfessorToModule(String moduleId, String professorId) {
        Optional<Module> moduleOpt = moduleRepository.findById(moduleId);
        Optional<Utilisateur> professorOpt = utilisateurRepository.findById(professorId);
        
        if (moduleOpt.isPresent() && professorOpt.isPresent()) {
            Module module = moduleOpt.get();
            module.setProfessorId(professorId);
            moduleRepository.save(module);
            return true;
        }
        return false;
    }

    private ModuleDTO convertToDTO(Module module) {
        ModuleDTO dto = new ModuleDTO();
        BeanUtils.copyProperties(module, dto);
        
        // Get professor name if available
        if (module.getProfessorId() != null) {
            Optional<Utilisateur> professor = utilisateurRepository.findById(module.getProfessorId());
            professor.ifPresent(p -> {
                dto.setProfessorName(p.getPrenom() + " " + p.getNom());
            });
        }
        
        return dto;
    }
}