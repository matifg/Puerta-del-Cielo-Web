/**
 * Recorta bethel-encuentro.jpg y bethel-adoracion.jpg desde captura Instagram slide-08.
 * Uso: node scripts/crop-bethel-instagram.mjs [ruta-al-png]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "images", "editorial");

const DEFAULT_SRC =
  "C:/Users/Administrador/.cursor/projects/c-DESARROLLO-Puerta-del-Cielo-Web/assets/c__Users_Administrador_AppData_Roaming_Cursor_User_workspaceStorage_c69a7f18f7102e617f7dc5ecb0bfa8f5_images_WhatsApp_Image_2026-05-16_at_4.01.48_PM-eb3c2fbf-8f86-4f27-b92b-54ebce48a6f3.png";

async function main() {
  const src = process.argv[2] || DEFAULT_SRC;
  await fs.access(src);
  const img = sharp(src);
  const { width: w, height: h } = await img.metadata();
  await fs.mkdir(OUT, { recursive: true });

  await img
    .clone()
    .extract({
      left: 0,
      top: Math.round(h * 0.5),
      width: w,
      height: Math.round(h * 0.36),
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT, "bethel-encuentro.jpg"));

  await img
    .clone()
    .extract({
      left: 0,
      top: Math.round(h * 0.11),
      width: w,
      height: Math.round(h * 0.38),
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT, "bethel-adoracion.jpg"));

  console.log("✓ bethel-encuentro.jpg (mesa / congregación)");
  console.log("✓ bethel-adoracion.jpg (adoración)");
  console.log("\nEjecutá: npm run optimize:editorial");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
