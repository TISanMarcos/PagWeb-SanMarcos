/** Genera imagen SVG con emoji (misma lógica que mockDB) */
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

export const resolveImageUrl = (row) => {
  const url = (row.imageUrl || row.imageurl || '').trim();
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }

  const emoji = (row.imageEmoji || row.imageemoji || '🎁').trim() || '🎁';
  const start = (row.colorStart || row.colorstart || DEFAULT_COLORS.start).trim();
  const end = (row.colorEnd || row.colorend || DEFAULT_COLORS.end).trim();
  return makeSvgUri(emoji, start, end);
};
