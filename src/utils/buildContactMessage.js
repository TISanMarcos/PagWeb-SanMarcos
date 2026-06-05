import { getUserTypeById } from '../constants/userTypes';

const formatMarcas = (form, intent) => {
  if (Array.isArray(form?.marcas) && form.marcas.length > 0) {
    return form.marcas.join(', ');
  }
  if (form?.interes?.trim()) return form.interes.trim();
  if (intent?.trim()) return intent.trim();
  return '—';
};

export const buildRetailWhatsAppMessage = ({ profile, intent, productName }) => {
  const petName = profile?.petName?.trim();
  const searchParts = [intent?.trim(), productName?.trim()].filter(Boolean);
  const search = searchParts.join(', ') || profile?.intent?.trim();

  if (petName && search) {
    return `¡Hola San Marcos! Tengo un amig@ llamado ${petName}, estoy buscando: ${search}.`;
  }

  if (petName) {
    return `¡Hola San Marcos! Tengo un amig@ llamado ${petName} y me gustaría hacer un pedido.`;
  }

  if (search) {
    return `¡Hola San Marcos! Estoy buscando: ${search}.`;
  }

  return '¡Hola San Marcos! Me gustaría hacer un pedido.';
};

export const buildBusinessWhatsAppMessage = ({ profile, form, intent }) => {
  const type = getUserTypeById(profile?.typeId);
  const negocio = form.nombreNegocio?.trim();
  const zona = form.zona?.trim();
  const marcas = formatMarcas(form, intent);
  const tipo = type?.label ?? 'negocio';

  if (negocio && zona && marcas !== '—') {
    return `¡Hola San Marcos! Tengo un ${tipo.toLowerCase()} llamado ${negocio}, en ${zona}, y busco surtir marcas como ${marcas}.`;
  }

  if (negocio && marcas !== '—') {
    return `¡Hola San Marcos! Tengo un ${tipo.toLowerCase()} llamado ${negocio} y busco surtir marcas como ${marcas}.`;
  }

  return `¡Hola San Marcos! Soy ${tipo.toLowerCase()} y me gustaría información para surtir con ustedes.`;
};

export const buildLeadEmailBody = ({ profile, form, intent, source }) => {
  const type = getUserTypeById(profile?.typeId);
  return [
    'Nuevo lead — San Marcos Mascotas',
    '────────────────────────────',
    `Tipo: ${type?.label ?? '—'}`,
    `Nombre: ${form.nombre}`,
    `WhatsApp: ${form.whatsapp}`,
    `Correo: ${form.email}`,
    `Negocio: ${form.nombreNegocio || '—'}`,
    `Zona: ${form.zona}`,
    `Marcas que busca: ${formatMarcas(form, intent)}`,
    form.volumen ? `Volumen: ${form.volumen}` : null,
    form.notas ? `Notas: ${form.notas}` : null,
    source ? `Origen web: ${source}` : null,
    `Fecha: ${new Date().toLocaleString('es-MX')}`,
  ]
    .filter(Boolean)
    .join('\n');
};
