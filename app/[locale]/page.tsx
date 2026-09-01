import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Layers,
  Flame,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { getStoreProducts } from "@/lib/products-store";
import { ProductCard } from "@/components/product/product-card";
import { VideoShowcase } from "@/components/home/video-showcase";
import { TrustPillars } from "@/components/home/trust-pillars";
import { TestimonialsShowcase } from "@/components/home/testimonials-showcase";
import { CtaShowcase } from "@/components/home/cta-showcase";
import { TypewriterHeading } from "@/components/home/typewriter-heading";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import { formatEGP } from "@/lib/currency";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Fetch best sellers and bundle safely
  const products = await getStoreProducts(undefined, [
    { isFeatured: "desc" },
    { createdAt: "asc" },
  ]);

  const bundleProduct = products.find((p) => p.slug === "outdoor-luxury-set");
  const gridProducts = products.filter((p) => p.slug !== "outdoor-luxury-set");

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION: Full-Bleed Dark Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal-950 text-white">
        {/* Background Image with Crisp Clarity & Bottom Transition Shadow Only */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/hero-bg.jpg"
            alt="STEELORA Luxury Outdoor Gear"
            fill
            priority
            className="object-cover object-center opacity-95 transform scale-105 animate-in fade-in zoom-in duration-1000 pointer-events-none"
            sizes="100vw"
          />
          {/* Subtle soft ambient overlay */}
          <div className="absolute inset-0 bg-charcoal-950/20 pointer-events-none" />
          {/* Shadow gradient only at the end / bottom of the section */}
          <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center space-y-8 pointer-events-auto">
          {/* Luxury Neon Glowing Eyebrow Badge */}
          <Reveal animation="fade-down" duration={600} className="relative inline-flex items-center justify-center group">
            {/* Outer Neon Halo */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-gold/50 via-gold-light/80 to-gold/50 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />

            {/* Inner Metallic Border & Frosted Core */}
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark shadow-[0_0_25px_rgba(198,166,100,0.5)]">
              <div className="px-6 py-2 rounded-full bg-charcoal-950/90 backdrop-blur-xl flex items-center gap-2.5 border border-gold/30">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400/80 animate-flame shrink-0" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-white to-gold font-heading font-black tracking-[0.22em] text-xs sm:text-sm uppercase drop-shadow-[0_0_12px_rgba(198,166,100,0.7)] select-none">
                  {dict.hero.eyebrow}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Animated Dynamic Typewriter Title */}
          <TypewriterHeading text={dict.hero.title} />

          {/* CTAs */}
          <Reveal animation="fade-up" duration={650} delay={200} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto relative z-20 pointer-events-auto">
            <Link
              href={`/${locale}/shop`}
              prefetch={true}
              className="w-full sm:w-auto btn-gold px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-goldGlow hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation relative z-30"
            >
              <span>{dict.hero.primaryCta}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>

            <Link
              href={`/${locale}/shop/outdoor-luxury-set`}
              prefetch={true}
              className="w-full sm:w-auto btn-outline-gold px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 bg-charcoal-900/60 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation relative z-30"
            >
              <span>{dict.hero.secondaryCta}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold text-charcoal font-black">
                15% OFF
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 2. LUXURY TRUST PILLARS STRIP */}
      <TrustPillars locale={locale} />

      {/* 3. FEATURED BUNDLE SPOTLIGHT */}
      {bundleProduct && (
        <section className="py-20 bg-charcoal-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal animation="scale-up" duration={700} className="p-8 sm:p-12 rounded-2xl bg-charcoal-900 border border-gold/40 shadow-luxury relative overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Bundle Imagery */}
                <div className="lg:col-span-6 relative aspect-square rounded-2xl overflow-hidden bg-charcoal-950 border border-gold/30 shadow-2xl">
                  <Image
                    src="/pro-max.jpg"
                    alt="STEELORA Outdoor Luxury Set"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 start-4 px-3 py-1.5 rounded-lg bg-gold text-charcoal font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{dict.bundleSpotlight.savings}</span>
                  </div>
                </div>

                {/* Bundle Info */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-heading font-bold uppercase tracking-widest text-gold block">
                      {dict.bundleSpotlight.eyebrow}
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
                      {isArabic ? bundleProduct.nameAr : bundleProduct.nameEn}
                    </h2>
                    <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
                      {dict.bundleSpotlight.description}
                    </p>
                  </div>

                  {/* Included 4 Pieces Bullet Grid */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-steel-200">
                      {dict.product.whatsIncluded}:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-steel-300">
                      {dict.bundleSpotlight.includedList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-steel-gray/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <span className="text-xs text-steel-gray block">
                        {dict.bundleSpotlight.regularPrice}{" "}
                        <span className="line-through">{formatEGP(1595000, locale)}</span>
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-heading font-extrabold text-gold">
                          {formatEGP(bundleProduct.pricePiasters, locale)}
                        </span>
                        <span className="text-xs text-gold font-bold px-2 py-0.5 bg-gold/20 rounded">
                          {locale === "ar" ? "وفر ٢,٣٥٠ ج.م" : "Save EGP 2,350"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/shop/outdoor-luxury-set`}
                      className="btn-gold px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-goldGlow shrink-0 hover:scale-105 transition-transform"
                    >
                      <span>{dict.bundleSpotlight.cta}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 4. BEST-SELLERS PRODUCT GRID WITH QUICK ADD */}
      <section className="py-20 bg-ivory-300 text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <Reveal animation="fade-up" duration={600} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-steel-gray/20 pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
                {dict.hero.eyebrow}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-black">
                {dict.shop.title}
              </h2>
            </div>

            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-heading font-bold text-charcoal hover:text-gold transition-colors"
            >
              <span>{dict.common.learnMore}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </Reveal>

          {/* 4-Card Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gridProducts.map((product, idx) => (
              <Reveal
                key={product.id}
                animation="fade-up"
                delay={idx * 100}
                duration={600}
              >
                <ProductCard
                  product={product}
                  locale={locale}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CINEMATIC VIDEO DEMONSTRATION */}
      <VideoShowcase locale={locale} />

      {/* 6. VERIFIED REVIEWS & TESTIMONIALS */}
      <TestimonialsShowcase locale={locale} />

      {/* 7. LUXURY CTA SHOWCASE */}
      <CtaShowcase locale={locale} />
    </div>
  );
}
