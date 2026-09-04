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
    "relative h-28 w-28 overflow-hidden rounded-full border-2 border-secondary/80 bg-white shadow-lg shadow-black/25 transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-secondary group-hover:shadow-2xl group-hover:shadow-black/40 md:h-24 md:w-24 lg:h-32 lg:w-32",
  /** Marco 2:3: sin padding; feather suave hacia el fondo de página. */
  lead:
    "relative flex aspect-[2/3] w-full items-center justify-center overflow-visible bg-transparent [mask-image:radial-gradient(ellipse_92%_88%_at_50%_48%,#000_62%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_92%_88%_at_50%_48%,#000_62%,transparent_100%)]",
};

const imgClass: Record<PortraitVariant, string> = {
  team:
    "h-full w-full object-contain object-center grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0",
  lead:
    "max-h-full max-w-full object-contain object-center drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-[filter] duration-[1.1s] ease-out group-hover:brightness-[1.02]",
};

const intrinsic: Record<PortraitVariant, { width: number; height: number }> = {
  team: { width: 320, height: 320 },
  lead: { width: 768, height: 1152 },
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
      ? "flex aspect-[2/3] w-full flex-col items-center justify-center gap-2 bg-transparent px-4 text-center"
      : "flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-secondary/50 bg-white px-2 text-center md:h-24 md:w-24 lg:h-32 lg:w-32";
  const icon = variant === "lead" ? "h-12 w-12 md:h-14 md:w-14" : "h-8 w-8";
  return (
    <div className={size} role="img" aria-label={displayName}>
      <User className={`${icon} text-secondary/60`} strokeWidth={1.5} aria-hidden />
      {variant === "lead" ? (
        <span className="font-sans text-[0.65rem] font-medium text-secondary/70">Foto pendiente</span>
      ) : null}
    </div>
  );
}

export const PdcMinisterPortrait: React.FC<PdcMinisterPortraitProps> = ({
  slug,
  displayName,
  variant,
  objectPosition = "center center",
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
          className={`absolute inset-0 bg-transparent bg-contain bg-center bg-no-repeat transition-opacity duration-700 ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${lqip})`, filter: "blur(14px)", backgroundPosition: objectPosition }}
        />
      ) : null}
      <picture className="relative flex h-full w-full items-center justify-center">
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
