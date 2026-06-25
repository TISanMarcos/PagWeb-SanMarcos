import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function sheetsProxyPlugin(sheetUrl) {
  const handler = async (_req, res) => {
    try {
      const response = await fetch(sheetUrl, {
        headers: { Accept: 'text/csv' },
      });
      const text = await response.text();
      if (!response.ok) {
        res.statusCode = response.status;
        res.end(`Error al leer Google Sheets: ${response.status}`);
        return;
      }
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(text);
    } catch (err) {
      res.statusCode = 502;
      res.end(err.message || 'Error de proxy Google Sheets');
    }
  };

  return {
    name: 'sheets-promotions-proxy',
    configureServer(server) {
      // Rutas raíz y con base (/PagWeb-SanMarcos/) para que fetch funcione en dev
      server.middlewares.use('/sheets/promotions.csv', handler);
      server.middlewares.use('/PagWeb-SanMarcos/sheets/promotions.csv', handler);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const sheetUrl = env.VITE_GOOGLE_SHEETS_PROMOTIONS_URL?.trim();
  const plugins = [react()];

  // Proxy Google Sheets solo en desarrollo (nunca en build de producción)
  if (mode === 'development' && sheetUrl) {
    plugins.push(sheetsProxyPlugin(sheetUrl));
  }

  return {
    base: '/',
    plugins,
  };
});
