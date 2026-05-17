import React from "react";
import IglesiaEnCasaSection from "../components/IglesiaEnCasaSection";
import { Footer } from "../components/Footer";
import {
  FloatingScrollButton,
  type FloatingScrollNavSection,
} from "../components/FloatingScrollButton";

const IEC_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  {
    id: "iec-hero",
    title: "Iglesia en casa",
    subtitle: "Conexión en comunidad",
  },
  {
    id: "iec-propuesta",
    title: "La propuesta",
    subtitle: "Familia de fe",
  },
  {
    id: "iec-encuentros",
    title: "Cada encuentro",
    subtitle: "Qué vivimos juntos",
  },
  {
    id: "iec-sumate",
    title: "Sumate",
    subtitle: "Formulario y contacto",
  },
];

const IEC_SCROLL_END_ID = "iec-scroll-end";

const ConexionPage: React.FC = () => (
  <>
    <IglesiaEnCasaSection />
    <div
      id={IEC_SCROLL_END_ID}
      aria-hidden
      className="pointer-events-none h-20 w-full shrink-0 sm:h-24"
    />
    <FloatingScrollButton
      sections={IEC_SCROLL_SECTIONS}
      endMarkerId={IEC_SCROLL_END_ID}
      footerProximityRootId="iec-footer-root"
    />
    <div id="iec-footer-root" className="relative bg-[#030508]">
      <Footer />
    </div>
  </>
);

export default ConexionPage;
