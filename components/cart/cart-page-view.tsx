"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface CartPageViewProps {
  locale: Locale;
}

export const CartPageView: React.FC<CartPageViewProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const {
    items,
    calculation,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const thresholdPiasters = calculation.freeShippingThresholdPiasters || 1000000;
  const currentNetPiasters = Math.max(0, calculation.subtotalPiasters - calculation.discountPiasters);
  const progressPct = Math.min(100, Math.round((currentNetPiasters / thresholdPiasters) * 100));
  const isFreeShipping = currentNetPiasters >= thresholdPiasters && currentNetPiasters > 0;

  return (
    <div className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
            {dict.about.eyebrow}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-black">
            {dict.cart.title}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-steel-gray/20 shadow-softCard space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-ivory-300 text-steel-gray flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-xl text-charcoal-black">
              {dict.cart.emptyTitle}
            </h2>
            <p className="text-xs text-steel-600 leading-relaxed">
              {dict.cart.emptyDesc}
            </p>
            <Link
              href={`/${locale}/shop`}
              className="btn-gold px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2 shadow-goldGlow mt-2"
            >
              <span>{dict.common.continueShopping}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {/* Shipping & Bundle Bar */}
              <div className="p-5 rounded-xl bg-charcoal-950 text-white border border-steel-gray/30 space-y-3 shadow-md">
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
                <div className="w-full h-2 bg-charcoal-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-500 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                {calculation.hasBundleDiscount && (
                  <div className="p-3 rounded-lg bg-gold/15 border border-gold/40 flex items-center gap-2 text-xs text-gold font-medium">
                    <Sparkles className="w-4 h-4 shrink-0 text-gold" />
                    <span>{dict.cart.bundleUnlocked}</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="rounded-2xl border border-steel-gray/20 bg-white overflow-hidden shadow-softCard divide-y divide-steel-gray/10">
                {items.map(({ product, quantity }) => {
                  let parsedImages: string[] = [];
                  try {
                    parsedImages = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
                  } catch {
                    parsedImages = ["/images/products/grill-main.jpg"];
                  }
                  const img = parsedImages[0] || "/images/products/grill-main.jpg";
                  const productName = isArabic ? product.nameAr : product.nameEn;
                  const itemTotal = product.pricePiasters * quantity;

                  return (
                    <div key={product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-charcoal-900 border border-steel-gray/20 shrink-0">
                          <Image
                            src={img}
                            alt={productName}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        <div className="space-y-1">
                          <Link
                            href={`/${locale}/shop/${product.slug}`}
                            className="font-heading font-bold text-sm sm:text-base text-charcoal-black hover:text-gold transition-colors block"
                          >
                            {productName}
                          </Link>
                          <p className="text-xs font-semibold text-gold-dark font-mono">
                            {formatEGP(product.pricePiasters, locale)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-steel-gray/10">
                        {/* Stepper */}
                        <div className="inline-flex items-center rounded-lg border border-steel-gray/30 bg-ivory-100 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 text-steel-700 hover:text-charcoal hover:bg-steel-gray/10 rounded transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-charcoal">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 text-steel-700 hover:text-charcoal hover:bg-steel-gray/10 rounded transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <span className="font-heading font-extrabold text-sm sm:text-base text-charcoal-black min-w-[90px] text-end">
                          {formatEGP(itemTotal, locale)}
                        </span>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-steel-gray hover:text-red-500 transition-colors p-1.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/${locale}/shop`}
                  className="text-xs font-heading font-semibold uppercase tracking-wider text-steel-700 hover:text-gold transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowIcon className={`w-3.5 h-3.5 ${isArabic ? "" : "rotate-180"}`} />
                  <span>{dict.common.continueShopping}</span>
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-steel-gray hover:text-red-500 transition-colors"
                >
                  {dict.cart.clearCart}
                </button>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-charcoal-950 text-white border border-steel-gray/30 shadow-luxury space-y-6">
              <h3 className="font-heading font-bold text-lg text-white border-b border-steel-gray/20 pb-4">
                {dict.checkout.orderSummary}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-steel-300">
                  <span>{dict.cart.subtotal}</span>
                  <span className="font-semibold text-white">
                    {formatEGP(calculation.subtotalPiasters, locale)}
                  </span>
                </div>

                {calculation.discountPiasters > 0 && (
                  <div className="flex items-center justify-between text-gold font-medium">
                    <span className="flex items-center gap-1.5">
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

                <div className="pt-4 border-t border-steel-gray/20 flex items-center justify-between text-base sm:text-lg font-heading font-extrabold text-white">
                  <span>{dict.cart.total}</span>
                  <span className="text-gold font-black">
                    {formatEGP(calculation.totalPiasters, locale)}
                  </span>
                </div>
                <p className="text-[10px] text-steel-gray text-center">
                  {dict.cart.taxIncluded}
                </p>
              </div>

              <Link
                href={`/${locale}/checkout`}
                className="w-full btn-gold py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-goldGlow"
              >
                <span>{dict.cart.checkoutButton}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <div className="pt-2 border-t border-steel-gray/20 space-y-2 text-xs text-steel-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold shrink-0" />
                  <span>{dict.common.freeShippingBadge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>{dict.common.warrantyBadge}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
