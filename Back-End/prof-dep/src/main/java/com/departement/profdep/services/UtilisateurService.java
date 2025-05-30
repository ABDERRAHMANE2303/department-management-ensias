package com.departement.profdep.services;

import com.departement.profdep.dto.UtilisateurRequestDTO;
import com.departement.profdep.repositories.UtilisateurRepository;
import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> getUtilisateurById(String id) {
        return utilisateurRepository.findById(id);
    }

    public Utilisateur createUtilisateur(UtilisateurRequestDTO dto) {
        // In a real app, you'd hash the password here
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNomUtilisateur(dto.getNomUtilisateur());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setMotDePasseHash(dto.getMotDePasse()); // Should be hashed!
        utilisateur.setRole(dto.getRole());
        utilisateur.setOauthId(dto.getOauthId());
        utilisateur.setOauthProvider(dto.getOauthProvider());
        utilisateur.setProfesseurId(dto.getProfesseurId());
        utilisateur.setDepartementId(dto.getDepartementId());
        utilisateur.setEstActif(true);

        return utilisateurRepository.save(utilisateur);
    }

    public Optional<Utilisateur> updateUtilisateur(String id, UtilisateurRequestDTO dto) {
        return utilisateurRepository.findById(id)
                .map(utilisateur -> {
                    if (dto.getNomUtilisateur() != null) {
                        utilisateur.setNomUtilisateur(dto.getNomUtilisateur());
                    }
                    if (dto.getEmail() != null) {
                        utilisateur.setEmail(dto.getEmail());
                    }
                    if (dto.getMotDePasse() != null) {
                        utilisateur.setMotDePasseHash(dto.getMotDePasse()); // Should be hashed!
                    }
                    if (dto.getRole() != null) {
                        utilisateur.setRole(dto.getRole());
                    }
                    utilisateur.setOauthId(dto.getOauthId());
                    utilisateur.setOauthProvider(dto.getOauthProvider());
                    utilisateur.setProfesseurId(dto.getProfesseurId());
                    utilisateur.setDepartementId(dto.getDepartementId());

                    return utilisateurRepository.save(utilisateur);
                });
    }

    public void deleteUtilisateur(String id) {
        utilisateurRepository.deleteById(id);
    }
}