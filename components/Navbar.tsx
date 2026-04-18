import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

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
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <nav className="w-full h-20 bg-white/80 backdrop-blur shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/puerta.logo.png"
            alt="Logo Puerta del Cielo"
            className="w-8 h-8 object-contain rounded-md"
            style={{ minWidth: 32, minHeight: 32 }}
            loading="eager"
            draggable={false}
          />
          <span className="text-2xl font-bold tracking-wide text-amber-700 font-serif select-none">
            Puerta del Cielo
          </span>
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.label} className="relative group">
                <button className="text-lg font-medium transition-colors duration-200 hover:text-amber-700 text-slate-700">
                  {link.label}
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-0 bg-white rounded-xl shadow-lg py-2 min-w-[200px] z-50 hidden group-hover:block">
                  {link.subLinks.map((sublink) => (
                    <NavLink
                      key={sublink.to}
                      to={sublink.to}
                      className={({ isActive }) =>
                        `block px-5 py-2 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition ${
                          isActive ? "text-amber-700 font-semibold" : ""
                        }`
                      }
                    >
                      {sublink.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to!}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-200 hover:text-amber-700 ${
                    isActive ? "text-amber-700 underline underline-offset-4" : "text-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className="w-7 h-1 bg-amber-700 rounded transition-all" />
          <span className="w-7 h-1 bg-amber-700 rounded transition-all" />
          <span className="w-7 h-1 bg-amber-700 rounded transition-all" />
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 animate-fade-in">
          {navLinks.map((link) =>
            link.subLinks ? (
              <div key={link.label} className="mb-2">
                <div className="font-semibold text-slate-700">{link.label}</div>
                <div className="pl-4">
                  {link.subLinks.map((sublink) => (
                    <NavLink
                      key={sublink.to}
                      to={sublink.to}
                      className={({ isActive }) =>
                        `block py-2 text-base transition-colors duration-200 hover:text-amber-700 ${
                          isActive ? "text-amber-700 font-semibold" : "text-slate-700"
                        }`
                      }
                      onClick={() => setOpen(false)}
                    >
                      {sublink.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to!}
                className={({ isActive }) =>
                  `block py-2 text-lg font-medium transition-colors duration-200 hover:text-amber-700 ${
                    isActive ? "text-amber-700 underline underline-offset-4" : "text-slate-700"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>
      )}
      {/* Animación fade-in */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fadeIn 0.2s;
        }
      `}</style>
      <main>
      </main>
    </nav>
  );
};

export default function Home() {
  return (
    <section className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Bienvenido a Puerta del Cielo
      </h1>
      <p className="text-lg text-slate-700 mb-4">
        Somos una comunidad dedicada a crecer en fe y en el conocimiento de
        Jesucristo. Nuestra misión es llevar el amor de Dios a cada rincón de
        nuestra ciudad y más allá.
      </p>
      <p className="text-lg text-slate-700 mb-4">
        Únete a nosotros en nuestros servicios, estudios bíblicos y eventos
        especiales. ¡Hay un lugar para ti en nuestra familia!
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/contacto"
          className="px-6 py-3 bg-amber-700 text-white rounded-lg shadow-md hover:bg-amber-600 transition"
        >
          Contáctanos
        </Link>
        <Link
          to="/quienes-somos"
          className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg shadow-md hover:bg-slate-200 transition"
        >
          Aprende más sobre nosotros
        </Link>
      </div>
    </section>
  );
}