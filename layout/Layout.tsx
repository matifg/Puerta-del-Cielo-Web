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
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999] w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        💬
      </a>
    </>
  );
};

export default Layout;