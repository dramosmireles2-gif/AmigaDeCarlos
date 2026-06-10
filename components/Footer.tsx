import Link from 'next/link'
import { BRAND } from '@/lib/config'
import { CATEGORIES } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <p className="font-serif text-2xl text-white tracking-[0.3em] mb-4">{BRAND.name}</p>
            <p className="text-sm font-light leading-relaxed text-stone-500">
              {BRAND.tagline}.<br />
              Envíos a México y Estados Unidos.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-6 text-stone-500">Categorías</p>
            <ul className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/productos/${cat.slug}`} className="text-sm hover:text-white transition-colors font-light">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-6 text-stone-500">Ayuda</p>
            <ul className="flex flex-col gap-3">
              <li><Link href="/politica-envios" className="text-sm hover:text-white transition-colors font-light">Política de envíos</Link></li>
              <li><Link href="/cambios-devoluciones" className="text-sm hover:text-white transition-colors font-light">Cambios y devoluciones</Link></li>
              <li><Link href="/preguntas-frecuentes" className="text-sm hover:text-white transition-colors font-light">Preguntas frecuentes</Link></li>
              <li><Link href="/contacto" className="text-sm hover:text-white transition-colors font-light">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-6 text-stone-500">Síguenos</p>
            <div className="flex gap-5 mb-6">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1Z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-stone-600">{BRAND.email}</p>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-stone-400 transition-colors">Aviso de privacidad</Link>
            <Link href="/terminos" className="hover:text-stone-400 transition-colors">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
