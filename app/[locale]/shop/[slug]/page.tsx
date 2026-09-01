import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoreProducts, getStoreProductBySlug } from "@/lib/products-store";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { isValidLocale, type Locale } from "@/lib/dictionaries";

export const revalidate = 60; // ISR revalidate

export async function generateStaticParams() {
  const products = await getStoreProducts();
  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const product = await getStoreProductBySlug(params.slug);

  if (!product) return {};

  const isArabic = locale === "ar";
  const title = isArabic ? product.nameAr : product.nameEn;
  const description = isArabic ? product.shortDescriptionAr : product.shortDescriptionEn;

  let parsedImages: string[] = [];
  try {
    parsedImages = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
  } catch {
    parsedImages = ["/images/products/grill-main.jpg"];
  }

  return {
    title: `${title} | STEELORA`,
    description,
    alternates: {
      canonical: `/${locale}/shop/${product.slug}`,
      languages: {
        en: `/en/shop/${product.slug}`,
        ar: `/ar/shop/${product.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      images: parsedImages.map((img) => ({
        url: img,
        alt: title,
      })),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";

  const product = await getStoreProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getStoreProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  let parsedImages: string[] = [];
  try {
    parsedImages = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
  } catch {
    parsedImages = ["/images/products/grill-main.jpg"];
  }

  // Schema.org JSON-LD structured data for Google Product rich results
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: locale === "ar" ? product.nameAr : product.nameEn,
    image: parsedImages.map((img) => `https://steelora.com${img}`),
    description: locale === "ar" ? product.shortDescriptionAr : product.shortDescriptionEn,
    brand: {
      "@type": "Brand",
      name: "STEELORA",
    },
    material: locale === "ar" ? product.materialAr : product.materialEn,
    offers: {
      "@type": "Offer",
      url: `https://steelora.com/${locale}/shop/${product.slug}`,
      priceCurrency: "EGP",
      price: (product.pricePiasters / 100).toFixed(2),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "STEELORA",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: product.reviews.length || 5,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        locale={locale}
      />
    </>
  );
}
