/**
 * Recorta fotos desde capturas de Instagram (sin UI).
 * Colocá los PNG en public/images/editorial/instagram-src/ con estos nombres:
 *   slide-03.png  (copas + corona, dos fotos apiladas)
 *   slide-10.png  (mesa Santa Cena en escenario)
 *   slide-05.png  (cruz y congregación)
 *   slide-08.png  (adoración + mesa, dos fotos apiladas) — opcional
 *
 * Uso: node scripts/crop-vision-instagram.mjs && npm run optimize:editorial
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public", "images", "editorial", "instagram-src");
const OUT = path.join(ROOT, "public", "images", "editorial");

/** left, top, width, height en % del tamaño de la imagen */
async function cropPercent(input, outputName, region) {
  const inputPath = path.join(SRC, input);
  const img = sharp(inputPath);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  const left = Math.round((region.left / 100) * w);
  const top = Math.round((region.top / 100) * h);
  const width = Math.round((region.width / 100) * w);
  const height = Math.round((region.height / 100) * h);
  const outPath = path.join(OUT, `${outputName}.jpg`);
  await img.extract({ left, top, width, height }).jpeg({ quality: 90 }).toFile(outPath);
  console.log(`✓ ${path.relative(ROOT, outPath)} (${width}x${height})`);
}

async function main() {
  await fs.mkdir(SRC, { recursive: true });
  await fs.mkdir(OUT, { recursive: true });

  const jobs = [
    {
      file: "slide-03.png",
      outputs: [
        { name: "vision-copas-comunion", region: { left: 0, top: 11, width: 100, height: 38 } },
        { name: "vision-corona-espinas", region: { left: 0, top: 50, width: 100, height: 36 } },
      ],
    },
    {
      file: "slide-10.png",
      outputs: [{ name: "vision-mesa-escenario", region: { left: 0, top: 10, width: 100, height: 72 } }],
    },
    {
      file: "slide-05.png",
      outputs: [{ name: "vision-cruz-congregacion", region: { left: 0, top: 10, width: 100, height: 72 } }],
    },
    {
      file: "slide-08.png",
      outputs: [
        { name: "bethel-adoracion", region: { left: 0, top: 11, width: 100, height: 38 } },
        { name: "bethel-encuentro", region: { left: 0, top: 50, width: 100, height: 36 } },
        { name: "vision-adoracion", region: { left: 0, top: 11, width: 100, height: 38 } },
        { name: "vision-comunidad-mesa", region: { left: 0, top: 50, width: 100, height: 36 } },
      ],
    },
  ];

  let done = 0;
  for (const job of jobs) {
    try {
      await fs.access(path.join(SRC, job.file));
    } catch {
      console.warn(`⊘ Falta ${job.file} en instagram-src/`);
      continue;
    }
    for (const out of job.outputs) {
      await cropPercent(job.file, out.name, out.region);
      done++;
    }
  }

  if (done === 0) {
    console.log("\nCopiá las capturas de Instagram a:");
    console.log(`  ${SRC}`);
    console.log("Renombrá: slide-03, slide-05, slide-08, slide-10.png");
    process.exit(1);
  }
  console.log("\nListo. Ejecutá: npm run optimize:editorial");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
