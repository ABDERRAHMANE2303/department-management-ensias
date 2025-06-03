package com.departement.cheffil.repositories;

import com.departement.commonmodels.entities.CareerPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerPathRepository extends JpaRepository<CareerPath, String> {
    List<CareerPath> findByFormationId(String formationId);
}