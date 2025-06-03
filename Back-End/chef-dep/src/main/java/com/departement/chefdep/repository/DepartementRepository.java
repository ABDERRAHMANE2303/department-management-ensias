package com.departement.chefdep.repository;

import com.departement.commonmodels.entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartementRepository extends JpaRepository<Departement, String> {
    Optional<Departement> findByChefId(String chefId);
}