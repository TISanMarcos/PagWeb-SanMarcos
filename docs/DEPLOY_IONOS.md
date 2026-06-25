# Despliegue en IONOS (solo frontend estático)

## 1. Configurar producción

Copia y edita si hace falta:

```bash
cp .env.production.example .env.production.local
```

Tu archivo `.env.production.local` debe tener:

```env
VITE_WHATSAPP_NUMBER=525556943312
VITE_GOOGLE_SHEETS_PROMOTIONS_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
```

La URL de Google Sheets **solo se usa al compilar**; no aparece en el código público del sitio.

## 2. Generar build

```bash
npm install
npm run build
```

Esto sincroniza promociones desde la hoja → `public/data/promotions-cache.json` y genera `dist/`.

## 3. Subir a IONOS

1. En el panel IONOS → tu hosting web → administrador de archivos (o FTP).
2. Sube **todo el contenido** de la carpeta `dist/` a la carpeta pública del sitio.
3. Si el sitio vive en subcarpeta `/PagWeb-SanMarcos/`, sube ahí (el `base` del proyecto ya está configurado).

URL de ejemplo: `https://tudominio.com/PagWeb-SanMarcos/`

## 4. Actualizar promociones

1. Edita la hoja de Google Sheets.
2. En tu máquina: `npm run build`
3. Vuelve a subir el contenido de `dist/` a IONOS.

## Seguridad

- No subas `.env.local`, `.env.production.local` ni `node_modules/`.
- No subas `node_modules/`.
- Solo sube lo que está dentro de `dist/` después del build.

## Desarrollo local (con sincronización en vivo)

```bash
cp .env.local.example .env.local
npm run dev:sheets
```
