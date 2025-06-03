package com.departement.chefdep.repository;

import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
    List<Utilisateur> findByRoleAndDepartementId(String role, String departementId);

    List<Utilisateur> findByRoleAndIsCoordinator(String role, boolean isCoordinator);

    List<Utilisateur> findByDepartementIdAndRoleAndIsCoordinator(String departementId, String role,
            boolean isCoordinator);
}