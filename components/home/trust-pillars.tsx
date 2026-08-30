"use client";

import React from "react";
import { ShieldCheck, Truck, Headphones, Sparkles, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/dictionaries";

interface TrustPillarsProps {
  locale: Locale;
}

export const TrustPillars: React.FC<TrustPillarsProps> = ({ locale }) => {
  const isArabic = locale === "ar";

  const pillars = [
    {
      icon: ShieldCheck,
      badgeEn: "PROTECTED CHECKOUT",
      badgeAr: "دفع آمن ومعاينة فورية",
      titleEn: "Secure Payments & Inspection",
      titleAr: "دفع ومعاينة عند الاستلام",
      descEn:
        "Full doorstep inspection rights before paying, backed by our 10-year authentic craftsmanship warranty.",
      descAr:
        "حق الفحص والمعاينة الكاملة عند باب المنزل قبل الدفع، مع ضمان حقيقي معتمد لمدة ١٠ سنوات.",
      highlightEn: "10-Year Warranty",
      highlightAr: "ضمان حقيقي ١٠ سنوات",
    },
    {
      icon: Truck,
      badgeEn: "FAST DELIVERY",
      badgeAr: "توصيل سريع ومباشر",
      titleEn: "Express Nationwide Shipping",
      titleAr: "شحن سريع لكافة المحافظات",
      descEn:
        "Direct factory dispatch from Cairo to your doorstep in 1-3 business days across all Egyptian governorates.",
      descAr:
        "شحن سريع ومباشر من مصنعنا بالقاهرة إلى باب منزلك خلال ١-٣ أيام عمل لكافة محافظات مصر.",
      highlightEn: "1-3 Business Days",
      highlightAr: "١-٣ أيام عمل",
    },
    {
      icon: Headphones,
      badgeEn: "HERE TO HELP",
      badgeAr: "دائماً في خدمتك",
      titleEn: "Dedicated Concierge Support",
      titleAr: "خدمة عملاء واستشارات فنية",
      descEn:
        "Expert outdoor gear specialists and dedicated concierge assistance ready to assist you 7 days a week.",
      descAr:
        "فريق هندسي واستشاري متخصص لخدمتك والإجابة على كافة استفساراتك طوال أيام الأسبوع.",
      highlightEn: "7 Days a Week",
      highlightAr: "٧ أيام في الأسبوع",
    },
  ];

  return (
    <section className="bg-charcoal-950 text-white py-16 sm:py-24 relative overflow-hidden border-y border-steel-gray/20">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-steel-gray/20 rtl:md:divide-x-reverse">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const badge = isArabic ? pillar.badgeAr : pillar.badgeEn;
            const title = isArabic ? pillar.titleAr : pillar.titleEn;
            const desc = isArabic ? pillar.descAr : pillar.descEn;
            const highlight = isArabic ? pillar.highlightAr : pillar.highlightEn;

            return (
              <div
                key={idx}
                className="py-8 md:py-6 px-6 lg:px-10 text-center group flex flex-col items-center justify-between transition-all duration-500 hover:-translate-y-1"
              >
                {/* Glowing Metallic Circular Icon Badge */}
                <div className="relative mb-6">
                  {/* Subtle outer neon halo */}
                  <div className="absolute -inset-2 rounded-full bg-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Outer circle with gradient border */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-charcoal-800 to-charcoal-950 p-[1.5px] shadow-luxury transition-transform duration-500 group-hover:scale-105">
                    {/* Inner glowing container */}
                    <div className="w-full h-full rounded-full bg-charcoal-900/90 backdrop-blur-md flex items-center justify-center border border-gold/25 group-hover:border-gold/60 group-hover:bg-charcoal-850 transition-colors duration-300">
                      <Icon
                        className="w-8 h-8 sm:w-10 sm:h-10 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:text-gold-light"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>
                </div>

                {/* Micro-badge Eyebrow */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-heading font-bold mb-3 select-none">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{badge}</span>
                </div>

                {/* Main Heading */}
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-3 tracking-tight group-hover:text-gold-light transition-colors duration-300">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-steel-300 max-w-[300px] leading-relaxed mb-4">
                  {desc}
                </p>

                {/* Bottom Highlight Tag */}
                <div className="pt-3 border-t border-steel-gray/20 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gold/90 group-hover:text-gold transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
