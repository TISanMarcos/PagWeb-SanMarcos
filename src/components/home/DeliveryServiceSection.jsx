import { motion } from 'framer-motion';
import {
  CalendarDays,
  MapPinned,
  Clock,
  Zap,
  CreditCard,
  Package,
  Route,
} from 'lucide-react';
import DeliveryFleetMark from '../DeliveryFleetMark';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContactFlow } from '../../hooks/useContactFlow';

const deliveryHighlights = [
  { icon: CalendarDays, title: 'Entregas lunes a sábado' },
  { icon: MapPinned, title: 'CDMX y zona metropolitana' },
  { icon: Clock, title: 'Horario de 8:00 am a 4:30 pm' },
  { icon: Zap, title: '¿Urgente? Entrega el mismo día' },
  { icon: CreditCard, title: 'Pago por transferencia u OXXO' },
  { icon: Package, title: 'Pedidos de gran volumen' },
  { icon: Route, title: 'Llevamos tu pedido hasta tu zona' },
];

const DeliveryServiceSection = () => {
  const { startContactFlow } = useContactFlow();

  return (
    <section id="servicio-a-domicilio" className="section-alt pt-0 pb-10 md:pb-12 scroll-mt-[72px]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-b-3xl border border-t border-[rgba(0,48,32,0.06)] bg-white shadow-[0_1px_2px_rgba(0,48,32,0.05),0_16px_44px_-18px_rgba(0,48,32,0.18)] overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 sm:px-7 pt-5 pb-4 border-b border-brand-beige/80">
            <DeliveryFleetMark className="mx-auto sm:mx-0 shrink-0" />
            <div className="text-center sm:text-left min-w-0">
              <p className="text-brand-naranja font-amsi font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-1.5">
                San Marcos a tu puerta
              </p>
              <h2 className="font-collier font-bold text-brand-verde-oscuro text-2xl sm:text-3xl mb-1.5 leading-tight">
                Servicio a domicilio
              </h2>
              <p className="font-amsi text-brand-verde-oscuro/65 text-sm sm:text-base leading-relaxed">
                Surte sin salir de tu negocio: te llevamos el pedido con la confianza de San Marcos,
                en el horario que te conviene y con opciones de pago fáciles.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-7 py-4 sm:py-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {deliveryHighlights.map(({ icon: Icon, title }, idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="bg-brand-crema rounded-2xl p-4 sm:p-5 border border-[rgba(0,48,32,0.06)] shadow-[0_1px_2px_rgba(0,48,32,0.04),0_8px_22px_-14px_rgba(0,48,32,0.14)] hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,48,32,0.05),0_18px_38px_-18px_rgba(240,96,32,0.22)] transition-all flex items-center gap-3"
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

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-8 pt-6 border-t border-brand-beige/80 text-center"
            >
              <p className="font-amsi text-brand-verde-oscuro/65 text-sm sm:text-base mb-4 max-w-lg mx-auto leading-relaxed">
                Si confirmas tu pago antes de las 2:00 pm, podemos entregarte el mismo día.
                Escríbenos y coordinamos tu envío.
              </p>
              <button
                type="button"
                onClick={() => startContactFlow('cotizar', { source: 'servicio-a-domicilio' })}
                className="inline-flex items-center gap-2 btn-primary text-sm py-2.5 px-6"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Solicita tu entrega
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DeliveryServiceSection;
