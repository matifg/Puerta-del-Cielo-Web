import React from "react";
import { Footer } from "../Footer";
import {
  FloatingScrollButton,
  type FloatingScrollNavSection,
} from "../FloatingScrollButton";

type EducativaPageShellProps = {
  children: React.ReactNode;
  sections: FloatingScrollNavSection[];
  footerRootId: string;
  scrollEndId: string;
};

/** Footer + FAB de exploración para páginas de escuela / Bethel */
export function EducativaPageShell({
  children,
  sections,
  footerRootId,
  scrollEndId,
}: EducativaPageShellProps) {
  return (
    <>
      {children}
      <div
        id={scrollEndId}
        aria-hidden
        className="pointer-events-none h-20 w-full shrink-0 sm:h-24"
      />
      <FloatingScrollButton
        sections={sections}
        endMarkerId={scrollEndId}
        footerProximityRootId={footerRootId}
        offsetClassName="bottom-24 right-4 sm:bottom-28 sm:right-6 lg:right-[max(1.5rem,env(safe-area-inset-right,0px))]"
      />
      <div id={footerRootId} className="relative bg-[#030508]">
        <Footer />
      </div>
    </>
  );
}
