package com.departement.admin.controllers;

import com.departement.admin.services.UserService;
import com.departement.admin.dto.DepartementDTO;
import com.departement.admin.dto.UtilisateurDTO;
import com.departement.admin.services.DepartementService;
import com.departement.commonmodels.entities.Utilisateur;
import com.departement.commonmodels.entities.Departement;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userSvc;
    private final DepartementService deptSvc;
    private final BCryptPasswordEncoder passwordEncoder; // Add password encoder instance

    public AdminController(UserService userSvc, DepartementService deptSvc) {
        this.userSvc = userSvc;
        this.deptSvc = deptSvc;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Initialize password encoder
    }

    // --- USERS CRUD using DTOs ---
    @PostMapping("/users")
    public Utilisateur createUser(@RequestBody UtilisateurDTO dto) {
        Utilisateur u = new Utilisateur();

        // Handle password hashing entirely in the controller
        if (dto.getMotDePasse() != null && !dto.getMotDePasse().isEmpty()) {

            // Use the existing passwordEncoder instance
            u.setMotDePasseHash(passwordEncoder.encode(dto.getMotDePasse()));
        }

        // Set other fields
        u.setNomUtilisateur(dto.getNomUtilisateur());
        u.setPrenom(dto.getPrenom());
        u.setNom(dto.getNom());
        u.setEmail(dto.getEmail());
        u.setRole(dto.getRole());
        u.setDepartementId(dto.getDepartementId());
        u.setChefDep(Boolean.TRUE.equals(dto.getChefDep()));
        u.setCoordinator(Boolean.TRUE.equals(dto.getCoordinator()));
        u.setSpecialite(dto.getSpecialite());
        u.setTitre(dto.getTitre());
        u.setPhone(dto.getPhone());
        u.setImage(dto.getImage());
        return userSvc.create(u);
    }

    @PutMapping("/users/{id}")
    public Utilisateur updateUser(@PathVariable String id,
            @RequestBody UtilisateurDTO dto) {
        Utilisateur u = new Utilisateur();
        u.setId(id);
        // same mapping as in create…
        u.setNomUtilisateur(dto.getNomUtilisateur());
        u.setPrenom(dto.getPrenom());
        u.setNom(dto.getNom());
        u.setEmail(dto.getEmail());
        // Hash the password before saving
        if (dto.getMotDePasse() != null && !dto.getMotDePasse().isEmpty()) {
            // Use BCryptPasswordEncoder for secure hashing
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(dto.getMotDePasse());
            u.setMotDePasseHash(hashedPassword);
        } // --- ROLE ---

        u.setRole(dto.getRole());
        u.setDepartementId(dto.getDepartementId());
        u.setChefDep(Boolean.TRUE.equals(dto.getChefDep()));
        u.setCoordinator(Boolean.TRUE.equals(dto.getCoordinator()));
        u.setSpecialite(dto.getSpecialite());
        u.setTitre(dto.getTitre());
        u.setPhone(dto.getPhone());
        u.setImage(dto.getImage());
        return userSvc.update(id, u);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id) {
        userSvc.delete(id);
    }

    // --- DEPARTMENTS CRUD using DTOs ---
    @PostMapping("/departments")
    public Departement createDepartment(@RequestBody DepartementDTO dto) {
        Departement d = new Departement();
        d.setName(dto.getName());
        d.setSlug(dto.getSlug());
        d.setSlogan(dto.getSlogan());
        d.setDescription(dto.getDescription());
        d.setVision(dto.getVision());
        d.setYearsFounded(dto.getYearsFounded());
        d.setActiveStudentsCount(dto.getActiveStudentsCount());
        d.setGraduatesCount(dto.getGraduatesCount());
        d.setPublicationsCount(dto.getPublicationsCount());
        d.setContactEmail(dto.getContactEmail());
        d.setContactPhone(dto.getContactPhone());
        d.setOpenDaysInfo(dto.getOpenDaysInfo());
        d.setBackgroundImage(dto.getBackgroundImage());
        return deptSvc.create(d);
    }

    @PutMapping("/departments/{id}")
    public Departement updateDepartment(@PathVariable String id,
            @RequestBody DepartementDTO dto) {
        Departement d = new Departement();
        d.setId(id);
        // same mapping…
        d.setName(dto.getName());
        d.setSlug(dto.getSlug());
        d.setSlogan(dto.getSlogan());
        d.setDescription(dto.getDescription());
        d.setVision(dto.getVision());
        d.setYearsFounded(dto.getYearsFounded());
        d.setActiveStudentsCount(dto.getActiveStudentsCount());
        d.setGraduatesCount(dto.getGraduatesCount());
        d.setPublicationsCount(dto.getPublicationsCount());
        d.setContactEmail(dto.getContactEmail());
        d.setContactPhone(dto.getContactPhone());
        d.setOpenDaysInfo(dto.getOpenDaysInfo());
        d.setBackgroundImage(dto.getBackgroundImage());
        return deptSvc.update(id, d);
    }

    @DeleteMapping("/departments/{id}")
    public void deleteDepartment(@PathVariable String id) {
        deptSvc.delete(id);
    }

    // --- other endpoints remain unchanged ---
    @GetMapping("/users")
    public List<Utilisateur> listUsers() {
        return userSvc.getAll();
    }

    @GetMapping("/users/{id}")
    public Utilisateur getUser(@PathVariable String id) {
        return userSvc.getById(id);
    }

    @GetMapping("/departments")
    public List<Departement> listDepartments() {
        return deptSvc.getAll();
    }

    @GetMapping("/departments/{id}")
    public Departement getDepartment(@PathVariable String id) {
        return deptSvc.getById(id);
    }

    // --- DEPARTMENT ↔ USER assignments ---
    @GetMapping("/departments/{deptId}/users")
    public List<Utilisateur> usersByDept(@PathVariable String deptId) {
        return userSvc.getByDepartment(deptId);
    }

    // --- DASHBOARD STATS ---
    @GetMapping("/stats")
    public Map<String, Long> stats() {
        return userSvc.dashboardStats();
    }

    @PutMapping("/users/{userId}/assignChef/{departmentId}")
    public Utilisateur assignChefToDepartment(
            @PathVariable String userId,
            @PathVariable String departmentId) {

        // Get the current entities
        Utilisateur user = userSvc.getById(userId);
        Departement department = deptSvc.getById(departmentId);

        // Find previous chief and demote if exists
        if (department.getChefId() != null && !department.getChefId().equals(userId)) {
            Utilisateur previousChief = userSvc.getById(department.getChefId());
            if (previousChief != null) {
                previousChief.setRole("prof");
                // Don't need to set isChefDep separately - just rely on role
                userSvc.update(department.getChefId(), previousChief);
            }
        }

        // Update department with new chief
        department.setChefId(userId);
        deptSvc.update(departmentId, department);

        // Update user as department chief
        user.setDepartementId(departmentId);
        user.setRole("cd");
        // Don't need explicit isChefDep flag since role is sufficient
        return userSvc.update(userId, user);
    }

    @PutMapping("/users/{userId}/assign/{departmentId}")
    public Utilisateur assignUserToDepartment(
            @PathVariable String userId,
            @PathVariable String departmentId) {

        Utilisateur user = userSvc.getById(userId);

        // If "none", unassign user from department
        if ("none".equals(departmentId)) {
            // If user was a chief, check if they need to be demoted
            if ("cd".equals(user.getRole())) {
                // Find any department where this user was chief and unset
                List<Departement> departments = deptSvc.getAll();
                for (Departement dept : departments) {
                    if (userId.equals(dept.getChefId())) {
                        dept.setChefId(null);
                        deptSvc.update(dept.getId(), dept);
                        break;
                    }
                }

                // Demote the user to regular professor
                user.setRole("prof");
            }

            // Remove department assignment
            user.setDepartementId(null);
        } else {
            // Assign to department but don't change role
            user.setDepartementId(departmentId);
        }

        return userSvc.update(userId, user);
    }

}