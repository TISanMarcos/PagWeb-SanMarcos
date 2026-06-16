/**
 * Marcas distribuidas por San Marcos.
 */
const localWebp = (file) => `${import.meta.env.BASE_URL}brands/${file}.webp`;
const localFile = (file) => `${import.meta.env.BASE_URL}brands/${file}`;
const remote = (path) => `https://san-marcos.com.mx/wp-content/uploads/2022/08/${path}`;

export const partnerBrands = [
  { name: 'Bayer', src: localWebp('bayer'), fallback: remote('Logo_Bayer.svg_-150x150.webp') },
  { name: 'Flagasa', src: localWebp('flagasa'), fallback: remote('flagasa-logo-150x150.webp') },
  { name: 'Diamond', src: localWebp('diamond'), fallback: remote('diamond-pet-foods-logo-06A08347C0-seeklogo.com_.webp') },
  { name: 'Kirkland', src: localWebp('kirkland'), fallback: remote('600f10548581e1000420267e.webp') },
  { name: 'Albapesa', src: localWebp('albapesa'), fallback: remote('10-albapesa.webp') },
  { name: 'Royal Canin', src: localWebp('royal-canin'), fallback: remote('Royal-Canin-Logo.svg_.webp') },
  { name: 'Purina', src: localWebp('purina'), fallback: remote('Purina-Logo-scaled.webp') },
  { name: 'Nupec', src: localWebp('nupec'), fallback: remote('nupec-logo-CA0BA2EE96-seeklogo.com_.webp') },
  { name: 'Nu-3', src: localWebp('nu3'), fallback: remote('logo-1_A1.webp') },
  { name: 'Grupo Acuario Lomas', src: localWebp('acuario-lomas'), fallback: remote('logo_gal1.webp') },
  { name: 'Dog Chow', src: localWebp('dog-chow'), fallback: remote('Logo-Dog-Chow_3_1.webp') },
  { name: 'Whiskas', src: localWebp('whiskas'), fallback: remote('Whiskas_2003-1.webp') },
  { name: 'Cat Chow', src: localWebp('cat-chow'), fallback: remote('BP-Cat-Chow_0.webp') },
  { name: 'Felix', src: localWebp('felix'), fallback: remote('purina-felix-logo-18159D15F9-seeklogo.com_.webp') },
  { name: "Hill's", src: localFile('hills.jpeg') },
  { name: 'Ganador', src: localFile('ganador.jpeg') },
  { name: 'Minino', src: localFile('minino.jpeg') },
  { name: 'Pedigree', src: localFile('pedigree.jpeg') },
  { name: 'Ocell', src: localFile('ocell.jpeg') },
  { name: 'NUCAN', src: localFile('nucan.jpeg') },
  { name: 'Gallo de Oro', src: localFile('gallo-de-oro.jpeg') },
  { name: 'Api-aba', src: localFile('api-aba.jpeg') },
  { name: 'Elanco', src: localFile('elanco.jpeg') },
  { name: 'Maka', src: localFile('maka.jpeg') },
  { name: 'Biomaa', src: localFile('biomaa.jpeg') },
  { name: 'Nutrimentos Concentra', src: localFile('nutrimentos-concentra.jpeg') },
  { name: 'Beneful', src: localFile('beneful.jpeg') },
  { name: 'Alfa Cat', src: localFile('alfa-cat.jpeg') },
  { name: 'Eukanuba', src: localFile('eukanuba.jpeg') },
];

/** Nombres para formularios y selects (mismo orden que el carrusel de marcas) */
export const partnerBrandNames = partnerBrands.map((b) => b.name);
