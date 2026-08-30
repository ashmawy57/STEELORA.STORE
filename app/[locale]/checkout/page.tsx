import React from "react";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { isValidLocale, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "إتمام الطلب والدفع عند الاستلام | ستيلورا مصر" : "Secure Checkout & Cash on Delivery | STEELORA",
    description: isArabic
      ? "أتمم طلبك لمعدات الستانلس ستيل ٣٠٤ مع خيار الدفع والمعاينة عند الاستلام وشحن سريع لكافة محافظات مصر."
      : "Complete your order for premium 304 stainless steel outdoor gear with Cash on Delivery across Egypt.",
  };
}

export default function CheckoutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";

  return <CheckoutView locale={locale} />;
}
