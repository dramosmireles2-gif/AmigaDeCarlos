'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'

export default function NuevoProducto() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [variants, setVariants] = useState([{ color: '', colorHex: '#000000', stock: 0, images: ['/product-1.jpg'] }])

  function addVariant() {
    setVariants(v => [...v, { color: '', colorHex: '#000000', stock: 0, images: ['/product-1.jpg'] }])
  }

  function removeVariant(i: number) {
    setVariants(v => v.filter((_, idx) => idx !== i))
  }

  function updateVariant(i: number, field: string, value: string | number) {
    setVariants(prev => prev.map((v, idx) => idx === i ? { ...v, [field]: value } : v))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      slug: (form.elements.namedItem('slug') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      price: Number((form.elements.namedItem('price') as HTMLInputElement).value),
      comparePrice: Number((form.elements.namedItem('comparePrice') as HTMLInputElement).value) || undefined,
      isNew: (form.elements.namedItem('isNew') as HTMLInputElement).checked,
      variants: variants.map((v, i) => ({ id: Date.now() + i, ...v })),
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Error al guardar')
        return
      }
      router.push('/admin/productos')
      router.refresh()
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/productos" className="text-stone-400 hover:text-stone-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        </Link>
        <h1 className="text-2xl font-semibold text-stone-900">Nuevo producto</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Información básica</h2>
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Nombre del producto</label>
            <input name="name" required placeholder="Ej: Bolsa Mini Noir" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Categoría</label>
              <select name="category" required className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 bg-white">
                <option value="">Seleccionar</option>
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Slug (URL)</label>
              <input name="slug" required placeholder="bolsa-mini-noir" className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Descripción</label>
            <textarea name="description" rows={3} placeholder="Describe el producto..." className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isNew" name="isNew" className="accent-stone-900 w-4 h-4" />
            <label htmlFor="isNew" className="text-sm text-stone-600">Marcar como "Nuevo"</label>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Precios</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Precio (MXN)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="price" type="number" required min="0" placeholder="0" className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Precio tachado (opcional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="comparePrice" type="number" min="0" placeholder="0" className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-stone-700">Variantes de color</h2>
            <button type="button" onClick={addVariant} className="text-xs text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Agregar variante
            </button>
          </div>
          <div className="space-y-3">
            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Nombre del color</label>
                  <input placeholder="Negro" value={v.color} onChange={e => updateVariant(i, 'color', e.target.value)}
                    className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400" />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Color</label>
                  <input type="color" value={v.colorHex} onChange={e => updateVariant(i, 'colorHex', e.target.value)}
                    className="w-full h-10 border border-stone-200 rounded-lg cursor-pointer" />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-stone-400 block mb-1">Stock</label>
                    <input type="number" min="0" value={v.stock} onChange={e => updateVariant(i, 'stock', parseInt(e.target.value) || 0)}
                      className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400" />
                  </div>
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(i)} className="text-stone-300 hover:text-red-500 transition-colors self-end pb-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="text-sm font-medium text-stone-700 mb-4">Imágenes</h2>
          <label className="block border-2 border-dashed border-stone-200 rounded-xl p-10 text-center cursor-pointer hover:border-stone-400 transition-colors">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 text-stone-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="text-sm text-stone-400">Arrastra imágenes o haz clic para subir</p>
            <p className="text-xs text-stone-300 mt-1">PNG, JPG hasta 5MB cada una</p>
            {/* TODO: implement file upload to storage (Supabase Storage, Firebase Storage, S3, etc.) */}
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving}
            className="bg-stone-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-60">
            {saving ? 'Guardando...' : 'Guardar producto'}
          </button>
          <Link href="/admin/productos" className="border border-stone-200 text-stone-600 text-sm px-6 py-3 rounded-xl hover:bg-stone-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
