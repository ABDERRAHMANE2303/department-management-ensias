package com.departement.cheffil.repositories;

import com.departement.commonmodels.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, String> {
    List<Module> findBySemesterId(String semesterId);
    List<Module> findByProfessorId(String professorId);
}