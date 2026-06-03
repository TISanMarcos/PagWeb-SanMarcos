/** Genera imagen SVG con emoji (respaldo si no hay imageUrl) */
export const makeSvgUri = (emoji, colorStart, colorEnd) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="gf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colorStart}"/>
        <stop offset="100%" stop-color="${colorEnd}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#gf)"/>
    <text x="200" y="220" font-size="160" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const DEFAULT_COLORS = { start: '#003020', end: '#004d32' };

const IMAGE_URL_KEYS = [
  'imageUrl',
  'imageurl',
  'imagen',
  'imagenUrl',
  'urlImagen',
  'foto',
  'photo',
  'image',
];

const pickRawImageUrl = (row) => {
  for (const key of IMAGE_URL_KEYS) {
    const value = (row[key] ?? '').trim();
    if (value) return value;
  }
  return '';
};

const normalizeExternalImageUrl = (raw) => {
  let url = raw.trim();
  if (!url) return '';

  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  if (/^https?:\/\//i.test(url) || url.startsWith('/') || url.startsWith('data:')) {
    return url;
  }

  if (!url.includes(' ') && /\.(jpg|jpeg|png|webp|gif|svg|avif)(\?|$)/i.test(url)) {
    return `https://${url}`;
  }

  if (!url.includes(' ') && url.includes('.')) {
    return `https://${url}`;
  }

  return '';
};

export const isPhotoImageUrl = (url) =>
  Boolean(url) && (url.startsWith('http') || url.startsWith('/')) && !url.startsWith('data:image/svg');

/**
 * Prioridad: columna imageUrl (URL) → si no hay, emoji + colores en SVG.
 */
export const resolveImageUrl = (row) => {
  const external = normalizeExternalImageUrl(pickRawImageUrl(row));
  if (external) return external;

  const emoji = (row.imageEmoji || row.imageemoji || '🎁').trim() || '🎁';
  const start = (row.colorStart || row.colorstart || DEFAULT_COLORS.start).trim();
  const end = (row.colorEnd || row.colorend || DEFAULT_COLORS.end).trim();
  return makeSvgUri(emoji, start, end);
};
