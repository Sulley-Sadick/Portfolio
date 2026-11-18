import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Keep in sync with `src/features/about/developer.assets.ts`. */
const AVATAR1_SOURCE = "src/assets/images/avatar1.png";
const AVATAR1_OUTPUT = "src/assets/images/avatar1.webp";
const AVATAR1_MAX_WIDTH = 960;
const AVATAR1_WEBP_QUALITY = 88;

async function main() {
  const sharp = (await import("sharp")).default;
  const sourcePath = path.join(root, AVATAR1_SOURCE);
  const outputPath = path.join(root, AVATAR1_OUTPUT);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Skipping avatar1 optimize: missing ${AVATAR1_SOURCE}`);
    return;
  }

  const sourceStat = fs.statSync(sourcePath);
  let skip = false;
  if (fs.existsSync(outputPath)) {
    const outStat = fs.statSync(outputPath);
    if (outStat.mtimeMs >= sourceStat.mtimeMs) {
      skip = true;
    }
  }

  if (skip) {
    console.log("avatar1.webp is up to date");
    return;
  }

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: AVATAR1_MAX_WIDTH,
      height: AVATAR1_MAX_WIDTH,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: AVATAR1_WEBP_QUALITY, effort: 6 })
    .toFile(outputPath);

  const outSize = fs.statSync(outputPath).size;
  console.log(
    `Wrote ${AVATAR1_OUTPUT} (${Math.round(outSize / 1024)} KiB) from ${AVATAR1_SOURCE}`,
  );
}

main();