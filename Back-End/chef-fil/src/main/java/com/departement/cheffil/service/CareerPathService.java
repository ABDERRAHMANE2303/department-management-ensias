package com.departement.cheffil.service;

import com.departement.cheffil.dto.CareerPathDTO;
import com.departement.cheffil.repositories.CareerPathRepository;
import com.departement.commonmodels.entities.CareerPath;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CareerPathService {

    @Autowired
    private CareerPathRepository careerPathRepository;

    public List<CareerPathDTO> getCareerPathsByFormationId(String formationId) {
        List<CareerPath> careerPaths = careerPathRepository.findByFormationId(formationId);
        return careerPaths.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CareerPathDTO getCareerPathById(String id) {
        Optional<CareerPath> careerPath = careerPathRepository.findById(id);
        return careerPath.map(this::convertToDTO).orElse(null);
    }

    public CareerPathDTO createCareerPath(CareerPathDTO careerPathDTO) {
        CareerPath careerPath = new CareerPath();
        BeanUtils.copyProperties(careerPathDTO, careerPath);
        CareerPath savedCareerPath = careerPathRepository.save(careerPath);
        return convertToDTO(savedCareerPath);
    }

    public CareerPathDTO updateCareerPath(String id, CareerPathDTO careerPathDTO) {
        Optional<CareerPath> existingCareerPath = careerPathRepository.findById(id);
        if (existingCareerPath.isPresent()) {
            CareerPath careerPath = existingCareerPath.get();
            careerPathDTO.setId(id);
            BeanUtils.copyProperties(careerPathDTO, careerPath);
            CareerPath updatedCareerPath = careerPathRepository.save(careerPath);
            return convertToDTO(updatedCareerPath);
        }
        return null;
    }

    public boolean deleteCareerPath(String id) {
        if (careerPathRepository.existsById(id)) {
            careerPathRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CareerPathDTO convertToDTO(CareerPath careerPath) {
        CareerPathDTO dto = new CareerPathDTO();
        BeanUtils.copyProperties(careerPath, dto);
        return dto;
    }
}