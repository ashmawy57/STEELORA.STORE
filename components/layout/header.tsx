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
    { href: `/${locale}/about`, label: dict.nav.about },
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

  // Marquee content items
  const marqueeItems = [
    {
      icon: Truck,
      text: dict.topbar.announcement,
    },
    {
      icon: ShieldCheck,
      text: dict.topbar.guarantee,
    },
    {
      icon: Phone,
      text: "+20 110 775 4111",
    },
    {
      icon: Sparkles,
      text: isArabic
        ? "صنع يدوي في مصر بضمان ١٠ سنوات"
        : "Handcrafted in Egypt — 10-Year Guarantee",
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
                <span className="inline-flex items-center gap-2 px-2 text-[11px] sm:text-xs tracking-wide">
                  <item.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-shimmer-gold font-medium">
                    {item.text}
                  </span>
                </span>
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
                <span className="inline-flex items-center gap-2 px-2 text-[11px] sm:text-xs tracking-wide">
                  <item.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-shimmer-gold font-medium">
                    {item.text}
                  </span>
                </span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ── Logo ── */}
            <div className="flex items-center shrink-0">
              <Logo locale={locale} theme="dark" />
            </div>

            {/* ── Desktop Navigation Links ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ms-10 xl:ms-14">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link-underline relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-heading font-semibold px-3 xl:px-4 py-2 rounded-md transition-all duration-300 group ${
                      isActive
                        ? "active text-gold"
                        : "text-steel-200 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                      {link.badge && (
                        <span className="badge-glow px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-gold/25 to-gold/10 text-gold border border-gold/40 rounded-full leading-none">
                          15%
                        </span>
                      )}
                    </span>
                    {/* Subtle hover bg glow */}
                    <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
                  </Link>
                );
              })}
            </nav>

            {/* ── Actions: Search, Language, Cart, Mobile Menu ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`relative p-2.5 rounded-xl transition-all duration-300 group ${
                  isSearchOpen
                    ? "bg-gold/15 text-gold"
                    : "text-steel-300 hover:text-white hover:bg-white/[0.06]"
                }`}
                aria-label={dict.nav.searchPlaceholder}
              >
                <Search className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
              </button>

              {/* Language Switcher — Mobile (Globe icon) */}
              <div className="sm:hidden">
                <LanguageSwitcher currentLocale={locale} variant="compact" />
              </div>

              {/* Language Switcher — Desktop (Pill) */}
              <div className="hidden sm:block">
                <LanguageSwitcher currentLocale={locale} variant="pill" />
              </div>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="relative inline-flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dark text-charcoal hover:from-gold-light hover:via-gold hover:to-gold active:scale-95 transition-all duration-300 shadow-[0_4px_16px_rgba(198,166,100,0.3)] hover:shadow-[0_6px_24px_rgba(198,166,100,0.5)] group"
                aria-label={`${dict.nav.cart} (${totalItemCount})`}
              >
                <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-charcoal transition-transform duration-300 group-hover:scale-105" />
                {totalItemCount > 0 && (
                  <span
                    key={cartBounceKey}
                    className="cart-badge-bounce absolute -top-1.5 -end-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-charcoal-950 text-gold text-[10px] font-bold border-2 border-gold shadow-[0_0_8px_rgba(198,166,100,0.5)]"
                  >
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative p-2.5 text-steel-200 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/[0.06]"
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 close-spin" />
                ) : (
                  <Menu className="w-6 h-6" />
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
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mobile-nav-item flex items-center justify-between py-4 px-4 rounded-xl text-[15px] uppercase tracking-[0.12em] font-heading font-semibold transition-all duration-300 group ${
                      isActive
                        ? "text-gold bg-gold/[0.08] border-s-[3px] border-gold"
                        : "text-steel-100 hover:text-white hover:bg-white/[0.03] border-s-[3px] border-transparent"
                    }`}
                    style={{ animationDelay: `${(index + 1) * 60}ms` }}
                  >
                    <span className="flex items-center gap-3">
                      {link.label}
                      {link.badge && (
                        <span className="badge-glow px-2.5 py-1 text-[10px] font-bold bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/40 rounded-full">
                          15% OFF
                        </span>
                      )}
                    </span>
                    <ArrowIcon
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "text-gold opacity-100"
                          : "text-steel-600 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
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
