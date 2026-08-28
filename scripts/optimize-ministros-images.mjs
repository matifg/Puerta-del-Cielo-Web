/**
 * Genera WebP para ministros.
 * - lead (pastores): recorte 1:1 con viraje a papel cálido
 * - team: cuadrado para círculos
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

/** Pastores: marco ~288px CSS → 2x */
const LEAD_SLUG = "jorge-gabriela";
const LEAD_WIDTHS = [384, 768];
/**
 * 1:1. El original es 3:4 (4284×5712) y a tamaño grande obligaba a scrollear.
 * El recorte cuadrado deja las dos caras bien encuadradas y baja 25% el alto.
 */
const LEAD_ASPECT_H = 1;

/** Equipo: círculo hasta ~160px CSS → 320px en 2x */
const TEAM_WIDTHS = [320, 640];

/**
 * Viraje a "papel cálido": la pared clara del retrato de pastores tiene tinte
 * azulado y sobre el fondo oscuro del sitio leía como un blanco frío.
 * Sube apenas el rojo y baja el azul, así el fondo cae en la familia crema
 * del texto del sitio en lugar de pelear con él.
 */
const LEAD_WARM_MULTIPLIERS = [1.02, 0.995, 0.945];

/** Miniatura inline para el cruce borroso → foto real (data/ministros.ts). */
const LEAD_LQIP_SIZE = { width: 28, height: 28 };

function leadPipeline(inputPath) {
  return sharp(inputPath).rotate().linear(LEAD_WARM_MULTIPLIERS, [0, 0, 0]);
}

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

async function exportLeadPortraitWebp(inputPath, slug, width) {
  const height = Math.round(width * LEAD_ASPECT_H);
  const outPath = path.join(OUT_DIR, `${slug}-${width}.webp`);
  await leadPipeline(inputPath)
    .resize(width, height, {
      fit: "cover",
      position: "centre",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 90, effort: 4 })
    .toFile(outPath);
  return outPath;
}

async function buildLeadLqip(inputPath) {
  const buf = await leadPipeline(inputPath)
    .resize(LEAD_LQIP_SIZE.width, LEAD_LQIP_SIZE.height, { fit: "cover", position: "centre" })
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
