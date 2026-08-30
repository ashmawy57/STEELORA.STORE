const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function processChairImages() {
  console.log('Processing chair and mini-chair images...');

  const imageMap = [
    { src: 'public/chair 1.png', dest: 'public/images/products/chair-1.png' },
    { src: 'public/chair 2.png', dest: 'public/images/products/chair-2.png' },
    { src: 'public/chair 1.png', dest: 'public/images/products/chair-main.png' },
    { src: 'public/chair 1.png', dest: 'public/images/products/chair-main.jpg' },
    { src: 'public/mini chair.png', dest: 'public/images/products/mini-chair.png' },
    { src: 'public/mini chair.png', dest: 'public/images/products/table-main.png' },
    { src: 'public/mini chair.png', dest: 'public/images/products/table-main.jpg' },
  ];

  for (const item of imageMap) {
    const srcPath = path.join(__dirname, '..', item.src);
    const destPath = path.join(__dirname, '..', item.dest);

    console.log(`Flattening and saving ${item.src} -> ${item.dest}`);
    await sharp(srcPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png({ quality: 100 })
      .toFile(destPath);
  }

  // Update Chair product in SQLite database
  const updatedChair = await prisma.product.update({
    where: { slug: 'foldable-outdoor-chair' },
    data: {
      images: JSON.stringify([
        '/images/products/chair-1.png',
        '/images/products/chair-2.png',
      ]),
    },
  });
  console.log('✔ Updated Chair product images:', updatedChair.images);

  // Update Side Table / Stool product in SQLite database
  const updatedTable = await prisma.product.update({
    where: { slug: 'foldable-side-table-stool' },
    data: {
      images: JSON.stringify([
        '/images/products/mini-chair.png',
      ]),
    },
  });
  console.log('✔ Updated Side Table / Stool images:', updatedTable.images);
}

processChairImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
