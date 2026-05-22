import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

const heroBg = `${import.meta.env.BASE_URL}hero-banner.png`;

const pawDecor = [
  { top: '8%', left: '6%', size: 28, rotate: -18, opacity: 0.12 },
  { top: '18%', left: '22%', size: 20, rotate: 12, opacity: 0.1 },
  { top: '12%', right: '12%', size: 32, rotate: 24, opacity: 0.14 },
  { top: '28%', right: '28%', size: 22, rotate: -8, opacity: 0.1 },
  { bottom: '22%', left: '14%', size: 26, rotate: 15, opacity: 0.11 },
  { bottom: '16%', right: '8%', size: 24, rotate: -22, opacity: 0.12 },
];

const HeroSection = () => (
  <section
    id="inicio"
    className="relative min-h-[400px] sm:min-h-[420px] max-h-[460px] flex items-center overflow-hidden scroll-mt-[72px] bg-brand-verde-oscuro"
  >
    {/* Fondo verde con patrón de huellas y perrito (asset de marca) */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-cover bg-left md:bg-[length:auto_88%] md:bg-[position:left_center] bg-no-repeat"
      style={{ backgroundImage: `url('${heroBg}')` }}
      aria-hidden
    />

    {/* Capa suave para legibilidad del texto a la derecha */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-brand-verde-oscuro/20 via-brand-verde-oscuro/55 to-brand-verde-oscuro/85 md:via-brand-verde-oscuro/35 md:to-brand-verde-oscuro/70"
      aria-hidden
    />

    {/* Huellas decorativas extra (sutil) */}
    {pawDecor.map((paw, i) => (
      <PawPrint
        key={i}
        className="absolute text-brand-verde-claro pointer-events-none hidden sm:block"
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

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <div className="ml-auto max-w-xl md:max-w-2xl text-left md:text-right">
        <div className="mb-4 md:ml-auto w-fit max-w-full">
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-collier font-bold text-white leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            aria-label="Venta a Mayoreo"
          >
            Venta a{' '}
            <span className="text-brand-verde-claro">Mayoreo</span>
          </p>
          <span
            className="mt-2 block h-1 w-full max-w-[240px] sm:max-w-[280px] md:ml-auto rounded-full bg-gradient-to-r from-brand-naranja via-brand-verde-claro to-brand-naranja/80"
            aria-hidden
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-collier font-bold text-white leading-[1.08] mb-3">
          Vende mejor.<br />
          <span className="text-brand-verde-claro">Compra mejor.</span>
        </h1>

        <p className="text-base md:text-lg text-white/90 font-amsi font-semibold max-w-md md:ml-auto">
          Surte tu negocio en minutos
        </p>
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
