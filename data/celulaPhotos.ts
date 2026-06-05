export type CelulaPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
};

const celulaFile = (name: string) => `/images/celula/${name}`;

/** Huecos visibles en el muro; el resto del pool rota de a uno */
export const CELULA_GALLERY_VISIBLE_COUNT = 6;
export const CELULA_GALLERY_ROTATE_MS = 3000;

/** Pool «Así nos reunimos» — public/images/celula/ */
export const CELULA_PHOTOS: CelulaPhoto[] = [
  {
    id: "celula-1",
    src: celulaFile("celula1.jpeg"),
    alt: "Grupo de Iglesia en casa reunido en un hogar, compartiendo un encuentro cercano",
    caption: "En la mesa",
  },
  {
    id: "celula-2",
    src: celulaFile("celula2.jpeg"),
    alt: "Personas conversando y riendo durante un encuentro de célula en casa",
    caption: "Comunidad",
  },
  {
    id: "celula-3",
    src: celulaFile("celula3.jpeg"),
    alt: "Momento de oración o reflexión en un grupo pequeño de Iglesia en casa",
    caption: "Oración",
  },
  {
    id: "celula-4",
    src: celulaFile("celula4.jpeg"),
    alt: "Encuentro informal en un living con refrigerio y conversación",
    caption: "Encuentro",
  },
  {
    id: "celula-5",
    src: celulaFile("celula5.jpeg"),
    alt: "Participantes compartiendo la Palabra en un hogar",
    caption: "Palabra",
  },
  {
    id: "celula-6",
    src: celulaFile("celula6.jpeg"),
    alt: "Grupo celebrando y disfrutando tiempo juntos en Iglesia en casa",
    caption: "Celebración",
  },
  {
    id: "celula-8",
    src: celulaFile("celula8.jpeg"),
    alt: "Cierre de encuentro con abrazos y despedida en comunidad",
    caption: "Cuidado",
  },
  {
    id: "celula-9",
    src: celulaFile("celula9.jpeg"),
    alt: "Familias y amigos conectando en un espacio hogareño de fe",
    caption: "Familia",
  },
  {
    id: "celula-10",
    src: celulaFile("celula10.jpeg"),
    alt: "Momento de compartir y escuchar en un grupo de Iglesia en casa",
    caption: "Escucha",
  },
];
