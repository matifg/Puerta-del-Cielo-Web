/**
 * Datos de contacto públicos — única fuente para Footer, Contacto y enlaces WhatsApp.
 */
export const telefonoDisplay = "+54 (3329) 000-000";

/** Formato internacional sin + ni espacios (wa.me / tel) */
export const telefonoE164 = "5493329000000";

/** true mientras el número sea placeholder — no incluir en JSON-LD. */
export const telefonoEsPlaceholder =
  telefonoDisplay.includes("000-000") || telefonoE164.endsWith("0000000");

/** Teléfono E.164 para schema.org (`+5493329…`) o undefined si aún no hay número real. */
export function getSchemaTelephone(): string | undefined {
  if (telefonoEsPlaceholder) return undefined;
  return `+${telefonoE164}`;
}

export const email = "contacto@puertadelcielo.ar";

export const direccion = {
  lineas: ["Manuel Belgrano 2053", "B2942 Baradero", "Provincia de Buenos Aires"],
  mapsQuery: "Manuel+Belgrano+2053+Baradero",
} as const;

export const whatsappBaseUrl = `https://wa.me/${telefonoE164}`;

export const telHref = `tel:+${telefonoE164}`;

export function whatsappUrl(text?: string): string {
  if (!text) return whatsappBaseUrl;
  return `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}
