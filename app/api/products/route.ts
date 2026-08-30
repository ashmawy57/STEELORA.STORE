import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const where: Record<string, unknown> = {};

    if (category && category !== "ALL") {
      where.category = category.toUpperCase();
    }

    if (query) {
      where.OR = [
        { nameEn: { contains: query } },
        { nameAr: { contains: query } },
        { descriptionEn: { contains: query } },
        { descriptionAr: { contains: query } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "asc" }],
      include: {
        reviews: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
