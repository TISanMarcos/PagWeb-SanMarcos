/**
 * Crea .env.local para pruebas con Google Sheets (sin usar cp manual).
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envLocal = path.join(root, '.env.local');
const example = path.join(root, '.env.local.example');

const defaultContent = `# Pruebas locales — Google Sheets

VITE_WHATSAPP_NUMBER=525556943312
VITE_GOOGLE_SHEETS_PROMOTIONS_URL=https://docs.google.com/spreadsheets/d/e/TU_ID/pub?gid=0&single=true&output=csv
VITE_PROMOTIONS_POLL_MS=15000
`;

if (existsSync(envLocal)) {
  const current = readFileSync(envLocal, 'utf8');
  if (!/VITE_GOOGLE_SHEETS_PROMOTIONS_URL=/m.test(current)) {
    writeFileSync(envLocal, `${current.trim()}\n\n${defaultContent}`, 'utf8');
    console.log('✓ Agregadas variables de Google Sheets a .env.local existente');
  } else {
    console.log('• .env.local ya existe');
  }
} else if (existsSync(example)) {
  copyFileSync(example, envLocal);
  console.log('✓ Creado .env.local desde .env.local.example');
} else {
  writeFileSync(envLocal, defaultContent, 'utf8');
  console.log('✓ Creado .env.local con plantilla por defecto');
}

console.log('\nEdita .env.local y pega tu VITE_GOOGLE_SHEETS_PROMOTIONS_URL');
console.log('Luego ejecuta: npm run dev:sheets\n');
