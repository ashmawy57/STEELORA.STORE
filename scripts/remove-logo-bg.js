const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const inputPath = path.join(__dirname, '../public/logo/logo-bg.png');
  const outputPath = path.join(__dirname, '../public/logo/logo-bg.png');
  const transparentPath = path.join(__dirname, '../public/logo/logo-transparent.png');

  console.log('Reading logo from:', inputPath);

  // Load raw image data
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  // Create new buffer with modified alpha
  const newBuffer = Buffer.from(data);

  for (let i = 0; i < newBuffer.length; i += channels) {
    const r = newBuffer[i];
    const g = newBuffer[i + 1];
    const b = newBuffer[i + 2];
    const a = newBuffer[i + 3];

    // Compute pixel brightness
    const brightness = Math.max(r, g, b);

    // If brightness is very dark (black background)
    if (brightness <= 15) {
      newBuffer[i + 3] = 0; // completely transparent
    } else if (brightness < 45) {
      // Smooth anti-aliased transition at edges
      const factor = (brightness - 15) / (45 - 15);
      newBuffer[i + 3] = Math.round(a * factor);
    }
  }

  // Save the result with trimmed transparent borders for a crisp icon
  await sharp(newBuffer, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .trim()
    .png()
    .toFile(transparentPath);

  // Also overwrite the main logo-bg.png and root mirrors
  await sharp(transparentPath).toFile(outputPath);
  await sharp(transparentPath).toFile(path.join(__dirname, '../public/logo-bg.png'));

  console.log('✔ Successfully created transparent logo at:', transparentPath);
}

processLogo().catch(console.error);
