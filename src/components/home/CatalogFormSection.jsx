import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { getUserTypeById, isRetailUser } from '../../constants/userTypes';
import { useContactFlow } from '../../hooks/useContactFlow';

const CatalogFormSection = () => {
  const userProfile = useAppStore((s) => s.userProfile);
  const { startContactFlow, openBusinessLeadForm, requestProfileChange } = useContactFlow();

  const businessType = userProfile ? getUserTypeById(userProfile.typeId) : null;
  const isBusiness = userProfile && !isRetailUser(userProfile.typeId);
  const isRetail = userProfile && isRetailUser(userProfile.typeId);

  return (
    <section id="catalogo-formulario" className="section-pad section-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="section-title mb-4">
          {isBusiness ? 'Registro para negocios' : '¿Eres negocio o consumidor?'}
        </h2>
        <p className="font-amsi text-brand-verde-oscuro/70 text-lg mb-8 leading-relaxed">
          {isBusiness
            ? `Estás registrado como ${businessType?.label}. Completa el formulario en la ventana emergente para enviar tu solicitud por correo y WhatsApp.`
            : isRetail
              ? `Te identificaste como ${businessType?.label}. Usa el catálogo o WhatsApp según lo que necesites.`
              : 'Primero dinos quién eres para mostrarte el catálogo correcto y la forma de contacto adecuada.'}
        </p>

        {!userProfile && (
          <button
            type="button"
            onClick={() => startContactFlow('registro', { source: 'seccion-catalogo' })}
            className="inline-flex items-center gap-2 bg-brand-verde-oscuro text-white px-6 py-3 rounded-full font-collier font-bold"
          >
            Identificarme
          </button>
        )}

        {isBusiness && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openBusinessLeadForm({ source: 'seccion-catalogo' })}
              className="inline-flex items-center gap-2 bg-brand-naranja text-white px-6 py-3 rounded-full font-collier font-bold hover:bg-brand-naranja-hover"
            >
              Abrir formulario de contacto
            </button>
            <button
              type="button"
              onClick={requestProfileChange}
              className="text-sm font-amsi font-semibold text-brand-verde-oscuro/60 hover:text-brand-naranja underline"
            >
              Cambiar tipo de cliente
            </button>
          </div>
        )}

        {isRetail && (
          <button
            type="button"
            onClick={requestProfileChange}
            className="text-sm font-amsi font-semibold text-brand-verde-oscuro/60 hover:text-brand-naranja underline"
          >
            Cambiar tipo de cliente
          </button>
        )}
      </motion.div>
    </section>
  );
};

export default CatalogFormSection;
