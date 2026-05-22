import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ChangeProfileModal = ({ currentLabel, onCancel, onConfirm }) => (
  <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.button
      type="button"
      className="absolute inset-0 bg-brand-verde-oscuro/60 backdrop-blur-sm"
      onClick={onCancel}
      aria-label="Cancelar"
    />
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-brand-beige"
    >
      <div className="flex items-center gap-3 text-brand-naranja mb-4">
        <AlertTriangle className="w-8 h-8 flex-shrink-0" />
        <h2 className="text-lg font-collier font-bold text-brand-verde-oscuro">Cambiar tipo de cliente</h2>
      </div>
      <p className="text-sm font-amsi text-brand-verde-oscuro/80 mb-6 leading-relaxed">
        Actualmente estás como <strong>{currentLabel}</strong>. Si cambias, volveremos a preguntarte cómo quieres comprar y
        podríamos mostrarte otro catálogo o formulario.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-brand-beige font-amsi font-bold text-brand-verde-oscuro"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 py-3 rounded-xl bg-brand-verde-oscuro text-white font-collier font-bold"
        >
          Sí, cambiar
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default ChangeProfileModal;
