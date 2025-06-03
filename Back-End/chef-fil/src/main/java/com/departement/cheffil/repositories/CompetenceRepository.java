package com.departement.cheffil.repositories;

import com.departement.commonmodels.entities.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence, String> {
    List<Competence> findByFormationId(String formationId);
}
