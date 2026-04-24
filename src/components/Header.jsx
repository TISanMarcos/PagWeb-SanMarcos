import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ShoppingCart, User, LogOut, PawPrint } from 'lucide-react';

const Header = () => {
  const { user, role, cart, logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getBrandLogo = () => {
    if (role === 'b2b') return 'El Parián B2B';
    return 'Zona.Pet';
  };
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              {/* The structural image logo */}
              <img 
                src="/logo.png" 
                alt="Zona.Pet Logo" 
                className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fb = document.getElementById('fallback-text-logo');
                  if(fb) fb.style.display = 'flex';
                }}
              />
              {/* Fallback code in case the image hasn't been added yet */}
              <div id="fallback-text-logo" className="hidden items-center gap-2">
                <PawPrint className="w-8 h-8 text-brand-terracota group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xl font-comfortaa font-bold text-gray-900 leading-none">Zona.Pet</span>
                  <span className="text-xs text-gray-500 font-nunito leading-none mt-1">
                    {role === 'b2b' ? 'El Parián' : 'San Marcos'}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-terracota font-semibold transition-colors">
              Inicio
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-terracota font-semibold transition-colors">
              Nosotros
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-brand-terracota font-semibold transition-colors">
              Catálogo
            </Link>
            <Link to="/promotions" className="text-gray-700 hover:text-brand-terracota font-semibold transition-colors">
              Promociones
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 text-gray-700 hover:text-brand-terracota transition-colors"
              onClick={() => navigate('/catalog')} // ToDo: open cart drawer
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-crimson rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={role === 'admin' ? '/admin' : '/dashboard'} 
                  className="text-gray-700 hover:text-brand-azul transition-colors flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-semibold">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn-primary py-1.5 px-4 text-sm">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
