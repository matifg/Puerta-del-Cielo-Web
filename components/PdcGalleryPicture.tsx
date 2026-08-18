import React from "react";
import { galleryGridSizes, galleryLightboxSizes, galleryWebpSrcSet } from "../data/galleryWebp";

type PdcGalleryPictureProps = {
  folder: string;
  slug: string;
  fallbackSrc: string;
  alt?: string;
  ariaHidden?: boolean;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
  sizes?: string;
};

/** Imagen de galería con WebP responsivo y fallback JPG/PNG original. */
export const PdcGalleryPicture: React.FC<PdcGalleryPictureProps> = ({
  folder,
  slug,
  fallbackSrc,
  alt = "",
  ariaHidden = false,
  className = "",
  style,
  loading = "lazy",
  sizes,
}) => (
  <picture className="block h-full w-full">
    <source
      type="image/webp"
      srcSet={galleryWebpSrcSet(folder, slug)}
      sizes={sizes ?? galleryGridSizes()}
    />
    <img
      src={fallbackSrc}
      alt={ariaHidden ? "" : alt}
      aria-hidden={ariaHidden || undefined}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
    />
  </picture>
);

type PdcGalleryLightboxPictureProps = {
  folder: string;
  slug: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
};

export const PdcGalleryLightboxPicture: React.FC<PdcGalleryLightboxPictureProps> = ({
  folder,
  slug,
  fallbackSrc,
  alt,
  className,
  style,
  onClick,
}) => (
  <picture onClick={onClick} className="block">
    <source
      type="image/webp"
      srcSet={galleryWebpSrcSet(folder, slug)}
      sizes={galleryLightboxSizes()}
    />
    <img
      src={fallbackSrc}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
    />
  </picture>
);
