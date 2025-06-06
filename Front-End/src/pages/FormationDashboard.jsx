import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DepartmentDashboard.css';
import '../styles/FormationDashboard.css';
import { 
  Home, Menu, X, Sun, Moon, BookOpen, Layers, Users, BookMarked, Award,
  GraduationCap, Plus, Edit, Trash2, Save, BarChart3, Settings, LogOut,
  User, Mail, Phone, Eye, FileEdit, Calendar, UserCheck, BookOpen as Book,
  Clock, CheckSquare, FileText, List
} from 'lucide-react';

const FormationDashboard = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [activeTab, setActiveTab] = useState('overview');
  
  // Current formation data
  const [currentFormation, setCurrentFormation] = useState({
    id: "GL",
    departmentId: "dept-gl-01",
    slug: "genie-logiciel",
    name: "Formation Génie Logiciel",
    shortName: "GL",
    description: "Formation spécialisée en génie logiciel, développement d'applications et systèmes d'information. Les étudiants acquièrent des compétences avancées en conception, développement, et gestion de projets informatiques.",
    CoordinateurId: "prof-456"
  });

  // Department data (parent of the formation)
  const [departmentData, setDepartmentData] = useState({
    id: "dept-gl-01",
    name: "Génie Logiciel",
    slug: "genie-logiciel"
  });

  // Semesters data
  const [semesters, setSemesters] = useState([
    {
      id: "sem-gl-1",
      formationId: "GL",
      number: 1,
      name: "1er Semestre (S1) - Tronc Commun",
      description: "Formation de base en informatique et mathématiques appliquées",
      colorGradient: "from-blue-500 to-blue-600"
    },
    {
      id: "sem-gl-2",
      formationId: "GL",
      number: 2,
      name: "2ème Semestre (S2) - Tronc Commun",
      description: "Approfondissement des bases et introduction à la programmation",
      colorGradient: "from-green-500 to-green-600"
    },
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
    },
    {
      id: "sem-gl-5",
      formationId: "GL",
      number: 5,
      name: "5ème Semestre (S5) - Spécialisation GL",
      description: "Spécialisation avancée en Génie Logiciel",
      colorGradient: "from-orange-500 to-orange-600"
    },
    {
      id: "sem-gl-6",
      formationId: "GL",
      number: 6,
      name: "6ème Semestre (S6) - Projet et Stage",
      description: "Projet de fin d'études et stage professionnel",
      colorGradient: "from-indigo-500 to-indigo-600"
    }
  ]);

  // Modules data
  const [modules, setModules] = useState([
    // Semester 1 modules
    {
      id: "mod-gl-1-1",
      semesterId: "sem-gl-1",
      name: "Algorithmique et Structures de Données",
      description: "Fondements de l'algorithmique et structures de données essentielles",
      professorId: null,
      professorName: "Mr. Ahmed ETTALBI"
    },
    {
      id: "mod-gl-1-2",
      semesterId: "sem-gl-1",
      name: "Éléments de Recherche Opérationnelle",
      description: "Analyse mathématique appliquée à l'informatique",
      professorId: null,
      professorName: "Équipe mathématiques"
    },
    {
      id: "mod-gl-1-3",
      semesterId: "sem-gl-1",
      name: "Probabilités et Statistiques",
      description: "Fondements probabilistes pour l'informatique",
      professorId: null,
      professorName: "I. Amrani"
    },
    {
      id: "mod-gl-1-4",
      semesterId: "sem-gl-1",
      name: "Architecture des Ordinateurs",
      description: "Compréhension de l'architecture matérielle",
      professorId: null,
      professorName: "J. EL HACHIMI"
    },
    {
      id: "mod-gl-1-5",
      semesterId: "sem-gl-1",
      name: "Communication et Langues",
      description: "Anglais technique et communication professionnelle",
      professorId: null,
      professorName: "A. KOUR"
    },

    // Semester 2 modules
    {
      id: "mod-gl-2-1",
      semesterId: "sem-gl-2",
      name: "Programmation Orientée Objet",
      description: "Concepts OOP et programmation Java",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },
    {
      id: "mod-gl-2-2",
      semesterId: "sem-gl-2",
      name: "Systèmes d'Exploitation",
      description: "Gestion des processus, mémoire et fichiers",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },
    {
      id: "mod-gl-2-3",
      semesterId: "sem-gl-2",
      name: "Bases de Données",
      description: "Conception et manipulation de bases de données",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },
    {
      id: "mod-gl-2-4",
      semesterId: "sem-gl-2",
      name: "Développement Web",
      description: "Technologies web modernes",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },

    // Semester 3 modules
    {
      id: "mod-gl-3-1",
      semesterId: "sem-gl-3",
      name: "Systèmes d'Information",
      description: "Analyse et conception des systèmes d'information",
      professorId: null,
      professorName: "Prof. Karim BAINA"
    },
    {
      id: "mod-gl-3-2",
      semesterId: "sem-gl-3",
      name: "Génie Logiciel",
      description: "Méthodologies de développement logiciel",
      professorId: "prof-123", // Assuming this is Prof. Nassar's ID
      professorName: "Prof. Mahmoud NASSAR"
    },
    {
      id: "mod-gl-3-3",
      semesterId: "sem-gl-3",
      name: "Réseaux",
      description: "Architectures réseaux et protocoles",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },
    {
      id: "mod-gl-3-4",
      semesterId: "sem-gl-3",
      name: "Théorie de language et Compilation",
      description: "Conception du compilateur pour pascale",
      professorId: null,
      professorName: "M. Tabii"
    },
    {
      id: "mod-gl-3-5",
      semesterId: "sem-gl-3",
      name: "Communication professionnelle",
      description: "Anglais technique et communication professionnelle",
      professorId: null,
      professorName: "Équipe langues"
    },

    // Semester 4 modules
    {
      id: "mod-gl-4-1",
      semesterId: "sem-gl-4",
      name: "Bases de Données Avancées",
      description: "Bases de données distribuées et NoSQL",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },
    {
      id: "mod-gl-4-2",
      semesterId: "sem-gl-4",
      name: "Agile",
      description: "Architectures logicielles et patterns",
      professorId: null,
      professorName: "Prof. Salah BAINA"
    },
    {
      id: "mod-gl-4-3",
      semesterId: "sem-gl-4",
      name: "Design patterns",
      description: "Architectures logicielles et patterns",
      professorId: "prof-123", // Assuming this is Prof. Nassar's ID
      professorName: "Mahmoud NASSAR"
    },
    {
      id: "mod-gl-4-4",
      semesterId: "sem-gl-4",
      name: "Gestion de Projet",
      description: "Méthodologies de gestion de projets IT",
      professorId: null,
      professorName: "Équipe enseignante ENSIAS"
    },

    // Semester 5 modules
    {
      id: "mod-gl-5-1",
      semesterId: "sem-gl-5",
      name: "Génie Logiciel Objet",
      description: "Conception et développement orienté objet avancé",
      professorId: "prof-123", // Assuming this is Prof. Nassar's ID
      professorName: "Prof. Mahmoud NASSAR"
    },
    {
      id: "mod-gl-5-2",
      semesterId: "sem-gl-5",
      name: "Audit, Contrôle et Qualité",
      description: "Qualité logicielle et métriques",
      professorId: null,
      professorName: "Prof. BOUCHAIB BOUNABAT"
    },
    {
      id: "mod-gl-5-3",
      semesterId: "sem-gl-5",
      name: "Intégration d'Applications d'Entreprise",
      description: "Architecture SOA et intégration système",
      professorId: null,
      professorName: "Prof. Karim BAINA"
    },
    {
      id: "mod-gl-5-4",
      semesterId: "sem-gl-5",
      name: "Aspects Avancés du Génie Logiciel",
      description: "Méthodes agiles et DevOps",
      professorId: null,
      professorName: "Prof. Salah BAINA"
    },

    // Semester 6 modules
    {
      id: "mod-gl-6-1",
      semesterId: "sem-gl-6",
      name: "Projet de Fin d'Études",
      description: "Développement d'un projet innovant en entreprise",
      professorId: null,
      professorName: "Encadrant académique + Industriel"
    },
    {
      id: "mod-gl-6-2",
      semesterId: "sem-gl-6",
      name: "Stage Professionnel",
      description: "Stage de 4-6 mois en milieu professionnel",
      professorId: null,
      professorName: "Tuteur entreprise"
    },
    {
      id: "mod-gl-6-3",
      semesterId: "sem-gl-6",
      name: "Soutenance PFE",
      description: "Présentation et défense du projet",
      professorId: null,
      professorName: "Jury académique et professionnel"
    }
  ]);

  // Available professors data
  const [professors, setProfessors] = useState([
    {
      id: "prof-123",
      nom_utilisateur: "m.nassar",
      email: "m.nassar@ensias.ma",
      role: "cd: chef departement",
      departement_id: "dept-gl-01",
      isCoordinator: false,
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
    },
    {
      id: "prof-101",
      nom_utilisateur: "j.data",
      email: "j.data@ensias.ma", 
      role: "professeur",
      departement_id: "dept-gl-01",
      isCoordinator: false,
      isChefDep: false,
      specialite: "Big Data",
      titre: "Professeur Assistant",
      image: "https://randomuser.me/api/portraits/women/24.jpg",
      phone: "+212 6 45 67 89 01"
    }
  ]);

  // Current user data (chef de filière)
