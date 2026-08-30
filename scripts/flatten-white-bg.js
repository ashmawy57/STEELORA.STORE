const sharp = require('sharp');
const path = require('path');

async function processImages() {
  const images = [
    'public/images/products/grill-1.png',
    'public/images/products/grill-2.png',
    'public/images/products/grill-bag.png',
    'public/images/products/grill-main.png',
    'public/images/products/grill-main.jpg',
    'public/grill 1.png',
    'public/grill 2.png',
    'public/grill bag.png',
  ];

  for (const imgPath of images) {
    const fullPath = path.join(__dirname, '..', imgPath);
    console.log('Flattening to white background:', imgPath);

    // Read image, flatten over pure white background (#FFFFFF) with high quality
    await sharp(fullPath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png({ quality: 100 })
      .toFile(fullPath + '.tmp.png');

    const fs = require('fs');
    fs.copyFileSync(fullPath + '.tmp.png', fullPath);
    fs.unlinkSync(fullPath + '.tmp.png');
  }

  console.log('✔ All grill images successfully flattened to pure white #FFFFFF background!');
}

processImages().catch(console.error);
