import React from "react";

const TechnicalBanner: React.FC = () => {
  return (
    <section className="bg-brand-muted/20 py-24 border-y border-brand-muted transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="text-center">
          <i className="fa-solid fa-microscope text-3xl text-brand-gold mb-6"></i>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-900 dark:text-white">
            Engenharia Reversa
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-light">
            Peça por peça, o movimento original é clonado com tolerâncias
            microscópicas para garantir a mesma performance.
          </p>
        </div>

        <div className="text-center">
          <i className="fa-solid fa-gem text-3xl text-brand-gold mb-6"></i>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-900 dark:text-white">
            Aço 904L
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-light">
            Utilizamos exclusivamente a liga de aço 904L, a mesma liga
            aeroespacial usada pelas grandes relojoarias suíças.
          </p>
        </div>

        <div className="text-center">
          <i className="fa-solid fa-gears text-3xl text-brand-gold mb-6"></i>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-900 dark:text-white">
            Calibre Clonado
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-light">
            Nossos movimentos VSF e CLEAN são visualmente e funcionalmente
            indistinguíveis dos calibres originais.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnicalBanner;