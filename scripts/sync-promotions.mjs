/**
 * Sincroniza promociones desde Google Sheets → public/data/promotions-cache.json
 * La URL de la hoja solo se usa aquí (build), no en el navegador del visitante.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parsePromotionsCsv } from '../src/utils/promotionFromRow.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'data');
const outFile = path.join(outDir, 'promotions-cache.json');

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

// Producción primero, luego local de desarrollo
loadEnvFile(path.join(root, '.env.production.local'));
loadEnvFile(path.join(root, '.env.production'));
loadEnvFile(path.join(root, '.env.local'));
loadEnvFile(path.join(root, '.env'));

const url = process.env.VITE_GOOGLE_SHEETS_PROMOTIONS_URL?.trim();

if (!url) {
  console.log('[sync-promotions] Sin VITE_GOOGLE_SHEETS_PROMOTIONS_URL — omitido');
  process.exit(0);
}

try {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const text = await res.text();
  const promotions = parsePromotionsCsv(text);

  if (promotions.length === 0 && existsSync(outFile)) {
    const existing = JSON.parse(readFileSync(outFile, 'utf8'));
    if (Array.isArray(existing) && existing.length > 0) {
      console.warn('[sync-promotions] Hoja sin filas de datos — se mantiene caché existente');
      process.exit(0);
    }
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, JSON.stringify(promotions, null, 2), 'utf8');
  console.log(`[sync-promotions] ${promotions.length} promoción(es) → public/data/promotions-cache.json`);
} catch (err) {
  console.warn('[sync-promotions] No se pudo sincronizar:', err.message);
  process.exit(1);
}
