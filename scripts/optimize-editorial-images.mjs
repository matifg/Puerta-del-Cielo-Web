/**
 * WebP responsivos para fotos editoriales.
 * Fuentes: .jpg, .jpeg, .png o .webp con el mismo nombre base en public/images/editorial/
 * Uso: node scripts/optimize-editorial-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "images", "editorial");
const OUT_DIR = SRC_DIR;

const LANDSCAPE_WIDTHS = [720, 1080, 1440];
const PORTRAIT_WIDTHS = [480, 720, 960];
const QUALITY = 82;

/** Slugs con encuadre vertical */
const PORTRAIT_SLUGS = new Set(["santa-cena-mesa"]);

async function findSource(slug) {
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
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

async function exportWebp(inputPath, slug, width, portrait) {
  const outPath = path.join(OUT_DIR, `${slug}-${width}.webp`);
  let pipeline = sharp(inputPath).rotate();
  pipeline = pipeline.resize(width, null, {
    withoutEnlargement: true,
    fit: "inside",
    kernel: sharp.kernel.lanczos3,
  });
  await pipeline.webp({ quality: QUALITY, effort: 4 }).toFile(outPath);
  return outPath;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  const slugs = new Set();
  for (const e of entries) {
    if (!e.isFile()) continue;
    const m = e.name.match(/^(.+)\.(jpe?g|png|webp)$/i);
    if (!m) continue;
    const base = m[1];
    if (/-\d+$/.test(base)) continue;
    slugs.add(base);
  }

  if (slugs.size === 0) {
    console.warn("No hay fuentes en public/images/editorial");
    return;
  }

  for (const slug of [...slugs].sort()) {
    const inputPath = await findSource(slug);
    if (!inputPath) continue;
    const portrait = PORTRAIT_SLUGS.has(slug);
    const widths = portrait ? PORTRAIT_WIDTHS : LANDSCAPE_WIDTHS;
    for (const w of widths) {
      const out = await exportWebp(inputPath, slug, w, portrait);
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
