export const SITE_URL = 'https://san-marcos.com.mx';
export const SITE_NAME = 'San Marcos Mascotas';

export const DEFAULT_TITLE = 'San Marcos Mascotas | Mayoreo de Alimento y Productos para Mascotas';

export const DEFAULT_DESCRIPTION =
  'Mayoreo de alimento y productos para mascotas desde 1984. Royal Canin, Pedigree, Hill\'s, Purina y más. Entregas en CDMX. Cotiza por WhatsApp.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/banner_principal_1.jpg`;

/** Rutas públicas indexables con su sección de scroll en la home */
export const SECTION_ROUTES = [
  {
    path: '/nosotros',
    sectionId: 'nosotros',
    title: 'Acerca de Nosotros',
    description:
      'Conoce la historia de San Marcos Mascotas: más de 40 años distribuyendo alimento para mascotas, granos, semillas y productos pecuarios en la Ciudad de México.',
  },
  {
    path: '/productos',
    sectionId: 'productos',
    title: 'Productos',
    description:
      'Amplia variedad de alimento para perros, gatos, aves y pecuarios. Distribución mayorista con las mejores marcas del mercado.',
  },
  {
    path: '/marcas',
    sectionId: 'marcas',
    title: 'Marcas',
    description:
      'Distribuidores oficiales de las marcas más reconocidas en alimento para mascotas y productos pecuarios.',
  },
  {
    path: '/beneficios',
    sectionId: 'beneficios',
    title: 'Beneficios',
    description:
      'Ventajas de surtir con San Marcos Mascotas: precios mayoristas, entregas rápidas y asesoría veterinaria sin costo.',
  },
  {
    path: '/sucursal',
    sectionId: 'sucursal',
    title: 'Sucursal y Contacto',
    description:
      'Visítanos en Central de Abasto, CDMX. Tel. 55 5694 3312. Horario de atención y ubicación en mapa.',
  },
];

export const PAGE_META = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/promociones': {
    title: 'Promociones | San Marcos Mascotas',
    description:
      'Consulta las promociones activas de San Marcos Mascotas para clientes retail y mayoristas. Ofertas en alimento para mascotas y productos pecuarios.',
  },
  '/aviso-de-privacidad': {
    title: 'Aviso de Privacidad | San Marcos Mascotas',
    description:
      'Aviso de privacidad de San Marcos Mascotas conforme a la LFPDPPP. Información sobre el tratamiento de datos personales.',
  },
};

SECTION_ROUTES.forEach(({ path, title, description }) => {
  PAGE_META[path] = {
    title: `${title} | ${SITE_NAME}`,
    description,
  };
});

const sectionPathById = Object.fromEntries(
  SECTION_ROUTES.map(({ sectionId, path }) => [sectionId, path]),
);

const sectionIdByPath = Object.fromEntries(
  SECTION_ROUTES.map(({ sectionId, path }) => [path, sectionId]),
);

export const getSectionPath = (sectionId) => sectionPathById[sectionId] ?? null;

export const getSectionFromPath = (pathname) => sectionIdByPath[pathname] ?? null;

export const getPageMeta = (pathname) =>
  PAGE_META[pathname] ?? {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  };

export const SITEMAP_URLS = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  ...SECTION_ROUTES.map(({ path }) => ({
    loc: `${SITE_URL}${path}`,
    changefreq: 'monthly',
    priority: path === '/nosotros' || path === '/productos' ? '0.9' : '0.8',
  })),
  { loc: `${SITE_URL}/promociones`, changefreq: 'daily', priority: '0.9' },
];
