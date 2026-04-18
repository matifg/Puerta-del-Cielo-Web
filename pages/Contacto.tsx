import ContactoSection from "../components/ContactoSection";

const Contacto = () => (
  <div>
    {/* Hero superior */}
    <section
      className="relative h-[65vh] w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/contacto-bg.jpg')",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
        <h1 className="text-5xl font-bold text-white">Contacto</h1>
        <p className="text-gray-300 mt-4 text-lg md:text-2xl">
          Estamos para escucharte
        </p>
      </div>
    </section>

    {/* Contenido principal */}
    <ContactoSection />
  </div>
);

export default Contacto;