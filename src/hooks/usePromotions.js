import { useCallback, useEffect, useState } from 'react';
import {
  clearPromotionsCache,
  fetchPromotions,
  getPromotionsPollMs,
} from '../services/promotionsService';

/**
 * Carga promociones desde Google Sheets y las vuelve a leer en intervalo
 * (en local cada ~15s por defecto) para reflejar cambios en la hoja.
 */
export function usePromotions({ activeOnly = true, limit, enabled = true } = {}) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(enabled);

  const load = useCallback(
    async (force = false) => {
      if (force) clearPromotionsCache();
      const data = await fetchPromotions({ force });
      let list = activeOnly ? data.filter((p) => p.active !== false) : data;
      if (typeof limit === 'number') list = list.slice(0, limit);
      setPromotions(list);
      setLoading(false);
    },
    [activeOnly, limit],
  );

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const run = async (force) => {
      if (cancelled) return;
      try {
        await load(force);
      } catch {
        if (!cancelled) {
          setPromotions([]);
          setLoading(false);
        }
      }
    };

    setLoading(true);
    run(false);

    const intervalMs = getPromotionsPollMs();
    if (intervalMs <= 0) {
      return () => {
        cancelled = true;
      };
    }

    const timer = setInterval(() => run(true), intervalMs);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [load, enabled]);

  return {
    promotions,
    loading,
    refresh: () => load(true),
    pollIntervalMs: getPromotionsPollMs(),
  };
}
