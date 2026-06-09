import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { whatsAppUrl, COTIZA_MESSAGE } from '../../constants/whatsapp';
import { BRANCH, BRANCH_HOURS, BRANCH_MAP_ICONS } from '../../constants/branch';

const stats = [
  { value: '+1,000', label: 'clientes atendidos' },
  { value: '+2,500', label: 'Productos' },
  { value: 'Atención Inmediata', label: 'vía WhatsApp' },
];

const BranchSection = () => (
  <section id="sucursal" className="section-pad bg-brand-verde-oscuro text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-collier font-bold mb-5">Nuestra sucursal</h2>

          <div className="space-y-6 font-amsi text-white/85">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-verde-claro flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1 font-collier">Dirección</strong>
                <p>{BRANCH.addressLine1}</p>
                <p className="text-sm text-white/60 mt-1">{BRANCH.addressLine2}</p>
                <p className="text-sm text-white/70 mt-2">
                  Tel.{' '}
                  <a
                    href={whatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-verde-claro hover:text-white underline-offset-2 hover:underline"
                  >
                    {BRANCH.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-verde-claro flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <strong className="text-white block mb-3 font-collier">Horario</strong>
                <ul className="space-y-1.5 text-sm sm:text-base">
                  {BRANCH_HOURS.map(({ day, hours, closed }) => (
                    <li
                      key={day}
                      className={`flex justify-between gap-4 border-b border-white/10 pb-1.5 last:border-0 last:pb-0 ${
                        closed ? 'text-white/50' : ''
                      }`}
                    >
                      <span className="font-semibold text-white/90 shrink-0">{day}</span>
                      <span className="text-right">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-xl mx-auto lg:max-w-none flex flex-col items-center"
        >
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-premium aspect-[4/3] min-h-[260px] bg-white/5">
            <iframe
              title={`Mapa — ${BRANCH.name}`}
              src={BRANCH.mapEmbedUrl}
              className="absolute top-1/2 left-1/2 w-[118%] h-[118%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-auto"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-6 w-full flex-wrap">
            <a
              href={whatsAppUrl(COTIZA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="inline-flex items-center justify-center px-5 py-3.5 min-h-[3.5rem] bg-[#25D366] rounded-2xl shadow-md hover:shadow-lg hover:brightness-110 hover:scale-[1.04] transition-all"
            >
              <img
                src={BRANCH_MAP_ICONS.whatsapp}
                alt=""
                className="h-10 sm:h-11 w-10 sm:w-11 shrink-0 object-contain"
              />
            </a>
            <a
              href={BRANCH.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir en Google Maps"
              className="inline-flex items-center justify-center px-5 py-3.5 bg-white rounded-2xl shadow-md hover:shadow-lg hover:bg-brand-beige hover:scale-[1.04] transition-all"
            >
              <img
                src={BRANCH_MAP_ICONS.googleMaps}
                alt=""
                className="h-10 sm:h-11 w-auto max-w-[8.5rem] shrink-0 object-contain"
              />
            </a>
            <a
              href={BRANCH.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir en Waze"
              className="inline-flex items-center justify-center px-5 py-3.5 min-h-[3.5rem] bg-[#33CCFF] rounded-2xl shadow-md hover:shadow-lg hover:brightness-110 hover:scale-[1.04] transition-all"
            >
              <img
                src={BRANCH_MAP_ICONS.waze}
                alt=""
                className="h-10 sm:h-11 w-auto max-w-[5rem] shrink-0 object-contain"
              />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-white/10"
      >
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-collier font-black text-brand-verde-claro leading-tight">
              {value}
            </p>
            <p className="text-sm font-amsi text-white/70 mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default BranchSection;
