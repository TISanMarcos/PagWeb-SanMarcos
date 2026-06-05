import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPromotions } from '../services/authService';
import PromoImage from '../components/PromoImage';
import { isPromotionPhoto } from '../utils/promotionImage';
import { Gift, Timer, Copy, CheckCircle, ShieldCheck, Truck, Star, Tag, Award } from 'lucide-react';
import { featureFlags } from '../constants/featureFlags';
import { useAppStore } from '../store/useAppStore';
import { isRetailUser } from '../constants/userTypes';
import PromotionsAudienceGate from '../components/promotions/PromotionsAudienceGate';
import {
  audienceLabel,
  audienceToSegment,
  clearPromotionsAudience,
  getPromotionsAudience,
  setPromotionsAudience,
} from '../utils/promotionsAudience';

const resolveInitialAudience = (userProfile) => {
  const stored = getPromotionsAudience();
  if (stored) return stored;
  if (userProfile) {
    return isRetailUser(userProfile.typeId) ? 'retail' : 'business';
  }
  return null;
};

const Promotions = () => {
  const navigate = useNavigate();
  const userProfile = useAppStore((s) => s.userProfile);
  const initialAudience = resolveInitialAudience(userProfile);

  const [audience, setAudience] = useState(initialAudience);
  const [showAudienceGate, setShowAudienceGate] = useState(!initialAudience);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(Boolean(initialAudience));
  const [copiedCode, setCopiedCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 59 });
  const [segmentFilter, setSegmentFilter] = useState(
    initialAudience ? audienceToSegment(initialAudience) : 'b2c',
  );

  useEffect(() => {
    if (!audience) return undefined;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const data = await fetchPromotions();
        if (!cancelled) {
          setPromotions(data.filter((p) => p.active !== false));
        }
      } catch (err) {
        console.error('Error fetching promos', err);
        if (!cancelled) setPromotions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [audience]);

  useEffect(() => {
    if (!audience) return;
    if (!getPromotionsAudience()) {
      setPromotionsAudience(audience);
    }
  }, [audience]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAudienceSelect = useCallback((selected) => {
    setPromotionsAudience(selected);
    setAudience(selected);
    setSegmentFilter(audienceToSegment(selected));
    setShowAudienceGate(false);
  }, []);

  const handleChangeAudience = useCallback(() => {
    clearPromotionsAudience();
    setAudience(null);
    setShowAudienceGate(true);
  }, []);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  if (showAudienceGate || !audience) {
    return (
      <div className="min-h-screen bg-brand-neutral">
        <PromotionsAudienceGate
          onSelect={handleAudienceSelect}
          onCancel={() => navigate('/')}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-32 text-center font-amsi font-semibold text-brand-verde-claro-oscuro max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
        Cargando ofertas exclusivas...
      </div>
    );
  }

  if (promotions.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh] flex flex-col items-center justify-center">
        <Gift className="w-20 h-20 text-brand-beige mb-6" />
        <h2 className="text-2xl font-collier font-bold text-brand-verde-oscuro/60 mb-2">Sin Promociones Activas</h2>
        <p className="text-brand-verde-oscuro/50 font-amsi text-lg">Nuestros asesores están preparando la siguiente gran oferta.</p>
      </div>
    );
  }

  const visiblePromos =
    segmentFilter === 'all'
      ? promotions
      : promotions.filter((p) => p.segment === segmentFilter || p.segment === 'both');

  const heroPromo = visiblePromos[0];
  const secondaryPromos = visiblePromos.slice(1);
  const isB2B = heroPromo?.segment === 'b2b';

  const segmentTabs = [
    { id: 'all', label: 'Todas', count: promotions.length },
    { id: 'b2c', label: 'Retail', count: promotions.filter((p) => p.segment === 'b2c' || p.segment === 'both').length },
    { id: 'b2b', label: 'Mayoreo', count: promotions.filter((p) => p.segment === 'b2b' || p.segment === 'both').length },
  ];

  if (visiblePromos.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center">
        <Gift className="w-20 h-20 text-brand-beige mb-6" />
        <h2 className="text-2xl font-collier font-bold text-brand-verde-oscuro/60 mb-2">Sin promos en esta categoría</h2>
        <p className="text-brand-verde-oscuro/50 font-amsi text-center mb-6 max-w-md">
          No hay ofertas activas para {audienceLabel(audience).toLowerCase()} en este momento.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button type="button" onClick={() => setSegmentFilter('all')} className="btn-primary text-sm py-2.5 px-5">
            Ver todas las promociones
          </button>
          <button
            type="button"
            onClick={handleChangeAudience}
            className="text-brand-naranja font-amsi font-bold hover:underline py-2.5 px-3"
          >
            Cambiar perfil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-neutral pb-24 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <p className="inline-flex flex-wrap items-center gap-2 bg-white border border-brand-beige rounded-full px-4 py-2.5 text-sm font-amsi text-brand-verde-oscuro/80 shadow-sm">
            <span>
              Promos para{' '}
              <strong className="text-brand-verde-oscuro">{audienceLabel(audience)}</strong>
            </span>
            <button
              type="button"
              onClick={handleChangeAudience}
              className="text-brand-naranja font-bold hover:underline"
            >
              Cambiar
            </button>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
        {segmentTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSegmentFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-amsi font-bold transition-colors ${
              segmentFilter === tab.id
                ? 'bg-brand-verde-oscuro text-white'
                : 'bg-white border border-brand-beige text-brand-verde-oscuro/70 hover:border-brand-naranja'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
        </div>
      </div>

      {/* 
        ========================================
        1. MASTER HERO PROMOTION (High Urgency)
        ========================================
      */}
      <div className={`relative pt-24 pb-32 overflow-hidden shadow-premium ${
        isB2B ? 'bg-brand-gradient' : 'bg-brand-naranja'
      }`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        
        {/* Decorative Background Image / Graphic */}
        <div
          className={`absolute right-[-10%] sm:right-[5%] top-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] overflow-hidden rounded-2xl ${
            isPromotionPhoto(heroPromo.imageUrl) ? 'opacity-40 lg:opacity-60' : 'opacity-30 lg:opacity-50'
          }`}
        >
          <PromoImage src={heroPromo.imageUrl} alt={heroPromo.title} variant="hero" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Top Badge */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white shadow-lg mb-8">
            <Star className="w-4 h-4 fill-current text-brand-naranja" />
            <span className="font-bold text-xs uppercase tracking-[0.2em]">Oferta Estrella del Mes</span>
          </motion.div>

          <motion.h1 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-6xl sm:text-7xl lg:text-8xl font-collier font-black text-white mb-6 tracking-tighter leading-none max-w-4xl drop-shadow-md">
            {heroPromo.title}
          </motion.h1>

          <motion.p initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl sm:text-2xl text-white/90 font-amsi mb-12 max-w-2xl leading-relaxed font-semibold">
            {heroPromo.description}
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl">
            {/* Offer Timer */}
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-black/30 backdrop-blur border border-white/10 rounded-2xl p-4 flex-1 w-full text-center shadow-inner">
              <div className="flex items-center justify-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                <Timer className="w-4 h-4" /> Termina En
              </div>
              <div className="flex items-center justify-center gap-3 text-white font-mono text-3xl sm:text-4xl font-black">
                <div>{String(timeLeft.hours).padStart(2, '0')}<span className="text-sm block mt-1 font-amsi uppercase tracking-widest text-white/50">HRS</span></div>
                <div className="text-white/30 -mt-6">:</div>
                <div>{String(timeLeft.minutes).padStart(2, '0')}<span className="text-sm block mt-1 font-amsi uppercase tracking-widest text-white/50">MIN</span></div>
                <div className="text-white/30 -mt-6">:</div>
                <div className="text-brand-naranja">{String(timeLeft.seconds).padStart(2, '0')}<span className="text-sm block mt-1 font-amsi uppercase tracking-widest text-white/50">SEG</span></div>
              </div>
            </motion.div>

            {/* Click to Copy Coupon */}
            {heroPromo.couponCode && (
              <motion.button 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}
                onClick={() => handleCopyCode(heroPromo.couponCode)}
                className="group relative flex-1 w-full h-[104px] bg-brand-beige rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center cursor-pointer border-4 border-brand-naranja/50"
              >
                <div className="absolute -left-4 w-8 h-8 rounded-full bg-black/20" />
                <div className="absolute -right-4 w-8 h-8 rounded-full bg-black/20" />
                <div className="border-t-2 border-b-2 border-dashed border-brand-naranja/30 px-6 py-2 flex flex-col items-center">
                  <span className="text-brand-verde-oscuro text-[10px] font-black uppercase tracking-[0.2em] mb-1">CÓDIGO DE CUPÓN</span>
                  <span className="text-2xl sm:text-3xl font-black text-brand-naranja font-collier tracking-wider">
                    {copiedCode === heroPromo.couponCode ? '¡COPIADO!' : heroPromo.couponCode}
                  </span>
                </div>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* 
        ========================================
        2. TRUST BAND (Guarantee bar)
        ========================================
      */}
      <div className="bg-white border-b border-brand-beige/80 shadow-sm relative z-20 -mt-6 lg:-mt-10 mx-4 sm:mx-6 lg:mx-auto max-w-[1440px] w-[calc(100%-2rem)] rounded-2xl p-6 sm:px-12 flex flex-wrap gap-8 justify-between items-center text-brand-verde-oscuro/70">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-verde-claro/20 text-brand-verde-oscuro flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
          <div><h4 className="font-bold font-collier text-brand-verde-oscuro leading-tight">Pagos Seguros</h4><p className="text-sm font-amsi">Cifrado de grado bancario</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-beige text-brand-naranja flex items-center justify-center"><Truck className="w-6 h-6" /></div>
          <div><h4 className="font-bold font-collier text-brand-verde-oscuro leading-tight">Envíos Rápidos</h4><p className="text-sm font-amsi">A todo el territorio</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-verde-claro/25 text-brand-verde-claro-oscuro flex items-center justify-center"><Award className="w-6 h-6" /></div>
          <div><h4 className="font-bold font-collier text-brand-verde-oscuro leading-tight">Calidad Elite</h4><p className="text-sm font-amsi">Aprobado por criadores</p></div>
        </div>
      </div>

      {/* 
        ========================================
        3. SECONDARY OFFERS GRID
        ========================================
      */}
      {secondaryPromos.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-collier font-black text-brand-verde-oscuro">Más Ofertas Especiales</h2>
            <div className="flex-1 h-px bg-brand-beige" />
            <span className="text-sm font-bold text-brand-verde-oscuro/50 uppercase tracking-widest font-amsi">
              {visiblePromos.length} activas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {secondaryPromos.map((promo, idx) => (
              <motion.div 
                key={promo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(45,30,82,0.1)] transition-all duration-300 border border-transparent hover:border-brand-beige"
              >
                {/* Image Space */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden flex-shrink-0 bg-brand-crema">
                  <PromoImage src={promo.imageUrl} alt={promo.title} variant="card" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Tag className={`w-3.5 h-3.5 ${promo.segment === 'b2b' ? 'text-brand-verde-claro-oscuro' : 'text-brand-naranja'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-verde-oscuro">
                      {promo.segment === 'b2b' ? 'MAYOREO' : 'REGULAR'}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-collier font-bold text-brand-verde-oscuro mb-2 leading-tight group-hover:text-brand-naranja transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-brand-verde-oscuro/60 font-amsi text-sm leading-relaxed mb-6">
                    {promo.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    {promo.couponCode ? (
                      <button 
                        onClick={() => handleCopyCode(promo.couponCode)}
                        className={`flex-1 flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                          copiedCode === promo.couponCode 
                            ? 'bg-brand-verde-claro/15 border-brand-verde-claro/40 text-brand-verde-oscuro' 
                            : 'border-brand-beige text-brand-verde-oscuro/70 hover:border-brand-naranja hover:text-brand-naranja hover:bg-brand-beige/50'
                        }`}
                      >
                        {copiedCode === promo.couponCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedCode === promo.couponCode ? 'Copiado' : promo.couponCode}
                      </button>
                    ) : featureFlags.catalog ? (
                       <a href="/catalog" className="flex-1 text-center bg-brand-neutral hover:bg-brand-beige text-brand-verde-oscuro font-bold font-amsi py-3 rounded-xl transition-colors">
                         Ir al Catálogo
                       </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;
