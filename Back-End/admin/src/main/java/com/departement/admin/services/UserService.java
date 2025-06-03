package com.departement.admin.services;

import com.departement.commonmodels.entities.Utilisateur;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<Utilisateur> getAll();

    Utilisateur getById(String id);

    Utilisateur create(Utilisateur u);

    Utilisateur update(String id, Utilisateur u);

    void delete(String id);

    // extra methods for dashboard:
    List<Utilisateur> getProfessors(); // role='professeur'

    List<Utilisateur> getByDepartment(String deptId);

    Utilisateur assignToDepartment(String userId, String deptId);

    Utilisateur assignChefToDepartment(String userId, String deptId);

    // simple stats
    Map<String, Long> dashboardStats();
}