import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, FileText } from 'lucide-react';
import { useState } from 'react';

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com',
    color: 'hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    color: 'hover:text-[#0A66C2]',
  },
  {
    icon: FileText,
    label: 'CV',
    href: '#',
    color: 'hover:text-accent-cyan',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6"
      style={{
        background: 'linear-gradient(180deg, #0c1025 0%, #0a0e27 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent-cyan text-sm font-medium uppercase tracking-widest"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-4"
          >
            Me <span className="text-gradient">Contacter</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Intéressé par une collaboration ou une opportunité professionnelle ?
            N'hésitez pas à me contacter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-panel rounded-2xl p-8 h-full">
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Informations de contact
              </h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Email</div>
                    <a
                      href="mailto:jamalidrissitaha07@gmail.com"
                      className="text-white hover:text-accent-cyan transition-colors"
                    >
                      jamalidrissitaha07@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-pink-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Localisation</div>
                    <span className="text-white">Rabat-Salé-Kénitra</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="text-sm text-slate-500 mb-4">Réseaux sociaux</div>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-slate-400 ${link.color} hover:border-accent-cyan/30 transition-all duration-300`}
                      title={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* CV Download */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
  href="/images/cv-professionnel.pdf"
  download="cv-professionnel.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-f..."
>
  <FileText className="w-5 h-5" />
  <span>Télécharger mon CV</span>
</a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-8"
            >
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Envoyer un message
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 transition-colors resize-none"
                    placeholder="Votre message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:shadow-glow'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>Message envoyé !</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">P</span>
            </div>
            <span className="text-slate-500 text-sm">
              © 2025 Portfolio. Tous droits réservés.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="text-slate-500 hover:text-accent-cyan text-sm transition-colors">
              Accueil
            </a>
            <a href="#about" className="text-slate-500 hover:text-accent-cyan text-sm transition-colors">
              À propos
            </a>
            <a href="#projects" className="text-slate-500 hover:text-accent-cyan text-sm transition-colors">
              Projets
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
