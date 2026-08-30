"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Printer,
  Home,
  ShieldCheck,
  Phone,
  Sparkles,
} from "lucide-react";
import { formatEGP } from "@/lib/currency";
import { getDictionary, type Locale } from "@/lib/dictionaries";

interface OrderSuccessViewProps {
  order: {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    governorate: string;
    subtotalPiasters: number;
    discountPiasters: number;
    shippingPiasters: number;
    totalPiasters: number;
    status: string;
    paymentMethod: string;
    createdAt: Date | string;
    items: Array<{
      id: string;
      productNameEn: string;
      productNameAr: string;
      quantity: number;
      unitPricePiasters: number;
      totalPiasters: number;
      product?: {
        images: string;
        slug: string;
      } | null;
    }>;
  };
  locale: Locale;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  locale,
}) => {
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";

  useEffect(() => {
    // Launch celebratory gold and bronze confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C6A664", "#E4C27D", "#1A1A1A", "#7D8791"],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-16 bg-ivory-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Card Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-charcoal-950 text-white border border-gold/40 shadow-luxury text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gold/20 text-gold border border-gold/40 flex items-center justify-center mx-auto shadow-goldGlow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-widest font-heading font-bold text-gold block">
            {dict.orderSuccess.statusPending}
          </span>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            {dict.orderSuccess.title}
          </h1>

          <p className="text-xs sm:text-sm text-steel-300 max-w-xl mx-auto leading-relaxed">
            {dict.orderSuccess.subtitle}
          </p>

          <div className="pt-2 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-charcoal-900 border border-steel-gray/30 font-mono text-xs sm:text-sm">
            <span className="text-steel-gray">{dict.orderSuccess.orderNumber}:</span>
            <span className="font-bold text-gold">{order.orderNumber}</span>
          </div>
        </div>

        {/* 4-Step Order Progress Timeline */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-6">
          <h3 className="font-heading font-bold text-base text-charcoal-black">
            {dict.orderSuccess.status}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gold/10 border border-gold/40 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <span className="font-heading font-bold text-xs text-charcoal-black block">
                {dict.orderSuccess.timelineStep1}
              </span>
              <p className="text-[11px] text-steel-600">
                {isArabic ? "تم التأكيد والحفظ" : "Confirmed"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivory-100 border border-steel-gray/30 space-y-2">
              <div className="w-8 h-8 rounded-full bg-charcoal text-gold flex items-center justify-center font-bold text-xs">
                2
              </div>
              <span className="font-heading font-bold text-xs text-charcoal-black block">
                {dict.orderSuccess.timelineStep2}
              </span>
              <p className="text-[11px] text-steel-600">
                {isArabic ? "في مصنع القاهرة" : "Cairo Facility"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivory-100 border border-steel-gray/30 space-y-2 opacity-70">
              <div className="w-8 h-8 rounded-full bg-steel-gray/30 text-steel-700 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <span className="font-heading font-bold text-xs text-charcoal-black block">
                {dict.orderSuccess.timelineStep3}
              </span>
              <p className="text-[11px] text-steel-600">
                {isArabic ? "١-٣ أيام عمل" : "1-3 Days"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivory-100 border border-steel-gray/30 space-y-2 opacity-70">
              <div className="w-8 h-8 rounded-full bg-steel-gray/30 text-steel-700 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <span className="font-heading font-bold text-xs text-charcoal-black block">
                {dict.orderSuccess.timelineStep4}
              </span>
              <p className="text-[11px] text-steel-600">
                {isArabic ? "معاينة ودفع" : "Inspect & Pay"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items & Shipping Address */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Details */}
            <div className="p-6 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-3">
              <h3 className="font-heading font-bold text-sm text-charcoal-black border-b border-steel-gray/10 pb-2">
                {dict.orderSuccess.deliveryTo}
              </h3>
              <div className="text-xs text-steel-700 space-y-1">
                <p className="font-bold text-charcoal-black">{order.customerName}</p>
                <p>{order.shippingAddress}</p>
                <p>{order.city}, {order.governorate}, Egypt</p>
                <p className="text-gold-dark font-medium pt-1">📞 {order.customerPhone}</p>
                <p className="text-steel-500">{order.customerEmail}</p>
              </div>
            </div>

            {/* Line items list */}
            <div className="p-6 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-4">
              <h3 className="font-heading font-bold text-sm text-charcoal-black border-b border-steel-gray/10 pb-2">
                {dict.checkout.orderSummary} ({order.items.length})
              </h3>

              <div className="divide-y divide-steel-gray/10 space-y-3">
                {order.items.map((item) => {
                  let img = "/images/products/grill-main.jpg";
                  if (item.product?.images) {
                    try {
                      img = JSON.parse(item.product.images)[0] || img;
                    } catch {
                      // ignore
                    }
                  }

                  const name = isArabic ? item.productNameAr : item.productNameEn;

                  return (
                    <div key={item.id} className="pt-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded bg-charcoal-900 overflow-hidden shrink-0 border border-steel-gray/20">
                          <Image src={img} alt={name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <span className="font-heading font-semibold text-xs text-charcoal-black block line-clamp-1">
                            {name}
                          </span>
                          <span className="text-[11px] text-steel-gray">
                            Qty: {item.quantity} × {formatEGP(item.unitPricePiasters, locale)}
                          </span>
                        </div>
                      </div>

                      <span className="font-heading font-bold text-xs text-charcoal-black">
                        {formatEGP(item.totalPiasters, locale)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Totals Box & Next Steps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-charcoal-950 text-white border border-steel-gray/30 shadow-luxury space-y-4">
              <h3 className="font-heading font-bold text-sm text-white border-b border-steel-gray/20 pb-2">
                {dict.cart.total}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-steel-300">
                  <span>{dict.cart.subtotal}</span>
                  <span className="font-semibold text-white">
                    {formatEGP(order.subtotalPiasters, locale)}
                  </span>
                </div>

                {order.discountPiasters > 0 && (
                  <div className="flex items-center justify-between text-gold font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {dict.cart.bundleDiscount}
                    </span>
                    <span>-{formatEGP(order.discountPiasters, locale)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-steel-300">
                  <span>{dict.cart.shippingEstimate}</span>
                  <span className={order.shippingPiasters === 0 ? "text-gold font-bold" : "text-white font-semibold"}>
                    {order.shippingPiasters === 0 ? dict.common.free : formatEGP(order.shippingPiasters, locale)}
                  </span>
                </div>

                <div className="pt-3 border-t border-steel-gray/20 flex items-center justify-between text-base font-heading font-bold text-white">
                  <span>{dict.cart.total}</span>
                  <span className="text-gold font-extrabold text-lg">
                    {formatEGP(order.totalPiasters, locale)}
                  </span>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-green-400 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {dict.checkout.cod}
                  </span>
                </div>
              </div>
            </div>

            {/* What's next box */}
            <div className="p-6 rounded-2xl bg-white border border-steel-gray/20 shadow-softCard space-y-2 text-xs">
              <h4 className="font-heading font-bold text-charcoal-black flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                {dict.orderSuccess.whatsNext}
              </h4>
              <p className="text-steel-600 leading-relaxed">
                {dict.orderSuccess.whatsNextDesc.replace("{phone}", order.customerPhone)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 btn-outline-gold py-3 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{dict.orderSuccess.printReceipt}</span>
              </button>

              <Link
                href={`/${locale}`}
                className="flex-1 btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-goldGlow"
              >
                <Home className="w-4 h-4" />
                <span>{dict.orderSuccess.backToHome}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
