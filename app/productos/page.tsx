import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { CATEGORIES } from '@/lib/data'
import { dbGetProducts } from '@/lib/db'
import Link from 'next/link'

export default async function ProductosPage() {
  const products = await dbGetProducts()

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase text-mare-gray mb-2">Tienda</p>
            <h1 className="font-serif text-4xl font-light">Todos los productos</h1>
            <p className="text-sm text-mare-gray mt-2">{products.length} productos</p>
          </div>

          <div className="flex gap-10">
            {/* Sidebar filtros */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="space-y-8">
                <div>
                  <p className="text-xs tracking-widest uppercase mb-4 font-medium">Categorías</p>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/productos" className="text-sm font-medium text-mare-dark">Todas</Link>
                    </li>
                    {CATEGORIES.map((cat) => (
                      <li key={cat.slug}>
                        <Link href={`/productos/${cat.slug}`} className="text-sm text-mare-gray hover:text-mare-dark transition-colors">
                          {cat.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase mb-4 font-medium">Precio</p>
                  <div className="space-y-2 text-sm text-mare-gray">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-mare-dark transition-colors">
                      <input type="checkbox" className="accent-mare-dark" /> Menos de $500
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-mare-dark transition-colors">
                      <input type="checkbox" className="accent-mare-dark" /> $500 - $800
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-mare-dark transition-colors">
                      <input type="checkbox" className="accent-mare-dark" /> Más de $800
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase mb-4 font-medium">Disponibilidad</p>
                  <div className="space-y-2 text-sm text-mare-gray">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-mare-dark transition-colors">
                      <input type="checkbox" className="accent-mare-dark" /> En stock
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid de productos */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <button className="lg:hidden text-sm text-mare-gray underline underline-offset-4">Filtros</button>
                <select className="ml-auto text-xs tracking-widest uppercase bg-transparent border border-stone-300 px-3 py-2 focus:outline-none focus:border-mare-dark">
                  <option>Destacados</option>
                  <option>Más nuevos</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
