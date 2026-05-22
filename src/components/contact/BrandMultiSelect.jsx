import { useState } from 'react';
import { X } from 'lucide-react';
import { partnerBrandNames } from '../../data/partnerBrands';

const BrandMultiSelect = ({ value = [], onChange, id = 'lead-marcas' }) => {
  const [pick, setPick] = useState('');

  const addBrand = (name) => {
    const brand = name?.trim();
    if (!brand || value.includes(brand)) return;
    onChange([...value, brand]);
    setPick('');
  };

  const removeBrand = (name) => {
    onChange(value.filter((b) => b !== name));
  };

  const available = partnerBrandNames.filter((name) => !value.includes(name));

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-brand-verde-oscuro/80 font-amsi mb-1">
        ¿Qué marcas buscas?
      </label>

      <select
        id={id}
        value={pick}
        onChange={(e) => {
          const name = e.target.value;
          setPick(name);
          if (name) addBrand(name);
        }}
        className="w-full px-4 py-2.5 rounded-xl border border-brand-beige focus:ring-2 focus:ring-brand-naranja outline-none font-amsi text-sm bg-white"
      >
        <option value="">
          {available.length ? 'Selecciona una marca…' : 'Ya agregaste todas las marcas'}
        </option>
        {available.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2 pt-1" aria-label="Marcas seleccionadas">
          {value.map((name) => (
            <li key={name}>
              <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full bg-brand-verde-oscuro/10 text-brand-verde-oscuro text-sm font-amsi font-semibold">
                {name}
                <button
                  type="button"
                  onClick={() => removeBrand(name)}
                  className="p-0.5 rounded-full hover:bg-brand-verde-oscuro/15 text-brand-verde-oscuro/70 hover:text-brand-verde-oscuro"
                  aria-label={`Quitar ${name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {value.length === 0 && (
        <p className="text-xs text-brand-verde-oscuro/50 font-amsi">
          Agrega al menos una marca del listado.
        </p>
      )}
    </div>
  );
};

export default BrandMultiSelect;
