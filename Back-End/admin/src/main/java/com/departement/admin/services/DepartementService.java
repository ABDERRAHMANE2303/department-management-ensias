package com.departement.admin.services;

import com.departement.commonmodels.entities.Departement;
import java.util.List;

public interface DepartementService {
    List<Departement> getAll();

    Departement getById(String id);

    Departement create(Departement d);

    Departement update(String id, Departement d);

    void delete(String id);
}