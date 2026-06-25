import { motion } from 'framer-motion';
import { Clock, Package, Headphones, Motorbike } from 'lucide-react';
import { useContactFlow } from '../../hooks/useContactFlow';
import { scrollToSection } from '../../utils/scrollToSection';

const pillars = [
  {
    icon: Clock,
    title: 'Compra en minutos',
    highlight: true,
    description: 'Cotiza por WhatsApp y confirma tu pedido el mismo día.',
    color: 'bg-brand-naranja',
    text: 'text-white',
    titleText: '!text-white',
    muted: 'text-white/85',
    action: 'cotizar',
    ariaLabel: 'Cotizar por WhatsApp en minutos',
  },
  {
    icon: Package,
    title: 'Respaldo de Marcas',
    description: 'Marcas reconocidas y categorías completas para surtir tu negocio.',
    color: 'bg-brand-verde-oscuro',
    text: 'text-white',
    titleText: '!text-white',
    muted: 'text-white/80',
    action: 'section',
    sectionId: 'marcas',
    ariaLabel: 'Ver las marcas que manejamos',
  },
  {
    icon: Headphones,
    title: 'Atención personalizada',
    description: 'Un asesor conoce tu negocio y te ayuda a elegir lo que más vende.',
    color: 'bg-brand-verde-claro',
    text: 'text-brand-verde-oscuro',
    titleText: '!text-brand-verde-oscuro',
    muted: 'text-brand-verde-oscuro/75',
    action: 'section',
    sectionId: 'sucursal',
    ariaLabel: 'Ver horarios y ubicación de la sucursal',
  },
  {
    icon: Motorbike,
    title: 'Entregas Rápidas',
    highlight: true,
    description: 'Recibe tu mercancía en tu negocio, con entregas programadas.',
    color: 'bg-brand-verde-oscuro',
    text: 'text-white',
    titleText: '!text-white',
    muted: 'text-white/80',
    action: 'section',
    sectionId: 'servicio-a-domicilio',
    ariaLabel: 'Conocer el servicio a domicilio',
  },
];

const BenefitsSection = () => {
  const { startContactFlow } = useContactFlow();

  const handlePillarClick = (pillar) => {
    if (pillar.action === 'cotizar') {
      startContactFlow('cotizar', { source: 'beneficios-compra-minutos' });
      return;
    }
    if (pillar.action === 'section' && pillar.sectionId) {
      scrollToSection(pillar.sectionId);
    }
  };

  return (
    <section id="beneficios" className="section-pad section-surface aurora-surface aurora-surface--light grain-overlay grain-overlay--sand relative overflow-hidden pt-10 md:pt-12">
      <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="section-title">
            Si comprar te cuesta tiempo,
            <span className="text-brand-naranja block">te cuesta negocio.</span>
          </h2>
          <p className="section-lead text-brand-verde-oscuro/70 mt-4 md:mt-5">
            Compra rápido, surtido completo, trato directo y entrega a domicilio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-10 md:mt-12"
        >
          {pillars.map(
            ({ icon: Icon, title, highlight, description, color, text, titleText, muted, action, ariaLabel, sectionId }, i) => (
              <motion.button
                key={title}
                type="button"
                aria-label={ariaLabel}
                onClick={() => handlePillarClick({ action, sectionId })}
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className={`${color} ${text} rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-premium flex flex-col items-center text-center h-full transition-shadow hover:shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-naranja focus-visible:ring-offset-2 ${
                  action === 'pending' ? 'active:scale-[0.98]' : ''
                }`}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 opacity-95" strokeWidth={1.75} />
                </div>
                <h3
                  className={`font-collier font-bold text-xl md:text-2xl leading-snug mb-2 w-full ${titleText} ${
                    highlight
                      ? 'underline decoration-2 underline-offset-4 decoration-current font-bold'
                      : ''
                  }`}
                >
                  {title}
                </h3>
                <p className={`font-amsi text-sm md:text-[0.9375rem] leading-relaxed ${muted}`}>{description}</p>
              </motion.button>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
