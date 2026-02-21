import React from "react";

type Props = {
  viewMode: "Home" | "Catalog";
  filterIds: string[] | null;
  searchQuery: string;
  onBackHome: () => void;
};

const CatalogHeader: React.FC<Props> = ({
  viewMode,
  filterIds,
  searchQuery,
  onBackHome,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-brand-muted pb-12">
      <div className="max-w-3xl">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-4">
          {filterIds
            ? "Curadoria Especializada"
            : viewMode === "Home"
              ? "Destaques ARC"
              : "Catálogo Relógio Clone"}
        </h2>
        <p className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
          {filterIds
            ? "Personalização Técnica por IA"
            : searchQuery
              ? `Busca: "${searchQuery}"`
              : "Obra-Prima da Engenharia Reversa"}
        </p>
      </div>

      {(filterIds || viewMode === "Catalog") && (
        <button
          onClick={onBackHome}
          className="mt-6 md:mt-0 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-slate-900 dark:hover:text-white transition-colors border-b border-brand-gold"
        >
          Voltar para Home
        </button>
      )}
    </div>
  );
};

export default CatalogHeader;