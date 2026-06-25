import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import WhatsAppFab from './components/WhatsAppFab';
import ContactFlowManager from './components/contact/ContactFlowManager';
import PageMeta from './components/seo/PageMeta';
import JsonLd from './components/seo/JsonLd';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import Privacy from './pages/Privacy';
import { SECTION_ROUTES } from './constants/seo';

function App() {
  return (
    <BrowserRouter>
      <PageMeta />
      <JsonLd />
      <div className="min-h-screen flex flex-col bg-brand-crema overflow-x-hidden">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            {SECTION_ROUTES.map(({ path }) => (
              <Route key={path} path={path} element={<Home />} />
            ))}
            <Route path="/promociones" element={<Promotions />} />
            <Route path="/promotions" element={<Navigate to="/promociones" replace />} />
            <Route path="/aviso-de-privacidad" element={<Privacy />} />
            <Route path="/about" element={<Navigate to="/nosotros" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <WhatsAppFab />
        <ContactFlowManager />
      </div>
    </BrowserRouter>
  );
}

export default App;
