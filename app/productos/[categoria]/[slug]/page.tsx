'use client'

import { useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MOCK_PRODUCTS } from '@/lib/data'
import { useCart } from '@/context/CartContext'

export default function ProductoPage() {
  const params = useParams()
  const { addItem } = useCart()

  const product = MOCK_PRODUCTS.find(
    (p) => p.slug === params.slug && p.category === params.categoria
  )

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] ?? null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product || !selectedVariant) return notFound()

  function handleAddToCart() {
    if (!product || !selectedVariant) return
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: product.price,
      color: selectedVariant.color,
      imageUrl: selectedVariant.images[0] ?? '/product-1.jpg',
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="text-xs text-mare-gray tracking-widest uppercase mb-8 flex gap-2">
            <Link href="/productos" className="hover:text-mare-dark transition-colors">Todos</Link>
            <span>/</span>
            <Link href={`/productos/${product.category}`} className="hover:text-mare-dark transition-colors capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-mare-dark">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imagen */}
            <div className="relative aspect-[3/4] bg-stone-100">
              <Image
                src={selectedVariant.images[0] ?? '/product-1.jpg'}
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

            {/* Info */}
            <div className="lg:pt-4">
              <p className="text-xs tracking-widest uppercase text-mare-gray mb-2 capitalize">{product.category}</p>
              <h1 className="font-serif text-3xl font-light mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <p className="text-xl">${product.price.toLocaleString('es-MX')} MXN</p>
                {product.comparePrice && (
                  <p className="text-sm text-stone-400 line-through">${product.comparePrice.toLocaleString('es-MX')}</p>
                )}
              </div>

              {/* Variantes de color */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase mb-3 font-medium">
                    Color: <span className="font-light normal-case tracking-normal">{selectedVariant.color}</span>
                  </p>
                  <div className="flex gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedVariant.id === v.id ? 'border-mare-dark scale-110' : 'border-stone-300'}`}
                        style={{ backgroundColor: v.colorHex }}
                        title={v.color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Stock */}
              <p className="text-xs text-mare-gray mb-6">
                {selectedVariant.stock > 0
                  ? selectedVariant.stock <= 3
                    ? `¡Solo quedan ${selectedVariant.stock}!`
                    : 'En stock'
                  : 'Agotado'}
              </p>

              {/* Cantidad */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-xs tracking-widest uppercase font-medium">Cantidad</p>
                <div className="flex items-center border border-stone-300">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(selectedVariant.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botón agregar */}
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant.stock === 0}
                className="w-full py-4 bg-mare-dark text-white text-xs tracking-widest uppercase hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-4"
              >
                {added ? '¡Agregado al carrito!' : 'Agregar al carrito'}
              </button>

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
        </div>
      </main>
      <Footer />
    </>
  )
}
