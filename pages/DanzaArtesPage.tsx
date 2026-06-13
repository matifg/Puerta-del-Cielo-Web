import DanzaArtesSection from "../components/DanzaArtesSection";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";

const DANZA_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  { id: "danza-artes-heading", title: "Danza y Artes Dinámicas" },
  { id: "danza-galeria", title: "Galería" },
  { id: "danza-contenido", title: "Programa" },
];

const DanzaArtesPage = () => (
  <EducativaPageShell
    sections={DANZA_SCROLL_SECTIONS}
    footerRootId="danza-footer-root"
    scrollEndId="danza-scroll-end"
  >
    <DanzaArtesSection />
  </EducativaPageShell>
);

export default DanzaArtesPage;
