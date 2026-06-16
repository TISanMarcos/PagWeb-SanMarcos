const STATE_ABBR = {
  'Aguascalientes': 'Ags.',
  'Baja California': 'BC',
  'Baja California Sur': 'BCS',
  'Campeche': 'Camp.',
  'Chiapas': 'Chis.',
  'Chihuahua': 'Chih.',
  'Ciudad de México': 'CDMX',
  'Coahuila de Zaragoza': 'Coah.',
  'Colima': 'Col.',
  'Durango': 'Dgo.',
  'Guanajuato': 'Gto.',
  'Guerrero': 'Gro.',
  'Hidalgo': 'Hgo.',
  'Jalisco': 'Jal.',
  'México': 'Edomex',
  'Michoacán de Ocampo': 'Mich.',
  'Morelos': 'Mor.',
  'Nayarit': 'Nay.',
  'Nuevo León': 'NL',
  'Oaxaca': 'Oax.',
  'Puebla': 'Pue.',
  'Querétaro': 'Qro.',
  'Quintana Roo': 'Q. Roo',
  'San Luis Potosí': 'SLP',
  'Sinaloa': 'Sin.',
  'Sonora': 'Son.',
  'Tabasco': 'Tab.',
  'Tamaulipas': 'Tamps.',
  'Tlaxcala': 'Tlax.',
  'Veracruz de Ignacio de la Llave': 'Ver.',
  'Yucatán': 'Yuc.',
  'Zacatecas': 'Zac.',
};

const chunkCache = new Map();

export const normalizePostalCodeInput = (value) => String(value ?? '').replace(/\D/g, '').slice(0, 5);

export const formatPostalCode = (digits) => {
  const normalized = normalizePostalCodeInput(digits);
  if (normalized.length !== 5) return normalized;
  return normalized.padStart(5, '0');
};

const expandEntry = (entry) => ({
  asenta: entry.a ?? entry.asenta ?? '',
  municipio: entry.m ?? entry.municipio ?? '',
  estado: entry.e ?? entry.estado ?? '',
});

export const abbreviateState = (estado) => STATE_ABBR[estado] ?? estado;

export const formatPostalLocation = (cp, settlement) => {
  const estado = abbreviateState(settlement.estado);
  return `${cp}, ${settlement.asenta}, ${settlement.municipio}, ${estado}`;
};

const loadChunk = async (prefix) => {
  if (chunkCache.has(prefix)) return chunkCache.get(prefix);

  const response = await fetch(`${import.meta.env.BASE_URL}data/postal-codes/${prefix}.json`);
  if (!response.ok) {
    throw new Error('No se pudo cargar el catálogo de códigos postales.');
  }

  const chunk = await response.json();
  chunkCache.set(prefix, chunk);
  return chunk;
};

export const lookupPostalCode = async (rawValue) => {
  const digits = normalizePostalCodeInput(rawValue);
  if (digits.length < 5) return null;

  const cp = formatPostalCode(digits);
  const prefix = cp.slice(0, 2);
  const chunk = await loadChunk(prefix);
  const entries = chunk[cp];

  if (!entries?.length) return null;

  return {
    cp,
    settlements: entries.map(expandEntry),
  };
};
