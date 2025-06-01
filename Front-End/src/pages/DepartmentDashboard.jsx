import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DepartmentDashboard.css';
import { 
  Home, Menu, X, Sun, Moon, BookOpen, Layers, Users, BookMarked, Award,
  GraduationCap, Plus, Edit, Trash2, Save, BarChart3, Settings, LogOut,
  User, Mail, Phone, Eye, FileEdit, School, Calendar, UserCheck, Book
} from 'lucide-react';

const DepartmentDashboard = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSection, setActiveSection] = useState('department');
  
  // Example data
  const [departmentData, setDepartmentData] = useState({
    id: "dept-gl-01",
    name: "Génie Logiciel",
    slug: "genie-logiciel",
    chefId: "user-123",
    slogan: "Excellence • Innovation • Performance",
    description: "Le département Génie Logiciel forme des ingénieurs spécialisés dans la conception, le développement et la maintenance de systèmes logiciels complexes. Nos diplômés acquièrent des compétences techniques et managériales recherchées dans l'industrie.",
    vision: "Former des experts du numérique capables de transformer les défis technologiques en opportunités d'innovation.",
    yearsFounded: 2003,
    graduatesCount: 520,
    activeStudentsCount: 180,
    PublicationsCount: 65,
    views: 65,
    contactEmail: "departement.gl@ensias.ma",
    contactPhone: "+212 5 37 68 71 50",
    openDaysInfo: "Journées Portes Ouvertes : Mars 2024",
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  });

  const [formations, setFormations] = useState([
    {
      id: "GL",
      departmentId: "dept-gl-01",
      slug: "genie-logiciel",
      name: "Formation Génie Logiciel",
      shortName: "GL",
      description: "Formation en développement logiciel et conception de systèmes",
      CoordinateurId: "prof-123"
    },
    {
      id: "GD",
      departmentId: "dept-gl-01", 
      slug: "genie-data",
      name: "Formation Génie Data",
      shortName: "GD",
      description: "Formation en science des données et intelligence artificielle",
      CoordinateurId: "prof-456"
    }
  ]);

  const [professors, setProfessors] = useState([
    {
      id: "prof-123",
      nom_utilisateur: "m.nassar",
      email: "m.nassar@ensias.ma",
      role: "cd: chef departement",
      departement_id: "dept-gl-01",
      isCoordinator: true,
      isChefDep: true,
      specialite: "Génie Logiciel",
      titre: "Professeur de l'Enseignement Supérieur",
      image: "/src/assets/prof-nassar.jpg",
      phone: "+212 6 12 34 56 78"
    },
    {
      id: "prof-456",
      nom_utilisateur: "s.afia",
      email: "s.afia@ensias.ma",
      role: "cf: chef filiere",
      departement_id: "dept-gl-01",
      isCoordinator: true,
      isChefDep: false,
      specialite: "Science des données",
      titre: "Professeur Habilité",
      image: "/src/assets/prof-afia.jpg",
      phone: "+212 6 23 45 67 89"
    },
    {
      id: "prof-789",
      nom_utilisateur: "a.professor",
      email: "a.professor@ensias.ma", 
      role: "professeur",
      departement_id: "dept-gl-01",
      isCoordinator: false,
      isChefDep: false,
      specialite: "Intelligence Artificielle",
      titre: "Professeur Assistant",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      phone: "+212 6 34 56 78 90"
    }
  ]);

  // Current user data (department chief)
  const [currentUser, setCurrentUser] = useState({
    id: "prof-123",
    nom_utilisateur: "m.nassar",
    email: "m.nassar@ensias.ma",
    role: "cd: chef departement",
    departement_id: "dept-gl-01",
    isCoordinator: true,
    isChefDep: true,
    specialite: "Génie Logiciel",
    titre: "Professeur de l'Enseignement Supérieur",
    image: "/src/assets/prof-nassar.jpg",
    phone: "+212 6 12 34 56 78"
  });

  // Forms state
  const [editingDepartment, setEditingDepartment] = useState(false);
  const [editingFormation, setEditingFormation] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [editingProfessor, setEditingProfessor] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingModule, setEditingModule] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newFormation, setNewFormation] = useState({
    name: "",
    shortName: "",
    description: "",
    slug: ""
  });
  const [newProfessor, setNewProfessor] = useState({
    nom_utilisateur: "",
    email: "",
    specialite: "",
    titre: "",
    phone: "",
    isCoordinator: false,
    role: "professeur",
    password: "",
    confirmPassword: ""
  });
  
  // Add module data for department head
  const [assignedModules, setAssignedModules] = useState([
    {
      id: "mod-gl-1-1",
      semesterId: "sem-gl-1",
      name: "Introduction au Génie Logiciel",
      description: "Ce module introduit les concepts fondamentaux du génie logiciel, les méthodologies de développement et les bonnes pratiques de l'industrie.",
      professorName: "m.nassar",
      professorId: "prof-123"
    },
    {
      id: "mod-gl-2-2",
      semesterId: "sem-gl-2",
      name: "Architecture Logicielle",
      description: "Étude des patterns d'architecture, des principes SOLID et des méthodes de conception des systèmes logiciels complexes.",
      professorName: "m.nassar",
      professorId: "prof-123"
    }
  ]);
  
  // Add semester data for context
  const [semesters, setSemesters] = useState([
    {
      id: "sem-gl-1",
      formationId: "GL",
      number: 1,
      name: "1er Semestre (S1) - Fondamentaux",
      description: "Bases de la programmation et introduction au génie logiciel",
      colorGradient: "from-blue-500 to-blue-600"
    },
    {
      id: "sem-gl-2",
      formationId: "GL",
      number: 2,
      name: "2ème Semestre (S2) - Bases avancées",
      description: "Développement d'applications et conception logicielle",
      colorGradient: "from-green-500 to-green-600"
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

  // Form handlers
  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormationChange = (e) => {
    const { name, value } = e.target;
    if (selectedFormation) {
      setFormations(formations.map(f => 
        f.id === selectedFormation.id ? {...f, [name]: value} : f
      ));
    } else {
      setNewFormation(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfessorChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    if (selectedProfessor) {
      setProfessors(professors.map(p => 
        p.id === selectedProfessor.id ? {...p, [name]: val} : p
      ));
    } else {
      setNewProfessor(prev => ({
        ...prev,
        [name]: val
      }));
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // New handler for profile image upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload the file to your server/cloud storage
      // For now, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      setCurrentUser(prev => ({
        ...prev,
        image: imageUrl
      }));
      
      // Show a success message
      alert("Image de profil mise à jour avec succès!");
      
      // In a real app, you would have:
      // 1. Upload the file to your server/storage
      // 2. Get the URL back
      // 3. Update the user profile with the new image URL
      // const formData = new FormData();
      // formData.append('profileImage', file);
      // api.uploadProfileImage(formData).then(response => {
      //   setCurrentUser(prev => ({
      //     ...prev,
      //     image: response.imageUrl
      //   }));
      // });
    }
  };

  // Submit handlers
  const saveDepartmentChanges = () => {
    // In a real app, send API request to update department
    console.log("Saving department changes:", departmentData);
    setEditingDepartment(false);
  };

  const saveFormationChanges = () => {
    if (selectedFormation) {
      // Update existing formation
      console.log("Saving formation changes:", 
        formations.find(f => f.id === selectedFormation.id)
      );
    } else {
      // Create new formation
      const newId = `formation-${Date.now()}`;
      const formationToAdd = {
        ...newFormation,
        id: newId,
        departmentId: departmentData.id,
        CoordinateurId: null
      };
      setFormations([...formations, formationToAdd]);
      console.log("Added new formation:", formationToAdd);
      setNewFormation({
        name: "",
        shortName: "",
        description: "",
        slug: ""
      });
    }
    setEditingFormation(false);
    setSelectedFormation(null);
  };

  const saveProfessorChanges = () => {
    if (selectedProfessor) {
      // Update existing professor
      console.log("Saving professor changes:", 
        professors.find(p => p.id === selectedProfessor.id)
      );
    } else {
      // Create new professor
      const newId = `prof-${Date.now()}`;
      const professorToAdd = {
        ...newProfessor,
        id: newId,
        departement_id: departmentData.id,
        image: "https://randomuser.me/api/portraits/people/42.jpg", // Default image
      };
      setProfessors([...professors, professorToAdd]);
      console.log("Added new professor:", professorToAdd);
      setNewProfessor({
        nom_utilisateur: "",
        email: "",
        specialite: "",
        titre: "",
        phone: "",
        isCoordinator: false,
        role: "professeur",
        password: "",
        confirmPassword: ""
      });
    }
    setEditingProfessor(false);
    setSelectedProfessor(null);
  };

  const saveProfileChanges = () => {
    // In a real app, send API request to update profile
    console.log("Saving profile changes:", currentUser);
    setEditingProfile(false);
  };

  const saveModuleChanges = () => {
    console.log("Saving module changes:", assignedModules.find(m => m.id === selectedModule.id));
    setEditingModule(false);
    setSelectedModule(null);
    // In a real app, you'd make an API call here
  };

  const assignCoordinator = (professorId, formationId) => {
    // Update formation with new coordinator
    setFormations(formations.map(f => 
      f.id === formationId ? {...f, CoordinateurId: professorId} : f
    ));
    
    // Update professor role
    setProfessors(professors.map(p => 
      p.id === professorId ? {...p, isCoordinator: true, role: "cf: chef filiere"} : p
    ));

    console.log(`Assigned professor ${professorId} as coordinator for formation ${formationId}`);
  };

  const deleteFormation = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      setFormations(formations.filter(f => f.id !== id));
    }
  };

  const deleteProfessor = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
      setProfessors(professors.filter(p => p.id !== id));
    }
  };

  // Helper function to get semester name by ID
  const getSemesterName = (semesterId) => {
    const semester = semesters.find(s => s.id === semesterId);
    return semester ? semester.name : "Semestre inconnu";
  };
