import { type Locale } from "./dictionaries";

export interface SubCategory {
  id: string; // e.g. "CHARCOAL_GRILL", "BBQ_ACCESSORY", "CHAIR", "TABLE"
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface MainCategory {
  id: string; // "BBQ", "OUTDOOR_FURNITURE", "BUNDLE"
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  subcategories: SubCategory[];
}

export const CATEGORY_TREE: MainCategory[] = [
  {
    id: "BBQ",
    slug: "bbq",
    nameEn: "BBQ",
    nameAr: "معدات الشواء",
    descriptionEn: "Precision-engineered 304 stainless steel foldable BBQ grills and accessories.",
    descriptionAr: "شوايات وإكسسوارات شواء فاخرة قابلة للطي مصنعة من الستانلس ستيل ٣٠٤.",
    subcategories: [
      {
        id: "CHARCOAL_GRILL",
        slug: "charcoal-grill",
        nameEn: "Charcoal Grill",
        nameAr: "شوايات الفحم",
        descriptionEn: "Foldable 304 food-grade stainless steel charcoal grills with warming rack.",
        descriptionAr: "شوايات فحم متطورة قابلة للطي مع شبكة ثقيلة ورف تسخين مدمج.",
      },
      {
        id: "BBQ_ACCESSORY",
        slug: "bbq-accessory",
        nameEn: "BBQ Accessory",
        nameAr: "إكسسوارات الشواء",
        descriptionEn: "Tactical Cordura carry bags, tongs, and grilling equipment.",
        descriptionAr: "حقائب حمل تكتيكية ومعدات وإكسسوارات الشواء الفاخرة.",
      },
    ],
  },
  {
    id: "OUTDOOR_FURNITURE",
    slug: "outdoor-furniture",
    nameEn: "Outdoor Furniture",
    nameAr: "الأثاث الخارجي",
    descriptionEn: "Ergonomic foldable outdoor chairs and versatile stainless steel tables.",
    descriptionAr: "كراسي تخييم مريحة وطاولات ومقاعد ستانلس ستيل قابلة للطي.",
    subcategories: [
      {
        id: "CHAIR",
        slug: "chair",
        nameEn: "Chair",
        nameAr: "كراسي",
        descriptionEn: "Luxury foldable chairs with 304 stainless frame and ballistic canvas.",
        descriptionAr: "كراسي تخييم فاخرة بهيكل أنبوبي صلب وقماش كوردورا مقاوم للماء.",
      },
      {
        id: "TABLE",
        slug: "table",
        nameEn: "Table",
        nameAr: "طاولات",
        descriptionEn: "Laser-cut dual-function side tables and 150kg heavy-duty stools.",
        descriptionAr: "طاولات جانبية ومقاعد مزدوجة الوظائف مخرمة بدقة الليزر.",
      },
    ],
  },
];

// Helper to get formatted display name for category/subcategory
export function getCategoryBadge(
  mainCatId: string | null | undefined,
  subCatId: string | null | undefined,
  categoryKey: string,
  locale: Locale
): { main: string; sub?: string; full: string } {
  const isArabic = locale === "ar";

  if (categoryKey === "BUNDLE" || mainCatId === "BUNDLE") {
    const label = isArabic ? "المجموعة المتكاملة" : "Complete Suite";
    return { main: label, full: label };
  }

  // Find in category tree
  const main = CATEGORY_TREE.find(
    (m) => m.id === mainCatId || m.slug === mainCatId || m.subcategories.some((s) => s.id === categoryKey)
  );

  const sub = main?.subcategories.find(
    (s) => s.id === subCatId || s.id === categoryKey || s.slug === categoryKey
  );

  if (main && sub) {
    const mainLabel = isArabic ? main.nameAr : main.nameEn;
    const subLabel = isArabic ? sub.nameAr : sub.nameEn;
    return {
      main: mainLabel,
      sub: subLabel,
      full: `${mainLabel} • ${subLabel}`,
    };
  }

  if (main) {
    const mainLabel = isArabic ? main.nameAr : main.nameEn;
    return { main: mainLabel, full: mainLabel };
  }

  if (sub) {
    const subLabel = isArabic ? sub.nameAr : sub.nameEn;
    return { main: subLabel, full: subLabel };
  }

  return { main: categoryKey, full: categoryKey };
}

// Convert a search/filter category parameter to Prisma where filter
export function buildPrismaCategoryFilter(categoryParam?: string): Record<string, unknown> | null {
  if (!categoryParam || categoryParam.toUpperCase() === "ALL") {
    return null;
  }

  const upper = categoryParam.toUpperCase();

  if (upper === "BBQ") {
    return {
      category: { in: ["CHARCOAL_GRILL", "BBQ_ACCESSORY", "GRILL", "ACCESSORY"] },
    };
  }

  if (upper === "OUTDOOR_FURNITURE" || upper === "OUTDOOR-FURNITURE" || upper === "FURNITURE") {
    return {
      category: { in: ["CHAIR", "TABLE"] },
    };
  }

  if (upper === "CHARCOAL_GRILL" || upper === "CHARCOAL-GRILL" || upper === "GRILL") {
    return {
      category: { in: ["CHARCOAL_GRILL", "GRILL"] },
    };
  }

  if (upper === "BBQ_ACCESSORY" || upper === "BBQ-ACCESSORY" || upper === "ACCESSORY") {
    return {
      category: { in: ["BBQ_ACCESSORY", "ACCESSORY"] },
    };
  }

  if (upper === "CHAIR") {
    return {
      category: "CHAIR",
    };
  }

  if (upper === "TABLE") {
    return {
      category: "TABLE",
    };
  }

  if (upper === "BUNDLE") {
    return {
      category: "BUNDLE",
    };
  }

  return {
    category: upper,
  };
}

