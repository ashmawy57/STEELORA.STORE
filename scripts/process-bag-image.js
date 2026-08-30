const sharp = require('sharp');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function processBagImage() {
  console.log('Processing tactical carry bag image...');

  const srcPath = path.join(__dirname, '../public/bag.png');
  const destPaths = [
    path.join(__dirname, '../public/images/products/bag-1.png'),
    path.join(__dirname, '../public/images/products/bag-main.png'),
    path.join(__dirname, '../public/images/products/bag-main.jpg'),
  ];

  for (const destPath of destPaths) {
    console.log('Saving flattened white-background bag image to:', destPath);
    await sharp(srcPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png({ quality: 100 })
      .toFile(destPath);
  }

  // Update SQLite database for carry bag product
  const updatedBag = await prisma.product.update({
    where: { slug: 'heavy-duty-tactical-carry-bag' },
    data: {
      images: JSON.stringify(['/images/products/bag-1.png']),
    },
  });

  console.log('✔ Successfully updated Bag product images in SQLite:', updatedBag.images);
}

processBagImage()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
