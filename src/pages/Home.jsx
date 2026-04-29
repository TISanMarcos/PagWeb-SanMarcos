import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Camera, Tag } from 'lucide-react';
import { fetchPromotions } from '../services/authService';
import { useAppStore } from '../store/useAppStore';

const socialFeed = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800', likes: 342, author: '@max_el_perrito' },
  { id: 2, type: 'video', src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800', likes: 890, author: '@gatafina' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800', likes: 215, author: '@soy_polo' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=800', likes: 124, author: '@michi_club' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800', likes: 967, author: '@pugslife_mx' },
  { id: 6, type: 'video', src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800', likes: 512, author: '@firulais_pro' }
];

const Home = () => {
  const { role } = useAppStore();
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [currentPromoIdx, setCurrentPromoIdx] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 80, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 80, damping: 30 });
  const shiftX = useTransform(mouseX, [-500, 500], [-10, 10]);
  const shiftY = useTransform(mouseY, [-500, 500], [-10, 10]);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromotions();
        const userSegment = role || 'b2c';
        const valid = data.filter(p => p.active && (p.segment === 'both' || p.segment === userSegment || role === 'admin'));
        setPromotions(valid);
      } catch (err) {
        console.error("Promos err", err);
      }
    };
    loadPromos();
  }, [role]);

  useEffect(() => {
    if (promotions.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPromoIdx((prev) => (prev + 1) % promotions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [promotions]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cX = rect.left + rect.width / 2;
    const cY = rect.top + rect.height / 2;
    x.set(e.clientX - cX);
    y.set(e.clientY - cY);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gray-50">
      {/* Hero Banner Section (Natural Width Fit) */}
      <section 
        className="relative w-full bg-brand-verde-oscuro cursor-default overflow-hidden border-b border-white/10"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 bg-brand-verde-oscuro min-h-[400px]" id="hero-fallback">
          <p className="font-collier text-xl mb-4">Reemplaza tu imagen actual por la del perrito como: <b>public/hero-banner.png</b></p>
          <p className="text-sm opacity-70">He quitado los SVG que cortaban tu imagen para que tu diseño de Photoshop fluya perfecto.</p>
        </div>

        <motion.img 
          style={{ x: shiftX, y: shiftY }}
          src={`${import.meta.env.BASE_URL}hero-banner.png`}
          alt="San Marcos Hero" 
          className="w-full h-auto block relative z-10 scale-[1.05]"
          onError={(e) => { e.target.style.display = 'none'; }}
          onLoad={(e) => {
            const fallback = document.getElementById('hero-fallback');
            if(fallback) fallback.style.display = 'none';
          }}
        />

        {/* Visual Promotions Carousel (Top Right) */}
        {promotions.length > 0 && (
          <div className="absolute top-4 md:top-8 right-6 md:right-12 w-[85%] md:w-[45%] lg:w-[40%] h-[35%] lg:h-[40%] z-20 pointer-events-none" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromoIdx}
                onClick={() => navigate('/promotions')}
                initial={{ opacity: 0, rotateX: -15, y: -20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 15, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl pointer-events-auto border border-white/20 group cursor-pointer"
              >
                {/* Background Stock Image Setup */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${promotions[currentPromoIdx].imageUrl})` }} 
                />
                {/* Gradient to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-verde-oscuro via-brand-verde-oscuro/60 to-black/20" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-brand-naranja text-[9px] lg:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      {promotions[currentPromoIdx].segment === 'b2b' ? 'Exclusivo Pymes' : 'Oferta Web'}
                    </span>
                    <Tag className="w-3 h-3 text-white/80" />
                  </div>
                  <h3 className="font-collier font-bold text-base lg:text-xl leading-tight mb-1 drop-shadow-md">
                    {promotions[currentPromoIdx].title}
                  </h3>
                  <p className="font-amsi text-[11px] lg:text-xs text-white/90 line-clamp-2 drop-shadow-sm">
                    {promotions[currentPromoIdx].description}
                  </p>
                </div>

                {/* Loading indicator line */}
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-white/50"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        {/* Dynamic Text Overlay (Bottom Right Pinned constrained) */}
        <div className="absolute bottom-4 md:bottom-10 right-0 w-full md:w-[55%] lg:w-[48%] z-20 flex flex-col justify-end px-6 md:px-12 lg:px-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full flex flex-col items-center text-center md:items-start md:text-left pointer-events-auto"
          >
            <h1 className="text-lg md:text-xl lg:text-2xl font-collier font-bold text-white leading-snug mb-2">
              Todo para <span className="text-brand-verde-claro drop-shadow-sm">consentir</span> a tu <span className="text-brand-naranja drop-shadow-sm">Mascota</span>
            </h1>
            <p className="text-[11px] md:text-xs lg:text-sm font-amsi text-white/80 mb-4 max-w-[260px] md:max-w-xs mx-auto md:mx-0">
              Alimento premium, premios, juguetes y envíos directos hasta tu puerta o negocio.
            </p>
            <Link 
              to="/catalog" 
              className="group inline-flex items-center justify-center gap-2 bg-brand-naranja hover:bg-brand-naranja text-white px-4 py-2 md:px-5 md:py-2 rounded-full font-bold font-collier text-[11px] md:text-xs shadow-md hover:shadow-xl hover:shadow-brand-naranja/30 transition-all duration-300 hover:scale-105"
            >
              Ver Catálogo
              <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Community Section (UGC/Instagram Wall) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-collier font-bold text-brand-verde-claro-oscuro mb-4">
                La Comunidad <span className="text-brand-naranja">San Marcos</span>
              </h2>
              <p className="text-gray-600 font-amsi max-w-xl text-lg">
                Miles de clientes confían en nosotros todos los días. 
                Únete y comparte los mejores momentos de tus mascotas.
              </p>
            </div>
            <a 
              href="#" 
              className="group flex flex-col items-center justify-center w-full md:w-auto"
            >
              <button className="flex items-center gap-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-full font-bold font-collier hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Camera className="w-6 h-6" />
                Síguenos en Instagram
              </button>
              <span className="text-sm text-gray-400 mt-2 font-amsi opacity-0 group-hover:opacity-100 transition-opacity">@sanmarcos_oficial</span>
            </a>
          </div>
          
          {/* Asymmetrical Masonry Grid */}
          <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {socialFeed.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group overflow-hidden rounded-2xl bg-gray-100 break-inside-avoid cursor-pointer"
              >
                <img 
                  src={post.src} 
                  alt="Mascota de la comunidad" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Glass Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center text-white"
                  >
                    <Heart className="w-12 h-12 fill-white text-white mb-2" />
                    <span className="font-bold font-collier text-lg">{post.likes}</span>
                  </motion.div>
                  <p className="absolute bottom-4 left-4 text-white/90 font-amsi font-semibold text-sm">
                    {post.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Home;
