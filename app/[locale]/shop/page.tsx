import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/product-card";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import { formatEGP } from "@/lib/currency";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "تسوق معدات التخييم والشواء الفاخرة" : "Shop Luxury Stainless Steel Outdoor Gear",
    description: isArabic
      ? "تصفح مجموعة ستيلورا الكاملة من شوايات الفحم القابلة للطي وكراسي وطاولات التخييم المصنوعة من الستانلس ستيل ٣٠٤ في مصر."
      : "Explore the full STEELORA collection of foldable 304 stainless steel BBQ grills, camping chairs, and side tables in Egypt.",
  };
}

export const revalidate = 60;

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string; sort?: string; q?: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const currentCategory = searchParams.category?.toUpperCase() || "ALL";
  const currentSort = searchParams.sort || "featured";
  const searchQuery = searchParams.q || "";

  // Build Prisma filter
  const where: Record<string, unknown> = {};
  if (currentCategory !== "ALL") {
    where.category = currentCategory;
  }
  if (searchQuery) {
    where.OR = [
      { nameEn: { contains: searchQuery } },
      { nameAr: { contains: searchQuery } },
      { descriptionEn: { contains: searchQuery } },
      { descriptionAr: { contains: searchQuery } },
    ];
  }

  // Build Prisma sort
  let orderBy: Record<string, "asc" | "desc">[] = [{ isFeatured: "desc" }, { createdAt: "asc" }];
  if (currentSort === "price-low") {
    orderBy = [{ pricePiasters: "asc" }];
  } else if (currentSort === "price-high") {
    orderBy = [{ pricePiasters: "desc" }];
  } else if (currentSort === "bestseller") {
    orderBy = [{ isBestSeller: "desc" }, { pricePiasters: "desc" }];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  const categories = [
    { key: "ALL", label: dict.shop.allCategories },
    { key: "GRILL", label: dict.shop.grill },
    { key: "CHAIR", label: dict.shop.chair },
    { key: "TABLE", label: dict.shop.table },
    { key: "ACCESSORY", label: dict.shop.accessory },
    { key: "BUNDLE", label: dict.shop.bundle, highlight: true },
  ];

  return (
    <div className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
            {dict.hero.eyebrow}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-charcoal-black">
            {dict.shop.title}
          </h1>
          <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
            {dict.shop.subtitle}
          </p>
        </div>

        {/* Featured Bundle Banner Spotlight */}
        <div className="p-6 sm:p-8 rounded-xl bg-charcoal-950 text-white border border-gold/40 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold/20 text-gold text-[10px] uppercase font-bold tracking-wider border border-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{dict.bundleSpotlight.savings}</span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              {dict.bundleSpotlight.title}
            </h2>
            <p className="text-xs text-steel-300">
              {dict.bundleSpotlight.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-end hidden sm:block">
              <span className="text-[11px] text-steel-gray block line-through">
                {formatEGP(1595000, locale)}
              </span>
              <span className="text-xl font-heading font-bold text-gold">
                {formatEGP(1360000, locale)}
              </span>
            </div>
            <Link
              href={`/${locale}/shop/outdoor-luxury-set`}
              className="btn-gold py-3 px-6 text-xs font-bold flex items-center gap-2 shadow-goldGlow"
            >
              <span>{dict.bundleSpotlight.cta}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Filter Chips & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-steel-gray/20">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = currentCategory === cat.key;
              const href = `/${locale}/shop?category=${cat.key}${currentSort ? `&sort=${currentSort}` : ""}`;

              return (
                <Link
                  key={cat.key}
                  href={href}
                  className={`px-3.5 py-2 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-charcoal-black text-gold shadow-sm border border-gold/40"
                      : cat.highlight
                      ? "bg-gold/15 text-gold-dark border border-gold/40 hover:bg-gold/25"
                      : "bg-white text-steel-700 border border-steel-gray/20 hover:border-gold/50"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Results count & Sort select */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs">
            <span className="text-steel-600 font-mono text-[11px]">
              {dict.shop.showingResults.replace("{count}", products.length.toString())}
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-steel-gray" />
              <div className="flex items-center gap-1.5 text-xs font-medium text-steel-700">
                <Link
                  href={`/${locale}/shop?category=${currentCategory}&sort=featured`}
                  className={`px-2 py-1 rounded ${currentSort === "featured" ? "bg-charcoal text-gold font-bold" : "hover:text-gold"}`}
                >
                  {dict.shop.sortFeatured}
                </Link>
                <Link
                  href={`/${locale}/shop?category=${currentCategory}&sort=price-low`}
                  className={`px-2 py-1 rounded ${currentSort === "price-low" ? "bg-charcoal text-gold font-bold" : "hover:text-gold"}`}
                >
                  {dict.shop.sortPriceLowHigh}
                </Link>
                <Link
                  href={`/${locale}/shop?category=${currentCategory}&sort=price-high`}
                  className={`px-2 py-1 rounded ${currentSort === "price-high" ? "bg-charcoal text-gold font-bold" : "hover:text-gold"}`}
                >
                  {dict.shop.sortPriceHighLow}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-steel-gray/20 space-y-4">
            <p className="text-sm text-steel-gray">{dict.shop.emptyState}</p>
            <Link href={`/${locale}/shop`} className="btn-outline-gold text-xs px-6 py-2.5">
              {dict.shop.allCategories}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
