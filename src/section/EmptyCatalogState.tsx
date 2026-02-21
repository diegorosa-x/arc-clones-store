import React from "react";

const EmptyCatalogState: React.FC = () => {
  return (
    <div className="text-center py-48 bg-brand-muted/10 rounded-sm">
      <i className="fa-solid fa-clock text-6xl text-brand-muted mb-8"></i>
      <h3 className="text-2xl font-serif font-bold text-slate-400">
        Modelo não catalogado.
      </h3>
      <p className="text-slate-500 mt-4 uppercase tracking-widest text-xs">
        Tente buscar por marcas como Rolex, CLEAN ou VSF.
      </p>
    </div>
  );
};

export default EmptyCatalogState;