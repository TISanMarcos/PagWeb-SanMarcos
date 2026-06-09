import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, X } from 'lucide-react';

const OPTIONS = [
  {
    id: 'business',
    emoji: '🏪',
    label: 'Tengo un negocio',
    description: 'Surto tienda, clínica, abarrotes o revendo productos para mascotas.',
    hint: 'Promos de mayoreo y beneficios B2B',
  },
  {
    id: 'retail',
    emoji: '🐾',
    label: 'Soy dueño de mascota',
    description: 'Busco ofertas para alimentar y consentir a mi perro o gato en casa.',
    hint: 'Promos retail y cupones para consumidor',
  },
];

const PromotionsAudienceGate = ({ onSelect, onCancel }) => (
  <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 sm:p-6">
    <motion.button
      type="button"
      className="absolute inset-0 bg-brand-verde-oscuro/70 backdrop-blur-sm"
      onClick={onCancel}
      aria-label="Volver al inicio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />

    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promotions-audience-title"
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      className="relative bg-brand-crema rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 border border-brand-beige overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-naranja/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-verde-claro/20 rounded-full blur-2xl pointer-events-none" />

      <button
        type="button"
        onClick={onCancel}
        className="absolute top-4 right-4 p-2 text-brand-verde-oscuro/50 hover:text-brand-naranja transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="inline-flex items-center gap-2 bg-brand-naranja/10 text-brand-naranja px-3 py-1.5 rounded-full text-xs font-amsi font-bold uppercase tracking-wider mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        Promociones San Marcos
      </div>

      <h2 id="promotions-audience-title" className="text-2xl md:text-3xl font-collier font-bold text-brand-verde-oscuro mb-2 pr-8 leading-tight">
        ¿Para quién buscas ofertas?
      </h2>
      <p className="text-sm md:text-base font-amsi text-brand-verde-oscuro/70 mb-6 leading-relaxed">
        Cuéntanos un poquito y te mostramos las promos que van contigo. Solo toma un segundo.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {OPTIONS.map((option, index) => (
          <motion.button
            key={option.id}
            type="button"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + index * 0.06 }}
            onClick={() => onSelect(option.id)}
            className="text-left p-5 rounded-2xl border-2 border-brand-beige bg-white hover:border-brand-naranja hover:shadow-md transition-all group flex gap-4 items-start"
          >
            <span className="text-3xl flex-shrink-0" aria-hidden>
              {option.emoji}
            </span>
            <span className="min-w-0">
              <span className="font-collier font-bold text-brand-verde-oscuro block group-hover:text-brand-naranja text-lg">
                {option.label}
              </span>
              <span className="text-sm font-amsi text-brand-verde-oscuro/60 mt-1 block leading-relaxed">
                {option.description}
              </span>
              <span className="text-[11px] font-amsi font-bold text-brand-naranja/80 mt-2 block uppercase tracking-wide">
                {option.hint}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="mt-5 inline-flex items-center gap-2 text-sm font-amsi font-semibold text-brand-verde-oscuro/55 hover:text-brand-naranja transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </button>
    </motion.div>
  </div>
);

export default PromotionsAudienceGate;
