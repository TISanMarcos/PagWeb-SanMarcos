import { motion } from 'framer-motion';
import { partnerBrands } from '../../data/partnerBrands';
import { useContactFlow } from '../../hooks/useContactFlow';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const BrandLogo = ({ brand }) => (
  <div
    className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white border border-brand-beige/80 shadow-soft flex items-center justify-center p-4 mx-3 md:mx-5 transition-transform hover:scale-105"
    title={brand.name}
  >
    <img
      src={brand.src}
      alt={brand.name}
      className="max-w-full max-h-full object-contain"
      loading="lazy"
      onError={(e) => {
        if (brand.fallback && e.target.src !== brand.fallback) {
          e.target.src = brand.fallback;
        }
      }}
    />
  </div>
);

const MarqueeRow = ({ reverse = false }) => {
  const track = [...partnerBrands, ...partnerBrands];

  return (
    <motion.div
      className={`flex w-max pl-6 sm:pl-10 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      aria-hidden
    >
      {track.map((brand, i) => (
        <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
      ))}
    </motion.div>
  );
};

const BrandsMarqueeSection = () => {
  const { startContactFlow } = useContactFlow();

  return (
  <section id="marcas" className="section-pad section-alt overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Las marcas que tenemos para ti
      </motion.h2>
    </div>

    <div className="relative space-y-6 md:space-y-8 px-6 sm:px-10 md:px-16 overflow-hidden">
      <motion.div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-brand-neutral to-transparent z-10 pointer-events-none" />
      <motion.div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-brand-neutral to-transparent z-10 pointer-events-none" />

      <MarqueeRow />
      <MarqueeRow reverse />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center mt-10"
    >
      <button
        type="button"
        onClick={() => startContactFlow('cotizar', { source: 'seccion-marcas' })}
        className="btn-primary inline-flex items-center gap-2 text-sm md:text-base px-8"
      >
        <WhatsAppIcon className="w-5 h-5" />
        Cotizar surtido por WhatsApp
      </button>
    </motion.div>
  </section>
  );
};

export default BrandsMarqueeSection;
