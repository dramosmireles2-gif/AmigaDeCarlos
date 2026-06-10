'use client'

import { useState } from 'react'

export default function AdminConfiguracion() {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Configuración</h1>
        <p className="text-sm text-stone-400 mt-1">Datos bancarios, paqueterías y tiempos de envío</p>
      </div>

      <div className="space-y-6">
        {/* Datos bancarios */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Datos para transferencia bancaria</h2>
          <p className="text-xs text-stone-400">Estos datos se mostrarán al cliente al elegir pago por transferencia.</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Banco</label>
              <input defaultValue="BBVA" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">CLABE interbancaria</label>
              <input defaultValue="012 345 678 901 234 567" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 font-mono" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Beneficiario</label>
              <input placeholder="Nombre completo del titular" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
        </div>

        {/* Envíos México */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Envíos — México</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Paqueterías</label>
              <input defaultValue="DHL, Estafeta" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Tiempo estimado</label>
              <input defaultValue="3-5 días hábiles" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Costo de envío (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input type="number" defaultValue="150" className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Envío gratis a partir de (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input type="number" defaultValue="999" className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Envíos USA */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Envíos — Estados Unidos</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Paqueterías</label>
              <input defaultValue="FedEx Internacional" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Tiempo estimado</label>
              <input defaultValue="7-10 días hábiles" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Costo de envío (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input type="number" defaultValue="350" className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Envío gratis a partir de (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input type="number" defaultValue="2500" className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-stone-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-stone-700 transition-colors"
        >
          {saved ? '✓ Cambios guardados' : 'Guardar configuración'}
        </button>
      </div>
    </div>
  )
}
