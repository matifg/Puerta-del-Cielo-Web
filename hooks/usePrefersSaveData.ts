import { useEffect, useState } from "react";

/** Respeta modo ahorro de datos del sistema o del navegador (p. ej. Chrome “Ahorrar datos”). */
export function usePrefersSaveData(): boolean {
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-data: reduce)");

    const readConnection = (): boolean => {
      const conn = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      return Boolean(conn?.saveData);
    };

    const sync = () => setSaveData(mq.matches || readConnection());
    sync();

    mq.addEventListener("change", sync);
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    conn?.addEventListener?.("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      conn?.removeEventListener?.("change", sync);
    };
  }, []);

  return saveData;
}
