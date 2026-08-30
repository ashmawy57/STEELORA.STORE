"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface CartProduct {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  pricePiasters: number;
  compareAtPricePiasters?: number | null;
  images: string; // JSON string or array
  category: string;
  materialEn: string;
  materialAr: string;
  weightKg: number;
  weight: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartCalculation {
  subtotalPiasters: number;
  discountPiasters: number;
  shippingPiasters: number;
  totalPiasters: number;
  hasBundleDiscount: boolean;
  isBundleEligible: boolean;
  missingBundleSlugs: string[];
  totalWeightKg: number;
  freeShippingThresholdPiasters?: number;
  freeShippingRemainingPiasters: number;
}

interface CartContextType {
  items: CartItem[];
  totalItemCount: number;
  calculation: CartCalculation;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isUpsellModalOpen: boolean;
  setIsUpsellModalOpen: (open: boolean) => void;
  upsellTriggerProduct: CartProduct | null;
  addToCart: (product: CartProduct, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addBundleSet: (allBundleProducts: CartProduct[]) => void;
  openUpsellFor: (product: CartProduct) => void;
  closeUpsell: () => void;
}

const defaultCalculation: CartCalculation = {
  subtotalPiasters: 0,
  discountPiasters: 0,
  shippingPiasters: 0,
  totalPiasters: 0,
  hasBundleDiscount: false,
  isBundleEligible: false,
  missingBundleSlugs: [],
  totalWeightKg: 0,
  freeShippingRemainingPiasters: 1000000,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "steelora_cart_items_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [upsellTriggerProduct, setUpsellTriggerProduct] = useState<CartProduct | null>(null);
  const [calculation, setCalculation] = useState<CartCalculation>(defaultCalculation);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from storage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to storage:", e);
    }
  }, [items, isLoaded]);

  // Recalculate totals via API when items change
  const recalculate = useCallback(async (currentItems: CartItem[]) => {
    if (!currentItems.length) {
      setCalculation(defaultCalculation);
      return;
    }

    try {
      const payload = {
        items: currentItems.map((i) => ({
          productId: i.product.id,
          slug: i.product.slug,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/cart/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setCalculation(data);
      }
    } catch (err) {
      console.error("Recalculate error:", err);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      recalculate(items);
    }
  }, [items, isLoaded, recalculate]);

  const addToCart = useCallback(
    (product: CartProduct, quantity: number = 1, openDrawer: boolean = true) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });

      // If user added the BBQ Grill, trigger the luxury set upsell modal
      if (product.slug === "foldable-charcoal-bbq-grill") {
        setUpsellTriggerProduct(product);
        setIsUpsellModalOpen(true);
      } else if (openDrawer) {
        setIsDrawerOpen(true);
      }
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCalculation(defaultCalculation);
  }, []);

  const addBundleSet = useCallback((allBundleProducts: CartProduct[]) => {
    setItems((prev) => {
      const newItems = [...prev];
      for (const prod of allBundleProducts) {
        const idx = newItems.findIndex((i) => i.product.id === prod.id);
        if (idx >= 0) {
          newItems[idx] = { ...newItems[idx], quantity: 1 };
        } else {
          newItems.push({ product: prod, quantity: 1 });
        }
      }
      return newItems;
    });
    setIsUpsellModalOpen(false);
    setIsDrawerOpen(true);
  }, []);

  const openUpsellFor = useCallback((product: CartProduct) => {
    setUpsellTriggerProduct(product);
    setIsUpsellModalOpen(true);
  }, []);

  const closeUpsell = useCallback(() => {
    setIsUpsellModalOpen(false);
    setIsDrawerOpen(true);
  }, []);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        calculation,
        isDrawerOpen,
        setIsDrawerOpen,
        isUpsellModalOpen,
        setIsUpsellModalOpen,
        upsellTriggerProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addBundleSet,
        openUpsellFor,
        closeUpsell,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
