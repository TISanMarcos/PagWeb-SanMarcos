import { isPromotionPhoto, promotionImageClass } from '../utils/promotionImage';

const PromoImage = ({ src, alt = '', variant = 'card', className = '' }) => {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`${promotionImageClass(src, variant)} ${className}`.trim()}
      data-promo-photo={isPromotionPhoto(src) ? 'true' : 'false'}
    />
  );
};

export default PromoImage;
