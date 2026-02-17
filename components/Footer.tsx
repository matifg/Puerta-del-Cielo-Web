import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 serif">Puerta del Cielo</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Una iglesia comprometida con la verdad del Evangelio y el amor al prójimo. Te esperamos con los brazos abiertos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/puertadelcielo.ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.235-1.3a1.107 1.107 0 100 2.214 1.107 1.107 0 000-2.214z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@puertadelcielo1112"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6">Ubicación</h4>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-amber-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Manuel Belgrano 2053,<br />
                  B2942 Baradero,<br />
                  Provincia de Buenos Aires
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6">Horarios</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li className="flex justify-between">
                <span>Domingos</span>
                <span className="font-semibold text-slate-800">10:00 hs</span>
              </li>
              <li className="flex justify-between">
                <span>Viernes</span>
                <span className="font-semibold text-slate-800">19:30 hs</span>
              </li>
              <li className="flex justify-between">
                <span>Martes (Células)</span>
                <span className="font-semibold text-slate-800">20:00 hs</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-slate-500 text-sm">+54 (3329) 000-000</span>
              </li>
              <li className="flex gap-3 items-center">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-slate-500 text-sm">contacto@puertadelcielo.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Puerta del Cielo - Baradero. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
