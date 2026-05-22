import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { parseCsv } from '../utils/parseCsv.js';
import { resolveImageUrl } from '../utils/makePromoImage.js';
import { mockPromotions } from '../data/mockDB.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_CSV = path.join(__dirname, '../data/promotions-seed.csv');
const CACHE_MS = 60_000;

let cache = { promotions: null, fetchedAt: 0, source: 'seed' };

const truthy = (value) => {
  const v = String(value ?? '').trim().toLowerCase();
  return ['true', '1', 'si', 'sí', 'yes', 'activo', 'x'].includes(v);
};

const parseDate = (value) => {
  if (!value || !String(value).trim()) return null;
  const d = new Date(String(value).trim());
  return Number.isNaN(d.getTime()) ? null : d;
};

const rowToPromotion = (row) => {
  const id = (row.id || '').trim();
  if (!id) return null;

  return {
    id,
    title: (row.title || row.titulo || '').trim(),
    description: (row.description || row.descripcion || '').trim(),
    segment: (row.segment || row.segmento || 'both').trim().toLowerCase(),
    active: truthy(row.active ?? row.activo ?? 'true'),
    couponCode: (row.couponCode || row.codigo || row.coupon || '').trim() || null,
    imageUrl: resolveImageUrl(row),
    startDate: (row.startDate || row.fechaInicio || '').trim() || null,
    endDate: (row.endDate || row.fechaFin || '').trim() || null,
  };
};

const isCurrentlyValid = (promo, now = new Date()) => {
  if (!promo.active) return false;

  const start = parseDate(promo.startDate);
  const end = parseDate(promo.endDate);

  if (start && now < start) return false;
  if (end) {
    const endOfDay = new Date(end);
    endOfDay.setHours(23, 59, 59, 999);
    if (now > endOfDay) return false;
  }
  return true;
};

async function fetchCsvText(url) {
  const res = await fetch(url, { headers: { Accept: 'text/csv' } });
  if (!res.ok) {
    throw new Error(`No se pudo leer Google Sheets (${res.status})`);
  }
  return res.text();
}

function loadSeedCsv() {
  const text = readFileSync(SEED_CSV, 'utf8');
  return parseCsv(text).map(rowToPromotion).filter(Boolean);
}

async function loadFromGoogleSheets(url) {
  const text = await fetchCsvText(url);
  const promos = parseCsv(text).map(rowToPromotion).filter(Boolean);
  if (promos.length === 0) {
    throw new Error('La hoja no tiene promociones válidas (revisa encabezados e id)');
  }
  return promos;
}

/**
 * Obtiene promociones desde Google Sheets (CSV publicado) o CSV local de respaldo.
 * @param {{ activeOnly?: boolean }} options
 */
export async function getPromotions({ activeOnly = false } = {}) {
  const sheetUrl = process.env.GOOGLE_SHEETS_PROMOTIONS_URL?.trim();
  const now = Date.now();
  const cacheValid = cache.promotions && now - cache.fetchedAt < CACHE_MS;

  if (!cacheValid) {
    try {
      if (sheetUrl) {
        cache = {
          promotions: await loadFromGoogleSheets(sheetUrl),
          fetchedAt: now,
          source: 'google-sheets',
        };
      } else {
        cache = {
          promotions: loadSeedCsv(),
          fetchedAt: now,
          source: 'seed-csv',
        };
      }
    } catch (err) {
      console.warn('[promotions] Error leyendo hoja:', err.message);
      cache = {
        promotions: cache.promotions?.length ? cache.promotions : mockPromotions,
        fetchedAt: now,
        source: 'fallback-mock',
      };
    }
  }

  let list = cache.promotions;
  if (activeOnly) {
    list = list.filter((p) => isCurrentlyValid(p));
  }
  return list;
}

/** Fuerza recarga en la siguiente petición (útil tras editar la hoja) */
export function clearPromotionsCache() {
  cache = { promotions: null, fetchedAt: 0, source: 'seed' };
}

export function getPromotionsSource() {
  return {
    source: cache.source,
    count: cache.promotions?.length ?? 0,
    sheetConfigured: Boolean(process.env.GOOGLE_SHEETS_PROMOTIONS_URL?.trim()),
  };
}
