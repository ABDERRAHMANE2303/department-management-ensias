package com.departement.commonmodels.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "utilisateurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false)
    private String id;

    @Column(name = "nom_utilisateur", unique = true, nullable = false)
    private String nomUtilisateur;

    @Column(unique = true, nullable = false)
    private String email;
    @Column(name = "nom")
    private String nom;
    @Column(name = "prenom")
    private String prenom;

    @Column(name = "mot_de_passe_hash", nullable = false)
    private String motDePasseHash;

    @Column(nullable = false)
    private String role; // 'admin','professeur','chefFiliere','chefDepartement'

    // Optional foreign keys
    @Column(name = "departement_id")
    private String departementId;

    @Column(name = "formation_id")
    private String formationId;

    // Role-flags
    @Column(name = "is_coordinator", nullable = false)
    private boolean isCoordinator = false;

    @Column(name = "is_chef_dep", nullable = false)
    private boolean isChefDep = false;

    // Professeur-specific
    @Column
    private String specialite;

    @Column
    private String titre;

    // Profile
    @Column
    private String image;

    @Column
    private String phone;

    @Column(name = "derniere_connexion")
    private LocalDateTime derniereConnexion;

    @Column(name = "est_actif", nullable = false)
    private boolean estActif = true;

    @CreationTimestamp
    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;
}