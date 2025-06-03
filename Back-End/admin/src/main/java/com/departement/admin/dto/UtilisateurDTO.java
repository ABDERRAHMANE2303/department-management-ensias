package com.departement.admin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDTO {
    private String id; // null on create, provided on update

    @JsonProperty("nom_utilisateur")
    private String nomUtilisateur;

    private String prenom;
    private String nom;
    private String email;

    @JsonProperty("mot_de_passe")
    private String motDePasse; // matches your front‐end field

    private String role;

    @JsonProperty("departement_id")
    private String departementId;

    @JsonProperty("isChefDep")
    private Boolean chefDep;

    @JsonProperty("isCoordinator")
    private Boolean coordinator;

    private String specialite;
    private String titre;
    private String phone;
    private String image; // URL or path from the front end
}