// Fix handleModuleChange function
  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    if (selectedModule) {
      setAssignedModules(currentModules => 
        currentModules.map(m => 
          m.id === selectedModule.id ? { ...m, [name]: value } : m
        )
      );
    }
  };
  return (
    <div className={`app-layout chef-dep ${darkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} role="navigation" aria-label="Main Navigation">
        <div className="sidebar-header">
          <div className="logo-container">
            <GraduationCap className="logo-icon" />
            {isSidebarOpen && <span className="logo-text">ENSIAS</span>}
          </div>
          <button 
            className="sidebar-toggle-button" 
            onClick={toggleSidebar} 
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {/* {isSidebarOpen ? <X size={20} /> : <Menu size={20} />} */}
          </button>
        </div>
        
        <nav className="sidebar-menu">
          <button 
            className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            aria-current={activeTab === 'overview' ? 'page' : undefined}
          >
            <BarChart3 size={20} />
            {isSidebarOpen && <span>Vue d'ensemble</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'department' ? 'active' : ''}`}
            onClick={() => setActiveTab('department')}
            aria-current={activeTab === 'department' ? 'page' : undefined}
          >
            <BookOpen size={20} />
            {isSidebarOpen && <span>Département</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'formations' ? 'active' : ''}`}
            onClick={() => setActiveTab('formations')}
            aria-current={activeTab === 'formations' ? 'page' : undefined}
          >
            <Layers size={20} />
            {isSidebarOpen && <span>Formations</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'professors' ? 'active' : ''}`}
            onClick={() => setActiveTab('professors')}
            aria-current={activeTab === 'professors' ? 'page' : undefined}
          >
            <Users size={20} />
            {isSidebarOpen && <span>Professeurs</span>}
          </button>
          
          {/* Add new sidebar item for modules */}
          <button 
            className={`sidebar-item ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
            aria-current={activeTab === 'modules' ? 'page' : undefined}
          >
            <Book size={20} />
            {isSidebarOpen && <span>Mes modules</span>}
          </button>
          
          <div className="sidebar-separator"></div>
          
          <button 
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            aria-current={activeTab === 'profile' ? 'page' : undefined}
          >
            <User size={20} />
            {isSidebarOpen && <span>Mon profil</span>}
          </button>
          

          
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
              {activeTab === 'overview' && 'Tableau de bord'}
              {activeTab === 'department' && 'Gestion du département'}
              {activeTab === 'formations' && 'Gestion des formations'}
              {activeTab === 'professors' && 'Gestion des professeurs'}
              {activeTab === 'modules' && 'Mes modules'}
              {activeTab === 'profile' && 'Mon profil'}
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

          {/* Overview Dashboard Tab */}
          {activeTab === 'overview' && (
            <div className="dashboard-container">
              {/* Dashboard welcome panel */}
              <div className="welcome-panel">
                <div className="welcome-content">
                  <h2 className="welcome-title">Bienvenue, {currentUser.nom_utilisateur}</h2>
                  <p className="welcome-message">
                    Tableau de bord du département {departmentData.name}
                  </p>
                </div>
                <div className="welcome-stats">
                  <div className="department-founded">
                    <School size={16} />
                    <span>Depuis {departmentData.yearsFounded}</span>
                  </div>
                  <div className="department-views">
                    <Eye size={16} />
                    <span>{departmentData.views} vues</span>
                  </div>
                </div>
              </div>

              {/* Enhanced stat cards */}
              <div className="stats-section">
                <h3 className="stats-title">Statistiques du département</h3>
                <div className="enhanced-stat-cards">
                  <div className="enhanced-stat-card active-students">
                    <div className="stat-card-icon">
                      <Users size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Étudiants actifs</span>
                      <h3 className="stat-value">{departmentData.activeStudentsCount}</h3>
                    </div>
                  </div>
                  
                  <div className="enhanced-stat-card graduates">
                    <div className="stat-card-icon">
                      <GraduationCap size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Diplômés</span>
                      <h3 className="stat-value">{departmentData.graduatesCount}</h3>
                    </div>
                  </div>
                  
                  <div className="enhanced-stat-card publications">
                    <div className="stat-card-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Publications</span>
                      <h3 className="stat-value">{departmentData.PublicationsCount}</h3>
                    </div>
                  </div>
                  
                  <div className="enhanced-stat-card page-views">
                    <div className="stat-card-icon">
                      <Eye size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Vues de la page</span>
                      <h3 className="stat-value">{departmentData.views}</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Department overview and actions in two-column layout */}
              <div className="dashboard-two-columns">
                {/* Department summary card */}
                <div className="department-summary">
                  <div className="summary-header">
                    <h3 className="section-subtitle">Aperçu du département</h3>
                  </div>
                  <div className="summary-content">
                    <div className="summary-image">
                      <img 
                        src={departmentData.backgroundImage} 
                        alt="Department"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x150?text=Image+du+département";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="summary-details">
                      <h4 className="summary-name">{departmentData.name}</h4>
                      <p className="summary-slogan">{departmentData.slogan}</p>
                      <div className="summary-stats">
                        <div className="summary-stat">
                          <Layers size={16} />
                          <span>{formations.length} Formations</span>
                        </div>
                        <div className="summary-stat">
                          <Users size={16} />
                          <span>{professors.length} Professeurs</span>
                        </div>
                      </div>
                    </div>
                    <div className="summary-description">
                      <p>{departmentData.description.substring(0, 120)}...</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced quick actions */}
                <div className="quick-actions-container">
                  <h3 className="section-subtitle">Actions rapides</h3>
                  <div className="enhanced-action-buttons">
                    <button 
                      className="enhanced-action-button department"
                      onClick={() => {
                        setActiveTab('department');
                        setEditingDepartment(true);
                      }}
                    >
                      <div className="action-button-icon">
                        <FileEdit size={24} />
                      </div>
                      <div className="action-button-content">
                        <span className="action-button-title">Modifier le département</span>
                        <span className="action-button-description">Mettez à jour les informations principales</span>
                      </div>
                    </button>
                    
                    <button 
                      className="enhanced-action-button formation"
                      onClick={() => {
                        setActiveTab('formations');
                        setEditingFormation(true);
                      }}
                    >
                      <div className="action-button-icon">
                        <Plus size={24} />
                      </div>
                      <div className="action-button-content">
                        <span className="action-button-title">Ajouter une formation</span>
                        <span className="action-button-description">Créez une nouvelle offre de formation</span>
                      </div>
                    </button>
                    
                    <button 
                      className="enhanced-action-button professor"
                      onClick={() => {
                        setActiveTab('professors');
                        setEditingProfessor(true);
                      }}
                    >
                      <div className="action-button-icon">
                        <UserCheck size={24} />
                      </div>
                      <div className="action-button-content">
                        <span className="action-button-title">Ajouter un professeur</span>
                        <span className="action-button-description">Enregistrez un nouveau membre du corps professoral</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
       
            </div>
          )}

          {/* Department Management Tab */}
          {activeTab === 'department' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Informations du département</h2>
                {!editingDepartment ? (
                  <button 
                    className="action-button primary"
                    onClick={() => setEditingDepartment(true)}
                  >
                    <Edit size={18} />
                    <span>Modifier</span>
                  </button>
                ) : (
                  <button 
                    className="action-button success"
                    onClick={saveDepartmentChanges}
                  >
                    <Save size={18} />
                    <span>Enregistrer</span>
                  </button>
                )}
              </div>
              
              <div className="form-container">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nom du département</label>
                    {editingDepartment ? (
                      <input 
                        type="text" 
                        name="name"
                        value={departmentData.name}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Slug URL</label>
                    {editingDepartment ? (
                      <input 
                        type="text" 
                        name="slug"
                        value={departmentData.slug}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.slug}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Slogan</label>
                    {editingDepartment ? (
                      <input 
                        type="text" 
                        name="slogan"
                        value={departmentData.slogan}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.slogan}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Année de fondation</label>
                    {editingDepartment ? (
                      <input 
                        type="number" 
                        name="yearsFounded"
                        value={departmentData.yearsFounded}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.yearsFounded}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>Description</label>
                  {editingDepartment ? (
                    <textarea 
                      name="description"
                      value={departmentData.description}
                      onChange={handleDepartmentChange}
                      rows={4}
                    />
                  ) : (
                    <div className="display-value">{departmentData.description}</div>
                  )}
                </div>
                
                <div className="form-group full-width">
                  <label>Vision</label>
                  {editingDepartment ? (
                    <textarea 
                      name="vision"
                      value={departmentData.vision}
                      onChange={handleDepartmentChange}
                      rows={3}
                    />
                  ) : (
                    <div className="display-value">{departmentData.vision}</div>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email de contact</label>
                    {editingDepartment ? (
                      <input 
                        type="email" 
                        name="contactEmail"
                        value={departmentData.contactEmail}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.contactEmail}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    {editingDepartment ? (
                      <input 
                        type="tel" 
                        name="contactPhone"
                        value={departmentData.contactPhone}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.contactPhone}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre d'étudiants actifs</label>
                    {editingDepartment ? (
                      <input 
                        type="number" 
                        name="activeStudentsCount"
                        value={departmentData.activeStudentsCount}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.activeStudentsCount}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Nombre de diplômés</label>
                    {editingDepartment ? (
                      <input 
                        type="number" 
                        name="graduatesCount"
                        value={departmentData.graduatesCount}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.graduatesCount}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre de publications</label>
                    {editingDepartment ? (
                      <input 
                        type="number" 
                        name="PublicationsCount"
                        value={departmentData.PublicationsCount}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.PublicationsCount}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Info journées portes ouvertes</label>
                    {editingDepartment ? (
                      <input 
                        type="text" 
                        name="openDaysInfo"
                        value={departmentData.openDaysInfo}
                        onChange={handleDepartmentChange}
                      />
                    ) : (
                      <div className="display-value">{departmentData.openDaysInfo}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>URL de l'image d'arrière-plan</label>
                  {editingDepartment ? (
                    <input 
                      type="url" 
                      name="backgroundImage"
                      value={departmentData.backgroundImage}
                      onChange={handleDepartmentChange}
                    />
                  ) : (
                    <div className="display-value with-image">
                      <img 
                        src={departmentData.backgroundImage} 
                        alt="Background preview" 
                        className="image-preview" 
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x100?text=Image+non+disponible";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Formations Management Tab */}
          {activeTab === 'formations' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Gestion des formations</h2>
                {!editingFormation && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingFormation(true);
                      setSelectedFormation(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter une formation</span>
                  </button>
                )}
              </div>
              
              {editingFormation ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedFormation ? "Modifier la formation" : "Ajouter une nouvelle formation"}
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom de la formation</label>
                      <input 
                        type="text" 
                        name="name"
                        value={selectedFormation ? 
                          formations.find(f => f.id === selectedFormation.id).name : 
                          newFormation.name
                        }
                        onChange={handleFormationChange}
                        placeholder="Formation Génie Logiciel"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nom court</label>
                      <input 
                        type="text" 
                        name="shortName"
                        value={selectedFormation ? 
                          formations.find(f => f.id === selectedFormation.id).shortName : 
                          newFormation.shortName
                        }
                        onChange={handleFormationChange}
                        placeholder="GL"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Slug URL</label>
                    <input 
                      type="text" 
                      name="slug"
                      value={selectedFormation ? 
                        formations.find(f => f.id === selectedFormation.id).slug : 
                        newFormation.slug
                      }
                      onChange={handleFormationChange}
                      placeholder="genie-logiciel"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      name="description"
                      value={selectedFormation ? 
                        formations.find(f => f.id === selectedFormation.id).description : 
                        newFormation.description
                      }
                      onChange={handleFormationChange}
                      rows={4}
                      placeholder="Description détaillée de la formation..."
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingFormation(false);
                        setSelectedFormation(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveFormationChanges}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="data-cards">
                  {formations.map(formation => (
                    <div className="data-card" key={formation.id}>
                      <div className="data-card-header">
                        <h3 className="data-card-title">{formation.name}</h3>
                        <div className="data-card-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedFormation(formation);
                              setEditingFormation(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-button delete"
                            onClick={() => deleteFormation(formation.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="data-card-body">
                        <div className="data-card-property">
                          <span className="property-label">Nom court:</span>
                          <span className="property-value">{formation.shortName}</span>
                        </div>
                        
                        <div className="data-card-property">
                          <span className="property-label">Slug:</span>
                          <span className="property-value">{formation.slug}</span>
                        </div>
                        
                        <div className="data-card-property description">
                          <span className="property-label">Description:</span>
                          <span className="property-value">{formation.description}</span>
                        </div>
                        
                        <div className="data-card-property">
                          <span className="property-label">Coordinateur:</span>
                          <span className="property-value">
                            {formation.CoordinateurId ? 
                              professors.find(p => p.id === formation.CoordinateurId)?.nom_utilisateur || "Non assigné" : 
                              "Non assigné"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="data-card-footer">
                        <div className="dropdown-container">
                          <label>Assigner un coordinateur:</label>
                          <select 
                            value={formation.CoordinateurId || ""}
                            onChange={(e) => assignCoordinator(e.target.value, formation.id)}
                          >
                            <option value="">Sélectionner un professeur</option>
                            {professors.map(prof => (
                              <option key={prof.id} value={prof.id}>
                                {prof.nom_utilisateur} - {prof.specialite}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Professors Management Tab */}
          {activeTab === 'professors' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Gestion des professeurs</h2>
                {/* {!editingProfessor && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingProfessor(true);
                      setSelectedProfessor(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter un professeur</span>
                  </button>
                )} */}
              </div>
              
              {editingProfessor ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedProfessor ? "Modifier un professeur" : "Ajouter un nouveau professeur"}
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom d'utilisateur</label>
                      <input 
                        type="text" 
                        name="nom_utilisateur"
                        value={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).nom_utilisateur : 
                          newProfessor.nom_utilisateur
                        }
                        onChange={handleProfessorChange}
                        placeholder="m.professeur"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).email : 
                          newProfessor.email
                        }
                        onChange={handleProfessorChange}
                        placeholder="professeur@ensias.ma"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Spécialité</label>
                      <input 
                        type="text" 
                        name="specialite"
                        value={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).specialite : 
                          newProfessor.specialite
                        }
                        onChange={handleProfessorChange}
                        placeholder="Intelligence Artificielle"
                      />
                    </div>
                    <div className="form-group">
                      <label>Titre</label>
                      <input 
                        type="text" 
                        name="titre"
                        value={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).titre : 
                          newProfessor.titre
                        }
                        onChange={handleProfessorChange}
                        placeholder="Professeur Assistant"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).phone : 
                          newProfessor.phone
                        }
                        onChange={handleProfessorChange}
                        placeholder="+212 6XX XX XX XX"
                      />
                    </div>
                    <div className="form-group">
                      <label>Rôle</label>
                      <select 
                        name="role"
                        value={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).role : 
                          newProfessor.role
                        }
                        onChange={handleProfessorChange}
                      >
                        <option value="professeur">Professeur</option>
                        <option value="cf: chef filiere">Chef de Filière</option>
                        {!selectedProfessor && <option value="cd: chef departement">Chef de Département</option>}
                      </select>
                    </div>
                  </div>
                  
                  {!selectedProfessor && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                          type="password"
                          name="password"
                          value={newProfessor.password}
                          onChange={handleProfessorChange}
                          placeholder="Mot de passe sécurisé"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={newProfessor.confirmPassword}
                          onChange={handleProfessorChange}
                          placeholder="Confirmer le mot de passe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="isCoordinator"
                        name="isCoordinator"
                        checked={selectedProfessor ? 
                          professors.find(p => p.id === selectedProfessor.id).isCoordinator : 
                          newProfessor.isCoordinator
                        }
                        onChange={handleProfessorChange}
                      />
                      <label htmlFor="isCoordinator">Coordinateur d'une formation</label>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingProfessor(false);
                        setSelectedProfessor(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveProfessorChanges}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="professors-grid">
                  {professors.map(professor => (
                    <div className="professor-card" key={professor.id}>
                      <div className="professor-header">
                        <img 
                          src={professor.image} 
                          alt={professor.nom_utilisateur} 
                          className="professor-image" 
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/64";
                            e.target.onerror = null;
                          }}
                        />
                        <div className="professor-info">
                          <h3 className="professor-name">{professor.nom_utilisateur}</h3>
                          <span className="professor-title">{professor.titre}</span>
                        </div>
                        <div className="professor-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedProfessor(professor);
                              setEditingProfessor(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          
                          {!professor.isChefDep && (
                            <button 
                              className="icon-button delete"
                              onClick={() => deleteProfessor(professor.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="professor-body">
                        <div className="professor-detail">
                          <Mail size={16} className="detail-icon" />
                          <span>{professor.email}</span>
                        </div>
                        
                        <div className="professor-detail">
                          <BookMarked size={16} className="detail-icon" />
                          <span>{professor.specialite}</span>
                        </div>
                        
                        <div className="professor-detail">
                          <Phone size={16} className="detail-icon" />
                          <span>{professor.phone}</span>
                        </div>
                        
                        <div className="professor-detail">
                          <Award size={16} className="detail-icon" />
                          <span className={`role-badge ${professor.isChefDep ? 'chef-dep' : professor.isCoordinator ? 'coordinator' : 'professor'}`}>
                            {professor.isChefDep ? 'Chef de Département' : 
                             professor.isCoordinator ? 'Coordinateur' : 'Professeur'}
                          </span>
                        </div>
                        
                        {professor.isCoordinator && (
                          <div className="professor-detail">
                            <Layers size={16} className="detail-icon" />
                            <span>
                              Formation: {
                                formations.find(f => f.CoordinateurId === professor.id)?.shortName || "Non assigné"
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* New Modules Tab */}
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
                    <span className="profile-role">Chef de Département</span>
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
                    <div className="form-group">
                      <label>Téléphone</label>
                      {editingProfile ? (
                        <input 
                          type="tel" 
                          name="phone"
                          value={currentUser.phone}
                          onChange={handleProfileChange}
                        />
                      ) : (
                        <div className="display-value">{currentUser.phone}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Rôle</label>
                      <div className="display-value">
                        <span className="role-badge chef-dep">Chef de Département</span>
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


        </main>
      </div>
    </div>
  );
};

export default DepartmentDashboard;