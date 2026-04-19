import { motion } from 'framer-motion';
import { ExternalLink, Code2, Layers, Network, Globe } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Système de Gestion de Parking',
    description:
      "Conception et développement d'une application desktop pour l'automatisation du suivi des entrées et sorties des véhicules. Interface graphique intuitive avec gestion en temps réel des places de parking.",
    technologies: ['C++', 'C++ Builder', 'SQL'],
    image: '/images/project-parking.jpg',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
    gradientBg: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 2,
    title: 'Application Web de Réservation de Coworking',
    description:
      "Conception et développement d'une plateforme web dynamique pour la gestion automatisée des réservations d'espaces de travail, basée sur une architecture robuste en couches.",
    technologies: ['Visual Studio', 'Architecture MVC', 'C#', 'ASP.NET'],
    image: '/images/project-coworking.jpg',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    gradientBg: 'from-purple-500/10 to-pink-500/10',
  },
  {
    id: 3,
    title: 'Projets Réseaux & Analyse',
    description:
      "Conception de topologies réseau complexes et simulation de protocoles. Mise en place d'infrastructures réseau virtuelles avec analyse de trafic et diagnostic.",
    technologies: ['Cisco Packet Tracer', 'Wireshark'],
    image: '/images/project-network.jpg',
    icon: Network,
    color: 'from-emerald-500 to-teal-500',
    gradientBg: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    id: 4,
    title: 'Portfolio Spatial',
    description:
      "Ce portfolio interactif que vous explorez actuellement. Conception et développement d'une expérience web immersive avec effets 3D et animations fluides.",
    technologies: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/project-portfolio.jpg',
    icon: Code2,
    color: 'from-orange-500 to-red-500',
    gradientBg: 'from-orange-500/10 to-red-500/10',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6"
      style={{
        background: 'linear-gradient(180deg, #080c20 0%, #0a0e27 50%, #0c1025 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent-cyan text-sm font-medium uppercase tracking-widest"
          >
            Réalisations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-4"
          >
            Mes <span className="text-gradient">Projets</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Une sélection de projets académiques démontrant mes compétences
            en développement logiciel et en réseaux informatiques.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative glass-panel rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradientBg} opacity-60`}
                />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent" />

                {/* Icon Badge */}
                <div
                  className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}
                >
                  <project.icon className="w-5 h-5 text-white" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Button */}
                <button className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-white transition-colors group/btn">
                  <span>Voir le projet</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Glow Effect on Hover */}
              <div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
