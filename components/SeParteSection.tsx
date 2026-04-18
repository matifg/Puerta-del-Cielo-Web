import React from "react";

const SeParteSection: React.FC = () => (
  <section className="max-w-xl mx-auto py-20 px-6 flex flex-col items-center text-center bg-white">
    <span className="text-5xl mb-4">🤗</span>
    <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-6 font-serif">
      Sé parte de esta familia
    </h1>
    <p className="text-lg text-slate-600 mb-10">
      ¡Nos encantaría conocerte y acompañarte en tu camino de fe!<br />
      Completá el siguiente formulario y te ayudamos a encontrar tu grupo de conexión.<br />
      <span className="block mt-2 text-amber-600 font-semibold">¡Te esperamos con los brazos abiertos!</span>
    </p>
    <a
      href="https://forms.gle/2JVBZFS5Nw5BUXHGA"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full shadow transition text-lg"
    >
      Quiero ser parte
    </a>
  </section>
);

export default SeParteSection;