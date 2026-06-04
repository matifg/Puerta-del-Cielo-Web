/**
 * Convierte bethel-14.mov / bethel-15.mov → bethel-14.mp4 / bethel-15.mp4
 * Requiere ffmpeg-static (npm install) o ffmpeg en PATH.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dir = path.join(root, "public", "images", "bethel");

const inputs = [
  { mov: "bethel-14.mov", mp4: "bethel-14.mp4" },
  { mov: "bethel-15.mov", mp4: "bethel-15.mp4" },
];

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

async function convert(ffmpeg, input, output) {
  console.log(`Generando ${path.basename(output)}…`);
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
      output,
    ],
    { windowsHide: true, maxBuffer: 50 * 1024 * 1024 }
  );
  const stat = await fs.stat(output);
  console.log(`  → ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
}

async function main() {
  const ffmpeg = await resolveFfmpeg();
  if (!ffmpeg) {
    console.error("Ejecuta npm install y vuelve a correr: npm run optimize:bethel-video");
    process.exit(1);
  }

  for (const { mov, mp4 } of inputs) {
    const input = path.join(dir, mov);
    const output = path.join(dir, mp4);
    try {
      await fs.access(input);
    } catch {
      console.warn("Omitido (no existe):", mov);
      continue;
    }
    await convert(ffmpeg, input, output);
  }

  console.log("Listo.");
}

main().catch((err) => {
  console.error(err.stderr ?? err.message ?? err);
  process.exit(1);
});
