"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Layers,
  Flame,
  Maximize2,
  Box,
} from "lucide-react";
import { useCart, type CartProduct } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { StickyMobileAddToCartBar } from "@/components/product/mobile-sticky-bar";
import { getCategoryBadge } from "@/lib/categories";

interface ProductDetailViewProps {
  product: CartProduct & {
    descriptionEn: string;
    descriptionAr: string;
    compareAtPricePiasters?: number | null;
    foldedDimensions: string;
    openDimensions: string;
    whatsIncludedEn: string;
    whatsIncludedAr: string;
    specsEn: string;
    specsAr: string;
    isBestSeller?: boolean;
    mainCategory?: string;
    subCategory?: string | null;
    reviews: Array<{
      id: string;
      author: string;
      rating: number;
      commentEn: string;
      commentAr: string;
      createdAt: Date | string;
    }>;
  };
  relatedProducts: Array<CartProduct & { compareAtPricePiasters?: number | null }>;
  locale: Locale;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
  locale,
}) => {
  const dict = getDictionary(locale);
  const { addToCart, items, openUpsellFor } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const productName = isArabic ? product.nameAr : product.nameEn;
  const description = isArabic ? product.descriptionAr : product.descriptionEn;
  const material = isArabic ? product.materialAr : product.materialEn;
  const categoryBadge = getCategoryBadge(product.mainCategory, product.subCategory, product.category, locale);

  let images: string[] = [];
  try {
    images = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
  } catch {
    images = ["/images/products/grill-main.jpg"];
  }

  let whatsIncluded: string[] = [];
  try {
    const raw = isArabic ? product.whatsIncludedAr : product.whatsIncludedEn;
    whatsIncluded = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    whatsIncluded = [];
  }

  let specs: Record<string, string> = {};
  try {
    const raw = isArabic ? product.specsAr : product.specsEn;
    specs = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    specs = {};
  }

  const isGrill = product.slug === "foldable-charcoal-bbq-grill";

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  return (
    <>
      <div className="pt-5 pb-28 sm:py-12 bg-ivory-200 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-steel-gray font-medium">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors shrink-0">
              {dict.nav.home}
            </Link>
            <span className="shrink-0">/</span>
            <Link href={`/${locale}/shop`} className="hover:text-gold transition-colors shrink-0">
              {dict.nav.shop}
            </Link>
            <span className="shrink-0">/</span>
            <span className="text-charcoal-900 font-semibold truncate max-w-[180px] sm:max-w-none">
              {productName}
            </span>
          </nav>

          {/* Main Product Layout: Gallery (Left) + Details (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Active Large Image with Full Visibility */}
              <div className="relative aspect-square sm:aspect-square rounded-2xl overflow-hidden bg-white border border-steel-gray/20 shadow-softCard p-4 flex items-center justify-center">
                <Image
                  src={images[activeImageIndex] || images[0] || "/images/products/grill-main.jpg"}
                  alt={productName}
                  fill
                  priority
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Top Badges */}
                <div className="absolute top-4 start-4 flex flex-wrap gap-2 pointer-events-none">
                  {product.isBestSeller && (
                    <span className="px-3 py-1 rounded-md text-xs font-heading font-bold uppercase tracking-wider bg-charcoal text-gold border border-gold/40 shadow">
                      {dict.common.bestseller}
                    </span>
                  )}
                  {product.category === "BUNDLE" && (
                    <span className="px-3 py-1 rounded-md text-xs font-heading font-bold uppercase tracking-wider bg-gold text-charcoal shadow flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      15% BUNDLE SAVINGS
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-white p-1 flex items-center justify-center ${
                        activeImageIndex === idx
                          ? "border-gold shadow-md scale-105"
                          : "border-steel-gray/30 opacity-80 hover:opacity-100 hover:border-steel-gray/60"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${productName} thumbnail ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Features Callout Box */}
              {isGrill && (
                <div className="p-5 rounded-xl bg-charcoal-950 text-white border border-gold/40 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-gold font-heading font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>{dict.product.keyHighlights}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-steel-200">
                    <div className="p-3 rounded-lg bg-charcoal-900 border border-steel-gray/20 space-y-1">
                      <Box className="w-4 h-4 text-gold" />
                      <span className="font-bold text-white block">
                        {isArabic ? "حقيبة كوردورا مبطنة" : "Custom Carry Bag"}
                      </span>
                      <p className="text-[11px] text-steel-gray">
                        {dict.product.grillHighlight1}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-charcoal-900 border border-steel-gray/20 space-y-1">
                      <Flame className="w-4 h-4 text-gold" />
                      <span className="font-bold text-white block">
                        {isArabic ? "شبكة شواء ستانلس ٣٠٤" : "304 Grill Grate"}
                      </span>
                      <p className="text-[11px] text-steel-gray">
                        {dict.product.grillHighlight2}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-charcoal-900 border border-steel-gray/20 space-y-1">
                      <Layers className="w-4 h-4 text-gold" />
                      <span className="font-bold text-white block">
                        {isArabic ? "رف تسخين علوي مدمج" : "Upper Warming Rack"}
                      </span>
                      <p className="text-[11px] text-steel-gray">
                        {dict.product.grillHighlight3}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Product Purchase Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Header Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-xs text-gold-dark tracking-wide bg-gold/10 px-2.5 py-1 rounded-md border border-gold/20">
                    {categoryBadge.full}
                  </span>
                  <div className="flex items-center gap-1.5 text-gold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-charcoal-800">(5.0)</span>
                  </div>
                </div>

                <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-charcoal-black leading-tight">
                  {productName}
                </h1>

                {/* Pricing in EGP */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
                    {formatEGP(product.pricePiasters, locale)}
                  </span>
                  {product.compareAtPricePiasters && (
                    <span className="text-sm sm:text-base text-steel-gray line-through">
                      {formatEGP(product.compareAtPricePiasters, locale)}
                    </span>
                  )}
                  {product.compareAtPricePiasters && product.compareAtPricePiasters > product.pricePiasters && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-gold/20 text-gold-dark border border-gold/40">
                      {dict.common.save}{" "}
                      {formatEGP(product.compareAtPricePiasters - product.pricePiasters, locale)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-green-700 font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{dict.common.inStock}</span>
                </div>
              </div>

              {/* Action Buttons: Stepper + Add to Cart */}
              <div className="p-6 rounded-xl bg-white border border-steel-gray/20 shadow-softCard space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center rounded-lg border border-steel-gray/30 bg-ivory-100 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-steel-700 hover:text-charcoal hover:bg-steel-gray/10 rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-heading font-bold text-charcoal">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-steel-700 hover:text-charcoal hover:bg-steel-gray/10 rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 btn-gold py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-goldGlow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{dict.common.addToCart}</span>
                  </button>
                </div>

                {/* Upsell Banner trigger on Grill */}
                {isGrill && (
                  <button
                    type="button"
                    onClick={() => openUpsellFor(product)}
                    className="w-full p-3 rounded-lg bg-gold/10 border border-gold/40 text-gold-dark hover:bg-gold/20 transition-all text-xs font-heading font-bold flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-gold" />
                      {dict.product.completeTheSet}
                    </span>
                    <span className="text-[11px] underline">15% OFF</span>
                  </button>
                )}

                {/* Trust Badges */}
                <div className="pt-4 border-t border-steel-gray/10 space-y-2 text-xs text-steel-600">
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

              {/* Description Markdown */}
              <div className="prose prose-sm max-w-none text-charcoal-700 leading-relaxed space-y-3 whitespace-pre-line text-xs sm:text-sm">
                {description}
              </div>
            </div>
          </div>

          {/* Technical Specifications & What's in the Box Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-steel-gray/20">
            {/* Specs Table */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading font-extrabold text-xl text-charcoal-black">
                {dict.product.specifications}
              </h3>
              <div className="rounded-xl border border-steel-gray/20 bg-white overflow-hidden shadow-softCard">
                <div className="divide-y divide-steel-gray/15 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 p-3.5 bg-ivory-100">
                    <span className="font-bold text-charcoal-800">{dict.product.material}</span>
                    <span className="text-steel-700">{material}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-bold text-charcoal-800">{dict.product.openDims}</span>
                    <span className="text-steel-700 font-mono">{product.openDimensions}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 bg-ivory-100">
                    <span className="font-bold text-charcoal-800">{dict.product.foldedDims}</span>
                    <span className="text-steel-700 font-mono">{product.foldedDimensions}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-bold text-charcoal-800">{dict.product.weight}</span>
                    <span className="text-steel-700">{product.weight}</span>
                  </div>
                  {Object.entries(specs).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 p-3.5 ${idx % 2 === 0 ? "bg-ivory-100" : ""}`}
                    >
                      <span className="font-bold text-charcoal-800">{key}</span>
                      <span className="text-steel-700">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included Box */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-heading font-extrabold text-xl text-charcoal-black">
                {dict.product.whatsIncluded}
              </h3>
              <div className="rounded-xl border border-steel-gray/20 bg-white p-6 shadow-softCard space-y-3">
                <ul className="space-y-2.5 text-xs sm:text-sm text-steel-700">
                  {whatsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* "Complete Your Outdoor Set" Cross-Sell Grid */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 border-t border-steel-gray/20 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
                    {dict.bundleSpotlight.eyebrow}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-charcoal-black">
                    {dict.product.completeTheSet}
                  </h3>
                </div>
                <Link
                  href={`/${locale}/shop/outdoor-luxury-set`}
                  className="text-xs font-heading font-bold text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>{dict.bundleSpotlight.cta}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="card-luxury p-4 flex flex-col justify-between space-y-3 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-charcoal-900 shrink-0">
                        <Image
                          src={
                            typeof item.images === "string"
                              ? JSON.parse(item.images)[0]
                              : item.images[0] || "/images/products/grill-main.jpg"
                          }
                          alt={isArabic ? item.nameAr : item.nameEn}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/${locale}/shop/${item.slug}`}
                          className="font-heading font-bold text-xs sm:text-sm text-charcoal hover:text-gold transition-colors line-clamp-1"
                        >
                          {isArabic ? item.nameAr : item.nameEn}
                        </Link>
                        <span className="text-xs font-bold text-gold block mt-0.5">
                          {formatEGP(item.pricePiasters, locale)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(item, 1, true)}
                      className="w-full btn-outline-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{dict.common.quickAdd}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="pt-12 border-t border-steel-gray/20 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-2xl text-charcoal-black">
                {dict.product.reviewsTitle}
              </h3>
              <span className="text-xs text-steel-gray">
                5.0 {dict.product.ratingOutOf}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-xl bg-white border border-steel-gray/20 shadow-softCard space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs sm:text-sm text-charcoal">
                      {rev.author}
                    </span>
                    <div className="flex text-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-steel-700 leading-relaxed italic">
                    &ldquo;{isArabic ? rev.commentAr : rev.commentEn}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <StickyMobileAddToCartBar product={product} locale={locale} />
    </>
  );
};
