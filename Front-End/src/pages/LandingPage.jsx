import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Departments from '../components/Departments'
import background_ensias from '../assets/59.jpg'
import ensias_logo_whitebg from '../assets/Ensias2.jpg'
import ensias_logo_bg_removed from '../assets/Ensias2-removebg-preview.png'
import um5 from '../assets/Mohammed_V_University_Logo.png'
import ensias_image from '../assets/55.jpg'
function App() {
  const [activeSection, setActiveSection] = useState('')

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
    `text-gray-700 font-semibold hover:text-[#ee3638] transition duration-300 ${
      activeSection === id ? 'text-[#ee3638]' : ''
    }`

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logos */}
          <div className="flex items-center space-x-4">
            <motion.img
              src={ensias_logo_whitebg}
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

          {/* Navbar Links */}
          <div className="flex space-x-8 items-center">
            <a href="#departments" className={navLinkClass('departments')}>
              Départements
            </a>
            <a href="#about" className={navLinkClass('about')}>
              À Propos
            </a>
            <a href="#contact" className={navLinkClass('contact')}>
              Contact
            </a>
            <div className="ml-6 flex space-x-4">
              <button className="text-white bg-[#ee3638] px-4 py-2 rounded hover:bg-opacity-90">
                Se connecter
              </button>
              <button className="text-[#ee3638] border border-[#ee3638] px-4 py-2 rounded hover:bg-[#ee3638] hover:text-white">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${background_ensias})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative h-screen flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
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
            className="inline-block bg-white text-ensias-red px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Découvrir nos départements
          </motion.a>
        </div>
      </motion.section>

      {/* Departments Section */}
      <section id="departments" className="pt-20">
        <Departments />
      </section>

      {/* À Propos Section */}
      <section
  id="about"
  className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20"
>
  <div className="max-w-6xl w-full grid md:grid-cols-2 gap-[150px] items-center">
    <img
      src={ensias_image}
      alt="ENSIAS campus"
      className="w-full h-auto rounded-lg shadow-lg"
    />
    <div>
      <h2 className="text-4xl font-bold text-[#ee3638] mb-6">À Propos de l’ENSIAS</h2>
      <p className="text-gray-700 text-lg mb-4">
        L’École Nationale Supérieure d’Informatique et d’Analyse des Systèmes (ENSIAS)
        est l’une des écoles d’ingénieurs les plus prestigieuses au Maroc. Fondée en 1993,
        elle fait partie de l’Université Mohammed V de Rabat.
      </p>
      <p className="text-gray-700 text-lg mb-4">
        L’ENSIAS propose plusieurs filières de formation en informatique, allant du
        développement logiciel, à la cybersécurité, en passant par l’intelligence
        artificielle, le cloud computing, et les systèmes embarqués.
      </p>
      <p className="text-gray-700 text-lg">
        Grâce à un corps professoral hautement qualifié et des partenariats nationaux
        et internationaux, l’ENSIAS vise à former des ingénieurs polyvalents et
        compétents capables de répondre aux besoins du marché de l’emploi.
      </p>
    </div>
  </div>
</section>


      {/* Contact Section */}

      <section
        id="contact"
        className="min-h-screen bg-white flex items-center justify-center px-4 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-4xl relative"
        >
          {/* ENSIAS logo */}
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            <img
              src={ensias_logo_bg_removed}
              alt="ENSIAS"
              className="h-20 w-22 p-2 rounded-2xl shadow-lg border-4 border-[#ee3638] bg-white"
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
                <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ee3638]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="exemple@mail.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ee3638]"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Votre message..."
                className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ee3638]"
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

      {/* footer Section */}


      <footer className="bg-[#1E2228] text-white py-10 px-6">
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
