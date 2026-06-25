import Footer from '../components/Footer';

const Privacy = () => (
  <div className="flex flex-col bg-brand-crema min-h-screen">
    <article className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="section-title mb-6">Aviso de Privacidad</h1>

      <div className="font-amsi text-brand-verde-oscuro/80 space-y-5 leading-relaxed text-sm sm:text-base">
        <p>
          <strong>San Marcos Mascotas</strong>, con domicilio en Central de Abasto C9 y C11, 09040,
          Iztapalapa, Ciudad de México, es responsable del tratamiento de sus datos personales conforme
          a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
        </p>

        <section>
          <h2 className="font-collier font-bold text-brand-verde-oscuro text-lg mb-2">
            Datos que recabamos
          </h2>
          <p>
            Al contactarnos por WhatsApp, formularios del sitio web o en persona, podemos recabar:
            nombre, teléfono, correo electrónico, nombre del negocio, código postal, marcas de interés
            e información relacionada con su pedido o cotización.
          </p>
        </section>

        <section>
          <h2 className="font-collier font-bold text-brand-verde-oscuro text-lg mb-2">
            Finalidad del tratamiento
          </h2>
          <p>
            Utilizamos sus datos para atender solicitudes de cotización, procesar pedidos, dar seguimiento
            comercial, enviar promociones (cuando usted lo autorice) y mejorar nuestro servicio.
          </p>
        </section>

        <section>
          <h2 className="font-collier font-bold text-brand-verde-oscuro text-lg mb-2">
            Transferencia de datos
          </h2>
          <p>
            No vendemos ni compartimos sus datos con terceros con fines comerciales. Solo compartimos
            información cuando sea necesario para completar entregas o cumplir obligaciones legales.
          </p>
        </section>

        <section>
          <h2 className="font-collier font-bold text-brand-verde-oscuro text-lg mb-2">
            Derechos ARCO
          </h2>
          <p>
            Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos, así como
            revocar su consentimiento, escribiendo a{' '}
            <a href="tel:+525556943312" className="text-brand-naranja hover:underline">
              55 5694 3312
            </a>{' '}
            o por WhatsApp desde nuestro sitio web.
          </p>
        </section>

        <section>
          <h2 className="font-collier font-bold text-brand-verde-oscuro text-lg mb-2">
            Cambios al aviso
          </h2>
          <p>
            Nos reservamos el derecho de modificar este aviso. Cualquier cambio será publicado en esta
            página con la fecha de actualización correspondiente.
          </p>
        </section>

        <p className="text-brand-verde-oscuro/60 text-sm pt-4 border-t border-brand-beige">
          Última actualización: junio 2026.
        </p>
      </div>
    </article>
    <Footer />
  </div>
);

export default Privacy;
