import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPromotions } from '../services/authService';
import { useAppStore } from '../store/useAppStore';
import { Gift, Timer, Copy, CheckCircle, ShieldCheck, Truck, Star, Tag, Check, Award } from 'lucide-react';

const Promotions = () => {
  const { role } = useAppStore();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 59 });

  const segment = role || 'b2c';

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromotions();
        const filtered = data.filter(p => p.active && (p.segment === 'both' || p.segment === segment || role === 'admin'));
        setPromotions(filtered);
      } catch (err) {
        console.error("Error fetching promos", err);
      } finally {
        setLoading(false);
      }
    };
    loadPromos();
  }, [segment, role]);

  // Countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code) => {
    if(!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  if (loading) return <div className="p-32 text-center font-amsi font-semibold text-brand-verde-claro-oscuro max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">Cargando ofertas exclusivas...</div>;

  if (promotions.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh] flex flex-col items-center justify-center">
        <Gift className="w-20 h-20 text-gray-200 mb-6" />
        <h2 className="text-2xl font-collier font-bold text-gray-500 mb-2">Sin Promociones Activas</h2>
        <p className="text-gray-400 font-amsi text-lg">Nuestros asesores están preparando la siguiente gran oferta.</p>
      </div>
    );
  }

  const heroPromo = promotions[0];
  const secondaryPromos = promotions.slice(1);
  const isB2B = segment === 'b2b';

  return (
    <div className="bg-[#F8F9FA] pb-24 min-h-screen">
      {/* 
        ========================================
        1. MASTER HERO PROMOTION (High Urgency)
        ========================================
      */}
      <div className={`relative pt-24 pb-32 overflow-hidden shadow-[0_30px_60px_-15px_rgba(45,30,82,0.15)] ${
        isB2B ? 'bg-gradient-to-r from-[#1b1231] to-[#2d1e52]' : 'bg-gradient-to-r from-brand-naranja to-brand-naranja'
      }`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        
        {/* Decorative Background Image / Graphic */}
        <div className="absolute right-[-10%] sm:right-[5%] top-1/2 -translate-y-1/2 opacity-30 lg:opacity-50 pointer-events-none w-[500px] h-[500px]">
          <img src={heroPromo.imageUrl} alt="" className="w-full h-full object-contain filter drop-shadow-2xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Top Badge */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white shadow-lg mb-8">
            <Star className="w-4 h-4 fill-current text-[#FFD700]" />
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
                <div className="text-[#FFD700]">{String(timeLeft.seconds).padStart(2, '0')}<span className="text-sm block mt-1 font-amsi uppercase tracking-widest text-white/50">SEG</span></div>
              </div>
            </motion.div>

            {/* Click to Copy Coupon */}
            {heroPromo.couponCode && (
              <motion.button 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}
                onClick={() => handleCopyCode(heroPromo.couponCode)}
                className="group relative flex-1 w-full h-[104px] bg-[#FFD700] rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center cursor-pointer border-4 border-[#FFD700]/50"
              >
                <div className="absolute -left-4 w-8 h-8 rounded-full bg-black/20" />
                <div className="absolute -right-4 w-8 h-8 rounded-full bg-black/20" />
                <div className="border-t-2 border-b-2 border-dashed border-yellow-600/30 px-6 py-2 flex flex-col items-center">
                  <span className="text-yellow-800 text-[10px] font-black uppercase tracking-[0.2em] mb-1">CÓDIGO DE CUPÓN</span>
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
      <div className="bg-white border-b border-gray-100 shadow-sm relative z-20 -mt-6 lg:-mt-10 mx-4 sm:mx-6 lg:mx-auto max-w-[1440px] w-[calc(100%-2rem)] rounded-2xl p-6 sm:px-12 flex flex-wrap gap-8 justify-between items-center text-gray-600">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
          <div><h4 className="font-bold font-collier text-gray-900 leading-tight">Pagos Seguros</h4><p className="text-sm font-amsi">Cifrado de grado bancario</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"><Truck className="w-6 h-6" /></div>
          <div><h4 className="font-bold font-collier text-gray-900 leading-tight">Envíos Rápidos</h4><p className="text-sm font-amsi">A todo el territorio</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Award className="w-6 h-6" /></div>
          <div><h4 className="font-bold font-collier text-gray-900 leading-tight">Calidad Elite</h4><p className="text-sm font-amsi">Aprobado por criadores</p></div>
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
            <h2 className="text-3xl font-collier font-black text-gray-900">Más Ofertas Especiales</h2>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest font-amsi">{secondaryPromos.length} Activas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {secondaryPromos.map((promo, idx) => (
              <motion.div 
                key={promo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(45,30,82,0.1)] transition-all duration-300 border border-transparent hover:border-gray-200"
              >
                {/* Image Space */}
                <div className={`relative h-48 flex items-center justify-center overflow-hidden flex-shrink-0 bg-gray-50`}>
                  <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Tag className={`w-3.5 h-3.5 ${promo.segment === 'b2b' ? 'text-brand-verde-claro-oscuro' : 'text-brand-naranja'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-800">
                      {promo.segment === 'b2b' ? 'MAYOREO' : 'REGULAR'}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-collier font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand-naranja transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-gray-500 font-amsi text-sm leading-relaxed mb-6">
                    {promo.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    {promo.couponCode ? (
                      <button 
                        onClick={() => handleCopyCode(promo.couponCode)}
                        className={`flex-1 flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                          copiedCode === promo.couponCode 
                            ? 'bg-green-50 border-green-200 text-green-700' 
                            : 'border-gray-200 text-gray-600 hover:border-brand-naranja hover:text-brand-naranja hover:bg-orange-50/50'
                        }`}
                      >
                        {copiedCode === promo.couponCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedCode === promo.couponCode ? 'Copiado' : promo.couponCode}
                      </button>
                    ) : (
                       <a href="/catalog" className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold font-amsi py-3 rounded-xl transition-colors">
                         Ir al Catálogo
                       </a>
                    )}
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
