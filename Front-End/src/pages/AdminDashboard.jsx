import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DepartmentDashboard.css'; // Reusing the same styles
import '../styles/AdminDashboard.css'; // Reusing the same styles

import { 
  Home, Menu, X, Sun, Moon, BookOpen, Layers, Users, BookMarked, Award,
  GraduationCap, Plus, Edit, Trash2, Save, BarChart3, Settings, LogOut,
  User, Mail, Phone, Eye, FileEdit, School, Calendar, UserCheck, UserPlus, 
  Building, ShieldCheck, Briefcase, UserCog
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const [activeTab, setActiveTab] = useState('overview');
  
  // Add this loading state at the component level
  const [loading, setLoading] = useState(true);

  // Admin information
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Users data
  const [users, setUsers] = useState([]);

  // Departments data
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({});

  // Form states
  const [editingUser, setEditingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [assigningDepartment, setAssigningDepartment] = useState(false);

  // New records templates
  const [newUser, setNewUser] = useState({
    nom_utilisateur: "",
    prenom: "",
    nom: "",
    email: "",
    mot_de_passe: "",
    confirm_mot_de_passe: "",
    role: "professeur",
    departement_id: "",
    isCoordinator: false,
    isChefDep: false,
    specialite: "",
    titre: "",
    phone: "",
    image: ""              // will hold the /uploads/xyz.jpg URL
  });

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    slug: "",
    slogan: "",
    description: "",
    vision: "",
    yearsFounded: new Date().getFullYear(),
    graduatesCount: 0,
    activeStudentsCount: 0,
    PublicationsCount: 0,
    contactEmail: "",
    contactPhone: "",
    openDaysInfo: "",
    backgroundImage: ""
  });

  // Stats
  const totalUsers = Array.isArray(users) ? users.length : 0;
  const totalDepartments = Array.isArray(departments) ? departments.length : 0;
  const activeProfessors = Array.isArray(users)
    ? users.filter(u => u.role === "prof").length  // Count users with exact prof role
    : 0;
  const pendingAssignments = Array.isArray(departments)
    ? departments.filter(d => !d.chefId).length
    : 0;
  
  // Effect to update dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Load data from API
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    
    // load users, departments and stats with auth token
    Promise.all([
      fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(r => r.json().catch(err => {
        console.error("Error parsing users response:", err);
        return [];
      })),
      fetch('/api/admin/departments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(r => r.json().catch(err => {
        console.error("Error parsing departments response:", err);
        return [];
      })),
      fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(r => r.json().catch(() => ({})))
    ])
      .then(([usersData, departmentsData, statsData]) => {
        console.log("API response - users:", usersData);
        console.log("API response - departments:", departmentsData);
        
        // Normalize user data - handle field name differences
        const normalizeUser = (user) => {
          return {
            ...user,
            // Handle both camelCase and snake_case field names
            nom_utilisateur: user.nom_utilisateur || user.nomUtilisateur || '',
            departement_id: user.departement_id || user.departementId || null,
            is_chef_dep: user.is_chef_dep || user.chefDep || user.isChefDep || false
          };
        };
        
        const normalizedUsers = usersData.map(user => normalizeUser(user));
        
        // Normalize department data
        const normalizedDepts = departmentsData.map(dept => ({
          ...dept
        }));

        // Check for departments with chiefs not properly set
        normalizedDepts.forEach(dept => {
          if (!dept.chefId) {
            // Try to find the chief from users
            const deptChief = normalizedUsers.find(user => 
              user.departement_id === dept.id && 
              (user.role === 'cd' || user.is_chef_dep)
            );
            
            if (deptChief) {
              // Update the department with the chief
              dept.chefId = deptChief.id;
            }
          }
        });
        
        // Update state
        setUsers(normalizedUsers);
        setDepartments(normalizedDepts);
        setStats(statsData || {});
        setLoading(false);
      })
      .catch(err => {
        console.error('API load error', err);
        setLoading(false);
      });
  }, []);

  // Toggle functions
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Form handlers
  const handleUserChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id ? {...u, [name]: val} : u
      ));
    } else {
      setNewUser(prev => ({
        ...prev,
        [name]: val
      }));
    }
  };

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    
    if (selectedDepartment) {
      setDepartments(departments.map(d => 
        d.id === selectedDepartment.id ? {...d, [name]: value} : d
      ));
    } else {
      setNewDepartment(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // when the user picks a file, upload it immediately
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    fetch("/api/admin/upload",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: form
      })
      .then(r=>r.json())
      .then(data => {
        setNewUser(u=>({...u, image: data.path}));
      })
      .catch(console.error);
  };

  // Add this function near the top of your component
  const checkEmailAvailability = async (email) => {
    try {
      // First check if any existing user in our state already has this email
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking email availability:", error);
      return false;
    }
  };

  // Save handlers
  const saveUserChanges = async () => {
    if (!selectedUser) {
      // Validate required fields
      if (!newUser.nom_utilisateur || !newUser.email || !newUser.mot_de_passe) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
      }
      
      // Check if passwords match
      if (newUser.mot_de_passe !== newUser.confirm_mot_de_passe) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }
      
      // Check if email is already taken
      const isEmailAvailable = await checkEmailAvailability(newUser.email);
      if (!isEmailAvailable) {
        alert("Cette adresse email est déjà utilisée par un autre utilisateur. Veuillez en choisir une autre.");
        return;
      }
      
      // Creating new user - build proper JSON payload
      console.log("Sending new user:", newUser); // debug
      
      const payload = {
        nom_utilisateur: newUser.nom_utilisateur,
        prenom: newUser.prenom,
        nom: newUser.nom,
        email: newUser.email,
        mot_de_passe: newUser.mot_de_passe,
        // If isChefDep is true, force role to "cd" (simplified)
        role: newUser.isChefDep ? "cd" : (newUser.role || "prof"),
        departement_id: newUser.departement_id || null,
        // Use est_chef_dep or chefDep property name to match your backend entity
        chefDep: Boolean(newUser.isChefDep),
        // Only allow isChefDep if department is selected
        isCoordinator: Boolean(newUser.isCoordinator),
        specialite: newUser.specialite || "",
        titre: newUser.titre || "",
        phone: newUser.phone || "",
        image: newUser.image || ""
      };
      
      // Validation check - can't be department chief without a department
      if (newUser.isChefDep && !newUser.departement_id) {
        alert("Un chef de département doit être assigné à un département.");
        return;
      }
      
      fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            console.error("Error response:", text);
            throw new Error(`Server returned ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(savedUser => {
        console.log("User saved:", savedUser);
        setUsers(prev => [...prev, savedUser]);
        // Reset form
        setNewUser({
          nom_utilisateur: "",
          prenom: "",
          nom: "",
          email: "",
          mot_de_passe: "",
          confirm_mot_de_passe: "",
          role: "prof",
          departement_id: "",
          isCoordinator: false,
          isChefDep: false,
          specialite: "",
          titre: "",
          phone: "",
          image: ""
        });
      })
      .catch(error => {
        console.error("Failed to save user:", error);
        
        // Extract meaningful error message from database errors
        if (error.message && error.message.includes("duplicate key value")) {
          // Extract the field from the error message
          if (error.message.includes("(email)=")) {
            alert("Cette adresse email est déjà utilisée. Veuillez en choisir une autre.");
          } else if (error.message.includes("(nom_utilisateur)=")) {
            alert("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
          } else {
            alert("Une erreur est survenue: valeur dupliquée dans la base de données");
          }
        } else {
          alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
        }
      });
    } else {
      // Update existing user
      const user = users.find(u => u.id === selectedUser.id);
      
      const payload = {
        id: user.id,
        nom_utilisateur: user.nom_utilisateur,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        departement_id: user.departement_id || null,
        isChefDep: Boolean(user.isChefDep),
        isCoordinator: Boolean(user.isCoordinator),
        specialite: user.specialite || "",
        titre: user.titre || "",
        phone: user.phone || "",
        image: user.image || "",
        est_actif: user.est_actif
      };
      
      fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            console.error("Error updating user:", text);
            throw new Error(`Server returned ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(updatedUser => {
        console.log("User updated:", updatedUser);
        // No need to update state since it's already updated via handleUserChange
      })
      .catch(error => console.error("Failed to update user:", error));
    }
    
    setEditingUser(false);
    setSelectedUser(null);
  };

  const saveDepartmentChanges = () => {
    if (selectedDepartment) {
      // Update existing department
      const dept = departments.find(d => d.id === selectedDepartment.id);
      
      fetch(`/api/admin/departments/${dept.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dept)
      })
      .then(r => {
        if (!r.ok) return r.text().then(text => { throw new Error(text); });
        return r.json();
      })
      .then(updatedDept => {
        console.log("Department updated:", updatedDept);
        // State already updated via handleDepartmentChange
      })
      .catch(err => console.error('Update department failed', err));
    } else {
      // Create new department
      fetch('/api/admin/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`

         },
        body: JSON.stringify(newDepartment)
      })
      .then( r => {
        if (!r.ok) return r.text().then(text => { throw new Error(text); });
        return r.json();
      })
      .then(createdDept => {
        console.log("Department created:", createdDept);
        setDepartments([...departments, createdDept]);
        
        // Reset form
        setNewDepartment({
          name: "",
          slug: "",
          slogan: "",
          description: "",
          vision: "",
          yearsFounded: new Date().getFullYear(),
          graduatesCount: 0,
          activeStudentsCount: 0,
          PublicationsCount: 0,
          contactEmail: "",
          contactPhone: "",
          openDaysInfo: "",
          backgroundImage: ""
        });
      })
      .catch(err => console.error('Create department failed', err));
    }
    setEditingDepartment(false);
    setSelectedDepartment(null);
  };

  // Assign chef to department
  const assignChefToDepartment = (userId, departmentId) => {
    if (!userId || userId === "") {
      return; // No user selected
    }
    
    fetch(`/api/admin/users/${userId}/assignChef/${departmentId}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => {
        if (!r.ok) return r.text().then(text => { throw new Error(text); });
        return r.json();
      })
      .then(updatedUser => {
        console.log("Chief assignment successful:", updatedUser);
        refreshAllData(); // Use the dedicated refresh function
        
        // Show confirmation after state update
        setTimeout(() => {
          const chief = users.find(u => u.id === userId);
          if (chief) {
            alert(`${formatUserName(chief)} a été désigné comme chef du département.`);
          }
        }, 500);
      })
      .catch(error => {
        console.error("Failed to assign chief:", error);
        alert(`Erreur lors de l'assignation: ${error.message}`);
      });
  };

  // Assign user to department
  const assignUserToDepartment = (userId, departmentId) => {
    if (!userId) return;
    
    // For unassigning (empty departmentId), we need a different URL format
    const url = departmentId 
      ? `/api/admin/users/${userId}/assign/${departmentId}`
      : `/api/admin/users/${userId}/assign/none`; // Use "none" instead of empty string
    
    fetch(url, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => {
        if (!r.ok) return r.text().then(text => { throw new Error(text); });
        return r.json();
      })
      .then(updatedUser => {
        console.log("User assigned successfully:", updatedUser);
        refreshAllData(); // Use the dedicated refresh function
        
        // Show confirmation after state update
        setTimeout(() => {
          const user = users.find(u => u.id === userId);
          const dept = departmentId ? departments.find(d => d.id === departmentId) : null;
          
          if (user) {
            if (departmentId && dept) {
              alert(`${formatUserName(user)} a été assigné au département ${dept.name}.`);
            } else {
              alert(`${formatUserName(user)} a été retiré de son département.`);
            }
          }
        }, 500);
      })
      .catch(error => {
        console.error("Failed to assign user:", error);
        alert(`Erreur lors de l'assignation: ${error.message}`);
      });
  };

  // Delete handlers
  const deleteUser = (userId) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet utilisateur ?`)) {
      fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`Server returned ${response.status}: ${text}`);
            });
          }
          // Success - remove from local state
          const userToDelete = users.find(u => u.id === userId);
          if (userToDelete && userToDelete.isChefDep) {
            // Update department to remove chef
            setDepartments(departments.map(dept =>
              dept.chefId === userId ? { ...dept, chefId: null } : dept
            ));
          }
          setUsers(users.filter(u => u.id !== userId));
        })
        .catch(error => console.error("Failed to delete user:", error));
    }
  };

  const deleteDepartment = (departmentId) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce département ?`)) {
      fetch(`/api/admin/departments/${departmentId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`Server returned ${response.status}: ${text}`);
            });
          }
          // Success - update local state
          // Update users to remove department association
          setUsers(users.map(user =>
            user.departement_id === departmentId
              ? { ...user, departement_id: null, isChefDep: false }
              : user
          ));
          setDepartments(departments.filter(d => d.id !== departmentId));
        })
        .catch(error => console.error("Failed to delete department:", error));
    }
  };

  // 1. Create a helper function for displaying user names consistently
  const formatUserName = (user) => {
    if (user.prenom && user.nom) {
      return `${user.prenom} ${user.nom}`;
    } else {
      return user.nom_utilisateur;
    }
  };

  // Add this function near the top of your component
  const refreshAllData = () => {
    setLoading(true);
    
    Promise.all([
      fetch('/api/admin/users').then(r => r.json()),
      fetch('/api/admin/departments').then(r => r.json()),
    ]
    )
      .then(([usersData, departmentsData]) => {
        console.log("Refreshed data - users:", usersData);
        console.log("Refreshed data - departments:", departmentsData);
        
        // Normalize user data
        const normalizeUser = (user) => {
          return {
            ...user,
            // Handle both camelCase and snake_case field names
            nom_utilisateur: user.nom_utilisateur || user.nomUtilisateur || '',
            departement_id: user.departement_id || user.departementId || null,
            is_chef_dep: user.is_chef_dep || user.chefDep || user.isChefDep || false
          };
        };
        
        const normalizedUsers = usersData.map(user => normalizeUser(user));
        
        // Link departments and chiefs
        const normalizedDepts = departmentsData.map(dept => {
          if (!dept.chefId) {
            // Find chief by role and department_id match
            const deptChief = normalizedUsers.find(user => 
              user.departement_id === dept.id && 
              (user.role === 'cd' || user.is_chef_dep)
            );
            
            if (deptChief) {
              return { ...dept, chefId: deptChief.id };
            }
          }
          return dept;
        });
        
        // Update state
        setUsers(normalizedUsers);
        setDepartments(normalizedDepts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Refresh data error:', err);
        setLoading(false);
      });
  };

  // Add this useEffect at the top of your component to load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userInfoString = localStorage.getItem('user_info');
    
    if (!token || !userInfoString) {
      // Redirect to login if no token or user info
      navigate('/login');
      return;
    }
    
    try {
      const userInfo = JSON.parse(userInfoString);
      setCurrentAdmin(userInfo);
      console.log("Current admin loaded from localStorage:", userInfo);
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
      navigate('/login');
    }
  }, []);

  // Add this useEffect for enhancing user info
  useEffect(() => {
    const userInfoString = localStorage.getItem('user_info');
    
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        
        // Add missing fields with default values
        const enhancedUserInfo = {
          ...userInfo,
          derniere_connexion: userInfo.derniereConnexion || new Date().toISOString()
        };
        
        setCurrentAdmin(enhancedUserInfo);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, []);

  return (
    <div className={`app-layout ${darkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <ShieldCheck className="logo-icon" />
            {isSidebarOpen && <span className="logo-text">ADMIN ENSIAS</span>}
          </div>
        </div>
        
        <nav className="sidebar-menu">
          <button 
            className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={20} />
            {isSidebarOpen && <span>Tableau de bord</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            {isSidebarOpen && <span>Utilisateurs</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            <Building size={20} />
            {isSidebarOpen && <span>Départements</span>}
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <UserCog size={20} />
            {isSidebarOpen && <span>Affectations</span>}
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
              {activeTab === 'overview' && 'Tableau de Bord Administrateur'}
              {activeTab === 'users' && 'Gestion des Utilisateurs'}
              {activeTab === 'departments' && 'Gestion des Départements'}
              {activeTab === 'assignments' && 'Affectations & Rôles'}
            </h1>
          </div>
          <div className="header-right">
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="user-avatar">
              <img 
                src={currentAdmin?.image} 
                alt="Admin" 
                className="avatar-image"
                onError={(e) => {
                  e.target.src = "https://randomuser.me/api/portraits/men/1.jpg";
                  e.target.onerror = null;
                }}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="site-content">
          {/* Overview Dashboard */}
          {activeTab === 'overview' && (
            <div className="dashboard-container">
              {/* Dashboard welcome panel */}
              <div className="welcome-panel">
                <div className="welcome-content">
                  <h2 className="welcome-title">Bienvenue, Admin ENSIAS</h2>
                  <p className="welcome-message">
                    Tableau de bord d'administration
                  </p>
                </div>
                <div className="welcome-stats">
                  <div className="department-founded">
                    <Calendar size={16} />
                    <span>
                      Dernière connexion: {currentAdmin && currentAdmin.derniere_connexion 
                        ? new Date(currentAdmin.derniere_connexion).toLocaleDateString() 
                        : "Jamais connecté"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced stat cards */}
              <div className="stats-section">
                <h3 className="stats-title">Statistiques de la plateforme</h3>
                <div className="enhanced-stat-cards">
                  <div className="enhanced-stat-card active-students">
                    <div className="stat-card-icon">
                      <Users size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Utilisateurs actifs</span>
                      <h3 className="stat-value">{totalUsers}</h3>
                    </div>
                  </div>
                  
                  <div className="enhanced-stat-card graduates">
                    <div className="stat-card-icon">
                      <Building size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Départements</span>
                      <h3 className="stat-value">{totalDepartments}</h3>
                    </div>
                  </div>
                  
                  <div className="enhanced-stat-card publications">
                    <div className="stat-card-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Professeurs actifs</span>
                      <h3 className="stat-value">{activeProfessors}</h3>
                    </div>
                  </div>
                  
                  <div className="enhanced-stat-card page-views">
                    <div className="stat-card-icon">
                      <UserCheck size={24} />
                    </div>
                    <div className="stat-card-content">
                      <span className="stat-label">Départements sans chef</span>
                      <h3 className="stat-value">{pendingAssignments}</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="quick-actions-container">
                <h3 className="section-subtitle">Actions rapides</h3>
                <div className="enhanced-action-buttons">
                  <button 
                    className="enhanced-action-button department"
                    onClick={() => {
                      setActiveTab('users');
                      setEditingUser(true);
                      setSelectedUser(null);
                    }}
                  >
                    <div className="action-button-icon">
                      <UserPlus size={24} />
                    </div>
                    <div className="action-button-content">
                      <span className="action-button-title">Ajouter un utilisateur</span>
                      <span className="action-button-description">Créer un nouveau compte professeur ou admin</span>
                    </div>
                  </button>
                  
                  <button 
                    className="enhanced-action-button formation"
                    onClick={() => {
                      setActiveTab('departments');
                      setEditingDepartment(true);
                      setSelectedDepartment(null);
                    }}
                  >
                    <div className="action-button-icon">
                      <Building size={24} />
                    </div>
                    <div className="action-button-content">
                      <span className="action-button-title">Créer un département</span>
                      <span className="action-button-description">Ajouter un nouveau département à l'ENSIAS</span>
                    </div>
                  </button>
                  
                  <button 
                    className="enhanced-action-button professor"
                    onClick={() => {
                      setActiveTab('assignments');
                      setAssigningDepartment(true);
                    }}
                  >
                    <div className="action-button-icon">
                      <UserCog size={24} />
                    </div>
                    <div className="action-button-content">
                      <span className="action-button-title">Affecter un chef</span>
                      <span className="action-button-description">Désigner un chef pour un département</span>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Recent Activity
              <div className="enhanced-activity-section">
                <div className="activity-header">
                  <h3 className="section-subtitle">Activité récente</h3>
                  <button className="view-all-button">Voir tout</button>
                </div>
                
                <div className="enhanced-activity-card">
                  <ul className="enhanced-activity-list">
                    <li className="enhanced-activity-item">
                      <div className="activity-indicator assignment"></div>
                      <div className="activity-content">
                        <div className="activity-main">
                          <span className="activity-title">Nouveau chef de département désigné</span>
                          <span className="activity-time">Il y a 2 heures</span>
                        </div>
                        <p className="activity-description">Prof. M. Nassar a été nommé chef du département Génie Logiciel</p>
                      </div>
                    </li>
                    
                    <li className="enhanced-activity-item">
                      <div className="activity-indicator update"></div>
                      <div className="activity-content">
                        <div className="activity-main">
                          <span className="activity-title">Mise à jour des informations du département</span>
                          <span className="activity-time">Hier</span>
                        </div>
                        <p className="activity-description">Les informations du département Science des Données ont été mises à jour</p>
                      </div>
                    </li>
                    
                    <li className="enhanced-activity-item">
                      <div className="activity-indicator students"></div>
                      <div className="activity-content">
                        <div className="activity-main">
                          <span className="activity-title">Nouvel utilisateur ajouté</span>
                          <span className="activity-time">21/05/2025</span>
                        </div>
                        <p className="activity-description">Professeur A. Professor a été ajouté au système</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Gestion des utilisateurs</h2>
                {!editingUser && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingUser(true);
                      setSelectedUser(null);
                    }}
                  >
                    <UserPlus size={18} />
                    <span>Ajouter un utilisateur</span>
                  </button>
                )}
              </div>
              
              {editingUser ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedUser ? "Modifier un utilisateur" : "Ajouter un nouvel utilisateur"}
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom d'utilisateur</label>
                      <input 
                        type="text" 
                        name="nom_utilisateur"
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).nom_utilisateur : 
                          newUser.nom_utilisateur
                        }
                        onChange={handleUserChange}
                        placeholder="m.professeur"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).email : 
                          newUser.email
                        }
                        onChange={handleUserChange}
                        placeholder="professeur@ensias.ma"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Rôle</label>
                      <select 
                        name="role"
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).role : 
                          newUser.role
                        }
                        onChange={handleUserChange}
                      >
                        <option value="prof">Professeur</option>
                        <option value="cf">Chef de filière</option>
                        <option value="cd">Chef de département</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Département</label>
                      <select 
                        name="departement_id"
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).departement_id || "" : 
                          newUser.departement_id
                        }
                        onChange={handleUserChange}
                      >
                        <option value="">Sélectionner un département</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Spécialité</label>
                      <input 
                        type="text" 
                        name="specialite"
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).specialite : 
                          newUser.specialite
                        }
                        onChange={handleUserChange}
                        placeholder="Intelligence Artificielle"
                      />
                    </div>
                    <div className="form-group">
                      <label>Titre</label>
                      <input 
                        type="text" 
                        name="titre"
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).titre : 
                          newUser.titre
                        }
                        onChange={handleUserChange}
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
                        value={selectedUser ? 
                          users.find(u => u.id === selectedUser.id).phone : 
                          newUser.phone
                        }
                        onChange={handleUserChange}
                        placeholder="+212 6XX XX XX XX"
                      />
                    </div>
                    <div className="form-group">
                      <div className="checkbox-group">
                        <input 
                          type="checkbox" 
                          id="est_actif"
                          name="est_actif"
                          checked={selectedUser ? 
                            users.find(u => u.id === selectedUser.id).est_actif : 
                            true
                          }
                          onChange={handleUserChange}
                        />
                        <label htmlFor="est_actif">Compte actif</label>
                      </div>
                    </div>
                  </div>
                  
                  {!selectedUser && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                          type="password"
                          name="mot_de_passe"
                          value={newUser.mot_de_passe}
                          onChange={handleUserChange}
                          placeholder="Mot de passe sécurisé"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input
                          type="password"
                          name="confirm_mot_de_passe"
                          value={newUser.confirm_mot_de_passe}
                          onChange={handleUserChange}
                          placeholder="Confirmer le mot de passe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Prénom</label>
                      <input
                        type="text"
                        name="prenom"
                        value={ selectedUser
                                 ? users.find(u=>u.id===selectedUser.id).prenom
                                 : newUser.prenom }
                        onChange={handleUserChange}
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nom</label>
                      <input
                        type="text"
                        name="nom"
                        value={ selectedUser
                                 ? users.find(u=>u.id===selectedUser.id).nom
                                 : newUser.nom }
                        onChange={handleUserChange}
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Photo de profil</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {newUser.image && (
                      <img src={newUser.image} width={64} style={{marginTop:8}} />
                    )}
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingUser(false);
                        setSelectedUser(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveUserChanges}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="professors-grid">
                  {users.map(user => (
                    <div className="professor-card" key={user.id}>
                      <div className="professor-header">
                        <img 
                          src={user.image} 
                          alt={user.nom_utilisateur} 
                          className="professor-image" 
                          onError={(e) => {
                            e.target.src = "https://randomuser.me/api/portraits/men/1.jpg";
                            e.target.onerror = null;
                          }}
                        />
                        <div className="professor-info">
                          <h3 className="professor-name">{user.nom_utilisateur}</h3>
                          <span className="professor-title">{user.titre || user.role}</span>
                        </div>
                        <div className="professor-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedUser(user);
                              setEditingUser(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          
                          <button 
                            className="icon-button delete"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="professor-body">
                        <div className="professor-detail">
                          <Mail size={16} className="detail-icon" />
                          <span>{user.email}</span>
                        </div>
                        
                        {user.specialite && (
                          <div className="professor-detail">
                            <BookMarked size={16} className="detail-icon" />
                            <span>{user.specialite}</span>
                          </div>
                        )}
                        
                        {user.phone && (
                          <div className="professor-detail">
                            <Phone size={16} className="detail-icon" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        
                        <div className="professor-detail">
                          <Award size={16} className="detail-icon" />
                          <span className={`role-badge ${
                            user.role === "admin" ? 'admin' :
                            user.role === "cd" ? 'chef-dep' : 
                            user.role === "cf" ? 'coordinator' : 'professor'
                          }`}>
                            {user.role === "admin" ? 'Administrateur' :
                             user.role === "cd" ? 'Chef de Département' : 
                             user.role === "cf" ? 'Chef de Filière' : 'Professeur'}
                          </span>
                        </div>
                        
                        {user.departement_id && (
                          <div className="professor-detail">
                            <Building size={16} className="detail-icon" />
                            <span>
                              Département: {
                                departments.find(d => d.id === user.departement_id)?.name || "Non assigné"
                              }
                            </span>
                          </div>
                        )}

                        <div className="professor-detail">
                          <Calendar size={16} className="detail-icon" />
                          <span>
                            Dernière connexion: {
                              user.derniere_connexion 
                                ? new Date(user.derniere_connexion).toLocaleDateString() 
                                : "Jamais connecté"
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Departments Management */}
          {activeTab === 'departments' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Gestion des départements</h2>
                {!editingDepartment && (
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      setEditingDepartment(true);
                      setSelectedDepartment(null);
                    }}
                  >
                    <Plus size={18} />
                    <span>Ajouter un département</span>
                  </button>
                )}
              </div>
              
              {editingDepartment ? (
                <div className="form-container">
                  <h3 className="section-subtitle">
                    {selectedDepartment ? "Modifier un département" : "Ajouter un nouveau département"}
                  </h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom du département</label>
                      <input 
                        type="text" 
                        name="name"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).name : 
                          newDepartment.name
                        }
                        onChange={handleDepartmentChange}
                        placeholder="Génie Logiciel"
                      />
                    </div>
                    <div className="form-group">
                      <label>Slug URL (optionnel)</label>
                      <input 
                        type="text" 
                        name="slug"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).slug : 
                          newDepartment.slug
                        }
                        onChange={handleDepartmentChange}
                        placeholder="genie-logiciel"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Slogan</label>
                      <input 
                        type="text" 
                        name="slogan"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).slogan : 
                          newDepartment.slogan
                        }
                        onChange={handleDepartmentChange}
                        placeholder="Excellence • Innovation • Performance"
                      />
                    </div>
                    <div className="form-group">
                      <label>Année de fondation</label>
                      <input 
                        type="number" 
                        name="yearsFounded"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).yearsFounded : 
                          newDepartment.yearsFounded
                        }
                        onChange={handleDepartmentChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      name="description"
                      value={selectedDepartment ? 
                        departments.find(d => d.id === selectedDepartment.id).description : 
                        newDepartment.description
                      }
                      onChange={handleDepartmentChange}
                      rows={4}
                      placeholder="Description du département..."
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Vision</label>
                    <textarea 
                      name="vision"
                      value={selectedDepartment ? 
                        departments.find(d => d.id === selectedDepartment.id).vision : 
                        newDepartment.vision
                      }
                      onChange={handleDepartmentChange}
                      rows={3}
                      placeholder="Vision du département..."
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email de contact</label>
                      <input 
                        type="email" 
                        name="contactEmail"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).contactEmail : 
                          newDepartment.contactEmail
                        }
                        onChange={handleDepartmentChange}
                        placeholder="departement@ensias.ma"
                      />
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input 
                        type="tel" 
                        name="contactPhone"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).contactPhone : 
                          newDepartment.contactPhone
                        }
                        onChange={handleDepartmentChange}
                        placeholder="+212 5XX XX XX XX"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre d'étudiants actifs</label>
                      <input 
                        type="number" 
                        name="activeStudentsCount"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).activeStudentsCount : 
                          newDepartment.activeStudentsCount
                        }
                        onChange={handleDepartmentChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre de diplômés</label>
                      <input 
                        type="number" 
                        name="graduatesCount"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).graduatesCount : 
                          newDepartment.graduatesCount
                        }
                        onChange={handleDepartmentChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre de publications</label>
                      <input 
                        type="number" 
                        name="PublicationsCount"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).PublicationsCount : 
                          newDepartment.PublicationsCount
                        }
                        onChange={handleDepartmentChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Info journées portes ouvertes</label>
                      <input 
                        type="text" 
                        name="openDaysInfo"
                        value={selectedDepartment ? 
                          departments.find(d => d.id === selectedDepartment.id).openDaysInfo : 
                          newDepartment.openDaysInfo
                        }
                        onChange={handleDepartmentChange}
                        placeholder="Journées Portes Ouvertes : Mars 2024"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>URL de l'image d'arrière-plan</label>
                    <input 
                      type="url" 
                      name="backgroundImage"
                      value={selectedDepartment ? 
                        departments.find(d => d.id === selectedDepartment.id).backgroundImage : 
                        newDepartment.backgroundImage
                      }
                      onChange={handleDepartmentChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="action-button secondary"
                      onClick={() => {
                        setEditingDepartment(false);
                        setSelectedDepartment(null);
                      }}
                    >
                      Annuler
                    </button>
                    <button 
                      className="action-button success"
                      onClick={saveDepartmentChanges}
                    >
                      <Save size={18} />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="data-cards">
                  {departments.map(department => (
                    <div className="data-card" key={department.id}>
                      <div className="data-card-header">
                        <h3 className="data-card-title">{department.name}</h3>
                        <div className="data-card-actions">
                          <button 
                            className="icon-button edit"
                            onClick={() => {
                              setSelectedDepartment(department);
                              setEditingDepartment(true);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-button delete"
                            onClick={() => deleteDepartment(department.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="data-card-body">
                        <div className="data-card-property">
                          <span className="property-label">Chef:</span>
                          <span className="property-value">
                            {department.chefId ? 
                              (() => {
                                const chief = users.find(u => u.id === department.chefId);
                                if (chief) {
                                  return `${chief.prenom || ''} ${chief.nom || ''} (${chief.nom_utilisateur})`;
                                } 
                                return "ID Chief trouvé mais utilisateur non trouvé";
                              })() : 
                              <span className="text-amber-500">Non assigné</span>}
                          </span>
                        </div>
                        
                        <div className="data-card-property">
                          <span className="property-label">Slogan:</span>
                          <span className="property-value">{department.slogan}</span>
                        </div>
                        
                        <div className="data-card-property">
                          <span className="property-label">URL:</span>
                          <span className="property-value">{department.slug}</span>
                        </div>
                        
                        <div className="data-card-property description">
                          <span className="property-label">Description:</span>
                          <span className="property-value">{department.description}</span>
                        </div>
                        
                        <div className="data-card-property">
                          <span className="property-label">Statistiques:</span>
                          <span className="property-value">
                            {department.activeStudentsCount} étudiants, 
                            {department.graduatesCount} diplômés, 
                            {department.PublicationsCount} publications
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assignments Management */}
          {activeTab === 'assignments' && (
            <div>
              <div className="section-header">
                <h2 className="section-title">Affectations et Rôles</h2>
              </div>
              
              <div className="dashboard-two-columns">
                {/* Department Chef Assignment */}
                <div className="assignment-container">
                  <h3 className="section-subtitle">Assigner un Chef de Département</h3>
                  
                  <div className="form-container">
                    {departments.map(department => (
                      <div key={department.id} className="assignment-card">
                        <h4 className="assignment-title">{department.name}</h4>
                        
                        <div className="assignment-content">
                          <div className="assignment-current">
                            <span className="assignment-label">Chef actuel:</span>
                            <span className="assignment-value">
                              {department.chefId ? 
                                users.find(u => u.id === department.chefId)?.nom_utilisateur : 
                                <span className="text-amber-500">Non assigné</span>
                              }
                            </span>
                          </div>
                          
                          <div className="assignment-select">
                            <select 
                              className="chef-select"
                              onChange={(e) => assignChefToDepartment(e.target.value, department.id)}
                              value={department.chefId || ""}
                            >
                              <option value="">Sélectionner un chef</option>
                              {users
                                .filter(user => user.departement_id === department.id || !user.departement_id)
                                .map(user => (
                                  <option key={user.id} value={user.id}>
                                    {formatUserName(user)} - {user.specialite || user.titre || ""}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* User Department Assignment */}
                <div className="assignment-container">
                  <h3 className="section-subtitle">Affecter un Utilisateur à un Département</h3>
                  
                  <div className="form-container">
                    <div className="form-group">
                      <label>Sélectionnez un utilisateur</label>
                      <select id="user-select" className="full-width">
                        <option value="">Choisir un utilisateur</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {formatUserName(user)} - {user.role === "cd" ? "Chef de département" : 
                             user.role === "cf" ? "Chef de filière" : "Professeur"}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Sélectionnez un département</label>
                      <select id="department-select" className="full-width">
                        <option value="">Choisir un département</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <button 
                      className="action-button primary full-width"
                      onClick={() => {
                        const userId = document.getElementById('user-select').value;
                        const deptId = document.getElementById('department-select').value;
                        
                        if (userId && deptId) {
                          assignUserToDepartment(userId, deptId);
                          document.getElementById('user-select').value = "";
                          document.getElementById('department-select').value = "";
                        } else {
                          alert("Veuillez sélectionner un utilisateur et un département");
                        }
                      }}
                    >
                      <UserCog size={18} />
                      <span>Affecter au département</span>
                    </button>
                  </div>
                  
                  {/* Current Assignments List */}
                  <div className="current-assignments">
                    <h4 className="assignment-subtitle">Affectations actuelles</h4>
                    
                    <div className="assignments-list">
                      {users
                        .filter(user => user.departement_id)
                        .map(user => (
                          <div key={user.id} className="assignment-item">
                            <div className="assignment-user">
                              <span className="user-name">{formatUserName(user)}</span>
                              <span className={`role-badge mini ${
                                user.role === "cd" ? 'chef-dep' : 
                                user.role === "cf" ? 'coordinator' : 'professor'
                              }`}>
                                {user.role === "cd" ? 'Chef' : 
                                 user.role === "cf" ? 'CF' : 'Prof'}
                              </span>
                            </div>
                            <div className="assignment-department">
                              {departments.find(d => d.id === user.departement_id)?.name}
                            </div>
                            <button 
                              className="icon-button delete"
                              onClick={() => assignUserToDepartment(user.id, "")}
                              title="Retirer cette affectation"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};