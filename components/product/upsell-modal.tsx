"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart, type CartProduct } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface UpsellModalProps {
  locale: Locale;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const { isUpsellModalOpen, closeUpsell, addBundleSet } = useCart();
  const [bundleProducts, setBundleProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (isUpsellModalOpen) {
      // Fetch all bundle products
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/products");
          if (res.ok) {
            const data = await res.json();
            const bundleSlugs = [
              "foldable-charcoal-bbq-grill",
              "foldable-outdoor-chair",
              "foldable-side-table-stool",
              "heavy-duty-tactical-carry-bag",
            ];
            const filtered = data.filter((p: CartProduct) => bundleSlugs.includes(p.slug));
            setBundleProducts(filtered);
          }
        } catch (e) {
          console.error("Failed to fetch upsell products:", e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProducts();
    }
  }, [isUpsellModalOpen]);

  if (!isUpsellModalOpen) return null;

  const handleUpgradeToBundle = () => {
    if (bundleProducts.length > 0) {
      addBundleSet(bundleProducts);
    } else {
      closeUpsell();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={closeUpsell}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-charcoal-950 text-white rounded-xl border border-gold/40 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Gold Banner */}
        <div className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-charcoal px-6 py-2.5 flex items-center justify-between font-heading font-bold text-xs uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-charcoal" />
            <span>{dict.upsellModal.savingsNotice}</span>
          </div>
          <span className="font-extrabold">{dict.bundleSpotlight.savings}</span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={closeUpsell}
          className="absolute top-10 end-4 p-1.5 rounded-lg text-steel-gray hover:text-white hover:bg-white/10 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center sm:text-start max-w-lg">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              {dict.upsellModal.title}
            </h3>
            <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
              {dict.upsellModal.subtitle}
            </p>
          </div>

          {/* 4 Bundle Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                slug: "foldable-charcoal-bbq-grill",
                name: isArabic ? "شواية ستيلورا" : "Steelora Grill",
                img: "/images/products/grill-1.png",
                price: 170000,
              },
              {
                slug: "foldable-outdoor-chair",
                name: isArabic ? "كرسي التخييم الفاخر" : "Luxury Outdoor Chair",
                img: "/images/products/chair-main.jpg",
                price: 395000,
              },
              {
                slug: "foldable-side-table-stool",
                name: isArabic ? "طاولة جانبية ومقعد" : "Side Table / Stool",
                img: "/images/products/table-main.jpg",
                price: 285000,
              },
              {
                slug: "heavy-duty-tactical-carry-bag",
                name: isArabic ? "حقيبة حمل تكتيكية" : "Tactical Carry Bag",
                img: "/images/products/bag-main.jpg",
                price: 120000,
              },
            ].map((item, idx) => (
              <div
                key={item.slug}
                className="relative rounded-lg bg-charcoal-900 border border-steel-gray/30 p-2.5 flex flex-col items-center text-center space-y-2 group hover:border-gold/60 transition-colors"
              >
                <div className="absolute top-2 end-2 w-5 h-5 rounded-full bg-gold text-charcoal flex items-center justify-center shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="relative w-full aspect-square rounded-md overflow-hidden bg-charcoal-800">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="120px"
                  />
                </div>
                <div className="w-full">
                  <span className="text-[11px] font-heading font-semibold text-steel-100 line-clamp-1 block">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-steel-gray">
                    {formatEGP(item.price, locale)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Comparison Box */}
          <div className="p-4 rounded-lg bg-charcoal-900 border border-steel-gray/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-steel-gray block">{dict.upsellModal.originalTotal}:</span>
                <span className="text-steel-300 font-semibold line-through text-sm">
                  {formatEGP(1595000, locale)}
                </span>
              </div>
              <div className="h-8 w-px bg-steel-gray/30" />
              <div>
                <span className="text-gold block font-semibold">{dict.upsellModal.bundleTotal}:</span>
                <span className="text-gold font-extrabold text-lg sm:text-xl font-heading">
                  {formatEGP(1360000, locale)}
                </span>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/40 text-xs font-bold">
              {locale === "ar" ? "وفر ٢,٣٥٠ ج.م فوري" : "Save EGP 2,350 Instantly"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleUpgradeToBundle}
              className="w-full sm:flex-1 btn-gold py-3.5 flex items-center justify-center gap-2 shadow-goldGlow"
            >
              <span>{dict.upsellModal.upgradeCta}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={closeUpsell}
              className="w-full sm:w-auto px-6 py-3.5 text-xs text-steel-300 hover:text-white transition-colors"
            >
              {dict.upsellModal.keepGrillCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
