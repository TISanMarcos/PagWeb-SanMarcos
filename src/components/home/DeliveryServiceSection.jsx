import { motion } from 'framer-motion';
import {
  CalendarDays,
  MapPinned,
  Clock,
  Zap,
  CreditCard,
  Package,
} from 'lucide-react';
import DeliveryFleetMark from '../DeliveryFleetMark';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContactFlow } from '../../hooks/useContactFlow';

const deliveryBenefits = [
  {
    icon: CalendarDays,
    title: 'Entregas toda la semana',
    description: 'Repartimos de lunes a sábado, para que surtas cuando lo necesites.',
  },
  {
    icon: MapPinned,
    title: 'Cobertura amplia',
    description: 'Llegamos a toda la CDMX y zona metropolitana, directo a tu negocio.',
  },
  {
    icon: Clock,
    title: 'Horario de entregas',
    description: 'Te llevamos tu pedido de 8:00 am a 4:30 pm, en el horario que te conviene.',
  },
  {
    icon: Zap,
    title: 'Entrega el mismo día',
    description:
      '¿Lo necesitas hoy? Confirma tu pago antes de las 2:00 pm y te lo entregamos ese mismo día.',
    accent: true,
  },
  {
    icon: CreditCard,
    title: 'Facilidades de pago',
    description: 'Paga cómodo por transferencia o depósito en OXXO, sin complicaciones.',
  },
  {
    icon: Package,
    title: 'Capacidad por viaje',
    description:
      'Entregamos pedidos de gran volumen, organizando los viajes según el peso total de tu compra.',
  },
];

const DeliveryServiceSection = () => {
  const { startContactFlow } = useContactFlow();

  return (
    <section id="servicio-a-domicilio" className="section-pad section-surface scroll-mt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12 mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 max-w-3xl">
            <DeliveryFleetMark className="mx-auto sm:mx-0" />
            <div className="text-center sm:text-left">
              <p className="text-brand-naranja font-amsi font-black uppercase tracking-[0.2em] text-xs sm:text-sm mb-2">
                San Marcos a tu puerta
              </p>
              <h2 className="section-title mb-3">Servicio a domicilio</h2>
              <p className="section-lead text-brand-verde-oscuro/70">
                Surte tu negocio sin salir: llevamos tu pedido con la confianza del Sello San Marcos,
                cuando lo necesitas y donde lo necesitas.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center justify-center shrink-0"
          >
            <div className="rounded-2xl bg-brand-verde-oscuro text-white px-6 py-5 max-w-xs shadow-premium border border-brand-verde-oscuro/20">
              <p className="font-collier font-bold text-lg leading-snug mb-2">
                Tu mercancía, en camino
              </p>
              <p className="font-amsi text-sm text-white/80 leading-relaxed">
                Miles de negocios ya reciben sus pedidos con nosotros. Tú también puedes.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {deliveryBenefits.map(({ icon: Icon, title, description, accent }, idx) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-5 md:p-6 border shadow-sm transition-all h-full flex flex-col ${
                accent
                  ? 'bg-brand-naranja/10 border-brand-naranja/30 hover:border-brand-naranja/50 hover:shadow-md'
                  : 'bg-brand-crema border-brand-beige/80 hover:border-brand-naranja/35 hover:shadow-md'
              }`}
            >
              <div
                className={`shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 ${
                  accent ? 'bg-brand-naranja text-white' : 'bg-brand-verde-oscuro text-brand-verde-claro'
                }`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-collier font-bold text-lg text-brand-verde-oscuro mb-2 leading-snug">
                {title}
              </h3>
              <p className="font-amsi text-sm md:text-[0.9375rem] text-brand-verde-oscuro/70 leading-relaxed flex-1">
                {description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-12 text-center"
        >
          <p className="font-amsi text-brand-verde-oscuro/65 text-sm md:text-base mb-5 max-w-xl mx-auto">
            ¿Listo para recibir tu pedido? Escríbenos y coordinamos tu entrega.
          </p>
          <button
            type="button"
            onClick={() => startContactFlow('cotizar', { source: 'servicio-a-domicilio' })}
            className="inline-flex items-center gap-2 btn-primary text-sm md:text-base py-3 px-7"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Solicita tu entrega
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DeliveryServiceSection;
