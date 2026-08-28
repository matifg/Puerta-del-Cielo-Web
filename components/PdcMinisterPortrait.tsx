import React, { useCallback, useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import {
  ministerOptimizedSrc,
  ministerRawSrc,
  ministerSizes,
  ministerSrcSet,
  type MinisterSlug,
  type PortraitVariant,
} from "../data/ministros";

type PdcMinisterPortraitProps = {
  slug: MinisterSlug;
  displayName: string;
  variant: PortraitVariant;
  objectPosition?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "auto";
  /** Miniatura inline: se muestra borrosa hasta que la foto real decodifica. */
  lqip?: string;
  /** Se dispara cuando la foto real ya está lista para animar. */
  onReady?: () => void;
};

const frameClass: Record<PortraitVariant, string> = {
  team:
    "relative h-32 w-32 overflow-hidden rounded-full border-2 border-secondary/80 shadow-lg shadow-black/25 transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-secondary group-hover:shadow-2xl group-hover:shadow-black/40 md:h-28 md:w-28 lg:h-40 lg:w-40",
  /** Marco 1:1: recorte cuadrado para que el bloque entre sin scroll. */
  lead:
    "relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-white/15 bg-black/20 shadow-[0_24px_70px_-26px_rgba(0,0,0,0.85)] ring-1 ring-white/5 sm:rounded-[1.75rem]",
};

const imgClass: Record<PortraitVariant, string> = {
  team:
    "h-full w-full scale-100 object-cover grayscale transition-[transform,filter] duration-700 ease-out will-change-transform hover:scale-110 group-hover:scale-110 group-hover:grayscale-0",
  lead:
    "h-full w-full scale-100 object-cover transition-[transform,filter] duration-[1.1s] ease-out will-change-transform group-hover:scale-[1.03] group-hover:brightness-[1.04]",
};

const intrinsic: Record<PortraitVariant, { width: number; height: number }> = {
  team: { width: 320, height: 320 },
  lead: { width: 768, height: 768 },
};

function PortraitPlaceholder({
  displayName,
  variant,
}: {
  displayName: string;
  variant: PortraitVariant;
}) {
  const size =
    variant === "lead"
      ? "flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[1.5rem] border border-dashed border-white/25 bg-white/[0.04] px-4 text-center sm:rounded-[1.75rem]"
      : "flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-secondary/50 bg-white/[0.04] px-2 text-center md:h-28 md:w-28 lg:h-40 lg:w-40";
  const icon = variant === "lead" ? "h-14 w-14 md:h-16 md:w-16" : "h-9 w-9";
  return (
    <div className={size} role="img" aria-label={displayName}>
      <User className={`${icon} text-secondary/60`} strokeWidth={1.5} aria-hidden />
      {variant === "lead" ? (
        <span className="font-sans text-[0.65rem] font-medium text-white/50">Foto pendiente</span>
      ) : null}
    </div>
  );
}

export const PdcMinisterPortrait: React.FC<PdcMinisterPortraitProps> = ({
  slug,
  displayName,
  variant,
  objectPosition = "center 22%",
  className = "",
  loading = "lazy",
  fetchPriority,
  lqip,
  onReady,
}) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dim = intrinsic[variant];

  const markLoaded = useCallback(() => {
    setLoaded(true);
    onReady?.();
  }, [onReady]);

  // Imagen desde caché: `load` puede haber ocurrido antes de montar el handler.
  useEffect(() => {
    if (imgRef.current?.complete) markLoaded();
  }, [markLoaded]);

  if (failed) {
    return <PortraitPlaceholder displayName={displayName} variant={variant} />;
  }

  const webpSrc = ministerOptimizedSrc(slug, variant);
  const jpgSrc = ministerRawSrc(slug);

  return (
    <div className={`${frameClass[variant]} ${className}`.trim()}>
      {lqip ? (
        <div
          aria-hidden
          className={`absolute inset-0 scale-[1.08] bg-cover bg-center transition-opacity duration-700 ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${lqip})`, filter: "blur(18px)", backgroundPosition: objectPosition }}
        />
      ) : null}
      <picture className="relative block h-full w-full">
        <source type="image/webp" srcSet={ministerSrcSet(slug, variant)} sizes={ministerSizes(variant)} />
        <img
          ref={imgRef}
          src={webpSrc}
          alt={displayName}
          width={dim.width}
          height={dim.height}
          sizes={ministerSizes(variant)}
          decoding="async"
          loading={loading}
          fetchPriority={fetchPriority}
          className={imgClass[variant]}
          style={{
            objectPosition,
            ...(lqip
              ? {
                  opacity: loaded ? 1 : 0,
                  transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
                }
              : null),
          }}
          onLoad={markLoaded}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.includes(".webp") && !img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = jpgSrc;
              return;
            }
            setFailed(true);
          }}
        />
      </picture>
    </div>
  );
};
