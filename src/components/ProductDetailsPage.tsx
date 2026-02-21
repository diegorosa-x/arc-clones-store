import React, { useMemo, useState } from "react";
import type { Manufacturer, Product } from "../types/types";

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (
    p: Product,
    factory?: Manufacturer,
    finalPrice?: number,
  ) => void;
}

type SpecSectionProps = {
  title: string;
  items: Record<string, string>;
};

// ✅ fora do componente principal (evita recriação a cada render)
const SpecSection: React.FC<SpecSectionProps> = ({ title, items }) => {
  const sectionId = `spec-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section className="mb-8" aria-labelledby={sectionId}>
      <h3
        id={sectionId}
        className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.25em] mb-4 border-b border-brand-muted pb-2"
      >
        {title}
      </h3>

      {/* dl/dt/dd é o mais semântico para specs */}
      <dl className="flex flex-col">
        {Object.entries(items).map(([label, value], idx) => (
          <div
            key={label}
            className={`flex py-3 px-4 text-[11px] transition-colors ${
              idx % 2 === 0 ? "bg-brand-muted/10" : "bg-transparent"
            }`}
          >
            <dt className="w-1/3 font-bold text-slate-500 uppercase tracking-wider">
              {label}
            </dt>
            <dd className="w-2/3 text-slate-800 dark:text-slate-300 font-medium">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onAddToCart,
}) => {
  const [selectedFactory, setSelectedFactory] = useState<
    Manufacturer | undefined
  >(product?.factories?.[0]?.factory);
  const [mainImage, setMainImage] = useState(product.image);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const currentFactoryData = useMemo(
    () => product.factories?.find((f) => f.factory === selectedFactory),
    [product.factories, selectedFactory],
  );

  const finalPrice = currentFactoryData
    ? currentFactoryData.price
    : product.basePrice;

  const galleryImages = useMemo(
    () =>
      (product.images?.length ? product.images : [product.image]).slice(0, 3),
    [product.images, product.image],
  );

  const hasFactories = Boolean(product.factories?.length);
  const pageTitleId = "product-title";
  const descId = "product-description";
  const descContentId = "product-description-content";

  return (
    <main className="animate-in fade-in duration-700 bg-brand-bg min-h-screen">
      {/* Top / breadcrumb */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        aria-label="Navegação"
      >
        <button
          type="button"
          onClick={onBack}
          className="
          p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold
          text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
        >
          <i
            className="fa-solid fa-chevron-left text-[8px]"
            aria-hidden="true"
          />
          <span>Voltar para o Catálogo</span>
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Produto */}
        <article className="flex flex-col lg:flex-row gap-16 mb-24">
          {/* Galeria */}
          <section
            className="w-full lg:w-3/5 flex gap-6"
            aria-label="Galeria de imagens"
          >
            {/* Thumbs */}
            <aside
              className="hidden md:flex flex-col gap-4 w-20"
              aria-label="Miniaturas"
            >
              {galleryImages.map((img, idx) => {
                const active = mainImage === img;
                return (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setMainImage(img)}
                    aria-label={`Selecionar imagem ${idx + 1}`}
                    aria-current={active ? "true" : undefined}
                    className={`aspect-square border transition-all overflow-hidden ${
                      active
                        ? "border-brand-gold p-0.5 shadow-md"
                        : "border-brand-muted hover:border-slate-400 dark:hover:border-slate-600"
                    }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={`${product.name} — miniatura ${idx + 1}`}
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </aside>

            {/* Imagem principal */}
            <figure className="flex-1 aspect-square bg-white dark:bg-slate-900 border border-brand-muted overflow-hidden shadow-2xl transition-colors duration-300">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <figcaption className="sr-only">{product.name}</figcaption>
            </figure>
          </section>

          {/* Configuração / compra */}
          <section
            className="w-full lg:w-2/5 flex flex-col"
            aria-label="Compra e configurações"
          >
            <header className="mb-10">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] mb-4 block">
                {product.brand} - CLONE MASTER
              </p>

              <h1
                id={pageTitleId}
                className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight transition-colors"
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <p className="text-3xl font-bold text-brand-gold">
                  R$ {finalPrice.toLocaleString("pt-BR")}
                </p>

                <span className="bg-brand-muted text-slate-600 dark:text-slate-400 text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                  Ready to Ship
                </span>
              </div>
            </header>

            {/* Seleção de fábrica (semântica melhor com fieldset/legend) */}
            {hasFactories && (
              <fieldset className="mb-12">
                <legend className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6 italic">
                  ENGINEERING SOURCE (FACTORY):
                </legend>

                <div
                  className="space-y-4"
                  role="radiogroup"
                  aria-label="Selecionar fábrica"
                >
                  {product.factories!.map((f) => {
                    const selected = selectedFactory === f.factory;

                    return (
                      <button
                        key={f.factory}
                        type="button"
                        onClick={() => setSelectedFactory(f.factory)}
                        role="radio"
                        aria-checked={selected}
                        className={`w-full p-6 border text-left transition-all duration-300 relative 
                          p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold
                          ${
                            selected
                              ? "border-brand-gold bg-brand-gold/5 shadow-md"
                              : "border-brand-muted hover:border-slate-400 dark:hover:border-slate-700"
                          }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`font-bold text-xs tracking-widest uppercase ${
                              selected ? "text-brand-gold" : "text-slate-500"
                            }`}
                          >
                            {f.factory} FACTORY
                          </span>

                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            R$ {f.price.toLocaleString("pt-BR")}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed italic">
                          {f.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <button
              type="button"
              onClick={() => onAddToCart(product, selectedFactory, finalPrice)}
              className="w-full bg-brand-gold text-brand-bg py-6 font-bold uppercase tracking-[0.4em] text-[12px] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all shadow-xl flex items-center justify-center gap-3"
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              ADD TO BAG
            </button>
          </section>
        </article>

        {/* Specs + Description */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-brand-muted pt-16">
          {/* Specs */}
          <section aria-label="Especificações do produto">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-10 uppercase tracking-wide">
              Product Details
            </h2>

            {product.specs?.general && (
              <SpecSection title="General" items={product.specs.general} />
            )}
            {product.specs?.case && (
              <SpecSection title="Case" items={product.specs.case} />
            )}
            {product.specs?.band && (
              <SpecSection title="Band" items={product.specs.band} />
            )}
            {product.specs?.dial && (
              <SpecSection title="Dial" items={product.specs.dial} />
            )}
            {product.specs?.movement && (
              <SpecSection title="Movement" items={product.specs.movement} />
            )}

            {!product.specs && (
              <p className="text-slate-500 italic text-sm">
                Especificações técnicas detalhadas em processamento...
              </p>
            )}
          </section>

          {/* Description */}
          <section
            className="lg:pl-16 lg:border-l border-brand-muted"
            aria-labelledby={descId}
          >
            <h2
              id={descId}
              className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.25em] mb-6"
            >
              DESCRIPTION
            </h2>

            <div
              id={descContentId}
              className={`text-[13px] text-slate-600 dark:text-slate-400 leading-loose font-light transition-all duration-500 overflow-hidden ${
                showFullDesc ? "max-h-[2000px]" : "max-h-24"
              }`}
            >
              <p>{product.description}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowFullDesc((v) => !v)}
              className="
              p-2 rounded-md transition-colors border
                /* LIGHT */
                bg-white text-slate-700 border-slate-200 hover:text-brand-gold hover:border-brand-gold
                /* DARK */
                dark:bg-[#111214] dark:text-slate-200 dark:border-white/10
                dark:hover:text-brand-gold dark:hover:border-brand-gold
              mt-6 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] flex items-center gap-2 hover:underline"
              aria-expanded={showFullDesc}
              aria-controls={descContentId}
            >
              {showFullDesc ? "Menos" : "Ver mais"}
              <i
                className={`fa-solid fa-chevron-${showFullDesc ? "up" : "down"} text-[8px]`}
                aria-hidden="true"
              />
            </button>

            {/* Trust Badges */}
            <section
              className="mt-16 grid grid-cols-2 gap-6"
              aria-label="Garantias"
            >
              <div className="flex items-center gap-4 p-4 bg-brand-muted/10 border border-brand-muted">
                <i
                  className="fa-solid fa-box-open text-brand-gold text-lg"
                  aria-hidden="true"
                />
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                  Authentic Packaging Included
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-brand-muted/10 border border-brand-muted">
                <i
                  className="fa-solid fa-truck-fast text-brand-gold text-lg"
                  aria-hidden="true"
                />
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
                  Global Express Delivery
                </p>
              </div>
            </section>
          </section>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
