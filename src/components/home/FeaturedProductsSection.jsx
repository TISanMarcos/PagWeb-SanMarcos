import { motion } from 'framer-motion';
import { FEATURED_PRODUCTS } from '../../data/featuredProducts';

const midpoint = Math.ceil(FEATURED_PRODUCTS.length / 2);
const productsRowOne = FEATURED_PRODUCTS.slice(0, midpoint);
const productsRowTwo = FEATURED_PRODUCTS.slice(midpoint);

const ProductCard = ({ product }) => (
  <article
    className="flex-shrink-0 w-40 sm:w-44 md:w-48 mx-3 md:mx-4 bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-brand-beige/80 flex flex-col transition-transform hover:scale-[1.02]"
    title={product.name}
  >
    <div className="bg-brand-verde-oscuro px-2.5 py-1.5 sm:py-2">
      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-brand-verde-claro font-amsi line-clamp-1">
        {product.brand}
      </span>
    </div>

    <div className="relative h-32 sm:h-36 md:h-40 bg-gradient-to-b from-brand-neutral to-brand-crema p-3 flex items-center justify-center">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-sm"
      />
    </div>

    <div className="p-3 flex-1 min-h-[4.25rem] sm:min-h-[4.5rem]">
      <h3 className="font-collier font-bold text-brand-verde-oscuro text-xs sm:text-sm leading-snug line-clamp-3">
        {product.name}
      </h3>
    </div>
  </article>
);

const ProductMarqueeRow = ({ products, reverse = false }) => {
  const track = [...products, ...products];

  return (
    <div
      className={`flex w-max will-change-transform ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      aria-hidden
    >
      {track.map((product, i) => (
        <ProductCard key={`${product.id}-${i}`} product={product} />
      ))}
    </div>
  );
};

const FeaturedProductsSection = () => (
  <section id="productos" className="section-alt pt-14 md:pt-20 pb-8 md:pb-10 overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10"
    >
      <div className="max-w-3xl">
        <h2 className="section-title mb-3">Productos destacados</h2>
        <p className="font-amsi text-brand-verde-oscuro/70 text-base md:text-lg leading-relaxed">
          Algunas de las presentaciones que manejamos para surtir tu negocio. Cotiza por WhatsApp
          y te confirmamos disponibilidad.
        </p>
      </div>
    </motion.div>

    <div className="relative space-y-6 md:space-y-8" aria-label="Productos destacados en movimiento">
      <ProductMarqueeRow products={productsRowOne} />
      <ProductMarqueeRow products={productsRowTwo} reverse />
    </div>

    <p className="sr-only">{FEATURED_PRODUCTS.map((p) => p.name).join('. ')}</p>
  </section>
);

export default FeaturedProductsSection;
