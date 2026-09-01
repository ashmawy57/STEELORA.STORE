"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ShieldCheck,
  Truck,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Flame,
  Armchair,
  Package,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useCart } from "@/context/cart-context";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface HeaderProps {
  locale: Locale;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const { totalItemCount, setIsDrawerOpen } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileShopExpanded, setIsMobileShopExpanded] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevCartCount, setPrevCartCount] = useState(totalItemCount);
  const [cartBounceKey, setCartBounceKey] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Track cart count changes for bounce animation
  useEffect(() => {
    if (totalItemCount !== prevCartCount && totalItemCount > 0) {
      setCartBounceKey((k) => k + 1);
    }
    setPrevCartCount(totalItemCount);
  }, [totalItemCount, prevCartCount]);

  // Scroll handler — collapse top bar + morph navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setIsTopBarVisible(scrollY <= 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close search on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/shop`, label: dict.nav.shop },
    {
      href: `/${locale}/shop/outdoor-luxury-set`,
      label: dict.nav.bundles,
      badge: dict.common.discount,
    },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/${locale}/shop?q=${encodeURIComponent(
        searchQuery.trim()
      )}`;
      setIsSearchOpen(false);
    }
  };

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

  // Marquee content items
  const marqueeItems = [
    {
      icon: Truck,
      text: dict.topbar.announcement,
      href: `/${locale}/shop`,
      external: false,
    },
    {
      icon: WhatsAppIcon,
      text: dict.topbar.whatsapp,
      href: "https://wa.me/201107754111",
      external: true,
    },
    {
      icon: Sparkles,
      text: isArabic
        ? "صنع يدوي في مصر بضمان ١٠ سنوات"
        : "Handcrafted in Egypt — 10-Year Guarantee",
      href: `/${locale}/shop`,
      external: false,
    },
  ];

  return (
    <>
      {/* ═══════════════ TOP ANNOUNCEMENT BAR — Animated Marquee ═══════════════ */}
      <div
        className={`bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 overflow-hidden transition-all duration-500 ease-in-out ${
          isTopBarVisible
            ? "max-h-10 opacity-100 py-2.5"
            : "max-h-0 opacity-0 py-0"
        }`}
        aria-hidden={!isTopBarVisible}
      >
        <div className="relative flex whitespace-nowrap">
          {/* Duplicate content for seamless loop */}
          <div className="animate-marquee flex items-center gap-0 shrink-0">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <React.Fragment key={i}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-2 text-[11px] sm:text-xs tracking-wide hover:text-gold transition-colors cursor-pointer"
                >
                  <item.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-shimmer-gold font-medium">
                    {item.text}
                  </span>
                </a>
                <span className="text-gold/40 mx-3 text-[10px] select-none">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>
          <div
            className="animate-marquee flex items-center gap-0 shrink-0"
            aria-hidden="true"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <React.Fragment key={`dup-${i}`}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-2 text-[11px] sm:text-xs tracking-wide hover:text-gold transition-colors cursor-pointer"
                >
                  <item.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-shimmer-gold font-medium">
                    {item.text}
                  </span>
                </a>
                <span className="text-gold/40 mx-3 text-[10px] select-none">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-charcoal-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-charcoal-950 to-transparent z-10" />
        </div>
      </div>

      {/* ═══════════════ MAIN STICKY NAVBAR ═══════════════ */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          isScrolled
            ? "bg-charcoal-900/80 backdrop-blur-2xl py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-charcoal-900/95 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4">
            {/* ── Logo ── */}
            <div className="flex items-center shrink-0 min-w-0">
              <Logo locale={locale} theme="dark" />
            </div>

            {/* ── Desktop Navigation Links ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ms-10 xl:ms-14">
              {/* Home */}
              <Link
                href={`/${locale}`}
                className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group ${
                  pathname === `/${locale}`
                    ? "active text-gold"
                    : "text-steel-200 hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {dict.nav.home}
                </span>
                <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
              </Link>

              {/* Shop with Category Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  href={`/${locale}/shop`}
                  className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group inline-flex items-center gap-1.5 ${
                    pathname.startsWith(`/${locale}/shop`)
                      ? "active text-gold"
                      : "text-steel-200 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {dict.nav.shop}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isShopDropdownOpen ? "rotate-180 text-gold" : "text-steel-400"
                      }`}
                    />
                  </span>
                  <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
                </Link>

                {/* Dropdown Card */}
                {isShopDropdownOpen && (
                  <div className="absolute top-full start-0 w-[480px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 rounded-2xl bg-charcoal-950/95 backdrop-blur-2xl border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* BBQ Column */}
                        <div className="space-y-2 p-3 rounded-xl bg-charcoal-900/80 border border-gold/15">
                          <Link
                            href={`/${locale}/shop?category=BBQ`}
                            className="flex items-center gap-2 text-xs font-heading font-bold text-gold uppercase tracking-wider hover:text-gold-light transition-colors"
                          >
                            <Flame className="w-4 h-4 text-gold" />
                            <span>{isArabic ? "معدات الشواء (BBQ)" : "BBQ"}</span>
                          </Link>
                          <div className="space-y-1.5 pt-1 border-t border-steel-gray/20">
                            <Link
                              href={`/${locale}/shop?category=CHARCOAL_GRILL`}
                              className="block text-xs text-steel-300 hover:text-white hover:translate-x-1 transition-all py-1"
                            >
                              🔥 {dict.shop.charcoalGrill}
                            </Link>
                            <Link
                              href={`/${locale}/shop?category=BBQ_ACCESSORY`}
                              className="block text-xs text-steel-300 hover:text-white hover:translate-x-1 transition-all py-1"
                            >
                              🎒 {dict.shop.bbqAccessory}
                            </Link>
                          </div>
                        </div>

                        {/* Outdoor Furniture Column */}
                        <div className="space-y-2 p-3 rounded-xl bg-charcoal-900/80 border border-gold/15">
                          <Link
                            href={`/${locale}/shop?category=OUTDOOR_FURNITURE`}
                            className="flex items-center gap-2 text-xs font-heading font-bold text-gold uppercase tracking-wider hover:text-gold-light transition-colors"
                          >
                            <Armchair className="w-4 h-4 text-gold" />
                            <span>{isArabic ? "الأثاث الخارجي" : "Outdoor Furniture"}</span>
                          </Link>
                          <div className="space-y-1.5 pt-1 border-t border-steel-gray/20">
                            <Link
                              href={`/${locale}/shop?category=CHAIR`}
                              className="block text-xs text-steel-300 hover:text-white hover:translate-x-1 transition-all py-1"
                            >
                              🪑 {dict.shop.chair}
                            </Link>
                            <Link
                              href={`/${locale}/shop?category=TABLE`}
                              className="block text-xs text-steel-300 hover:text-white hover:translate-x-1 transition-all py-1"
                            >
                              🪵 {dict.shop.table}
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Curated Suite Footer Strip */}
                      <Link
                        href={`/${locale}/shop/outdoor-luxury-set`}
                        className="p-3 rounded-xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 flex items-center justify-between group/suite hover:border-gold transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gold" />
                          <div>
                            <span className="text-xs font-heading font-bold text-white block">
                              {dict.bundleSpotlight.title}
                            </span>
                            <span className="text-[10px] text-gold font-semibold">
                              {dict.bundleSpotlight.savings}
                            </span>
                          </div>
                        </div>
                        <ArrowIcon className="w-4 h-4 text-gold group-hover/suite:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Luxury Offers */}
              <Link
                href={`/${locale}/shop/outdoor-luxury-set`}
                className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group ${
                  pathname === `/${locale}/shop/outdoor-luxury-set`
                    ? "active text-gold"
                    : "text-steel-200 hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {dict.nav.bundles}
                  <span className="badge-glow px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-gold/25 to-gold/10 text-gold border border-gold/40 rounded-full leading-none">
                    15%
                  </span>
                </span>
                <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
              </Link>

              {/* Brand Story */}
              <Link
                href={`/${locale}/about`}
                className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group ${
                  pathname === `/${locale}/about`
                    ? "active text-gold"
                    : "text-steel-200 hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {dict.nav.about}
                </span>
                <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
              </Link>

              {/* Journal */}
              <Link
                href={`/${locale}/blog`}
                className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group ${
                  pathname.startsWith(`/${locale}/blog`)
                    ? "active text-gold"
                    : "text-steel-200 hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {dict.nav.blog}
                </span>
                <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
              </Link>

              {/* Contact */}
              <Link
                href={`/${locale}/contact`}
                className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group ${
                  pathname === `/${locale}/contact`
                    ? "active text-gold"
                    : "text-steel-200 hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {dict.nav.contact}
                </span>
                <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
              </Link>
            </nav>

            {/* ── Actions: Search, Language, Cart, Mobile Menu ── */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`relative p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 group shrink-0 ${
                  isSearchOpen
                    ? "bg-gold/15 text-gold"
                    : "text-steel-300 hover:text-white hover:bg-white/[0.06]"
                }`}
                aria-label={dict.nav.searchPlaceholder}
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:scale-110" />
              </button>

              {/* Language Switcher — Mobile (Compact badge) */}
              <div className="sm:hidden shrink-0">
                <LanguageSwitcher currentLocale={locale} variant="compact" />
              </div>

              {/* Language Switcher — Desktop (Pill) */}
              <div className="hidden sm:block shrink-0">
                <LanguageSwitcher currentLocale={locale} variant="pill" />
              </div>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="relative inline-flex items-center justify-center p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dark text-charcoal hover:from-gold-light hover:via-gold hover:to-gold active:scale-95 transition-all duration-300 shadow-[0_4px_16px_rgba(198,166,100,0.3)] hover:shadow-[0_6px_24px_rgba(198,166,100,0.5)] group shrink-0"
                aria-label={`${dict.nav.cart} (${totalItemCount})`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal transition-transform duration-300 group-hover:scale-105" />
                {totalItemCount > 0 && (
                  <span
                    key={cartBounceKey}
                    className="cart-badge-bounce absolute -top-1 -end-1 sm:-top-1.5 sm:-end-1.5 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-charcoal-950 text-gold text-[9px] sm:text-[10px] font-bold border border-gold sm:border-2 shadow-[0_0_8px_rgba(198,166,100,0.5)]"
                  >
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative p-1.5 sm:p-2.5 text-steel-200 hover:text-white transition-all duration-300 rounded-lg sm:rounded-xl hover:bg-white/[0.06] shrink-0"
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 close-spin" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Shimmer Border Line ── */}
        <div className="header-shimmer-border mt-0" />

        {/* ═══════════════ CINEMATIC SEARCH OVERLAY ═══════════════ */}
        {isSearchOpen && (
          <div className="search-curtain bg-charcoal-950/95 backdrop-blur-xl border-t border-gold/10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={dict.nav.searchPlaceholder}
                    className="w-full bg-charcoal-800/60 text-white placeholder-steel-500 text-base sm:text-lg rounded-2xl border border-steel-gray/20 focus:border-gold/50 focus:ring-2 focus:ring-gold/20 py-4 ps-12 pe-28 transition-all duration-300 outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute end-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-charcoal rounded-xl text-xs font-heading font-bold uppercase tracking-wider hover:from-gold-light hover:to-gold transition-all duration-300"
                  >
                    {isArabic ? "بحث" : "Search"}
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
              {/* Quick links */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {[
                  isArabic ? "شواية" : "BBQ Grill",
                  isArabic ? "كرسي" : "Chair",
                  isArabic ? "طاولة" : "Table",
                  isArabic ? "حقيبة" : "Bag",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      searchInputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 text-xs rounded-full border border-steel-gray/20 text-steel-300 hover:text-gold hover:border-gold/40 transition-all duration-200 font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════ FULLSCREEN MOBILE MENU ═══════════════ */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal-950/90 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="relative z-10 flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
            {/* Nav Header */}
            <div
              className="mobile-nav-item flex items-center justify-between pb-5 mb-6 border-b border-gold/10"
              style={{ animationDelay: "0ms" }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold/60 font-heading font-bold">
                {dict.nav.menu}
              </span>
              <LanguageSwitcher currentLocale={locale} variant="pill" />
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-1 flex-1">
              {/* Home */}
              <Link
                href={`/${locale}`}
                className={`mobile-nav-item flex items-center justify-between py-3.5 px-4 rounded-xl text-[14px] uppercase tracking-[0.12em] font-heading font-semibold transition-all duration-300 ${
                  pathname === `/${locale}`
                    ? "text-gold bg-gold/[0.08] border-s-[3px] border-gold"
                    : "text-steel-100 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{dict.nav.home}</span>
                <ArrowIcon className="w-4 h-4 text-steel-600" />
              </Link>

              {/* Shop & Categories Accordion */}
              <div className="mobile-nav-item rounded-xl bg-charcoal-900/60 border border-steel-gray/20 overflow-hidden">
                <div className="flex items-center justify-between p-3.5">
                  <Link
                    href={`/${locale}/shop`}
                    className="text-[14px] uppercase tracking-[0.12em] font-heading font-semibold text-gold flex items-center gap-2"
                  >
                    <span>{dict.nav.shop}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobileShopExpanded(!isMobileShopExpanded)}
                    className="p-1 text-gold/70 hover:text-gold"
                    aria-label="Toggle Shop categories"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isMobileShopExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {isMobileShopExpanded && (
                  <div className="px-4 pb-3 space-y-3 border-t border-steel-gray/20 pt-3 text-xs">
                    {/* BBQ */}
                    <div className="space-y-1.5">
                      <Link
                        href={`/${locale}/shop?category=BBQ`}
                        className="font-heading font-bold text-gold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5 text-gold" />
                        <span>{isArabic ? "معدات الشواء (BBQ)" : "BBQ"}</span>
                      </Link>
                      <div className="ps-5 space-y-1 text-steel-300">
                        <Link
                          href={`/${locale}/shop?category=CHARCOAL_GRILL`}
                          className="block py-1 hover:text-white"
                        >
                          🔥 {dict.shop.charcoalGrill}
                        </Link>
                        <Link
                          href={`/${locale}/shop?category=BBQ_ACCESSORY`}
                          className="block py-1 hover:text-white"
                        >
                          🎒 {dict.shop.bbqAccessory}
                        </Link>
                      </div>
                    </div>

                    {/* Outdoor Furniture */}
                    <div className="space-y-1.5 pt-2 border-t border-steel-gray/10">
                      <Link
                        href={`/${locale}/shop?category=OUTDOOR_FURNITURE`}
                        className="font-heading font-bold text-gold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Armchair className="w-3.5 h-3.5 text-gold" />
                        <span>{isArabic ? "الأثاث الخارجي" : "Outdoor Furniture"}</span>
                      </Link>
                      <div className="ps-5 space-y-1 text-steel-300">
                        <Link
                          href={`/${locale}/shop?category=CHAIR`}
                          className="block py-1 hover:text-white"
                        >
                          🪑 {dict.shop.chair}
                        </Link>
                        <Link
                          href={`/${locale}/shop?category=TABLE`}
                          className="block py-1 hover:text-white"
                        >
                          🪵 {dict.shop.table}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Luxury Offers */}
              <Link
                href={`/${locale}/shop/outdoor-luxury-set`}
                className={`mobile-nav-item flex items-center justify-between py-3.5 px-4 rounded-xl text-[14px] uppercase tracking-[0.12em] font-heading font-semibold transition-all duration-300 ${
                  pathname === `/${locale}/shop/outdoor-luxury-set`
                    ? "text-gold bg-gold/[0.08] border-s-[3px] border-gold"
                    : "text-steel-100 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span className="flex items-center gap-2">
                  {dict.nav.bundles}
                  <span className="badge-glow px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-gold/25 to-gold/10 text-gold border border-gold/40 rounded-full">
                    15% OFF
                  </span>
                </span>
                <ArrowIcon className="w-4 h-4 text-steel-600" />
              </Link>

              {/* Brand Story */}
              <Link
                href={`/${locale}/about`}
                className={`mobile-nav-item flex items-center justify-between py-3.5 px-4 rounded-xl text-[14px] uppercase tracking-[0.12em] font-heading font-semibold transition-all duration-300 ${
                  pathname === `/${locale}/about`
                    ? "text-gold bg-gold/[0.08] border-s-[3px] border-gold"
                    : "text-steel-100 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{dict.nav.about}</span>
                <ArrowIcon className="w-4 h-4 text-steel-600" />
              </Link>

              {/* Journal */}
              <Link
                href={`/${locale}/blog`}
                className={`mobile-nav-item flex items-center justify-between py-3.5 px-4 rounded-xl text-[14px] uppercase tracking-[0.12em] font-heading font-semibold transition-all duration-300 ${
                  pathname.startsWith(`/${locale}/blog`)
                    ? "text-gold bg-gold/[0.08] border-s-[3px] border-gold"
                    : "text-steel-100 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{dict.nav.blog}</span>
                <ArrowIcon className="w-4 h-4 text-steel-600" />
              </Link>

              {/* Contact */}
              <Link
                href={`/${locale}/contact`}
                className={`mobile-nav-item flex items-center justify-between py-3.5 px-4 rounded-xl text-[14px] uppercase tracking-[0.12em] font-heading font-semibold transition-all duration-300 ${
                  pathname === `/${locale}/contact`
                    ? "text-gold bg-gold/[0.08] border-s-[3px] border-gold"
                    : "text-steel-100 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{dict.nav.contact}</span>
                <ArrowIcon className="w-4 h-4 text-steel-600" />
              </Link>
            </nav>

            {/* Bottom Info */}
            <div
              className="mobile-nav-item pt-6 mt-auto border-t border-steel-gray/10 space-y-4"
              style={{ animationDelay: `${(navLinks.length + 2) * 60}ms` }}
            >
              <a
                href="tel:+201107754111"
                className="flex items-center gap-3 text-sm text-steel-300 hover:text-gold transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-steel-500 block font-semibold">
                    {isArabic ? "اتصل بنا" : "Call Us"}
                  </span>
                  <span className="text-steel-200 font-medium">
                    +20 110 775 4111
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-3 text-sm text-steel-400">
                <div className="p-2.5 rounded-lg bg-gold/10">
                  <Truck className="w-4 h-4 text-gold" />
                </div>
                <span className="text-xs leading-relaxed">
                  {dict.topbar.announcement}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-steel-400">
                <div className="p-2.5 rounded-lg bg-gold/10">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                </div>
                <span className="text-xs leading-relaxed">
                  {dict.topbar.guarantee}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
