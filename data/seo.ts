import { email, direccion, getSchemaTelephone } from "./contacto";
import { horariosReunionGeneral } from "./horariosWeb";

/** Dominio de producción — sitemap, canonical y Open Graph. */
export const SITE_URL = "https://puertadelcielobaradero.com.ar";

export const SITE_NAME = "Puerta del Cielo";

/** Ruta bajo /public — OG por defecto (home y fallback). */
export const DEFAULT_OG_IMAGE_PATH = "/assets/hero-poster.jpg";

export function ogImageUrl(imagePath: string): string {
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${SITE_URL}${path}`;
}

export const DEFAULT_OG_IMAGE = ogImageUrl(DEFAULT_OG_IMAGE_PATH);

export type PageSeo = {
  title: string;
  description: string;
};

/** Rutas alias → URL canónica (evita contenido duplicado en buscadores). */
export const SEO_CANONICAL_ALIASES: Record<string, string> = {
  "/liderazgo": "/area-educativa/liderazgo",
  "/servicio-comunidad": "/area-servicio/comunidad",
  "/quienes-somos": "/quienes-somos/vision",
};

/** Solo URLs canónicas (también en public/sitemap.xml y prerender). */
export const SITEMAP_PATHS: readonly string[] = [
  "/",
  "/quienes-somos/vision",
  "/quienes-somos/equipo-ministerial",
  "/quienes-somos/areas-servicio",
  "/area-educativa",
  "/area-educativa/discipulado",
  "/area-educativa/danza-artes",
  "/area-educativa/intercesion",
  "/area-educativa/liderazgo",
  "/area-servicio/comunidad",
  "/conexion",
  "/conexion/iglesia-en-casa",
  "/bethel",
  "/contacto",
] as const;

/** Imagen OG por ruta canónica (archivos en public/). */
const ROUTE_OG_IMAGE_PATH: Record<string, string> = {
  "/": DEFAULT_OG_IMAGE_PATH,
  "/quienes-somos/vision": "/images/editorial/cruz-fe-1080.webp",
  "/quienes-somos/equipo-ministerial": "/images/editorial/contacto-equipo-1080.webp",
  "/quienes-somos/areas-servicio": "/images/editorial/santa-cena-1080.webp",
  "/area-educativa": "/images/editorial/danza-escuela-960.webp",
  "/area-educativa/discipulado": "/images/editorial/cruz-fe-1080.webp",
  "/area-educativa/danza-artes": "/images/editorial/danza-grupo-escenario-1080.webp",
  "/area-educativa/intercesion": "/images/editorial/bethel-adoracion-1080.webp",
  "/area-educativa/liderazgo": "/images/editorial/contacto-equipo-1080.webp",
  "/area-servicio/comunidad": "/images/editorial/contacto-lugares-1080.webp",
  "/conexion": "/images/editorial/santa-cena-mesa-960.webp",
  "/conexion/iglesia-en-casa": "/images/celula/celula1.jpeg",
  "/bethel": "/images/editorial/bethel-encuentro-1080.webp",
  "/contacto": "/images/editorial/contacto-lugares-1080.webp",
};

const ROUTE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Puerta del Cielo | Iglesia cristiana en Baradero",
    description:
      "Iglesia cristiana en Baradero, Buenos Aires. Adoración, comunidad y formación. Conocé horarios, visión y cómo sumarte a Puerta del Cielo.",
  },
  "/quienes-somos/vision": {
    title: "Visión y propósito | Puerta del Cielo – Baradero",
    description:
      "Conocé la visión, misión y propósito de Puerta del Cielo, una iglesia en Baradero comprometida con el Evangelio y el servicio.",
  },
  "/quienes-somos/equipo-ministerial": {
    title: "Equipo ministerial | Puerta del Cielo – Baradero",
    description:
      "Pastores y líderes de Puerta del Cielo en Baradero. Una iglesia que acompaña, forma y sirve con pasión por Cristo.",
  },
  "/quienes-somos/areas-servicio": {
    title: "Áreas de servicio | Puerta del Cielo – Baradero",
    description:
      "Sumate al servicio en alabanza, intercesión, medios, niños, jóvenes y más. Áreas de servicio en nuestra iglesia en Baradero.",
  },
  "/area-educativa": {
    title: "Área educativa | Puerta del Cielo – Baradero",
    description:
      "Escuelas de discipulado, danza y artes, intercesión y liderazgo. Formación con propósito en Puerta del Cielo, Baradero.",
  },
  "/area-educativa/discipulado": {
    title: "Discipulado | Puerta del Cielo – Baradero",
    description:
      "Programa de discipulado y formación espiritual en Baradero. Crecé en la fe con acompañamiento y enseñanza bíblica.",
  },
  "/area-educativa/danza-artes": {
    title: "Danza y Artes | Puerta del Cielo – Baradero",
    description:
      "Escuela de Danza y Artes Dinámicas en Baradero. Creatividad, movimiento y adoración al servicio del Reino de Dios.",
  },
  "/area-educativa/intercesion": {
    title: "Intercesión EIGE | Puerta del Cielo – Baradero",
    description:
      "Formación en intercesión y guerra espiritual (EIGE) en Baradero. Levantá intercesores con discernimiento y autoridad.",
  },
  "/area-educativa/liderazgo": {
    title: "Escuela de liderazgo | Puerta del Cielo – Baradero",
    description:
      "Formación de líderes con carácter, visión y espíritu de servicio en Puerta del Cielo, iglesia en Baradero.",
  },
  "/area-servicio/comunidad": {
    title: "Servicio a la comunidad | Puerta del Cielo – Baradero",
    description:
      "Servicio social y ayuda a la comunidad en Baradero. Sembramos esperanza con amor práctico desde Puerta del Cielo.",
  },
  "/conexion": {
    title: "Conexión | Puerta del Cielo – Baradero",
    description:
      "Grupos de conexión y comunidad en Puerta del Cielo, Baradero. Crecé en la fe junto a otros en un ambiente familiar.",
  },
  "/conexion/iglesia-en-casa": {
    title: "Iglesia en casa | Puerta del Cielo – Baradero",
    description:
      "Encuentros Iglesia en Casa en Baradero: comunidad, Palabra y compañerismo en hogares. Sumate a Conexión.",
  },
  "/bethel": {
    title: "Bethel | Puerta del Cielo – Baradero",
    description:
      "Experiencia Bethel y encuentro con la presencia de Dios. Conocé el llamado y la historia de Puerta del Cielo en Baradero.",
  },
  "/contacto": {
    title: "Contacto | Puerta del Cielo – Baradero",
    description:
      "Contactá a Puerta del Cielo en Baradero: dirección, email y redes. Te esperamos en Manuel Belgrano 2053.",
  },
};

/** Etiquetas para BreadcrumbList (ruta canónica completa). */
const BREADCRUMB_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/quienes-somos": "Quiénes somos",
  "/quienes-somos/vision": "Visión y propósito",
  "/quienes-somos/equipo-ministerial": "Equipo ministerial",
  "/quienes-somos/areas-servicio": "Áreas de servicio",
  "/area-educativa": "Área educativa",
  "/area-educativa/discipulado": "Discipulado",
  "/area-educativa/danza-artes": "Danza y Artes",
  "/area-educativa/intercesion": "Intercesión EIGE",
  "/area-educativa/liderazgo": "Escuela de liderazgo",
  "/area-servicio": "Área de servicio",
  "/area-servicio/comunidad": "Servicio a la comunidad",
  "/conexion": "Conexión",
  "/conexion/iglesia-en-casa": "Iglesia en casa",
  "/bethel": "Bethel",
  "/contacto": "Contacto",
};

const SITEMAP_PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/quienes-somos/vision": 0.9,
  "/contacto": 0.85,
  "/area-educativa": 0.85,
  "/bethel": 0.8,
  "/quienes-somos/equipo-ministerial": 0.8,
  "/quienes-somos/areas-servicio": 0.8,
  "/area-servicio/comunidad": 0.8,
};

const SITEMAP_CHANGEFREQ: Record<string, string> = {
  "/": "weekly",
};

export const DEFAULT_PAGE_SEO: PageSeo = {
  title: "Puerta del Cielo | Iglesia cristiana en Baradero",
  description:
    "Puerta del Cielo — iglesia cristiana en Baradero, Provincia de Buenos Aires. Adoración, comunidad y formación espiritual.",
};

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function resolveCanonicalPath(pathname: string): string {
  const path = normalizePathname(pathname);
  return SEO_CANONICAL_ALIASES[path] ?? path;
}

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function getOgImagePath(canonicalPath: string): string {
  return ROUTE_OG_IMAGE_PATH[canonicalPath] ?? DEFAULT_OG_IMAGE_PATH;
}

export function getPageSeo(pathname: string): PageSeo & {
  canonicalPath: string;
  ogImagePath: string;
  ogImage: string;
} {
  const canonicalPath = resolveCanonicalPath(pathname);
  const seo = ROUTE_SEO[canonicalPath] ?? DEFAULT_PAGE_SEO;
  const ogImagePath = getOgImagePath(canonicalPath);
  return {
    ...seo,
    canonicalPath,
    ogImagePath,
    ogImage: ogImageUrl(ogImagePath),
  };
}

const SOCIAL_PROFILES = [
  "https://www.facebook.com/puertadelcielobaradero",
  "https://www.instagram.com/puertadelcielo.ba/",
  "https://www.youtube.com/@puertadelcielo1112",
] as const;

export function buildOrganizationJsonLd(): Record<string, unknown> {
  const telephone = getSchemaTelephone();
  return {
    "@type": "Church",
    name: SITE_NAME,
    url: SITE_URL,
    email,
    image: DEFAULT_OG_IMAGE,
    address: {
      "@type": "PostalAddress",
      streetAddress: direccion.lineas[0],
      addressLocality: "Baradero",
      postalCode: "B2942",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: [...SOCIAL_PROFILES],
    openingHours: horariosReunionGeneral.map((h) => `${h.dia} ${h.hora}`),
    ...(telephone ? { telephone } : {}),
  };
}

export function buildWebPageJsonLd(
  canonicalPath: string,
  title: string,
  description: string
): Record<string, unknown> {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(canonicalPath)}#webpage`,
    url: absoluteUrl(canonicalPath),
    name: title,
    description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "es-AR",
  };
}

