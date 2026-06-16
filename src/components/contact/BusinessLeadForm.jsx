import { useState, useEffect } from 'react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useAppStore } from '../../store/useAppStore';
import { BUSINESS_USER_TYPES, getUserTypeById, isRetailUser } from '../../constants/userTypes';
import { buildBusinessWhatsAppMessage } from '../../utils/buildContactMessage';
import { whatsAppUrl } from '../../constants/whatsapp';
import BrandMultiSelect from './BrandMultiSelect';
import PostalCodeField from './PostalCodeField';
import { partnerBrandNames } from '../../data/partnerBrands';
import { formatPostalCode } from '../../utils/postalCodes';

const emptyForm = {
  nombreNegocio: '',
  codigoPostal: '',
  ubicacion: '',
  marcas: [],
};

const BusinessLeadForm = ({ source = 'formulario-negocio', onSuccess }) => {
  const userProfile = useAppStore((s) => s.userProfile);
  const setUserProfile = useAppStore((s) => s.setUserProfile);
  const showThankYouModal = useAppStore((s) => s.showThankYouModal);
  const [businessTypeId, setBusinessTypeId] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const businessType = businessTypeId ? getUserTypeById(businessTypeId) : null;
  const showFields = Boolean(businessTypeId);

  useEffect(() => {
    if (userProfile && !isRetailUser(userProfile.typeId)) {
      setBusinessTypeId(userProfile.typeId);
    }
  }, [userProfile?.typeId]);

  useEffect(() => {
    const intent = userProfile?.intent?.trim();
    if (intent && partnerBrandNames.includes(intent)) {
      setForm((prev) =>
        prev.marcas.includes(intent) ? prev : { ...prev, marcas: [...prev.marcas, intent] },
      );
    }
  }, [userProfile?.intent]);

  const handleTypeSelect = (typeId) => {
    setBusinessTypeId(typeId);
    setUserProfile(typeId, userProfile?.intent ?? '');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitLead = (overrides = {}) => {
    const merged = { ...form, ...overrides };

    if (!businessTypeId) {
      setError('Selecciona tu tipo de negocio.');
      return;
    }

    if (!merged.nombreNegocio.trim()) {
      setError('Escribe el nombre de tu negocio.');
      return;
    }

    if (merged.marcas.length === 0) {
      setError('Selecciona al menos una marca.');
      return;
    }

    const codigoPostal = formatPostalCode(merged.codigoPostal);
    if (codigoPostal.length !== 5) {
      setError('Ingresa un código postal de 5 dígitos.');
      return;
    }

    if (!merged.ubicacion.trim()) {
      setError('Ingresa un código postal válido de México.');
      return;
    }

    const profile = useAppStore.getState().userProfile;
    if (!profile || isRetailUser(profile.typeId)) return;

    const payload = {
      ...merged,
      nombreNegocio: merged.nombreNegocio.trim(),
      codigoPostal,
      ubicacion: merged.ubicacion.trim(),
      interes: merged.marcas.join(', '),
    };

    setForm(payload);

    const waMessage = buildBusinessWhatsAppMessage({
      profile,
      form: payload,
      intent: profile.intent,
      source,
    });

    window.open(whatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');
    showThankYouModal('business');
    onSuccess?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLead();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm font-amsi font-semibold text-brand-verde-oscuro/80 mb-3">
          ¿Qué tipo de negocio tienes?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {BUSINESS_USER_TYPES.map((type) => {
            const selected = businessTypeId === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSelect(type.id)}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  selected
                    ? 'border-brand-naranja bg-brand-naranja/5 shadow-sm'
                    : 'border-brand-beige bg-white hover:border-brand-naranja/60'
                }`}
              >
                <span className="text-lg block mb-0.5" aria-hidden>
                  {type.emoji}
                </span>
                <span
                  className={`font-collier font-bold text-xs leading-tight block ${
                    selected ? 'text-brand-naranja' : 'text-brand-verde-oscuro'
                  }`}
                >
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {showFields && (
        <>
          <p className="text-xs font-amsi font-bold uppercase tracking-widest text-brand-naranja pt-1">
            {businessType?.emoji} {businessType?.label}
          </p>

          <div>
            <label htmlFor="lead-nombreNegocio" className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
              ¿Nombre del negocio?
            </label>
            <input
              id="lead-nombreNegocio"
              name="nombreNegocio"
              type="text"
              required
              value={form.nombreNegocio}
              onChange={handleChange}
              placeholder="Pet shop, abarrotes, clínica..."
              className="w-full px-4 py-2.5 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm"
            />
          </div>

          <BrandMultiSelect
            value={form.marcas}
            onChange={(marcas) => setForm((prev) => ({ ...prev, marcas }))}
            id="lead-marcas-modal"
          />

          <PostalCodeField
            id="lead-codigoPostal"
            value={{ codigoPostal: form.codigoPostal, ubicacion: form.ubicacion }}
            onChange={({ codigoPostal, ubicacion }) => {
              setForm((prev) => ({ ...prev, codigoPostal, ubicacion }));
              setError('');
            }}
            onEnterSubmit={(postal) => submitLead(postal)}
          />

          {error && <p className="text-sm text-red-600 font-amsi">{error}</p>}

          <button
            type="submit"
            className="w-full bg-brand-naranja text-white py-3.5 rounded-xl font-bold font-collier flex items-center justify-center gap-2 hover:bg-brand-naranja-hover"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Continuar a WhatsApp
          </button>
        </>
      )}

      {!showFields && error && <p className="text-sm text-red-600 font-amsi">{error}</p>}
    </form>
  );
};

export default BusinessLeadForm;
