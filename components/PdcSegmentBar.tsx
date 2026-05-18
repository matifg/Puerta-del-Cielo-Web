import React from "react";

/** Paleta Puerta del Cielo — barra segmentada editorial */
const SEGMENT_COLORS = [
  "#40c2de",
  "#2563ad",
  "#e8e2d9",
  "#7dd3ea",
  "rgba(255,255,255,0.32)",
] as const;

type PdcSegmentBarProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "h-[2px] w-14",
  md: "h-[3px] w-40 max-w-[min(16rem,85vw)]",
  lg: "h-1 w-48 max-w-[min(18rem,90vw)]",
};

const PdcSegmentBar: React.FC<PdcSegmentBarProps> = ({ size = "md", className = "" }) => (
  <div
    className={`flex overflow-hidden rounded-full ${sizeClass[size]} ${className ?? ""}`}
    aria-hidden
  >
    {SEGMENT_COLORS.map((color, i) => (
      <span key={i} className="min-h-full min-w-0 flex-1" style={{ backgroundColor: color }} />
    ))}
  </div>
);

export default PdcSegmentBar;
