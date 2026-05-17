/**
 * Tras `vite build`, genera index.html por ruta canónica con metas y JSON-LD en el HTML estático.
 * La SPA sigue hidratando en #root — no cambia rutas ni componentes.
 */
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  SITEMAP_PATHS,
  absoluteUrl,
  buildPageJsonLdGraph,
  getPageSeo,
} from "../data/seo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");
const templatePath = join(distDir, "index.html");

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function upsertMetaTag(html: string, attr: "name" | "property", key: string, content: string): string {
  const escaped = escapeAttr(content);
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escaped}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `  ${tag}\n</head>`);
}

function upsertLinkCanonical(html: string, href: string): string {
  const escaped = escapeAttr(href);
  const re = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  const tag = `<link rel="canonical" href="${escaped}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `  ${tag}\n</head>`);
}

function upsertJsonLdScript(html: string, graph: Record<string, unknown>): string {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  const re = /<script\s+type="application\/ld\+json"\s+id="pdc-organization-jsonld"[^>]*>[\s\S]*?<\/script>/i;
  const tag = `<script type="application/ld+json" id="pdc-organization-jsonld">${json}</script>`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `  ${tag}\n</head>`);
}

function patchIndexHtml(html: string, pathname: string): string {
  const { title, description, canonicalPath, ogImage } = getPageSeo(pathname);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const graph = buildPageJsonLdGraph(canonicalPath, title, description);

  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(title)}</title>`);

  out = upsertMetaTag(out, "name", "description", description);
  out = upsertMetaTag(out, "name", "robots", "index, follow");
  out = upsertLinkCanonical(out, canonicalUrl);

  out = upsertMetaTag(out, "property", "og:title", title);
  out = upsertMetaTag(out, "property", "og:description", description);
  out = upsertMetaTag(out, "property", "og:url", canonicalUrl);
  out = upsertMetaTag(out, "property", "og:image", ogImage);
  out = upsertMetaTag(out, "name", "twitter:title", title);
  out = upsertMetaTag(out, "name", "twitter:description", description);
  out = upsertMetaTag(out, "name", "twitter:image", ogImage);

  out = upsertJsonLdScript(out, graph);
  return out;
}

function outputPathForRoute(routePath: string): string {
  if (routePath === "/") return join(distDir, "index.html");
  return join(distDir, routePath.slice(1), "index.html");
}

function main(): void {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("[seo] prerender omitido (SKIP_PRERENDER=1)");
    return;
  }

  let template: string;
  try {
    template = readFileSync(templatePath, "utf8");
  } catch {
    console.warn("[seo] prerender: no se encontró dist/index.html — ejecutá vite build antes.");
    return;
  }

  for (const routePath of SITEMAP_PATHS) {
    const patched = patchIndexHtml(template, routePath);
    const outPath = outputPathForRoute(routePath);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, patched, "utf8");
  }

  console.log(`[seo] prerender → ${SITEMAP_PATHS.length} rutas en dist/`);
}

main();
