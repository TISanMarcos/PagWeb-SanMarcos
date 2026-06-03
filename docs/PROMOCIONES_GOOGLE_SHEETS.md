# Promociones con Google Sheets

Marketing edita una hoja de cálculo; la web lee los cambios automáticamente (sin tocar código).

## Paso 1 — Crear la hoja

1. Entra a [Google Sheets](https://sheets.google.com) con la cuenta de San Marcos.
2. Crea un libro nuevo llamado **San Marcos — Promociones**.
3. En la primera fila (encabezados), pega **exactamente** estas columnas:

```
id | title | description | segment | active | couponCode | imageUrl | imageEmoji | colorStart | colorEnd | startDate | endDate
```

## Paso 2 — Importar los datos de ejemplo

1. Abre el archivo `backend/data/promotions-seed.csv` de este proyecto.
2. En Google Sheets: **Archivo → Importar → Subir** y selecciona `promotions-seed.csv`.
3. Elige **Reemplazar hoja actual** (o pegar los datos debajo de los encabezados).
4. Deberías ver las 6 promociones demo que ya tenía la página.

### Significado de cada columna

| Columna | Obligatorio | Ejemplo | Notas |
|---------|-------------|---------|--------|
| `id` | Sí | `promo-envio` | Único, sin espacios. No repetir. |
| `title` | Sí | `¡ENVÍO GRATIS!` | Título en la web |
| `description` | Sí | `Compras mayores a $999` | Texto corto |
| `segment` | Sí | `b2c`, `b2b` o `both` | Quién la ve |
| `active` | Sí | `TRUE` o `FALSE` | `FALSE` = oculta sin borrar |
| `couponCode` | No | `ENVIO-ZERO` | Código para copiar |
| `imageUrl` | No | `https://...` | **Foto de la promo** (prioridad). URL https, ruta `/public/...` o enlace de Drive |
| `imageEmoji` | No | `🚚` | Solo si `imageUrl` está vacío: ícono con fondo de colores |
| `colorStart` | No | `#f06020` | Con emoji: color fondo (gradiente) |
| `colorEnd` | No | `#d9541a` | Con emoji: color fondo (gradiente) |
| `startDate` | No | `2026-05-01` | Vacío = desde ya |
| `endDate` | No | `2026-05-31` | Vacío = sin fecha fin |

**Imagen:** si `imageUrl` tiene un enlace válido, la web muestra esa foto. Si está vacío, se usa `imageEmoji` + `colorStart` / `colorEnd` como antes.

## Paso 3 — Publicar la hoja para la web

1. **Archivo → Compartir → Publicar en la web**.
2. En “Contenido vinculado”, elige la hoja correcta (ej. `Hoja 1`).
3. Formato: **Valores separados por comas (.csv)**.
4. Clic en **Publicar** y copia la URL que te da Google.

La URL se parece a:

```
https://docs.google.com/spreadsheets/d/e/2PACX-1v.../pub?gid=0&single=true&output=csv
```

## Paso 4 — Conectar el backend

1. En la carpeta `backend/`, copia el ejemplo de entorno:

```bash
cp .env.example .env
```

2. Edita `backend/.env` y pega tu URL:

```
GOOGLE_SHEETS_PROMOTIONS_URL=https://docs.google.com/spreadsheets/d/e/TU_ID/pub?gid=0&single=true&output=csv
```

3. Reinicia el backend:

```bash
cd backend
npm run dev
```

4. Prueba en el navegador o terminal:

```bash
curl http://localhost:3001/api/promotions
curl http://localhost:3001/api/promotions/status
```

`status` debe mostrar `"source": "google-sheets"`.

## Paso 5 — Ver en la página

1. Arranca el frontend (`npm run dev` en la raíz del proyecto).
2. Abre **Promociones** en el menú.
3. Deberías ver las mismas 6 promos que en la hoja.

---

## Cómo gestionar promociones (para marketing)

| Acción | Qué hacer en la hoja |
|--------|----------------------|
| **Nueva promo** | Agregar una fila con `active = TRUE` |
| **Pausar** | Cambiar `active` a `FALSE` |
| **Eliminar** | Borrar la fila |
| **Vigencia** | Llenar `startDate` y/o `endDate` (formato `AAAA-MM-DD`) |

Los cambios pueden tardar hasta **1 minuto** en verse (caché del servidor). Para forzar actualización inmediata:

```bash
curl -X POST http://localhost:3001/api/promotions/refresh
```

---

## Sin Google Sheets (modo local)

Si no configuras `.env`, el backend usa `backend/data/promotions-seed.csv` (mismos datos demo).

---

## Solución de problemas

- **Sigue viendo datos viejos:** reinicia `npm run dev` en `backend/` y llama a `/api/promotions/refresh`.
- **Hoja vacía o error:** revisa que la fila 1 tenga los encabezados exactos y que cada promo tenga `id`.
- **No carga la hoja:** la URL debe ser la de “Publicar en la web” en formato CSV, no solo el enlace de edición.
