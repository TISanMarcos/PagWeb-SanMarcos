import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  { label: 'Perros', emoji: '🐕', bg: 'from-brand-naranja/90 to-brand-naranja' },
  { label: 'Gatos', emoji: '🐈', bg: 'from-brand-verde-claro/80 to-brand-verde-claro' },
  { label: 'Aves', emoji: '🦜', bg: 'from-brand-verde-oscuro/90 to-brand-verde-oscuro' },
  { label: 'Pecuarios', emoji: '🐷', bg: 'from-brand-beige to-brand-neutral' },
  { label: 'Otros', emoji: '🐹', bg: 'from-brand-verde-claro-oscuro/80 to-brand-verde-oscuro/70' },
];

const CategoriesSection = () => (
  <section id="categorias" className="section-pad section-surface">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <h2 className="section-title">
          ¿Qué surtes hoy?
        </h2>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 btn-primary text-sm py-2.5"
        >
          Ver todo
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {categories.map(({ label, emoji, bg }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <Link
              to="/catalog"
              className={`group flex flex-col items-center justify-center aspect-square rounded-2xl md:rounded-3xl bg-gradient-to-br ${bg} shadow-soft border border-brand-beige/50 transition-shadow hover:shadow-premium`}
            >
              <span
                className="text-4xl md:text-5xl mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110 select-none"
                role="img"
                aria-label={label}
              >
                {emoji}
              </span>
              <span
                className={`font-collier font-bold text-base md:text-lg ${
                  bg.includes('beige') || bg.includes('verde-claro/80')
                    ? 'text-brand-verde-oscuro'
                    : 'text-white'
                }`}
              >
                {label}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default CategoriesSection;
