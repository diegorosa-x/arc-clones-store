import React, { useMemo } from 'react';
import type { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  isRecommended?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onQuickAdd,
  isRecommended = false,
}) => {
  const priceNumber = product.basePrice;

  const productUrl = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const slug = product.id || product.name;
    return `${window.location.origin}/produto/${encodeURIComponent(slug)}`;
  }, [product.id, product.name]);

  const brandName = product.brand;

  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: [product.image],
      description: product.description,
      category: product.category,
      brand: {
        '@type': 'Brand',
        name: brandName,
      },
      ...(productUrl ? { url: productUrl } : {}),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: priceNumber,
        availability: 'https://schema.org/InStock',
        ...(productUrl ? { url: productUrl } : {}),
      },
    };
  }, [
    product.name,
    product.image,
    product.description,
    product.category,
    brandName,
    productUrl,
    priceNumber,
  ]);

  return (
    <article
      className={`group relative flex flex-col 
        bg-white dark:bg-[#0f0f0f]
        border border-transparent dark:border-white/5
        overflow-hidden 
        shadow-xl dark:shadow-black/60
        transition-all duration-500 hover:-translate-y-1
        ${isRecommended ? 'ring-2 ring-brand-gold ring-inset' : ''}`}
      aria-label={`Produto: ${product.name}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* IMAGE */}
      <figure className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-black transition-colors">
        <img
          src={product.image}
          alt={`${product.name} - ${brandName}`}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-1000"
          loading="lazy"
          decoding="async"
        />

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isRecommended && (
            <span className="bg-brand-gold text-black text-[9px] font-black px-3 py-1 shadow-xl uppercase tracking-[0.2em]">
              ESCOLHA DO CONCIERGE
            </span>
          )}

          <span className="bg-black text-brand-gold text-[9px] font-bold px-3 py-1 shadow-xl uppercase tracking-[0.2em] border border-brand-gold/30">
            {brandName} CLONE
          </span>

          {!!product.factories?.length && (
            <span className="bg-brand-gold text-black text-[9px] font-bold px-3 py-1 shadow-xl uppercase tracking-[0.2em]">
              SUPER CLONE
            </span>
          )}
        </div>

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-sm">
          <button
            onClick={() => onViewDetails(product)}
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-brand-gold hover:text-black hover:scale-110 transition-all duration-300"
            aria-label={`Ver detalhes de ${product.name}`}
            type="button"
          >
            <i className="fa-regular fa-eye text-xl" />
          </button>

          <button
            onClick={() => onQuickAdd(product)}
            className="w-14 h-14 rounded-full bg-brand-gold text-black flex items-center justify-center shadow-2xl hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
            aria-label={`Adicionar ${product.name}`}
            type="button"
          >
            <i className="fa-solid fa-plus text-xl" />
          </button>
        </div>

        <figcaption className="sr-only">
          Imagem do produto {product.name} da marca {brandName}.
        </figcaption>
      </figure>

      {/* CONTENT */}
      <header className="p-6 flex flex-col flex-1 bg-white dark:bg-[#0f0f0f]">
        <p className="text-[9px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-[0.2em] mb-2">
          {brandName}
        </p>

        <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white leading-tight mb-4 min-h-[48px]">
          {product.name}
        </h3>

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10">
          <p className="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest mb-1">
            Valor do Investimento
          </p>

          <div className="flex items-baseline justify-between">
            <data
              value={priceNumber}
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {priceNumber.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </data>

            {product.movement && (
              <span className="text-[9px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest">
                {product.movement}
              </span>
            )}
          </div>
        </div>
      </header>
    </article>
  );
};

export default ProductCard;