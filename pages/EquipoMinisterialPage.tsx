import EquipoMinisterialSection, { EQUIPO_FOOTER_ROOT_ID } from "../components/EquipoMinisterialSection";
import { Footer } from "../components/Footer";
import { PdcScrollFabButton } from "../components/PdcScrollFabButton";
import { useEquipoPageFab } from "../hooks/useEquipoPageFab";

const EquipoMinisterialPage = () => {
  const { fabIsLast, fabEyebrow, fabPrimaryLine, fabSrLabel, onFabClick, fabInsetClass, titleKey } =
    useEquipoPageFab(EQUIPO_FOOTER_ROOT_ID);

  return (
    <>
      <EquipoMinisterialSection />
      <div
        className={`pointer-events-none fixed z-[10020] flex flex-col items-end max-lg:pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] ${fabInsetClass}`}
        aria-live="polite"
      >
        <PdcScrollFabButton
          onClick={onFabClick}
          eyebrow={fabEyebrow}
          primaryLine={fabPrimaryLine}
          pinToTop={fabIsLast}
          ariaLabel={fabSrLabel}
          titleKey={titleKey}
          className="pointer-events-auto shadow-[0_8px_40px_rgba(0,0,0,0.65)]"
        />
      </div>
      <div id={EQUIPO_FOOTER_ROOT_ID} className="relative bg-[#030508]">
        <Footer />
      </div>
    </>
  );
};

export default EquipoMinisterialPage;
