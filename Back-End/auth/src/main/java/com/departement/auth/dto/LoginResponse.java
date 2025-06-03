package com.departement.auth.dto;

import com.departement.commonmodels.entities.Utilisateur;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Utilisateur user;
}