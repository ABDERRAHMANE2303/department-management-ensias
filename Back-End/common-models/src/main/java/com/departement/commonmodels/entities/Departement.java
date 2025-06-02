package com.departement.commonmodels.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "departements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departement {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String name;
    private String chefId;
    private String slogan;
    private String slug;
    @Column(columnDefinition = "TEXT")
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

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}