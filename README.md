# Scénarios des Cas d'Utilisation - Système de Gestion Départementale ENSIAS

## 1. S'authentifier

**Acteurs:** Admin, Chef département, Professeur

### Scénario principal
1. L'utilisateur accède à la page d'accueil du système
2. L'utilisateur clique sur "Se connecter"
3. Le système affiche le formulaire d'authentification
4. L'utilisateur saisit son nom_utilisateur et mot_de_passe
5. L'utilisateur valide le formulaire
6. Le système vérifie les informations d'identification dans la table `utilisateurs`
7. Le système authentifie l'utilisateur et enregistre la date dans `derniere_connexion`
8. Le système redirige l'utilisateur vers son tableau de bord selon son `role` (admin, chef département, professeur)

### Scénarios alternatifs
- **A6: Identifiants incorrects**
  1. Le système affiche un message d'erreur
  2. L'utilisateur peut réessayer ou demander la récupération du mot de passe

---

## 2. Gérer les utilisateurs et leurs droits d'accès

**Acteur:** Admin

### Scénario principal
1. L'admin s'authentifie avec un compte où `role = 'admin'`
2. L'admin accède à la section "Gestion des utilisateurs"
3. Le système affiche la liste des utilisateurs extraite de la table `utilisateurs`
4. L'admin peut effectuer les actions suivantes:
   - Créer un nouvel utilisateur (insertion dans `utilisateurs`)
   - Modifier un utilisateur existant (mise à jour de `utilisateurs`)
   - Activer/désactiver un compte (changer `est_actif`)
   - Attribuer/modifier des rôles (changer `role` en 'admin', 'professeur' ou 'cf')
   - Désigner un coordinateur (professeur_id dans `formations`)
   - Sélectionne un chef du département parmi les professeurs du département


### Scénarios alternatifs
- **Création d'un utilisateur professeur:**
  1. L'admin vérifie si le professeur existe déjà dans `professeurs`
  2. Si oui, il lie le compte utilisateur à l'entrée existante via `professeur_id`
  3. Si non, il doit d'abord créer l'entrée dans `professeurs` puis lier le compte

---

## 3. Gérer les informations du département

**Acteur:** Chef département (utilisateur avec role = 'cf')

### Scénario principal
1. Le chef s'authentifie (utilisateur lié au département via `departement_id`)
2. Il accède à la section "Informations département"
3. Le système affiche les informations actuelles du département depuis la table `departements` 
4. Le chef peut modifier:
   - Le nom et la description du département
   - Le code du département (ex: "GL", "II", "GI")
   - Ajouter des actualités
   - Mettre à jour la date de modification
5. Le système enregistre les modifications dans `departements` 
6. Le système met à jour `date_modification` avec le timestamp actuel

### Scénario alternatif
- **Changement de chef de département:**
  1. Le chef actuel accède à la section "Administration"
  2. Il sélectionne un nouveau chef parmi les professeurs du département
  3. Le système met à jour `chef_departement_id` dans la table `departements`
  4. Le système met à jour les droits d'accès correspondants dans `utilisateurs`

---

## 4. Gérer les professeurs

**Acteur:** Chef département

### Scénario principal
1. Le chef département s'authentifie
2. Il accède à la section "Gestion des professeurs"
3. Le système affiche la liste des professeurs du département depuis `professeurs` où `departement_id` correspond
4. Le chef peut:
   - Ajouter un nouveau professeur (insertion dans `professeurs`)
   - Modifier les informations d'un professeur existant
     - Nom, prénom, email, téléphone
     - Grade ("Professeur", "Maitre Assistant", "Assistant")
     - Spécialité et bureau
     - Statut ("Permanent", "Vacataire", "Visiteur")
   - Désactiver un professeur (changer `est_actif` à false)

