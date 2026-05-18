import React from "react";
import type { EditorialPhoto } from "../data/sitePhotos";
import { editorialSizes, editorialSrc, editorialSrcSet } from "../data/sitePhotos";

type PdcEditorialPhotoProps = {
  photo: EditorialPhoto;
  className?: string;
  priority?: boolean;
  /** Ocultar velo inferior (p. ej. cuando hay caption aparte) */
  hideOverlay?: boolean;
};

const aspectByLayout: Record<EditorialPhoto["layout"], string> = {
  landscape: "aspect-[21/9] sm:aspect-[2.4/1]",
  portrait: "aspect-[3/4] max-h-[min(72vh,520px)] sm:max-h-none",
};

export const PdcEditorialPhoto: React.FC<PdcEditorialPhotoProps> = ({
  photo,
  className = "",
  priority = false,
  hideOverlay = false,
}) => {
  const widths = photo.layout === "portrait" ? [960, 720, 480] : [1440, 1080, 720];
  const fallbackW = widths[0];

  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0a1018]/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)] ${className}`}
    >
      <div className={`relative w-full ${aspectByLayout[photo.layout]}`}>
        <img
          src={editorialSrc(photo.slug, fallbackW)}
          srcSet={editorialSrcSet(photo.slug, photo.layout)}
          sizes={editorialSizes(photo.layout)}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        />
        {!hideOverlay ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/50 via-transparent to-[#030508]/15"
            aria-hidden
          />
        ) : null}
      </div>
      {photo.caption ? (
        <figcaption className="border-t border-white/[0.08] bg-[#0a1018]/90 px-4 py-3 text-center font-sans text-sm font-medium leading-relaxed text-zinc-300 md:px-5 md:py-3.5">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
