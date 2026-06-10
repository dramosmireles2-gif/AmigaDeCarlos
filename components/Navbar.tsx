'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { NAV_LINKS } from '@/lib/data'
import { BRAND } from '@/lib/config'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-mare-dark text-white text-xs text-center py-2 px-4 tracking-widest">
        {BRAND.announcement}
      </div>

      <nav className="bg-mare-cream/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
          <button
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-widest uppercase hover:text-mare-gray transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="font-serif text-3xl tracking-[0.3em] font-light absolute left-1/2 -translate-x-1/2">
            {BRAND.name}
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.slice(3).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs tracking-widest uppercase hover:text-mare-gray transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link href="/carrito" aria-label="Carrito" className="relative hover:text-mare-gray transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-mare-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-mare-cream border-t border-stone-200 px-6 py-6">
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-widest uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/carrito"
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest uppercase"
              >
                Carrito {count > 0 && `(${count})`}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
