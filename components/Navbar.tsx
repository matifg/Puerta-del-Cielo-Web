import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Inicio" },
  {
    label: "Quiénes Somos",
    subLinks: [
      { to: "/quienes-somos/vision", label: "Visión" },
      { to: "/quienes-somos/equipo-ministerial", label: "Equipo Ministerial" },
      { to: "/quienes-somos/areas-servicio", label: "Áreas de Servicio" },
    ],
  },
  {
    label: "Área Educativa",
    subLinks: [
      { to: "/area-educativa/discipulado", label: "Discipulado" },
      { to: "/area-educativa/danza-artes", label: "Danza y Artes" },
      { to: "/area-educativa/intercesion", label: "Intercesión" },
      { to: "/area-educativa/liderazgo", label: "Liderazgo" },
    ],
  },
  {
    label: "Área de Servicio",
    subLinks: [
      { to: "/area-servicio/comunidad", label: "Servicio a la Comunidad" },
      { to: "/area-servicio/alimentos", label: "Ayuda Alimentaria" },
    ],
  },
  {
    label: "Conexión",
    subLinks: [
      { to: "/conexion/iglesia-en-casa", label: "Iglesia en casa" },
      { to: "/conexion/se-parte", label: "Sé parte" },
    ],
  },
  { to: "/bethel", label: "Bethel" },
  { to: "/contacto", label: "Contacto" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      {/* 🔥 GRADIENTE SUPERIOR (clave visual) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" style={{ maxHeight: "48px" }} />

      {/* CONTENIDO */}
      <div
        className={`
          relative transition-all duration-500
          ${
            scrolled
              ? "backdrop-blur-xl bg-black/40 border-b border-white/10"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/puerta.logo.png"
              alt="Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-lg md:text-xl font-serif text-white tracking-wide">
              Puerta del Cielo
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-10">

            {navLinks.map((link) =>
              link.subLinks ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className="relative text-sm tracking-wide text-white/70 hover:text-white transition">

                    {link.label}

                    {/* underline animado */}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </button>

                  {/* DROPDOWN */}
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-full pt-4
                      transition-all duration-300
                      ${
                        dropdown === link.label
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    <div className="bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl py-2 min-w-[240px]">

                      {link.subLinks.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `block px-5 py-2 text-sm transition ${
                              isActive
                                ? "text-secondary"
                                : "text-white/70 hover:text-white hover:bg-white/5"
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
                      `text-sm tracking-wide transition ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>

                  {/* underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
                </div>
              )
            )}

          </div>

          {/* MOBILE BTN */}
          <button
            className="md:hidden flex flex-col gap-1.5"
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
        <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-xl flex flex-col pt-24 px-8">

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
                  <div className="text-white/70 text-lg mb-2">
                    {link.label}
                  </div>

                  {link.subLinks.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block py-1 text-sm ${
                          isActive
                            ? "text-secondary"
                            : "text-white/70 hover:text-white"
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
                    `block text-lg ${
                      isActive
                        ? "text-secondary"
                        : "text-white/70 hover:text-white"
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