import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DepartmentDashboard.css'; 

import { 
  Menu, Sun, Moon, Layers, User, Save, Edit, GraduationCap,
  FileText, Mail, Phone, LogOut, Eye
} from 'lucide-react';

const ProfessorDashboard = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingModule, setEditingModule] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  // Current user data (professor) - aligned with utilisateurs schema
  const [currentUser, setCurrentUser] = useState({
    id: "prof-789",
    nom_utilisateur: "a.ettalbi",
    email: "ahmed.ettalbi@um5.ac.ma",
    mot_de_passe_hash: "hashed_password",
    role: "professeur",
    professeur_id: "prof-789",
    departement_id: "dept-gl-01",
    isCoordinator: false,
    isChefDep: false,
    specialite: "Cloud Computing, Web Services and multiview Web Services, Software Oriented Architectures, Petri Networks, Object modeling with views and points of views, Software reuse",
    titre: "professeur de l'enseignement supérieur",
    image: "/src/assets/prof-ettalbi.png",
    derniere_connexion: "2023-05-26T16:45:00Z",
    est_actif: true,
    date_creation: "2025-06-01T09:30:00Z",
    date_modification: "2025-06-01T10:05:00Z"
  });

  // Department name (for display purposes)
  const [departementName, setDepartementName] = useState("Génie Logiciel");

  // Assigned modules data - aligned with modules schema
  const [assignedModules, setAssignedModules] = useState([
    {
      id: "mod-gl-3-3",
      semesterId: "sem-gl-3",
      name: "Réseaux",
      description: "Architectures réseaux et protocoles de communication. Ce module couvre les fondamentaux des réseaux informatiques, du modèle OSI aux applications pratiques.",
      professorName: "a.professor",
      professorId: "prof-789"
    },
    {
      id: "mod-gl-4-1",
      semesterId: "sem-gl-4",
      name: "Bases de Données Avancées",
      description: "Concepts avancés des bases de données incluant les bases NoSQL, distribuées et l'optimisation des requêtes.",
      professorName: "a.professor",
      professorId: "prof-789"
    }
  ]);

  // Semester data (for displaying semester names)
  const [semesters, setSemesters] = useState([
    {
      id: "sem-gl-3",
      formationId: "GL",
      number: 3,
      name: "3ème Semestre (S3) - Approfondissement",
      description: "Technologies avancées et méthodes de développement",
      colorGradient: "from-purple-500 to-purple-600"
    },
    {
      id: "sem-gl-4",
      formationId: "GL",
      number: 4,
      name: "4ème Semestre (S4) - Approfondissement",
      description: "Systèmes d'information et technologies entreprise",
      colorGradient: "from-red-500 to-red-600"
    }
  ]);

  // Effect to update dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Toggle functions
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value,
      date_modification: new Date().toISOString()
    }));
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentUser(prev => ({
        ...prev,
        image: imageUrl,
        date_modification: new Date().toISOString()
      }));
      alert("Image de profil mise à jour avec succès!");
    }
  };

  const saveProfileChanges = () => {
    console.log("Saving profile changes:", currentUser);
    setEditingProfile(false);
    // In a real app, you'd make an API call here
  };

  // Module handlers
  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    if (selectedModule) {
      setAssignedModules(modules => 
        modules.map(m => 
          m.id === selectedModule.id ? { ...m, [name]: value } : m
        )
      );
    }
  };

  const saveModuleChanges = () => {
    console.log("Saving module changes:", assignedModules.find(m => m.id === selectedModule.id));
    setEditingModule(false);
    setSelectedModule(null);
    // In a real app, you'd make an API call here
  };

  // Get semester name by ID
  const getSemesterName = (semesterId) => {
    const semester = semesters.find(s => s.id === semesterId);
    return semester ? semester.name : "Semestre inconnu";
  };

  return (
    <div className={`app-layout professeur ${darkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} role="navigation" aria-label="Main Navigation">
        <div className="sidebar-header">
          <div className="logo-container">
            <GraduationCap className="logo-icon" />
            {isSidebarOpen && <span className="logo-text">ENSIAS</span>}
          </div>
          {/* <button 
            className="sidebar-toggle-button" 
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu size={20} />
          </button> */}
        </div>
        
        <nav className="sidebar-menu">
          <button 
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            aria-current={activeTab === 'profile' ? 'page' : undefined}
          >
            <User size={20} />
            {isSidebarOpen && <span>Mon profil</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
            aria-current={activeTab === 'modules' ? 'page' : undefined}
          >
            <Layers size={20} />
            {isSidebarOpen && <span>Mes modules</span>}
          </button>
          
          <div className="sidebar-separator"></div>
          
          <Link to="/" className="sidebar-item">
            <LogOut size={20} />
            {isSidebarOpen && <span>Déconnexion</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-container">
        {/* Header */}
        <header className="site-header">
          <div className="header-left">
            <button className="sidebar-trigger" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
            <h1 className="page-title">
              {activeTab === 'profile' && 'Mon profil'}
              {activeTab === 'modules' && 'Mes modules'}
            </h1>
          </div>
          <div className="header-right">
            <Link to="/" className="view-site-button">
              <Eye size={18} />
              <span className="button-text">Voir le site</span>
            </Link>
            
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="user-avatar">
              <img 
                src={currentUser.image} 
                alt="Profile" 
                className="avatar-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40";
                  e.target.onerror = null;
                }}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="site-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Mon profil</h2>
                {!editingProfile ? (
                  <button 
                    className="action-button primary"
                    onClick={() => setEditingProfile(true)}
                  >
                    <Edit size={18} />
                    <span>Modifier</span>
                  </button>
                ) : (
                  <button 
                    className="action-button success"
                    onClick={saveProfileChanges}
                  >
                    <Save size={18} />
                    <span>Enregistrer</span>
                  </button>
                )}
              </div>
              
              <div className="profile-container">
                <div className="profile-header">
                  <div className="profile-image-container">
                    <img 
                      src={currentUser.image} 
                      alt="Profile" 
                      className="profile-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/120";
                        e.target.onerror = null;
                      }}
                    />
                    {editingProfile && (
                      <>
                        <div className="profile-image-overlay">
                          <button 
                            className="change-image-button"
                            onClick={() => document.getElementById('profile-image-upload').click()}
                          >
                            <Edit size={24} />
                          </button>
                        </div>
                        <input
                          type="file"
                          id="profile-image-upload"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          style={{ display: 'none' }}
                        />
                      </>
                    )}
                  </div>
                  <div className="profile-titles">
                    <h3 className="profile-name">{currentUser.nom_utilisateur}</h3>
                    <span className="profile-role">Professeur</span>
                  </div>
                </div>
                
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom d'utilisateur</label>
                      {editingProfile ? (
                        <input 
                          type="text" 
                          name="nom_utilisateur"
                          value={currentUser.nom_utilisateur}
                          onChange={handleProfileChange}
                        />
                      ) : (
                        <div className="display-value">{currentUser.nom_utilisateur}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      {editingProfile ? (
                        <input 
                          type="email" 
                          name="email"
                          value={currentUser.email}
                          onChange={handleProfileChange}
                        />
                      ) : (
                        <div className="display-value">{currentUser.email}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Titre</label>
                      {editingProfile ? (
                        <input 
                          type="text" 
                          name="titre"
                          value={currentUser.titre}
                          onChange={handleProfileChange}
                        />
                      ) : (
                        <div className="display-value">{currentUser.titre}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Spécialité</label>
                      {editingProfile ? (
                        <input 
                          type="text" 
                          name="specialite"
                          value={currentUser.specialite}
                          onChange={handleProfileChange}
                        />
                      ) : (
                        <div className="display-value">{currentUser.specialite}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Département</label>
                      <div className="display-value">{departementName}</div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date de création</label>
                      <div className="display-value">
                        {new Date(currentUser.date_creation).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Dernière modification</label>
                      <div className="display-value">
                        {new Date(currentUser.date_modification).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  
                  {editingProfile && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nouveau mot de passe</label>
                        <input 
                          type="password" 
                          name="newPassword"
                          placeholder="Laissez vide pour ne pas changer"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input 
                          type="password" 
                          name="confirmPassword"
                          placeholder="Confirmer le nouveau mot de passe"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Mes modules</h2>
              </div>
              
              {editingModule && selectedModule ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    Modifier les informations du module
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom du module</label>
                      <div className="display-value">
                        {assignedModules.find(m => m.id === selectedModule.id)?.name}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Semestre</label>
                      <div className="display-value">
                        {getSemesterName(assignedModules.find(m => m.id === selectedModule.id)?.semesterId)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      name="description"
                      value={assignedModules.find(m => m.id === selectedModule.id)?.description}
                      onChange={handleModuleChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingModule(false);
                        setSelectedModule(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveModuleChanges}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modules-grid">
                  {assignedModules.map(module => (
                    <div className="module-card" key={module.id}>
                      <div className="module-card-header">
                        <h3 className="module-card-title">{module.name}</h3>
                        <div className="module-card-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedModule(module);
                              setEditingModule(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="module-card-description">
                        {module.description}
                      </div>
                      
                      <div className="module-detail">
                        <div className="detail-label">Semestre:</div>
                        <div className="detail-value">{getSemesterName(module.semesterId)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfessorDashboard;