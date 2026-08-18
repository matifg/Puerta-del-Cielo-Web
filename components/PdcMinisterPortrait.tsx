import React, { useState } from "react";
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
};

const frameClass: Record<PortraitVariant, string> = {
  team:
    "relative h-32 w-32 overflow-hidden rounded-full border-2 border-secondary/80 shadow-lg shadow-black/25 transition-[border-color,box-shadow] duration-500 ease-out group-hover:border-secondary group-hover:shadow-2xl group-hover:shadow-black/40 md:h-28 md:w-28 lg:h-40 lg:w-40",
  lead:
    "relative h-72 w-72 overflow-hidden rounded-full border-4 border-white/20 bg-black/10 shadow-2xl md:h-80 md:w-80 lg:h-96 lg:w-96",
};

const imgClass: Record<PortraitVariant, string> = {
  team:
    "h-full w-full scale-100 object-cover grayscale transition-[transform,filter] duration-700 ease-out will-change-transform hover:scale-110 group-hover:scale-110 group-hover:grayscale-0",
  lead:
    "h-full w-full scale-100 object-cover transition-[transform,filter] duration-700 ease-out will-change-transform hover:scale-110 group-hover:scale-110 group-hover:brightness-105",
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
      ? "flex h-72 w-72 flex-col items-center justify-center gap-2 rounded-full border-4 border-dashed border-white/25 bg-white/[0.04] px-4 text-center md:h-80 md:w-80 lg:h-96 lg:w-96"
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
}) => {
  const [failed, setFailed] = useState(false);
  const dim = intrinsic[variant];

  if (failed) {
    return <PortraitPlaceholder displayName={displayName} variant={variant} />;
  }

  const webpSrc = ministerOptimizedSrc(slug, variant);
  const jpgSrc = ministerRawSrc(slug);

  return (
    <div className={`${frameClass[variant]} ${className}`.trim()}>
      <picture className="block h-full w-full">
        <source type="image/webp" srcSet={ministerSrcSet(slug, variant)} sizes={ministerSizes(variant)} />
        <img
          src={webpSrc}
          alt={displayName}
          width={dim.width}
          height={dim.height}
          sizes={ministerSizes(variant)}
          decoding="async"
          loading={loading}
          fetchPriority={fetchPriority}
          className={imgClass[variant]}
          style={{ objectPosition }}
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
