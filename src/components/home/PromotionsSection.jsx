import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Tag } from 'lucide-react';
import { usePromotions } from '../../hooks/usePromotions';
import PromoImage from '../PromoImage';
import PromotionsSyncHint from '../promotions/PromotionsSyncHint';
import { isPromotionPhoto } from '../../utils/promotionImage';

const segmentLabel = (segment) => {
  if (segment === 'b2b') return 'Mayoreo';
  if (segment === 'b2c') return 'Retail';
  return 'Todos';
};

const PromotionsSection = () => {
  const { promotions, loading, pollIntervalMs } = usePromotions({ limit: 3 });

  if (loading || promotions.length === 0) {
    return null;
  }

  return (
    <section id="promociones" className="section-pad section-surface scroll-mt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10"
        >
          <div>
            <p className="text-brand-naranja font-amsi font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-2">
              Ofertas activas
            </p>
            <h2 className="section-title">Promociones</h2>
            <p className="section-lead text-brand-verde-oscuro/70 mt-3 max-w-xl">
              Descuentos, cupones y beneficios para retail y mayoreo.
            </p>
          </div>
          <Link
            to="/promociones"
            className="inline-flex items-center gap-2 btn-primary text-sm py-2.5 shrink-0"
          >
            Ver promociones
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {promotions.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
            >
              <Link
                to="/promociones"
                className="group block h-full bg-white rounded-2xl border border-brand-beige/80 shadow-sm overflow-hidden hover:shadow-premium hover:border-brand-naranja/40 transition-all"
              >
                <div
                  className={`relative h-36 overflow-hidden flex items-center justify-center ${
                    isPromotionPhoto(promo.imageUrl) ? 'bg-brand-neutral' : 'bg-brand-verde-oscuro/5 p-4'
                  }`}
                >
                  {promo.imageUrl ? (
                    <PromoImage src={promo.imageUrl} alt={promo.title} variant="card" />
                  ) : (
                    <Gift className="w-12 h-12 text-brand-naranja/60" />
                  )}
                  <span className="absolute top-3 left-3 text-[10px] font-amsi font-bold uppercase tracking-wider bg-brand-verde-oscuro text-white px-2.5 py-1 rounded-full">
                    {segmentLabel(promo.segment)}
                  </span>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-collier font-bold text-lg text-brand-verde-oscuro leading-snug mb-2 group-hover:text-brand-naranja transition-colors">
                    {promo.title}
                  </h3>
                  <p className="font-amsi text-sm text-brand-verde-oscuro/70 line-clamp-2 mb-3">
                    {promo.description}
                  </p>
                  {promo.couponCode && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-amsi font-bold text-brand-naranja bg-brand-naranja/10 px-2.5 py-1 rounded-lg">
                      <Tag className="w-3.5 h-3.5" />
                      {promo.couponCode}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <Link
            to="/promociones"
            className="inline-flex items-center gap-2 font-collier font-bold text-brand-naranja hover:text-brand-naranja-hover transition-colors"
          >
            Ver todas las promociones
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <PromotionsSyncHint pollIntervalMs={pollIntervalMs} />
      </div>
    </section>
  );
};

export default PromotionsSection;
