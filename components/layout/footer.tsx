"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-charcoal-950 text-steel-200 border-t border-steel-gray/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo locale={locale} theme="dark" />
            <p className="text-xs leading-relaxed text-steel-300 max-w-sm">
              {dict.footer.bio}
            </p>
            <div className="pt-2 text-xs text-steel-gray space-y-1">
              <p>📍 {dict.contact.address}</p>
              <p>📞 +20 110 775 4111 | concierge@steelora.com</p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-heading font-bold text-gold">
              {dict.footer.shopLinks}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href={`/${locale}/shop`}
                  className="text-steel-300 hover:text-gold transition-colors font-medium"
                >
                  {dict.shop.allCategories}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop?category=CHARCOAL_GRILL`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  🔥 {dict.shop.charcoalGrill}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop?category=BBQ_ACCESSORY`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  🎒 {dict.shop.bbqAccessory}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop?category=CHAIR`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  🪑 {dict.shop.chair}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop?category=TABLE`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  🪵 {dict.shop.table}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop/outdoor-luxury-set`}
                  className="text-gold font-semibold hover:text-gold-light transition-colors flex items-center gap-1.5 pt-1"
                >
                  <span>{dict.shop.bundle}</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-gold/20 text-gold rounded font-bold">15% OFF</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-heading font-bold text-gold">
              {dict.footer.companyLinks}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  {dict.nav.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cart`}
                  className="text-steel-300 hover:text-gold transition-colors"
                >
                  {dict.nav.cart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-heading font-bold text-gold">
              {dict.footer.newsletterTitle}
            </h3>
            <p className="text-xs text-steel-gray leading-relaxed">
              {dict.footer.newsletterDesc}
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-gold bg-gold/10 p-3 rounded-lg border border-gold/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{dict.footer.newsletterSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.footer.newsletterPlaceholder}
                    className="w-full bg-charcoal-900 text-white placeholder-steel-gray text-xs rounded-lg border border-steel-gray/30 focus:border-gold focus:ring-1 focus:ring-gold py-2.5 ps-3 pe-10 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-gold text-charcoal rounded hover:bg-gold-light transition-colors disabled:opacity-50"
                    aria-label={dict.footer.newsletterButton}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-steel-gray/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel-gray">
          <p>{dict.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold cursor-pointer transition-colors">
              {dict.footer.privacy}
            </span>
            <span className="hover:text-gold cursor-pointer transition-colors">
              {dict.footer.terms}
            </span>
            <span className="hover:text-gold cursor-pointer transition-colors">
              {dict.footer.shippingPolicy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
