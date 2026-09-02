import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateAccessories() {
  console.log("Updating Brush and Tongs in SQLite database...");

  // Update Tongs
  const updatedTongs = await prisma.product.update({
    where: { slug: "premium-stainless-steel-bbq-tongs" },
    data: {
      nameEn: "BBQ Tongs",
      nameAr: "ملقط شواء",
      pricePiasters: 15000,
      compareAtPricePiasters: 20000,
    },
  });
  console.log("✔ Updated Tongs:", updatedTongs.nameAr, updatedTongs.nameEn, "Price:", updatedTongs.pricePiasters);

  // Update Brush
  const updatedBrush = await prisma.product.update({
    where: { slug: "3-in-1-bbq-cleaning-brush-scraper" },
    data: {
      nameEn: "3-in-1 BBQ Cleaning Brush",
      nameAr: "فرشاة تنظيف الشوايات ٣ في 1",
      pricePiasters: 15000,
      compareAtPricePiasters: 20000,
    },
  });
  console.log("✔ Updated Brush:", updatedBrush.nameAr, updatedBrush.nameEn, "Price:", updatedBrush.pricePiasters);
}

updateAccessories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
