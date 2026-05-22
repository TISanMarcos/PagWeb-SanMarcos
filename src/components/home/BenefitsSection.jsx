import { motion } from 'framer-motion';
import { Clock, Package, Headphones, Truck } from 'lucide-react';

const pillars = [
  { icon: Clock, label: 'Rápido', color: 'bg-brand-naranja' },
  { icon: Package, label: 'Surtido', color: 'bg-brand-verde-oscuro' },
  { icon: Headphones, label: '1 a 1', color: 'bg-brand-verde-claro text-brand-verde-oscuro' },
  { icon: Truck, label: 'Entrega', color: 'bg-brand-verde-oscuro' },
];

const BenefitsSection = () => (
  <section id="beneficios" className="section-pad section-surface pt-10 md:pt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title text-center max-w-3xl mx-auto"
      >
        Si comprar te cuesta tiempo,
        <span className="text-brand-naranja block">te cuesta negocio.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-10 md:mt-12"
      >
        {pillars.map(({ icon: Icon, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`${color} rounded-2xl md:rounded-3xl p-5 md:p-7 flex flex-col items-center justify-center aspect-square text-white shadow-premium max-h-[180px] md:max-h-none`}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 opacity-95" strokeWidth={1.5} />
            <span className="font-collier font-bold text-lg md:text-xl">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BenefitsSection;
