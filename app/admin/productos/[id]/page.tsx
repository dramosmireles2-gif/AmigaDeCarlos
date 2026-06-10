'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'
import type { Product, ProductVariant } from '@/lib/types'

interface Props { params: { id: string } }

export default function EditarProducto({ params }: Props) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [variants, setVariants] = useState<ProductVariant[]>([])

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(r => r.json())
      .then((p: Product) => {
        setProduct(p)
        setVariants(p.variants)
        setLoading(false)
      })
      .catch(() => { setError('No se encontró el producto'); setLoading(false) })
  }, [params.id])

  function addVariant() {
    const newId = Math.max(0, ...variants.map(v => v.id)) + 1
    setVariants(v => [...v, { id: newId, color: '', colorHex: '#000000', stock: 0, images: ['/product-1.jpg'] }])
  }

  function removeVariant(id: number) {
    setVariants(v => v.filter(vv => vv.id !== id))
  }

  function updateVariant(id: number, field: keyof ProductVariant, value: string | number) {
    setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      slug: (form.elements.namedItem('slug') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      price: Number((form.elements.namedItem('price') as HTMLInputElement).value),
      comparePrice: Number((form.elements.namedItem('comparePrice') as HTMLInputElement).value) || undefined,
      isNew: (form.elements.namedItem('isNew') as HTMLInputElement).checked,
      variants,
    }

    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) { setError('Error al guardar'); return }
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    try {
      await fetch(`/api/products/${params.id}`, { method: 'DELETE' })
      router.push('/admin/productos')
      router.refresh()
    } catch {
      setError('Error al eliminar')
      setDeleting(false)
    }
  }

  if (loading) return <div className="p-8 text-sm text-stone-400">Cargando...</div>
  if (!product) return <div className="p-8 text-sm text-red-500">{error || 'Producto no encontrado'}</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/productos" className="text-stone-400 hover:text-stone-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        </Link>
        <h1 className="text-2xl font-semibold text-stone-900">Editar producto</h1>
        <button onClick={handleDelete} disabled={deleting}
          className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-60">
          {deleting ? 'Eliminando...' : 'Eliminar producto'}
        </button>
      </div>

      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
      {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">✓ Cambios guardados</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Información básica</h2>
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Nombre del producto</label>
            <input name="name" required defaultValue={product.name} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Categoría</label>
              <select name="category" required defaultValue={product.category} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 bg-white">
                <option value="">Seleccionar</option>
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Slug (URL)</label>
              <input name="slug" required defaultValue={product.slug} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Descripción</label>
            <textarea name="description" rows={3} defaultValue={product.description} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isNew" name="isNew" defaultChecked={product.isNew} className="accent-stone-900 w-4 h-4" />
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
                <input name="price" type="number" required min="0" defaultValue={product.price} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Precio tachado (opcional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input name="comparePrice" type="number" min="0" defaultValue={product.comparePrice ?? ''} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
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
            {variants.map((v) => (
              <div key={v.id} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Nombre del color</label>
                  <input placeholder="Negro" value={v.color} onChange={e => updateVariant(v.id, 'color', e.target.value)}
                    className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400" />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Color</label>
                  <input type="color" value={v.colorHex} onChange={e => updateVariant(v.id, 'colorHex', e.target.value)}
                    className="w-full h-10 border border-stone-200 rounded-lg cursor-pointer" />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-stone-400 block mb-1">Stock</label>
                    <input type="number" min="0" value={v.stock} onChange={e => updateVariant(v.id, 'stock', parseInt(e.target.value) || 0)}
                      className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400" />
                  </div>
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(v.id)} className="text-stone-300 hover:text-red-500 transition-colors self-end pb-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving}
            className="bg-stone-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-60">
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <Link href="/admin/productos" className="border border-stone-200 text-stone-600 text-sm px-6 py-3 rounded-xl hover:bg-stone-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
