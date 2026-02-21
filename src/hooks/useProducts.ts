import { useEffect, useState } from "react";
import type { Product } from "../types/types";
import { fetchProducts } from "../service/productsService";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await fetchProducts();
        console.log("🔥 PRODUTOS DO SUPABASE:", data);

        if (mounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error("❌ ERRO AO BUSCAR:", err);

        if (mounted) {
          setError("Erro ao buscar produtos");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadProducts(); 

    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
}
