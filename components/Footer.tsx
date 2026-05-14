import React from "react";

const socialBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/65 transition hover:border-secondary/35 hover:bg-white/[0.08] hover:text-secondary";

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20 pb-12">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-black opacity-95"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-16 grid gap-12 md:grid-cols-4 md:gap-10">
          {/* Marca */}
          <div className="md:col-span-1">
            <h3 className="mb-4 font-serif text-2xl font-semibold tracking-wide text-white md:text-3xl">
              Puerta del Cielo
            </h3>
            <div className="mb-6 h-px w-14 rounded-full bg-gradient-to-r from-secondary/80 to-transparent" />
            <p className="mb-8 text-sm leading-relaxed text-gray-300 md:text-base">
              Una iglesia comprometida con la verdad del Evangelio y el amor al prójimo. Te esperamos con los brazos abiertos.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/puertadelcielobaradero"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.525 2.001H6.475A4.474 4.474 0 002 6.475v11.05A4.474 4.474 0 006.475 22h11.05A4.474 4.474 0 0022 17.525V6.475A4.474 4.474 0 0017.525 2.001zm-2.03 7.5h-1.07c-.84 0-.98.4-.98.96v1.14h2.05l-.27 2.09h-1.78v5.36h-2.13v-5.36h-1.78v-2.09h1.78v-1.54c0-1.76 1.07-2.72 2.63-2.72.75 0 1.39.06 1.58.09v1.8z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/puertadelcielo.ba/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.235-1.3a1.107 1.107 0 100 2.214 1.107 1.107 0 000-2.214z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@puertadelcielo1112"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <h4 className="mb-2 font-serif text-lg font-medium text-white">Ubicación</h4>
            <div className="mb-6 h-px w-10 rounded-full bg-secondary/70" />
            <div className="flex gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm leading-relaxed text-gray-300">
                Manuel Belgrano 2053,
                <br />
                B2942 Baradero,
                <br />
                Provincia de Buenos Aires
              </p>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="mb-2 font-serif text-lg font-medium text-white">Horarios</h4>
            <div className="mb-6 h-px w-10 rounded-full bg-secondary/70" />
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex justify-between gap-4 border-b border-white/[0.06] pb-2.5">
                <span>Domingos</span>
                <span className="shrink-0 font-medium text-white/90">10:00 hs</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-white/[0.06] pb-2.5">
                <span>Viernes</span>
                <span className="shrink-0 font-medium text-white/90">19:30 hs</span>
              </li>
              <li className="flex justify-between gap-4 pb-0.5">
                <span>Martes (Células)</span>
                <span className="shrink-0 font-medium text-white/90">20:00 hs</span>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-2 font-serif text-lg font-medium text-white">Contacto</h4>
            <div className="mb-6 h-px w-10 rounded-full bg-secondary/70" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm text-gray-300">+54 (3329) 000-000</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:contacto@puertadelcielo.ar"
                  className="text-sm text-gray-300 underline decoration-white/20 underline-offset-2 transition hover:text-secondary hover:decoration-secondary/60"
                >
                  contacto@puertadelcielo.ar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            &copy; {new Date().getFullYear()} Puerta del Cielo - Baradero. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
