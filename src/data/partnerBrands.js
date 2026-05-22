/**
 * Marcas distribuidas por San Marcos.
 * Logos tomados únicamente de san-marcos.com.mx (sitio actual en reestructuración).
 */
const local = (file) => `${import.meta.env.BASE_URL}brands/${file}.webp`;
const remote = (path) => `https://san-marcos.com.mx/wp-content/uploads/2022/08/${path}`;

export const partnerBrands = [
  { name: 'Bayer', src: local('bayer'), fallback: remote('Logo_Bayer.svg_-150x150.webp') },
  { name: 'Flagasa', src: local('flagasa'), fallback: remote('flagasa-logo-150x150.webp') },
  { name: 'Diamond', src: local('diamond'), fallback: remote('diamond-pet-foods-logo-06A08347C0-seeklogo.com_.webp') },
  { name: 'Kirkland', src: local('kirkland'), fallback: remote('600f10548581e1000420267e.webp') },
  { name: 'Albapesa', src: local('albapesa'), fallback: remote('10-albapesa.webp') },
  { name: 'Royal Canin', src: local('royal-canin'), fallback: remote('Royal-Canin-Logo.svg_.webp') },
  { name: 'Purina', src: local('purina'), fallback: remote('Purina-Logo-scaled.webp') },
  { name: 'Nupec', src: local('nupec'), fallback: remote('nupec-logo-CA0BA2EE96-seeklogo.com_.webp') },
  { name: 'Nu-3', src: local('nu3'), fallback: remote('logo-1_A1.webp') },
  { name: 'Grupo Acuario Lomas', src: local('acuario-lomas'), fallback: remote('logo_gal1.webp') },
  { name: 'Dog Chow', src: local('dog-chow'), fallback: remote('Logo-Dog-Chow_3_1.webp') },
  { name: 'Whiskas', src: local('whiskas'), fallback: remote('Whiskas_2003-1.webp') },
  { name: 'Cat Chow', src: local('cat-chow'), fallback: remote('BP-Cat-Chow_0.webp') },
  { name: 'Felix', src: local('felix'), fallback: remote('purina-felix-logo-18159D15F9-seeklogo.com_.webp') },
];

/** Nombres para formularios y selects (mismo orden que el carrusel de marcas) */
export const partnerBrandNames = partnerBrands.map((b) => b.name);
