const STORAGE_KEY = 'sm-promotions-audience';

/** @typedef {'retail' | 'business'} PromotionsAudience */

/** @returns {PromotionsAudience | null} */
export const getPromotionsAudience = () => {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value === 'retail' || value === 'business' ? value : null;
  } catch {
    return null;
  }
};

/** @param {PromotionsAudience} audience */
export const setPromotionsAudience = (audience) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, audience);
  } catch {
    /* ignore */
  }
};

export const clearPromotionsAudience = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

/** @param {PromotionsAudience} audience */
export const audienceToSegment = (audience) => (audience === 'business' ? 'b2b' : 'b2c');

/** @param {PromotionsAudience} audience */
export const audienceLabel = (audience) =>
  audience === 'business' ? 'Negocio' : 'Dueño de mascota';
