'use client'

import { useState, useEffect, useRef } from 'react'
import type { StoreConfig } from '@/lib/db'

export default function AdminConfiguracion() {
  const [config, setConfig] = useState<StoreConfig | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(setConfig)
  }, [])

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const form = e.currentTarget
    const data: Partial<StoreConfig> = {
      bank: (form.elements.namedItem('bank') as HTMLInputElement).value,
      clabe: (form.elements.namedItem('clabe') as HTMLInputElement).value,
      beneficiary: (form.elements.namedItem('beneficiary') as HTMLInputElement).value,
      mxCarriers: (form.elements.namedItem('mxCarriers') as HTMLInputElement).value,
      mxLeadTime: (form.elements.namedItem('mxLeadTime') as HTMLInputElement).value,
      mxShipping: Number((form.elements.namedItem('mxShipping') as HTMLInputElement).value),
      mxFreeFrom: Number((form.elements.namedItem('mxFreeFrom') as HTMLInputElement).value),
      usCarriers: (form.elements.namedItem('usCarriers') as HTMLInputElement).value,
      usLeadTime: (form.elements.namedItem('usLeadTime') as HTMLInputElement).value,
      usShipping: Number((form.elements.namedItem('usShipping') as HTMLInputElement).value),
      usFreeFrom: Number((form.elements.namedItem('usFreeFrom') as HTMLInputElement).value),
    }
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const updated = await res.json()
      setConfig(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (!config) return <div className="p-8 text-sm text-stone-400">Cargando...</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Configuración</h1>
        <p className="text-sm text-stone-400 mt-1">Datos bancarios, paqueterías y tiempos de envío</p>
      </div>

      <form ref={formRef} onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Datos para transferencia bancaria</h2>
          <p className="text-xs text-stone-400">Estos datos se mostrarán al cliente al elegir pago por transferencia.</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Banco</label>
              <input name="bank" defaultValue={config.bank} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">CLABE interbancaria</label>
              <input name="clabe" defaultValue={config.clabe} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 font-mono" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Beneficiario</label>
              <input name="beneficiary" defaultValue={config.beneficiary} placeholder="Nombre completo del titular" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Envíos — México</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Paqueterías</label>
              <input name="mxCarriers" defaultValue={config.mxCarriers} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Tiempo estimado</label>
              <input name="mxLeadTime" defaultValue={config.mxLeadTime} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Costo de envío (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="mxShipping" type="number" defaultValue={config.mxShipping} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Envío gratis a partir de (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="mxFreeFrom" type="number" defaultValue={config.mxFreeFrom} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Envíos — Estados Unidos</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Paqueterías</label>
              <input name="usCarriers" defaultValue={config.usCarriers} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Tiempo estimado</label>
              <input name="usLeadTime" defaultValue={config.usLeadTime} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Costo de envío (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="usShipping" type="number" defaultValue={config.usShipping} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Envío gratis a partir de (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="usFreeFrom" type="number" defaultValue={config.usFreeFrom} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="bg-stone-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-60">
          {saved ? '✓ Cambios guardados' : saving ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </form>
    </div>
  )
}
