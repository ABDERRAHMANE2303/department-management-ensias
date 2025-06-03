package com.departement.cheffil.repositories;

import com.departement.commonmodels.entities.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, String> {
    List<Semester> findByFormationId(String formationId);
    List<Semester> findByFormationIdOrderByNumberAsc(String formationId);
}