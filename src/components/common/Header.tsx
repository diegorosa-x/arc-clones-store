import React, { useId, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../hooks/useAuth";

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onOpenCart: () => void;
  isAiLoading?: boolean;
}

const categories = [
  { key: "All", label: "Tudo" },
  { key: "Watches", label: "Relógios" },
  { key: "Handbags", label: "Bolsas" },
  { key: "Sunglasses", label: "Óculos" },
  { key: "Jewelry", label: "Joias" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

const cx = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(" ");

const Header: React.FC<HeaderProps> = ({
  cartCount,
  onSearch,
  onCategorySelect,
  onOpenCart,
  isAiLoading = false,
}) => {
  const searchId = useId(); // searchId agora é usado no input
  const { user, login, logout } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const adminEmails = ["diegorosadev1@gmail.com", "salomaotg1989@gmail.com"];
  const isAdmin = user?.email && adminEmails.includes(user.email);

  const placeholder = useMemo(
    () => (isAiLoading ? "CONCIERGE PENSANDO..." : "PERGUNTE AO CONCIERGE..."),
    [isAiLoading],
  );

  const baseButton =
    "inline-flex items-center justify-center rounded-md border transition-all " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold";

  const ghostButton = cx(
    baseButton,
    "bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold " +
      "dark:bg-[#111214] dark:text-slate-200 dark:border-white/10 dark:hover:text-brand-gold dark:hover:border-brand-gold",
  );

  const navButton = (isCurrent: boolean) =>
    cx(
      baseButton,
      "px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] bg-white border-slate-200 text-slate-700 " +
        "hover:text-brand-gold hover:border-brand-gold " +
        "dark:bg-[#111214] dark:text-slate-200 dark:border-white/10 dark:hover:text-brand-gold dark:hover:border-brand-gold",
      isCurrent &&
        "border-brand-gold text-brand-gold dark:border-brand-gold dark:text-brand-gold",
    );

  const selectCategory = (cat: CategoryKey) => {
    setActiveCategory(cat);
    onCategorySelect(cat);
    setMobileOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand-gold text-brand-bg">
        <p className="text-[10px] uppercase tracking-[0.2em] py-2 text-center font-bold">
          FRETE GRÁTIS PARA TODO BRASIL | CLONES COM MAQUINÁRIO SUIÇO
        </p>
      </div>

      <div className="border-b border-brand-muted dark:border-white/10 bg-brand-bg/90 dark:bg-[#0b0b0d]/85 backdrop-blur transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className={cx(ghostButton, "md:hidden w-10 h-10")}
              >
                <i
                  className={cx(
                    "fa-solid text-lg",
                    mobileOpen ? "fa-xmark" : "fa-bars",
                  )}
                />
              </button>

              <button
                type="button"
                onClick={() => selectCategory("All")}
                className={cx(ghostButton, "px-3 py-2")}
              >
                <span className="text-2xl font-brand font-bold tracking-tighter">
                  <span className="text-brand-gold">ARC</span>
                  <span className="text-slate-900 dark:text-white">CLONES</span>
                </span>
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-3">
              {categories.slice(1).map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => selectCategory(cat.key)}
                  className={navButton(activeCategory === cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <form
                onSubmit={handleSubmit}
                className="relative hidden lg:block w-64"
              >
                <input
                  id={searchId} // Resolvido o erro de 'searchId' nunca usado
                  type="search"
                  value={inputValue}
                  placeholder={placeholder}
                  disabled={isAiLoading}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full rounded-md py-2 px-4 pl-10 text-[10px] uppercase tracking-widest bg-brand-muted dark:bg-[#141417] border border-slate-200 dark:border-white/10 focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                />
                <i
                  className={cx(
                    "fa-solid absolute left-3.5 top-2.5 text-brand-gold text-xs",
                    isAiLoading ? "fa-spinner animate-spin" : "fa-robot",
                  )}
                />
              </form>

              <ThemeToggle />

              <button
                type="button"
                className={cx(ghostButton, "relative w-10 h-10")}
                onClick={onOpenCart}
              >
                <i className="fa-solid fa-cart-shopping text-lg" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-bg text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Seção de Perfil e Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                {!user ? (
                  <button
                    type="button"
                    onClick={() => {
                      login().catch(console.error);
                    }} // Resolvido erro de Promise
                    className={cx(
                      ghostButton,
                      "flex items-center gap-2 px-3 h-10 border-brand-gold/50",
                    )}
                  >
                    <i className="fa-brands fa-google text-brand-gold text-xs" />
                    <span className="hidden sm:inline text-[9px] font-bold uppercase tracking-widest text-brand-gold">
                      Entrar
                    </span>
                  </button>
                ) : (
                  <>
                    <button className="relative group p-0.5 rounded-full border border-brand-gold hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url as string} // Resolvido erro de tipagem 'any'
                          alt="Perfil"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-black font-bold uppercase">
                          {user.email?.charAt(0)}
                        </div>
                      )}
                      {isAdmin && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full flex items-center justify-center text-[8px] text-black border border-brand-bg shadow-sm">
                          <i className="fa-solid fa-gear" />
                        </div>
                      )}
                    </button>

                    {/* Dropdown com layout da print */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                        <div className="bg-[#111214] border border-white/10 rounded-sm shadow-2xl p-4 text-left">
                          <div className="mb-4">
                            <p className="text-[11px] font-bold text-white uppercase tracking-wider">
                              {user.user_metadata?.full_name || "Membro ARC"}
                            </p>
                            <p className="text-[9px] text-slate-500 uppercase truncate">
                              {user.email}
                            </p>
                          </div>

                          <div className="border-t border-white/5 pt-3 flex flex-col gap-2">
                            {isAdmin && (
                              <a
                                href="/admin"
                                className="flex items-center gap-3 text-[10px] font-bold text-brand-gold hover:opacity-80 transition-colors uppercase tracking-widest"
                              >
                                <i className="fa-solid fa-gear text-xs" />{" "}
                                Painel ADM
                              </a>
                            )}
                            <button
                              onClick={() => {
                                logout().catch(console.error);
                              }} // Resolvido erro de Promise
                              className="flex items-center gap-3 text-[10px] font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest mt-1"
                            >
                              <i className="fa-solid fa-arrow-right-from-bracket text-xs" />{" "}
                              Sair
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
