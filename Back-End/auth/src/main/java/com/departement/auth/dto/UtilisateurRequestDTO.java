package com.departement.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurRequestDTO {
    private String nomUtilisateur;
    private String email;
    private String motDePasse;
    private String role;
    private String oauthId;
    private String oauthProvider;
    private String professeurId;
    private String departementId;
}