"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles, Check } from "lucide-react";
import { useCart, type CartProduct } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface ProductCardProps {
  product: CartProduct & {
    compareAtPricePiasters?: number | null;
    isBestSeller?: boolean;
    isFeatured?: boolean;
  };
  locale: Locale;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale }) => {
  const dict = getDictionary(locale);
  const { addToCart, items } = useCart();

  const isArabic = locale === "ar";
  const productName = isArabic ? product.nameAr : product.nameEn;
  const shortDesc = isArabic ? product.shortDescriptionAr : product.shortDescriptionEn;

  let parsedImages: string[] = [];
  try {
    parsedImages = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
  } catch {
    parsedImages = ["/images/products/grill-main.jpg"];
  }
  const mainImage = parsedImages[0] || "/images/products/grill-main.jpg";

  const isInCart = items.some((i) => i.product.id === product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, true);
  };

  return (
    <div className="group card-luxury flex flex-col overflow-hidden bg-white hover:border-gold/60 transition-all duration-300">
      {/* Image Container with Zoom & Full Visibility */}
      <Link
        href={`/${locale}/shop/${product.slug}`}
        className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-white p-2.5 flex items-center justify-center block border-b border-steel-gray/10"
      >
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-charcoal-black text-gold border border-gold/40 shadow-sm">
                {dict.common.bestseller}
              </span>
            )}
            {product.category === "BUNDLE" && (
              <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-gold text-charcoal shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                15% OFF
              </span>
            )}
          </div>

          {product.compareAtPricePiasters && product.compareAtPricePiasters > product.pricePiasters && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-charcoal-900/80 backdrop-blur-sm text-gold border border-gold/30">
              {dict.common.save}{" "}
              {formatEGP(product.compareAtPricePiasters - product.pricePiasters, locale)}
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-steel-gray">
            <span className="uppercase tracking-wider font-mono text-[10px] text-steel-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-gold">
              <Star className="w-3.5 h-3.5 fill-gold" />
              <span className="font-bold text-xs text-charcoal-700">5.0</span>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/${locale}/shop/${product.slug}`}
            className="block font-heading font-bold text-base sm:text-lg text-charcoal-black hover:text-gold transition-colors line-clamp-1"
          >
            {productName}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-steel-600 line-clamp-2 leading-relaxed">
            {shortDesc}
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-3 border-t border-steel-gray/10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg text-charcoal-900">
                {formatEGP(product.pricePiasters, locale)}
              </span>
              {product.compareAtPricePiasters && (
                <span className="text-xs text-steel-gray line-through">
                  {formatEGP(product.compareAtPricePiasters, locale)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold text-charcoal text-xs font-heading font-bold uppercase tracking-wider hover:bg-gold-light active:bg-gold-dark transition-all duration-200 shadow-sm group-hover:shadow-goldGlow"
            aria-label={`${dict.common.quickAdd}: ${productName}`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">{dict.common.addedToCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{dict.common.quickAdd}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
