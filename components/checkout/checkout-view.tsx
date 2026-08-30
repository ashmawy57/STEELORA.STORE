"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  Sparkles,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface CheckoutViewProps {
  locale: Locale;
}

const EGYPT_GOVERNORATES = [
  { key: "cairo", en: "Cairo", ar: "القاهرة" },
  { key: "giza", en: "Giza", ar: "الجيزة" },
  { key: "alexandria", en: "Alexandria", ar: "الإسكندرية" },
  { key: "qalyubia", en: "Qalyubia", ar: "القليوبية" },
  { key: "sharqia", en: "Sharqia", ar: "الشرقية" },
  { key: "dakahlia", en: "Dakahlia", ar: "الدقهلية" },
  { key: "red-sea", en: "Red Sea (Hurghada / El Gouna)", ar: "البحر الأحمر (الغردقة / الجونة)" },
  { key: "south-sinai", en: "South Sinai (Sharm El Sheikh / Dahab)", ar: "جنوب سيناء (شرم الشيخ / دهب)" },
  { key: "port-said", en: "Port Said", ar: "بورسعيد" },
  { key: "suez", en: "Suez", ar: "السويس" },
  { key: "beheira", en: "Beheira", ar: "البحيرة" },
  { key: "gharbia", en: "Gharbia", ar: "الغربية" },
  { key: "monufia", en: "Monufia", ar: "المنوفية" },
  { key: "ismailia", en: "Ismailia", ar: "الإسماعيلية" },
  { key: "damietta", en: "Damietta", ar: "دمياط" },
  { key: "matrouh", en: "Matrouh (North Coast)", ar: "مطروح (الساحل الشمالي)" },
];

