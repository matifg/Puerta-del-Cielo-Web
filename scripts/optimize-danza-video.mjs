/**
 * Convierte public/images/danzas/IMG_2400.MOV → danza-ministerio.mp4 + poster JPG.
 * Requiere ffmpeg en PATH.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dir = path.join(root, "public", "images", "danzas");
const input = path.join(dir, "IMG_2400.MOV");
const mp4 = path.join(dir, "danza-ministerio.mp4");
const poster = path.join(dir, "danza-ministerio-poster.jpg");

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

async function main() {
  try {
    await fs.access(input);
  } catch {
    console.error("No se encontró:", input);
    process.exit(1);
  }

  const ffmpeg = await resolveFfmpeg();
  if (!ffmpeg) {
    console.error("Ejecuta npm install y vuelve a correr: npm run optimize:danza-video");
    process.exit(1);
  }

  console.log("Generando MP4…");
  await execFileAsync(
    ffmpeg,
    [
      "-y",
      "-i",
      input,
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
      mp4,
    ],
    { windowsHide: true, maxBuffer: 20 * 1024 * 1024 }
  );

  console.log("Generando poster…");
  await execFileAsync(
    ffmpeg,
    ["-y", "-i", mp4, "-ss", "00:00:00.5", "-vframes", "1", "-q:v", "3", poster],
    { windowsHide: true }
  );

  const stat = await fs.stat(mp4);
  console.log(`Listo: ${path.relative(root, mp4)} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`Poster: ${path.relative(root, poster)}`);
}

main().catch((err) => {
  console.error(err.stderr ?? err.message ?? err);
  process.exit(1);
});
