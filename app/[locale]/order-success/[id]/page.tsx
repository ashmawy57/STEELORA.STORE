import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderSuccessView } from "@/components/order/order-success-view";
import { isValidLocale, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Order Confirmed | STEELORA",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderSuccessPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";

  const order = await prisma.order.findFirst({
    where: {
      OR: [{ id: params.id }, { orderNumber: params.id }],
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return <OrderSuccessView order={order} locale={locale} />;
}
