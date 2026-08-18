import FormacionLideresSection from "../components/FormacionLideresSection";
import { EducativaPageShell } from "../components/educativa/EducativaPageShell";
import type { FloatingScrollNavSection } from "../components/FloatingScrollButton";

const FORMATION_SCROLL_SECTIONS: FloatingScrollNavSection[] = [
  { id: "formacion-lideres-inicio", title: "Formación" },
  { id: "formacion-lideres-contenido", title: "Visión" },
  { id: "formacion-lideres-galeria", title: "Galería" },
  { id: "formacion-lideres-cta", title: "Contacto" },
];

const FormacionLideresPage = () => (
  <EducativaPageShell
    sections={FORMATION_SCROLL_SECTIONS}
    footerRootId="formacion-lideres-footer-root"
    scrollEndId="formacion-lideres-scroll-end"
  >
    <FormacionLideresSection />
  </EducativaPageShell>
);

export default FormacionLideresPage;
