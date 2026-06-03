/** true si la promo usa foto/URL real (no el SVG generado con emoji) */
export const isPromotionPhoto = (imageUrl) =>
  Boolean(imageUrl) &&
  (imageUrl.startsWith('http') || imageUrl.startsWith('/')) &&
  !imageUrl.startsWith('data:image/svg');

export const promotionImageClass = (imageUrl, variant = 'card') => {
  const photo = isPromotionPhoto(imageUrl);
  if (variant === 'hero') {
    return photo
      ? 'w-full h-full object-cover rounded-2xl'
      : 'w-full h-full object-contain filter drop-shadow-2xl';
  }
  return photo
    ? 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
    : 'max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105';
};
