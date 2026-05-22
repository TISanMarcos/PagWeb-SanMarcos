/**
 * Carga Collier y Amsi Pro desde public/fonts con soporte para BASE_URL (GitHub Pages).
 */
export const loadBrandFonts = () => {
  const base = import.meta.env.BASE_URL;
  const enc = (segment) => encodeURI(segment).replace(/#/g, '%23');

  const css = `
    @font-face {
      font-family: 'Collier';
      src: url('${base}${enc('fonts/Collier/Collier.woff2')}') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Amsi Pro';
      src: url('${base}${enc('fonts/Amsi Pro/Amsi Pro.woff2')}') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
  `;

  const id = 'san-marcos-brand-fonts';
  if (document.getElementById(id)) return;

  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
};
