import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, GraduationCap, Users, BookOpen, Code, Calendar, Mail, Phone, Award, Target, Globe, Briefcase, Moon, Sun } from 'lucide-react';
import ViewCounter from '../components/ViewCounter';

const professeurs = [
  {
    nom: "Prof. NASSAR",
    titre: "Professeur - Chef de Département",
    specialite: "Architecture Logicielle, Génie Logiciel",
    email: "prof.nassar@ensias.ma",
    telephone: "+212 5 37 68 71 50",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    nom: "Dr. Amal BENYAHIA",
    titre: "Professeure",
    specialite: "Algorithmique Avancée, Structures de Données",
    email: "a.benyahia@ensias.ma",
    telephone: "+212 5 37 68 71 51",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c8d9?w=200&h=200&fit=crop&crop=face"
  },
  {
    nom: "Dr. Lamia KHADIRI",
    titre: "Professeure Associée",
    specialite: "Programmation Orientée Objet, Java",
    email: "l.khadiri@ensias.ma",
    telephone: "+212 5 37 68 71 52",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face"
  },
  {
    nom: "Dr. Youssef EL KAF",
    titre: "Professeur",
    specialite: "Génie Logiciel, Qualité Logicielle",
    email: "y.elkaf@ensias.ma",
    telephone: "+212 5 37 68 71 53",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  }
];

