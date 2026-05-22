import { getUserTypeById } from '../constants/userTypes';

const formatMarcas = (form, intent) => {
  if (Array.isArray(form?.marcas) && form.marcas.length > 0) {
    return form.marcas.join(', ');
  }
  if (form?.interes?.trim()) return form.interes.trim();
  if (intent?.trim()) return intent.trim();
  return '—';
};

export const buildRetailWhatsAppMessage = ({ profile, intent, source, productName }) => {
  const type = getUserTypeById(profile?.typeId);
  const lines = [
    '¡Hola San Marcos! Quiero hacer un pedido.',
    '',
    `Tipo de cliente: ${type?.label ?? 'Consumidor final'}`,
  ];

  if (intent?.trim()) lines.push(`Busco: ${intent.trim()}`);
  if (productName?.trim()) lines.push(`Producto: ${productName.trim()}`);
  if (source?.trim()) lines.push(`Vengo desde: ${source.trim()}`);

  return lines.join('\n');
};

export const buildBusinessWhatsAppMessage = ({ profile, form, intent, source }) => {
  const type = getUserTypeById(profile?.typeId);
  const lines = [
    '¡Hola San Marcos! Solicito información y acceso como cliente de negocio:',
    '',
    `Tipo de cliente: ${type?.label ?? form?.tipoNegocio ?? 'Negocio'}`,
    `Nombre: ${form.nombre}`,
    `WhatsApp: ${form.whatsapp}`,
    `Correo: ${form.email}`,
    `Nombre del negocio: ${form.nombreNegocio || '—'}`,
    `Zona / área: ${form.zona}`,
    `Marcas que busca: ${formatMarcas(form, intent)}`,
  ];

  if (form.volumen?.trim()) lines.push(`Volumen estimado: ${form.volumen}`);
  if (form.notas?.trim()) lines.push(`Notas: ${form.notas}`);
  if (source?.trim()) lines.push(`Origen: ${source}`);

  return lines.join('\n');
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
