package com.departement.chefdep.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormationDTO {
    private String id;
    private String departmentId;
    private String slug;
    private String name;
    private String shortName;
    private String description;
    private String coordinateurId;
}