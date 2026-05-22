import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import ScrollNavLink from './ScrollNavLink';
import UserProfileBadge from './contact/UserProfileBadge';
import { useContactFlow } from '../hooks/useContactFlow';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Inicio', sectionId: 'inicio', type: 'scroll' },
  { label: 'Marcas', sectionId: 'marcas', type: 'scroll' },
  { label: 'Productos', sectionId: 'productos', type: 'scroll' },
  { label: 'Nosotros', sectionId: 'nosotros', type: 'scroll' },
  { label: 'Comunidad', sectionId: 'comunidad', type: 'scroll' },
  { label: 'Catálogo', to: '/catalog', type: 'route' },
  { label: 'Promociones', to: '/promotions', type: 'route' },
];

const Header = () => {
  const { user, role, cart, logout } = useAppStore();
  const { startContactFlow } = useContactFlow();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  const navLinkClass = (active = false) =>
    `font-semibold transition-colors ${
      active ? 'text-brand-naranja' : 'text-brand-verde-oscuro/80 hover:text-brand-naranja'
    }`;

  return (
    <header className="fixed w-full z-50 bg-brand-crema/95 backdrop-blur-md shadow-sm border-b border-brand-beige/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={closeMobile}>
            <img
              src={`${import.meta.env.BASE_URL}logo_sanmarcos.png`}
              alt="San Marcos Logo"
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) =>
              item.type === 'scroll' ? (
                <ScrollNavLink
                  key={item.sectionId}
                  sectionId={item.sectionId}
                  className={navLinkClass()}
                  onClick={closeMobile}
                >
                  {item.label}
                </ScrollNavLink>
              ) : item.to === '/catalog' ? (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => startContactFlow('catalogo', { source: 'header' })}
                  className={navLinkClass(location.pathname === item.to)}
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.to} to={item.to} className={navLinkClass(location.pathname === item.to)}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <UserProfileBadge />
            <button
              type="button"
              className="relative p-2 text-brand-verde-oscuro/80 hover:text-brand-naranja transition-colors"
              onClick={() => startContactFlow('catalogo', { source: 'carrito-header' })}
              aria-label="Ver carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-naranja rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to={role === 'admin' ? '/admin' : '/dashboard'}
                  className="text-brand-verde-oscuro/80 hover:text-brand-verde-oscuro transition-colors flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-semibold max-w-[100px] truncate">{user.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-brand-verde-oscuro/50 hover:text-red-500 transition-colors"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:inline-flex btn-primary py-1.5 px-4 text-sm">
                Iniciar Sesión
              </Link>
            )}

            <button
              type="button"
              className="lg:hidden p-2 text-brand-verde-oscuro/80"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-brand-beige bg-brand-crema px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) =>
            item.type === 'scroll' ? (
              <ScrollNavLink
                key={item.sectionId}
                sectionId={item.sectionId}
                className="py-2 font-semibold text-brand-verde-oscuro"
                onClick={closeMobile}
              >
                {item.label}
              </ScrollNavLink>
            ) : item.to === '/catalog' ? (
              <button
                key={item.to}
                type="button"
                className="py-2 font-semibold text-brand-verde-oscuro text-left w-full"
                onClick={() => {
                  closeMobile();
                  startContactFlow('catalogo', { source: 'header-mobile' });
                }}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="py-2 font-semibold text-brand-verde-oscuro"
                onClick={closeMobile}
              >
                {item.label}
              </Link>
            )
          )}
          {!user && (
            <Link to="/auth" className="btn-primary text-center py-2 mt-2" onClick={closeMobile}>
              Iniciar Sesión
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
