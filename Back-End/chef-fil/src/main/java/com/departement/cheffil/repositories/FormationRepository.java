package com.departement.cheffil.repositories;

import com.departement.commonmodels.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormationRepository extends JpaRepository<Formation, String> {
    List<Formation> findByDepartmentId(String departmentId);
    Optional<Formation> findByCoordinateurId(String coordinateurId);
    Optional<Formation> findBySlug(String slug);
}