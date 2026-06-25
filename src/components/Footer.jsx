import { Link } from 'react-router-dom';
import ScrollNavLink from './ScrollNavLink';
import SocialLinks from './SocialLinks';
import { featureFlags } from '../constants/featureFlags';

const Footer = () => (
  <footer className="aurora-surface grain-overlay grain-overlay--fine relative bg-brand-verde-oscuro text-white">
    <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <SocialLinks className="mb-8" size="sm" />

      <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-sm font-amsi text-white/60 mb-8">
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
        <Link to="/promociones" className="hover:text-white transition-colors">
          Promociones
        </Link>
        <Link to="/aviso-de-privacidad" className="hover:text-white transition-colors">
          Aviso de Privacidad
        </Link>
      </nav>

      <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-3 text-center">
        <p className="font-collier font-semibold text-brand-verde-claro text-base sm:text-lg">
          Bienestar animal, compromiso familiar!
        </p>
        <p className="text-sm font-amsi text-white/60 max-w-prose">
          © {new Date().getFullYear()} San Marcos Mascotas. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
