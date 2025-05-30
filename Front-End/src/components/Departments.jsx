// at the top of the file
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Listbox } from '@headlessui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import prof_afia from '../assets/prof-afia.jpg';
import prof_nassar from '../assets/prof-nassar.jpg';

const departments = [
  {
    id: 1,
    name: 'Génie Logiciel',
    description:
      'Le département Génie Logiciel offre une formation approfondie en conception, développement, tests et déploiement de logiciels selon des standards industriels modernes.',
    chef: 'Prof. NASSAR',
    chefImage: prof_nassar,
    semesters: [
      {
        name: '1er Semestre',
        description: 'Fondations en développement logiciel et systèmes informatiques.',
        modules: [
          { name: 'Algorithmique Avancée', professor: 'Dr. Amal BENYAHIA' },
          { name: 'Architecture des Ordinateurs', professor: 'Prof. Ahmed EL MOUTAOUAKIL' },
          { name: 'Structures de Données', professor: 'Dr. Rachid AIT MOUSSA' },
        ],
      },
      {
        name: '2ème Semestre',
        description: 'Introduction aux bases de données et à la programmation orientée objet.',
        modules: [
          { name: 'Programmation Orientée Objet', professor: 'Dr. Lamia KHADIRI' },
          { name: 'Base de Données', professor: 'Dr. Hicham TAZI' },
          { name: 'Génie Logiciel I', professor: 'Prof. Youssef EL KAF' },
        ],
      },
      {
        name: '3ème Semestre',
        description: 'Renforcement des compétences en génie logiciel et systèmes distribués.',
        modules: [
          { name: 'Méthodes Agiles', professor: 'Dr. Nadia LAGHZAOUI' },
          { name: 'Systèmes d\'Exploitation', professor: 'Prof. Badr TOUATI' },
          { name: 'Génie Logiciel II', professor: 'Dr. Saïd EL HAFIDI' },
        ],
      },
      {
        name: '4ème Semestre',
        description: 'Pratiques avancées de qualité logicielle et architecture logicielle.',
        modules: [
          { name: 'Qualité Logicielle', professor: 'Dr. Youssef EL KAF' },
          { name: 'Architecture des Systèmes', professor: 'Prof. Ahmed EL MOUTAOUAKIL' },
          { name: 'DevOps et Intégration Continue', professor: 'Dr. Sanae BOURASS' },
        ],
      },
      {
        name: '5ème Semestre',
        description: 'Projet de spécialisation en développement logiciel.',
        modules: [
          { name: 'Projet de Fin d\'Études I', professor: 'Prof. NASSAR' },
          { name: 'Tests Logiciels Avancés', professor: 'Dr. Sara RHAZI' },
          { name: 'Ingénierie Dirigée par les Modèles', professor: 'Dr. Yassine EL KABBAJ' },
        ],
      },
      {
        name: '6ème Semestre',
        description: 'Stage en entreprise et soutenance du projet.',
        modules: [
          { name: 'Stage PFE', professor: 'Encadrant entreprise' },
          { name: 'Soutenance', professor: 'Jury académique' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Ingénierie Intelligence Artificielle',
    description:
      'Ce département forme des ingénieurs spécialistes en IA, capables de concevoir et développer des solutions intelligentes pour différents domaines.',
    chef: 'Prof. EL AFIA',
    chefImage: prof_afia,
    semesters: [
      {
        name: '1er Semestre',
        description: 'Bases mathématiques et informatiques pour l’IA.',
        modules: [
          { name: 'Mathématiques pour l\'IA', professor: 'Dr. Khalid ZINE' },
          { name: 'Algorithmique', professor: 'Dr. Amal BENYAHIA' },
          { name: 'Programmation Python', professor: 'Dr. Anas NAJI' },
        ],
      },
      {
        name: '2ème Semestre',
        description: 'Introduction à l’intelligence artificielle et aux statistiques.',
        modules: [
          { name: 'Statistiques', professor: 'Dr. Hanane AMAL' },
          { name: 'Introduction à l\'IA', professor: 'Prof. EL AFIA' },
          { name: 'Machine Learning I', professor: 'Dr. Bouchra KARDOUDI' },
        ],
      },
      {
        name: '3ème Semestre',
        description: 'Techniques avancées de Machine Learning et IA symbolique.',
        modules: [
          { name: 'Machine Learning II', professor: 'Dr. Karim EL YAAKOUBI' },
          { name: 'Systèmes Multi-Agents', professor: 'Dr. Khadija EL GHARBI' },
          { name: 'Logique et Raisonnement', professor: 'Dr. Samira LAHLOU' },
        ],
      },
      {
        name: '4ème Semestre',
        description: 'Applications pratiques en vision, NLP et IA embarquée.',
        modules: [
          { name: 'Vision par Ordinateur', professor: 'Dr. Hicham EL KAF' },
          { name: 'Traitement du Langage Naturel', professor: 'Dr. Sara DARBARE' },
          { name: 'IA pour systèmes embarqués', professor: 'Dr. Nabil TAHIRI' },
        ],
      },
      {
        name: '5ème Semestre',
        description: 'Travail de spécialisation et outils industriels en IA.',
        modules: [
          { name: 'Deep Learning', professor: 'Prof. Imad BADI' },
          { name: 'Outils IA Open Source', professor: 'Dr. Mehdi AZZOUZI' },
          { name: 'Projet IA', professor: 'Prof. EL AFIA' },
        ],
      },
      {
        name: '6ème Semestre',
        description: 'Stage de fin d’études en IA et soutenance.',
        modules: [
          { name: 'Stage PFE', professor: 'Encadrant entreprise' },
          { name: 'Soutenance', professor: 'Jury académique' },
        ],
      },
    ],
  },
];

export default function Department() {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [activeSemester, setActiveSemester] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSemester((prev) => (prev + 1) % selectedDepartment.semesters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [selectedDepartment]);

  const handlePrev = () => {
    setActiveSemester((prev) => (prev - 1 + selectedDepartment.semesters.length) % selectedDepartment.semesters.length);
  };

  const handleNext = () => {
    setActiveSemester((prev) => (prev + 1) % selectedDepartment.semesters.length);
  };

  return (
    <section id="departments" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-6xl font-bold text-[#ee3638] mb-4">Nos Départements</h2>
        <p className="text-gray-600">Découvrez nos différentes filières d'excellence</p>
      </motion.div>

      <div className="max-w-xl mx-auto mb-10">
        <Listbox value={selectedDepartment} onChange={(dep) => { setSelectedDepartment(dep); setActiveSemester(0); }}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left border border-gray-300">
              <span className="block truncate">{selectedDepartment.name}</span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              {departments.map((department) => (
                <Listbox.Option key={department.id} value={department} className={({ active }) => `${active ? 'bg-[#ee3638] text-white' : 'text-gray-900'} cursor-pointer select-none py-2 pl-4 pr-4`}>
                  {department.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="flex items-center mb-4">
          <img src={selectedDepartment.chefImage} alt={selectedDepartment.chef}  className="w-[200px] h-[200px] rounded-full mr-4 border-2 border-[#ee3638] object-cover" />
          <div>
            <h3 className="text-2xl font-bold text-[#ee3638]">{selectedDepartment.name}</h3>
            <p className="text-gray-600">{selectedDepartment.description}</p>
            <div className="text-gray-700 mt-2">
              <span className="font-semibold">Chef de département:</span> <span className="ml-2">{selectedDepartment.chef}</span>
            </div>
          </div>
        </div>

<br /> <hr />
<br />
        <div className="relative border shadow p-6 rounded">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrev}><ChevronLeft className="text-[#ee3638]" /></button>
            <h4 className="text-xl font-bold text-center text-[#ee3638]">{selectedDepartment.semesters[activeSemester].name}</h4>
            <button onClick={handleNext}><ChevronRight className="text-[#ee3638]" /></button>
          </div>
          <p className="text-gray-600 text-center mb-4">{selectedDepartment.semesters[activeSemester].description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedDepartment.semesters[activeSemester].modules.map((mod, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-white border border-gray-200 rounded-lg shadow-md p-4 overflow-hidden transition-all duration-300"
              >
                <div className="text-gray-900 text-lg font-semibold group-hover:text-[#ee3638] transition duration-300">
                  {mod.name}
                </div>
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-[#ee3638]">Professeur :</span> {mod.professor}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {selectedDepartment.semesters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSemester(idx)}
                className={`w-3 h-3 rounded-full ${activeSemester === idx ? 'bg-[#ee3638]' : 'bg-gray-300'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}