import React from "react";

type Props = {
  onOpenCatalog: () => void;
  onCuradoria: (ids: string[]) => void;
};

const HomeHero: React.FC<Props> = ({ onOpenCatalog, onCuradoria }) => {
  return (
    <section className="relative h-[70vh] md:h-[90vh] bg-brand-bg overflow-hidden border-b border-brand-muted">
      <img
        src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000"
        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
        alt="ARC Clones Hero"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/50" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <span className="text-[11px] font-brand font-bold uppercase tracking-[0.6em] mb-6 block text-brand-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Engenharia Suíça de Precisão
            </span>

            <h1 className="text-6xl md:text-9xl font-brand font-bold leading-none mb-8 tracking-tighter text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              ARC
              <span className="text-slate-400 dark:text-brand-muted transition-colors">
                CLONES
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              A maior autoridade em{" "}
              <span className="font-bold text-slate-900 dark:text-white border-b border-brand-gold/30">
                Super Clones Rolex
              </span>{" "}
              do Brasil. Fidelidade absoluta das fábricas VSF, CLEAN e EW.
            </p>

            <div className="flex space-x-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
              <button
                onClick={onOpenCatalog}
                className="bg-brand-gold text-brand-bg px-12 py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all shadow-2xl"
              >
                Ver Catálogo Completo
              </button>

              <button
                onClick={() =>
                  onCuradoria(["rolex-sub-clone", "rolex-daytona-clone"])
                }
                className="bg-transparent border border-brand-muted text-slate-900 dark:text-white px-12 py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:border-brand-gold hover:text-brand-gold transition-all"
              >
                Nível Colecionador
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;