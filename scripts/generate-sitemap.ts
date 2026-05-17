/**
 * Regenera public/sitemap.xml desde data/seo.ts (lastmod = fecha del build).
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  SITEMAP_PATHS,
  absoluteUrl,
  getSitemapChangefreq,
  getSitemapPriority,
} from "../data/seo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const lastmod = new Date().toISOString().slice(0, 10);

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const urlEntries = SITEMAP_PATHS.map((path) => {
  const priority = getSitemapPriority(path);
  const changefreq = getSitemapChangefreq(path);
  return `  <url>
    <loc>${escapeXml(absoluteUrl(path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outPath = join(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`[seo] sitemap → ${outPath} (${SITEMAP_PATHS.length} URLs, lastmod ${lastmod})`);
