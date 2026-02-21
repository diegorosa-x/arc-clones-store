import React, { useCallback } from "react";
import type { Product } from "../types/types";

import { useProducts } from "../hooks/useProducts";
import { useCatalogFilters } from "../hooks/useCatalogFilters";
import { useCart } from "../hooks/useCart";
import { useViewRouter } from "../hooks/useViewRouter";

import Header from "../components/common/Header";
import ProductDetailsPage from "../components/ProductDetailsPage";
import CatalogPage from "./CatalogPage";
import TechnicalBanner from "../section/TechnicalBanner";
import Footer from "../components/common/Footer";
import Cart from "../components/Cart";
import AIShopper from "../components/AIShopper";
import HomeHero from "../section/HomeHero";

const HomePage: React.FC = () => {
  const router = useViewRouter();

  // ✅ Busca produtos do Supabase
  const { products, loading, error } = useProducts();

  const {
    cart,
    isCartOpen,
    cartCount,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
  } = useCart();

  // ✅ Agora o filtro recebe os produtos reais + o viewMode
  const filters = useCatalogFilters(products, router.viewMode);

  const handleCategorySelect = useCallback(
    (cat: string) => {
      filters.setSelectedCategory(cat);
      filters.setFilterIds(null);

      if (cat === "All") router.goHome();
      else router.goCatalog();
    },
    [filters, router],
  );

  const handleViewProduct = useCallback(
    (product: Product) => {
      router.goDetails(product);
    },
    [router],
  );

  const handleRemoveFromCartById = useCallback(
    (id: string) => {
      const item = cart.find((c) => c.id === id);
      removeFromCart(id, item?.selectedFactory);
    },
    [cart, removeFromCart],
  );

  return (
    <div className="min-h-screen bg-brand-bg text-slate-900 dark:text-white transition-colors duration-300 selection:bg-brand-gold selection:text-brand-bg">
      <Header
        cartCount={cartCount}
        onSearch={filters.setSearchQuery}
        onCategorySelect={handleCategorySelect}
        onOpenCart={openCart}
      />

      {/* ✅ Feedback visual pra você debugar */}
      {error && (
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-600 dark:text-red-300">
            {error}
          </div>
        </div>
      )}

      {router.viewMode === "Home" &&
        !filters.searchQuery &&
        !filters.filterIds && (
          <HomeHero
            onOpenCatalog={() => {
              router.goCatalog();
            }}
            onCuradoria={(ids) => {
              filters.setFilterIds(ids);
              router.goCatalog();
            }}
          />
        )}

      <main>
        {router.viewMode === "Details" && router.activeProduct ? (
          <ProductDetailsPage
            product={router.activeProduct}
            onBack={router.goBackToCatalog}
            onAddToCart={addToCart}
          />
        ) : (
          <>
            {/* ✅ Loading leve (só quando estiver no Catalog/Home e sem products ainda) */}
            {loading && (
              <div className="mx-auto max-w-6xl px-4 py-6">
                <div className="rounded-lg border border-slate-200/20 bg-white/5 p-4">
                  Carregando produtos...
                </div>
              </div>
            )}

            <CatalogPage
              viewMode={
                router.viewMode === "Details" ? "Catalog" : router.viewMode
              }
              filterIds={filters.filterIds}
              searchQuery={filters.searchQuery}
              products={filters.filteredProducts}
              showSidebar={router.viewMode === "Catalog"}
              brands={filters.brands}
              movements={filters.movements}
              brandFilter={filters.brandFilter}
              factoryFilter={filters.factoryFilter}
              movementFilter={filters.movementFilter}
              priceRange={filters.priceRange}
              onBackHome={() => {
                filters.setFilterIds(null);
                router.goHome();
              }}
              onViewDetails={handleViewProduct}
              onQuickAdd={(prod) => {
                if (prod.factories) handleViewProduct(prod);
                else addToCart(prod);
              }}
              onBrandChange={filters.setBrandFilter}
              onFactoryChange={filters.setFactoryFilter}
              onMovementChange={filters.setMovementFilter}
              onPriceChange={filters.setPriceRange}
            />
          </>
        )}
      </main>

      {router.viewMode === "Home" && <TechnicalBanner />}

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cart}
        onRemove={handleRemoveFromCartById}
      />

      <AIShopper
        products={products}
        onRecommendationClick={(ids) => {
          filters.setFilterIds(ids);
          router.goCatalog();
        }}
      />
    </div>
  );
};

export default HomePage;
