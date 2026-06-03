export const BRANCH = {
  name: 'San Marcos Mascotas',
  addressLine1: 'Central de Abasto C9 y C11, 09040',
  addressLine2: 'Iztapalapa, Ciudad de México',
  phoneDisplay: '55 5694 3312',
  googleMapsUrl: 'https://maps.app.goo.gl/KYWBPm1zXKuAhuWB8',
  wazeUrl:
    'https://www.waze.com/ul?ll=19.3779373,-99.0938304&navigate=yes',
  /** Coordenadas — San Marcos (Central de Abasto) */
  lat: 19.3779373,
  lng: -99.0938304,
  /** Mapa embebido centrado en la sucursal (sin API key) */
  mapEmbedUrl:
    'https://maps.google.com/maps?q=19.3779373,-99.0938304&hl=es&z=17&ll=19.3779373,-99.0938304&output=embed',
};

const icon = (file) => `${import.meta.env.BASE_URL}icons/${file}`;

export const BRANCH_MAP_ICONS = {
  /** Logo oficial — Wikimedia Commons (Google Maps Logo 2020) */
  googleMaps: icon('google-maps-logo.svg'),
  waze: icon('waze.png'),
};

export const BRANCH_HOURS = [
  { day: 'Lunes', hours: '7:00 a.m. – 5:00 p.m.' },
  { day: 'Martes', hours: '7:00 a.m. – 5:00 p.m.' },
  { day: 'Miércoles', hours: '7:00 a.m. – 5:00 p.m.' },
  { day: 'Jueves', hours: '7:00 a.m. – 5:00 p.m.' },
  { day: 'Viernes', hours: '7:00 a.m. – 5:00 p.m.' },
  { day: 'Sábado', hours: '7:00 a.m. – 2:00 p.m.' },
  { day: 'Domingo', hours: 'Cerrado', closed: true },
];
