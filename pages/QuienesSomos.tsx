import { Outlet } from "react-router-dom";

/** Sin max-width ni px extra: cada página usa `PdcPageShell` + `pdcPageInnerClass` como el resto del sitio. */
const QuienesSomos = () => (
  <div className="w-full min-w-0">
    <Outlet />
  </div>
);

export default QuienesSomos;
