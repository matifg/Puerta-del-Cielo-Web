import { Calendar, Clock, Crown } from "lucide-react";
import { whatsappUrl } from "../data/contacto";
import { Reveal } from "./bethel/Reveal";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerWithHeroComfort, pdcPageIntroHeaderClass } from "./PdcSectionHeader";

const glassCard =
  "rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl";

const LIST_ITEMS = [
  "Fundamentos bíblicos en liderazgo",
  "Material de estudio actualizado",
  "Formación en carácter y vida espiritual",
  "Comunidad y acompañamiento",
  "Espacios de consulta",
  "Ministración e impartición",
  "Práctica ministerial",
] as const;

const LiderazgoSection = () => (
  <PdcPageShell id="liderazgo-inicio" aria-labelledby="liderazgo-heading">
    <div className={pdcPageInnerWithHeroComfort}>
      <Reveal>
        <header className={pdcPageIntroHeaderClass}>
          <PdcSectionHeader
            headingId="liderazgo-heading"
            eyebrow="Área educativa"
            eyebrowIcon={Crown}
            title="Escuela de"
            titleAccent="liderazgo con propósito"
            subtitle="Un espacio de formación para desarrollar líderes con carácter, visión y espíritu de servicio."
            showSegmentBar
          />
        </header>
      </Reveal>

      <Reveal delayMs={80}>
        <div id="liderazgo-contenido" className={`${glassCard} scroll-mt-28 p-6 md:p-10`}>
          <p className="mx-auto mb-6 max-w-2xl text-center font-sans text-sm font-medium leading-relaxed text-white/92 md:text-base">
            La Escuela de Liderazgo está diseñada para formar hombres y mujeres comprometidos con Dios y con las
            personas, capaces de influir, guiar y servir con integridad.
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-center font-sans text-sm font-medium leading-relaxed text-white/88 md:text-base">
            A través de principios bíblicos y herramientas prácticas, buscamos desarrollar líderes íntegros con corazón
            pastoral, entendiendo que el liderazgo verdadero nace del servicio, la responsabilidad y el compromiso.
          </p>

          <div className="mx-auto mb-8 grid max-w-2xl gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 text-center transition hover:border-secondary/25">
              <Clock className="mx-auto mb-2 h-6 w-6 text-secondary" aria-hidden />
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-zinc-400">Duración</p>
              <p className="mt-1 font-sans text-lg font-medium text-[#faf8f4]">1 año</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 text-center transition hover:border-secondary/25">
              <Calendar className="mx-auto mb-2 h-6 w-6 text-secondary" aria-hidden />
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-zinc-400">Modalidad</p>
              <p className="mt-1 font-sans text-lg font-medium text-[#faf8f4]">Presencial quincenal</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-5 text-center font-serif text-xl font-medium text-[#faf8f4] md:text-2xl">
              ¿Qué vas a recibir?
            </h3>
            <ul className="mx-auto grid max-w-2xl gap-3 text-white/90 md:grid-cols-2">
              {LIST_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 font-sans text-sm">
                  <span className="mt-1 text-secondary" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={whatsappUrl("Hola! Quiero info sobre la Escuela de Liderazgo")}
              target="_blank"
              rel="noopener noreferrer"
              className="pdc-btn-on-dark-accent max-w-none text-center"
            >
              <span className="relative z-[1]">Info por WhatsApp</span>
            </a>
            <a
              href="/docs/escuela-liderazgo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pdc-btn-on-dark max-w-none text-center"
            >
              <span className="relative z-[1]">Ver plan académico</span>
            </a>
            <a
              href="/docs/escuela-liderazgo.pdf"
              download
              className="pdc-btn-on-dark-ghost max-w-none text-center"
            >
              <span className="relative z-[1]">Descargar</span>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </PdcPageShell>
);

export default LiderazgoSection;
