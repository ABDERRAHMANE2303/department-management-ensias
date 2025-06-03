package com.departement.chefdep.service;

import com.departement.chefdep.dto.DepartementDTO;
import com.departement.chefdep.repository.DepartementRepository;
import com.departement.commonmodels.entities.Departement;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartementService {

    @Autowired
    private DepartementRepository departementRepository;
    
    public DepartementDTO getDepartementByChefId(String chefId) {
        Optional<Departement> departementOpt = departementRepository.findByChefId(chefId);
        if (departementOpt.isPresent()) {
            Departement departement = departementOpt.get();
            DepartementDTO dto = new DepartementDTO();
            BeanUtils.copyProperties(departement, dto);
            return dto;
        }
        return null;
    }
    
    public DepartementDTO getDepartementById(String id) {
        Optional<Departement> departementOpt = departementRepository.findById(id);
        if (departementOpt.isPresent()) {
            Departement departement = departementOpt.get();
            DepartementDTO dto = new DepartementDTO();
            BeanUtils.copyProperties(departement, dto);
            return dto;
        }
        return null;
    }
    
    public DepartementDTO updateDepartement(String id, DepartementDTO departementDTO) {
        Optional<Departement> departementOpt = departementRepository.findById(id);
        if (departementOpt.isPresent()) {
            Departement departement = departementOpt.get();
            
            // Update only allowed fields
            departement.setName(departementDTO.getName());
            departement.setSlogan(departementDTO.getSlogan());
            departement.setDescription(departementDTO.getDescription());
            departement.setVision(departementDTO.getVision());
            departement.setContactEmail(departementDTO.getContactEmail());
            departement.setContactPhone(departementDTO.getContactPhone());
            departement.setOpenDaysInfo(departementDTO.getOpenDaysInfo());
            departement.setBackgroundImage(departementDTO.getBackgroundImage());
            
            departement = departementRepository.save(departement);
            
            DepartementDTO updatedDTO = new DepartementDTO();
            BeanUtils.copyProperties(departement, updatedDTO);
            return updatedDTO;
        }
        return null;
    }
    
    public void incrementViews(String id) {
        Optional<Departement> departementOpt = departementRepository.findById(id);
        if (departementOpt.isPresent()) {
            Departement departement = departementOpt.get();
            departement.setViews(departement.getViews() + 1);
            departementRepository.save(departement);
        }
    }
}