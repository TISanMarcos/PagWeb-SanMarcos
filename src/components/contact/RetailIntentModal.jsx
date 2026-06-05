import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const RetailIntentModal = ({
  onClose,
  onContinue,
  defaultIntent = '',
  defaultPetName = '',
  action = 'cotizar',
  showIntent = true,
}) => {
  const [petName, setPetName] = useState(defaultPetName);
  const [intent, setIntent] = useState(defaultIntent);
  const [error, setError] = useState('');

  const isCatalog = action === 'catalogo';
  const buttonLabel = isCatalog ? 'Continuar al catálogo' : 'Continuar a WhatsApp';

  const handleContinue = () => {
    const name = petName.trim();
    if (!name) {
      setError('Escribe el nombre de tu mascota.');
      return;
    }
    if (showIntent && !isCatalog && !intent.trim() && !defaultIntent.trim()) {
      setError('Cuéntanos qué estás buscando.');
      return;
    }
    setError('');
    onContinue({ petName: name, intent: intent.trim() });
  };

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
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-collier font-bold text-brand-verde-oscuro mb-2 pr-8">
          Cuéntanos de tu mascota
        </h2>
        <p className="text-sm font-amsi text-brand-verde-oscuro/70 mb-5">
          Así personalizamos tu mensaje para que te atiendan más rápido.
        </p>

        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="retail-pet-name" className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
              ¿Cómo se llama tu mascota?
            </label>
            <input
              id="retail-pet-name"
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Ej. Luna, Max, Michi..."
              className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm"
              autoFocus
            />
          </div>

          {showIntent && !isCatalog && (
            <div>
              <label htmlFor="retail-intent" className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
                ¿Qué estás buscando?
              </label>
              <input
                id="retail-intent"
                type="text"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="Ej. costal de croquetas para perro adulto, 15 kg"
                className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm"
              />
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-600 font-amsi mb-3">{error}</p>}

        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-brand-naranja hover:bg-brand-naranja-hover text-white py-3.5 rounded-xl font-collier font-bold flex items-center justify-center gap-2"
        >
          {!isCatalog && <WhatsAppIcon className="w-5 h-5" />}
          {buttonLabel}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RetailIntentModal;
