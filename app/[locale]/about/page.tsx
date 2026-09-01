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
} from "lucide-react";
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
    title: isArabic ? "عن ستيلورا | قصة وحرفية الصناعات الفولاذية الفاخرة" : "About STEELORA | Precision Foldable Metal Craftsmanship",
    description: isArabic
      ? "تعرف على تاريخ ستيلورا ورؤيتنا في ابتكار أرقى معدات التخييم والشواء من الفولاذ المقاوم للصدأ ٣٠٤ في مصر."
      : "Discover the heritage of STEELORA: merging architectural heavy metal fabrication with luxury outdoor gear.",
  };
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-ivory-200 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-24 sm:py-32 bg-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/craftsmanship.jpg"
            alt="STEELORA Egyptian Metal Craftsmanship"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-heading font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>{dict.about.eyebrow}</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            {dict.about.title}
          </h1>

          <p className="text-base sm:text-xl text-steel-200 max-w-3xl mx-auto leading-relaxed">
            {dict.about.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Brand Story Split */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
              {isArabic ? "قصة التأسيس" : "Our Genesis"}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-black leading-tight">
              {isArabic
                ? "من ورش الصناعات المعمارية إلى سماء التخييم المفتوحة"
                : "From Heavy Architectural Fabrication to the Open Sky"}
            </h2>
            <p className="text-xs sm:text-sm text-steel-700 leading-relaxed">
              {dict.about.storyP1}
            </p>
            <p className="text-xs sm:text-sm text-steel-700 leading-relaxed">
              {dict.about.storyP2}
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-steel-gray/30">
            <Image
              src="/pro-max.jpg"
              alt="STEELORA Gear in the Wild"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-20 bg-charcoal-900 text-white border-y border-steel-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold block">
              {dict.about.eyebrow}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              {dict.about.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-charcoal-950 border border-steel-gray/20 hover:border-gold/50 transition-colors space-y-4">
              <div className="p-3.5 rounded-lg bg-gold/10 text-gold border border-gold/30 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {dict.about.value1Title}
              </h3>
              <p className="text-xs text-steel-300 leading-relaxed">
                {dict.about.value1Desc}
              </p>
            </div>

            <div className="p-8 rounded-xl bg-charcoal-950 border border-steel-gray/20 hover:border-gold/50 transition-colors space-y-4">
              <div className="p-3.5 rounded-lg bg-gold/10 text-gold border border-gold/30 w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {dict.about.value2Title}
              </h3>
              <p className="text-xs text-steel-300 leading-relaxed">
                {dict.about.value2Desc}
              </p>
            </div>

            <div className="p-8 rounded-xl bg-charcoal-950 border border-steel-gray/20 hover:border-gold/50 transition-colors space-y-4">
              <div className="p-3.5 rounded-lg bg-gold/10 text-gold border border-gold/30 w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {dict.about.value3Title}
              </h3>
              <p className="text-xs text-steel-300 leading-relaxed">
                {dict.about.value3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 5-Stage Precision Manufacturing Timeline */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
            {isArabic ? "دقة التصنيع في القاهرة" : "Egyptian Manufacturing Excellence"}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-black">
            {dict.about.timelineTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              step: dict.about.step1,
              desc: isArabic
                ? "قص دقيق بألياف الليزر الصناعي المتطورة لتحقيق أدق القياسات وتوزيع مثالي للتهوية."
                : "High-precision CNC fiber lasers cut heavy 2.0mm 304 stainless steel sheets with 0.01mm tolerance.",
            },
            {
              step: dict.about.step2,
              desc: isArabic
                ? "ثني هيدروليكي محكم لتشكيل زوايا ومفصلات الهيكل القابلة للطي بسلاسة."
                : "Multi-axis hydraulic CNC press brakes form rigid interlocking geometric profiles.",
            },
            {
              step: dict.about.step3,
              desc: isArabic
                ? "لحام أرجون متخصص (TIG) يدمج الفولاذ ليمنح مفاصل الشواية والكراسي متانة مطلقة."
                : "Inert-gas TIG welding creates structural bonds stronger than the base alloy itself.",
            },
            {
              step: dict.about.step4,
              desc: isArabic
                ? "صقل يدوي دقيق يمنح الأسطح لمسة ساتان فاخرة ويزيل كافة الحواف الحادة."
                : "Multi-stage manual abrasive satin brushing removes micro-burrs and imparts our signature finish.",
            },
            {
              step: dict.about.step5,
              desc: isArabic
                ? "اختبارات حرارية حتى ٨٠٠ درجة مئوية واختبارات أوزان حتى ٢٠٠ كجم لضمان سلامة كاملة."
                : "Thermal shock cycling up to 800°C and 200kg static load testing on all structural joints.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-steel-gray/20 shadow-softCard flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gold/50 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-charcoal-black">
                  {item.step}
                </h3>
                <p className="text-xs text-steel-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark font-heading font-extrabold flex items-center justify-center text-xs shrink-0">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Stats Strip */}
      <section className="py-16 bg-charcoal-950 text-white border-y border-steel-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="font-heading font-black text-3xl sm:text-5xl text-gold">
                {dict.about.statsExpeditions}
              </span>
              <p className="text-xs text-steel-gray font-medium">
                {dict.about.statsExpeditionsLabel}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-heading font-black text-3xl sm:text-5xl text-gold">
                {dict.about.statsSteelGrade}
              </span>
              <p className="text-xs text-steel-gray font-medium">
                {dict.about.statsSteelGradeLabel}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-heading font-black text-3xl sm:text-5xl text-gold">
                {dict.about.statsWarranty}
              </span>
              <p className="text-xs text-steel-gray font-medium">
                {dict.about.statsWarrantyLabel}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-heading font-black text-3xl sm:text-5xl text-gold">
                {dict.about.statsOrigin}
              </span>
              <p className="text-xs text-steel-gray font-medium">
                {dict.about.statsOriginLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-black">
          {locale === "ar" ? "جاهز لخوض تجربة التخييم الأكثر فخامة؟" : "Ready to Elevate Your Outdoor Camp?"}
        </h2>
        <div className="flex justify-center gap-4 pt-2">
          <Link href={`/${locale}/shop`} className="btn-gold px-8 py-4 text-sm font-bold shadow-goldGlow">
            {dict.hero.primaryCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
