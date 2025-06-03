package com.departement.chefdep.repository;

import com.departement.commonmodels.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation, String> {
    List<Formation> findByDepartmentId(String departmentId);
}