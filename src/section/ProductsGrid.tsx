import React from "react";
import type { Product } from "../types/types";
import ProductCard from "../components/ProductCard";

type Props = {
  products: Product[];
  viewMode: "Home" | "Catalog";
  onViewDetails: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
};

const ProductsGrid: React.FC<Props> = ({
  products,
  viewMode,
  onViewDetails,
  onQuickAdd,
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        viewMode === "Catalog" ? "lg:grid-cols-3" : "lg:grid-cols-4"
      } gap-10`}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onViewDetails={onViewDetails}
          onQuickAdd={() => onQuickAdd(p)}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;