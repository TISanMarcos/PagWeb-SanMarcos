import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, MessageCircle, Mail, Loader2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { getUserTypeById, isRetailUser } from '../../constants/userTypes';
import { submitLead } from '../../services/leadService';
import { buildBusinessWhatsAppMessage, buildLeadEmailBody } from '../../utils/buildContactMessage';
import { whatsAppUrl } from '../../constants/whatsapp';
import { useContactFlow } from '../../hooks/useContactFlow';
import BrandMultiSelect from '../contact/BrandMultiSelect';
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

const CatalogFormSection = () => {
  const location = useLocation();
  const userProfile = useAppStore((s) => s.userProfile);
  const { startContactFlow } = useContactFlow();
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const businessType = userProfile ? getUserTypeById(userProfile.typeId) : null;
  const showBusinessForm = userProfile && !isRetailUser(userProfile.typeId);
  const showVolume = ['mayorista', 'revendedor_alimentos'].includes(userProfile?.typeId);

  useEffect(() => {
    const intent = location.state?.leadIntent?.trim() || userProfile?.intent?.trim();
    if (intent && partnerBrandNames.includes(intent)) {
      setForm((prev) =>
        prev.marcas.includes(intent) ? prev : { ...prev, marcas: [...prev.marcas, intent] },
      );
    }
  }, [location.state?.leadIntent, userProfile?.intent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.privacidad || !userProfile || isRetailUser(userProfile.typeId)) return;
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
      source: 'formulario-catalogo',
    });

    try {
      await submitLead({
        userTypeId: userProfile.typeId,
        userTypeLabel: userProfile.label,
        ...payload,
        intent: payload.interes,
        source: 'formulario-catalogo',
        emailBody,
      });

      const waMessage = buildBusinessWhatsAppMessage({
        profile: userProfile,
        form: payload,
        intent: userProfile.intent,
        source: 'formulario-catalogo',
      });
      window.open(whatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Error al enviar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="catalogo-formulario" className="section-pad section-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title mb-4">
              {showBusinessForm ? 'Registro para negocios' : '¿Eres negocio o consumidor?'}
            </h2>
            <p className="font-amsi text-brand-verde-oscuro/70 text-lg mb-6 leading-relaxed">
              {showBusinessForm
                ? `Completa tus datos como ${businessType?.label}. Te enviaremos un correo a ventas y abriremos WhatsApp con tu información lista.`
                : 'Primero dinos quién eres para mostrarte el catálogo correcto y la forma de contacto adecuada.'}
            </p>
            {!showBusinessForm && (
              <button
                type="button"
                onClick={() => startContactFlow('registro', { source: 'seccion-catalogo' })}
                className="inline-flex items-center gap-2 bg-brand-verde-oscuro text-white px-6 py-3 rounded-full font-collier font-bold"
              >
                Identificarme
              </button>
            )}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-6 inline-flex items-center gap-2 text-brand-verde-oscuro font-bold font-collier border-2 border-brand-verde-oscuro px-6 py-3 rounded-full hover:bg-brand-verde-oscuro hover:text-white transition-colors"
            >
              <Download className="w-5 h-5" />
              Catálogo PDF (próximamente)
            </a>
          </div>

          {showBusinessForm ? (
            <form
              onSubmit={handleSubmit}
              className="bg-brand-neutral rounded-3xl p-6 md:p-8 shadow-sm border border-brand-beige/80"
            >
              <p className="text-xs font-amsi font-bold uppercase tracking-widest text-brand-naranja mb-2">
                {businessType?.emoji} {businessType?.label}
              </p>
              <h3 className="font-collier font-bold text-xl text-brand-verde-oscuro mb-6">
                Formulario de contacto
              </h3>

              {submitted ? (
                <motion.div className="text-center py-8 space-y-3">
                  <Mail className="w-12 h-12 text-brand-verde-claro mx-auto" />
                  <p className="font-amsi text-brand-verde-oscuro/80">
                    Solicitud enviada por correo. También abrimos WhatsApp con tus datos para agilizar el trato.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
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
                      <label htmlFor={field.name} className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
                        {field.label}
                      </label>
                      <input
                        id={field.name}
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
                    id="lead-marcas-catalogo"
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
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                    Enviar y abrir WhatsApp
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="bg-brand-neutral rounded-3xl p-8 border border-dashed border-brand-beige text-center font-amsi text-brand-verde-oscuro/60">
              El formulario aparece cuando eliges un tipo de negocio (no consumidor final).
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default CatalogFormSection;
