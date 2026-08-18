import { Hero } from "../components/Hero";
import PlanificaTuVisitaSection from "../components/PlanificaTuVisitaSection";
import NuestrosServiciosSection from "../components/NuestrosServiciosSection";
import ConocenosTeaserSection from "../components/ConocenosTeaserSection";
import { Footer } from "../components/Footer";
import {
  FloatingScrollButton,
  type FloatingScrollNavSection,
} from "../components/FloatingScrollButton";

const HOME_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  { id: "home-hero", title: "Inicio" },
  { id: "home-planifica-visita", title: "Visitá" },
  { id: "home-section-servicios", title: "Servicios" },
  { id: "home-conocenos", title: "Conocenos" },
];

const HOME_SCROLL_END_ID = "home-scroll-end";

const Home = () => (
  <>
    <Hero />
    <PlanificaTuVisitaSection />
    <div id="home-section-servicios" className="scroll-mt-24 sm:scroll-mt-28">
      <NuestrosServiciosSection />
    </div>
    <ConocenosTeaserSection />
    <div
      id={HOME_SCROLL_END_ID}
      aria-hidden
      className="pointer-events-none h-20 w-full shrink-0 sm:h-24"
    />
    <FloatingScrollButton
      sections={HOME_SCROLL_SECTIONS}
      endMarkerId={HOME_SCROLL_END_ID}
      footerProximityRootId="home-footer-observe-root"
      hideOnFirstSectionBelowSm
    />
    <div id="home-footer-observe-root">
      <Footer />
    </div>
  </>
);

export default Home;
