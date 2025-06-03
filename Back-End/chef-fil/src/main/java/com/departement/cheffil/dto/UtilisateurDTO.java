package com.departement.cheffil.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDTO {
    private String id;
    private String nom;
    private String prenom;
    private String nomUtilisateur;
    private String email;
    private String role;
    private String departementId;
    private boolean isCoordinator;
    private boolean isChefDep;
    private String specialite;
    private String titre;
    private String image;
    private String phone;
}