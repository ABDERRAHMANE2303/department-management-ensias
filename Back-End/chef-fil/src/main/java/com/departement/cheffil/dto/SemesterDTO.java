package com.departement.cheffil.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterDTO {
    private String id;
    private String formationId;
    private int number;
    private String name;
    private String description;
    private String colorGradient;
}