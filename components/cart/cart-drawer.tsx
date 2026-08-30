"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface CartDrawerProps {
  locale: Locale;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const {
    items,
    totalItemCount,
    calculation,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const isArabic = locale === "ar";

  if (!isDrawerOpen) return null;

  // Calculate free shipping progress (Threshold: 1,000,000 piasters = 10,000 EGP)
  const thresholdPiasters = calculation.freeShippingThresholdPiasters || 1000000;
  const currentNetPiasters = Math.max(0, calculation.subtotalPiasters - calculation.discountPiasters);
  const progressPct = Math.min(100, Math.round((currentNetPiasters / thresholdPiasters) * 100));
  const isFreeShipping = currentNetPiasters >= thresholdPiasters && currentNetPiasters > 0;

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      <div
        className={`fixed inset-y-0 max-w-full flex ${
          isArabic ? "left-0" : "right-0"
        }`}
      >
        <div
          className={`w-screen max-w-md bg-charcoal-900 text-white shadow-2xl border-steel-gray/30 flex flex-col ${
            isArabic ? "border-r animate-in slide-in-from-left duration-300" : "border-l animate-in slide-in-from-right duration-300"
          }`}
        >
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-steel-gray/20 flex items-center justify-between bg-charcoal-950">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-heading font-bold text-base uppercase tracking-wider text-white">
                {dict.cart.title}
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold bg-gold/20 text-gold border border-gold/30 rounded-full">
                {totalItemCount}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-steel-gray hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & Bundle Progress Bar */}
          {items.length > 0 && (
            <div className="px-6 py-3.5 bg-charcoal-800/80 border-b border-steel-gray/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-steel-200 font-medium">
                  {isFreeShipping
                    ? dict.cart.shippingProgressFree
                    : dict.cart.shippingProgressRemaining.replace(
                        "{amount}",
                        formatEGP(calculation.freeShippingRemainingPiasters, locale)
                      )}
                </span>
                <span className="font-bold text-gold">{progressPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-charcoal-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-500 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Bundle Discount Alert Banner */}
              {calculation.hasBundleDiscount && (
                <div className="mt-2 p-2.5 rounded-lg bg-gold/15 border border-gold/40 flex items-center gap-2 text-xs text-gold font-medium animate-pulse">
                  <Sparkles className="w-4 h-4 shrink-0 text-gold" />
                  <span>{dict.cart.bundleUnlocked}</span>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-charcoal-800 border border-steel-gray/20 flex items-center justify-center text-steel-gray">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {dict.cart.emptyTitle}
                  </h3>
                  <p className="text-xs text-steel-gray mt-1 max-w-xs leading-relaxed">
                    {dict.cart.emptyDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn-outline-gold text-xs px-6 py-2.5 mt-2"
                >
                  {dict.common.continueShopping}
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                let parsedImages: string[] = [];
                try {
                  parsedImages = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
                } catch {
                  parsedImages = ["/images/products/grill-main.jpg"];
                }
                const imageSrc = parsedImages[0] || "/images/products/grill-main.jpg";

                const productName = isArabic ? product.nameAr : product.nameEn;
                const itemTotal = product.pricePiasters * quantity;

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 rounded-lg bg-charcoal-950/70 border border-steel-gray/20 hover:border-steel-gray/40 transition-colors"
                  >
                    {/* Product Thumbnail */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-charcoal-800 border border-steel-gray/20 shrink-0">
                      <Image
                        src={imageSrc}
                        alt={productName}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/${locale}/shop/${product.slug}`}
                            onClick={() => setIsDrawerOpen(false)}
                            className="font-heading font-semibold text-xs sm:text-sm text-white hover:text-gold transition-colors line-clamp-1"
                          >
                            {productName}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="text-steel-gray hover:text-red-400 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs font-bold text-gold">
                          {formatEGP(product.pricePiasters, locale)}
                        </p>
                      </div>

                      {/* Quantity Stepper & Item Total */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded border border-steel-gray/30 bg-charcoal-800">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-steel-300 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-steel-300 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-heading font-semibold text-steel-200">
                          {formatEGP(itemTotal, locale)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 bg-charcoal-950 border-t border-steel-gray/20 space-y-4">
              {/* Totals Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-steel-300">
                  <span>{dict.cart.subtotal}</span>
                  <span className="font-semibold text-white">
                    {formatEGP(calculation.subtotalPiasters, locale)}
                  </span>
                </div>

                {calculation.discountPiasters > 0 && (
                  <div className="flex items-center justify-between text-gold font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {dict.cart.bundleDiscount}
                    </span>
                    <span>-{formatEGP(calculation.discountPiasters, locale)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-steel-300">
                  <span>{dict.cart.shippingEstimate}</span>
                  <span className={calculation.shippingPiasters === 0 ? "text-gold font-bold" : "text-white font-semibold"}>
                    {calculation.shippingPiasters === 0
                      ? dict.common.free
                      : formatEGP(calculation.shippingPiasters, locale)}
                  </span>
                </div>

                <div className="pt-2 border-t border-steel-gray/20 flex items-center justify-between text-sm sm:text-base font-heading font-bold text-white">
                  <span>{dict.cart.total}</span>
                  <span className="text-gold font-extrabold">
                    {formatEGP(calculation.totalPiasters, locale)}
                  </span>
                </div>
                <p className="text-[10px] text-steel-gray text-center">
                  {dict.cart.taxIncluded}
                </p>
              </div>

              {/* Checkout Button */}
              <div className="space-y-2">
                <Link
                  href={`/${locale}/checkout`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full btn-gold py-3.5 flex items-center justify-center gap-2 shadow-goldGlow"
                >
                  <span>{dict.cart.checkoutButton}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-xs text-steel-gray hover:text-white transition-colors"
                  >
                    {dict.common.continueShopping}
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-steel-gray hover:text-red-400 transition-colors"
                  >
                    {dict.cart.clearCart}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
