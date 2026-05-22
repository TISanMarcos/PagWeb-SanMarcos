import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollNavLink from './ScrollNavLink';
import { whatsAppUrl } from '../constants/whatsapp';

const Footer = () => {
  const [workForm, setWorkForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleWorkSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola, me interesa trabajar con San Marcos.\nNombre: ${workForm.nombre}\nEmail: ${workForm.email}\nMensaje: ${workForm.mensaje}`;
    window.open(whatsAppUrl(msg), '_blank');
  };

  return (
    <footer id="trabaja-con-nosotros" className="bg-brand-verde-oscuro text-white scroll-mt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}logo_sanmarcos.png`}
              alt="San Marcos"
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <h3 className="font-collier font-bold text-xl md:text-2xl mb-4">Trabaja con nosotros</h3>
            <p className="font-amsi text-white/70 mb-6 max-w-md">
              ¿Te apasionan las mascotas y el comercio? Cuéntanos sobre ti y nos pondremos en contacto.
            </p>
          </div>

          <motion.form
            onSubmit={handleWorkSubmit}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nombre"
              required
              value={workForm.nombre}
              onChange={(e) => setWorkForm({ ...workForm, nombre: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 font-amsi text-sm focus:outline-none focus:ring-2 focus:ring-brand-verde-claro focus:border-brand-verde-claro"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={workForm.email}
              onChange={(e) => setWorkForm({ ...workForm, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 font-amsi text-sm focus:outline-none focus:ring-2 focus:ring-brand-verde-claro focus:border-brand-verde-claro"
            />
            <textarea
              placeholder="Cuéntanos sobre ti"
              rows={3}
              required
              value={workForm.mensaje}
              onChange={(e) => setWorkForm({ ...workForm, mensaje: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 font-amsi text-sm focus:outline-none focus:ring-2 focus:ring-brand-verde-claro resize-none"
            />
            <button
              type="submit"
              className="w-full bg-brand-naranja hover:bg-brand-naranja-hover text-white py-3 rounded-xl font-bold font-collier transition-colors"
            >
              Enviar solicitud
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center justify-center text-center p-10 mb-12"
          style={{
            backgroundImage: `linear-gradient(rgba(0,48,34,0.85), rgba(0,48,34,0.85)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-collier font-bold mb-2">Vende mejor. Compra mejor.</h3>
            <p className="font-amsi text-white/80 mb-6">Mayoreo B2B · San Marcos Mascotas</p>
            <a
              href={whatsAppUrl('¡Hola San Marcos! Quiero más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-brand-naranja text-white px-6 py-3 rounded-full font-bold font-collier hover:scale-105 transition-transform"
            >
              Cotiza por WhatsApp
            </a>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-sm font-amsi text-white/60">
          <nav className="flex flex-wrap gap-4 justify-center">
            <ScrollNavLink sectionId="inicio" className="hover:text-white transition-colors">Inicio</ScrollNavLink>
            <ScrollNavLink sectionId="beneficios" className="hover:text-white transition-colors">Beneficios</ScrollNavLink>
            <ScrollNavLink sectionId="nosotros" className="hover:text-white transition-colors">Nosotros</ScrollNavLink>
            <ScrollNavLink sectionId="comunidad" className="hover:text-white transition-colors">Comunidad</ScrollNavLink>
            <Link to="/catalog" className="hover:text-white transition-colors">Catálogo</Link>
            <Link to="/promotions" className="hover:text-white transition-colors">Promociones</Link>
          </nav>
          <p>© {new Date().getFullYear()} San Marcos Mascotas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
