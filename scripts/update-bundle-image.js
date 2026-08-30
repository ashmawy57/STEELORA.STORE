const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateBundleImage() {
  console.log('Updating Outdoor Luxury Set bundle image in SQLite...');

  const updated = await prisma.product.update({
    where: { slug: 'outdoor-luxury-set' },
    data: {
      images: JSON.stringify(['/images/products/pro-max.jpg']),
    },
  });

  console.log('✔ Successfully updated Bundle product image in SQLite:', updated.images);
}

updateBundleImage()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
