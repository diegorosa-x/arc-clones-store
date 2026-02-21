import React from "react";

type Props = {
  brands: string[];
  movements: (string | null | undefined)[];
  brandFilter: string;
  factoryFilter: string;
  movementFilter: string;
  priceRange: number;

  onBrandChange: (v: string) => void;
  onFactoryChange: (v: string) => void;
  onMovementChange: (v: string) => void;
  onPriceChange: (v: number) => void;
};

const FiltersSidebar: React.FC<Props> = ({
  brands,
  movements,
  brandFilter,
  factoryFilter,
  movementFilter,
  priceRange,
  onBrandChange,
  onFactoryChange,
  onMovementChange,
  onPriceChange,
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-12 animate-in slide-in-from-left-4 duration-500">
      {/* Marca */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">
          Marca
        </h4>
        <div className="space-y-3">
          <button
            onClick={() => onBrandChange("All")}
            className={`block text-[11px] uppercase tracking-widest ${
              brandFilter === "All"
                ? "text-slate-900 dark:text-white font-bold underline decoration-brand-gold underline-offset-4"
                : "text-slate-500 hover:text-brand-gold"
            }`}
          >
            Todas
          </button>

          {brands.map((b) => (
            <button
              key={b}
              onClick={() => onBrandChange(b)}
              className={`block text-[11px] uppercase tracking-widest ${
                brandFilter === b
                  ? "text-slate-900 dark:text-white font-bold underline decoration-brand-gold underline-offset-4"
                  : "text-slate-500 hover:text-brand-gold"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Fabricante */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">
          Fabricante
        </h4>
        <div className="space-y-3">
          <button
            onClick={() => onFactoryChange("All")}
            className={`block text-[11px] uppercase tracking-widest ${
              factoryFilter === "All"
                ? "text-slate-900 dark:text-white font-bold underline decoration-brand-gold underline-offset-4"
                : "text-slate-500 hover:text-brand-gold"
            }`}
          >
            Todos
          </button>

          {[
            { key: "EW", label: "EW (Econômica)" },
            { key: "CLEAN", label: "CLEAN (Super Clone)" },
            { key: "VSF", label: "VSF (Super Clone Mov. Orig.)" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => onFactoryChange(opt.key)}
              className={`block text-[11px] uppercase tracking-widest ${
                factoryFilter === opt.key
                  ? "text-slate-900 dark:text-white font-bold underline decoration-brand-gold underline-offset-4"
                  : "text-slate-500 hover:text-brand-gold"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preço */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">
          Valor Máximo: R$ {priceRange.toLocaleString("pt-BR")}
        </h4>
        <input
          type="range"
          min="5000"
          max="20000"
          step="500"
          value={priceRange}
          onChange={(e) => onPriceChange(parseInt(e.target.value))}
          className="w-full accent-brand-gold bg-brand-muted h-1 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Movimento */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">
          Movimento
        </h4>
        <div className="space-y-3">
          <button
            onClick={() => onMovementChange("All")}
            className={`block text-[11px] uppercase tracking-widest ${
              movementFilter === "All"
                ? "text-slate-900 dark:text-white font-bold underline decoration-brand-gold underline-offset-4"
                : "text-slate-500 hover:text-brand-gold"
            }`}
          >
            Todos
          </button>

          {movements.map((m) => (
            <button
              key={String(m)}
              onClick={() => onMovementChange(String(m))}
              className={`block text-[11px] uppercase tracking-widest ${
                movementFilter === m
                  ? "text-slate-900 dark:text-white font-bold underline decoration-brand-gold underline-offset-4"
                  : "text-slate-500 hover:text-brand-gold"
              }`}
            >
              {String(m)}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;