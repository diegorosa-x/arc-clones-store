import { useCallback, useMemo, useState } from "react";
import type { CartItem, Manufacturer, Product } from "../types/types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    (product: Product, factory?: Manufacturer, finalPrice?: number) => {
      const pPrice = finalPrice || product.basePrice;

      setCart((prev) => {
        const itemKey = `${product.id}-${factory || "default"}`;
        const existing = prev.find(
          (item) =>
            `${item.id}-${item.selectedFactory || "default"}` === itemKey,
        );

        if (existing) {
          return prev.map((item) =>
            `${item.id}-${item.selectedFactory || "default"}` === itemKey
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [
          ...prev,
          {
            ...product,
            quantity: 1,
            selectedFactory: factory,
            finalPrice: pPrice,
          },
        ];
      });

      setIsCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((id: string, factory?: Manufacturer) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedFactory === factory),
      ),
    );
  }, []);

  return {
    cart,
    setCart, // útil se um dia quiser “limpar carrinho” etc
    isCartOpen,
    cartCount,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
  };
}