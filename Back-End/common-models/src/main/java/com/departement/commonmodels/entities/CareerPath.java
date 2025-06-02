package com.departement.commonmodels.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "career_paths")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerPath {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String departmentId;
    private String formationId;
    private String title;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}