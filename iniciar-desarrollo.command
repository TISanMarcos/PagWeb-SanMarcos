#!/bin/bash
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Iniciando frontend San Marcos..."
echo ""

chmod +x "$ROOT/node_modules/.bin/"* 2>/dev/null

osascript <<EOF
tell application "Terminal"
  do script "cd \"$ROOT\" && npm run dev"
  activate
end tell
EOF

echo "Frontend: http://localhost:5173/PagWeb-SanMarcos/"
echo ""
echo "Google Sheets: cp .env.local.example .env.local y pega tu URL CSV"
echo "Luego: npm run dev:sheets"
read -p "Presiona Enter para cerrar esta ventana..."
