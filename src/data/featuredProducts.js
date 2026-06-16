const base = import.meta.env.BASE_URL;

const img = (n) => `${base}products/${n}.jpeg`;

export const FEATURED_PRODUCTS = [
  { id: 1, name: 'Atado Arena Alfa Cat 4/6kg', image: img(1), brand: 'Alfa Cat' },
  { id: 2, name: 'Royal Canin Lata Dog Gastro Low Fat 385gr', image: img(2), brand: 'Royal Canin' },
  { id: 3, name: 'Royal Canin Lata Dog Gastro High Energy 385gr', image: img(3), brand: 'Royal Canin' },
  { id: 4, name: 'Royal Canin Lata Dog-Cat Recovery 145gr', image: img(4), brand: 'Royal Canin' },
  { id: 5, name: 'Pedigree Exhibidor Sobres Adulto Res 12/100gr', image: img(5), brand: 'Pedigree' },
  { id: 6, name: 'Royal Canin Lata Dog Adulto 385gr', image: img(6), brand: 'Royal Canin' },
  { id: 7, name: 'Royal Canin Lata Cat Instinctive 85gr', image: img(7), brand: 'Royal Canin' },
  { id: 8, name: 'Gatina 15kg', image: img(8), brand: 'Gatina' },
  { id: 9, name: 'Whiskas Exhibidor Sobre Atún Adulto 12/85gr', image: img(9), brand: 'Whiskas' },
  { id: 10, name: 'Royal Canin Lata Cat Renal D 85gr', image: img(10), brand: 'Royal Canin' },
  { id: 11, name: 'Whiskas Exhibidor Sobre Parrillada Adulto 12/85gr', image: img(11), brand: 'Whiskas' },
  { id: 12, name: 'Whiskas Exhibidor Sobre Pollo Adulto 12/85gr', image: img(12), brand: 'Whiskas' },
  { id: 13, name: 'Pedigree Exhibidor Sobres Adulto Pollo 12/100gr', image: img(13), brand: 'Pedigree' },
  { id: 14, name: 'Dog Chow Adulto Razas Pequeñas 25kg', image: img(14), brand: 'Dog Chow' },
  { id: 15, name: 'Royal Canin Lata Cat Gastro High Energy 85gr', image: img(15), brand: 'Royal Canin' },
  { id: 16, name: 'Whiskas Exhibidor Sobre Salmón Adulto 12/85gr', image: img(16), brand: 'Whiskas' },
  { id: 17, name: 'Royal Canin Lata Cat Renal E 145gr', image: img(17), brand: 'Royal Canin' },
  { id: 18, name: 'Atado Arena Fancy Cat 5/6kg', image: img(18), brand: 'Fancy Cat' },
  { id: 19, name: 'Whiskas Exhibidor Sobre Pescado Adulto 12/85gr', image: img(19), brand: 'Whiskas' },
  { id: 20, name: 'Pedigree Exhibidor Sobre Cordero Adulto 12/100gr', image: img(20), brand: 'Pedigree' },
];
