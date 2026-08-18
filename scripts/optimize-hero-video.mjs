/**
 * Hero: MP4 optimizado + WebM + poster WebP.
 * Fuentes: public/assets/hero.mp4, public/assets/hero-poster.jpg
 * Requiere ffmpeg-static o ffmpeg en PATH.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ASSETS = path.join(ROOT, "public", "assets");

const INPUT_MP4 = path.join(ASSETS, "hero.mp4");
const OUTPUT_MP4 = path.join(ASSETS, "hero.mp4");
const BACKUP_MP4 = path.join(ASSETS, "hero.source.mp4");
const OUTPUT_WEBM = path.join(ASSETS, "hero.webm");
const POSTER_JPG = path.join(ASSETS, "hero-poster.jpg");
const POSTER_WEBP = path.join(ASSETS, "hero-poster.webp");

const POSTER_WIDTHS = [720, 1080, 1440];

async function resolveFfmpeg() {
  try {
    const mod = await import("ffmpeg-static");
    const bin = mod.default ?? mod;
    if (bin && typeof bin === "string") {
      await fs.access(bin);
      return bin;
    }
  } catch {
    /* optional dep */
  }
  try {
    await execFileAsync("ffmpeg", ["-version"], { windowsHide: true });
    return "ffmpeg";
  } catch {
    return null;
  }
}

async function backupSource() {
  try {
    await fs.access(BACKUP_MP4);
    return;
  } catch {
    await fs.copyFile(INPUT_MP4, BACKUP_MP4);
    console.log(`Backup: ${path.relative(ROOT, BACKUP_MP4)}`);
  }
}

async function optimizeMp4(ffmpeg) {
  const temp = path.join(ASSETS, "hero.tmp.mp4");
  const source = await fs.access(BACKUP_MP4).then(() => BACKUP_MP4).catch(() => INPUT_MP4);
  console.log("Optimizando hero.mp4…");
  await execFileAsync(
    ffmpeg,
    [
      "-y",
      "-i",
      source,
      "-an",
      "-vf",
      "scale='min(1280,iw)':-2",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "28",
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      temp,
    ],
    { windowsHide: true, maxBuffer: 50 * 1024 * 1024 }
  );
  try {
    await fs.copyFile(temp, OUTPUT_MP4);
    await fs.unlink(temp);
    const stat = await fs.stat(OUTPUT_MP4);
    console.log(`  → ${path.relative(ROOT, OUTPUT_MP4)} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
  } catch (err) {
    const alt = path.join(ASSETS, "hero.optimized.mp4");
    await fs.rename(temp, alt).catch(async () => {
      await fs.unlink(temp).catch(() => {});
    });
    console.warn(
      "  hero.mp4 en uso (¿npm run dev?). Generado hero.optimized.mp4 — reemplazá manualmente cuando puedas."
    );
    if (err instanceof Error) console.warn(`  (${err.message})`);
  }
}

async function videoSourceForWebm() {
  for (const candidate of [OUTPUT_MP4, path.join(ASSETS, "hero.optimized.mp4"), BACKUP_MP4]) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      /* siguiente */
    }
  }
  return INPUT_MP4;
}

async function generateWebm(ffmpeg) {
  const source = await videoSourceForWebm();
  console.log("Generando hero.webm…");
  await execFileAsync(
    ffmpeg,
    [
      "-y",
      "-i",
      source,
      "-an",
      "-vf",
      "scale='min(1280,iw)':-2",
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "32",
      "-b:v",
      "0",
      "-row-mt",
      "1",
      OUTPUT_WEBM,
    ],
    { windowsHide: true, maxBuffer: 50 * 1024 * 1024 }
  );
  const stat = await fs.stat(OUTPUT_WEBM);
  console.log(`  → ${path.relative(ROOT, OUTPUT_WEBM)} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

async function generatePosterWebp() {
  console.log("Generando poster WebP…");
  for (const w of POSTER_WIDTHS) {
    const out = path.join(ASSETS, `hero-poster-${w}.webp`);
    await sharp(POSTER_JPG)
      .rotate()
      .resize(w, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 82, effort: 4 })
      .toFile(out);
    const stat = await fs.stat(out);
    console.log(`  → ${path.relative(ROOT, out)} (${Math.round(stat.size / 1024)} KB)`);
  }
  await sharp(POSTER_JPG)
    .rotate()
    .resize(1080, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 82, effort: 4 })
    .toFile(POSTER_WEBP);
  const stat = await fs.stat(POSTER_WEBP);
  console.log(`  → ${path.relative(ROOT, POSTER_WEBP)} (${Math.round(stat.size / 1024)} KB)`);
}

async function main() {
  try {
    await fs.access(INPUT_MP4);
  } catch {
    console.error("No se encontró public/assets/hero.mp4");
    process.exit(1);
  }

  const ffmpeg = await resolveFfmpeg();
  if (!ffmpeg) {
    console.error("Ejecuta npm install y vuelve a correr: npm run optimize:hero");
    process.exit(1);
  }

  await backupSource();
  await optimizeMp4(ffmpeg);
  await generateWebm(ffmpeg);

  try {
    await fs.access(POSTER_JPG);
    await generatePosterWebp();
  } catch {
    console.warn("Omitido poster WebP (no existe hero-poster.jpg)");
  }

  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err.stderr ?? err.message ?? err);
  process.exit(1);
});
