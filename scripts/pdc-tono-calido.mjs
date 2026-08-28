/**
 * Codemod de temperatura: pasa la paleta oscura del sitio de azulada (fría)
 * a cálida, manteniendo el mismo nivel de oscuridad.
 *
 * Uso:
 *   node scripts/pdc-tono-calido.mjs --dry     (solo reporta)
 *   node scripts/pdc-tono-calido.mjs           (aplica)
 *   node scripts/pdc-tono-calido.mjs --revert  (vuelve a la paleta fría)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EXTS = new Set([".tsx", ".ts", ".css"]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "_material-original",
  "public",
  "scripts",
]);

/** Frío → cálido, emparejado por nivel de oscuridad. */
const HEX_MAP = {
  "#030508": "#0e0b08",
  "#05070a": "#100d0a",
  "#050810": "#100d09",
  "#050a12": "#120f0b",
  "#080c14": "#14100c",
  "#080c16": "#14100c",
  "#090e14": "#15110d",
  "#0a0f18": "#17130e",
  "#0a1018": "#17130e",
  "#0c1220": "#1b1610",
  "#0c1424": "#1d1711",
  "#0a1524": "#1d1711",
  "#0f1622": "#1f1912",
  "#121a2c": "#241d15",
  "#0a1837": "#221a12",
  "#020617": "#0b0806",
};

/** Grises Tailwind fríos → grises cálidos (`stone`). */
const CLASS_MAP = {
  "text-zinc-200": "text-stone-200",
  "text-zinc-300": "text-stone-300",
  "text-zinc-400": "text-stone-400",
  "text-zinc-500": "text-stone-500",
  "text-zinc-600": "text-stone-600",
  "text-gray-300": "text-stone-300",
  "zinc-900": "stone-900",
  "slate-950": "[#0b0806]",
  "slate-900": "[#1b1610]",
};

/** `from-black` / `to-black` / `via-black`: paradas de gradiente de superficie. */
const BLACK_STOP_WARM = "#080605";

const mode = process.argv.includes("--revert")
  ? "revert"
  : process.argv.includes("--dry")
    ? "dry"
    : "apply";

function invert(map) {
  const out = {};
  for (const [k, v] of Object.entries(map)) {
    // Los mapeos que colapsan dos tonos en uno no se pueden revertir 1:1;
    // se conserva el primero, suficiente para volver a un look frío.
    if (!(v in out)) out[v] = k;
  }
  return out;
}

const hexMap = mode === "revert" ? invert(HEX_MAP) : HEX_MAP;
const classMap = mode === "revert" ? invert(CLASS_MAP) : CLASS_MAP;
const blackStopFrom = mode === "revert" ? BLACK_STOP_WARM : "black";
const blackStopTo = mode === "revert" ? "black" : BLACK_STOP_WARM;

function transform(text) {
  let out = text;
  let hits = 0;

  for (const [from, to] of Object.entries(hexMap)) {
    const re = new RegExp(from.replace("#", "#"), "gi");
    out = out.replace(re, (m) => {
      hits += 1;
      return to;
    });
  }

  for (const [from, to] of Object.entries(classMap)) {
    const re = new RegExp(`\\b${from.replace(/[[\]#]/g, "\\$&")}\\b`, "g");
    out = out.replace(re, () => {
      hits += 1;
      return to;
    });
  }

  const stopRe =
    blackStopFrom === "black"
      ? /\b(from|to|via)-black\b/g
      : new RegExp(`\\b(from|to|via)-\\[${BLACK_STOP_WARM}\\]`, "g");
  out = out.replace(stopRe, (m, dir) => {
    hits += 1;
    return blackStopTo === "black" ? `${dir}-black` : `${dir}-[${blackStopTo}]`;
  });

  return { out, hits };
}

const changed = [];
let totalHits = 0;

(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!EXTS.has(path.extname(entry.name))) continue;

    const text = fs.readFileSync(full, "utf8");
    const { out, hits } = transform(text);
    if (hits === 0 || out === text) continue;

    totalHits += hits;
    changed.push({ file: path.relative(ROOT, full), hits });
    if (mode !== "dry") fs.writeFileSync(full, out, "utf8");
  }
})(ROOT);

changed.sort((a, b) => b.hits - a.hits);
for (const { file, hits } of changed) console.log(`${hits.toString().padStart(3)}  ${file}`);
console.log(
  `\n${mode === "dry" ? "[dry-run] " : ""}${changed.length} archivos, ${totalHits} reemplazos (modo: ${mode})`
);
