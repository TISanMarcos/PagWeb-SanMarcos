import { Link } from 'react-router-dom';
import ScrollNavLink from './ScrollNavLink';
import { featureFlags } from '../constants/featureFlags';

const Footer = () => (
  <footer className="bg-brand-verde-oscuro text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <nav className="flex flex-wrap gap-4 justify-center text-sm font-amsi text-white/60 mb-8">
        <ScrollNavLink sectionId="inicio" className="hover:text-white transition-colors">
          Inicio
        </ScrollNavLink>
        <ScrollNavLink sectionId="beneficios" className="hover:text-white transition-colors">
          Beneficios
        </ScrollNavLink>
        <ScrollNavLink sectionId="nosotros" className="hover:text-white transition-colors">
          Nosotros
        </ScrollNavLink>
        {featureFlags.catalog && (
          <Link to="/catalog" className="hover:text-white transition-colors">
            Catálogo
          </Link>
        )}
        <Link to="/promotions" className="hover:text-white transition-colors">
          Promociones
        </Link>
      </nav>

      <div className="relative border-t border-white/10 pt-6 min-h-[4.5rem] sm:min-h-[3rem]">
        <p className="font-collier font-semibold text-brand-verde-claro text-base sm:text-lg text-center sm:absolute sm:left-1/2 sm:top-6 sm:-translate-x-1/2 sm:whitespace-nowrap">
          Bienestar animal, compromiso familiar!
        </p>
        <p className="text-sm font-amsi text-white/60 text-right mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-6">
          © {new Date().getFullYear()} San Marcos Mascotas. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
