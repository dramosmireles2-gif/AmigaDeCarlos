import Link from 'next/link'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/data'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default function EditarProducto({ params }: Props) {
  const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(params.id))
  if (!product) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/productos" className="text-stone-400 hover:text-stone-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        </Link>
        <h1 className="text-2xl font-semibold text-stone-900">Editar producto</h1>
      </div>

      <form className="space-y-8">
        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Información básica</h2>
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Nombre del producto</label>
            <input defaultValue={product.name} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Categoría</label>
              <select defaultValue={product.category} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 bg-white">
                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Slug (URL)</label>
              <input defaultValue={product.slug} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
            </div>
          </div>
          <div>
            <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Descripción</label>
            <textarea rows={3} defaultValue={product.description} className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isNew" defaultChecked={product.isNew} className="accent-stone-900 w-4 h-4" />
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
                <input type="number" defaultValue={product.price} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-1.5">Precio tachado (opcional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                <input type="number" defaultValue={product.comparePrice ?? ''} className="w-full border border-stone-200 pl-8 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-700">Variantes y stock</h2>
          <div className="space-y-3">
            {product.variants.map((v) => (
              <div key={v.id} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Color</label>
                  <input defaultValue={v.color} className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400" />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Tono</label>
                  <input type="color" defaultValue={v.colorHex} className="w-full h-10 border border-stone-200 rounded-lg cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Stock</label>
                  <input type="number" defaultValue={v.stock} className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-stone-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-stone-700 transition-colors">
            Guardar cambios
          </button>
          <button type="button" className="border border-red-200 text-red-600 text-sm px-6 py-3 rounded-xl hover:bg-red-50 transition-colors">
            Eliminar producto
          </button>
          <Link href="/admin/productos" className="border border-stone-200 text-stone-600 text-sm px-6 py-3 rounded-xl hover:bg-stone-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
