import { NavLink, Outlet } from "react-router-dom";

const subLinks = [
  { to: "vision", label: "Visión" },
  { to: "equipo-ministerial", label: "Equipo Ministerial" },
  { to: "areas-servicio", label: "Áreas de Servicio" },
];

const QuienesSomos = () => (
  <div className="max-w-6xl mx-auto py-16 px-6">
    <h1 className="text-4xl font-bold text-amber-700 mb-8 font-serif"></h1>
    <nav className="flex gap-6 mb-8 border-b pb-2">
      {subLinks.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `text-lg font-medium pb-1 border-b-2 transition-colors duration-200 ${
              isActive ? "border-amber-700 text-amber-700" : "border-transparent text-slate-700 hover:text-amber-700"
            }`
          }
          end
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
    <Outlet />
  </div>
);

export default QuienesSomos;