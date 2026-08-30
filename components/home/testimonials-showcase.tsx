"use client";

import React from "react";
import { Star, Sparkles, CheckCircle2, Quote, Award, ShieldCheck, ThumbsUp } from "lucide-react";
import type { Locale } from "@/lib/dictionaries";

interface TestimonialsShowcaseProps {
  locale: Locale;
}

export const TestimonialsShowcase: React.FC<TestimonialsShowcaseProps> = ({ locale }) => {
  const isArabic = locale === "ar";

  const reviews = [
    {
      authorEn: "Tarek Mansour",
      titleEn: "Pitmaster & Desert Expedition Leader — Giza",
      authorAr: "طارق منصور",
      titleAr: "خبير شواء وقائد رحلات سفاري — الجيزة",
      productEn: "Foldable Charcoal BBQ Grill (Upper Rack)",
      productAr: "شواية الفحم القابلة للطي (رف تسخين علوي)",
      initials: "TM",
      textEn:
        "The upper warming rack is an absolute game changer during desert cookouts. We seared tomahawks over direct coals while resting smoked meats on the upper tier. It folds flat into the bag in 5 seconds and 304 steel cleans up effortlessly.",
      textAr:
        "رف التسخين العلوي ميزة استثنائية غيرت تجربة الشواء بالكامل في رحلات التخييم. قمنا بشواء اللحوم على الجمر المباشر وحفظها ساخنة وطرية على الرف العلوي. تنطوي في الحقيبة خلال ثوانٍ وفولاذ ٣٠٤ سهل التنظيف للغاية.",
      rating: 5,
      dateEn: "Verified Expedition — August 2026",
      dateAr: "رحلة موثقة — أغسطس ٢٠٢٦",
    },
    {
      authorEn: "Dr. Sherif El-Wakil",
      titleEn: "Outdoor Connoisseur — New Cairo",
      authorAr: "د. شريف الوكيل",
      titleAr: "عاشق تجهيزات التخييم الفاخرة — القاهرة الجديدة",
      productEn: "Outdoor Luxury Set (4-Piece Suite)",
      productAr: "طقم الفخامة الخارجية المتكامل (٤ قطع)",
      initials: "SW",
      textEn:
        "Spectacular 304 marine-grade stainless steel craft. You can immediately feel the heavy gauge and precision laser-cut edges from the first unboxing. The gold badge and padded bag give it the prestige of bespoke luxury luggage.",
      textAr:
        "صناعة هندسية مذهلة وفولاذ ٣٠٤ نقي وفائق السماكة. تشعر بدقة القص بالليزر وجودة اللحامات ولمعان المعدن من اللحظة الأولى. الحقيبة المبطنة والشعار الذهبي يمنحان شعوراً حقيقياً بالفخامة والرفاهية.",
      rating: 5,
      dateEn: "Verified Purchase — July 2026",
      dateAr: "شراء موثق — يوليو ٢٠٢٦",
    },
    {
      authorEn: "Hossam Fathy",
      titleEn: "Yacht & Red Sea Camp Enthusiast — Hurghada",
      authorAr: "حسام فتحي",
      titleAr: "محب رحلات اليخوت وشواطئ البحر الأحمر — الغردقة",
      productEn: "Foldable Outdoor Chair & Stool Set",
      productAr: "كرسي وطقطوقة التخييم الفاخرة القابلة للطي",
      initials: "HF",
      textEn:
        "Purchased the full suite for our Red Sea sea expeditions. Despite the intense marine salt humidity, there is zero rust or corrosion. Everything packs flat into our vehicle trunk without taking any luggage room.",
      textAr:
        "اشتريت المجموعة بالكامل لرحلات اليخوت في البحر الأحمر. على الرغم من رطوبة البحر الشديدة والملوحة، الفولاذ ٣٠٤ لم يتأثر نهائياً ولا يوجد أي أثر للصدأ. المجموعة بالكامل توضع بنظام فائق في حقيبة السيارة.",
      rating: 5,
      dateEn: "Verified Purchase — August 2026",
      dateAr: "شراء موثق — أغسطس ٢٠٢٦",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-charcoal-950 text-white relative overflow-hidden border-t border-steel-gray/30">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 start-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-heading font-bold uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>
              {isArabic ? "تقييمات موثقة من نخبة العملاء" : "VERIFIED CONNOISSEUR REVIEWS"}
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {isArabic ? (
              <>
                ماذا يقول <span className="text-gold-light">خبراء الشواء والمغامرون</span> عن ستيلورا؟
              </>
            ) : (
              <>
                What Master Pitmasters & <span className="text-gold-light">Expedition Connoisseurs</span> Say
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-steel-300 max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? "تجارب حقيقية موثقة من عملاء ستيلورا في رحلات التخييم الصحراوية، حفلات الشواء العائلية، والرحلات البحرية."
              : "Unfiltered feedback from certified owners who demand uncompromising thermal performance and zero-rust durability."}
          </p>

          {/* Social Proof Aggregate Score */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-steel-200">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-bold text-white text-sm">4.98 / 5.0</span>
            <span className="text-steel-gray">|</span>
            <span className="text-steel-300">
              {isArabic ? "أكثر من ١٥٠ تقييم ٥ نجوم موثق" : "Over 150+ Verified 5-Star Reviews"}
            </span>
          </div>
        </div>

        {/* 3 Luxury Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, idx) => {
            const author = isArabic ? review.authorAr : review.authorEn;
            const title = isArabic ? review.titleAr : review.titleEn;
            const product = isArabic ? review.productAr : review.productEn;
            const text = isArabic ? review.textAr : review.textEn;
            const date = isArabic ? review.dateAr : review.dateEn;

            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-gradient-to-b from-charcoal-900/90 via-charcoal-900/80 to-charcoal-950/90 p-7 lg:p-8 border border-steel-gray/30 hover:border-gold/60 shadow-luxury backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group overflow-hidden"
              >
                {/* Decorative background quote mark */}
                <Quote className="absolute -top-3 end-3 w-16 h-16 text-gold/5 group-hover:text-gold/10 transition-colors pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Stars + Product Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gold/80 px-2 py-0.5 rounded bg-gold/10 border border-gold/20 truncate max-w-[170px]">
                      {product}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-steel-200 leading-relaxed italic">
                    &ldquo;{text}&rdquo;
                  </p>
                </div>

                {/* Author Info & Verified Badge */}
                <div className="pt-5 mt-6 border-t border-steel-gray/25 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Initials Avatar */}
                    <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-gold/40 flex items-center justify-center text-xs font-heading font-extrabold text-gold group-hover:border-gold group-hover:shadow-goldGlow transition-all">
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-white group-hover:text-gold-light transition-colors">
                        {author}
                      </h4>
                      <p className="text-[11px] text-steel-gray">{title}</p>
                    </div>
                  </div>

                  {/* Verified Check Badge */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{isArabic ? "مشتري موثق" : "Verified Buyer"}</span>
                    </span>
                    <span className="text-[9px] text-steel-gray mt-1">{date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
