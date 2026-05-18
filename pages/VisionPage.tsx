import VisionSection from "../sections/VisionSection";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";

const VISION_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  { id: "vision-heading", title: "Visión" },
  { id: "vision-vision", title: "Soñamos" },
  { id: "vision-galeria", title: "Galería" },
  { id: "vision-proposito", title: "Propósito" },
  { id: "vision-cta", title: "Sumate" },
];

const VisionPage = () => (
  <EducativaPageShell
    sections={VISION_SCROLL_SECTIONS}
    footerRootId="vision-footer-root"
    scrollEndId="vision-scroll-end"
  >
    <VisionSection />
  </EducativaPageShell>
);

export default VisionPage;
