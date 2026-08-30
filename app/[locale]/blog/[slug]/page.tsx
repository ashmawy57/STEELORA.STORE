import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowRight, BookOpen, Share2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ select: { slug: true } });
  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return {};

  const isArabic = locale === "ar";
  const title = isArabic ? post.titleAr : post.titleEn;
  const description = isArabic ? post.excerptAr : post.excerptEn;

  return {
    title: `${title} | The STEELORA Journal`,
    description,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${post.slug}`,
        ar: `/ar/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const title = isArabic ? post.titleAr : post.titleEn;
  const content = isArabic ? post.contentAr : post.contentEn;
  const category = isArabic ? post.categoryAr : post.categoryEn;
  const readTime = isArabic ? post.readTimeAr : post.readTimeEn;

  return (
    <article className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-steel-700 hover:text-gold transition-colors"
        >
          <ArrowIcon className={`w-3.5 h-3.5 ${isArabic ? "" : "rotate-180"}`} />
          <span>{dict.blog.title}</span>
        </Link>

        {/* Header Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-steel-gray">
            <span className="px-2.5 py-1 rounded bg-charcoal text-gold font-bold text-[10px] uppercase">
              {category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold" />
              {readTime}
            </span>
            <span>•</span>
            <span>{dict.blog.author}</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-charcoal-black leading-tight">
            {title}
          </h1>
        </div>

        {/* Feature Cover Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-luxury border border-steel-gray/30 bg-charcoal-900">
          <Image
            src={post.coverImage || "/images/products/grill-main.jpg"}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Article Body */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard">
          <div className="prose prose-base max-w-none text-charcoal-800 leading-relaxed whitespace-pre-line text-sm sm:text-base space-y-4">
            {content}
          </div>
        </div>

        {/* Back to Blog CTA */}
        <div className="pt-6 border-t border-steel-gray/20 flex items-center justify-between">
          <Link
            href={`/${locale}/blog`}
            className="btn-outline-gold px-6 py-3 text-xs font-bold flex items-center gap-2"
          >
            <ArrowIcon className={`w-4 h-4 ${isArabic ? "" : "rotate-180"}`} />
            <span>{isArabic ? "العودة للمجلة" : "Back to Journal"}</span>
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="btn-gold px-6 py-3 text-xs font-bold"
          >
            {dict.hero.primaryCta}
          </Link>
        </div>
      </div>
    </article>
  );
}
