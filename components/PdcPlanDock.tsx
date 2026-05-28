import { motion } from "framer-motion";
import { Download, FileText, MessageCircle } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PdcPlanDockProps = {
  pdfHref: string;
  waHref: string;
  ariaLabel?: string;
  pdfOpenLabel?: string;
  pdfDownloadLabel?: string;
  waLabel?: string;
  className?: string;
};

/** Dock fijo Abrir / Descargar PDF + WhatsApp — páginas educativas */
export function PdcPlanDock({
  pdfHref,
  waHref,
  ariaLabel = "Acciones: plan académico y consulta",
  pdfOpenLabel = "Abrir plan académico en PDF",
  pdfDownloadLabel = "Descargar plan académico PDF",
  waLabel = "Consultar por WhatsApp",
  className = "z-[10010]",
}: PdcPlanDockProps) {
  return (
    <motion.div
      className={`pointer-events-none fixed left-3 w-fit max-w-[min(100%,10.5rem)] sm:left-4 md:max-w-none ${className}`}
      style={{
        bottom: "max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)))",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35, ease }}
      aria-label={ariaLabel}
    >
      <div className="pdc-dock pointer-events-auto">
        <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="pdc-dock-btn" aria-label={pdfOpenLabel}>
          <FileText className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
          <span className="pdc-dock-btn-label">Abrir</span>
        </a>
        <span className="w-px shrink-0 self-stretch bg-white/15" aria-hidden />
        <a href={pdfHref} download className="pdc-dock-btn" aria-label={pdfDownloadLabel}>
          <Download className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
          <span className="pdc-dock-btn-label">Descargar</span>
        </a>
        <span className="w-px shrink-0 self-stretch bg-white/15" aria-hidden />
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pdc-dock-btn text-secondary hover:bg-secondary/15"
          aria-label={waLabel}
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="pdc-dock-btn-label">Consultar</span>
        </a>
      </div>
    </motion.div>
  );
}