export function buildBreadcrumbJsonLd(canonicalPath: string): Record<string, unknown> | null {
  if (canonicalPath === "/") return null;

  const segments = canonicalPath.split("/").filter(Boolean);
  const prefixes: string[] = [];
  const crumbs: { path: string; name: string }[] = [{ path: "/", name: BREADCRUMB_LABELS["/"] ?? "Inicio" }];

  for (const seg of segments) {
    prefixes.push(seg);
    const path = `/${prefixes.join("/")}`;
    crumbs.push({
      path,
      name: BREADCRUMB_LABELS[path] ?? seg.replace(/-/g, " "),
    });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Grafo JSON-LD único (organización + página + migas). */
export function buildPageJsonLdGraph(
  canonicalPath: string,
  title: string,
  description: string
): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [
    {
      ...buildOrganizationJsonLd(),
      "@id": `${SITE_URL}/#organization`,
    },
    buildWebPageJsonLd(canonicalPath, title, description),
  ];

  const breadcrumb = buildBreadcrumbJsonLd(canonicalPath);
  if (breadcrumb) graph.push(breadcrumb);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getSitemapPriority(path: string): number {
  return SITEMAP_PRIORITY[path] ?? 0.75;
}

export function getSitemapChangefreq(path: string): string {
  return SITEMAP_CHANGEFREQ[path] ?? "monthly";
}

export const DEFAULT_OG = {
  image: DEFAULT_OG_IMAGE,
  locale: "es_AR",
  siteName: SITE_NAME,
  type: "website",
} as const;
