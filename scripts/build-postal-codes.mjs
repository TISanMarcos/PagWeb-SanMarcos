/**
 * Genera public/data/postal-codes/{prefijo}.json desde CP.xml (SEPOMEX).
 * Uso: node scripts/build-postal-codes.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const xmlPath = path.join(root, 'CP.xml');
const outDir = path.join(root, 'public', 'data', 'postal-codes');

const getTag = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}>([^<]*)</${tag}>`, 'i'));
  return m ? m[1].trim() : '';
};

if (!fs.existsSync(xmlPath)) {
  console.error('No se encontró CP.xml en la raíz del proyecto.');
  process.exit(1);
}

console.log('Leyendo CP.xml…');
const xml = fs.readFileSync(xmlPath, 'utf8');
const parts = xml.split('</table>');
const index = new Map();

for (const part of parts) {
  if (!part.includes('<d_codigo>')) continue;

  const cp = getTag(part, 'd_codigo');
  if (!/^\d{5}$/.test(cp)) continue;

  const entry = {
    a: getTag(part, 'd_asenta'),
    m: getTag(part, 'D_mnpio'),
    e: getTag(part, 'd_estado'),
  };

  if (!entry.a) continue;

  if (!index.has(cp)) index.set(cp, []);
  const list = index.get(cp);
  const key = `${entry.a}|${entry.m}|${entry.e}`;
  if (!list.some((e) => `${e.a}|${e.m}|${e.e}` === key)) {
    list.push(entry);
  }
}

const chunks = new Map();
for (const [cp, entries] of index) {
  const prefix = cp.slice(0, 2);
  if (!chunks.has(prefix)) chunks.set(prefix, {});
  chunks.get(prefix)[cp] = entries;
}

fs.mkdirSync(outDir, { recursive: true });
for (const stale of fs.readdirSync(outDir)) {
  if (stale.endsWith('.json')) fs.unlinkSync(path.join(outDir, stale));
}

for (const [prefix, data] of [...chunks.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  fs.writeFileSync(path.join(outDir, `${prefix}.json`), JSON.stringify(data));
}

console.log(`Listo: ${index.size} códigos en ${chunks.size} archivos → ${outDir}`);
