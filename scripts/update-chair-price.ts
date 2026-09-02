import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateChairPrice() {
  console.log("Updating Folding Camping Chair price in SQLite database...");

  const updated = await prisma.product.update({
    where: { slug: "foldable-outdoor-chair" },
    data: {
      pricePiasters: 50000,
      compareAtPricePiasters: 55000,
    },
  });

  console.log("✔ Successfully updated chair price:", updated.nameAr, "Price:", updated.pricePiasters, "Compare:", updated.compareAtPricePiasters);
}

updateChairPrice()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
