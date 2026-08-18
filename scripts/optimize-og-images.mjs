/**
 * Open Graph: JPG 1200×630 para WhatsApp / Facebook (mejor que WebP en og:image).
 * Uso: node scripts/optimize-og-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "og");

const OG_W = 1200;
const OG_H = 630;
const QUALITY = 84;

/** out (sin ext) → ruta fuente relativa a ROOT */
const SPECS = [
  { out: "home", src: "public/assets/og-logo-source.png", containOnBlack: true },
  { out: "vision", src: "public/images/editorial/cruz-fe.jpg" },
  { out: "equipo", src: "public/images/editorial/contacto-equipo.jpg" },
  { out: "areas-servicio", src: "public/images/editorial/santa-cena.jpg" },
  { out: "area-educativa", src: "public/images/danzas/danza-00.jpg" },
  { out: "discipulado", src: "public/images/discipulado/discipulado1.jpeg" },
  { out: "danza", src: "public/images/danzas/danza-01.png" },
  { out: "intercesion", src: "public/images/editorial/bethel-adoracion.jpg" },
  { out: "formacion-lideres", src: "public/images/formacionLideres/formacion-01.jpg" },
  { out: "liderazgo", src: "public/images/formacionLideres/formacion-02.jpg" },
  { out: "comunidad", src: "public/images/areasServicio/areaservicio1.jpeg" },
  { out: "conexion", src: "public/images/editorial/santa-cena-mesa.jpg" },
  { out: "iglesia-en-casa", src: "public/images/celula/celula1.jpeg" },
  { out: "bethel", src: "public/images/editorial/bethel-adoracion.jpg" },
  { out: "contacto", src: "public/images/editorial/contacto-lugares.png" },
];

async function findSource(rel) {
  const base = rel.replace(/\.(jpe?g|png|webp)$/i, "");
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
    const p = path.join(ROOT, `${base}${ext}`);
    try {
      await fs.access(p);
      return p;
    } catch {
      /* siguiente */
    }
  }
  return path.join(ROOT, rel);
}

async function exportOg(inputPath, outName, { containOnBlack = false } = {}) {
  const outPath = path.join(OUT_DIR, `${outName}.jpg`);
  const pipeline = sharp(inputPath).rotate();

  if (containOnBlack) {
    const logo = await pipeline
      .resize(OG_W, OG_H, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0 },
        kernel: sharp.kernel.lanczos3,
      })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();
    await fs.writeFile(outPath, logo);
  } else {
    await pipeline
      .resize(OG_W, OG_H, { fit: "cover", position: "centre", kernel: sharp.kernel.lanczos3 })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outPath);
  }

  const stat = await fs.stat(outPath);
  return { outPath, kb: Math.round(stat.size / 1024) };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`OG ${OG_W}×${OG_H} → public/og/\n`);
  for (const spec of SPECS) {
    const { out, src, containOnBlack = false } = spec;
    const input = await findSource(src);
    try {
      await fs.access(input);
    } catch {
      console.warn(`⚠ omitido (no existe): ${src}`);
      continue;
    }
    const { outPath, kb } = await exportOg(input, out, { containOnBlack });
    console.log(`✓ ${path.relative(ROOT, outPath)} (${kb} KB)`);
  }
  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
