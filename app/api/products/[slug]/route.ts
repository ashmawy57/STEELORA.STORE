import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get related products for cross-sell
    const relatedProducts = await prisma.product.findMany({
      where: {
        slug: { not: slug },
      },
      take: 4,
    });

    return NextResponse.json({ product, relatedProducts });
  } catch (error) {
    console.error("Product detail API error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
