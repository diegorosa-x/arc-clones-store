import React from "react";
import type { Product } from "../types/types";
import CatalogHeader from "../components/CatalogHeader";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductsGrid from "../section/ProductsGrid";
import EmptyCatalogState from "../section/EmptyCatalogState";


type Props = {
  viewMode: "Home" | "Catalog";
  filterIds: string[] | null;
  searchQuery: string;

  products: Product[];

  // sidebar
  showSidebar: boolean;
  brands: string[];
  movements: (string | null | undefined)[];
  brandFilter: string;
  factoryFilter: string;
  movementFilter: string;
  priceRange: number;

  onBackHome: () => void;
  onViewDetails: (p: Product) => void;
  onQuickAdd: (p: Product) => void;

  onBrandChange: (v: string) => void;
  onFactoryChange: (v: string) => void;
  onMovementChange: (v: string) => void;
  onPriceChange: (v: number) => void;
};

const CatalogPage: React.FC<Props> = ({
  viewMode,
  filterIds,
  searchQuery,
  products,
  showSidebar,
  brands,
  movements,
  brandFilter,
  factoryFilter,
  movementFilter,
  priceRange,
  onBackHome,
  onViewDetails,
  onQuickAdd,
  onBrandChange,
  onFactoryChange,
  onMovementChange,
  onPriceChange,
}) => {

  console.log("imageeeeeeeeeeeeeeeeeeeeeeeee")
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <CatalogHeader
        viewMode={viewMode}
        filterIds={filterIds}
        searchQuery={searchQuery}
        onBackHome={onBackHome}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        {showSidebar && (
          <FiltersSidebar
            brands={brands}
            movements={movements}
            brandFilter={brandFilter}
            factoryFilter={factoryFilter}
            movementFilter={movementFilter}
            priceRange={priceRange}
            onBrandChange={onBrandChange}
            onFactoryChange={onFactoryChange}
            onMovementChange={onMovementChange}
            onPriceChange={onPriceChange}
          />
        )}

        <div className="flex-1">
          {products.length > 0 ? (
            <ProductsGrid
              products={products}
              viewMode={viewMode}
              onViewDetails={onViewDetails}
              onQuickAdd={onQuickAdd}
            />
          ) : (
            <EmptyCatalogState />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;