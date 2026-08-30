import React from "react";
import { ContactView } from "@/components/contact/contact-view";
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
    title: isArabic ? "خدمة العملاء والتواصل | ستيلورا مصر" : "Concierge & Support | STEELORA Egypt",
    description: isArabic
      ? "تواصل مع فريق خدمة عملاء ستيلورا في القاهرة للاستفسارات والطلبات الخاصة والشحن."
      : "Contact STEELORA Cairo concierge for product inquiries, corporate gifting, and expedition orders.",
  };
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";

  return <ContactView locale={locale} />;
}
