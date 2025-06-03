package com.departement.cheffil.repositories;

import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
    List<Utilisateur> findByDepartementId(String departementId);
    List<Utilisateur> findByDepartementIdAndRole(String departementId, String role);
    Optional<Utilisateur> findByNomUtilisateur(String nomUtilisateur);
    Optional<Utilisateur> findByEmail(String email);
}