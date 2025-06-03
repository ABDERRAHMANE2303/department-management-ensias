package com.departement.chefdep.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartementDTO {
    private String id;
    private String name;
    private String slug;
    private String chefId;
    private String slogan;
    private String description;
    private String vision;
    private Integer yearsFounded;
    private Integer graduatesCount;
    private Integer activeStudentsCount;
    private Integer publicationsCount;
    private Integer views;
    private String contactEmail;
    private String contactPhone;
    private String openDaysInfo;
    private String backgroundImage;
}