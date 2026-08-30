"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, ShieldCheck, Truck, Phone } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isArabic = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/shop`, label: dict.nav.shop },
    { href: `/${locale}/shop/outdoor-luxury-set`, label: dict.nav.bundles, badge: dict.common.discount },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/${locale}/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal-950 text-steel-200 text-xs py-2 px-4 border-b border-steel-gray/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{dict.topbar.announcement}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-steel-300">
              <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
              {dict.topbar.guarantee}
            </span>
            <span className="flex items-center gap-1.5 text-steel-300">
              <Phone className="w-3 h-3 text-gold shrink-0" />
              +20 100 000 7833
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal-900/95 backdrop-blur-md shadow-luxury py-3 border-b border-steel-gray/30"
            : "bg-charcoal-900/90 backdrop-blur-sm py-4 border-b border-steel-gray/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Logo locale={locale} theme="dark" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.15em] font-heading transition-all duration-200 py-1 ${
                      isActive
                        ? "text-gold font-bold"
                        : "text-steel-100 hover:text-gold"
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ms-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-gold/20 text-gold border border-gold/40 rounded">
                        15%
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Language, Cart, Mobile Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-steel-200 hover:text-gold transition-colors rounded-full hover:bg-white/5"
                aria-label={dict.nav.searchPlaceholder}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher currentLocale={locale} variant="pill" />
              </div>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="relative inline-flex items-center justify-center p-2.5 rounded-lg bg-gold text-charcoal hover:bg-gold-light active:bg-gold-dark transition-all duration-200 shadow-md group"
                aria-label={`${dict.nav.cart} (${totalItemCount})`}
              >
                <ShoppingBag className="w-5 h-5 text-charcoal group-hover:scale-105 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-charcoal text-gold text-[11px] font-bold border border-gold shadow-sm animate-pulse">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-steel-200 hover:text-gold transition-colors rounded-lg hover:bg-white/5"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Collapsible Search Bar */}
          {isSearchOpen && (
            <div className="mt-4 pt-4 border-t border-steel-gray/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.nav.searchPlaceholder}
                  className="w-full bg-charcoal-800 text-white placeholder-steel-gray text-sm rounded-lg border border-steel-gray/40 focus:border-gold focus:ring-1 focus:ring-gold py-2.5 ps-10 pe-4 transition-all"
                  autoFocus
                />
                <Search className="w-4 h-4 text-steel-gray absolute start-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute end-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-gold text-charcoal rounded text-xs font-semibold hover:bg-gold-light transition-colors"
                >
                  {isArabic ? "بحث" : "Search"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Slide-down Sheet */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-charcoal-950 border-b border-steel-gray/30 px-6 py-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-steel-gray/20">
              <span className="text-xs uppercase tracking-wider text-steel-gray font-semibold">
                {dict.nav.menu}
              </span>
              <LanguageSwitcher currentLocale={locale} variant="pill" />
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between py-2 text-sm uppercase tracking-wider font-heading ${
                      isActive ? "text-gold font-bold" : "text-steel-100 hover:text-gold"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-gold/20 text-gold border border-gold/40 rounded">
                        15% OFF
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-steel-gray/20 space-y-3">
              <div className="text-xs text-steel-300 flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold shrink-0" />
                <span>{dict.topbar.announcement}</span>
              </div>
              <div className="text-xs text-steel-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+20 100 000 7833</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
