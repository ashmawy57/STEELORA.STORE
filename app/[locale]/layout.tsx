import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { UpsellModal } from "@/components/product/upsell-modal";
import { CartProvider } from "@/context/cart-context";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import "@/app/globals.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";

  const isArabic = locale === "ar";
  const title = isArabic
    ? "ستيلورا | فخامة الصناعة ومعدات التخييم والشواء الفاخرة القابلة للطي"
    : "STEELORA | Luxury Foldable 304 Stainless Steel Outdoor Gear & BBQ Systems";

  const description = isArabic
    ? "معدات شواء وتخييم فاخرة قابلة للطي مصنعة من الفولاذ المقاوم للصدأ ٣٠٤ فائق الجودة في مصر. شحن مجاني لكافة المحافظات وضمان حقيقي ١٠ سنوات."
    : "Precision-engineered foldable 304 stainless steel outdoor BBQ systems and luxury camp gear. Handcrafted in Cairo with lifetime craftsmanship guarantee.";

  return {
    title: {
      default: title,
      template: `%s | STEELORA`,
    },
    description,
    keywords: [
      "foldable bbq grill",
      "stainless steel camping gear",
      "outdoor luxury furniture",
      "foldable chair",
      "foldable side table",
      "Egyptian stainless steel",
      "شواية فحم قابلة للطي",
      "معدات تخييم فاخرة",
      "ستانلس ستيل ٣٠٤ مصر",
      "كرسي تخييم قابل للطي",
    ],
    authors: [{ name: "STEELORA Metal Industry" }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://steelora.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_EG" : "en_US",
      url: `/${locale}`,
      title,
      description,
      siteName: "STEELORA",
      images: [
        {
          url: "/images/hero/hero-bg.png",
          width: 1200,
          height: 630,
          alt: "STEELORA Luxury Outdoor Gear",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero/hero-bg.png"],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal antialiased selection:bg-gold selection:text-charcoal font-sans">
        <CartProvider>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <CartDrawer locale={locale} />
          <UpsellModal locale={locale} />
          <WhatsAppButton locale={locale} />
        </CartProvider>
      </body>
    </html>
  );
}
