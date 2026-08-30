import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "مجلة ستيلورا | أسرار الشواء والمغامرة" : "The STEELORA Journal | Pitmaster & Gear Guides",
    description: isArabic
      ? "دليلك الشامل لتقنيات شواء الفحم، وصيانة الستانلس ستيل ٣٠٤، وتجهيز مخيمات الرفاهية في مصر."
      : "Master outdoor charcoal grilling, 304 stainless steel care, and wilderness camp kitchen setups.",
  };
}

export const revalidate = 60;

export default async function BlogIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
            {dict.about.eyebrow}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-charcoal-black">
            {dict.blog.title}
          </h1>
          <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
            {dict.blog.subtitle}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => {
            const title = isArabic ? post.titleAr : post.titleEn;
            const excerpt = isArabic ? post.excerptAr : post.excerptEn;
            const category = isArabic ? post.categoryAr : post.categoryEn;
            const readTime = isArabic ? post.readTimeAr : post.readTimeEn;

            return (
              <article
                key={post.id}
                className="card-luxury overflow-hidden bg-white flex flex-col justify-between group hover:border-gold/50 transition-all duration-300"
              >
                <div>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="relative aspect-[16/9] w-full block overflow-hidden bg-charcoal-900"
                  >
                    <Image
                      src={post.coverImage || "/images/products/grill-main.jpg"}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 start-3 px-2.5 py-1 rounded bg-charcoal-900/80 backdrop-blur-sm text-gold text-[10px] uppercase font-bold tracking-wider border border-gold/30">
                      {category}
                    </div>
                  </Link>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-steel-gray">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{readTime}</span>
                      <span>•</span>
                      <span>{dict.blog.author}</span>
                    </div>

                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="font-heading font-bold text-lg sm:text-xl text-charcoal-black hover:text-gold transition-colors block leading-snug"
                    >
                      {title}
                    </Link>

                    <p className="text-xs sm:text-sm text-steel-600 leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-gold-dark hover:text-gold transition-colors"
                  >
                    <span>{dict.blog.readArticle}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
