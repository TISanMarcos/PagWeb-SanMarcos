# Leads en Google Sheets — guía detallada

Esta guía conecta el **formulario de negocios** de la web con tu hoja de Google Sheets.

---

## Parte 1 — Preparar la hoja

### 1.1 Nombre del libro y pestaña

- Puedes llamar al archivo como quieras (ej. **San Marcos — Leads**).
- **Importante:** la pestaña (tab) de abajo debe llamarse **`Leads`**  
  (clic derecho en la pestaña → Renombrar).

  Si prefieres otro nombre (ej. `Hoja 1`), cambia en el script la línea  
  `getSheetByName('Leads')` por el nombre de tu pestaña.

### 1.2 Fila 1 — encabezados

En la **fila 1**, una columna por celda (de la A a la L):

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| fecha | userTypeId | userTypeLabel | nombre | whatsapp | email | nombreNegocio | zona | interes | volumen | notas | source |

Solo son etiquetas para ti; el script escribe los datos en ese orden.

### ⚠️ Error muy común: URL vieja vs URL nueva

Cada vez que haces **Nueva implementación**, Google genera una URL **distinta** (`.../macros/s/OTRO_CODIGO/exec`).

- El `curl` debe usar **la URL de la implementación más reciente**.
- Si sigues usando una URL antigua, verás errores viejos (ej. ID ilegal con `https://...` en línea 4).
- Abrir la URL en el **navegador** (GET) puede mostrar `Script function not found: doGet` — **es normal**; la web usa **POST**, no GET.

### 1.3 ID de tu hoja (útil si no encuentras Extensiones)

Abre tu hoja en el navegador. La URL se ve así:

```
https://docs.google.com/spreadsheets/d/1ABCxyzTU_ID_AQUI/edit#gid=0
```

Copia el texto entre `/d/` y `/edit` — ese es tu **SPREADSHEET_ID**.

---

## Parte 2 — Abrir Apps Script (si no ves «Extensiones»)

Google cambia el menú según idioma y cuenta. Prueba **en este orden**:

### Opción A — Menú superior (lo más común)

1. Abre la hoja en **Chrome o Edge** (no en la app móvil).
2. Menú superior de Google Sheets:
   - Español: **Extensiones** → **Apps Script**
   - Inglés: **Extensions** → **Apps Script**
3. Se abre una pestaña nueva: `script.google.com` con un proyecto ligado a tu hoja.

### Opción B — Menú «Herramientas»

Algunas cuentas lo tienen aquí:

- **Herramientas** → **Editor de secuencias de comandos**  
  o **Tools** → **Script editor**

### Opción C — Desde script.google.com (sin Extensiones)

