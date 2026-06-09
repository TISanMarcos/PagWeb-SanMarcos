/**
 * Ilustración de flota de entrega (camioneta + motocicleta) al estilo San Marcos.
 */
const DeliveryFleetMark = ({ className = '' }) => (
  <div
    className={`relative shrink-0 w-36 h-36 sm:w-40 sm:h-40 ${className}`}
    role="img"
    aria-label="Entregas en camioneta y motocicleta San Marcos"
  >
    <div className="absolute inset-0 rounded-3xl bg-brand-crema border border-brand-beige/90 shadow-premium" />
    <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-brand-verde-oscuro/[0.06] to-brand-naranja/[0.08]" />

    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative w-full h-full p-3 sm:p-3.5"
      aria-hidden
    >
      {/* Ruta punteada */}
      <path
        d="M24 118 Q 55 108 80 112 T 136 118"
        stroke="#003020"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />

      {/* Camioneta */}
      <g transform="translate(18, 68)">
        <rect x="0" y="14" width="52" height="28" rx="4" fill="#003020" />
        <path d="M44 14 L52 14 L58 26 L58 42 L44 42 Z" fill="#004d32" />
        <rect x="6" y="20" width="14" height="10" rx="2" fill="#80c060" fillOpacity="0.85" />
        <rect x="24" y="18" width="16" height="18" rx="2" fill="#faf6f1" fillOpacity="0.95" />
        <circle cx="16" cy="44" r="7" fill="#003020" />
        <circle cx="16" cy="44" r="3.5" fill="#f0e0d0" />
        <circle cx="48" cy="44" r="7" fill="#003020" />
        <circle cx="48" cy="44" r="3.5" fill="#f0e0d0" />
        {/* Caja / paquete en la camioneta */}
        <rect x="26" y="8" width="14" height="10" rx="2" fill="#f06020" />
        <path d="M29 8 L33 4 L37 8" stroke="#d9541a" strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      {/* Motocicleta */}
      <g transform="translate(88, 72)">
        <circle cx="14" cy="36" r="9" fill="#003020" />
        <circle cx="14" cy="36" r="4.5" fill="#f0e0d0" />
        <circle cx="46" cy="36" r="9" fill="#003020" />
        <circle cx="46" cy="36" r="4.5" fill="#f0e0d0" />
        <path
          d="M14 36 L28 20 L38 16 L52 22 L46 36"
          stroke="#f06020"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M28 20 L32 10 L38 8" stroke="#003020" strokeWidth="3" strokeLinecap="round" />
        <rect x="34" y="14" width="12" height="8" rx="2" fill="#004d32" />
        {/* Paquete en moto */}
        <rect x="36" y="4" width="10" height="9" rx="1.5" fill="#80c060" />
      </g>

      {/* Detalle superior — pin de ubicación suave */}
      <circle cx="80" cy="36" r="18" fill="#003020" fillOpacity="0.08" />
      <path
        d="M80 24 C74 24 70 28.5 70 34 C70 40 80 50 80 50 C80 50 90 40 90 34 C90 28.5 86 24 80 24 Z"
        fill="#f06020"
        fillOpacity="0.9"
      />
      <circle cx="80" cy="34" r="4" fill="#faf6f1" />
    </svg>
  </div>
);

export default DeliveryFleetMark;
