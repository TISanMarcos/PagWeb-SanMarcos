import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const COPY = {
  business: {
    title: '¡Gracias!',
    body: 'Te abrimos WhatsApp con tu consulta. Envía el mensaje y nuestro equipo te atenderá en breve.',
  },
  retail: {
    title: '¡Gracias!',
    body: 'Te abrimos WhatsApp con tu consulta. Envía el mensaje y en breve te atenderemos.',
  },
};

const ThankYouModal = ({ variant = 'business', onClose }) => {
  const { title, body } = COPY[variant] ?? COPY.business;

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-verde-oscuro/60 backdrop-blur-sm border-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thank-you-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative bg-brand-crema rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 border border-brand-beige text-center"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-verde-oscuro/50 hover:text-brand-naranja"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <CheckCircle className="w-14 h-14 text-brand-verde-claro mx-auto mb-4" aria-hidden />
        <h2 id="thank-you-title" className="text-2xl font-collier font-bold text-brand-verde-oscuro mb-3 pr-6">
          {title}
        </h2>
        <p className="font-amsi text-brand-verde-oscuro/75 text-sm leading-relaxed mb-6">{body}</p>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-brand-naranja text-white py-3 rounded-xl font-bold font-collier hover:bg-brand-naranja-hover transition-colors"
        >
          Entendido
        </button>
      </motion.div>
    </div>
  );
};

export default ThankYouModal;
