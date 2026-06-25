import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SealMark from '../SealMark';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContactFlow } from '../../hooks/useContactFlow';

const base = import.meta.env.BASE_URL;

const heroBanners = [
  {
    id: 'banner-1',
    src: `${base}banner_principal_1.jpg`,
    width: 1920,
    height: 1065,
    alt: 'San Marcos Mascotas — surtimos tu negocio, veterinaria o tendero con envíos a domicilio',
  },
  {
    id: 'banner-2',
    src: `${base}banner_principal_2.jpg`,
    width: 1920,
    height: 1071,
    alt: 'San Marcos Mascotas — 40 años de experiencia, atención personalizada y agilidad de servicio',
  },
  {
    id: 'banner-3',
    src: `${base}banner_principal_3.jpg`,
    width: 1920,
    height: 997,
    alt: 'San Marcos Mascotas — productos de alta calidad para perros, gatos, aves y animales pecuarios',
  },
];

const ROTATE_MS = 5500;

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { startContactFlow } = useContactFlow();

  useEffect(() => {
    heroBanners.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroBanners.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (i) => setActiveIndex(i);

  return (
    <section id="inicio" className="relative scroll-mt-[72px]" aria-roledescription="carrusel" aria-label="Banners principales">
      <div className="hero-carousel relative w-full overflow-hidden">
        {heroBanners.map(({ id, src, width, height, alt }, i) => (
          <motion.img
            key={id}
            src={src}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
        ))}

        <div
          className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"
          role="tablist"
          aria-label="Seleccionar banner"
        >
          {heroBanners.map(({ id }, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Banner ${i + 1}`}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === activeIndex ? 'w-8 bg-white shadow-sm' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="hero-green-overlap relative w-full z-10 bg-brand-verde-oscuro"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 md:pt-7 pb-8 sm:pb-10 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="max-w-xl md:max-w-2xl text-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              <div className="mb-3 sm:mb-4 w-fit max-w-full">
                <p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-collier font-bold text-white leading-[1.1] tracking-tight"
                  aria-label="Venta a Mayoreo"
                >
                  Venta a <span className="text-brand-verde-claro">Mayoreo</span>
                </p>
                <span
                  className="hero-accent-line mt-2 block h-1 w-full max-w-[200px] sm:max-w-[280px] rounded-full"
                  aria-hidden
                />
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.6rem] font-collier font-bold text-white leading-[1.12] mb-2 sm:mb-3">
                Tenemos el producto que tu{' '}
                <span className="text-brand-verde-claro">negocio y mascota</span> necesitan
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/90 font-amsi font-semibold max-w-md">
                Surte tu negocio en minutos
              </p>

              <button
                type="button"
                onClick={() => startContactFlow('cotizar', { source: 'hero-mobile' })}
                className="md:hidden mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-primary py-3 px-6 text-sm font-bold shadow-brand"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Cotizar por WhatsApp
              </button>
            </div>

            <div className="flex justify-center md:justify-end shrink-0 relative z-20">
              <SealMark
                enlarged
                className="lg:w-[11rem] lg:h-[11rem] md:-translate-y-3 lg:-translate-y-6 drop-shadow-[0_14px_30px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
