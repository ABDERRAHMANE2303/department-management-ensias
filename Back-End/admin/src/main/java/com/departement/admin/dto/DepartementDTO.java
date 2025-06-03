package com.departement.admin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartementDTO {
    private String id; // null on create
    private String name;
    private String slug;
    private String slogan;
    private String description;
    private String vision;
    private Integer yearsFounded;
    private Integer activeStudentsCount;
    private Integer graduatesCount;
    private Integer publicationsCount;
    private String contactEmail;
    private String contactPhone;
    private String openDaysInfo;
    private String backgroundImage;
}