import IntercesionSection from "../components/IntercesionSection";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";

const INTERCESION_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  { id: "intercesion-heading", title: "EIGE" },
  { id: "intercesion-galeria", title: "Galería" },
  { id: "intercesion-contenido", title: "Programa" },
  { id: "intercesion-cta", title: "Contacto" },
];

const IntercesionPage = () => (
  <EducativaPageShell
    sections={INTERCESION_SCROLL_SECTIONS}
    footerRootId="intercesion-footer-root"
    scrollEndId="intercesion-scroll-end"
  >
    <IntercesionSection />
  </EducativaPageShell>
);

export default IntercesionPage;
