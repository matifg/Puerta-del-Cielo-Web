import BethelSection from "../components/BethelSection";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import { BETHEL_ENCOUNTER_SCROLL_ID } from "../data/bethelScenes";

const BETHEL_FAB_SECTIONS: FloatingScrollNavSection[] = [
  { id: "bethel-heading", title: "Bethel" },
  { id: "bethel-historia", title: "Historia" },
  { id: BETHEL_ENCOUNTER_SCROLL_ID, title: "Galería" },
  { id: "bethel-tabs", title: "Mirá más" },
];

const Bethel = () => (
  <EducativaPageShell
    sections={BETHEL_FAB_SECTIONS}
    footerRootId="bethel-footer-root"
    scrollEndId="bethel-scroll-end"
  >
    <BethelSection />
  </EducativaPageShell>
);

export default Bethel;
