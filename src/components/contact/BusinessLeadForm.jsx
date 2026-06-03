import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useAppStore } from '../../store/useAppStore';
import { getUserTypeById } from '../../constants/userTypes';
import { submitLead } from '../../services/leadService';
import { buildBusinessWhatsAppMessage, buildLeadEmailBody } from '../../utils/buildContactMessage';
import { whatsAppUrl } from '../../constants/whatsapp';
import BrandMultiSelect from './BrandMultiSelect';
import { partnerBrandNames } from '../../data/partnerBrands';

const emptyForm = {
  nombre: '',
  whatsapp: '',
  email: '',
  nombreNegocio: '',
  zona: '',
  marcas: [],
  volumen: '',
  notas: '',
  privacidad: false,
};

const BusinessLeadForm = ({ source = 'formulario-negocio', onSuccess }) => {
  const userProfile = useAppStore((s) => s.userProfile);
  const [form, setForm] = useState(emptyForm);
  const showThankYouModal = useAppStore((s) => s.showThankYouModal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const businessType = userProfile ? getUserTypeById(userProfile.typeId) : null;
  const showVolume = ['mayorista', 'revendedor_alimentos'].includes(userProfile?.typeId);

  useEffect(() => {
    const intent = userProfile?.intent?.trim();
    if (intent && partnerBrandNames.includes(intent)) {
      setForm((prev) =>
        prev.marcas.includes(intent) ? prev : { ...prev, marcas: [...prev.marcas, intent] },
      );
    }
  }, [userProfile?.intent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.privacidad || !userProfile) return;
    if (form.marcas.length === 0) {
      setError('Selecciona al menos una marca.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = { ...form, interes: form.marcas.join(', ') };

    const emailBody = buildLeadEmailBody({
      profile: userProfile,
      form: payload,
      intent: userProfile.intent,
      source,
    });

    try {
      await submitLead({
        userTypeId: userProfile.typeId,
        userTypeLabel: userProfile.label,
        ...payload,
        intent: payload.interes,
        source,
        emailBody,
      });

      const waMessage = buildBusinessWhatsAppMessage({
        profile: userProfile,
        form: payload,
        intent: userProfile.intent,
        source,
      });
      window.open(whatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');
      showThankYouModal('business');
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Error al enviar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile || !businessType) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs font-amsi font-bold uppercase tracking-widest text-brand-naranja">
        {businessType.emoji} {businessType.label}
      </p>

      {[
        { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
        { name: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '55 1234 5678' },
        { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@negocio.com' },
        { name: 'nombreNegocio', label: 'Nombre del negocio', type: 'text', placeholder: 'Pet shop, clínica...' },
        { name: 'zona', label: 'Zona / área', type: 'text', placeholder: 'Colonia, municipio' },
        ...(showVolume
          ? [{ name: 'volumen', label: 'Volumen estimado', type: 'text', placeholder: 'Ej. 2 tarimas / mes' }]
          : []),
        { name: 'notas', label: 'Notas (opcional)', type: 'text', placeholder: 'Horarios, RFC, etc.', required: false },
      ].map((field) => (
        <div key={field.name}>
          <label htmlFor={`lead-${field.name}`} className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
            {field.label}
          </label>
          <input
            id={`lead-${field.name}`}
            name={field.name}
            type={field.type}
            required={field.required !== false}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm"
          />
        </div>
      ))}

      <BrandMultiSelect
        value={form.marcas}
        onChange={(marcas) => setForm((prev) => ({ ...prev, marcas }))}
        id="lead-marcas-modal"
      />

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="privacidad"
          checked={form.privacidad}
          onChange={handleChange}
          required
          className="mt-1 rounded border-brand-beige text-brand-naranja focus:ring-brand-naranja"
        />
        <span className="text-xs text-brand-verde-oscuro/70 font-amsi leading-relaxed">
          Acepto el aviso de privacidad de San Marcos.
        </span>
      </label>

      {error && <p className="text-sm text-red-600 font-amsi">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-naranja text-white py-3.5 rounded-xl font-bold font-collier flex items-center justify-center gap-2 hover:bg-brand-naranja-hover disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <WhatsAppIcon className="w-5 h-5" />}
        Enviar y abrir WhatsApp
      </button>
    </form>
  );
};

export default BusinessLeadForm;
