# Promociones con Google Sheets

Marketing edita una hoja de cálculo; al compilar el sitio se sincronizan las promociones a un JSON estático (sin backend en IONOS).

## Paso 1 — Crear la hoja

1. Entra a [Google Sheets](https://sheets.google.com) con la cuenta de San Marcos.
2. Crea un libro nuevo llamado **San Marcos — Promociones**.
3. En la primera fila (encabezados), pega **exactamente** estas columnas:

```
id | title | description | segment | active | couponCode | imageUrl | imageEmoji | colorStart | colorEnd | startDate | endDate
```

## Paso 2 — Agregar promociones

Debajo de los encabezados, agrega una fila por promoción. Ejemplo:

| id | title | description | segment | active | couponCode | imageEmoji |
|----|-------|-------------|---------|--------|------------|------------|
| promo-envio | ¡ENVÍO GRATIS! | Compras mayores a $999 | both | TRUE | ENVIO-ZERO | 🚚 |

### Significado de cada columna

| Columna | Obligatorio | Ejemplo | Notas |
|---------|-------------|---------|--------|
| `id` | Sí | `promo-envio` | Único, sin espacios. No repetir. |
| `title` | Sí | `¡ENVÍO GRATIS!` | Título en la web |
| `description` | Sí | `Compras mayores a $999` | Texto corto |
| `segment` | Sí | `b2c`, `b2b` o `both` | Quién la ve |
| `active` | Sí | `TRUE` o `FALSE` | `FALSE` = oculta sin borrar |
| `couponCode` | No | `ENVIO-ZERO` | Código para copiar |
| `imageUrl` | No | `https://...` | Foto de la promo (prioridad). URL https, ruta local o Drive |
| `imageEmoji` | No | `🚚` | Solo si `imageUrl` está vacío |
| `colorStart` | No | `#f06020` | Con emoji: color fondo |
| `colorEnd` | No | `#d9541a` | Con emoji: color fondo |
| `startDate` | No | `2026-05-01` | Vacío = desde ya |
| `endDate` | No | `2026-05-31` | Vacío = sin fecha fin |

## Paso 3 — Publicar la hoja para la web

1. **Archivo → Compartir → Publicar en la web**.
2. En “Contenido vinculado”, elige la hoja correcta (ej. `Hoja 1`).
3. Formato: **Valores separados por comas (.csv)**.
4. Clic en **Publicar** y copia la URL.

La URL se parece a:

```
https://docs.google.com/spreadsheets/d/e/2PACX-1v.../pub?gid=0&single=true&output=csv
```

## Paso 4 — Configurar el proyecto

### Desarrollo local (sincronización en vivo)

```bash
cp .env.local.example .env.local
# Edita .env.local y pega tu URL CSV
npm run dev:sheets
```

### Producción (build para IONOS)

```bash
cp .env.production.example .env.production.local
# Edita .env.production.local con tu URL CSV y WhatsApp
npm run build
```

La URL de Google Sheets **solo se usa al compilar** (`scripts/sync-promotions.mjs`). No aparece en el JavaScript público del sitio.

## Paso 5 — Ver en la página

- **Local:** abre Promociones tras `npm run dev:sheets` (actualiza cada ~15 s).
- **Producción:** el sitio lee `data/promotions-cache.json` generado en el build.

---

## Cómo gestionar promociones (para marketing)

| Acción | Qué hacer |
|--------|-----------|
| **Nueva promo** | Agregar fila con `active = TRUE` en la hoja |
| **Pausar** | Cambiar `active` a `FALSE` |
| **Eliminar** | Borrar la fila |
| **Publicar en web** | `npm run build` y subir nuevo `dist/` a IONOS |

En producción los cambios **no son instantáneos**: hay que volver a compilar y subir el sitio.

---

## Despliegue en IONOS

Solo frontend estático. Ver [DEPLOY_IONOS.md](./DEPLOY_IONOS.md).

```bash
npm run build
# Sube todo el contenido de dist/ al hosting
```

---

## Solución de problemas

- **Hoja solo con encabezados:** agrega al menos una fila con `id` y `active=TRUE`.
- **Build con 0 promos pero ya tenías datos:** el script mantiene el caché anterior si la hoja está vacía.
- **No carga en local:** verifica `.env.local` y usa `npm run dev:sheets`.
- **No carga en producción:** vuelve a hacer `npm run build` y sube `dist/`.
- **URL incorrecta:** usa la de “Publicar en la web” en formato CSV, no el enlace de edición.