const semestres = [
  {
    nom: "1er Semestre",
    description: "Fondations solides en algorithmique et structures de données pour le développement logiciel",
    couleur: "from-blue-500 to-blue-600",
    modules: [
      {
        nom: "Algorithmique Avancée",
        professeur: "Dr. Amal BENYAHIA",
        credits: 6,
        coefficient: 3,
        description: "Étude approfondie des algorithmes de tri, recherche, graphes et programmation dynamique"
      },
      {
        nom: "Architecture des Ordinateurs",
        professeur: "Prof. Ahmed EL MOUTAOUAKIL",
        credits: 4,
        coefficient: 2,
        description: "Compréhension de l'architecture matérielle et son impact sur les performances logicielles"
      },
      {
        nom: "Structures de Données",
        professeur: "Dr. Rachid AIT MOUSSA",
        credits: 5,
        coefficient: 3,
        description: "Listes, arbres, graphes, tables de hachage et leur implémentation efficace"
      },
      {
        nom: "Mathématiques Discrètes",
        professeur: "Dr. Fatima ZAHRA",
        credits: 4,
        coefficient: 2,
        description: "Logique, théorie des ensembles, combinatoire appliquée à l'informatique"
      }
    ]
  },
  {
    nom: "2ème Semestre",
    description: "Maîtrise de la programmation orientée objet et introduction aux bases de données",
    couleur: "from-green-500 to-green-600",
    modules: [
      {
        nom: "Programmation Orientée Objet",
        professeur: "Dr. Lamia KHADIRI",
        credits: 6,
        coefficient: 3,
        description: "Concepts avancés OOP en Java : héritage, polymorphisme, interfaces, design patterns"
      },
      {
        nom: "Base de Données",
        professeur: "Dr. Hicham TAZI",
        credits: 5,
        coefficient: 3,
        description: "Conception, normalisation, SQL avancé, transactions et optimisation"
      },
      {
        nom: "Génie Logiciel I",
        professeur: "Prof. Youssef EL KAF",
        credits: 5,
        coefficient: 3,
        description: "Méthodologies de développement, analyse des besoins, spécification"
      },
      {
        nom: "Interface Homme-Machine",
        professeur: "Dr. Sara RHAZI",
        credits: 3,
        coefficient: 2,
        description: "Principes d'ergonomie, design d'interfaces utilisateur modernes"
      }
    ]
  },
  {
    nom: "3ème Semestre",
    description: "Approfondissement du génie logiciel et introduction aux systèmes distribués",
    couleur: "from-purple-500 to-purple-600",
    modules: [
      {
        nom: "Méthodes Agiles",
        professeur: "Dr. Nadia LAGHZAOUI",
        credits: 4,
        coefficient: 2,
        description: "Scrum, Kanban, XP, DevOps - Pratiques collaboratives modernes"
      },
      {
        nom: "Systèmes d'Exploitation",
        professeur: "Prof. Badr TOUATI",
        credits: 5,
        coefficient: 3,
        description: "Processus, threads, mémoire virtuelle, systèmes de fichiers"
      },
      {
        nom: "Génie Logiciel II",
        professeur: "Dr. Saïd EL HAFIDI",
        credits: 6,
        coefficient: 3,
        description: "Architecture logicielle, patterns de conception, refactoring"
      },
      {
        nom: "Développement Web",
        professeur: "Dr. Mohammed TAZI",
        credits: 4,
        coefficient: 2,
        description: "HTML5, CSS3, JavaScript ES6+, frameworks modernes React/Vue"
      }
    ]
  },
  {
    nom: "4ème Semestre",
    description: "Expertise en qualité logicielle et architectures modernes",
    couleur: "from-red-500 to-red-600",
    modules: [
      {
        nom: "Qualité Logicielle",
        professeur: "Dr. Youssef EL KAF",
        credits: 5,
        coefficient: 3,
        description: "Tests unitaires, intégration continue, métriques qualité, SonarQube"
      },
      {
        nom: "Architecture des Systèmes",
        professeur: "Prof. Ahmed EL MOUTAOUAKIL",
        credits: 6,
        coefficient: 3,
        description: "Microservices, SOA, patterns architecturaux, cloud computing"
      },
      {
        nom: "DevOps et Intégration Continue",
        professeur: "Dr. Sanae BOURASS",
        credits: 4,
        coefficient: 2,
        description: "Docker, Kubernetes, CI/CD, Jenkins, GitLab, monitoring"
      },
      {
        nom: "Sécurité Informatique",
        professeur: "Dr. Khalid ZINE",
        credits: 4,
        coefficient: 2,
        description: "Cryptographie, sécurité web, OWASP, tests de pénétration"
      }
    ]
  },
  {
    nom: "5ème Semestre",
    description: "Spécialisation avancée et préparation au projet de fin d'études",
    couleur: "from-orange-500 to-orange-600",
    modules: [
      {
        nom: "Projet de Fin d'Études I",
        professeur: "Prof. NASSAR",
        credits: 8,
        coefficient: 4,
        description: "Conception et développement d'un projet innovant en équipe"
      },
      {
        nom: "Tests Logiciels Avancés",
        professeur: "Dr. Sara RHAZI",
        credits: 4,
        coefficient: 2,
        description: "Tests automatisés, BDD, TDD, outils de test modernes"
      },
      {
        nom: "Ingénierie Dirigée par les Modèles",
        professeur: "Dr. Yassine EL KABBAJ",
        credits: 4,
        coefficient: 2,
        description: "UML, génération de code, MDA, outils CASE"
      },
      {
        nom: "Intelligence Artificielle",
        professeur: "Dr. Karim EL YAAKOUBI",
        credits: 3,
        coefficient: 2,
        description: "Machine Learning, algorithmes d'IA appliqués au génie logiciel"
      }
    ]
  },
  {
    nom: "6ème Semestre",
    description: "Stage professionnel et validation des compétences acquises",
    couleur: "from-indigo-500 to-indigo-600",
    modules: [
      {
        nom: "Stage PFE",
        professeur: "Encadrant entreprise + Superviseur académique",
        credits: 15,
        coefficient: 6,
        description: "Stage de 6 mois en entreprise pour la réalisation du PFE"
      },
      {
        nom: "Soutenance",
        professeur: "Jury académique et professionnel",
        credits: 5,
        coefficient: 3,
        description: "Présentation et défense du projet devant un jury d'experts"
      },
      {
        nom: "Rapport de Stage",
        professeur: "Encadrant académique",
        credits: 3,
        coefficient: 2,
        description: "Rédaction d'un rapport technique détaillé"
      }
    ]
  }
];

