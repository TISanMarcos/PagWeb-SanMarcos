import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

const heroBanners = [`${base}banner_heroe.png`, `${base}banner_heroe2.png`];

const ROTATE_MS = 5000;

const pawDecor = [
  { top: '8%', left: '6%', size: 28, rotate: -18, opacity: 0.12 },
  { top: '18%', left: '22%', size: 20, rotate: 12, opacity: 0.1 },
  { top: '12%', right: '12%', size: 32, rotate: 24, opacity: 0.14 },
  { top: '28%', right: '28%', size: 22, rotate: -8, opacity: 0.1 },
  { bottom: '22%', left: '14%', size: 26, rotate: 15, opacity: 0.11 },
  { bottom: '16%', right: '8%', size: 24, rotate: -22, opacity: 0.12 },
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
    <section
      id="inicio"
      className="relative min-h-[400px] sm:min-h-[420px] max-h-[460px] flex items-center overflow-hidden scroll-mt-[72px] bg-brand-verde-oscuro"
      aria-roledescription="carrusel"
      aria-label="Banners principales"
    >
      <div className="absolute inset-0" aria-hidden>
        {heroBanners.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${src}')` }}
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-verde-oscuro/90 via-brand-verde-oscuro/55 to-transparent md:via-brand-verde-oscuro/35 pointer-events-none"
        aria-hidden
      />

      {pawDecor.map((paw, i) => (
        <PawPrint
          key={i}
          className="absolute text-brand-verde-claro pointer-events-none hidden sm:block z-[1]"
          style={{
            top: paw.top,
            left: paw.left,
            right: paw.right,
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        role="tablist"
        aria-label="Seleccionar banner"
      >
        {heroBanners.map((src, i) => (
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      >
        <div className="max-w-xl md:max-w-2xl text-left">
          <div className="mb-4 w-fit max-w-full">
            <p
              className="text-2xl sm:text-3xl md:text-4xl font-collier font-bold text-white leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
              aria-label="Venta a Mayoreo"
            >
              Venta a{' '}
              <span className="text-brand-verde-claro">Mayoreo</span>
            </p>
            <span
              className="mt-2 block h-1 w-full max-w-[240px] sm:max-w-[280px] rounded-full bg-gradient-to-r from-brand-naranja via-brand-verde-claro to-brand-naranja/80"
              aria-hidden
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-collier font-bold text-white leading-[1.08] mb-3">
            Tenemos el producto que tu{' '}
            <span className="text-brand-verde-claro">negocio y mascota</span> necesitan
          </h1>

          <p className="text-base md:text-lg text-white/90 font-amsi font-semibold max-w-md">
            Surte tu negocio en minutos
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
