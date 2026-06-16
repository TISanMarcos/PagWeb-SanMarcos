import { useEffect, useState } from 'react';
import {
  formatPostalCode,
  formatPostalLocation,
  lookupPostalCode,
  normalizePostalCodeInput,
} from '../../utils/postalCodes';

const PostalCodeField = ({ value, onChange, onEnterSubmit, id = 'lead-codigoPostal' }) => {
  const [input, setInput] = useState(value?.codigoPostal ?? '');
  const [settlements, setSettlements] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lookupError, setLookupError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInput(value?.codigoPostal ?? '');
    if (!value?.codigoPostal) {
      setSettlements([]);
      setSelectedIndex(0);
      setLookupError('');
    }
  }, [value?.codigoPostal]);

  const applySelection = (cp, list, index) => {
    const settlement = list[index];
    if (!settlement) {
      onChange({ codigoPostal: cp, ubicacion: '' });
      return;
    }
    onChange({
      codigoPostal: cp,
      ubicacion: formatPostalLocation(cp, settlement),
    });
  };

  const resolvePostalCode = async (rawDigits) => {
    const digits = normalizePostalCodeInput(rawDigits);
    if (digits.length < 5) {
      setSettlements([]);
      setLookupError('');
      onChange({ codigoPostal: digits, ubicacion: '' });
      return null;
    }

    setLoading(true);
    setLookupError('');

    try {
      const result = await lookupPostalCode(digits);
      if (!result) {
        setSettlements([]);
        const cp = formatPostalCode(digits);
        onChange({ codigoPostal: cp, ubicacion: '' });
        setLookupError('No encontramos ese código postal. Revisa que sean 5 dígitos.');
        return null;
      }

      setSettlements(result.settlements);
      setSelectedIndex(0);
      applySelection(result.cp, result.settlements, 0);

      return {
        codigoPostal: result.cp,
        ubicacion: formatPostalLocation(result.cp, result.settlements[0]),
      };
    } catch {
      setSettlements([]);
      onChange({ codigoPostal: formatPostalCode(digits), ubicacion: '' });
      setLookupError('No pudimos validar el código postal. Intenta de nuevo.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const digits = normalizePostalCodeInput(e.target.value);
    setInput(digits);
    setLookupError('');

    if (digits.length < 5) {
      setSettlements([]);
      onChange({ codigoPostal: digits, ubicacion: '' });
      return;
    }

    resolvePostalCode(digits);
  };

  const handleBlur = () => {
    if (input.length === 5 && !value?.ubicacion) {
      resolvePostalCode(input);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    if (input.length !== 5) return;

    const resolved = await resolvePostalCode(input);
    if (resolved) {
      onEnterSubmit?.(resolved);
    }
  };

  const handleSettlementChange = (e) => {
    const index = Number(e.target.value);
    setSelectedIndex(index);
    const cp = formatPostalCode(input);
    applySelection(cp, settlements, index);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
        ¿Cuál es tu código postal?
      </label>
      <input
        id={id}
        name="codigoPostal"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        required
        maxLength={5}
        value={input}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Ej. 06800"
        className="w-full px-4 py-2.5 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm"
      />

      {loading && (
        <p className="text-xs text-brand-verde-oscuro/60 font-amsi">Buscando localidad…</p>
      )}

      {!loading && value?.ubicacion && (
        <p className="text-xs text-brand-verde-oscuro/80 font-amsi bg-brand-beige/40 px-3 py-2 rounded-lg">
          {value.ubicacion}
        </p>
      )}

      {!loading && settlements.length > 1 && (
        <div>
          <label htmlFor={`${id}-colonia`} className="block text-xs font-semibold text-brand-verde-oscuro/70 font-amsi mb-1">
            Elige tu colonia
          </label>
          <select
            id={`${id}-colonia`}
            value={selectedIndex}
            onChange={handleSettlementChange}
            className="w-full px-3 py-2 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm bg-white"
          >
            {settlements.map((item, index) => (
              <option key={`${item.asenta}-${index}`} value={index}>
                {item.asenta}, {item.municipio}
              </option>
            ))}
          </select>
        </div>
      )}

      {lookupError && (
        <p className="text-xs text-red-600 font-amsi">{lookupError}</p>
      )}
    </div>
  );
};

export default PostalCodeField;
