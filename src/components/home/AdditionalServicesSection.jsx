import { useId } from 'react';
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

const LOGO = `${import.meta.env.BASE_URL}logo_sanmarcos.png`;

const services = [
  { icon: UserCheck, title: 'Atención personalizada' },
  { icon: LayoutGrid, title: 'Variedad en producto' },
  { icon: Award, title: 'Experiencia en el mercado' },
  { icon: BadgePercent, title: 'Precios competitivos' },
  { icon: Truck, title: 'Entrega a domicilio' },
  { icon: SmilePlus, title: 'Satisfacción al cliente' },
  { icon: CreditCard, title: 'Facilidad de pago' },
];

const SealMark = ({ className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const topArc = `seal-top-${uid}`;
  const bottomArc = `seal-bottom-${uid}`;

  const box = 'w-28 h-28 sm:w-32 sm:h-32';
  const logo = 'w-16 sm:w-[4.25rem]';

  return (
    <div className={`relative shrink-0 ${box} ${className}`} aria-hidden>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full text-brand-verde-oscuro/35`}
      >
        <defs>
          <path id={topArc} d="M 36 100 A 64 64 0 0 1 164 100" fill="none" />
          <path id={bottomArc} d="M 164 100 A 64 64 0 0 1 36 100" fill="none" />
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <text fill="currentColor" fontSize="9.5" letterSpacing="0.22em" fontWeight="600">
          <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
            EL SELLO SAN MARCOS
          </textPath>
        </text>
        <text fill="currentColor" fontSize="8" letterSpacing="0.18em" opacity="0.85">
          <textPath href={`#${bottomArc}`} startOffset="50%" textAnchor="middle">
            CALIDAD · CONFIANZA · DESDE 1984
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative -rotate-6 rounded-full bg-brand-verde-oscuro p-2 shadow-[0_6px_20px_-6px_rgba(26,77,46,0.35)] ring-[3px] ring-brand-naranja/25 ring-offset-2 ring-offset-white"
        >
          <div className="rounded-full bg-black flex items-center justify-center p-1.5 sm:p-2">
            <img src={LOGO} alt="" className={`${logo} h-auto object-contain`} />
          </div>
        </div>
      </div>
    </div>
  );
};

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
