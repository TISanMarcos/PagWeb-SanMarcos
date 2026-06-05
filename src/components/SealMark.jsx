import { useId } from 'react';

const LOGO = `${import.meta.env.BASE_URL}logo_sanmarcos.png`;

/**
 * @param {{ className?: string, variant?: 'default' | 'onDark', whiteBackdrop?: boolean, enlarged?: boolean }} props
 */
const SealMark = ({ className = '', variant = 'default', whiteBackdrop = false, enlarged = false }) => {
  const uid = useId().replace(/:/g, '');
  const topArc = `seal-top-${uid}`;
  const bottomArc = `seal-bottom-${uid}`;
  const onDark = variant === 'onDark';

  const box = enlarged
    ? 'w-[8.05rem] h-[8.05rem] sm:w-[9.2rem] sm:h-[9.2rem]'
    : 'w-28 h-28 sm:w-32 sm:h-32';
  const logo = enlarged ? 'w-[4.6rem] sm:w-[4.8875rem]' : 'w-16 sm:w-[4.25rem]';

  return (
    <div className={`relative shrink-0 ${box} ${className}`} aria-hidden>
      {whiteBackdrop && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-crema shadow-[0_8px_28px_-6px_rgba(0,0,0,0.18)]"
          style={{ width: '92%', height: '92%' }}
        />
      )}
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full ${
          onDark ? 'text-white/30' : 'text-brand-verde-oscuro/35'
        } ${whiteBackdrop ? 'z-[1]' : ''}`}
      >
        <defs>
          <path id={topArc} d="M 36 100 A 64 64 0 0 1 164 100" fill="none" />
          <path id={bottomArc} d="M 164 100 A 64 64 0 0 1 36 100" fill="none" />
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <text fill="currentColor" fontSize="9.5" letterSpacing="0.22em" fontWeight="600">
          <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
            EL SELLO SAN MARCOS
          </textPath>
        </text>
        <text fill="currentColor" fontSize="8" letterSpacing="0.18em" opacity="0.85">
          <textPath href={`#${bottomArc}`} startOffset="50%" textAnchor="middle">
            CALIDAD · CONFIANZA · DESDE 1984
          </textPath>
        </text>
      </svg>

      <div className={`absolute inset-0 flex items-center justify-center ${whiteBackdrop ? 'z-[2]' : ''}`}>
        <div
          className={`relative -rotate-6 rounded-full bg-brand-verde-oscuro p-2 shadow-[0_6px_20px_-6px_rgba(26,77,46,0.35)] ring-[3px] ring-brand-naranja/25 ring-offset-2 ${
            onDark
              ? 'ring-offset-brand-verde-oscuro'
              : whiteBackdrop
                ? 'ring-offset-brand-crema'
                : 'ring-offset-white'
          }`}
        >
          <div className="rounded-full bg-black flex items-center justify-center p-1.5 sm:p-2">
            <img src={LOGO} alt="" className={`${logo} h-auto object-contain`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SealMark;
