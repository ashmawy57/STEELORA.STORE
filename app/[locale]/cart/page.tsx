import React from "react";
import { CartPageView } from "@/components/cart/cart-page-view";
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
    title: isArabic ? "سلة التسوق | ستيلورا مصر" : "Shopping Cart | STEELORA",
    description: isArabic
      ? "راجع مشترياتك من معدات الستانلس ستيل ٣٠٤ واستفد من خصومات المجموعات والشحن المجاني في مصر."
      : "Review your selected 304 stainless steel outdoor gear and enjoy bundle savings with free delivery across Egypt.",
  };
}

export default function CartPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";

  return <CartPageView locale={locale} />;
}
