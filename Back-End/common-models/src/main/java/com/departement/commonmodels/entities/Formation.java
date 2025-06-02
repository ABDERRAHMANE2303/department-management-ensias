package com.departement.commonmodels.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "formations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String departmentId;
    private String name;
    private String shortName;
    private String slug;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String coordinateurId;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}