import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateGrillImages() {
  console.log("Updating Foldable Charcoal BBQ Grill images in SQLite...");

  const newImages = JSON.stringify([
    "/images/products/grill-1.png",
    "/images/products/grill-2.png",
    "/images/products/grill-bag.png",
  ]);

  const updated = await prisma.product.update({
    where: { slug: "foldable-charcoal-bbq-grill" },
    data: {
      images: newImages,
    },
  });

  console.log("✔ Successfully updated BBQ Grill images:", updated.images);
}

updateGrillImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
