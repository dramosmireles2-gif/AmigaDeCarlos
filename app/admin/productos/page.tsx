import Link from 'next/link'
import Image from 'next/image'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/data'

export default function AdminProductos() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Productos</h1>
          <p className="text-sm text-stone-400 mt-1">{MOCK_PRODUCTS.length} productos en catálogo</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-stone-900 text-white text-sm px-4 py-2.5 rounded-xl hover:bg-stone-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Nuevo producto
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium">Todos</button>
        {CATEGORIES.map((cat) => (
          <button key={cat.slug} className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-medium hover:border-stone-400 transition-colors">
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium">Producto</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium hidden md:table-cell">Categoría</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium">Precio</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium hidden md:table-cell">Stock total</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium">Estado</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {MOCK_PRODUCTS.map((product) => {
              const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
              const image = product.variants[0]?.images[0] ?? '/product-1.jpg'
              return (
                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image src={image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-900">{product.name}</p>
                        <p className="text-xs text-stone-400">{product.variants.length} variante{product.variants.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs capitalize text-stone-600">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-stone-900">${product.price.toLocaleString('es-MX')}</p>
                    {product.comparePrice && (
                      <p className="text-xs text-stone-400 line-through">${product.comparePrice.toLocaleString('es-MX')}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`text-sm font-medium ${totalStock <= 3 ? 'text-red-600' : 'text-stone-900'}`}>
                      {totalStock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.isNew && (
                      <span className="text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded-full">Nuevo</span>
                    )}
                    {totalStock === 0 && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Agotado</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2"
                      >
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
