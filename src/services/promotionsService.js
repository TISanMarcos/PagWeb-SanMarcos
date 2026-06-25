import { parsePromotionsCsv } from '../utils/promotionFromRow.js';

// URL pública de la hoja — ya es accesible para cualquiera, CORS: *
const SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSh3SybQ5Ln_86z5RQcSNjU_rUAVJC-JIJ77Rv2J53w9FxPfv45Hv5pdwA6J-WyqzndVmvsV0fUXqGT/pub?output=csv';

const DEV_POLL_MS  = 15_000;        // dev: refresca cada 15 s
const PROD_POLL_MS = 2 * 60_000;    // prod: refresca cada 2 min
const PROD_CACHE_MS = 2 * 60_000;   // prod: usa caché en memoria 2 min

let cache = { promotions: null, fetchedAt: 0 };

async function loadFromSheets() {
  const res = await fetch(SHEETS_CSV_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Google Sheets respondió ${res.status}`);
  const text = await res.text();
  return parsePromotionsCsv(text);
}

async function loadStaticCache() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}data/promotions-cache.json`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchPromotions({ force = false } = {}) {
  const now = Date.now();
  const cacheMs = import.meta.env.DEV ? 0 : PROD_CACHE_MS;

  if (!force && cache.promotions && cacheMs > 0 && now - cache.fetchedAt < cacheMs) {
    return cache.promotions;
  }

  try {
    const live = await loadFromSheets();
    cache = { promotions: live, fetchedAt: now };
    return live;
  } catch (err) {
    console.warn('[promociones] No se pudo leer Google Sheets, usando caché:', err.message);
  }

  // Fallback: JSON estático del build anterior
  const fallback = await loadStaticCache();
  cache = { promotions: fallback, fetchedAt: now };
  return fallback;
}

export function clearPromotionsCache() {
  cache = { promotions: null, fetchedAt: 0 };
}

export function isPromotionsSheetConfigured() {
  return true;
}

export function getPromotionsPollMs() {
  return import.meta.env.DEV ? DEV_POLL_MS : PROD_POLL_MS;
}
