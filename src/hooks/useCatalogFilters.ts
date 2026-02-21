// src/hooks/useCatalogFilters.ts
import { useMemo, useState } from "react";
import type { Product } from "../types/types";

export function useCatalogFilters(
  products: Product[],
  viewMode: "Home" | "Catalog" | "Details",
) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIds, setFilterIds] = useState<string[] | null>(null);

  const [brandFilter, setBrandFilter] = useState("All");
  const [factoryFilter, setFactoryFilter] = useState("All");
  const [movementFilter, setMovementFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(20000);

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);
  }, [products]);

  const movements = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.movement).filter(Boolean)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(q);
        const brandMatch = p.brand?.toLowerCase().includes(q);
        const tagsMatch = (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
        return Boolean(nameMatch || brandMatch || tagsMatch);
      });
    }

    if (filterIds) {
      list = list.filter((p) => filterIds.includes(p.id));
    }

    if (viewMode === "Catalog") {
      if (brandFilter !== "All") {
        list = list.filter((p) => p.brand === brandFilter);
      }

      if (factoryFilter !== "All") {
        list = list.filter((p) =>
          (p.factories ?? []).some((f) => f.factory === factoryFilter),
        );
      }

      if (movementFilter !== "All") {
        list = list.filter((p) => p.movement === movementFilter);
      }

      // ✅ sem any
      list = list.filter((p) => p.basePrice <= priceRange);
    }

    return list;
  }, [
    products,
    selectedCategory,
    searchQuery,
    filterIds,
    viewMode,
    brandFilter,
    factoryFilter,
    movementFilter,
    priceRange,
  ]);

  return {
    selectedCategory,
    searchQuery,
    filterIds,

    brandFilter,
    factoryFilter,
    movementFilter,
    priceRange,

    filteredProducts,
    brands,
    movements,

    setSelectedCategory,
    setSearchQuery,
    setFilterIds,
    setBrandFilter,
    setFactoryFilter,
    setMovementFilter,
    setPriceRange,
  };
}