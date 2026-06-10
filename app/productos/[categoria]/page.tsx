import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { categoria: string }
}

export default function CategoriaPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === params.categoria)
  if (!category) notFound()

  const products = MOCK_PRODUCTS.filter((p) => p.category === params.categoria)

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="text-xs text-mare-gray tracking-widest uppercase mb-8 flex gap-2">
            <Link href="/productos" className="hover:text-mare-dark transition-colors">Todos</Link>
            <span>/</span>
            <span className="text-mare-dark">{category.label}</span>
          </nav>

          <div className="mb-10">
            <h1 className="font-serif text-4xl font-light">{category.label}</h1>
            {category.description && (
              <p className="text-sm text-mare-gray mt-2">{category.description}</p>
            )}
            <p className="text-sm text-mare-gray mt-1">{products.length} productos</p>
          </div>

          <div className="flex gap-10">
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="space-y-8">
                <div>
                  <p className="text-xs tracking-widest uppercase mb-4 font-medium">Categorías</p>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/productos" className="text-sm text-mare-gray hover:text-mare-dark transition-colors">Todas</Link>
                    </li>
                    {CATEGORIES.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/productos/${cat.slug}`}
                          className={`text-sm transition-colors ${cat.slug === params.categoria ? 'font-medium text-mare-dark' : 'text-mare-gray hover:text-mare-dark'}`}
                        >
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
              </div>
            </aside>

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

              {products.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-mare-gray text-sm">No hay productos en esta categoría por el momento.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
