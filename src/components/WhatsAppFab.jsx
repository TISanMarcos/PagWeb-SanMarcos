import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useContactFlow } from '../hooks/useContactFlow';

const WhatsAppFab = () => {
  const { pathname } = useLocation();
  const { startContactFlow } = useContactFlow();
  const isHome = pathname === '/' || pathname === '';

  if (isHome) return null;

  return (
    <motion.button
      type="button"
      onClick={() => startContactFlow('cotizar', { source: 'fab-flotante' })}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-brand-naranja hover:bg-brand-naranja-hover text-white pl-4 pr-5 py-3.5 rounded-full shadow-brand font-collier font-bold text-sm md:text-base"
      aria-label="Cotizar por WhatsApp"
    >
      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white/20" />
      <span className="hidden sm:inline">Cotizar</span>
    </motion.button>
  );
};

export default WhatsAppFab;