export const CheckoutView: React.FC<CheckoutViewProps> = ({ locale }) => {
  const dict = getDictionary(locale);
  const router = useRouter();
  const { items, calculation, clearCart } = useCart();

  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    governorate: "Cairo",
    deliveryNotes: "",
    paymentMethod: "COD",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      setErrorMsg(isArabic ? "سلة التسوق فارغة" : "Your cart is empty");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.city) {
      setErrorMsg(isArabic ? "يرجى استكمال جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.street,
        city: formData.city,
        governorate: formData.governorate,
        deliveryNotes: formData.deliveryNotes,
        paymentMethod: formData.paymentMethod,
        items: items.map((i) => ({
          productId: i.product.id,
          slug: i.product.slug,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        clearCart();
        router.push(`/${locale}/order-success/${data.orderId}`);
      } else {
        setErrorMsg(data.error || "Failed to process order. Please try again.");
      }
    } catch (err) {
      console.error("Order submission error:", err);
      setErrorMsg("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-ivory-200 min-h-[70vh] flex items-center justify-center">
        <div className="p-10 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard text-center space-y-4 max-w-md">
          <h2 className="font-heading font-bold text-xl text-charcoal-black">
            {dict.cart.emptyTitle}
          </h2>
          <p className="text-xs text-steel-600">
            {dict.cart.emptyDesc}
          </p>
          <Link href={`/${locale}/shop`} className="btn-gold px-6 py-3 text-xs font-bold inline-block shadow-goldGlow">
            {dict.hero.primaryCta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-steel-gray/20 pb-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold-dark block">
              {dict.about.eyebrow}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-black flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              <span>{dict.checkout.title}</span>
            </h1>
          </div>
          <Link
            href={`/${locale}/cart`}
            className="text-xs font-heading font-semibold text-steel-700 hover:text-gold transition-colors"
          >
            {dict.common.viewCart}
          </Link>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Contact, Shipping, Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Information */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-4">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-charcoal-black border-b border-steel-gray/10 pb-3">
                1. {dict.checkout.contactInfo}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isArabic ? "مثال: أحمد محمود إبراهيم" : "e.g. Tarek Mansour"}
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0100 000 0000"
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address in Egypt */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-4">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-charcoal-black border-b border-steel-gray/10 pb-3">
                2. {dict.checkout.shippingAddress}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.street} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder={isArabic ? "اسم الشارع، رقم العقار، رقم الشقة أو اسم الفيلا والكمبوند" : "Street name, building, apt/villa, compound"}
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.governorate} *
                  </label>
                  <select
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  >
                    {EGYPT_GOVERNORATES.map((gov) => (
                      <option key={gov.key} value={isArabic ? gov.ar : gov.en}>
                        {isArabic ? gov.ar : gov.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.city} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={isArabic ? "مثال: التجمع الخامس / مصر الجديدة / سموحة" : "e.g. New Cairo / Heliopolis / Smouha"}
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-charcoal-800">
                    {dict.checkout.deliveryNotes}
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    placeholder={isArabic ? "رقم البوابة أو تعليمات خاصة للمندوب" : "Gate code or special delivery instructions"}
                    className="w-full bg-ivory-100 border border-steel-gray/30 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-4">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-charcoal-black border-b border-steel-gray/10 pb-3">
                3. {dict.checkout.paymentMethod}
              </h3>

              <div className="space-y-3">
                {/* Cash on Delivery (Active) */}
                <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-gold bg-gold/5 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                    className="mt-1 text-gold focus:ring-gold"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs sm:text-sm text-charcoal-black flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-gold" />
                        {dict.checkout.cod}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-800 font-bold">
                        {isArabic ? "متاح فوري" : "Active"}
                      </span>
                    </div>
                    <p className="text-xs text-steel-600 leading-relaxed">
                      {dict.checkout.codDesc}
                    </p>
                  </div>
                </label>

                {/* Credit Card (Disabled Placeholder) */}
                <div className="flex items-start gap-3 p-4 rounded-xl border border-steel-gray/20 bg-ivory-100 opacity-60 cursor-not-allowed">
                  <input
                    type="radio"
                    disabled
                    name="paymentMethod"
                    value="CARD"
                    className="mt-1 text-steel-gray"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs sm:text-sm text-steel-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-steel-gray" />
                        {dict.checkout.card}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-steel-gray/20 text-steel-700 font-bold">
                        {isArabic ? "قريباً" : "Coming Soon"}
                      </span>
                    </div>
                    <p className="text-xs text-steel-500">
                      {dict.checkout.cardDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-charcoal-950 text-white border border-steel-gray/30 shadow-luxury space-y-6 sticky top-24">
            <h3 className="font-heading font-bold text-lg text-white border-b border-steel-gray/20 pb-4">
              {dict.checkout.orderSummary}
            </h3>

            {/* Line items mini preview */}
            <div className="space-y-3 max-h-56 overflow-y-auto divide-y divide-steel-gray/10">
              {items.map(({ product, quantity }) => {
                let parsedImages: string[] = [];
                try {
                  parsedImages = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
                } catch {
                  parsedImages = ["/images/products/grill-main.jpg"];
                }
                const img = parsedImages[0] || "/images/products/grill-main.jpg";

                return (
                  <div key={product.id} className="flex items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-12 h-12 rounded bg-charcoal-900 overflow-hidden shrink-0 border border-steel-gray/20">
                        <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white block truncate">
                          {isArabic ? product.nameAr : product.nameEn}
                        </span>
                        <span className="text-[11px] text-steel-gray">
                          Qty: {quantity}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gold shrink-0">
                      {formatEGP(product.pricePiasters * quantity, locale)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-steel-gray/20">
              <div className="flex items-center justify-between text-steel-300">
                <span>{dict.cart.subtotal}</span>
                <span className="font-semibold text-white">
                  {formatEGP(calculation.subtotalPiasters, locale)}
                </span>
              </div>

              {calculation.discountPiasters > 0 && (
                <div className="flex items-center justify-between text-gold font-medium">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {dict.cart.bundleDiscount}
                  </span>
                  <span>-{formatEGP(calculation.discountPiasters, locale)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-steel-300">
                <span>{dict.cart.shippingEstimate}</span>
                <span className={calculation.shippingPiasters === 0 ? "text-gold font-bold" : "text-white font-semibold"}>
                  {calculation.shippingPiasters === 0
                    ? dict.common.free
                    : formatEGP(calculation.shippingPiasters, locale)}
                </span>
              </div>

              <div className="pt-3 border-t border-steel-gray/20 flex items-center justify-between text-base sm:text-lg font-heading font-extrabold text-white">
                <span>{dict.cart.total}</span>
                <span className="text-gold font-black">
                  {formatEGP(calculation.totalPiasters, locale)}
                </span>
              </div>
            </div>

            {/* Submit Place Order CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-goldGlow"
              >
                <span>{isSubmitting ? dict.checkout.placingOrder : dict.checkout.placeOrder}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-steel-gray text-center leading-relaxed">
                {dict.checkout.guaranteeNote}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
