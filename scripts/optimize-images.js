const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const stat = fs.statSync(filePath);
  const originalSize = stat.size;

  try {
    const buffer = fs.readFileSync(filePath);
    let outputBuffer;

    if (ext === '.png') {
      outputBuffer = await sharp(buffer)
        .png({ quality: 85, compressionLevel: 9, adaptiveFiltering: true, effort: 8 })
        .toBuffer();
    } else {
      outputBuffer = await sharp(buffer)
        .jpeg({ quality: 84, mozjpeg: true, progressive: true })
        .toBuffer();
    }

    if (outputBuffer.length < originalSize) {
      fs.writeFileSync(filePath, outputBuffer);
      const savedPercent = (((originalSize - outputBuffer.length) / originalSize) * 100).toFixed(1);
      console.log(`Optimized ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB -> ${(outputBuffer.length/1024).toFixed(0)}KB (-${savedPercent}%)`);
    } else {
      console.log(`Kept ${path.basename(filePath)} (already optimal)`);
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
  }
}

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  console.log('Starting image optimization across public/ ...');
  await processDir(publicDir);
  console.log('Image optimization complete!');
}

main();
