import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Menu, X, Moon, Sun } from 'lucide-react'
import background_ensias_dark from '../assets/59.jpg'
import ensias_logo_whitebg from '../assets/Ensias2.jpg'
import ensias_logo_bg_removed from '../assets/Ensias2-removebg-preview.png'
import um5 from '../assets/Mohammed_V_University_Logo.png'
import ensias_image from '../assets/55.jpg'
import background_ensias_light from '../assets/55.jpg'
import DepartmentCard from '../components/DepartmentCard'

function App() {
  const [activeSection, setActiveSection] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Simplified dark mode state management - force manual control
  const [darkMode, setDarkMode] = useState(() => {
    // Only check for saved preference, ignore system preference
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
    
    // Debug log
    console.log('Dark mode is now:', darkMode ? 'ON' : 'OFF');
  }, [darkMode]);

  // Explicit toggle function
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
  };
  
  const departments = [
    {
      id: 1,
      name: "Génie Logiciel",
      description: "Optimisation des processus industriels et gestion de la production",
      specializations: ["Logistique", "Qualité", "Management", 
        "Devops", "Agilité"
      ],
      duration: "3 ans",
      color: "bg-green-500"
    },
    {
      id: 2,
      name: "Génie Data",
      description: "Formation en développement logiciel, intelligence artificielle et systèmes d'information",
      specializations: ["IA & Data Science", "Développement Web", "Cybersécurité"],
      duration: "3 ans",
      color: "bg-blue-500"
    },
    {
      id: 3,
      name: "IDSIT",
      description: "Conception et construction d'ouvrages d'art et d'infrastructures",
      specializations: ["BTP", "Géotechnique", "Hydraulique"],
      duration: "3 ans",
      color: "bg-orange-500"
    },
    {
      id: 4,
      name: "SSE",
      description: "Systèmes électriques, électroniques et énergies renouvelables",
      specializations: ["Énergies Renouvelables", "Automatique", "Électronique", 'IOT', "data science"],
      duration: "3 ans",
      color: "bg-yellow-500"
    },
    {
      id: 5,
      name: "Génie Business intelligence",
      description: "Conception et fabrication de systèmes mécaniques",
      specializations: ["Mécatronique", "Matériaux", "Thermique", "Robotique"],
      duration: "3 ans",
      color: "bg-purple-500"
    },
    {
      id: 6,
      name: "SSI",
      description: "Technologies de communication et réseaux informatiques",
      specializations: ["5G", "IoT", "Sécurité Réseaux","IA & Data Science", "Développement Web", "Cybersécurité"],
      duration: "3 ans",
      color: "bg-red-500"
    },
      
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['departments', 'about', 'contact']
      const scrollPos = window.scrollY + 200 // adjust offset as needed

      for (let id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = (id) =>
    `text-gray-700 dark:text-gray-200 font-semibold hover:text-[#ee3638] dark:hover:text-[#ff6b6d] transition duration-300 ${
      activeSection === id ? 'text-[#ee3638] dark:text-[#ff6b6d]' : ''
    }`

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 scroll-smooth">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 z-50"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logos */}
          <div className="flex items-center space-x-4">
            <motion.img
              src={ensias_logo_bg_removed}
              alt="ENSIAS Logo"
              className="h-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={um5}
              alt="UM5 Logo"
              className="h-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger button */}
            <button 
              className="md:hidden text-gray-700 dark:text-gray-200 hover:text-[#ee3638] dark:hover:text-[#ff6b6d] focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className={navLinkClass('about')}>
              À Propos
            </a>
            <a href="#departments" className={navLinkClass('departments')}>
              Départements
            </a>

            <a href="#contact" className={navLinkClass('contact')}>
              Contact
            </a>
            
            {/* Dark mode toggle - properly positioned on desktop */}
            <button 
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-200 hover:text-[#ee3638] dark:hover:text-[#ff6b6d] focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button className="text-white bg-[#ee3638] px-4 py-2 rounded hover:bg-opacity-90">
              Se connecter
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="flex flex-col py-4 px-4 space-y-4">
              <a 
                href="#departments" 
                className={`${navLinkClass('departments')} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Départements
              </a>
              <a 
                href="#about" 
                className={`${navLinkClass('about')} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </a>
              <a 
                href="#contact" 
                className={`${navLinkClass('contact')} block py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              {/* Dark mode toggle in mobile menu */}
              <div className="flex items-center py-2">
                <button 
                  onClick={toggleDarkMode}
                  className="text-gray-700 dark:text-gray-200 hover:text-[#ee3638] dark:hover:text-[#ff6b6d] focus:outline-none flex items-center"
                >
                  {darkMode ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      <span>Mode clair</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" />
                      <span>Mode sombre</span>
                    </>
                  )}
                </button>
              </div>
              
              <button className="text-white bg-[#ee3638] px-4 py-2 rounded hover:bg-opacity-90 self-start">
                Se connecter
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
      >
        {/* Background image layer - light mode */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${background_ensias_light})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            opacity: darkMode ? 0 : 1
          }}
        ></div>
        
        {/* Background image layer - dark mode */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${background_ensias_dark})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: darkMode ? 1 : 0
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-60"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 text-[#ee3638]">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            ENSIAS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 text-white"
          >
            École Nationale Supérieure d'Informatique et d'Analyse des Systèmes
          </motion.p>
          <motion.a
            href="#departments"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block bg-white dark:bg-gray-800 text-[#ee3638] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Découvrir nos départements
          </motion.a>
        </div>
      </motion.section>



      {/* À Propos Section */}
      <section
        id="about"
        className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-[150px] items-center">
          <img
            src={ensias_image}
            alt="ENSIAS campus"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-bold text-[#ee3638] mb-6">À Propos de l'ENSIAS</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              L'École Nationale Supérieure d'Informatique et d'Analyse des Systèmes (ENSIAS)
              est l'une des écoles d'ingénieurs les plus prestigieuses au Maroc. Fondée en 1993,
              elle fait partie de l'Université Mohammed V de Rabat.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              L'ENSIAS propose plusieurs filières de formation en informatique, allant du
              développement logiciel, à la cybersécurité, en passant par l'intelligence
              artificielle, le cloud computing, et les systèmes embarqués.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Grâce à un corps professoral hautement qualifié et des partenariats nationaux
              et internationaux, l'ENSIAS vise à former des ingénieurs polyvalents et
              compétents capables de répondre aux besoins du marché de l'emploi.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="pt-20 dark:bg-gray-900">
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un département..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ee3638] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Departments Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Aucun département trouvé pour "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-700/40 shadow-2xl dark:shadow-gray-900 rounded-3xl p-10 w-full max-w-4xl relative"
        >
          {/* ENSIAS logo */}
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <img
              src={ensias_logo_bg_removed}
              alt="ENSIAS"
              className="h-20 w-22 p-2 rounded-2xl shadow-lg border-4 border-[#ee3638] bg-white dark:bg-gray-800"
            />
          </div>

          <h2 className="text-4xl font-bold text-center text-[#ee3638] mb-10 mt-10">
            Contactez-nous
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ee3638] text-gray-900 dark:text-white"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="exemple@mail.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ee3638] text-gray-900 dark:text-white"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Votre message..."
                className="w-full px-4 py-3 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ee3638] text-gray-900 dark:text-white"
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <button
                type="submit"
                className="bg-[#ee3638] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#d8302b] transition-all duration-300 shadow-lg"
              >
                Envoyer le message
              </button>
            </motion.div>
          </form>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#1E2228] dark:bg-black text-white py-10 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* ENSIAS Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <img
              src={ensias_logo_bg_removed}
              alt="ENSIAS"
              className="h-12 w-12"
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6 text-sm md:text-base"
          >
            <a href="#departments" className="hover:text-[#ee3638] transition duration-300">
              Départements
            </a>
            <a href="#about" className="hover:text-[#ee3638] transition duration-300">
              À Propos
            </a>
            <a href="#contact" className="hover:text-[#ee3638] transition duration-300">
              Contact
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-gray-400 text-center md:text-right"
          >
            © {new Date().getFullYear()} ENSIAS — Tous droits réservés.
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App
