import type { ReactNode } from "react";
import { pdcHeaderScrollMargin, pdcPageSectionClass } from "./PdcSectionHeader";

/** Mismo par de radiales que Equipo ministerial (fuente única para páginas oscuras). */
const RADIAL_PRIMARY =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(64,194,222,0.1),transparent_55%)]";
const RADIAL_SECONDARY =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_100%,rgba(37,99,173,0.12),transparent_55%)]";

export type PdcPageShellProps = {
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  children: ReactNode;
  /** `true`: radiales gemelos (patrón Equipo). `false`: solo `section` + hijos (Bethel, servicios home, etc.). */
  gradients?: boolean;
};

export function PdcPageShell({
  id,
  "aria-labelledby": ariaLabelledby,
  className = "",
  children,
  gradients = true,
}: PdcPageShellProps) {
  return (
    <section
      id={id}
      className={`${pdcPageSectionClass} ${pdcHeaderScrollMargin} ${className}`.trim()}
      aria-labelledby={ariaLabelledby}
    >
      {gradients ? (
        <>
          <div className={RADIAL_PRIMARY} aria-hidden />
          <div className={RADIAL_SECONDARY} aria-hidden />
        </>
      ) : null}
      {children}
    </section>
  );
}
