/** FAQ Bethel — UI del acordeón y schema.org FAQPage */

export type BethelFaqItem = {
  id: string;
  title: string;
  summary: string;
};

/** Preguntas visibles en la página (sin duplicar el bloque «¿Qué es Bethel?») */
export const BETHEL_ACCORDION: readonly BethelFaqItem[] = [
  {
    id: "profecia",
    title: "Profecía y confirmación",
    summary:
      "El llamado ardió en nuestro interior y fue afirmado mediante una profecía, alineada con la restauración del «tabernáculo de David» en Amós 9:11.",
  },
  {
    id: "vivencia",
    title: "¿Qué vivimos allí?",
    summary:
      "Adoración, intercesión e intimidad profunda: la atmósfera del cielo en la tierra. Un solo anhelo — que sea aquí como es allá.",
  },
] as const;

/** Incluye «¿Qué es Bethel?» para rich results en buscadores */
export const BETHEL_FAQ_SCHEMA: readonly BethelFaqItem[] = [
  {
    id: "que-es",
    title: "¿Qué es Bethel?",
    summary:
      "Nuestra misión es construir una casa para Dios, para que Él habite y se manifieste en nuestra adoración e intercesión. Bethel es el espacio de adoración prolongada en Puerta del Cielo, Baradero: encuentros de doce horas de adoración continua en comunidad.",
  },
  ...BETHEL_ACCORDION,
] as const;
