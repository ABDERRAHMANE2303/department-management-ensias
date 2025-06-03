package com.departement.auth.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String nom;
    private String prenom;
    private String email;
    private String nomUtilisateur;
    private String role;
    private String departementId;
    private String formationId;
    private boolean estActif;
    private boolean isChefDep;
    private boolean isCoordinator;
    private String specialite;
    private String titre;
    private String phone;
    private String image;
    private LocalDateTime derniereConnexion;
}