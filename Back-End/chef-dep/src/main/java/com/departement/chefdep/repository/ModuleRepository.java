package com.departement.chefdep.repository;

import com.departement.commonmodels.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, String> {
    // Fixed: Changed professeurId to professorId to match entity field
    List<Module> findByProfessorId(String professorId);

    // Fixed: Removed formationId which doesn't exist in Module entity
    List<Module> findBySemesterId(String semesterId);

    // Removed method that used formationId

    // Fixed query to only use semesterId which exists in the entity
    @Query("SELECT m FROM Module m WHERE m.semesterId = :semesterId")
    List<Module> findBySemester(@Param("semesterId") String semesterId);
}