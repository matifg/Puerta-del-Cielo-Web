import React from "react";
import { Clock, Calendar } from "lucide-react";

const DanzaArtesSection: React.FC = () => (
  <section className="max-w-5xl mx-auto py-16 px-4 md:px-8 bg-white rounded-2xl shadow space-y-10">
    {/* Superior: grid 2 columnas */}
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Texto */}
      <div>
        <h2 className="text-5xl font-bold tracking-wide text-amber-700 font-serif text-left mb-4">
          Danza y Artes
        </h2>
        <div className="w-16 h-1 bg-amber-600 mb-6 rounded-full" />
        <div className="bg-amber-50 rounded-xl px-6 py-4 max-w-xl text-left">
          <p className="text-lg text-slate-700 font-sans leading-relaxed">
            La Escuela de Danza y Artes Dinámicas es un espacio de formación donde el movimiento y la expresión creativa se convierten en instrumentos de Dios para traer sanidad, libertad y restauración.
          </p>
        </div>
      </div>
      {/* Imagen */}
      <div className="flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          src="/images/danza-artes.webp"
          alt="Danza y Artes"
          className="w-full max-w-xs md:max-w-sm h-64 md:h-72 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>

    {/* Propósito */}
    <div className="bg-slate-50 rounded-xl p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-amber-700 mb-3">Propósito</h3>
      <p className="text-base text-slate-700 font-sans leading-relaxed">
        A través de un proceso integral, los alumnos desarrollan identidad, sensibilidad espiritual y excelencia en la ministración, entendiendo la danza como un medio para manifestar la presencia de Dios y edificar a otro. Anhelamos una comunidad creativa que viva la adoración como un estilo de vida y sea un canal del cielo para transformar personas y ambientes.
      </p>
    </div>

    {/* Información rápida */}
    <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
      {/* Card Duración */}
      <div className="flex-1 bg-slate-100 rounded-lg px-10 py-10 flex flex-col items-center justify-center shadow transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <Clock className="w-8 h-8 text-amber-600 mb-3" />
        <span className="text-base md:text-lg font-semibold text-slate-700 uppercase mb-3 text-center">
          Duración
        </span>
        <span className="text-lg font-semibold text-amber-700 text-center">
          1 año
        </span>
      </div>
      {/* Card Modalidad */}
      <div className="flex-1 bg-slate-100 rounded-lg px-10 py-10 flex flex-col items-center justify-center shadow transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <Calendar className="w-8 h-8 text-amber-600 mb-3" />
        <span className="text-base md:text-lg font-semibold text-slate-700 uppercase mb-3 text-center">
          Modalidad
        </span>
        <span className="text-lg font-semibold text-amber-700 text-center">
          Presencial. Últimos dos sábados de cada mes.
        </span>
      </div>
    </div>

    {/* Beneficios */}
    <div className="max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold text-amber-700 mb-3">¿Qué recibirás en las clases?</h3>
      <ul className="list-disc list-inside space-y-3 text-slate-700 font-sans leading-relaxed">
        <li>Fundamentos bíblicos sólidos en danza y artes dinámicas.</li>
        <li>Material de estudio actualizado y revisado.</li>
        <li>Formación en carácter y vida espiritual.</li>
        <li>Entrenamiento teórico y técnico en danza.</li>
        <li>Entrenamiento de destrezas físicas.</li>
        <li>Comunidad de crecimiento y acompañamiento personalizado.</li>
        <li>Espacios de consulta.</li>
        <li>Tiempos de impartición y ministración.</li>
        <li>Tiempos de práctica con elementos.</li>
      </ul>
    </div>

    {/* Botones */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <a
        href="/docs/plan-academico-danza.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 text-center"
      >
        Ver plan académico
      </a>
      <a
        href="https://wa.me/549123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-100 hover:bg-slate-200 text-amber-700 font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 text-center border border-amber-200"
      >
        + Info
      </a>
    </div>
  </section>
);

export default DanzaArtesSection;