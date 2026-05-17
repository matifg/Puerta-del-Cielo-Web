import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

type NavSubLink = { to: string; label: string };

type NavItem =
  | { to: string; label: string }
  | { label: string; pathPrefix: string; subLinks: NavSubLink[] };

const navLinks: NavItem[] = [
  { to: "/", label: "Inicio" },
  {
    label: "Quiénes somos",
    pathPrefix: "/quienes-somos",
    subLinks: [
      { to: "/quienes-somos/vision", label: "Visión" },
      { to: "/quienes-somos/equipo-ministerial", label: "Equipo ministerial" },
      { to: "/quienes-somos/areas-servicio", label: "Áreas de servicio" },
    ],
  },
  {
    label: "Área educativa",
    pathPrefix: "/area-educativa",
    subLinks: [
      { to: "/area-educativa/discipulado", label: "Discipulado" },
      { to: "/area-educativa/danza-artes", label: "Danza y artes" },
      { to: "/area-educativa/intercesion", label: "Intercesión" },
      { to: "/area-educativa/liderazgo", label: "Liderazgo" },
    ],
  },
  {
    label: "Área de servicio",
    pathPrefix: "/area-servicio",
    subLinks: [{ to: "/area-servicio/comunidad", label: "Servicio a la comunidad" }],
  },
  {
    label: "Conexión",
    pathPrefix: "/conexion",
    subLinks: [{ to: "/conexion/iglesia-en-casa", label: "Iglesia en casa" }],
  },
  { to: "/bethel", label: "Bethel" },
];

const navLinkBase =
  "relative font-sans text-sm font-semibold tracking-[0.035em] transition-colors duration-200 md:text-[0.9375rem] md:tracking-[0.03em]";

const navLinkActive = "text-[#40c2de]";
const navLinkIdle = "text-[#faf8f4]/90 hover:text-[#40c2de]";

const subLinkBase =
  "block rounded-lg px-4 py-2.5 font-sans text-sm font-medium tracking-[0.02em] transition-colors duration-200";

function isGroupActive(pathPrefix: string, pathname: string) {
  return pathname === pathPrefix || pathname.startsWith(`${pathPrefix}/`);
}

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMobile = () => {
    setOpen(false);
    setMobileExpanded(null);
  };

  return (
    <nav
      className="fixed top-0 left-0 isolate z-50 w-full border-b border-black/80 bg-[#030508] text-[#faf8f4] shadow-[0_10px_36px_rgba(0,0,0,0.75)] ring-1 ring-black/40"
      aria-label="Principal"
    >
      <div className="relative mx-auto flex min-h-16 h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[4.5rem] lg:px-8">
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2.5"
          onClick={closeMobile}
        >
          <img
            src="/images/puerta.logo.png"
            alt="Puerta del Cielo"
            className="h-8 w-8 object-contain md:h-9 md:w-9"
          />
          <span className="font-serif text-base font-semibold leading-none tracking-[0.08em] text-[#faf8f4] md:text-lg">
            Puerta del Cielo
          </span>
        </Link>

        <div className="relative z-10 hidden items-center gap-1 md:flex xl:gap-2">
          {navLinks.map((link) =>
            "subLinks" in link ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  type="button"
                  className={`${navLinkBase} px-3 py-2 text-[#faf8f4] ${
                    isGroupActive(link.pathPrefix, pathname) ? navLinkActive : navLinkIdle
                  }`}
                  aria-expanded={dropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-secondary/80 transition-transform duration-300 ${
                      isGroupActive(link.pathPrefix, pathname) ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    dropdown === link.label
                      ? "pointer-events-auto visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="min-w-[13.5rem] rounded-2xl border border-white/15 bg-[#0a0f18] py-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
                    {link.subLinks.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          `${subLinkBase} ${
                            isActive
                              ? "border-l-2 border-secondary bg-white/[0.06] text-secondary"
                              : "border-l-2 border-transparent text-[#faf8f4]/90 hover:bg-white/[0.05] hover:text-[#40c2de]"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${navLinkBase} px-3 py-2 ${isActive ? navLinkActive : navLinkIdle}`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
          <NavLink
            to="/contacto"
            className="pdc-btn-on-dark-ghost ml-1 max-w-none px-5 py-2.5 text-xs sm:text-sm"
          >
            <span className="relative z-[1]">Contacto</span>
          </NavLink>
        </div>

        <button
          type="button"
          className="relative z-20 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-[#faf8f4] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#030508] px-6 pb-10 pt-20 md:hidden">
          <nav className="flex flex-col gap-1 overflow-y-auto">
            {navLinks.map((link) =>
              "subLinks" in link ? (
                <div key={link.label} className="border-b border-white/10 py-2">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between py-2 text-left font-sans text-base font-semibold ${
                      isGroupActive(link.pathPrefix, pathname) ? "text-[#40c2de]" : "text-[#faf8f4]"
                    }`}
                    onClick={() =>
                      setMobileExpanded((v) => (v === link.label ? null : link.label))
                    }
                    aria-expanded={mobileExpanded === link.label}
                  >
                    {link.label}
                    <span className="text-secondary" aria-hidden>
                      {mobileExpanded === link.label ? "−" : "+"}
                    </span>
                  </button>
                  {mobileExpanded === link.label ? (
                    <div className="mt-1 space-y-0.5 pb-2 pl-2">
                      {link.subLinks.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          onClick={closeMobile}
                          className={({ isActive }) =>
                            `${subLinkBase} py-2 ${
                              isActive
                                ? "text-[#40c2de]"
                                : "text-[#faf8f4]/85 hover:text-[#40c2de]"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `border-b border-white/10 py-3 font-sans text-base font-semibold ${
                      isActive ? "text-[#40c2de]" : "text-[#faf8f4] hover:text-[#40c2de]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <NavLink
              to="/contacto"
              onClick={closeMobile}
              className="pdc-btn-on-dark-accent mx-auto mt-6 max-w-xs"
            >
              <span className="relative z-[1]">Contacto</span>
            </NavLink>
          </nav>
        </div>
      ) : null}
    </nav>
  );
};