1. Entra a [https://script.google.com](https://script.google.com)
2. **Nuevo proyecto**
3. Borra el código de ejemplo y pega el de la **Parte 3** (versión con `SPREADSHEET_ID`).
4. Sustituye `PEGA_TU_SPREADSHEET_ID` por el ID de la Parte 1.3.
5. **Guardar** (icono disco o Ctrl+S / Cmd+S).

### Opción D — Atajo directo

Con la hoja abierta, prueba en la barra de direcciones:

```
https://script.google.com/home/projects/create?parent=PEGA_TU_SPREADSHEET_ID
```

(Reemplaza `PEGA_TU_SPREADSHEET_ID` por tu ID real.)

---

## Parte 3 — Código del script

### Si abriste Apps Script **desde la hoja** (Opción A o B)

Pega esto en `Código.gs` y guarda:

```javascript
function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') ||
    SpreadsheetApp.getActiveSheet();

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.userTypeId || '',
    data.userTypeLabel || '',
    data.nombre || '',
    data.whatsapp || '',
    data.email || '',
    data.nombreNegocio || '',
    data.zona || '',
    data.interes || '',
    data.volumen || '',
    data.notas || '',
    data.source || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Si creaste el proyecto en **script.google.com** (Opción C)

Usa este código y **cambia el ID**:

```javascript
const SPREADSHEET_ID = 'PEGA_TU_SPREADSHEET_ID';

function doPost(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Leads') || ss.getSheets()[0];

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.userTypeId || '',
    data.userTypeLabel || '',
    data.nombre || '',
    data.whatsapp || '',
    data.email || '',
    data.nombreNegocio || '',
    data.zona || '',
    data.interes || '',
    data.volumen || '',
    data.notas || '',
    data.source || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Parte 4 — Autorizar el script (primera vez)

1. En Apps Script, arriba, elige la función **`doPost`** en el desplegable (si aparece) o solo guarda.
2. Clic en **Ejecutar** (▶). Google pedirá permisos:
   - **Revisar permisos** → tu cuenta → **Avanzado** → **Ir a … (no seguro)** → **Permitir**
3. Esto solo autoriza que el script pueda escribir en **tu** hoja.

---

## Parte 5 — Publicar como «Aplicación web»

La interfaz puede decir **Implementar** o **Deploy** (inglés).

1. Arriba a la derecha: **Implementar** → **Nueva implementación**
2. En **Tipo**, elige **Aplicación web** / **Web app**
3. Configura:
   - **Descripción:** Leads San Marcos (opcional)
   - **Ejecutar como:** **Yo** (tu correo)
   - **Quién tiene acceso:** **Cualquier persona** / **Anyone**
4. **Implementar** / **Deploy**
5. Si pide autorización otra vez, acéptala.
6. Copia la **URL de la aplicación web**. Debe terminar en **`/exec`**  
   Ejemplo: `https://script.google.com/macros/s/AKfycb.../exec`

Guarda esa URL; es la que va en el backend.

---

## Parte 6 — Conectar el backend

1. Abre `backend/.env` (si no existe: `cp backend/.env.example backend/.env`).
2. Agrega o edita:

```env
GOOGLE_APPS_SCRIPT_LEADS_URL=https://script.google.com/macros/s/TU_CODIGO_AQUI/exec
```

3. Reinicia el backend:

```bash
cd backend
npm run dev
```

---

## Parte 7 — Probar que funciona

### Prueba 1 — Con curl (terminal)

```bash
curl -X POST "https://script.google.com/macros/s/TU_URL/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "userTypeId": "tienda_mascotas",
    "userTypeLabel": "Tienda de mascotas",
    "nombre": "Prueba Test",
    "whatsapp": "5512345678",
    "email": "prueba@test.com",
    "nombreNegocio": "Pet Shop Demo",
    "zona": "CDMX",
    "interes": "Croquetas premium",
    "volumen": "",
    "notas": "Lead de prueba",
    "source": "prueba-manual"
  }'
```

Debe aparecer **una fila nueva** en tu hoja `Leads`.

### Prueba 2 — Desde la web

1. Frontend y backend en marcha.
2. En el sitio: elige un tipo de **negocio** (no consumidor final).
3. Llena el formulario de registro y envía.
4. Revisa la hoja y, si configuraste SMTP, el correo en `LEADS_EMAIL_TO`.

### Prueba 3 — API local

```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "userTypeId": "mayorista",
    "userTypeLabel": "Cliente mayorista",
    "nombre": "Ana Prueba",
    "whatsapp": "5599887766",
    "email": "ana@test.com",
    "nombreNegocio": "Distribuidora Norte",
    "zona": "Monterrey",
    "interes": "Tarimas",
    "source": "test-api"
  }'
```

---

## Parte 8 — Correo (opcional pero recomendado)

En `backend/.env`:

```env
LEADS_EMAIL_TO=ventas@sanmarcos.com.mx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-correo@gmail.com
SMTP_PASS=contraseña-de-aplicacion-de-16-caracteres
SMTP_FROM=San Marcos Web <tu-correo@gmail.com>
```

Gmail: [Contraseñas de aplicación](https://myaccount.google.com/apppasswords) (con verificación en 2 pasos activada).

Si no configuras SMTP, el lead **sigue guardándose** en la hoja y en `backend/data/leads.json`.

---

## Problemas frecuentes

| Problema | Qué hacer |
|----------|-----------|
| No veo **Extensiones** | Usa **Opción C** (script.google.com) con el ID de la hoja |
| Error 401 / 403 al publicar | Vuelve a implementar con acceso **Cualquier persona** |
| No llegan filas | URL debe terminar en `/exec`, no `/dev` |
| Hoja vacía pero curl OK | Revisa que la pestaña se llame `Leads` o ajusta el script |
| Solo funciona en `/dev` | Crea **Nueva implementación** y usa la URL de **producción** (`/exec`) |
| Backend dice `sheet error` | Revisa la URL en `.env` y reinicia `npm run dev` |

---

## Resumen del flujo completo

```
Usuario negocio llena formulario en la web
        ↓
POST /api/leads (backend)
        ↓
    ┌───┴───┐
    ↓       ↓
 Correo   Google Sheets (Apps Script doPost)
    ↓       ↓
  SMTP    Nueva fila en hoja Leads
        ↓
WhatsApp se abre con el mismo texto (en el navegador del usuario)
```

Si me compartes una captura de tu menú superior de Google Sheets (o si está en inglés), te indico el clic exacto en tu pantalla.
