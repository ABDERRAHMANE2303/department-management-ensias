package com.departement.admin.services.impl;

import com.departement.admin.exceptions.ResourceNotFoundException;
import com.departement.admin.repositories.DepartementRepository;
import com.departement.admin.repositories.UtilisateurRepository;
import com.departement.admin.services.UserService;
import com.departement.commonmodels.entities.Departement;
import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UtilisateurRepository userRepo;
    private final DepartementRepository deptRepo;

    public UserServiceImpl(UtilisateurRepository userRepo,
            DepartementRepository deptRepo) {
        this.userRepo = userRepo;
        this.deptRepo = deptRepo;
    }

    @Override
    public List<Utilisateur> getAll() {
        return userRepo.findAll();
    }

    @Override
    public Utilisateur getById(String id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", "id", id));
    }

    @Override
    public Utilisateur create(Utilisateur u) {
        // you may want to hash u.getMotDePasseHash() here before saving
        return userRepo.save(u);
    }

    @Override
    public Utilisateur update(String id, Utilisateur u) {
        Utilisateur ex = getById(id);
        // copy all mutable fields except id, timestamps
        ex.setNomUtilisateur(u.getNomUtilisateur());
        ex.setPrenom(u.getPrenom());
        ex.setNom(u.getNom());
        ex.setEmail(u.getEmail());
        ex.setMotDePasseHash(u.getMotDePasseHash());
        ex.setRole(u.getRole());
        ex.setDepartementId(u.getDepartementId());
        ex.setFormationId(u.getFormationId());
        ex.setCoordinator(u.isCoordinator());
        // isChefDep should only be set via assignChefToDepartment()
        ex.setSpecialite(u.getSpecialite());
        ex.setTitre(u.getTitre());
        ex.setImage(u.getImage());
        ex.setPhone(u.getPhone());
        ex.setEstActif(u.isEstActif());
        return userRepo.save(ex);
    }

    @Override
    public void delete(String id) {
        getById(id);
        userRepo.deleteById(id);
    }

    @Override
    public List<Utilisateur> getProfessors() {
        return userRepo.findByRole("prof");
    }

    @Override
    public List<Utilisateur> getByDepartment(String deptId) {
        deptRepo.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Departement", "id", deptId));
        return userRepo.findByDepartementId(deptId);
    }

    @Override
    public Utilisateur assignToDepartment(String userId, String deptId) {
        Utilisateur u = getById(userId);
        Departement d = deptRepo.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Departement", "id", deptId));
        u.setDepartementId(d.getId());
        // normal professor assignment
        u.setRole("prof");
        // ensure chef flag is off
        u.setChefDep(false);
        return userRepo.save(u);
    }

    @Override
    public Utilisateur assignChefToDepartment(String userId, String deptId) {
        Utilisateur u = assignToDepartment(userId, deptId);
        // mark as department head
        u.setChefDep(true);
        // chef-department role
        u.setRole("cd");
        return userRepo.save(u);
    }

    @Override
    public Map<String, Long> dashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalProfessors", (long) getProfessors().size());
        stats.put("totalDepartments", deptRepo.count());
        return stats;
    }
}