import ServicioComunidadSection from "../components/ServicioComunidadSection";
import { Footer } from "../components/Footer";

/** Página completa: scrollytelling + pie institucional. */
const ServicioComunidadPage = () => (
  <>
    <ServicioComunidadSection />
    <div id="svc-footer-root" className="relative bg-black">
      <Footer />
    </div>
  </>
);

export default ServicioComunidadPage;
