import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useContactFlow } from '../../hooks/useContactFlow';
import BusinessLeadForm from './BusinessLeadForm';

const BusinessLeadModal = ({ onClose }) => {
  const pendingContact = useAppStore((s) => s.pendingContact);
  const source = pendingContact?.source ?? 'cotizar-negocio';
  const { backToAudience } = useContactFlow();

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-verde-oscuro/60 backdrop-blur-sm border-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-brand-crema rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-brand-beige"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-verde-oscuro/50 hover:text-brand-naranja"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {pendingContact && (
          <button
            type="button"
            onClick={backToAudience}
            className="flex items-center gap-1 text-sm font-amsi font-semibold text-brand-verde-oscuro/60 hover:text-brand-naranja mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        )}

        <h2 className="text-xl font-collier font-bold text-brand-verde-oscuro mb-1 pr-8">
          Cuéntanos sobre tu negocio
        </h2>
        <p className="text-sm font-amsi text-brand-verde-oscuro/70 mb-6">
          Elige tu tipo de negocio, responde 3 preguntas y te abriremos WhatsApp con tu mensaje listo.
        </p>

        <BusinessLeadForm source={source} onSuccess={onClose} />
      </motion.div>
    </div>
  );
};

export default BusinessLeadModal;
