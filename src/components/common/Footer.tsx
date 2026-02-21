import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-bg text-slate-900 dark:text-white pt-32 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-brand-muted pb-24">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-brand font-bold mb-10 tracking-tighter text-brand-gold">
            ARC
            <span className="text-slate-900 dark:text-white transition-colors">CLONES</span>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed mb-10 font-light">
            Desde 2012, a ARC CLONES se mantém como a maior referência em clones de alta fidelidade
            na América Latina. Nossa curadoria técnica foca na precisão suíça e durabilidade
            extrema.
          </p>

          <div className="flex space-x-6 text-brand-gold">
            <i className="fa-brands fa-whatsapp text-xl hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
            <i className="fa-brands fa-instagram text-xl hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
            <i className="fa-brands fa-youtube text-xl hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-10 text-brand-gold">
            Fábricas Master
          </h4>
          <ul className="text-[11px] text-slate-600 dark:text-slate-500 space-y-6 uppercase tracking-widest">
            <li className="hover:text-brand-gold cursor-pointer transition-colors">VSF Factory</li>
            <li className="hover:text-brand-gold cursor-pointer transition-colors">CLEAN Factory</li>
            <li className="hover:text-brand-gold cursor-pointer transition-colors">EW Factory</li>
            <li className="hover:text-brand-gold cursor-pointer transition-colors">BT Factory</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-10 text-brand-gold">
            Pós-Venda
          </h4>
          <ul className="text-[11px] text-slate-600 dark:text-slate-500 space-y-6 uppercase tracking-widest">
            <li className="hover:text-brand-gold cursor-pointer transition-colors">Manual do Clone</li>
            <li className="hover:text-brand-gold cursor-pointer transition-colors">Garantia Técnica</li>
            <li className="hover:text-brand-gold cursor-pointer transition-colors">Centro de Reparos</li>
            <li className="hover:text-brand-gold cursor-pointer transition-colors">Envio Seguro</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-10 text-brand-gold">
            Catálogo VIP
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-500 mb-8 font-light leading-relaxed">
            Assine para receber o release das fábricas e modelos limitados em primeira mão.
          </p>

          <div className="flex border border-brand-muted p-1 bg-brand-muted/20">
            <input
              type="email"
              placeholder="SEU EMAIL"
              className="bg-transparent border-none px-4 py-3 text-[10px] flex-1 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-600 uppercase tracking-widest"
            />
            <button className="bg-brand-gold text-brand-bg px-6 font-bold uppercase text-[9px] tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all">
              ASSINAR
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-[9px] text-slate-500 dark:text-slate-700 uppercase tracking-[0.4em] flex flex-col md:flex-row justify-between items-center">
        <p>© 2024 ARC CLONES | THE HIGHEST FIDELITY. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-10 mt-6 md:mt-0 items-center">
          <span className="hover:text-brand-gold cursor-pointer transition-colors">Políticas Técnicas</span>
          <span className="hover:text-brand-gold cursor-pointer transition-colors">Termos de Aquisição</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;