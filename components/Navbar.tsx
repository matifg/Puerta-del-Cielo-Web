import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useScrollPast } from "../hooks/useScrollPast";

type NavSubLink = { to: string; label: string; navHidden?: boolean };

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
      { to: "/area-educativa/liderazgo", label: "Liderazgo", navHidden: true },
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

/** Menú editorial: misma familia en nav y submenús; principal extrabold, hijos bold un escalón abajo. */
const navTypeClass = "font-sans uppercase leading-none";

const navLinkBase = `relative ${navTypeClass} text-[0.6875rem] font-extrabold tracking-[0.1em] transition-colors duration-300 md:text-[0.75rem] md:tracking-[0.11em] lg:text-[0.8125rem] lg:tracking-[0.12em]`;

const navLinkActive = "text-[#faf8f4]";
const navLinkIdle = "text-[#faf8f4]/95 hover:text-[#faf8f4]";

const subLinkBase = `block rounded-lg px-3.5 py-2 ${navTypeClass} text-[0.6875rem] font-bold tracking-[0.1em] transition-colors duration-200 md:text-[0.75rem] md:tracking-[0.11em]`;

const mobileSubLinkBase = `block py-2 pl-3 ${navTypeClass} text-[0.6875rem] font-bold tracking-[0.1em] transition-colors duration-200`;

const brandTitleClass = `${navTypeClass} text-[0.6875rem] font-extrabold tracking-[0.12em] text-[#faf8f4] md:text-[0.75rem] md:tracking-[0.14em]`;

function isGroupActive(pathPrefix: string, pathname: string) {
  return pathname === pathPrefix || pathname.startsWith(`${pathPrefix}/`);
}

export const Navbar = () => {
  const { pathname } = useLocation();
  const scrollPast = useScrollPast(56);
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const elevated = !isHome || scrollPast || open;

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
      className={`fixed top-0 left-0 isolate z-50 w-full pt-[env(safe-area-inset-top,0px)] text-[#faf8f4] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out ${
        elevated
          ? "border-b border-white/[0.08] bg-[#030508]/92 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.65)] backdrop-blur-md"
          : "border-b border-white/[0.12] bg-transparent shadow-none backdrop-blur-[10px]"
      }`}
      aria-label="Principal"
      data-elevated={elevated ? "true" : "false"}
    >
      <div className="relative mx-auto flex min-h-[3.75rem] h-[3.75rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:h-16 lg:px-8">
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
          <span
            className={`${brandTitleClass} ${isHome && !elevated ? "max-sm:hidden" : ""}`}
          >
            Puerta del Cielo
          </span>
        </Link>

        <div className="relative z-10 hidden items-center gap-0.5 md:flex lg:gap-1">
          {navLinks.map((link) =>
            "subLinks" in link ? (
              <div
                key={link.label}
                className="group relative"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  type="button"
                  className={`${navLinkBase} px-2.5 py-2 lg:px-3 ${
                    isGroupActive(link.pathPrefix, pathname)
                      ? `${navLinkActive} text-[#40c2de]`
                      : navLinkIdle
                  }`}
                  aria-expanded={dropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-[2px] origin-left bg-[#40c2de] transition-transform duration-300 lg:left-3.5 lg:right-3.5 ${
                      isGroupActive(link.pathPrefix, pathname)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
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
                  <div className="min-w-[12.5rem] rounded-xl border border-white/12 bg-[#0a0f18]/95 py-1 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md">
                    {link.subLinks
                      .filter((sub) => !sub.navHidden)
                      .map((sub) => (
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
                  `${navLinkBase} group px-2.5 py-2 lg:px-3 ${
                    isActive ? `${navLinkActive} text-[#40c2de]` : navLinkIdle
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-3 right-3 h-[2px] origin-left bg-[#40c2de] transition-transform duration-300 lg:left-3.5 lg:right-3.5 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden
                    />
                  </>
                )}
              </NavLink>
            )
          )}
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `${navLinkBase} ml-1 border-2 border-white/25 px-3 py-2 lg:ml-1.5 ${
                isActive
                  ? "border-[#40c2de]/60 text-[#40c2de]"
                  : "hover:border-white/45"
              }`
            }
          >
            Contacto
          </NavLink>
        </div>

        <button
          type="button"
          className={`relative z-20 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border text-[#faf8f4] transition-colors duration-300 md:hidden ${
            elevated
              ? "border-white/10 bg-white/[0.04]"
              : "border-white/20 bg-white/[0.06] backdrop-blur-sm"
          }`}
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
        <div className="fixed inset-0 z-40 flex flex-col bg-[#030508]/98 px-6 pb-10 pt-20 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-1 overflow-y-auto">
            {navLinks.map((link) =>
              "subLinks" in link ? (
                <div key={link.label} className="border-b border-white/10 py-2">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between py-3 text-left ${navLinkBase} ${
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
                      {link.subLinks
                        .filter((sub) => !sub.navHidden)
                        .map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          onClick={closeMobile}
                          className={({ isActive }) =>
                            `${mobileSubLinkBase} ${
                              isActive
                                ? "text-[#40c2de]"
                                : "text-[#faf8f4]/80 hover:text-[#40c2de]"
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
                    `border-b border-white/10 py-3.5 ${navLinkBase} ${
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
              className={`mx-auto mt-6 max-w-xs border-2 border-white/25 px-5 py-3 text-center ${navLinkBase} transition hover:border-[#40c2de]/50 hover:text-[#40c2de]`}
            >
              Contacto
            </NavLink>
          </nav>
        </div>
      ) : null}
    </nav>
  );
};
