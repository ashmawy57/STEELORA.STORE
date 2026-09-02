import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export interface CartItemInput {
  productId: string;
  slug: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CartItemInput[] = body.items || [];

    if (!items.length) {
      return NextResponse.json({
        subtotalPiasters: 0,
        discountPiasters: 0,
        shippingPiasters: 0,
        totalPiasters: 0,
        isBundleEligible: false,
        hasBundleDiscount: false,
        totalWeightKg: 0,
        freeShippingRemainingPiasters: 1000000,
      });
    }

    // Fetch products from database
    const productSlugs = items.map((i) => i.slug);
    const products = await prisma.product.findMany({
      where: {
        slug: { in: productSlugs },
      },
    });

    const productMap = new Map(products.map((p) => [p.slug, p]));

    let rawSubtotalPiasters = 0;
    let totalWeightKg = 0;

    // Track bundle components in cart
    // Core bundle items: grill, chair, table, bag
    const bundleSlugs = [
      "foldable-charcoal-bbq-grill",
      "heavy-duty-tactical-carry-bag",
      "foldable-outdoor-chair",
      "foldable-side-table-stool",
      "premium-stainless-steel-bbq-tongs",
      "3-in-1-bbq-cleaning-brush-scraper",
    ];

    const presentSlugs = new Set<string>();

    for (const item of items) {
      const product = productMap.get(item.slug);
      if (product) {
        rawSubtotalPiasters += product.pricePiasters * item.quantity;
        totalWeightKg += product.weightKg * item.quantity;
        if (item.quantity > 0) {
          presentSlugs.add(item.slug);
        }
      }
    }

    // Check if the user already bought the pre-configured bundle OR has all 6 individual components
    const hasPrebuiltBundle = items.some((i) => i.slug === "outdoor-luxury-set" && i.quantity > 0);
    const hasAll6IndividualItems = bundleSlugs.every((slug) => presentSlugs.has(slug));

    let discountPiasters = 0;
    let hasBundleDiscount = false;

    if (hasAll6IndividualItems && !hasPrebuiltBundle) {
      // Find minimum quantity across all 6 bundle items
      const bundleSetsCount = Math.min(
        ...bundleSlugs.map((s) => items.find((i) => i.slug === s)?.quantity || 0)
      );

      if (bundleSetsCount > 0) {
        // Grand Opening bundle discount = 400 EGP (40,000 piasters) savings per set!
        // Total separate = 1700 + 170 + 500 + 300 + 150 + 150 = 2,970 EGP (297,000 piasters)
        // Bundle price = 2,570 EGP (257,000 piasters)
        discountPiasters = 40000 * bundleSetsCount;
        hasBundleDiscount = true;
      }
    } else if (hasPrebuiltBundle) {
      hasBundleDiscount = true;
    }

    const discountedSubtotal = Math.max(0, rawSubtotalPiasters - discountPiasters);

    // Free shipping threshold: 10,000 EGP (1,000,000 piasters)
    const FREE_SHIPPING_THRESHOLD = 1000000;
    let shippingPiasters = 0;

    if (discountedSubtotal < FREE_SHIPPING_THRESHOLD && discountedSubtotal > 0) {
      // Flat rate insured courier delivery across Egypt: 150 EGP (15,000 piasters)
      shippingPiasters = 15000;
    }

    const freeShippingRemainingPiasters = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
    const totalPiasters = discountedSubtotal + shippingPiasters;

    return NextResponse.json({
      subtotalPiasters: rawSubtotalPiasters,
      discountPiasters,
      hasBundleDiscount,
      isBundleEligible: hasAll6IndividualItems || hasPrebuiltBundle,
      missingBundleSlugs: bundleSlugs.filter((s) => !presentSlugs.has(s)),
      totalWeightKg: Math.round(totalWeightKg * 10) / 10,
      shippingPiasters,
      totalPiasters,
      freeShippingThresholdPiasters: FREE_SHIPPING_THRESHOLD,
      freeShippingRemainingPiasters,
    });
  } catch (error) {
    console.error("Cart calculate error:", error);
    return NextResponse.json({ error: "Failed to calculate cart totals" }, { status: 500 });
  }
}
