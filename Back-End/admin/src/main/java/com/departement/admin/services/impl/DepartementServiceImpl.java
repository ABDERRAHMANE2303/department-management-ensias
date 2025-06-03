package com.departement.admin.services.impl;

import com.departement.admin.exceptions.ResourceNotFoundException;
import com.departement.admin.repositories.DepartementRepository;
import com.departement.admin.services.DepartementService;
import com.departement.commonmodels.entities.Departement;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class DepartementServiceImpl implements DepartementService {
    private final DepartementRepository repo;

    public DepartementServiceImpl(DepartementRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Departement> getAll() {
        return repo.findAll();
    }

    @Override
    public Departement getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departement", "id", id));
    }

    @Override
    public Departement create(Departement d) {
        return repo.save(d);
    }

    @Override
    public Departement update(String id, Departement d) {
        Departement ex = getById(id);
        ex.setName(d.getName());
        ex.setSlug(d.getSlug());
        ex.setSlogan(d.getSlogan());
        ex.setDescription(d.getDescription());
        ex.setVision(d.getVision());
        ex.setYearsFounded(d.getYearsFounded());
        ex.setGraduatesCount(d.getGraduatesCount());
        ex.setActiveStudentsCount(d.getActiveStudentsCount());
        ex.setPublicationsCount(d.getPublicationsCount());
        ex.setContactEmail(d.getContactEmail());
        ex.setContactPhone(d.getContactPhone());
        ex.setOpenDaysInfo(d.getOpenDaysInfo());
        ex.setBackgroundImage(d.getBackgroundImage());
        return repo.save(ex);
    }

    @Override
    public void delete(String id) {
        getById(id);
        repo.deleteById(id);
    }
}