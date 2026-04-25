import { useState } from "react";
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur shadow-md">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/puerta.logo.png"
            alt="Logo"
            className="w-9 h-9 object-contain rounded-md bg-white/10 p-1"
          />
          <span className="text-xl md:text-2xl font-serif text-white tracking-wider">
            Puerta del Cielo
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) =>
            link.subLinks ? (
              
              <div key={link.label} className="relative group py-3">

                <button className="text-sm text-white/80 hover:text-secondary transition">
                  {link.label}
                </button>

                {/* Dropdown FIX */}
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  
                  <div className="bg-black rounded-xl shadow-xl py-2 min-w-[220px] border border-white/10">
                    
                    {link.subLinks.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition
                          ${
                            isActive
                              ? "text-secondary"
                              : "text-white/80 hover:text-secondary hover:bg-white/5"
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
                  `text-sm transition
                  ${
                    isActive
                      ? "text-secondary"
                      : "text-white/80 hover:text-secondary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-[2px] bg-white" />
          <span className="w-6 h-[2px] bg-white" />
          <span className="w-6 h-[2px] bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black px-6 py-6">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.label} className="mb-4">
                <div className="text-white font-semibold mb-2">
                  {link.label}
                </div>

                <div className="pl-2">
                  {link.subLinks.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setOpen(false)}
                      className="block text-white/80 py-1 hover:text-secondary"
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block text-white/80 py-2 hover:text-secondary"
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;