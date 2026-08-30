"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart, type CartProduct } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface MobileStickyBarProps {
  product: CartProduct;
  locale: Locale;
}

export const StickyMobileAddToCartBar: React.FC<MobileStickyBarProps> = ({
  product,
  locale,
}) => {
  const dict = getDictionary(locale);
  const { addToCart } = useCart();

  const isArabic = locale === "ar";
  const productName = isArabic ? product.nameAr : product.nameEn;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-charcoal-950/95 backdrop-blur-md border-t border-steel-gray/30 p-3.5 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-heading font-semibold text-white truncate">
            {productName}
          </h4>
          <p className="text-sm font-extrabold text-gold">
            {formatEGP(product.pricePiasters, locale)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, 1, true)}
          className="btn-gold py-2.5 px-5 text-xs flex items-center gap-1.5 shrink-0 shadow-goldGlow"
          aria-label={dict.common.addToCart}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{dict.common.addToCart}</span>
        </button>
      </div>
    </div>
  );
};
