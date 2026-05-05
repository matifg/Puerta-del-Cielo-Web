import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "INICIO" },
  {
    label: "QUIÉNES SOMOS",
    subLinks: [
      { to: "/quienes-somos/vision", label: "VISIÓN" },
      { to: "/quienes-somos/equipo-ministerial", label: "EQUIPO MINISTERIAL" },
      { to: "/quienes-somos/areas-servicio", label: "ÁREAS DE SERVICIO" },
    ],
  },
  {
    label: "ÁREA EDUCATIVA",
    subLinks: [
      { to: "/area-educativa/discipulado", label: "DISCIPULADO" },
      { to: "/area-educativa/danza-artes", label: "DANZA Y ARTES" },
      { to: "/area-educativa/intercesion", label: "INTERCESIÓN" },
      { to: "/area-educativa/liderazgo", label: "LIDERAZGO" },
    ],
  },
  {
    label: "ÁREA DE SERVICIO",
    subLinks: [
      { to: "/area-servicio/comunidad", label: "SERVICIO A LA COMUNIDAD" },
      { to: "/area-servicio/alimentos", label: "AYUDA ALIMENTARIA" },
    ],
  },
  {
    label: "CONEXIÓN",
    subLinks: [
      { to: "/conexion/iglesia-en-casa", label: "IGLESIA EN CASA" },
    ],
  },
  { to: "/bethel", label: "BETHEL" },
  { to: "/contacto", label: "CONTACTO" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Fondo negro semi-transparente con blur y borde inferior sutil */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md border-b border-white/10 pointer-events-none"
        style={{ minHeight: "64px", maxHeight: "88px" }}
      />

      {/* CONTENIDO */}
      <div className="relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 z-10">
            <img
              src="/images/puerta.logo.png"
              alt="Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm md:text-base font-serif font-bold text-white tracking-wider uppercase leading-none">
              PUERTA DEL CIELO
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8 z-10">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className="relative text-sm font-semibold tracking-wide text-white hover:text-primary uppercase transition-all duration-300">
                    {link.label}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary/80 transition-all duration-300 group-hover:w-full" />
                  </button>
                  {/* DROPDOWN */}
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-full pt-4
                      transition-all duration-300
                      ${dropdown === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto visible"
                        : "opacity-0 -translate-y-2 pointer-events-none invisible"
                      }
                    `}
                  >
                    <div className="bg-neutral-900 shadow-lg rounded-2xl border border-neutral-800 py-2 min-w-[220px]">
                      {link.subLinks.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `block px-5 py-2 text-xs uppercase transition-all duration-300 rounded
                            ${
                              isActive
                                ? "text-primary bg-neutral-800"
                                : "text-white hover:text-primary hover:bg-neutral-800/80"
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
                <div key={link.to} className="group relative">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `uppercase font-sans tracking-wide px-3 py-2 transition-all duration-300 rounded text-sm font-semibold
                      ${
                        isActive
                          ? "text-white"
                          : "text-white hover:text-primary hover:bg-neutral-800/80"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary/80 transition-all duration-300 group-hover:w-full" />
                </div>
              )
            )}
          </div>

          {/* MOBILE BTN */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-20"
            onClick={() => setOpen(!open)}
          >
            <span className="w-6 h-[2px] bg-white" />
            <span className="w-6 h-[2px] bg-white" />
            <span className="w-6 h-[2px] bg-white" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col pt-24 px-8 z-40">
          <button
            className="absolute top-6 right-8 text-white text-3xl"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label}>
                  <div className="text-white text-lg mb-2 uppercase font-semibold">
                    {link.label}
                  </div>
                  {link.subLinks.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block py-1 text-sm uppercase rounded transition-all duration-300
                        ${
                          isActive
                            ? "text-primary bg-neutral-900"
                            : "text-white hover:text-primary hover:bg-neutral-800"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg uppercase rounded transition-all duration-300
                    ${
                      isActive
                        ? "text-primary bg-neutral-900"
                        : "text-white hover:text-primary hover:bg-neutral-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};