import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { CATEGORIES } from '@/lib/data'
import { dbGetProducts } from '@/lib/db'
import ProductoCliente from '@/components/ui/ProductoCliente'

interface Props {
  params: { categoria: string; slug: string }
}

export default async function ProductoPage({ params }: Props) {
  const allProducts = await dbGetProducts()
  const product = allProducts.find(
    (p) => p.slug === params.slug && p.category === params.categoria
  )
  if (!product) notFound()

  const category = CATEGORIES.find(c => c.slug === params.categoria)
  const related = allProducts.filter(p => p.category === params.categoria && p.id !== product.id).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="text-xs text-mare-gray tracking-widest uppercase mb-8 flex gap-2">
            <Link href="/productos" className="hover:text-mare-dark transition-colors">Todos</Link>
            <span>/</span>
            <Link href={`/productos/${product.category}`} className="hover:text-mare-dark transition-colors">
              {category?.label ?? product.category}
            </Link>
            <span>/</span>
            <span className="text-mare-dark">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imagen principal */}
            <div className="relative aspect-[3/4] bg-stone-100">
              <Image
                src={product.variants[0].images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-mare-dark text-white text-[10px] tracking-widest uppercase px-2 py-1">
                  Nuevo
                </span>
              )}
            </div>

            {/* Info + acciones interactivas */}
            <div className="lg:pt-4">
              <p className="text-xs tracking-widest uppercase text-mare-gray mb-2">{category?.label ?? product.category}</p>
              <h1 className="font-serif text-3xl font-light mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <p className="text-xl">${product.price.toLocaleString('es-MX')} MXN</p>
                {product.comparePrice && (
                  <p className="text-sm text-stone-400 line-through">${product.comparePrice.toLocaleString('es-MX')}</p>
                )}
              </div>

              {/* Componente cliente: selector de variante, cantidad y carrito */}
              <ProductoCliente product={product} />

              {/* Descripción */}
              <div className="border-t border-stone-200 pt-6 mt-6">
                <p className="text-xs tracking-widest uppercase mb-3 font-medium">Descripción</p>
                <p className="text-sm text-mare-gray leading-relaxed">{product.description}</p>
              </div>

              {/* Envío */}
              <div className="border-t border-stone-200 pt-6 mt-6 space-y-2">
                <div className="flex items-start gap-3 text-sm text-mare-gray">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 1-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span>Envíos a México (3-5 días hábiles) y Estados Unidos (7-10 días hábiles)</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-mare-gray">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Envío gratis en compras mayores a $999 MXN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          {related.length > 0 && (
            <section className="mt-24">
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.5em] uppercase text-mare-gray mb-2">También te puede gustar</p>
                <h2 className="font-serif text-3xl font-light">Productos relacionados</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {related.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
