import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Keep in sync with `src/config/branding.ts`. */
const PORTRAIT_SOURCE = "src/assets/images/sadick2.jpg";
const OUT_DIR = "public/branding";
const OUTPUTS = [
  { file: "sulley-portrait-48.png", size: 48 },
  { file: "sulley-portrait-192.png", size: 192 },
  { file: "sulley-portrait-512.png", size: 512 },
  { file: "../favicon.ico", size: 32 },
];

function circleMaskSvg(size) {
  const radius = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/></svg>`,
  );
}

async function toCircularPng(sharp, sourceBuffer, size) {
  const resized = await sharp(sourceBuffer)
    .rotate()
    .resize(size, size, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  return sharp(resized)
    .composite([{ input: circleMaskSvg(size), blend: "dest-in" }])
    .png({ quality: 90 });
}

async function main() {
  const sharp = (await import("sharp")).default;
  const source = path.join(root, PORTRAIT_SOURCE);
  if (!fs.existsSync(source)) {
    throw new Error(`Source image not found: ${source}`);
  }

  const outDir = path.join(root, OUT_DIR);
  fs.mkdirSync(outDir, { recursive: true });

  const sourceBuffer = fs.readFileSync(source);

  for (const { file, size } of OUTPUTS) {
    const target =
      file === "../favicon.ico"
        ? path.join(root, "public/favicon.ico")
        : path.join(outDir, file);
    await (await toCircularPng(sharp, sourceBuffer, size)).toFile(target);
  }

  console.log("Circular brand icons written to public/branding/ and public/favicon.ico");
}

main();