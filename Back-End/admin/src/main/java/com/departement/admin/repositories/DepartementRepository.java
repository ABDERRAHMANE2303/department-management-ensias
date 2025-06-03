package com.departement.admin.repositories;

import com.departement.commonmodels.entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartementRepository extends JpaRepository<Departement, String> {
}