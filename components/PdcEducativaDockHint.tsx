type PdcEducativaDockHintProps = {
  id?: string;
  title?: string;
  className?: string;
};

/** Cierre de programa sin duplicar el dock PDF / WhatsApp */
export function PdcEducativaDockHint({
  id,
  title = "¿Querés sumarte?",
  className = "",
}: PdcEducativaDockHintProps) {
  return (
    <div id={id} className={`mx-auto max-w-lg scroll-mt-28 text-center ${className}`.trim()}>
      <h3 className="font-serif text-xl font-medium text-[#faf8f4] md:text-2xl">{title}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-white/70 md:text-base">
        El plan completo está en PDF. Usá los accesos fijos{" "}
        <span className="text-white/85">abajo a la izquierda</span> para abrir, descargar o consultar por
        WhatsApp.
      </p>
    </div>
  );
}
