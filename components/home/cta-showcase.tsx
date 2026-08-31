"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, ArrowRight, ArrowLeft, Headphones, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { Locale } from "@/lib/dictionaries";

interface CtaShowcaseProps {
  locale: Locale;
}

export const CtaShowcase: React.FC<CtaShowcaseProps> = ({ locale }) => {
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 sm:py-28 bg-charcoal-950 text-white relative overflow-hidden border-t border-steel-gray/30">
      {/* Cinematic Ambient Glow Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 start-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Glass Frame Card */}
        <Reveal animation="scale-up" duration={750} className="relative rounded-3xl bg-gradient-to-b from-charcoal-900/90 via-charcoal-900/80 to-charcoal-950/95 p-8 sm:p-14 lg:p-18 border border-gold/35 shadow-luxury backdrop-blur-xl overflow-hidden text-center">
          {/* Subtle Top Gold Highlight Bar */}
          <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-heading font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>
              {isArabic
                ? "فولاذ ٣٠٤ نقي • مصنّع بفخر في القاهرة"
                : "AEROSPACE 304 STAINLESS STEEL • CRAFTED IN CAIRO"}
            </span>
          </div>

          {/* High-Impact Luxury Headline with Gradient */}
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl mx-auto leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-steel-200">
              {isArabic
                ? "ارتقِ بتجربة رحلاتك وشوائك إلى قمة "
                : "Elevate Your Outdoor Culinary Expeditions to "}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-light via-gold to-gold-dark">
              {isArabic ? "الفخامة والخلود" : "Pure Luxury"}
            </span>
          </h2>

          {/* Persuasive Description */}
          <p className="text-xs sm:text-base text-steel-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {isArabic
              ? "معدات شواء وتخييم قابلة للطي هندسياً لسمك مسطح تماماً، مصممة من الفولاذ المقاوم للصدأ بدرجة ٣٠٤ لتتحمل أقصى درجات الحرارة وعوامل الطبيعة لأجيال متعاقبة."
              : "Precision-engineered foldable stainless outdoor furniture and charcoal barbecue systems that pack flat in seconds. Built to withstand extreme desert cookouts and seaside salt air."}
          </p>

          {/* 3 Quick Value Capsules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-charcoal-950/70 border border-steel-gray/25 text-xs text-steel-200">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>{isArabic ? "ضمان حقيقي ١٠ سنوات" : "10-Year Craftsmanship"}</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-charcoal-950/70 border border-steel-gray/25 text-xs text-steel-200">
              <Truck className="w-4 h-4 text-gold shrink-0" />
              <span>{isArabic ? "شحن سريع لكافة المحافظات" : "Fast Nationwide Shipping"}</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-charcoal-950/70 border border-steel-gray/25 text-xs text-steel-200">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span>{isArabic ? "حق المعاينة قبل الدفع" : "Inspect Before Payment"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/shop`}
              className="w-full sm:w-auto btn-gold px-9 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-goldGlow hover:scale-105 transition-all duration-300 group"
            >
              <span>{isArabic ? "تصفح تشكيلة المعدات الفاخرة" : "Explore Outdoor Collection"}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-charcoal-950/80 hover:bg-charcoal-800 text-gold border border-gold/40 hover:border-gold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Headphones className="w-4 h-4" />
              <span>{isArabic ? "تواصل مع الاستشارات الفنية" : "Concierge & Support"}</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
