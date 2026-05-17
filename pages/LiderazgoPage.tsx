import LiderazgoSection from "../components/LiderazgoSection";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";

const LIDERAZGO_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  { id: "liderazgo-inicio", title: "Liderazgo" },
  { id: "liderazgo-contenido", title: "Programa" },
];

const LiderazgoPage = () => (
  <EducativaPageShell
    sections={LIDERAZGO_SCROLL_SECTIONS}
    footerRootId="liderazgo-footer-root"
    scrollEndId="liderazgo-scroll-end"
  >
    <LiderazgoSection />
  </EducativaPageShell>
);

export default LiderazgoPage;
