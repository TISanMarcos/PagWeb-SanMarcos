/**
 * Verifica que .env.local tenga la URL de Google Sheets antes de npm run dev.
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envLocal = path.join(root, '.env.local');
const example = path.join(root, '.env.local.example');

if (!existsSync(envLocal)) {
  if (existsSync(example)) {
    copyFileSync(example, envLocal);
    console.log('→ Edita .env.local y pega tu VITE_GOOGLE_SHEETS_PROMOTIONS_URL');
    process.exit(1);
  }
  writeFileSync(
    envLocal,
    `VITE_WHATSAPP_NUMBER=525556943312\nVITE_GOOGLE_SHEETS_PROMOTIONS_URL=\nVITE_PROMOTIONS_POLL_MS=15000\n`,
    'utf8',
  );
  console.log('→ Creado .env.local — pega tu VITE_GOOGLE_SHEETS_PROMOTIONS_URL');
  process.exit(1);
}

const content = readFileSync(envLocal, 'utf8');
const match = content.match(/^VITE_GOOGLE_SHEETS_PROMOTIONS_URL\s*=\s*(.*)$/m);
const url = match?.[1]?.trim().replace(/^["']|["']$/g, '') || '';

const invalid =
  !url ||
  url.includes('TU_ID') ||
  url.includes('Pega_aqui') ||
  !url.includes('docs.google.com/spreadsheets');

if (invalid) {
  console.error('\n❌ VITE_GOOGLE_SHEETS_PROMOTIONS_URL no está configurada correctamente.\n');
  console.error('Valor leído:', url || '(vacío)');
  console.error('\nEn .env.local debe quedar UNA línea así (sin comillas, sin espacios extra):\n');
  console.error(
    'VITE_GOOGLE_SHEETS_PROMOTIONS_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1v.../pub?gid=0&single=true&output=csv\n',
  );
  console.error('Obtén la URL en Google Sheets → Archivo → Compartir → Publicar en la web → CSV.\n');
  console.error('Mientras tanto puedes ver el sitio con: npm run dev\n');
  process.exit(1);
}

console.log('✓ Google Sheets URL configurada para desarrollo local');
