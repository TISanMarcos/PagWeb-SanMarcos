import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getCatalogSegmentForProfile } from '../constants/userTypes';
import { fetchProductsBySegment } from '../services/authService';
import { useContactFlow } from '../hooks/useContactFlow';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import WhatsAppCheckout from '../components/WhatsAppCheckout';

const animals = ['Todos', 'Perros', 'Gatos', 'Aves', 'Conejos'];

const megaCategories = {
  'Alimento': ['Alimento seco', 'Alimento natural', 'Alimento húmedo', 'Alimento avanzado', 'Alimento prescripción'],
  'Premios, Carnazas y Toppings': ['Premios', 'Carnazas', 'Masticables naturales', 'Alternativas a la carnaza'],
  'Moda y Diversión': ['Correas, collares y arneses', 'Ropa y accesorios', 'Juguetes', 'Camas', 'Jaulas', 'Casas para perro', 'Transportadoras y viaje', 'Tazones'],
  'Salud y Bienestar': ['Cuidado de la salud', 'Grooming', 'Limpieza', 'Antiparasitarios']
};

const Catalog = () => {
  const { role, userProfile, addToCart } = useAppStore();
  const { startContactFlow } = useContactFlow();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [activeAnimal, setActiveAnimal] = useState('Todos');
  const [expandedCategories, setExpandedCategories] = useState(['Alimento']); // which sidebar cats are open
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const segment = userProfile ? getCatalogSegmentForProfile(userProfile) : role || 'b2c';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsBySegment(segment);
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [segment]);

  const toggleCategoryInfo = (cat) => {
    if (expandedCategories.includes(cat)) {
      setExpandedCategories(expandedCategories.filter(c => c !== cat));
    } else {
      setExpandedCategories([...expandedCategories, cat]);
    }
  };

  const handleSubSelect = (subcat) => {
    // Toggle subcategory filter off if clicked again
    setSelectedSubCategory(selectedSubCategory === subcat ? null : subcat);
  };

  const filteredProducts = products.filter(product => {
    // 1. Animal Filter
    if (activeAnimal !== 'Todos' && product.targetAnimal !== activeAnimal.toLowerCase()) return false;
    
    // 2. SubCategory Filter
    if (selectedSubCategory && product.subCategory !== selectedSubCategory) return false;

    return true;
  });

  if (loading) {
    return <div className="p-20 text-center font-amsi font-semibold text-brand-verde-claro-oscuro">Cargando catálogo...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-neutral pb-20">
      {!userProfile && (
        <div className="max-w-[1440px] mx-auto px-4 pt-6">
          <div className="bg-brand-beige border border-brand-naranja/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-amsi text-sm text-brand-verde-oscuro">
              Elige tu tipo de cliente para ver precios retail o mayoreo.
            </p>
            <button
              type="button"
              onClick={() => startContactFlow('catalogo', { source: 'catalogo-sin-perfil' })}
              className="btn-primary text-sm py-2 px-5"
            >
              Identificarme
            </button>
          </div>
        </div>
      )}
      {/* Top Banner Area */}
      <div className="w-full bg-brand-verde-oscuro py-12 mb-8 relative md:rounded-b-[3rem] shadow-sm border-b border-brand-verde-oscuro/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-collier font-bold text-white mb-2 tracking-tight">
              {segment === 'b2b' ? 'El Parián Mayoristas' : 'Catálogo San Marcos'}
            </h1>
            <p className="font-amsi text-brand-verde-claro font-semibold text-lg">
              {segment === 'b2b' ? 'Inventario y precios exclusivos de mayoreo' : 'Nutrición selecta para tu mejor amigo'}
            </p>
          </div>
          
          {/* Top Animal Pills moved inside header for compactness */}
          <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto px-2 mask-linear">
            {animals.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveAnimal(cat)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold font-collier transition-all duration-300 transform hover:scale-105 ${
                  activeAnimal === cat 
                    ? 'bg-brand-naranja text-white shadow-[0_10px_20px_-10px_rgba(242,109,37,0.5)]' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-6 lg:gap-8 relative">
        
        {/* Sidebar Filter Menu */}
        <aside className="w-full xl:w-60 flex-shrink-0">
          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-brand-beige/80 sticky top-24">
            <h2 className="text-lg font-collier font-bold text-brand-verde-oscuro mb-5 flex items-center gap-2">
              Categorías
            </h2>
            <div className="space-y-1">
              {Object.entries(megaCategories).map(([catName, subcats]) => {
                const isExpanded = expandedCategories.includes(catName);
                return (
                  <div key={catName} className="border-b border-brand-beige/80 last:border-0 pb-2">
                    <button 
                      onClick={() => toggleCategoryInfo(catName)}
                      className="w-full flex items-center justify-between py-2.5 text-left font-collier font-bold text-[15px] text-brand-verde-oscuro/80 hover:text-brand-naranja transition-colors group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{catName}</span>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-brand-verde-oscuro/50 group-hover:text-brand-naranja">
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mb-1"
                        >
                          {subcats.map(sub => (
                            <li key={sub}>
                              <button
                                onClick={() => handleSubSelect(sub)}
                                className={`w-full text-left py-1.5 pl-3 text-sm font-amsi hover:text-brand-naranja transition-all relative ${
                                  selectedSubCategory === sub 
                                    ? 'text-brand-naranja font-bold translate-x-1' 
                                    : 'text-brand-verde-oscuro/60 hover:translate-x-1'
                                }`}
                              >
                                {selectedSubCategory === sub && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-naranja" />}
                                {sub}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Catalog Area */}
        <div className="flex-1 min-w-0">
          
          {selectedSubCategory && (
            <div className="mb-6 flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-2xl shadow-sm border border-brand-beige/80">
              <span className="text-[13px] text-brand-verde-oscuro/50 font-amsi uppercase tracking-widest font-bold">Filtro:</span>
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-verde-claro/10 text-brand-verde-claro-oscuro text-sm font-bold rounded-full font-collier">
                {selectedSubCategory}
                <button 
                  onClick={() => setSelectedSubCategory(null)} 
                  className="ml-3 text-brand-naranja hover:text-brand-naranja transition-colors w-5 h-5 flex items-center justify-center rounded-full bg-white shadow-sm"
                >
                  &times;
                </button>
              </span>
            </div>
          )}
          
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-brand-beige/80 shadow-sm"
            >
              <div className="w-20 h-20 bg-brand-crema rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-brand-beige" />
              </div>
              <p className="text-brand-verde-oscuro/60 font-amsi text-lg">No hay productos que coincidan con los filtros.</p>
              <button onClick={() => { setActiveAnimal('Todos'); setSelectedSubCategory(null); }} className="mt-4 text-brand-naranja font-bold hover:underline">
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(45,30,82,0.1)] transition-all duration-300 border border-transparent hover:border-brand-beige/80"
                >
                  <div className="h-44 overflow-hidden bg-brand-neutral relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-3 left-3 pr-3 flex flex-col gap-1.5 w-full items-start">
                      {product.stock < 50 && (
                        <span className="bg-brand-naranja/95 backdrop-blur text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md border border-brand-naranja/40 shadow-sm">
                          Pocas piezas
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    {/* Title (No aggressive line clamp, let it breathe) */}
                    <h3 className="font-collier font-bold leading-tight mb-2.5 text-brand-verde-oscuro group-hover:text-brand-naranja transition-colors text-[15px] pr-1">
                      {product.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[13px] text-brand-verde-oscuro/70 font-amsi mb-5 line-clamp-3 font-normal leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Bottom row (Pricing / Button) */}
                    <div className="mt-auto flex items-end justify-between pt-3 border-t border-brand-beige/50">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-brand-verde-oscuro/50 font-amsi mb-0.5 uppercase tracking-wide">Precio</span>
                        <span className="text-[22px] font-black text-brand-verde-claro-oscuro font-collier tracking-tighter leading-none">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 rounded-full bg-brand-crema text-brand-verde-claro-oscuro flex items-center justify-center hover:bg-brand-naranja hover:text-white hover:scale-110 transition-all duration-300 shadow-sm border border-brand-beige/80 hover:border-transparent flex-shrink-0"
                        title="Agregar al carrito"
                      >
                        <ShoppingCart className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Cart Checkout Column */}
        <div className="w-full xl:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <WhatsAppCheckout />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Catalog;
