package com.departement.cheffil.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerPathDTO {
    private String id;
    private String departmentId;
    private String formationId;
    private String title;
}