import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Users, Stethoscope } from 'lucide-react';

const base = import.meta.env.BASE_URL;

const galleryImages = [
  {
    src: `${base}local.webp`,
    alt: 'Local San Marcos Mascotas en Central de Abasto',
  },
  {
    src: `${base}central_abastos.jpeg`,
    alt: 'Vista de Central de Abasto, Ciudad de México',
  },
  {
    src: `${base}historia-mercado-la-merced.png`,
    alt: 'Mercado de la Merced, Ciudad de México — fotografía histórica',
  },
  {
    src: `${base}historia-central-abasto-dc.png`,
    alt: 'Central de Abasto sección D-C, Ciudad de México al atardecer',
  },
];

const GALLERY_ROTATE_MS = 5500;

const AboutGalleryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, GALLERY_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-brand-beige shadow-sm aspect-video bg-brand-neutral"
      aria-roledescription="carrusel"
      aria-label="Galería Central de Abasto"
    >
      {galleryImages.map(({ src, alt }, i) => (
        <motion.img
          key={src}
          src={src}
          alt={alt}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={false}
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      ))}

      <div
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        role="tablist"
        aria-label="Seleccionar imagen"
      >
        {galleryImages.map(({ src, alt }, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={alt}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? 'w-8 bg-brand-naranja' : 'w-2 bg-brand-verde-oscuro/35 hover:bg-brand-verde-oscuro/55'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const highlights = [
  {
    icon: Users,
    value: '+2,000',
    label: 'clientes atendidos',
  },
  {
    icon: HeartHandshake,
    value: '1984',
    label: 'negocio familiar',
  },
  {
    icon: Stethoscope,
    value: 'Gratis',
    label: 'asesoría veterinaria',
  },
];

const AboutSection = () => (
  <section id="nosotros" className="section-pad section-surface aurora-surface aurora-surface--light grain-overlay grain-overlay--sand relative overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-1">
        <h2 className="section-title mb-4">Nuestra Historia y Compromiso</h2>
        <p className="font-amsi text-brand-verde-oscuro/75 text-lg leading-relaxed">
          San Marcos Mascotas nació en 1984 en el Mercado de la Merced como un negocio familiar
          especializado en la distribución de alimento para mascotas y productos pecuarios. Hoy
          operamos desde la Central de Abasto en Iztapalapa, CDMX, con más de 40 años de experiencia,
          variedad de productos, rapidez en entregas y atención personalizada para más de 2,000 clientes
          mayoristas, tiendas de mascotas y veterinarios.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-5 font-amsi text-brand-verde-oscuro/80 leading-relaxed"
        >
          <h3 className="font-collier font-bold text-2xl text-brand-verde-oscuro">Nuestra Historia</h3>
          <p>
            Nacimos en 1984 en el Mercado de la Merced y, con el crecimiento del negocio, hoy operamos
            desde la Central de Abasto en Iztapalapa. Con más de 40 años de experiencia ininterrumpida
            dentro del giro, hemos generado sinergia con nuestros clientes, proveedores y socios comerciales,
            ayudando a crecer y fortalecer cada uno de los negocios a los cuales nos hemos hecho partícipes.
          </p>
          <p>
            Siendo distribuidores y aliados comerciales de las marcas más reconocidas en la rama, brindamos la más
            amplia variedad de alimento para mascotas, granos, semillas y productos pecuarios, atendiendo a toda el
            área metropolitana y estados aledaños a la Ciudad de México.
          </p>
          <p>
            En San Marcos, estamos comprometidos con la salud y el cuidado animal; gracias a esto, contamos con
            personal experimentado y capacitado en medicina veterinaria, brindando el servicio de asesoría técnica sin
            costo a nuestros clientes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <AboutGalleryCarousel />
          <p className="mt-3 sm:mt-4 text-center text-sm font-amsi text-brand-verde-oscuro/50">
            Central de Abasto, Ciudad de México
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-brand-beige"
      >
        {highlights.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="text-center p-6 rounded-2xl bg-white/85 backdrop-blur-sm border border-[rgba(0,48,32,0.06)] shadow-[0_1px_2px_rgba(0,48,32,0.05),0_10px_28px_-14px_rgba(0,48,32,0.16)] transition-all hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,48,32,0.06),0_22px_44px_-18px_rgba(240,96,32,0.26)]"
          >
            <Icon className="w-8 h-8 text-brand-naranja mx-auto mb-3" aria-hidden />
            <p className="text-2xl md:text-3xl font-collier font-bold text-brand-verde-oscuro">{value}</p>
            <p className="text-sm font-amsi text-brand-verde-oscuro/65 mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default AboutSection;
