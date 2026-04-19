import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import WordCloud from '../components/WordCloud';
import { Cpu, Globe, Database, Network } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    icon: Cpu,
    title: 'Langages',
    skills: ['C++', 'C#', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Globe,
    title: 'Web',
    skills: ['ASP.NET', 'React', 'Node.js', 'HTML/CSS', 'MVC', 'Tailwind'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Base de données',
    skills: ['SQL Server', 'MySQL', 'SQLite'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Network,
    title: 'Réseaux',
    skills: ['Cisco', 'Wireshark', 'Packet Tracer', 'TCP/IP', 'VLAN', 'OSPF'],
    color: 'from-orange-500 to-red-500',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.15]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{ background: '#080c20' }}
    >
      {/* Perspective Grid Background */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'top center',
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent-purple text-sm font-medium uppercase tracking-widest"
          >
            Technologies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-4"
          >
            Mes <span className="text-gradient">Compétences</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Un éventail de technologies maîtrisées, du développement logiciel
            à l'administration réseau.
          </motion.p>
        </div>

        {/* 3D Word Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <WordCloud />
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="glass-panel rounded-xl p-6 hover:border-white/20 transition-all duration-500 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:border-accent-cyan/50 hover:text-accent-cyan transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
