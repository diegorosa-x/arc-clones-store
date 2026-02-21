import React, { useId, useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onOpenCart: () => void;
  isAiLoading?: boolean;
}

const categories = [
  { key: "Watches", label: "Relógios" },
  { key: "Handbags", label: "Bolsas" },
  { key: "Sunglasses", label: "Óculos" },
  { key: "Jewelry", label: "Joias" },
] as const;

const Header: React.FC<HeaderProps> = ({
  cartCount,
  onSearch,
  onCategorySelect,
  onOpenCart,
  isAiLoading = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const searchId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    onCategorySelect(cat);
  };

  return (
    <header
      className="
        sticky top-0 z-50 transition-colors duration-300
        bg-brand-bg dark:bg-[#0b0b0d]
        border-b border-brand-muted dark:border-white/10
      "
    >
      {/* Banner */}
      <p className="bg-brand-gold text-brand-bg text-[10px] uppercase tracking-[0.2em] py-2 text-center font-bold">
        FRETE GRÁTIS PARA TODO BRASIL | CLONES COM MAQUINÁRIO SUIÇO
      </p>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => selectCategory("All")}
              className="  p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold"
              aria-label="Voltar para a página inicial"
            >
              <span className="text-2xl font-brand font-bold tracking-tighter text-brand-gold">
                ARC
                <span className="text-slate-900 dark:text-white transition-colors">
                  CLONES
                </span>
              </span>
            </button>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex space-x-10" aria-label="Categorias">
            {categories.map((cat) => {
              const isCurrent = activeCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => selectCategory(cat.key)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`
                    px-5 py-2 rounded-md text-[11px] font-bold uppercase tracking-[0.15em]
                    transition-all border
                    /* LIGHT (mais clean) */
                    bg-white text-slate-700 border-slate-200
                    hover:border-brand-gold hover:text-brand-gold
                    /* DARK (igual seu estilo) */
                    dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                    dark:hover:border-brand-gold dark:hover:text-brand-gold
                    ${isCurrent ? "border-brand-gold text-brand-gold dark:border-brand-gold dark:text-brand-gold" : ""}
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Search & actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form
              role="search"
              onSubmit={handleSubmit}
              className="relative hidden lg:block w-64"
              aria-busy={isAiLoading || undefined}
            >
              <label htmlFor={searchId} className="sr-only">
                Buscar produtos com o concierge
              </label>

              <input
                id={searchId}
                type="search"
                value={inputValue}
                placeholder={
                  isAiLoading ? "CONCIERGE PENSANDO..." : "PERGUNTE AO CONCIERGE..."
                }
                disabled={isAiLoading}
                className={`
                  w-full rounded-md py-2 px-4 pl-10 text-[11px] uppercase tracking-widest transition-all
                  focus:ring-1 focus:ring-brand-gold
                  /* LIGHT */
                  bg-brand-muted text-slate-900 placeholder-slate-500 border border-slate-200
                  /* DARK */
                  dark:bg-[#141417] dark:text-white dark:placeholder-slate-500 dark:border-white/10
                  ${isAiLoading ? "opacity-50 animate-pulse" : ""}
                `}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <i
                className={`fa-solid ${
                  isAiLoading ? "fa-spinner animate-spin" : "fa-robot"
                } absolute left-3.5 top-2.5 text-brand-gold text-xs`}
                aria-hidden="true"
              />

              <span className="sr-only" aria-live="polite">
                {isAiLoading ? "Concierge pensando. Aguarde." : ""}
              </span>
            </form>

            <ThemeToggle />

            {/* Botão base (LIGHT claro / DARK escuro) */}
            <button
              type="button"
              className="
                p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold
              "
              aria-label="Abrir conta do usuário"
            >
              <i className="fa-regular fa-user text-lg" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="
                relative p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold
              "
              onClick={onOpenCart}
              aria-label={`Abrir carrinho${cartCount > 0 ? `, ${cartCount} itens` : ""}`}
            >
              <i className="fa-solid fa-cart-shopping text-lg" aria-hidden="true" />

              {cartCount > 0 && (
                <>
                  <span
                    className="absolute -top-1 -right-1 bg-brand-gold text-brand-bg text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    aria-hidden="true"
                  >
                    {cartCount}
                  </span>
                  <span className="sr-only">{cartCount} itens no carrinho</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;