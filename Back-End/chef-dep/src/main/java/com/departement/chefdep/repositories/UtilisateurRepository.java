package com.departement.chefdep.repositories;

import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
    Optional<Utilisateur> findByEmail(String email);

    Optional<Utilisateur> findByNomUtilisateur(String nomUtilisateur);

    boolean existsByEmail(String email);

    boolean existsByNomUtilisateur(String nomUtilisateur);
}