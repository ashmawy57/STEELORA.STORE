import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://steelora.com";
  const locales = ["en", "ar"];

  // Static pages
  const staticRoutes = ["", "/shop", "/blog", "/contact"];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          ar: `${baseUrl}/ar${route}`,
        },
      },
    }))
  );

  // Products
  const products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });
  const productEntries = locales.flatMap((locale) =>
    products.map((p) => ({
      url: `${baseUrl}/${locale}/shop/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/shop/${p.slug}`,
          ar: `${baseUrl}/ar/shop/${p.slug}`,
        },
      },
    }))
  );

  // Blog posts
  const posts = await prisma.blogPost.findMany({ select: { slug: true, publishedAt: true } });
  const blogEntries = locales.flatMap((locale) =>
    posts.map((p) => ({
      url: `${baseUrl}/${locale}/blog/${p.slug}`,
      lastModified: p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${p.slug}`,
          ar: `${baseUrl}/ar/blog/${p.slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...productEntries, ...blogEntries];
}
