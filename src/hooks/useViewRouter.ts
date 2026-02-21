import { useCallback, useState } from "react";
import type { Product } from "../types/types";

export type ViewMode = "Home" | "Catalog" | "Details";

export function useViewRouter() {
  const [viewMode, setViewMode] = useState<ViewMode>("Home");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollCatalogAnchor = () => {
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const goHome = useCallback(() => {
    setViewMode("Home");
    scrollTop();
  }, []);

  const goCatalog = useCallback(() => {
    setViewMode("Catalog");
    scrollCatalogAnchor();
  }, []);

  const goDetails = useCallback((product: Product) => {
    setActiveProduct(product);
    setViewMode("Details");
    scrollTop();
  }, []);

  const goBackToCatalog = useCallback(() => {
    setViewMode("Catalog");
    scrollTop();
  }, []);

  return {
    viewMode,
    activeProduct,

    goHome,
    goCatalog,
    goDetails,
    goBackToCatalog,
  };
}