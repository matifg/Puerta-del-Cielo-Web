import React from "react";

const whatsappNumber = "549123456789"; // Reemplaza por tu número real
const whatsappLink = `https://wa.me/${whatsappNumber}`;
const email = "info@puertadelcielo.com"; // Reemplaza por tu email real

const ContactoSection: React.FC = () => (
  <section className="max-w-xl mx-auto py-20 px-6 flex flex-col items-center text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-serif">
      Contacto
    </h1>
    <p className="text-lg text-slate-700 mb-10">
      Estamos para ayudarte. Podés comunicarte con nosotros o seguirnos en nuestras redes.
    </p>
    <div className="flex flex-col gap-6 w-full items-center mb-10">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-xs"
      >
        Escribir por WhatsApp
      </a>
      <a
        href={`mailto:${email}`}
        className="text-primary hover:underline text-base"
      >
        {email}
      </a>
    </div>
    <div className="flex justify-center gap-8 mt-4">
      <a
        href="https://www.instagram.com/puertadelcielo.ba/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-primary shadow transition-all duration-300 hover:bg-secondary/10 hover:scale-110 hover:shadow-md"
      >
        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.235-1.3a1.107 1.107 0 100 2.214 1.107 1.107 0 000-2.214z"/>
        </svg>
      </a>
      <a
        href="https://www.youtube.com/@puertadelcielo1112"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-primary shadow transition-all duration-300 hover:bg-secondary/10 hover:scale-110 hover:shadow-md"
      >
        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
      <a
        href="https://www.facebook.com/puertadelcielobaradero"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-primary shadow transition-all duration-300 hover:bg-secondary/10 hover:scale-110 hover:shadow-md"
      >
        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.525 2.001H6.475A4.474 4.474 0 002 6.475v11.05A4.474 4.474 0 006.475 22h11.05A4.474 4.474 0 0022 17.525V6.475A4.474 4.474 0 0017.525 2.001zm-2.03 7.5h-1.07c-.84 0-.98.4-.98.96v1.14h2.05l-.27 2.09h-1.78v5.36h-2.13v-5.36h-1.78v-2.09h1.78v-1.54c0-1.76 1.07-2.72 2.63-2.72.75 0 1.39.06 1.58.09v1.8z"/>
        </svg>
      </a>
    </div>
  </section>
);

export default ContactoSection;