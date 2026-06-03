import express from 'express';
import cors from 'cors';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { mockProducts, mockUsersDB } from './data/mockDB.js';
import {
  getPromotions,
  clearPromotionsCache,
  getPromotionsSource,
} from './services/promotionsFromSheet.js';
import {
  saveLeadLocally,
  appendLeadToGoogleSheet,
  sendLeadEmail,
} from './services/leadsService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

process.on('unhandledRejection', (err) => {
  console.error('[unhandledRejection]', err);
});

const app = express();
app.use(cors());
app.use(express.json());

// Catalog Endpoint
app.get('/api/products/:segment', (req, res) => {
  const { segment } = req.params;

  setTimeout(() => {
    if (segment === 'admin') return res.json(mockProducts);
    const filtered = mockProducts.filter((p) => p.segment === 'both' || p.segment === segment);
    res.json(filtered);
  }, 500);
});

// Promotions — Google Sheets (CSV publicado) o seed local
app.get('/api/promotions', async (req, res) => {
  try {
    const promotions = await getPromotions();
    res.json(promotions);
  } catch (err) {
    console.error('[promotions]', err);
    res.status(500).json({ error: 'No se pudieron cargar las promociones' });
  }
});

app.get('/api/promotions/status', async (_req, res) => {
  try {
    await getPromotions();
    res.json(getPromotionsSource());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/promotions/refresh', async (_req, res) => {
  clearPromotionsCache();
  try {
    const promotions = await getPromotions();
    res.json({ ok: true, count: promotions.length, ...getPromotionsSource() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth / User Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;

  setTimeout(() => {
    let user = mockUsersDB.find((u) => u.email === email);

    if (!user) {
      user = {
        uid: `usr_${Date.now()}`,
        email,
        role: role || 'b2c',
        name: email.split('@')[0],
        ...(role === 'b2b' && {
          credit: {
            allocated: 0,
            currentDebt: 0,
            available: 0,
            validUntil: 'Pendiente',
            status: 'Suspendido',
          },
        }),
      };
      mockUsersDB.push(user);
    }
    res.json(user);
  }, 800);
});

// Leads — correo + Google Sheets (Apps Script) + respaldo local
app.post('/api/leads', async (req, res) => {
  try {
    const {
      userTypeId,
      userTypeLabel,
      nombre,
      whatsapp,
      email,
      nombreNegocio,
      zona,
      interes,
      volumen,
      notas,
      intent,
      source,
      emailBody,
    } = req.body;

    if (!nombre?.trim() || !whatsapp?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Nombre, WhatsApp y correo son obligatorios' });
    }

    const lead = {
      userTypeId: userTypeId || '',
      userTypeLabel: userTypeLabel || '',
      nombre: nombre.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      nombreNegocio: (nombreNegocio || '').trim(),
      zona: (zona || '').trim(),
      interes: (interes || intent || '').trim(),
      volumen: (volumen || '').trim(),
      notas: (notas || '').trim(),
      source: (source || 'web').trim(),
    };

    try {
      saveLeadLocally(lead);
    } catch (saveErr) {
      console.error('[leads] saveLeadLocally', saveErr);
      return res.status(500).json({
        error: `No se pudo guardar el lead localmente: ${saveErr.message}`,
      });
    }

    const bodyText =
      emailBody ||
      [
        'Nuevo lead — San Marcos Mascotas',
        `Tipo: ${lead.userTypeLabel}`,
        `Nombre: ${lead.nombre}`,
        `WhatsApp: ${lead.whatsapp}`,
        `Correo: ${lead.email}`,
        `Negocio: ${lead.nombreNegocio || '—'}`,
        `Zona: ${lead.zona}`,
        `Interés: ${lead.interes}`,
        lead.volumen ? `Volumen: ${lead.volumen}` : null,
        lead.notas ? `Notas: ${lead.notas}` : null,
        `Origen: ${lead.source}`,
      ]
        .filter(Boolean)
        .join('\n');

    const [emailResult, sheetResult] = await Promise.allSettled([
      sendLeadEmail(lead, bodyText),
      appendLeadToGoogleSheet(lead),
    ]);

    res.json({
      ok: true,
      leadId: `lead_${Date.now()}`,
      email: emailResult.status === 'fulfilled' ? emailResult.value : { error: emailResult.reason?.message },
      sheet: sheetResult.status === 'fulfilled' ? sheetResult.value : { error: sheetResult.reason?.message },
    });
  } catch (err) {
    console.error('[leads]', err);
    res.status(500).json({ error: err.message || 'Error al registrar el lead' });
  }
});

// --- Admin Endpoints ---

app.get('/api/clients', (req, res) => {
  res.json(mockUsersDB.filter((u) => u.role !== 'admin'));
});

app.patch('/api/clients/:uid/credit', (req, res) => {
  const { uid } = req.params;
  const { updateField, value } = req.body;

  const user = mockUsersDB.find((u) => u.uid === uid);
  if (user && user.credit) {
    user.credit[updateField] = value;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found or no credit profile' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'san-marcos-backend' });
});

const PORT = 3001;
const server = app.listen(PORT, () => {
  const configured = Boolean(process.env.GOOGLE_SHEETS_PROMOTIONS_URL?.trim());
  console.log(`Zona.Pet Backend API → http://localhost:${PORT}`);
  console.log(
    configured
      ? 'Promociones: Google Sheets (CSV publicado)'
      : 'Promociones: seed local (configura GOOGLE_SHEETS_PROMOTIONS_URL en backend/.env)',
  );
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Puerto ${PORT} en uso. Cierra el otro proceso o usa: lsof -i :${PORT}`);
  } else {
    console.error('[server]', err);
  }
  process.exit(1);
});
