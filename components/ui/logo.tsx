import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "horizontal" | "icon" | "stacked";
  theme?: "dark" | "light";
  className?: string;
  locale?: string;
}

export const SteelRibbonIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-7 h-7 sm:w-9 sm:h-9",
  size = 36,
}) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <Image
        src="/logo/logo-transparent.png"
        alt="STEELORA Logo Icon"
        width={size}
        height={size}
        className="object-contain drop-shadow-sm"
        priority
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "horizontal",
  theme = "dark",
  className = "",
  locale = "en",
}) => {
  const isDark = theme === "dark";
  const isArabic = locale === "ar";
  const href = `/${locale}`;

  if (variant === "icon") {
    return (
      <Link href={href} className={`inline-flex items-center group shrink-0 ${className}`}>
        <SteelRibbonIcon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" size={40} />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 sm:gap-2.5 group focus:outline-none shrink-0 ${className}`}
      aria-label={isArabic ? "ستيلورا - الصفحة الرئيسية" : "STEELORA Homepage"}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <SteelRibbonIcon className="w-7 h-7 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0" size={36} />
      </div>

      {isArabic ? (
        <div className="flex items-center font-heading font-extrabold text-lg sm:text-2xl select-none tracking-tight shrink-0">
          <span
            className={`transition-colors duration-200 ${
              isDark ? "text-white group-hover:text-gold" : "text-charcoal-black"
            }`}
          >
            ستيل
          </span>
          <span className="text-gold group-hover:text-gold-light transition-colors duration-200">
            ورا
          </span>
        </div>
      ) : (
        <div
          className="flex items-center tracking-[0.10em] sm:tracking-[0.16em] font-heading font-extrabold text-base sm:text-2xl uppercase select-none [direction:ltr] shrink-0"
          dir="ltr"
        >
          <span
            className={`transition-colors duration-200 ${
              isDark ? "text-white group-hover:text-gold" : "text-charcoal-black"
            }`}
          >
            STEEL
          </span>
          <span className="text-gold group-hover:text-gold-light transition-colors duration-200">
            ORA
          </span>
        </div>
      )}
    </Link>
  );
};
