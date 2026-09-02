import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      governorate,
      deliveryNotes,
      paymentMethod = "COD",
      items = [],
    } = body;

    // Validate required fields
    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingAddress ||
      !city ||
      !governorate ||
      !items.length
    ) {
      return NextResponse.json(
        { error: "Missing required checkout fields" },
        { status: 400 }
      );
    }

    // Fetch product details
    const productSlugs = items.map((i: { slug: string }) => i.slug);
    const products = await prisma.product.findMany({
      where: { slug: { in: productSlugs } },
    });

    const productMap = new Map(products.map((p) => [p.slug, p]));

    let subtotalPiasters = 0;
    const orderItemsData: Array<{
      productId: string;
      productNameEn: string;
      productNameAr: string;
      quantity: number;
      unitPricePiasters: number;
      totalPiasters: number;
    }> = [];

    for (const item of items) {
      const product = productMap.get(item.slug);
      if (!product) continue;

      const itemTotal = product.pricePiasters * item.quantity;
      subtotalPiasters += itemTotal;

      orderItemsData.push({
        productId: product.id,
        productNameEn: product.nameEn,
        productNameAr: product.nameAr,
        quantity: item.quantity,
        unitPricePiasters: product.pricePiasters,
        totalPiasters: itemTotal,
      });
    }

    // Calculate bundle discounts
    const bundleSlugs = [
      "foldable-charcoal-bbq-grill",
      "heavy-duty-tactical-carry-bag",
      "foldable-outdoor-chair",
      "foldable-side-table-stool",
      "premium-stainless-steel-bbq-tongs",
      "3-in-1-bbq-cleaning-brush-scraper",
    ];
    const presentSlugs = new Set(items.map((i: { slug: string; quantity: number }) => (i.quantity > 0 ? i.slug : "")));
    const hasPrebuiltBundle = items.some((i: { slug: string }) => i.slug === "outdoor-luxury-set");
    const hasAll6 = bundleSlugs.every((s) => presentSlugs.has(s));

    let discountPiasters = 0;
    if (hasAll6 && !hasPrebuiltBundle) {
      const bundleSetsCount = Math.min(
        ...bundleSlugs.map((s) => items.find((i: { slug: string }) => i.slug === s)?.quantity || 0)
      );
      discountPiasters = 40000 * bundleSetsCount;
    }

    const discountedSubtotal = Math.max(0, subtotalPiasters - discountPiasters);
    const shippingPiasters = discountedSubtotal >= 1000000 || discountedSubtotal === 0 ? 0 : 15000;
    const totalPiasters = discountedSubtotal + shippingPiasters;

    // Generate unique order number (e.g. STL-EG-84920)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `STL-EG-${randomDigits}`;

    // Database transaction: Find or create customer + create Order + OrderItems
    const order = await prisma.$transaction(async (tx) => {
      let customer = await tx.customer.findFirst({
        where: { email: customerEmail },
      });

      if (!customer) {
        customer = await tx.customer.create({
          data: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
          },
        });
      }

      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          city,
          governorate,
          notes: deliveryNotes,
          subtotalPiasters,
          discountPiasters,
          shippingPiasters,
          totalPiasters,
          status: "PENDING",
          paymentMethod: paymentMethod === "CARD_PLACEHOLDER" ? "CARD_PLACEHOLDER" : "COD",
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalPiasters: order.totalPiasters,
    });
  } catch (error) {
    console.error("Checkout processing error:", error);
    return NextResponse.json(
      { error: "Failed to process order. Please try again." },
      { status: 500 }
    );
  }
}