const statistiques = [
  { label: "Étudiants actifs", valeur: "150+", icone: Users },
  { label: "Taux de réussite", valeur: "94%", icone: Award },
  { label: "Insertion professionnelle", valeur: "97%", icone: Target },
];

const Departement = () => {
  const [semestreActif, setSemestreActif] = useState(0);
  const [professeurActif, setProfesseurActif] = useState(0);
  
  // Add dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true'; // defaults to false if not set
    }
    return false;
  });
  
  // Apply dark mode class whenever the state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handlePrevSemestre = () => {
    setSemestreActif((prev) => (prev - 1 + semestres.length) % semestres.length);
  };

  const handleNextSemestre = () => {
    setSemestreActif((prev) => (prev + 1) % semestres.length);
  };

  const handlePrevProfesseur = () => {
    setProfesseurActif((prev) => (prev - 1 + professeurs.length) % professeurs.length);
  };

  const handleNextProfesseur = () => {
    setProfesseurActif((prev) => (prev + 1) % professeurs.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header avec compteur de vues */}
      <header className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 border-b-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            {/* Mobile Layout (stacked) */}
            <div className="flex flex-col sm:hidden space-y-4">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-sm">Retour à l'accueil</span>
                </Link>
                
                {/* Dark mode toggle for mobile */}
                <button 
                  onClick={toggleDarkMode}
                  className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-full mr-3">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Département Génie Logiciel</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Excellence • Innovation • Performance</p>
                  </div>
                </div>
                <ViewCounter />
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden sm:flex justify-between items-center">
              <div className="flex items-center">
                <Link to="/" className="flex items-center text-red-600 hover:text-red-800 mr-8 transition-colors duration-300">
                  <ArrowLeft className="h-6 w-6 mr-3" />
                  <span className="font-semibold">Retour à l'accueil</span>
                </Link>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-full mr-4">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Département Génie Logiciel</h1>
                    <p className="text-gray-600 dark:text-gray-400">Excellence • Innovation • Performance</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Dark mode toggle for desktop */}
                <button 
                  onClick={toggleDarkMode}
                  className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
                <ViewCounter />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}></div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 opacity-80"></div>
        
        {/* Additional Dark Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-black opacity-30 dark:opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Text with Enhanced Shadow */}
            <h1 className="text-6xl md:text-7xl font-bold mb-8 animate-fade-in drop-shadow-2xl">
              Génie Logiciel
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Former les architectes du futur numérique avec une expertise technique d'excellence 
              et une vision stratégique innovante
            </p>
            
            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16">
              {statistiques.map((stat, index) => (
                <div key={index} className="relative group">
                  {/* Card Background with Enhanced Overlay */}
                  <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 border border-white border-opacity-20 shadow-2xl hover:bg-opacity-20">
                    {/* Inner Shadow Overlay for Better Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black to-transparent opacity-10 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <stat.icone className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg">{stat.valeur}</div>
                      <div className="text-xs sm:text-sm opacity-90 drop-shadow-md">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-20">
        {/* Présentation du département */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900 p-6 sm:p-12 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Notre Vision</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Le Département de Génie Logiciel de l'ENSIAS est un centre d'excellence reconnu 
                internationalement qui forme des ingénieurs logiciels de classe mondiale. Depuis 
                sa création, notre département se distingue par son approche pédagogique innovante 
                qui allie rigueur académique et excellence pratique.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Nos diplômés occupent des postes stratégiques dans les plus grandes entreprises 
                technologiques mondiales et contribuent activement à l'innovation dans l'industrie 
                du logiciel. Notre cursus, constamment mis à jour, reflète les dernières avancées 
                technologiques et les besoins émergents du marché.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Années d'excellence</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Diplômés en activité</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" 
                alt="Programmation moderne"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-transparent to-transparent opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </section>

        {/* Équipe Pédagogique Carousel */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-950 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Notre Équipe d'Excellence</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Des professeurs reconnus, experts dans leurs domaines
            </p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900 p-8">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handlePrevProfesseur}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-bold text-center text-red-600 dark:text-red-400">Professeur</h3>
              <button 
                onClick={handleNextProfesseur}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={professeurs[professeurActif].image}
                  alt={professeurs[professeurActif].nom}
                  className="w-48 h-48 rounded-full object-cover border-4 border-red-500 shadow-xl"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {professeurs[professeurActif].nom}
                </h4>
                <p className="text-xl text-red-600 dark:text-red-400 font-semibold mb-4">
                  {professeurs[professeurActif].titre}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Spécialisation : {professeurs[professeurActif].specialite}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="h-5 w-5 mr-2 text-red-500 dark:text-red-400" />
                    <span>{professeurs[professeurActif].email}</span>
                  </div>
              
                </div>
              </div>
            </div>

            {/* Indicateurs */}
            <div className="flex justify-center mt-8 space-x-3">
              {professeurs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setProfesseurActif(idx)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    professeurActif === idx ? 'bg-red-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Programme Détaillé par Semestre */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Programme Académique Détaillé</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Un cursus complet et progressif conçu pour former des experts en génie logiciel
            </p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900 p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={handlePrevSemestre}
                className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg transform hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="text-center">
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${semestres[semestreActif].couleur} bg-clip-text text-transparent mb-2`}>
                  {semestres[semestreActif].nom}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                  {semestres[semestreActif].description}
                </p>
              </div>
              
              <button 
                onClick={handleNextSemestre}
                className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg transform hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {semestres[semestreActif].modules.map((module, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-xl font-bold bg-gradient-to-r ${semestres[semestreActif].couleur} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                      {module.nom}
                    </h4>
                    <div className="flex gap-2">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2 py-1 rounded-full">
                        {module.credits} ECTS
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs font-semibold px-2 py-1 rounded-full">
                        Coeff. {module.coefficient}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="border-t dark:border-gray-600 pt-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="font-semibold">Professeur :</span>
                      <span className="ml-2">{module.professeur}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicateurs de semestre */}
            <div className="flex justify-center space-x-3">
              {semestres.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSemestreActif(idx)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    semestreActif === idx 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Compétences et Débouchés */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-900 p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <Code className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Compétences Acquises</h3>
              <div className="w-16 h-1 bg-red-500 mx-auto"></div>
            </div>
            
            <div className="space-y-4">
              {[
                "Maîtrise complète du cycle de développement logiciel",
                "Expertise en architectures modernes (microservices, cloud)",
                "Compétences avancées en qualité logicielle et tests",
                "Gestion de projets agiles et DevOps",
                "Leadership technique et innovation",
                "Adaptabilité aux nouvelles technologies"
              ].map((competence, index) => (
                <div key={index} className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                  <span className="text-gray-700 dark:text-gray-300">{competence}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-900 p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <Briefcase className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Débouchés Professionnels</h3>
              <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            </div>
            
            <div className="space-y-4">
              {[
                "Architecte Logiciel Senior",
                "Lead Developer / Tech Lead",
                "Chef de Projet Technique",
                "DevOps Engineer",
                "Consultant en Transformation Numérique",
                "Entrepreneur Tech / Startup Founder"
              ].map((metier, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                  <span className="text-gray-700 dark:text-gray-300">{metier}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact et Informations */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Rejoignez l'Excellence</h2>
              <p className="text-xl mb-8 opacity-90">
                Intégrez le département Génie Logiciel et donnez une nouvelle dimension à votre carrière technologique.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4" />
                  <span className="text-lg">departement.gl@ensias.ma</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4" />
                  <span className="text-lg">+212 5 37 68 71 50</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-4" />
                  <span className="text-lg">Journées Portes Ouvertes : Mars 2024</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 dark:bg-opacity-10 rounded-3xl p-8 backdrop-blur-sm">
                <BookOpen className="h-16 w-16 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Admission</h3>
                <p className="text-lg opacity-90 mb-6">
                  Concours national d'accès aux grandes écoles d'ingénieurs
                </p>
                <Link 
                  to="/contact"
                  className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  Nous Contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Departement;