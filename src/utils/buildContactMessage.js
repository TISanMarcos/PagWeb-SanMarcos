import { getUserTypeById } from '../constants/userTypes';

const formatMarcas = (form, intent) => {
  if (Array.isArray(form?.marcas) && form.marcas.length > 0) {
    return form.marcas;
  }
  if (form?.interes?.trim()) return [form.interes.trim()];
  if (intent?.trim()) return [intent.trim()];
  return [];
};

/** Une marcas en texto natural: "A, B y C" */
const joinMarcas = (marcas) => {
  if (marcas.length === 0) return '';
  if (marcas.length === 1) return marcas[0];
  if (marcas.length === 2) return `${marcas[0]} y ${marcas[1]}`;
  return `${marcas.slice(0, -1).join(', ')} y ${marcas[marcas.length - 1]}`;
};

export const buildRetailWhatsAppMessage = ({ profile, intent, productName }) => {
  const petName = profile?.petName?.trim();
  const searchParts = [intent?.trim(), productName?.trim()].filter(Boolean);
  const search = searchParts.join(', ') || profile?.intent?.trim();

  if (petName && search) {
    return `¡Hola! Les escribo porque tengo una mascota que se llama ${petName} y ando buscando ${search}. ¿Me pueden ayudar?`;
  }

  if (petName) {
    return `¡Hola! Tengo una mascota que se llama ${petName} y me gustaría hacer un pedido con ustedes. ¿Me apoyan?`;
  }

  if (search) {
    return `¡Hola! Ando buscando ${search}. ¿Tienen disponible o me pueden orientar?`;
  }

  return '¡Hola! Me gustaría hacer un pedido. ¿Me pueden ayudar?';
};

export const buildBusinessWhatsAppMessage = ({ profile, form, intent }) => {
  const negocio = form.nombreNegocio?.trim();
  const ubicacion = form.ubicacion?.trim() || form.zona?.trim();
  const marcas = joinMarcas(formatMarcas(form, intent));

  if (negocio && ubicacion && marcas) {
    return `¡Hola! Les escribo de ${negocio}, en ${ubicacion}. Me interesa surtir ${marcas} — ¿me apoyan con una cotización?`;
  }

  if (negocio && marcas) {
    return `¡Hola! Les escribo de ${negocio}. Ando buscando surtir ${marcas}. ¿Me pueden cotizar?`;
  }

  if (negocio && ubicacion) {
    return `¡Hola! Tengo ${negocio} en ${ubicacion} y me gustaría surtir con ustedes. ¿Me dan información?`;
  }

  const type = getUserTypeById(profile?.typeId);
  const tipo = type?.label?.toLowerCase() ?? 'negocio';

  return `¡Hola! Tengo un ${tipo} y me gustaría surtir con ustedes. ¿Me pueden orientar?`;
};

export const buildLeadEmailBody = ({ profile, form, intent, source }) => {
  const type = getUserTypeById(profile?.typeId);
  const marcasList = formatMarcas(form, intent);
  const marcasText = marcasList.length > 0 ? joinMarcas(marcasList) : '—';

  return [
    'Nuevo lead — San Marcos Mascotas',
    '────────────────────────────',
    `Tipo: ${type?.label ?? '—'}`,
    `Nombre: ${form.nombre}`,
    `WhatsApp: ${form.whatsapp}`,
    `Correo: ${form.email}`,
    `Negocio: ${form.nombreNegocio || '—'}`,
    `Código postal: ${form.ubicacion || form.zona || '—'}`,
    `Marcas que busca: ${marcasText}`,
    form.volumen ? `Volumen: ${form.volumen}` : null,
    form.notas ? `Notas: ${form.notas}` : null,
    source ? `Origen web: ${source}` : null,
    `Fecha: ${new Date().toLocaleString('es-MX')}`,
  ]
    .filter(Boolean)
    .join('\n');
};
