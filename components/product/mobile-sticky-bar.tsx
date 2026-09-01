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
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-charcoal-950/95 backdrop-blur-xl border-t border-steel-gray/30 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_32px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom duration-300">
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
          className="btn-gold py-2.5 px-5 text-xs flex items-center gap-1.5 shrink-0 shadow-goldGlow active:scale-95 transition-transform"
          aria-label={dict.common.addToCart}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{dict.common.addToCart}</span>
        </button>
      </div>
    </div>
  );
};
