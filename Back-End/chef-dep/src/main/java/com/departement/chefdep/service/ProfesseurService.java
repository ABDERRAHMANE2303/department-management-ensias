package com.departement.chefdep.service;

import com.departement.chefdep.dto.ProfesseurDTO;
import com.departement.chefdep.repository.FormationRepository;
import com.departement.chefdep.repository.UtilisateurRepository;
import com.departement.commonmodels.entities.Formation;
import com.departement.commonmodels.entities.Utilisateur;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfesseurService {

    private static final String ROLE_PROF = "professeur";

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private FormationRepository formationRepository;

    public List<ProfesseurDTO> getProfesseursByDepartementId(String departementId) {
        List<Utilisateur> professeurs = utilisateurRepository.findByRoleAndDepartementId(ROLE_PROF, departementId);
        return professeurs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProfesseurDTO getProfesseurById(String id) {
        Optional<Utilisateur> professeurOpt = utilisateurRepository.findById(id);
        return professeurOpt.filter(p -> ROLE_PROF.equals(p.getRole()))
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Transactional
    public ProfesseurDTO updateProfesseur(String id, ProfesseurDTO professeurDTO) {
        Optional<Utilisateur> professeurOpt = utilisateurRepository.findById(id);
        if (professeurOpt.isPresent() && ROLE_PROF.equals(professeurOpt.get().getRole())) {
            Utilisateur professeur = professeurOpt.get();

            // Update allowed fields
            professeur.setNom(professeurDTO.getNom());
            professeur.setPrenom(professeurDTO.getPrenom());
            professeur.setNomUtilisateur(professeurDTO.getNomUtilisateur());
            professeur.setSpecialite(professeurDTO.getSpecialite());
            professeur.setTitre(professeurDTO.getTitre());
            professeur.setImage(professeurDTO.getImage());
            professeur.setPhone(professeurDTO.getPhone());

            professeur = utilisateurRepository.save(professeur);
            return convertToDTO(professeur);
        }
        return null;
    }

    @Transactional
    public boolean assignAsCoordinator(String professeurId, String formationId) {
        Optional<Utilisateur> professeurOpt = utilisateurRepository.findById(professeurId);
        Optional<Formation> formationOpt = formationRepository.findById(formationId);

        if (professeurOpt.isPresent() && formationOpt.isPresent() &&
                ROLE_PROF.equals(professeurOpt.get().getRole())) {

            Utilisateur professeur = professeurOpt.get();
            Formation formation = formationOpt.get();

            // Set the professor as coordinator
            // professeur.setIsCoordinator(true);
            professeur.setRole("cf"); // Ensure the role is set correctly
            professeur.setFormationId(formationId);
            utilisateurRepository.save(professeur);

            // Update the formation with the new coordinator
            formation.setCoordinateurId(professeurId);
            formationRepository.save(formation);

            return true;
        }
        return false;
    }

    private ProfesseurDTO convertToDTO(Utilisateur utilisateur) {
        ProfesseurDTO dto = new ProfesseurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setNomUtilisateur(utilisateur.getNomUtilisateur());
        dto.setEmail(utilisateur.getEmail());
        dto.setDepartementId(utilisateur.getDepartementId());
        dto.setFormationId(utilisateur.getFormationId());
        // dto.setIsCoordinator(utilisateur.isCoordinator());
        // dto.setIsChefDep(utilisateur.isChefDep());
        dto.setSpecialite(utilisateur.getSpecialite());
        dto.setTitre(utilisateur.getTitre());
        dto.setImage(utilisateur.getImage());
        dto.setPhone(utilisateur.getPhone());
        dto.setEstActif(utilisateur.isEstActif());
        return dto;
    }
}