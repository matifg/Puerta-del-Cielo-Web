import { Hero } from "../components/Hero";
import NuestraEsenciaSection from "../components/NuestraEsenciaSection";
import NuestrosServiciosSection from "../components/NuestrosServiciosSection";
import { Footer } from "../components/Footer";
import {
  FloatingScrollButton,
  type FloatingScrollNavSection,
} from "../components/FloatingScrollButton";

const HOME_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  {
    id: "home-section-esencia",
    title: "Nuestra esencia",
    subtitle: "Conocé nuestra visión",
  },
  {
    id: "home-section-servicios",
    title: "Nuestros servicios",
    subtitle: "Horarios y propuestas",
  },
];

const HOME_SCROLL_END_ID = "home-scroll-end";

const Home = () => (
  <>
    <Hero />
    <div id="home-section-esencia" className="scroll-mt-20">
      <NuestraEsenciaSection />
    </div>
    <div id="home-section-servicios" className="scroll-mt-20">
      <NuestrosServiciosSection />
    </div>
    <div
      id={HOME_SCROLL_END_ID}
      aria-hidden
      className="pointer-events-none h-20 w-full shrink-0 sm:h-24"
    />
    <FloatingScrollButton
      sections={HOME_SCROLL_SECTIONS}
      endMarkerId={HOME_SCROLL_END_ID}
      footerProximityRootId="home-footer-observe-root"
    />
    <div id="home-footer-observe-root">
      <Footer />
    </div>
  </>
);

export default Home;
