const STAMP = `${import.meta.env.BASE_URL}sello-san-marcos-logo.png`;

/**
 * Sello gráfico unificado (imagen tipo estampilla).
 * @param {{ className?: string, enlarged?: boolean }} props
 */
const SealMark = ({ className = '', enlarged = false }) => {
  const box = enlarged
    ? 'w-[8.05rem] h-[8.05rem] sm:w-[9.2rem] sm:h-[9.2rem]'
    : 'w-28 h-28 sm:w-32 sm:h-32';

  return (
    <div className={`relative shrink-0 ${box} ${className}`}>
      <img
        src={STAMP}
        alt="Sello San Marcos — Calidad, confianza, desde 1984"
        draggable={false}
        className="relative w-full h-full object-contain"
      />
    </div>
  );
};

export default SealMark;
