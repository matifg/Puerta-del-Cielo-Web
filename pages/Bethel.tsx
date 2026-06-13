import { useEffect } from "react";
import BethelSection from "../components/BethelSection";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import { BETHEL_ENCOUNTER_SCROLL_ID } from "../data/bethelScenes";

const BETHEL_NOTEBOOK_MQ = "(min-width: 1024px) and (max-width: 1535.98px)";

function useBethelNotebookScrollSnap() {
  useEffect(() => {
    const mq = window.matchMedia(BETHEL_NOTEBOOK_MQ);
    const sync = () => {
      document.documentElement.classList.toggle("bethel-scroll-snap", mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      document.documentElement.classList.remove("bethel-scroll-snap");
    };
  }, []);
}

const BETHEL_FAB_SECTIONS: FloatingScrollNavSection[] = [
  { id: "bethel-heading", title: "Bethel" },
  { id: "bethel-historia", title: "Historia" },
  { id: BETHEL_ENCOUNTER_SCROLL_ID, title: "Galería" },
  { id: "bethel-tabs", title: "Mirá más" },
];

const Bethel = () => {
  useBethelNotebookScrollSnap();

  return (
    <EducativaPageShell
      sections={BETHEL_FAB_SECTIONS}
      footerRootId="bethel-footer-root"
      scrollEndId="bethel-scroll-end"
    >
      <BethelSection />
    </EducativaPageShell>
  );
};

export default Bethel;
