import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { BUSINESS_USER_TYPES } from '../../constants/userTypes';

const BusinessTypeModal = ({ onClose, onBack, onSelect }) => (
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
      aria-labelledby="business-type-title"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-brand-crema rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-brand-beige"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-brand-verde-oscuro/50 hover:text-brand-naranja"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-amsi font-semibold text-brand-verde-oscuro/60 hover:text-brand-naranja mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      )}

      <h2 id="business-type-title" className="text-2xl font-collier font-bold text-brand-verde-oscuro mb-2 pr-8">
        ¿Qué tipo de negocio tienes?
      </h2>
      <p className="text-sm font-amsi text-brand-verde-oscuro/70 mb-6">
        Así te mostramos el catálogo mayorista adecuado.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUSINESS_USER_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.id)}
            className="text-left p-4 rounded-2xl border-2 border-brand-beige bg-white hover:border-brand-naranja hover:shadow-md transition-all group"
          >
            <span className="text-2xl mb-2 block" aria-hidden>
              {type.emoji}
            </span>
            <span className="font-collier font-bold text-brand-verde-oscuro block group-hover:text-brand-naranja">
              {type.label}
            </span>
            <span className="text-xs font-amsi text-brand-verde-oscuro/60 mt-1 block">{type.description}</span>
          </button>
        ))}
      </div>
    </motion.div>
  </div>
);

export default BusinessTypeModal;
