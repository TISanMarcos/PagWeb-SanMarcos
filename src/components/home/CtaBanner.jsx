import { motion } from 'framer-motion';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContactFlow } from '../../hooks/useContactFlow';

const CtaBanner = () => {
  const { startContactFlow } = useContactFlow();

  return (
    <section className="grain-overlay grain-overlay--fine relative overflow-hidden py-12 md:py-14 bg-brand-naranja">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-collier font-bold text-white mb-4">
          ¿Listo para vender y comprar mejor?
        </h2>
        <p className="font-amsi text-white/90 mb-8">
          Cotiza ahora y un asesor te atiende en minutos.
        </p>
        <button
          type="button"
          onClick={() => startContactFlow('cotizar', { source: 'cta-banner' })}
          className="inline-flex items-center gap-2 bg-white text-brand-naranja px-6 py-3 rounded-full font-bold font-collier text-sm md:text-base hover:scale-105 transition-transform shadow-lg"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Cotiza por WhatsApp
        </button>
      </motion.div>
    </section>
  );
};

export default CtaBanner;