### Scénario alternatif
- **Affecter un professeur à un module:**
  1. Le chef sélectionne un professeur dans la liste
  2. Il accède à la section "Affectations"
  3. Il sélectionne un module disponible et une année académique
  4. Il définit le rôle ("Titulaire", "Intervenant", "Responsable")
  5. Le système enregistre l'affectation dans `module_professeurs`

---

## 5. Gérer les formations et modules

**Acteurs:** Chef département, Professeur coordinateur

### Scénario principal (Chef département)
1. Le chef département s'authentifie
2. Il accède à "Gestion des formations"
3. Le système affiche la liste des formations du département depuis `formations`
4. Il peut:
   - Créer une nouvelle formation (insertion dans `formations`)
     - Nom, description, niveau ("Licence", "Master", "Doctorat")
     - Durée en années, année académique, capacité maximale
   - Désigner un coordinateur (professeur_id dans `formations`)
   - Modifier/désactiver une formation existante

### Scénario principal (Gestion des modules)
1. L'utilisateur (chef ou coordinateur) sélectionne une formation
2. Il accède à "Modules de la formation"
3. Le système affiche la liste des modules depuis `modules` où `formation_id` correspond
4. Il peut:
   - Créer un nouveau module (insertion dans `modules`)
     - Nom, description, code (ex: "INF101")
     - Semestre (1-6 pour Licence, 1-4 pour Master)
     - Crédits ECTS, type ("Obligatoire", "Optionnel", "Libre")
     - Répartition des heures (cours, TD, TP)
   - Affecter des professeurs (via `module_professeurs`)
   - Définir les éléments du module (insertion dans `elements`)
     - Nom, description, coefficient
     - Type d'évaluation ("Examen", "Contrôle", "TP", "Projet")

---

## 6. Mettre à jour les informations personnelles

**Acteurs:** Chef département, Professeur

### Scénario principal
1. L'utilisateur s'authentifie
2. Il accède à "Mon profil"
3. Le système récupère ses informations personnelles depuis:
   - `utilisateurs` (données de connexion)
   - `professeurs` (données professionnelles) si lié
4. Il peut modifier:
   - Ses coordonnées (email, téléphone, bureau)
   - Son mot de passe (mise à jour de `mot_de_passe_hash` avec cryptage)
   - Sa spécialité et son grade
5. Le système enregistre les modifications dans les tables correspondantes
6. Le système met à jour `date_modification` dans `utilisateurs`

---

## 7. Gérer ses modules et cours

**Acteur:** Professeur

### Scénario principal
1. Le professeur s'authentifie
2. Il accède à "Mes modules"
3. Le système affiche la liste de ses modules depuis `module_professeurs` 
   où `professeur_id` correspond, avec détails depuis `modules`
4. Pour chaque module, il peut:
   - Consulter les éléments du module depuis `elements`
   - Définir ou modifier les détails des éléments:
     - Type d'évaluation
     - Coefficient
     - Description du contenu
   - Gérer les matériaux pédagogiques (non représenté dans le modèle actuel)

### Scénario alternatif
- **Consultation des formations:**
  1. Le professeur sélectionne "Formations concernées"
  2. Le système affiche les formations depuis `formations` liées à ses modules
  3. Il peut consulter la structure complète et les objectifs de la formation

---

## 8. Consulter les informations du département

**Acteur:** Visiteur

### Scénario principal
1. Le visiteur accède au site web public
2. Il peut consulter sans authentification:
   - La liste des départements depuis `departements` où `est_actif = true`
   - Pour chaque département:
     - Sa description et ses informations générales
     - Ses formations actives depuis `formations` où `est_active = true`
     - La liste des professeurs depuis `professeurs` où `est_actif = true`
   - Les coordonnées et informations de contact
3. Le visiteur peut effectuer des recherches par:
   - Département (filtre sur `departements.code` ou `departements.nom`)
   - Formation (filtre sur `formations.niveau` ou `formations.nom`)
   - Domaine d'enseignement (recherche dans `modules.description`)
