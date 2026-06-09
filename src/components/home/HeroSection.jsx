import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import SealMark from '../SealMark';

const base = import.meta.env.BASE_URL;

const BANNER_WIDTH = 1723;
const BANNER_HEIGHT = 608;

const heroBanners = [
  { src: `${base}banner_heroe.png`, alt: 'San Marcos Mascotas — venta a mayoreo' },
  { src: `${base}banner_heroe2.png`, alt: 'San Marcos Mascotas — productos para mascotas' },
];

const patternBg = `${base}fondo-mascotas-pattern.png`;

const ROTATE_MS = 5000;

const pawDecor = [
  { top: '12%', left: '4%', size: 24, rotate: -18, opacity: 0.12 },
  { top: '20%', right: '6%', size: 28, rotate: 24, opacity: 0.14 },
  { bottom: '18%', left: '8%', size: 22, rotate: 15, opacity: 0.11 },
  { bottom: '14%', right: '5%', size: 20, rotate: -22, opacity: 0.12 },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroBanners.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative scroll-mt-[72px] bg-brand-verde-oscuro" aria-roledescription="carrusel" aria-label="Banners principales">
      <div className="relative w-full bg-brand-verde-oscuro">
        <div className="relative w-full aspect-[1723/608] overflow-hidden">
            {heroBanners.map(({ src, alt }, i) => (
              <motion.img
                key={src}
                src={src}
                alt={alt}
                width={BANNER_WIDTH}
                height={BANNER_HEIGHT}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
                initial={false}
                animate={{ opacity: i === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            ))}

            <div
              className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-gradient-to-t from-brand-verde-oscuro/70 to-transparent pointer-events-none"
              aria-hidden
            />

            {pawDecor.map((paw, i) => (
              <PawPrint
                key={i}
                className="absolute text-brand-verde-claro pointer-events-none hidden md:block z-[1]"
                style={{
                  top: paw.top,
                  left: paw.left,
                  right: paw.right,
                  bottom: paw.bottom,
                  width: paw.size,
                  height: paw.size,
                  opacity: paw.opacity,
                  transform: `rotate(${paw.rotate}deg)`,
                }}
                strokeWidth={1.5}
                aria-hidden
              />
            ))}

            <div
              className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
              role="tablist"
              aria-label="Seleccionar banner"
            >
              {heroBanners.map(({ src }, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Banner ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.38] bg-repeat bg-center"
          style={{
            backgroundImage: `url('${patternBg}')`,
            backgroundSize: '280px auto',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-brand-verde-oscuro/82" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-verde-oscuro/90 via-brand-verde-oscuro/75 to-brand-verde-oscuro/85" aria-hidden />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="max-w-xl md:max-w-2xl text-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              <div className="mb-3 sm:mb-4 w-fit max-w-full">
                <p
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-collier font-bold text-white leading-[1.1] tracking-tight"
                  aria-label="Venta a Mayoreo"
                >
                  Venta a <span className="text-brand-verde-claro">Mayoreo</span>
                </p>
                <span
                  className="mt-2 block h-1 w-full max-w-[200px] sm:max-w-[280px] rounded-full bg-gradient-to-r from-brand-naranja via-brand-verde-claro to-brand-naranja/80"
                  aria-hidden
                />
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-collier font-bold text-white leading-[1.12] mb-2 sm:mb-3">
                Tenemos el producto que tu{' '}
                <span className="text-brand-verde-claro">negocio y mascota</span> necesitan
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/90 font-amsi font-semibold max-w-md">
                Surte tu negocio en minutos
              </p>
            </div>

            <div className="flex justify-center md:justify-end shrink-0">
              <SealMark enlarged />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
