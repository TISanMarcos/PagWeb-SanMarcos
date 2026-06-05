import { motion } from 'framer-motion';
import { LayoutGrid, UserPlus } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContactFlow } from '../../hooks/useContactFlow';
import { featureFlags } from '../../constants/featureFlags';

const allActions = [
  {
    label: 'Cotizar',
    icon: WhatsAppIcon,
    action: 'cotizar',
    sub: '1 clic · WhatsApp',
    accent: 'bg-brand-naranja',
    enabled: true,
  },
  {
    label: 'Catálogo',
    icon: LayoutGrid,
    action: 'catalogo',
    sub: 'Ver precios',
    accent: 'bg-brand-verde-oscuro',
    enabled: featureFlags.catalog,
  },
  {
    label: 'Registro',
    icon: UserPlus,
    action: 'registro',
    sub: 'Acceso negocio',
    accent: 'bg-brand-verde-claro text-brand-verde-oscuro',
    enabled: featureFlags.catalogFormSection,
  },
];

const QuickActionsSection = () => {
  const { startContactFlow } = useContactFlow();
  const actions = allActions.filter(({ enabled }) => enabled);
  const gridCols =
    actions.length >= 3 ? 'grid-cols-3' : actions.length === 2 ? 'grid-cols-2' : 'grid-cols-1';

  const containerWidth = actions.length === 1 ? 'max-w-sm' : 'max-w-[50.5rem]';

  return (
    <section className="relative z-20 -mt-4 sm:-mt-5 md:-mt-6 px-4 sm:px-6 lg:px-8 pb-3 sm:pb-5">
      <div className={`${containerWidth} mx-auto grid ${gridCols} gap-2 sm:gap-2.5 md:gap-4`}>
        {actions.map(({ icon: Icon, label, sub, action, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <button
              type="button"
              onClick={() => startContactFlow(action, { source: 'hero-botones' })}
              className={`group w-full flex flex-col items-center justify-center text-center rounded-xl md:rounded-2xl p-2.5 sm:p-3.5 md:p-5 shadow-premium border border-brand-beige/60 transition-all hover:-translate-y-1 min-h-[88px] sm:min-h-[100px] md:min-h-[112px] ${accent} ${accent.includes('verde-claro') ? '' : 'text-white'}`}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1.5 md:mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-collier font-bold text-xs md:text-base leading-none">{label}</span>
              <span className={`font-amsi text-[9px] md:text-[11px] mt-0.5 md:mt-1 ${accent.includes('verde-claro') ? 'text-brand-verde-oscuro/70' : 'text-white/80'}`}>
                {sub}
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickActionsSection;
