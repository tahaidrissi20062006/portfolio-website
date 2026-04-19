import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { User, GraduationCap, Target, Code2 } from 'lucide-react';

const STATS = [
  { icon: Code2, label: 'Projets', value: '4+' },
  { icon: GraduationCap, label: 'Formations', value: '3' },
  { icon: Target, label: 'Technologies', value: '15+' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6"
      style={{
        background: 'linear-gradient(180deg, #0a0e27 0%, #0f1535 50%, #0a0e27 100%)',
      }}
    >
      <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent-cyan text-sm font-medium uppercase tracking-widest"
          >
            À propos de moi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white mt-4"
          >
            Qui suis-je ?
          </motion.h2>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-2xl p-8 sm:p-12"
        >
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-2 ring-accent-cyan/30 glow-cyan">
                <img
                  src="/images/profile.jpg"
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Étudiant en Développement Logiciel & Réseaux
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Passionné par le développement logiciel et les réseaux informatiques,
                je combine des compétences solides en programmation (C++, C#, JavaScript)
                avec une expertise en administration réseau (Cisco, Wireshark).
                Mon parcours académique m'a permis de réaliser des projets concrets allant
                des applications desktop aux applications web en passant par la simulation
                de réseaux complexes.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Je suis constamment à la recherche de nouveaux défis techniques et
                d'opportunités pour mettre mes compétences au service de projets innovants.
                Mon approche allie rigueur technique et créativité pour concevoir des
                solutions efficaces et élégantes.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="glass-panel rounded-xl p-4 text-center"
                  >
                    <stat.icon className="w-5 h-5 text-accent-cyan mx-auto mb-2" />
                    <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
