import { isPromotionsSheetConfigured } from '../../services/promotionsService';

const PromotionsSyncHint = ({ pollIntervalMs }) => {
  if (!import.meta.env.DEV || !isPromotionsSheetConfigured()) return null;

  const seconds = Math.round(pollIntervalMs / 1000);

  return (
    <p className="text-center text-xs font-amsi text-brand-verde-oscuro/45 mt-4">
      Modo prueba: sincronizando con Google Sheets cada {seconds}s
    </p>
  );
};

export default PromotionsSyncHint;
