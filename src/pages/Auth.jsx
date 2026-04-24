import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { mockGoogleLogin } from '../services/authService';

const Auth = () => {
  const navigate = useNavigate();
  const { type } = useParams(); // 'b2c' or 'b2b' for registration, defaults to login if empty
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAppStore();

  const isB2bRegistration = type === 'b2b';
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app we'd trigger Google Sign-In pop-up
    // Here we simulate it with an email input to decide role
    const role = email === 'admin@sanmarcos.com' ? 'admin' 
               : isB2bRegistration ? 'b2b' 
               : 'b2c';

    try {
      const user = await mockGoogleLogin(email, role);
      login(user);
      
      if (user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full card-premium p-8 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-verde-claro-oscuro font-collier">
            {isB2bRegistration 
              ? 'Únete a El Parián (B2B)' 
              : type === 'b2c' 
                ? 'Regístrate en San Marcos' 
                : 'ZONA.PET - Iniciar Sesión'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-amsi">
            Simulador de Login - Ingresa cualquier email
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-naranja focus:border-brand-naranja focus:z-10 sm:text-sm"
                placeholder="tu@correo.com (escribe admin@sanmarcos.com para admin)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-naranja hover:bg-brand-naranja focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-naranja btn-pill transition-colors"
            >
              {loading ? 'Cargando...' : 'Autenticar con Correo'}
            </button>
          </div>
        </form>

        {!type && (
          <div className="mt-6 flex flex-col gap-2 text-sm text-center font-amsi">
            <p className="text-gray-500">¿No tienes cuenta?</p>
            <a href="/auth/b2c" className="text-brand-naranja hover:underline font-bold">Registro Clientes (San Marcos)</a>
            <a href="/auth/b2b" className="text-brand-verde-claro hover:underline font-bold">Registro Distribuidores (El Parián)</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
