import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  absoluteUrl,
  buildPageJsonLdGraph,
  DEFAULT_OG,
  getPageSeo,
} from "../data/seo";

const JSON_LD_ID = "pdc-organization-jsonld";

function upsertMeta(
  key: string,
  content: string,
  attr: "name" | "property" = "name"
): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(data: Record<string, unknown>): void {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = JSON_LD_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Actualiza title, meta description, Open Graph, canonical y JSON-LD por ruta.
 * No altera layout ni rutas — solo document.head.
 */
export function PageSeo(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, canonicalPath, ogImage } = getPageSeo(pathname);
    const canonicalUrl = absoluteUrl(canonicalPath);

    document.title = title;

    upsertMeta("description", description);
    upsertMeta("robots", "index, follow");

    upsertLink("canonical", canonicalUrl);

    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", canonicalUrl, "property");
    upsertMeta("og:type", DEFAULT_OG.type, "property");
    upsertMeta("og:image", ogImage, "property");
    upsertMeta("og:locale", DEFAULT_OG.locale, "property");
    upsertMeta("og:site_name", DEFAULT_OG.siteName, "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", ogImage);

    upsertJsonLd(buildPageJsonLdGraph(canonicalPath, title, description));
  }, [pathname]);

  return null;
}
