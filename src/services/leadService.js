const apiBase = () => import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

export const submitLead = async (payload) => {
  let response;

  try {
    response = await fetch(`${apiBase()}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Inicia el backend: cd backend && npm run dev',
    );
  }

  const raw = await response.text();
  let data = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    /* respuesta HTML del proxy o del servidor */
  }

  if (!response.ok) {
    if (data.error) throw new Error(data.error);
    if (response.status === 404) {
      throw new Error(
        'No se encontró el API de leads. ¿Tienes el backend corriendo? (cd backend && npm run dev)',
      );
    }
    if (response.status >= 500) {
      const hint = raw?.trim().slice(0, 200);
      throw new Error(
        hint && !hint.startsWith('<')
          ? hint
          : 'Error en el servidor al guardar el lead. Reinicia el backend (cd backend && npm run dev) y revisa la terminal.',
      );
    }
    throw new Error(
      raw?.slice(0, 120) || `No se pudo enviar la solicitud (código ${response.status})`,
    );
  }

  return data;
};
