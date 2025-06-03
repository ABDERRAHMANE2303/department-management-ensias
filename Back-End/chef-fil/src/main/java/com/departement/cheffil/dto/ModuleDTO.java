package com.departement.cheffil.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleDTO {
    private String id;
    private String semesterId;
    private String name;
    private String description;
    private String professorId;
    private String professorName;
    private Integer creditHours;
    private String syllabus;
    private Integer orderIndex;
}