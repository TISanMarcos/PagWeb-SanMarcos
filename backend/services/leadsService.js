import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEADS_FILE = path.join(__dirname, '../data/leads.json');

function ensureLeadsFile() {
  const dir = path.dirname(LEADS_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(LEADS_FILE)) writeFileSync(LEADS_FILE, '[]', 'utf8');
}

function readLeadsList() {
  ensureLeadsFile();
  const raw = readFileSync(LEADS_FILE, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('leads.json no es un arreglo');
    return parsed;
  } catch (err) {
    const backup = `${LEADS_FILE}.corrupt-${Date.now()}.bak`;
    copyFileSync(LEADS_FILE, backup);
    console.error('[leads] leads.json dañado, respaldo en', backup, err.message);
    return [];
  }
}

function writeLeadsList(list) {
  const tmp = `${LEADS_FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(list, null, 2), 'utf8');
  renameSync(tmp, LEADS_FILE);
}

export function saveLeadLocally(lead) {
  const list = readLeadsList();
  list.push({ ...lead, savedAt: new Date().toISOString() });
  writeLeadsList(list);
}

export async function appendLeadToGoogleSheet(lead) {
  const url = process.env.GOOGLE_APPS_SCRIPT_LEADS_URL?.trim();
  if (!url) return { skipped: true, reason: 'no_apps_script_url' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      redirect: 'follow',
      signal: controller.signal,
    });

    const text = await res.text();
    if (!res.ok) {
      return { ok: false, error: `Apps Script ${res.status}: ${text.slice(0, 200)}` };
    }

    try {
      return text ? JSON.parse(text) : { ok: true };
    } catch {
      return { ok: true, raw: text.slice(0, 100) };
    }
  } catch (err) {
    const message =
      err.name === 'AbortError'
        ? 'Tiempo de espera agotado al conectar con Google Sheets'
        : err.message;
    return { ok: false, error: message };
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendLeadEmail(lead, bodyText) {
  const to = process.env.LEADS_EMAIL_TO?.trim();
  const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim();

  if (!to || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[leads] Email no configurado. Cuerpo:\n', bodyText);
    return { skipped: true, reason: 'smtp_not_configured' };
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: from || process.env.SMTP_USER,
      to,
      subject: `[San Marcos] Nuevo lead — ${lead.userTypeLabel || lead.tipoCliente}`,
      text: bodyText,
    });
    return { messageId: info.messageId };
  } catch (err) {
    console.error('[leads] Error SMTP:', err.message);
    return { ok: false, error: err.message };
  }
}
