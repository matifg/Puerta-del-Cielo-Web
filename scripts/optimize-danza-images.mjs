/**
 * WebP responsivos para fotos del carrusel Danza y Artes.
 * Fuentes: .jpg, .jpeg o .png en public/images/danzas/ (excluye poster y videos)
 * Uso: node scripts/optimize-danza-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "images", "danzas");

const WIDTHS = [480, 720, 1080];
const QUALITY = 82;

/** Archivos que no son diapositivas del carrusel */
const SKIP = new Set(["danza-ministerio-poster"]);

async function findSource(slug) {
  for (const ext of [".jpg", ".jpeg", ".png"]) {
    const p = path.join(SRC_DIR, `${slug}${ext}`);
    try {
      await fs.access(p);
      return p;
    } catch {
      /* siguiente */
    }
  }
  return null;
}

async function exportWebp(inputPath, slug, width) {
  const outPath = path.join(SRC_DIR, `${slug}-${width}.webp`);
  await sharp(inputPath)
    .rotate()
    .resize(width, null, {
      withoutEnlargement: true,
      fit: "inside",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(outPath);
  return outPath;
}

async function main() {
  await fs.mkdir(SRC_DIR, { recursive: true });
  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  const slugs = new Set();

  for (const e of entries) {
    if (!e.isFile()) continue;
    const m = e.name.match(/^(.+)\.(jpe?g|png)$/i);
    if (!m) continue;
    const base = m[1];
    if (new RegExp(`-(${WIDTHS.join("|")})$`).test(base) || SKIP.has(base)) continue;
    slugs.add(base);
  }

  if (slugs.size === 0) {
    console.warn("No hay fuentes en public/images/danzas");
    return;
  }

  for (const slug of [...slugs].sort()) {
    const inputPath = await findSource(slug);
    if (!inputPath) continue;
    for (const w of WIDTHS) {
      const out = await exportWebp(inputPath, slug, w);
      const stat = await fs.stat(out);
      console.log(`✓ ${path.relative(ROOT, out)} (${Math.round(stat.size / 1024)} KB)`);
    }
  }
  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