// Current user data (chef de filière)
const [currentUser, setCurrentUser] = useState({
  id: "prof-456",
  nom_utilisateur: "hatim.guermah",
  email: "hatim.guermah@ensias.ma",
  role: "cf: chef filiere",
  departement_id: "dept-gl-01",
  isCoordinator: true,
  isChefDep: false,
  specialite: "Science des données",
  titre: "Professeur Habilité",
  image: "/src/assets/prof-guermah.jpg", // Update this path to your actual image
  phone: "+212 6 23 45 67 89"
});

  // Edit states
  const [editingFormation, setEditingFormation] = useState(false);
  const [editingSemester, setEditingSemester] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [editingModule, setEditingModule] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingCompetence, setEditingCompetence] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [editingCareerPath, setEditingCareerPath] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState(null);

  // New entities
  const [newSemester, setNewSemester] = useState({
    formationId: currentFormation.id,
    number: semesters.length > 0 ? Math.max(...semesters.map(s => s.number)) + 1 : 1,
    name: "",
    description: "",
    colorGradient: "from-emerald-500 to-emerald-600"
  });

  const [newModule, setNewModule] = useState({
    semesterId: "",
    name: "",
    description: "",
    professorId: null,
    professorName: "Équipe enseignante ENSIAS"
  });

  const [newCompetence, setNewCompetence] = useState({
    departmentId: departmentData.id,
    formationId: currentFormation.id,
    description: ""
  });

  const [newCareerPath, setNewCareerPath] = useState({
    departmentId: departmentData.id,
    formationId: currentFormation.id,
    title: ""
  });

  // Competences state
  const [competences, setCompetences] = useState([
    {
      id: "comp-1",
      departmentId: "dept-gl-01",
      formationId: "GD",
      description: "Maîtrise des algorithmes avancés d'apprentissage automatique"
    },
    {
      id: "comp-2",
      departmentId: "dept-gl-01",
      formationId: "GD",
      description: "Conception et développement de pipelines de traitement de données"
    },
    {
      id: "comp-3",
      departmentId: "dept-gl-01",
      formationId: "GD",
      description: "Analyse et visualisation de données massives pour la prise de décision"
    }
  ]);

  // CareerPaths state
  const [careerPaths, setCareerPaths] = useState([
    {
      id: "career-1",
      departmentId: "dept-gl-01",
      formationId: "GD",
      title: "Data Scientist"
    },
    {
      id: "career-2",
      departmentId: "dept-gl-01",
      formationId: "GD",
      title: "Ingénieur Intelligence Artificielle"
    },
    {
      id: "career-3",
      departmentId: "dept-gl-01",
      formationId: "GD",
      title: "Architecte Big Data"
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
  const handleFormationChange = (e) => {
    const { name, value } = e.target;
    setCurrentFormation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSemesterChange = (e) => {
    const { name, value } = e.target;
    if (selectedSemester) {
      setSemesters(semesters.map(s => 
        s.id === selectedSemester.id ? { ...s, [name]: value } : s
      ));
    } else {
      setNewSemester(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    if (selectedModule) {
      setModules(modules.map(m => 
        m.id === selectedModule.id ? { ...m, [name]: value } : m
      ));
    } else {
      setNewModule(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfessorSelect = (e) => {
    const professorId = e.target.value;
    const selectedProfessor = professors.find(p => p.id === professorId);
    
    if (selectedModule) {
      setModules(modules.map(m => 
        m.id === selectedModule.id ? { 
          ...m, 
          professorId: professorId || null, 
          professorName: selectedProfessor ? `Prof. ${selectedProfessor.nom_utilisateur}` : "Équipe enseignante ENSIAS"
        } : m
      ));
    } else {
      setNewModule(prev => ({
        ...prev,
        professorId: professorId || null,
        professorName: selectedProfessor ? `Prof. ${selectedProfessor.nom_utilisateur}` : "Équipe enseignante ENSIAS"
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

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentUser(prev => ({
        ...prev,
        image: imageUrl
      }));
      alert("Image de profil mise à jour avec succès!");
    }
  };

  // Add these handler functions

const handleCompetenceChange = (e) => {
  const { name, value } = e.target;
  if (selectedCompetence) {
    setCompetences(competences.map(c => 
      c.id === selectedCompetence.id ? { ...c, [name]: value } : c
    ));
  } else {
    setNewCompetence(prev => ({
      ...prev,
      [name]: value
    }));
  }
};



const handleCareerPathChange = (e) => {
  const { name, value } = e.target;
  if (selectedCareerPath) {
    setCareerPaths(careerPaths.map(c => 
      c.id === selectedCareerPath.id ? { ...c, [name]: value } : c
    ));
  } else {
    setNewCareerPath(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

const saveCareerPathChanges = () => {
  if (selectedCareerPath) {
    // Update existing career path already handled by handleCareerPathChange
    console.log("Updated career path:", 
      careerPaths.find(c => c.id === selectedCareerPath.id)
    );
  } else {
    // Create new career path
    const newId = `career-${careerPaths.length + 1}`;
    const careerPathToAdd = {
      ...newCareerPath,
      id: newId
    };
    setCareerPaths([...careerPaths, careerPathToAdd]);
    console.log("Added new career path:", careerPathToAdd);
    setNewCareerPath({
      departmentId: departmentData.id,
      formationId: currentFormation.id,
      title: ""
    });
  }
  setEditingCareerPath(false);
  setSelectedCareerPath(null);
};

  // Save handlers
  const saveFormationChanges = () => {
    console.log("Saving formation changes:", currentFormation);
    setEditingFormation(false);
    // In a real app, you'd make an API call here
  };

  const saveSemesterChanges = () => {
    if (selectedSemester) {
      // Update existing semester
      console.log("Saving semester changes:", 
        semesters.find(s => s.id === selectedSemester.id)
      );
    } else {
      // Create new semester
      const newId = `sem-${currentFormation.shortName.toLowerCase()}-${newSemester.number}`;
      const semesterToAdd = {
        ...newSemester,
        id: newId,
        formationId: currentFormation.id
      };
      setSemesters([...semesters, semesterToAdd]);
      console.log("Added new semester:", semesterToAdd);
      setNewSemester({
        formationId: currentFormation.id,
        number: newSemester.number + 1,
        name: "",
        description: "",
        colorGradient: "from-emerald-500 to-emerald-600"
      });
    }
    setEditingSemester(false);
    setSelectedSemester(null);
  };

  const saveModuleChanges = () => {
    if (selectedModule) {
      // Update existing module
      console.log("Saving module changes:", 
        modules.find(m => m.id === selectedModule.id)
      );
    } else {
      // Create new module
      const semesterPrefix = newModule.semesterId.split('-').slice(-1)[0];
      const moduleCount = modules.filter(m => m.semesterId === newModule.semesterId).length + 1;
      const newId = `mod-${currentFormation.shortName.toLowerCase()}-${semesterPrefix}-${moduleCount}`;
      
      const moduleToAdd = {
        ...newModule,
        id: newId
      };
      setModules([...modules, moduleToAdd]);
      console.log("Added new module:", moduleToAdd);
      setNewModule({
        semesterId: "",
        name: "",
        description: "",
        professorId: null,
        professorName: "Équipe enseignante ENSIAS"
      });
    }
    setEditingModule(false);
    setSelectedModule(null);
  };

  const saveProfileChanges = () => {
    console.log("Saving profile changes:", currentUser);
    setEditingProfile(false);
  };

  const saveCompetenceChanges = () => {
    if (selectedCompetence) {
      // Update existing competence
      console.log("Saving competence changes:", 
        competences.find(c => c.id === selectedCompetence.id)
      );
    } else {
      // Create new competence
      const newId = `comp-${newCompetence.description.split(' ').join('-').toLowerCase()}`;
      const competenceToAdd = {
        ...newCompetence,
        id: newId
      };
      setCompetences([...competences, competenceToAdd]);
      console.log("Added new competence:", competenceToAdd);
      setNewCompetence({
        departmentId: departmentData.id,
        formationId: currentFormation.id,
        description: ""
      });
    }
    setEditingCompetence(false);
    setSelectedCompetence(null);
  };

  

  // Delete handlers
  const deleteSemester = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce semestre ? Cette action supprimera également tous les modules associés.")) {
      setSemesters(semesters.filter(s => s.id !== id));
      // Remove all modules in this semester
      setModules(modules.filter(m => m.semesterId !== id));
    }
  };

  const deleteModule = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  const deleteCompetence = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
      setCompetences(competences.filter(c => c.id !== id));
    }
  };

  const deleteCareerPath = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette opportunité professionnelle ?")) {
      setCareerPaths(careerPaths.filter(c => c.id !== id));
    }
  };

  return (
    <div className={`app-layout formation ${darkMode ? 'dark' : 'light'}`}>
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
            className={`sidebar-item ${activeTab === 'formation' ? 'active' : ''}`}
            onClick={() => setActiveTab('formation')}
            aria-current={activeTab === 'formation' ? 'page' : undefined}
          >
            <Book size={20} />
            {isSidebarOpen && <span>Formation</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'semesters' ? 'active' : ''}`}
            onClick={() => setActiveTab('semesters')}
            aria-current={activeTab === 'semesters' ? 'page' : undefined}
          >
            <Calendar size={20} />
            {isSidebarOpen && <span>Semestres</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
            aria-current={activeTab === 'modules' ? 'page' : undefined}
          >
            <Layers size={20} />
            {isSidebarOpen && <span>Modules</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'programme' ? 'active' : ''}`}
            onClick={() => setActiveTab('programme')}
            aria-current={activeTab === 'programme' ? 'page' : undefined}
          >
            <BookMarked size={20} />
            {isSidebarOpen && <span>Programme</span>}
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
              {activeTab === 'formation' && 'Gestion de la formation'}
              {activeTab === 'semesters' && 'Gestion des semestres'}
              {activeTab === 'modules' && 'Gestion des modules'}
              {activeTab === 'programme' && 'Programme'}
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
              {/* Enhanced welcome panel */}
              <div className="welcome-panel gradient-bg">
                <div className="welcome-content">
                  <h2 className="welcome-title">Bienvenue, {currentUser.nom_utilisateur}</h2>
                  <p className="welcome-message">
                    Tableau de bord de la formation {currentFormation.name}
                  </p>
                  <div className="welcome-stats">
                    <div className="welcome-stat">
                      <BookOpen size={18} />
                      <span>Département {departmentData.name}</span>
                    </div>
                    <div className="welcome-stat">
                      <Calendar size={18} />
                      <span>{semesters.length} semestres configurés</span>
                    </div>
                    <div className="welcome-stat">
                      <Layers size={18} />
                      <span>{modules.length} modules au total</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main dashboard content */}
              <div className="dashboard-content-grid">
                {/* Semesters overview */}
                <div className="dashboard-main-section">
                  <div className="section-header with-margin">
                    <h2 className="section-title">Aperçu des semestres</h2>
                    <button 
                      className="action-button primary"
                      onClick={() => {
                        setActiveTab('semesters');
                        setEditingSemester(true);
                        setSelectedSemester(null);
                      }}
                    >
                      <Plus size={18} />
                      <span>Ajouter un semestre</span>
                    </button>
                  </div>
                  
                  {semesters.length > 0 ? (
                    <div className="semesters-overview">
                      {semesters.map(semester => (
                        <div className={`semester-card bg-gradient-to-r ${semester.colorGradient}`} key={semester.id}>
                          <div className="semester-card-content">
                            <h3 className="semester-title">{semester.name}</h3>
                            <p className="semester-description">{semester.description}</p>
                            <div className="semester-modules-count">
                              <Layers size={16} />
                              <span>{modules.filter(m => m.semesterId === semester.id).length} modules</span>
                            </div>
                          </div>
                          <button 
                            className="semester-card-action"
                            onClick={() => {
                              setActiveTab('modules');
                              setNewModule(prev => ({
                                ...prev,
                                semesterId: semester.id
                              }));
                            }}
                          >
                            <span>Voir les modules</span>
                            <Eye size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>Aucun semestre créé</h3>
                      <p>Commencez par créer un semestre pour votre formation.</p>
                      <button 
                        className="action-button primary"
                        onClick={() => {
                          setActiveTab('semesters');
                          setEditingSemester(true);
                        }}
                      >
                        <Plus size={18} />
                        <span>Créer un semestre</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick actions sidebar */}
                <div className="dashboard-side-section">
                  <div className="quick-actions-container">
                    <h3 className="section-subtitle">Actions rapides</h3>
                    <div className="enhanced-action-buttons vertical">
                      <button 
                        className="enhanced-action-button formation"
                        onClick={() => {
                          setActiveTab('formation');
                          setEditingFormation(true);
                        }}
                      >
                        <div className="action-button-icon">
                          <FileEdit size={24} />
                        </div>
                        <div className="action-button-content">
                          <span className="action-button-title">Modifier la formation</span>
                          <span className="action-button-description">Mettez à jour les informations principales</span>
                        </div>
                      </button>
                      
                      <button 
                        className="enhanced-action-button semester"
                        onClick={() => {
                          setActiveTab('semesters');
                          setEditingSemester(true);
                          setSelectedSemester(null);
                        }}
                      >
                        <div className="action-button-icon">
                          <Plus size={24} />
                        </div>
                        <div className="action-button-content">
                          <span className="action-button-title">Ajouter un semestre</span>
                          <span className="action-button-description m-auto">Créez un nouveau semestre</span>
                        </div>
                      </button>
                      
                      <button 
                        className="enhanced-action-button module"
                        onClick={() => {
                          setActiveTab('modules');
                          setEditingModule(true);
                          setSelectedModule(null);
                        }}
                      >
                        <div className="action-button-icon">
                          <List size={24} />
                        </div>
                        <div className="action-button-content">
                          <span className="action-button-title">Ajouter un module</span>
                          <span className="action-button-description">Créez un nouveau module d'enseignement</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Recent module assignments */}
                  <div className="recent-assignments">
                    <h3 className="section-subtitle">Modules non assignés</h3>
                    <div className="assignments-list">
                      {modules.filter(m => !m.professorId).slice(0, 3).map(module => (
                        <div className="assignment-item" key={module.id}>
                          <div className="assignment-name">{module.name}</div>
                          <button 
                            className="small-action-button"
                            onClick={() => {
                              setActiveTab('modules');
                              setSelectedModule(module);
                              setEditingModule(true);
                            }}
                          >
                            <UserCheck size={14} />
                            <span>Assigner</span>
                          </button>
                        </div>
                      ))}
                      {modules.filter(m => !m.professorId).length === 0 && (
                        <p className="empty-list-message">Tous les modules sont assignés</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formation Details Tab */}
          {activeTab === 'formation' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Informations de la formation</h2>
                {!editingFormation ? (
                  <button 
                    className="action-button primary"
                    onClick={() => setEditingFormation(true)}
                  >
                    <Edit size={18} />
                    <span>Modifier</span>
                  </button>
                ) : (
                  <button 
                    className="action-button success"
                    onClick={saveFormationChanges}
                  >
                    <Save size={18} />
                    <span>Enregistrer</span>
                  </button>
                )}
              </div>
              
              <div className="form-container">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nom de la formation</label>
                    {editingFormation ? (
                      <input 
                        type="text" 
                        name="name"
                        value={currentFormation.name}
                        onChange={handleFormationChange}
                      />
                    ) : (
                      <div className="display-value">{currentFormation.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Nom court</label>
                    {editingFormation ? (
                      <input 
                        type="text" 
                        name="shortName"
                        value={currentFormation.shortName}
                        onChange={handleFormationChange}
                      />
                    ) : (
                      <div className="display-value">{currentFormation.shortName}</div>
                    )}
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>Slug URL</label>
                  {editingFormation ? (
                    <input 
                      type="text" 
                      name="slug"
                      value={currentFormation.slug}
                      onChange={handleFormationChange}
                    />
                  ) : (
                    <div className="display-value">{currentFormation.slug}</div>
                  )}
                </div>
                
                <div className="form-group full-width">
                  <label>Description</label>
                  {editingFormation ? (
                    <textarea 
                      name="description"
                      value={currentFormation.description}
                      onChange={handleFormationChange}
                      rows={4}
                    />
                  ) : (
                    <div className="display-value">{currentFormation.description}</div>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Département</label>
                    <div className="display-value">{departmentData.name}</div>
                  </div>
                  <div className="form-group">
                    <label>Coordinateur</label>
                    <div className="display-value">
                      <span className="user-info-with-image">
                        <img 
                          src={currentUser.image} 
                          alt={currentUser.nom_utilisateur} 
                          className="user-mini-avatar"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=Prof'}
                        />
                        <span>Prof. {currentUser.nom_utilisateur}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Semestres</label>
                    <div className="display-value">{semesters.length} semestres configurés</div>
                  </div>
                  <div className="form-group">
                    <label>Modules</label>
                    <div className="display-value">{modules.length} modules au total</div>
                  </div>
                </div>
              </div>
              
              {/* Semesters summary */}
              <div className="section-header with-margin">
                <h2 className="section-title">Semestres de la formation</h2>
                <button 
                  className="action-button primary"
                  onClick={() => {
                    setActiveTab('semesters');
                    setEditingSemester(true);
                    setSelectedSemester(null);
                  }}
                >
                  <Plus size={18} />
                  <span>Ajouter un semestre</span>
                </button>
              </div>
              
              <div className="semesters-overview">
                {semesters.map(semester => (
                  <div className={`semester-card bg-gradient-to-r ${semester.colorGradient}`} key={semester.id}>
                    <div className="semester-card-content">
                      <h3 className="semester-title">{semester.name}</h3>
                      <p className="semester-description">{semester.description}</p>
                      <div className="semester-modules-count">
                        <Layers size={16} />
                        <span>{modules.filter(m => m.semesterId === semester.id).length} modules</span>
                      </div>
                    </div>
                    <button 
                      className="semester-card-action"
                      onClick={() => {
                        setActiveTab('modules');
                        setNewModule(prev => ({
                          ...prev,
                          semesterId: semester.id
                        }));
                      }}
                    >
                      <span>Voir les modules</span>
                      <Eye size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Semesters Management Tab */}
          {activeTab === 'semesters' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Gestion des semestres</h2>
                {!editingSemester && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingSemester(true);
                      setSelectedSemester(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter un semestre</span>
                  </button>
                )}
              </div>
              
              {editingSemester ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedSemester ? "Modifier le semestre" : "Ajouter un nouveau semestre"}
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Numéro du semestre</label>
                      <input 
                        type="number" 
                        name="number"
                        min="1"
                        max="6"
                        value={selectedSemester ? 
                          semesters.find(s => s.id === selectedSemester.id).number : 
                          newSemester.number
                        }
                        onChange={handleSemesterChange}
                        placeholder="1-6"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nom du semestre</label>
                      <input 
                        type="text" 
                        name="name"
                        value={selectedSemester ? 
                          semesters.find(s => s.id === selectedSemester.id).name : 
                          newSemester.name
                        }
                        onChange={handleSemesterChange}
                        placeholder="1er Semestre (S1) - Fondamentaux"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      name="description"
                      value={selectedSemester ? 
                        semesters.find(s => s.id === selectedSemester.id).description : 
                        newSemester.description
                      }
                      onChange={handleSemesterChange}
                      rows={3}
                      placeholder="Description du contenu et des objectifs du semestre..."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Couleur du gradient</label>
                    <select 
                      name="colorGradient"
                      value={selectedSemester ? 
                        semesters.find(s => s.id === selectedSemester.id).colorGradient : 
                        newSemester.colorGradient
                      }
                      onChange={handleSemesterChange}
                    >
                      <option value="from-blue-500 to-blue-600">Bleu</option>
                      <option value="from-indigo-500 to-indigo-600">Indigo</option>
                      <option value="from-purple-500 to-purple-600">Violet</option>
                      <option value="from-pink-500 to-pink-600">Rose</option>
                      <option value="from-red-500 to-red-600">Rouge</option>
                      <option value="from-amber-500 to-amber-600">Ambre</option>
                      <option value="from-green-500 to-green-600">Vert</option>
                      <option value="from-emerald-500 to-emerald-600">Émeraude</option>
                      <option value="from-teal-500 to-teal-600">Sarcelle</option>
                      <option value="from-cyan-500 to-cyan-600">Cyan</option>
                    </select>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingSemester(false);
                        setSelectedSemester(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveSemesterChanges}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="semesters-grid">
                  {semesters.map(semester => (
                    <div className="semester-details-card shadow-xl" key={semester.id}>
                      <div className={`semester-header bg-gradient-to-r ${semester.colorGradient}`}>
                        <h3 className="semester-header-title">Semestre {semester.number}</h3>
                        <div className="semester-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedSemester(semester);
                              setEditingSemester(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-button delete"
                            onClick={() => deleteSemester(semester.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="semester-details">
                        <h4 className="semester-name">{semester.name}</h4>
                        <p className="semester-description">{semester.description}</p>
                        
                        <div className="semester-modules">
                          <div className="semester-modules-header">
                            <h5>Modules du semestre</h5>
                            <button 
                              className="small-action-button"
                              onClick={() => {
                                setActiveTab('modules');
                                setEditingModule(true);
                                setSelectedModule(null);
                                setNewModule(prev => ({
                                  ...prev,
                                  semesterId: semester.id
                                }));
                              }}
                            >
                              <Plus size={14} />
                              <span>Ajouter</span>
                            </button>
                          </div>
                          
                          <div className="semester-modules-list">
                            {modules.filter(m => m.semesterId === semester.id).length > 0 ? 
                              modules.filter(m => m.semesterId === semester.id).map(module => (
                                <div className="semester-module-item" key={module.id}>
                                  <span className="module-name">{module.name}</span>
                                  <span className="module-professor">{module.professorName}</span>
                                </div>
                              )) : (
                                <p className="no-modules-message">Aucun module dans ce semestre</p>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Modules Management Tab */}
          {activeTab === 'modules' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Gestion des modules</h2>
                {!editingModule && semesters.length > 0 && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingModule(true);
                      setSelectedModule(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter un module</span>
                  </button>
                )}
              </div>
              
              {editingModule ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedModule ? "Modifier le module" : "Ajouter un nouveau module"}
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Semestre</label>
                      <select 
                        name="semesterId"
                        value={selectedModule ? 
                          modules.find(m => m.id === selectedModule.id).semesterId : 
                          newModule.semesterId
                        }
                        onChange={handleModuleChange}
                        disabled={selectedModule !== null}
                      >
                        <option value="">Sélectionner un semestre</option>
                        {semesters.map(semester => (
                          <option key={semester.id} value={semester.id}>
                            S{semester.number}: {semester.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nom du module</label>
                      <input 
                        type="text" 
                        name="name"
                        value={selectedModule ? 
                          modules.find(m => m.id === selectedModule.id).name : 
                          newModule.name
                        }
                        onChange={handleModuleChange}
                        placeholder="Intelligence Artificielle"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      name="description"
                      value={selectedModule ? 
                        modules.find(m => m.id === selectedModule.id).description : 
                        newModule.description
                      }
                      onChange={handleModuleChange}
                      rows={3}
                      placeholder="Contenu et objectifs du module..."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Enseignant responsable</label>
                    <select 
                      value={selectedModule ? 
                        modules.find(m => m.id === selectedModule.id).professorId || "" : 
                        newModule.professorId || ""
                      }
                      onChange={handleProfessorSelect}
                    >
                      <option value="">Équipe enseignante ENSIAS</option>
                      {professors.map(professor => (
                        <option key={professor.id} value={professor.id}>
                          Prof. {professor.nom_utilisateur} - {professor.specialite}
                        </option>
                      ))}
                    </select>
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
                      disabled={!selectedModule && !newModule.semesterId}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                semesters.length === 0 ? (
                  <div className="empty-state">
                    <h3>Aucun semestre créé</h3>
                    <p>Veuillez d'abord créer au moins un semestre avant d'ajouter des modules.</p>
                    <button 
                      className="action-button primary"
                      onClick={() => {
                        setActiveTab('semesters');
                        setEditingSemester(true);
                      }}
                    >
                      <Plus size={18} />
                      <span>Créer un semestre</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Semesters tabs */}
                    <div className="semester-tabs">
                      {semesters.map(semester => (
                        <button 
                          key={semester.id}
                          className={`semester-tab ${newModule.semesterId === semester.id ? 'active' : ''}`}
                          onClick={() => setNewModule(prev => ({ ...prev, semesterId: semester.id }))}
                        >
                          <span className="semester-tab-number">S{semester.number}</span>
                          <span className="semester-tab-name">{semester.name.split('-')[1]}</span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Modules list */}
                    <div className="modules-grid">
                      {modules
                        .filter(m => m.semesterId === (newModule.semesterId || semesters[0]?.id))
                        .map(module => (
                          <div className="module-card" key={module.id} data-semester={module.semesterId || "1"}>
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
                                <button 
                                  className="icon-button delete"
                                  onClick={() => deleteModule(module.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="module-card-description">
                              {module.description}
                            </div>
                            
                            <div className="module-card-professor">
                              <div className="module-professor-label">Enseignant:</div>
                              <div className="module-professor-name">
                                {module.professorId ? (
                                  <div className="professor-info">
                                    <img 
                                      src={professors.find(p => p.id === module.professorId)?.image} 
                                      alt={module.professorName} 
                                      className="professor-mini-avatar"
                                      onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/24";
                                        e.target.onerror = null;
                                      }}
                                    />
                                    <span>{module.professorName}</span>
                                  </div>
                                ) : (
                                  <span className="team-taught">{module.professorName}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                      {/* Add module card */}
                      <div 
                        className="module-card add-module-card"
                        onClick={() => {
                          setEditingModule(true);
                          setSelectedModule(null);
                        }}
                      >
                        <div className="add-module-content">
                          <Plus size={32} />
                          <span>Ajouter un module</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
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
                    <span className="profile-role">Chef de Formation</span>
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
                        <span className="role-badge coordinator">Chef de Formation</span>
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

          {/* Programme Tab */}
          {activeTab === 'programme' && (
            <div>
              {/* Competences Section */}
              <div className="section-header">
                <h2 className="section-title">Compétences acquises</h2>
                {!editingCompetence && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingCompetence(true);
                      setSelectedCompetence(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter une compétence</span>
                  </button>
                )}
              </div>
              
              {editingCompetence ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedCompetence ? "Modifier la compétence" : "Ajouter une nouvelle compétence"}
                  </h3>
                  
                  <div className="form-group full-width">
                    <label>Description de la compétence</label>
                    <textarea 
                      name="description"
                      value={selectedCompetence ? 
                        competences.find(c => c.id === selectedCompetence.id).description : 
                        newCompetence.description
                      }
                      onChange={handleCompetenceChange}
                      rows={3}
                      placeholder="Ex: Maîtrise des algorithmes d'apprentissage profond pour l'analyse prédictive..."
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingCompetence(false);
                        setSelectedCompetence(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveCompetenceChanges}
                      disabled={!selectedCompetence && !newCompetence.description}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="competences-list">
                  {competences.length > 0 ? (
                    competences.map(competence => (
                      <div className="competence-item" key={competence.id}>
                        <div className="competence-content">
                          <div className="competence-icon">
                            <CheckSquare size={24} />
                          </div>
                          <p className="competence-description">{competence.description}</p>
                        </div>
                        <div className="competence-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedCompetence(competence);
                              setEditingCompetence(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-button delete"
                            onClick={() => deleteCompetence(competence.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <h3>Aucune compétence définie</h3>
                      <p>Ajoutez les compétences que les étudiants acquerront dans cette formation.</p>
                      <button 
                        className="action-button primary"
                        onClick={() => {
                          setEditingCompetence(true);
                        }}
                      >
                        <Plus size={18} />
                        <span>Ajouter une compétence</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Career Paths Section */}
              <div className="section-header with-margin-top">
                <h2 className="section-title">Débouchés professionnels</h2>
                {!editingCareerPath && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingCareerPath(true);
                      setSelectedCareerPath(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter un débouché</span>
                  </button>
                )}
              </div>
              
              {editingCareerPath ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedCareerPath ? "Modifier le débouché professionnel" : "Ajouter un nouveau débouché professionnel"}
                  </h3>
                  
                  <div className="form-group full-width">
                    <label>Titre du poste</label>
                    <input 
                      type="text"
                      name="title"
                      value={selectedCareerPath ? 
                        careerPaths.find(c => c.id === selectedCareerPath.id).title : 
                        newCareerPath.title
                      }
                      onChange={handleCareerPathChange}
                      placeholder="Ex: Data Scientist, Architecte Big Data, etc."
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingCareerPath(false);
                        setSelectedCareerPath(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveCareerPathChanges}
                      disabled={!selectedCareerPath && !newCareerPath.title}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="career-paths-grid">
                  {careerPaths.length > 0 ? (
                    careerPaths.map(careerPath => (
                      <div className="career-path-card" key={careerPath.id}>
                        <div className="career-path-icon">
                          <Award size={28} />
                        </div>
                        <h3 className="career-path-title">{careerPath.title}</h3>
                        <div className="career-path-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedCareerPath(careerPath);
                              setEditingCareerPath(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-button delete"
                            onClick={() => deleteCareerPath(careerPath.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <h3>Aucun débouché professionnel défini</h3>
                      <p>Ajoutez les opportunités de carrière pour les diplômés de cette formation.</p>
                      <button 
                        className="action-button primary"
                        onClick={() => {
                          setEditingCareerPath(true);
                        }}
                      >
                        <Plus size={18} />
                        <span>Ajouter un débouché</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FormationDashboard;