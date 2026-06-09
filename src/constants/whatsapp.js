export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '525556943312';

export const whatsAppUrl = (message = '') => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encoded}` : ''}`;
};

export const COTIZA_MESSAGE =
  '¡Hola! Me interesa cotizar para mi negocio. ¿Tienen un momento para apoyarme?';
