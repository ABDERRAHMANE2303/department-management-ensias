package com.departement.admin.repositories;

import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
    List<Utilisateur> findByRole(String role);

    List<Utilisateur> findByDepartementId(String deptId);
}