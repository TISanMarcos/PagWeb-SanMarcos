import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const OPTIONS = [
  {
    id: 'retail',
    emoji: '🐾',
    label: 'Para mi mascota',
    description: 'Compro alimento, accesorios o productos para mi perro o gato en casa.',
  },
  {
    id: 'business',
    emoji: '🏪',
    label: 'Para mi negocio',
    description: 'Tengo tienda, clínica, abarrotes o revendo productos para mascotas.',
  },
];

const AudienceModal = ({ onClose, onSelect }) => (
  <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
    <motion.button
      type="button"
      className="absolute inset-0 bg-brand-verde-oscuro/60 backdrop-blur-sm"
      onClick={onClose}
      aria-label="Cerrar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audience-title"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-brand-crema rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 border border-brand-beige"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-brand-verde-oscuro/50 hover:text-brand-naranja"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 id="audience-title" className="text-2xl font-collier font-bold text-brand-verde-oscuro mb-2 pr-8">
        ¿Cómo nos visitas hoy?
      </h2>
      <p className="text-sm font-amsi text-brand-verde-oscuro/70 mb-6">
        Elige la opción que mejor te describe para mostrarte el catálogo y contacto correctos.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="text-left p-5 rounded-2xl border-2 border-brand-beige bg-white hover:border-brand-naranja hover:shadow-md transition-all group flex gap-4 items-start"
          >
            <span className="text-3xl flex-shrink-0" aria-hidden>
              {option.emoji}
            </span>
            <span>
              <span className="font-collier font-bold text-brand-verde-oscuro block group-hover:text-brand-naranja text-lg">
                {option.label}
              </span>
              <span className="text-sm font-amsi text-brand-verde-oscuro/60 mt-1 block leading-relaxed">
                {option.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  </div>
);

export default AudienceModal;
