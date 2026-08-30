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
      "foldable-outdoor-chair",
      "foldable-side-table-stool",
      "heavy-duty-tactical-carry-bag",
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

    // Check if the user already bought the pre-configured bundle OR has all 4 individual components
    const hasPrebuiltBundle = items.some((i) => i.slug === "outdoor-luxury-set" && i.quantity > 0);
    const hasAll4IndividualItems = bundleSlugs.every((slug) => presentSlugs.has(slug));

    let discountPiasters = 0;
    let hasBundleDiscount = false;

    if (hasAll4IndividualItems && !hasPrebuiltBundle) {
      // Find minimum quantity across all 4 bundle items
      const bundleSetsCount = Math.min(
        ...bundleSlugs.map((s) => items.find((i) => i.slug === s)?.quantity || 0)
      );

      if (bundleSetsCount > 0) {
        // 15% discount on the bundle components portion
        // Sum of 1 set of individual components = 7950 + 3950 + 2850 + 1200 = 15,950 EGP (1,595,000 piasters)
        // Bundle price = 13,600 EGP (1,360,000 piasters). Savings = 2,350 EGP (235,000 piasters) per complete set!
        discountPiasters = 235000 * bundleSetsCount;
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
      isBundleEligible: hasAll4IndividualItems || hasPrebuiltBundle,
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
