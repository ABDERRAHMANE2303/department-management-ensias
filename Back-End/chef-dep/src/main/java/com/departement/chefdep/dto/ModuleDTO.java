package com.departement.chefdep.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleDTO {
    private String id;
    private String name;
    private String description;
    private String semesterId;
    private String formationId;
    private String professeurId;
    private String professeurNom;
    private String professeurPrenom;
    private Integer creditHours;
    private String syllabus;
    private Integer orderIndex;
}