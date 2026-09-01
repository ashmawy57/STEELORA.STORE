import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ArrowLeft, SlidersHorizontal, Flame, Armchair, Package } from "lucide-react";
import { getStoreProducts } from "@/lib/products-store";
import { ProductCard } from "@/components/product/product-card";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import { formatEGP } from "@/lib/currency";
import { CATEGORY_TREE, buildPrismaCategoryFilter } from "@/lib/categories";
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
      ? "تصفح مجموعة ستيلورا الكاملة من شوايات الفحم القابلة للطي وإكسسوارات الشواء وكراسي وطاولات التخييم المصنوعة من الستانلس ستيل ٣٠٤ في مصر."
      : "Explore the full STEELORA collection of foldable 304 stainless steel BBQ grills, accessories, camping chairs, and side tables in Egypt.",
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

  const currentCategoryParam = searchParams.category?.toUpperCase() || "ALL";
  const currentSort = searchParams.sort || "featured";
  const searchQuery = searchParams.q || "";

  // Build filter
  let where: Record<string, unknown> = {};
  const categoryFilter = buildPrismaCategoryFilter(currentCategoryParam);
  if (categoryFilter) {
    where = { ...categoryFilter };
  }

  if (searchQuery) {
    where.AND = [
      ...(where.OR ? [{ OR: where.OR }] : []),
      {
        OR: [
          { nameEn: { contains: searchQuery } },
          { nameAr: { contains: searchQuery } },
          { descriptionEn: { contains: searchQuery } },
          { descriptionAr: { contains: searchQuery } },
        ],
      },
    ];
    delete where.OR;
  }

  // Build sort
  let orderBy: Record<string, "asc" | "desc">[] = [{ isFeatured: "desc" }, { createdAt: "asc" }];
  if (currentSort === "price-low") {
    orderBy = [{ pricePiasters: "asc" }];
  } else if (currentSort === "price-high") {
    orderBy = [{ pricePiasters: "desc" }];
  } else if (currentSort === "bestseller") {
    orderBy = [{ isBestSeller: "desc" }, { pricePiasters: "desc" }];
  }

  const products = await getStoreProducts(where, orderBy);

  // Determine active main category group
  const isBBQActive =
    currentCategoryParam === "BBQ" ||
    currentCategoryParam === "CHARCOAL_GRILL" ||
    currentCategoryParam === "BBQ_ACCESSORY";

  const isFurnitureActive =
    currentCategoryParam === "OUTDOOR_FURNITURE" ||
    currentCategoryParam === "CHAIR" ||
    currentCategoryParam === "TABLE";

  const isBundleActive = currentCategoryParam === "BUNDLE";
  const isAllActive = currentCategoryParam === "ALL";

  // Active main tab
  let activeMainKey = "ALL";
  if (isBBQActive) activeMainKey = "BBQ";
  else if (isFurnitureActive) activeMainKey = "OUTDOOR_FURNITURE";
  else if (isBundleActive) activeMainKey = "BUNDLE";

  const mainTabs = [
    {
      key: "ALL",
      label: dict.shop.allCategories,
      icon: null,
    },
    {
      key: "BBQ",
      label: isArabic ? "معدات الشواء (BBQ)" : "BBQ",
      icon: Flame,
    },
    {
      key: "OUTDOOR_FURNITURE",
      label: isArabic ? "الأثاث الخارجي (Furniture)" : "Outdoor Furniture",
      icon: Armchair,
    },
    {
      key: "BUNDLE",
      label: dict.shop.bundle,
      icon: Package,
      highlight: true,
    },
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

        {/* ═══════════════ HIERARCHICAL CATEGORY FILTERS ═══════════════ */}
        <div className="space-y-4 pt-4 border-t border-steel-gray/20">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {mainTabs.map((tab) => {
              const isActive = activeMainKey === tab.key;
              const href = `/${locale}/shop?category=${tab.key}${currentSort ? `&sort=${currentSort}` : ""}`;
              const TabIcon = tab.icon;

              return (
                <Link
                  key={tab.key}
                  href={href}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-charcoal-black text-gold shadow-md border border-gold/50 scale-[1.02]"
                      : tab.highlight
                      ? "bg-gold/15 text-gold-dark border border-gold/40 hover:bg-gold/25"
                      : "bg-white text-steel-700 border border-steel-gray/25 hover:border-gold/50 hover:bg-gold/5"
                  }`}
                >
                  {TabIcon && <TabIcon className={`w-4 h-4 ${isActive ? "text-gold" : "text-steel-500"}`} />}
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Subcategory Filter Pills */}
          {(isBBQActive || isFurnitureActive || isAllActive) && (
            <div className="p-3 sm:p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-steel-gray/20 flex flex-wrap items-center gap-2">
              <span className="text-xs font-heading font-semibold text-steel-500 me-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                {dict.shop.filterBySub}:
              </span>

              {/* If BBQ is active */}
              {isBBQActive && (
                <>
                  <Link
                    href={`/${locale}/shop?category=BBQ${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      currentCategoryParam === "BBQ"
                        ? "bg-gold text-charcoal font-bold shadow-sm"
                        : "bg-charcoal-50 text-steel-700 hover:bg-gold/15"
                    }`}
                  >
                    {isArabic ? "كل الشواء" : "All BBQ"}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=CHARCOAL_GRILL${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      currentCategoryParam === "CHARCOAL_GRILL"
                        ? "bg-gold text-charcoal font-bold shadow-sm"
                        : "bg-charcoal-50 text-steel-700 hover:bg-gold/15"
                    }`}
                  >
                    {dict.shop.charcoalGrill}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=BBQ_ACCESSORY${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      currentCategoryParam === "BBQ_ACCESSORY"
                        ? "bg-gold text-charcoal font-bold shadow-sm"
                        : "bg-charcoal-50 text-steel-700 hover:bg-gold/15"
                    }`}
                  >
                    {dict.shop.bbqAccessory}
                  </Link>
                </>
              )}

              {/* If Outdoor Furniture is active */}
              {isFurnitureActive && (
                <>
                  <Link
                    href={`/${locale}/shop?category=OUTDOOR_FURNITURE${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      currentCategoryParam === "OUTDOOR_FURNITURE"
                        ? "bg-gold text-charcoal font-bold shadow-sm"
                        : "bg-charcoal-50 text-steel-700 hover:bg-gold/15"
                    }`}
                  >
                    {isArabic ? "كل الأثاث" : "All Furniture"}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=CHAIR${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      currentCategoryParam === "CHAIR"
                        ? "bg-gold text-charcoal font-bold shadow-sm"
                        : "bg-charcoal-50 text-steel-700 hover:bg-gold/15"
                    }`}
                  >
                    {dict.shop.chair}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=TABLE${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      currentCategoryParam === "TABLE"
                        ? "bg-gold text-charcoal font-bold shadow-sm"
                        : "bg-charcoal-50 text-steel-700 hover:bg-gold/15"
                    }`}
                  >
                    {dict.shop.table}
                  </Link>
                </>
              )}

              {/* If ALL is active, quick pills for all 4 subcategories */}
              {isAllActive && (
                <>
                  <Link
                    href={`/${locale}/shop?category=CHARCOAL_GRILL${currentSort ? `&sort=${currentSort}` : ""}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium bg-charcoal-50 text-steel-700 hover:bg-gold/15 transition-all"
                  >
                    🔥 {dict.shop.charcoalGrill}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=BBQ_ACCESSORY${currentSort ? `&sort=${currentSort}` : ""}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium bg-charcoal-50 text-steel-700 hover:bg-gold/15 transition-all"
                  >
                    🎒 {dict.shop.bbqAccessory}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=CHAIR${currentSort ? `&sort=${currentSort}` : ""}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium bg-charcoal-50 text-steel-700 hover:bg-gold/15 transition-all"
                  >
                    🪑 {dict.shop.chair}
                  </Link>
                  <Link
                    href={`/${locale}/shop?category=TABLE${currentSort ? `&sort=${currentSort}` : ""}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium bg-charcoal-50 text-steel-700 hover:bg-gold/15 transition-all"
                  >
                    🪵 {dict.shop.table}
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Results count & Sort select */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <span className="text-steel-600 font-mono text-[11px]">
              {dict.shop.showingResults.replace("{count}", products.length.toString())}
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-steel-gray" />
              <div className="flex items-center gap-1.5 text-xs font-medium text-steel-700">
                <Link
                  href={`/${locale}/shop?category=${currentCategoryParam}&sort=featured`}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    currentSort === "featured"
                      ? "bg-charcoal text-gold font-bold shadow-sm"
                      : "hover:text-gold"
                  }`}
                >
                  {dict.shop.sortFeatured}
                </Link>
                <Link
                  href={`/${locale}/shop?category=${currentCategoryParam}&sort=price-low`}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    currentSort === "price-low"
                      ? "bg-charcoal text-gold font-bold shadow-sm"
                      : "hover:text-gold"
                  }`}
                >
                  {dict.shop.sortPriceLowHigh}
                </Link>
                <Link
                  href={`/${locale}/shop?category=${currentCategoryParam}&sort=price-high`}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    currentSort === "price-high"
                      ? "bg-charcoal text-gold font-bold shadow-sm"
                      : "hover:text-gold"
                  }`}
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
