import React from "react";
import { Link } from "react-router-dom";
import { PdcPageShell } from "./PdcPageShell";
import { PdcSectionHeader, pdcPageInnerWithHeroComfort, pdcPageIntroHeaderClass } from "./PdcSectionHeader";
import { MessageCircle } from "lucide-react";
import {
  direccion,
  email,
  telefonoDisplay,
  telHref,
  whatsappUrl,
} from "../data/contacto";
import { horariosReunionGeneral } from "../data/horariosWeb";
import { SITE_PHOTOS } from "../data/sitePhotos";
import { PdcEditorialPhoto } from "./PdcEditorialPhoto";

const bodyText = "text-white/90 font-sans font-medium leading-relaxed";
const socialBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/65 transition hover:border-secondary/35 hover:bg-white/[0.08] hover:text-secondary";

const ContactoSection: React.FC = () => (
  <PdcPageShell aria-labelledby="contacto-heading">
    <div className={pdcPageInnerWithHeroComfort}>
    <header className={pdcPageIntroHeaderClass}>
      <PdcSectionHeader
        headingId="contacto-heading"
        eyebrow="Estamos para vos"
        eyebrowIcon={MessageCircle}
        title="Contacto"
        subtitle="Escribinos, visitanos o seguinos en redes. Te respondemos con gusto."
        showSegmentBar
      />
    </header>

    <div className="mx-auto mb-10 max-w-4xl">
      <p className="mb-4 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Ungieres y bienvenida
      </p>
      <PdcEditorialPhoto photo={SITE_PHOTOS.contactoEquipo} priority />
    </div>

    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-10">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
        <h2 className="mb-4 font-serif text-xl text-white">WhatsApp y teléfono</h2>
        <p className={`${bodyText} mb-5 text-sm`}>
          El mismo número que usamos en la iglesia para consultas y coordinación.
        </p>
        <p className="mb-5 font-sans text-lg font-semibold tabular-nums tracking-wide text-[#faf8f4]">
          <a href={telHref} className="transition hover:text-secondary">
            {telefonoDisplay}
          </a>
        </p>
        <a
          href={whatsappUrl("Hola! Quiero contactarme con Puerta del Cielo.")}
          target="_blank"
          rel="noopener noreferrer"
          className="pdc-btn-on-dark-accent mb-4 inline-flex max-w-none"
        >
          <span className="relative z-[1]">Escribir por WhatsApp</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="block text-sm text-zinc-400 underline decoration-white/12 underline-offset-[3px] transition hover:text-secondary hover:decoration-secondary/45"
        >
          {email}
        </a>
      </div>

      <div className="flex flex-col gap-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="mb-4 font-serif text-xl text-white">Ubicación</h2>
          <address className={`${bodyText} not-italic text-sm leading-relaxed`}>
            {direccion.lineas.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={`https://www.google.com/maps?q=${direccion.mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pdc-btn-on-dark-ghost mt-5 inline-flex max-w-none text-sm"
          >
            <span className="relative z-[1]">Ver en Google Maps</span>
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="mb-4 font-serif text-xl text-white">Reunión general</h2>
          <ul className="space-y-2 text-sm">
            {horariosReunionGeneral.map((h) => (
              <li
                key={`contacto-${h.dia}`}
                className="flex justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-zinc-400"
              >
                <span>{h.dia}</span>
                <span className="shrink-0 font-medium tabular-nums text-[#ebe8e2]">{h.hora}</span>
              </li>
            ))}
          </ul>
          <p className={`${bodyText} mt-4 text-xs`}>
            Mismo horario que en el inicio y el pie de página. Otras actividades: consultanos por WhatsApp.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-12 text-center">
      <p className="mb-5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Redes sociales
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="https://www.instagram.com/puertadelcielo.ba/"
          target="_blank"
          rel="noopener noreferrer"
          className={socialBtn}
          aria-label="Instagram"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.235-1.3a1.107 1.107 0 100 2.214 1.107 1.107 0 000-2.214z" />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/@puertadelcielo1112"
          target="_blank"
          rel="noopener noreferrer"
          className={socialBtn}
          aria-label="YouTube"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/puertadelcielobaradero"
          target="_blank"
          rel="noopener noreferrer"
          className={socialBtn}
          aria-label="Facebook"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.525 2.001H6.475A4.474 4.474 0 002 6.475v11.05A4.474 4.474 0 006.475 22h11.05A4.474 4.474 0 0022 17.525V6.475A4.474 4.474 0 0017.525 2.001zm-2.03 7.5h-1.07c-.84 0-.98.4-.98.96v1.14h2.05l-.27 2.09h-1.78v5.36h-2.13v-5.36h-1.78v-2.09h1.78v-1.54c0-1.76 1.07-2.72 2.63-2.72.75 0 1.39.06 1.58.09v1.8z" />
          </svg>
        </a>
      </div>
      <Link to="/" className="pdc-btn-on-dark-ghost mx-auto mt-8 inline-flex max-w-none text-sm">
        <span className="relative z-[1]">Volver al inicio</span>
      </Link>
    </div>
    </div>
  </PdcPageShell>
);

export default ContactoSection;
