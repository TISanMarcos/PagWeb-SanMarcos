import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const base = import.meta.env.BASE_URL;

/** Fotos reales vía Unsplash (licencia Unsplash) */
const categories = [
  { label: 'Perros', image: `${base}categories/perros.jpg`, tilt: '-rotate-2' },
  { label: 'Gatos', image: `${base}categories/gatos.jpg`, tilt: 'rotate-1' },
  { label: 'Aves', image: `${base}categories/aves.jpg`, tilt: '-rotate-1' },
  { label: 'Pecuarios', image: `${base}categories/pecuarios.jpg`, tilt: 'rotate-2' },
  { label: 'Otros', image: `${base}categories/otros.jpg`, tilt: '-rotate-1.5' },
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
        <h2 className="section-title">¿Qué surtes hoy?</h2>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 btn-primary text-sm py-2.5"
        >
          Ver todo
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {categories.map(({ label, image, tilt }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex justify-center"
          >
            <Link
              to="/catalog"
              className={`group block w-full max-w-[168px] sm:max-w-[200px] ${tilt} hover:rotate-0 transition-transform duration-300`}
            >
              <article
                className="bg-white p-2.5 pb-9 md:p-3 md:pb-10 shadow-[0_4px_20px_rgba(0,48,32,0.12),0_1px_3px_rgba(0,0,0,0.08)] border border-white/80 group-hover:shadow-[0_12px_32px_rgba(0,48,32,0.18)] transition-shadow"
              >
                <div className="aspect-[4/5] overflow-hidden bg-brand-neutral/40 ring-1 ring-black/[0.04]">
                  <img
                    src={image}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 md:mt-4 text-center font-collier font-bold text-sm md:text-base text-brand-verde-oscuro tracking-tight">
                  {label}
                </p>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default CategoriesSection;
