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
import SealMark from '../SealMark';

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
  <section id="el-sello-san-marcos" className="section-alt pb-10 md:pb-12 pt-0">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-b-2xl border border-t-0 border-brand-beige/90 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 sm:px-7 pt-5 pb-4 border-b border-brand-beige/80">
          <SealMark />
          <div className="text-center sm:text-left min-w-0">
            <h2 className="font-collier font-bold text-brand-verde-oscuro text-2xl sm:text-3xl mb-1.5 leading-tight">
              El Sello San Marcos
            </h2>
            <p className="font-amsi text-brand-verde-oscuro/65 text-sm sm:text-base leading-relaxed">
              Lo que nos distingue cuando surtes con nosotros: calidad, servicio y respaldo en cada pedido.
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-7 py-4 sm:py-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map(({ icon: Icon, title }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ y: -2 }}
                className="bg-brand-crema rounded-xl p-4 sm:p-5 border border-brand-beige/80 hover:border-brand-naranja/35 shadow-sm transition-all flex items-center gap-3"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-verde-oscuro flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-verde-claro" strokeWidth={1.75} />
                </div>
                <h3 className="font-collier font-bold text-sm sm:text-base text-brand-verde-oscuro leading-snug">
                  {title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default AdditionalServicesSection;
