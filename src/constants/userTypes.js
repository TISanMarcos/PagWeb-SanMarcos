export const USER_TYPES = [
  {
    id: 'consumidor_final',
    label: 'Consumidor final',
    shortLabel: 'Consumidor',
    channel: 'retail',
    catalogSegment: 'b2c',
    description: 'Compras para tu mascota en casa',
    emoji: '🏠',
  },
  {
    id: 'tiendero_abarrotes',
    label: 'Tendero / Abarrotero',
    shortLabel: 'Tendero / Abarrotero',
    channel: 'business',
    catalogSegment: 'b2b',
    description: 'Abarrotes o tienda de conveniencia',
    emoji: '🏪',
  },
  {
    id: 'tienda_mascotas',
    label: 'Tienda de mascotas',
    shortLabel: 'Pet shop',
    channel: 'business',
    catalogSegment: 'b2b',
    description: 'Pet shop o boutique de mascotas',
    emoji: '🐾',
  },
  {
    id: 'veterinario',
    label: 'Médico veterinario',
    shortLabel: 'Veterinario',
    channel: 'business',
    catalogSegment: 'b2b',
    description: 'Clínica o consultorio veterinario',
    emoji: '⚕️',
  },
  {
    id: 'revendedor_alimentos',
    label: 'Revendedor de alimentos',
    shortLabel: 'Revendedor',
    channel: 'business',
    catalogSegment: 'b2b',
    description: 'Distribución o reventa de alimento',
    emoji: '📦',
  },
  {
    id: 'mayorista',
    label: 'Mayorista',
    shortLabel: 'Mayorista',
    channel: 'business',
    catalogSegment: 'b2b',
    description: 'Compras en volumen y tarimas',
    emoji: '🤝',
  },
];

export const getUserTypeById = (id) => USER_TYPES.find((t) => t.id === id) ?? null;

export const isRetailUser = (typeId) => typeId === 'consumidor_final';

export const RETAIL_USER_TYPE = USER_TYPES.find((t) => t.id === 'consumidor_final');

export const BUSINESS_USER_TYPES = USER_TYPES.filter((t) => !isRetailUser(t.id));

export const getCatalogSegmentForProfile = (profile) => {
  if (!profile?.typeId) return 'b2c';
  const type = getUserTypeById(profile.typeId);
  return type?.catalogSegment ?? 'b2c';
};
