import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCatalogSegmentForProfile } from '../../constants/userTypes';
import { fetchProductsBySegment } from '../../services/authService';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight } from 'lucide-react';

const FeaturedProductsSection = () => {
  const { role, userProfile } = useAppStore();
  const [products, setProducts] = useState([]);
  const segment = userProfile ? getCatalogSegmentForProfile(userProfile) : role || 'b2c';

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProductsBySegment(segment);
        setProducts(data.slice(0, 4));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [segment]);

  return (
    <section id="productos" className="section-pad section-alt">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title mb-3">
              Productos destacados
            </h2>
            <p className="font-amsi text-brand-verde-oscuro/70">
              Ejemplos de presentaciones y precios orientativos de mayoreo.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-brand-naranja text-white px-6 py-3 rounded-full font-bold font-collier text-sm hover:scale-105 transition-transform shadow-md"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-beige/80 hover:shadow-lg transition-shadow"
            >
              <motion.div
                className="bg-brand-verde-oscuro px-4 py-2.5"
                whileHover={{ backgroundColor: '#004d32' }}
              >
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-verde-claro font-amsi">
                  {product.subCategory || product.category}
                </span>
              </motion.div>
              <div className="h-36 bg-brand-neutral overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-collier font-bold text-brand-verde-oscuro text-sm leading-snug mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-black text-brand-naranja font-collier">
                  ${product.price.toLocaleString()}
                </p>
                <p className="text-xs text-brand-verde-oscuro/50 font-amsi mt-1">Precio orientativo mayoreo</p>
              </div>
            </motion.article>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-brand-verde-oscuro/60 font-amsi py-12">Cargando productos destacados...</p>
        )}
      </motion.div>
    </section>
  );
};

export default FeaturedProductsSection;
