import ServicioComunidadSection from "../components/ServicioComunidadSection";
import { Footer } from "../components/Footer";

/** Página completa: sección + pie institucional. */
const ServicioComunidadPage = () => (
  <>
    <ServicioComunidadSection />
    <div id="svc-footer-root" className="relative bg-[#0e0b08]">
      <Footer />
    </div>
  </>
);

export default ServicioComunidadPage;
