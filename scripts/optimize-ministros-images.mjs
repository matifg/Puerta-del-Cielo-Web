/**
 * Genera retratos cuadrados WebP en tamaños para pantalla 1x/2x.
 * Uso: node scripts/optimize-ministros-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public", "images", "ministros");
const OUT_DIR = path.join(SRC_DIR, "optimized");

/** Pastores: círculo hasta ~384px CSS → 768px lógico en 2x */
const LEAD_SLUG = "jorge-gabriela";
const LEAD_WIDTHS = [384, 768, 1200];

/** Equipo: círculo hasta ~160px CSS → 320px en 2x */
const TEAM_WIDTHS = [320, 640];

async function exportSquareWebp(inputPath, slug, width) {
  const outPath = path.join(OUT_DIR, `${slug}-${width}.webp`);
  await sharp(inputPath)
    .rotate()
    .resize(width, width, {
      fit: "cover",
      position: "centre",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 88, effort: 4 })
    .toFile(outPath);
  return outPath;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  const jpgs = entries
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => e.name);

  if (jpgs.length === 0) {
    console.warn("No hay .jpg en public/images/ministros");
    return;
  }

  for (const file of jpgs) {
    const slug = file.replace(/\.jpe?g$/i, "");
    const inputPath = path.join(SRC_DIR, file);
    const widths = slug === LEAD_SLUG ? LEAD_WIDTHS : TEAM_WIDTHS;
    for (const w of widths) {
      const out = await exportSquareWebp(inputPath, slug, w);
      const stat = await fs.stat(out);
      console.log(`✓ ${path.relative(ROOT, out)} (${Math.round(stat.size / 1024)} KB)`);
    }
  }

  console.log("\nListo. Faltan en carpeta (añadir .jpg y volver a ejecutar):");
  const expected = ["oscar-termini", "debora-bugueno"];
  for (const slug of expected) {
    if (!jpgs.some((f) => f.replace(/\.jpe?g$/i, "") === slug)) {
      console.log(`  - ${slug}.jpg`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
