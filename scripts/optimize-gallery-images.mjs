/**
 * WebP responsivos para galerías (intercesión, discipulado, células).
 * Fuentes: .jpg, .jpeg o .png en public/images/<carpeta>/
 * Uso: node scripts/optimize-gallery-images.mjs [carpeta...]
 *      node scripts/optimize-gallery-images.mjs   (todas)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES_ROOT = path.join(ROOT, "public", "images");

const WIDTHS = [480, 720, 1080];
const QUALITY = 82;

const DEFAULT_DIRS = ["intercesion", "discipulado", "celula", "formacionLideres", "areasServicio", "servicios"];

/** Archivos fuente que no son fotos de galería */
const SKIP = new Set(["discipulado.jpeg"]);

async function findSource(dir, slug) {
  for (const ext of [".jpg", ".jpeg", ".png"]) {
    const p = path.join(dir, `${slug}${ext}`);
    try {
      await fs.access(p);
      return p;
    } catch {
      /* siguiente */
    }
  }
  return null;
}

async function exportWebp(inputPath, dir, slug, width) {
  const outPath = path.join(dir, `${slug}-${width}.webp`);
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

async function processDir(folder) {
  const dir = path.join(IMAGES_ROOT, folder);
  try {
    await fs.access(dir);
  } catch {
    console.warn(`Omitido (no existe): ${folder}`);
    return;
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
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
    console.warn(`Sin fuentes en public/images/${folder}`);
    return;
  }

  console.log(`\n── ${folder} ──`);
  for (const slug of [...slugs].sort()) {
    const inputPath = await findSource(dir, slug);
    if (!inputPath) continue;
    for (const w of WIDTHS) {
      const out = await exportWebp(inputPath, dir, slug, w);
      const stat = await fs.stat(out);
      console.log(`✓ ${path.relative(ROOT, out)} (${Math.round(stat.size / 1024)} KB)`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const folders = args.length > 0 ? args : DEFAULT_DIRS;
  for (const folder of folders) {
    await processDir(folder);
  }
  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
