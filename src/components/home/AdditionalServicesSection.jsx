import { motion } from 'framer-motion';
import {
  UserCheck,
  LayoutGrid,
  Award,
  BadgePercent,
  Truck,
  SmilePlus,
  CreditCard,
} from 'lucide-react';

const services = [
  { icon: UserCheck, title: 'Atención personalizada' },
  { icon: LayoutGrid, title: 'Variedad en producto' },
  { icon: Award, title: 'Experiencia en el mercado' },
  { icon: BadgePercent, title: 'Precios competitivos' },
  { icon: Truck, title: 'Entrega a domicilio' },
  { icon: SmilePlus, title: 'Satisfacción al cliente' },
  { icon: CreditCard, title: 'Facilidad de pago' },
];

const AdditionalServicesSection = () => (
  <section id="servicios-adicionales" className="section-pad bg-brand-crema">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="section-title text-center mb-8 md:mb-10">
        Servicios adicionales
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map(({ icon: Icon, title }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-brand-beige/80 hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-verde-oscuro flex items-center justify-center">
              <Icon className="w-6 h-6 text-brand-verde-claro" strokeWidth={1.75} />
            </div>
            <h3 className="font-collier font-bold text-base md:text-lg text-brand-verde-oscuro pt-2 leading-snug">
              {title}
            </h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default AdditionalServicesSection;
