export const BRANCH = {
  name: 'San Marcos Mascotas',
  addressLine1: 'Central de Abasto C9 y C11, 09040',
  addressLine2: 'Iztapalapa, Ciudad de México',
  phoneDisplay: '55 5694 3312',
  googleMapsUrl: 'https://maps.app.goo.gl/LKFSnsHDkkwMrAzC9',
  wazeUrl:
    'https://www.waze.com/es/live-map/directions/san-marcos-mascotas-iztapalapa?to=place.w.170983618.1709901714.26224152',
  /** Coordenadas aprox. — Central de Abasto, Iztapalapa */
  lat: 19.3794,
  lng: -99.0882,
  /** Mapa embebido centrado en la sucursal (sin API key) */
  mapEmbedUrl:
    'https://maps.google.com/maps?q=19.3794,-99.0882&hl=es&z=17&ll=19.3794,-99.0882&output=embed',
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
