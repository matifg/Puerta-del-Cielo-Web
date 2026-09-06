/**
 * Genera WebP para ministros.
 * - lead (pastores): lienzo 2:3 exacto con fit fill (sin letterbox que genera borde claro)
 * - team: cuadrado para círculos, fit contain + fondo blanco
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

/** Pastores: retrato 2:3 sobre marfil #F3EFE7. */
const LEAD_SLUG = "jorge-gabriela";
const LEAD_WIDTHS = [384, 768];
const LEAD_HEIGHT_RATIO = 3 / 2;
const PAGE_BG = { r: 243, g: 239, b: 231, alpha: 1 };
/** Equipo: círculo hasta ~128px CSS → 320px en 2x */
const TEAM_WIDTHS = [320, 640];

/** Miniatura inline para el cruce borroso → foto real (data/ministros.ts). */
const LEAD_LQIP_SIZE = { width: 28, height: 42 };

const WHITE_BG = { r: 255, g: 255, b: 255, alpha: 1 };

function portraitPipeline(inputPath) {
  return sharp(inputPath).rotate();
}

const containResize = {
  fit: "contain",
  position: "centre",
  background: WHITE_BG,
  kernel: sharp.kernel.lanczos3,
};

async function exportSquareWebp(inputPath, slug, width) {
  const outPath = path.join(OUT_DIR, `${slug}-${width}.webp`);
  await portraitPipeline(inputPath)
    .resize(width, width, containResize)
    .webp({ quality: 88, effort: 4 })
    .toFile(outPath);
  return outPath;
}

async function exportLeadPortraitWebp(inputPath, slug, width) {
  const height = Math.round(width * LEAD_HEIGHT_RATIO);
  const outPath = path.join(OUT_DIR, `${slug}-${width}.webp`);
  // fill: evita 1px de letterbox marfil en el borde (se veía como línea blanca).
  await portraitPipeline(inputPath)
    .resize(width, height, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 90, effort: 4 })
    .toFile(outPath);
  return outPath;
}

async function buildLeadLqip(inputPath) {
  const buf = await portraitPipeline(inputPath)
    .resize(LEAD_LQIP_SIZE.width, LEAD_LQIP_SIZE.height, {
      fit: "fill",
    })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
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
    const isLead = slug === LEAD_SLUG;
    const widths = isLead ? LEAD_WIDTHS : TEAM_WIDTHS;
    for (const w of widths) {
      const out = isLead
        ? await exportLeadPortraitWebp(inputPath, slug, w)
        : await exportSquareWebp(inputPath, slug, w);
      const stat = await fs.stat(out);
      console.log(`✓ ${path.relative(ROOT, out)} (${Math.round(stat.size / 1024)} KB)`);
    }
  }

  const leadJpg = jpgs.find((f) => f.replace(/\.jpe?g$/i, "") === LEAD_SLUG);
  if (leadJpg) {
    const lqip = await buildLeadLqip(path.join(SRC_DIR, leadJpg));
    console.log(`\nLQIP (pegar en MINISTER_LEAD_LQIP de data/ministros.ts):\n${lqip}`);
  }

  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
