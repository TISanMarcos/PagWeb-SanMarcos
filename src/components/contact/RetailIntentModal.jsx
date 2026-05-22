import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const RetailIntentModal = ({ onClose, onContinue, defaultIntent = '' }) => {
  const [intent, setIntent] = useState(defaultIntent);

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.button
        type="button"
        className="absolute inset-0 bg-brand-verde-oscuro/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-brand-crema rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 border border-brand-beige"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-verde-oscuro/50 hover:text-brand-naranja"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-collier font-bold text-brand-verde-oscuro mb-2">¿Qué necesitas?</h2>
        <p className="text-sm font-amsi text-brand-verde-oscuro/70 mb-4">
          Lo incluiremos en tu mensaje de WhatsApp para agilizar tu pedido.
        </p>

        <input
          type="text"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="Ej. croquetas para perro adulto, 15 kg"
          className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm mb-4"
        />

        <button
          type="button"
          onClick={() => onContinue(intent)}
          className="w-full bg-brand-naranja hover:bg-brand-naranja-hover text-white py-3.5 rounded-xl font-collier font-bold flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Continuar a WhatsApp
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RetailIntentModal;
