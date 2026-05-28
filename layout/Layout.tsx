import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { whatsappBaseUrl } from "../data/contacto";
import { ScrollToTop } from "../components/ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main className="pt-20">
        <Outlet />
      </main>

      {/* BOTÓN WHATSAPP */}
      <a
        href={whatsappBaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 md:bottom-6 md:right-6"
      >
        💬
      </a>
    </>
  );
};

export default Layout;