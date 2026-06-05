import { motion } from 'framer-motion';
import { HeartHandshake, Users, Stethoscope } from 'lucide-react';

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
  <section id="nosotros" className="section-pad section-surface">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-1">
        <h2 className="section-title mb-4">Nuestra Historia y Compromiso</h2>
        <p className="font-amsi text-brand-verde-oscuro/75 text-lg leading-relaxed">
          San Marcos Mascotas nació, desde 1984, como un negocio familiar especializado en la distribución de
          alimento para mascotas y productos pecuarios. A lo largo de los años, ha consolidado su reputación gracias
          a la variedad de productos, la rapidez en las entregas y la atención personalizada. Actualmente, atiende a
          más de 2,000 clientes, incluyendo mayoristas, tiendas de mascotas y veterinarios.
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
            Establecidos desde 1984 en el mercado de la Merced y con más de 30 años de experiencia ininterrumpida
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
          <div className="rounded-3xl overflow-hidden border border-brand-beige shadow-sm aspect-video bg-brand-neutral">
            <img
              src={`${import.meta.env.BASE_URL}local.webp`}
              alt="Local San Marcos Mascotas — Central de Abasto, Ciudad de México"
              className="w-full h-full object-cover object-center"
              width={1024}
              height={576}
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-center text-sm font-amsi text-brand-verde-oscuro/50">
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
            className="text-center p-6 rounded-2xl bg-white border border-brand-beige/80 shadow-sm"
          >
            <Icon className="w-8 h-8 text-brand-naranja mx-auto mb-3" aria-hidden />
            <p className="text-2xl md:text-3xl font-collier font-black text-brand-verde-oscuro">{value}</p>
            <p className="text-sm font-amsi text-brand-verde-oscuro/65 mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default AboutSection;
