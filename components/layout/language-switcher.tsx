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
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border border-steel-gray/30 text-steel-100 hover:text-gold hover:border-gold/50 transition-all ${className}`}
        aria-label="Switch Language"
      >
        <Globe className="w-3.5 h-3.5 text-gold" />
        <span>{isArabic ? "English" : "العربية"}</span>
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
