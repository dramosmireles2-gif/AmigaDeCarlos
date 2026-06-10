'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { StoreConfig } from '@/lib/db'

function ConfirmacionContent() {
  const params = useSearchParams()
  const orderId = params.get('orden') ?? 'ORD-000'
  const metodo = params.get('metodo') ?? 'transferencia'
  const esTransferencia = metodo === 'transferencia'

  const [config, setConfig] = useState<StoreConfig | null>(null)

  useEffect(() => {
    // Solo necesitamos los datos bancarios si fue transferencia
    if (esTransferencia) {
      fetch('/api/config').then(r => r.json()).then(setConfig)
    }
  }, [esTransferencia])

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 text-center">

        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-light mb-3">¡Pedido recibido!</h1>
        <p className="text-mare-gray text-sm mb-2">
          Número de orden: <strong className="text-mare-dark font-mono">{orderId}</strong>
        </p>
        <p className="text-mare-gray text-sm mb-10">
          Recibirás una confirmación en tu correo electrónico.
        </p>

        {esTransferencia ? (
          <div className="bg-stone-50 p-8 text-left mb-10 rounded-2xl">
            <h2 className="text-xs tracking-widest uppercase font-medium mb-6 text-center">Datos para transferencia</h2>

            {config ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-stone-200 pb-3">
                  <span className="text-mare-gray">Banco</span>
                  <span className="font-medium">{config.bank}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-3">
                  <span className="text-mare-gray">CLABE</span>
                  <span className="font-medium font-mono">{config.clabe}</span>
                </div>
                {config.beneficiary && (
                  <div className="flex justify-between border-b border-stone-200 pb-3">
                    <span className="text-mare-gray">Beneficiario</span>
                    <span className="font-medium">{config.beneficiary}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-mare-gray">Referencia</span>
                  <span className="font-medium font-mono">{orderId}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-4 bg-stone-200 rounded" />)}
              </div>
            )}

            <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800">
              <p className="font-medium mb-1">Importante</p>
              <p>Incluye el número <strong className="font-mono">{orderId}</strong> como referencia en tu transferencia. Confirmaremos tu pago en 24-48 horas.</p>
            </div>

            <div className="mt-6">
              <p className="text-xs text-mare-gray text-center mb-3">Sube tu comprobante de pago</p>
              <label className="block border-2 border-dashed border-stone-300 p-6 text-center cursor-pointer hover:border-mare-dark transition-colors rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 text-stone-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm text-mare-gray">Haz clic para subir tu comprobante</span>
                <p className="text-xs text-stone-400 mt-1">PNG, JPG o PDF</p>
                {/* TODO: upload to Firebase Storage and notify admin */}
                <input type="file" accept="image/*,.pdf" className="hidden" />
              </label>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 p-8 mb-10 rounded-2xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-600 mx-auto mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
            <p className="text-sm text-green-800 font-medium mb-1">¡Pago confirmado!</p>
            <p className="text-sm text-green-700">Tu pago fue procesado correctamente. Prepararemos tu pedido a la brevedad.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/orden/${orderId}`}
            className="bg-mare-dark text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-stone-800 transition-colors"
          >
            Ver estado de mi pedido
          </Link>
          <Link
            href="/productos"
            className="border border-stone-300 text-xs tracking-widest uppercase px-8 py-4 hover:border-mare-dark transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ConfirmacionPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <p className="text-mare-gray text-sm">Cargando...</p>
        </main>
      }>
        <ConfirmacionContent />
      </Suspense>
      <Footer />
    </>
  )
}
