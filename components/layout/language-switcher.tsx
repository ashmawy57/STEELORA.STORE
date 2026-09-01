"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: "en" | "ar";
  className?: string;
  variant?: "pill" | "text" | "compact";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  className = "",
  variant = "pill",
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = (targetLocale: "en" | "ar") => {
    if (targetLocale === currentLocale) return;

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Replace locale in current path
    let newPathname = pathname;
    if (pathname.startsWith(`/${currentLocale}`)) {
      newPathname = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
    } else {
      newPathname = `/${targetLocale}${pathname}`;
    }

    router.push(newPathname);
    router.refresh();
  };

  const isArabic = currentLocale === "ar";

  if (variant === "compact") {
    return (
      <button
        onClick={() => handleToggle(isArabic ? "en" : "ar")}
        className={`inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-gold/30 bg-gold/10 text-gold hover:bg-gold hover:text-charcoal transition-all active:scale-95 shrink-0 ${className}`}
        aria-label="Switch Language"
      >
        <Globe className="w-3 h-3 text-gold" />
        <span>{isArabic ? "EN" : "عربي"}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-charcoal-900 border border-steel-gray/30 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleToggle("en")}
        className={`px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
          !isArabic
            ? "bg-gold text-charcoal shadow-sm"
            : "text-steel-gray hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleToggle("ar")}
        className={`px-3 py-1 text-xs font-arabicHeading font-bold rounded-full transition-all duration-200 ${
          isArabic
            ? "bg-gold text-charcoal shadow-sm"
            : "text-steel-gray hover:text-white"
        }`}
      >
        عربي
      </button>
    </div>
  );
};
