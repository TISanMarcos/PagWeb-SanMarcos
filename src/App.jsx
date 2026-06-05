import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';

import Header from './components/Header';
import WhatsAppFab from './components/WhatsAppFab';
import ContactFlowManager from './components/contact/ContactFlowManager';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import Catalog from './pages/Catalog';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

const ProtectedRoute = ({ children, roles }) => {
  const { user, role } = useAppStore();
  if (!user) return <Navigate to="/auth" />;
  if (roles && !roles.includes(role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-brand-crema overflow-x-hidden">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Navigate to="/" replace state={{ scrollTo: 'nosotros' }} />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/auth/:type?" element={<Auth />} />
            <Route path="/catalog" element={<Catalog />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['b2c', 'b2b']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <WhatsAppFab />
        <ContactFlowManager />
      </div>
    </HashRouter>
  );
}

export default App;
