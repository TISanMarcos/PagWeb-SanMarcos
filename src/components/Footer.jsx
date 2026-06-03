import { Link } from 'react-router-dom';
import ScrollNavLink from './ScrollNavLink';

const Footer = () => (
  <footer className="bg-brand-verde-oscuro text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-amsi text-white/60">
        <nav className="flex flex-wrap gap-4 justify-center">
          <ScrollNavLink sectionId="inicio" className="hover:text-white transition-colors">
            Inicio
          </ScrollNavLink>
          <ScrollNavLink sectionId="beneficios" className="hover:text-white transition-colors">
            Beneficios
          </ScrollNavLink>
          <ScrollNavLink sectionId="nosotros" className="hover:text-white transition-colors">
            Nosotros
          </ScrollNavLink>
          <Link to="/catalog" className="hover:text-white transition-colors">
            Catálogo
          </Link>
          <Link to="/promotions" className="hover:text-white transition-colors">
            Promociones
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} San Marcos Mascotas. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
