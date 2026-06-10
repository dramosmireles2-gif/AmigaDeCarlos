'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { SHIPPING } from '@/lib/config'

export default function CarritoPage() {
  const { items, total, removeItem, updateQuantity } = useCart()
  const shippingCost = total >= SHIPPING.freeShippingThreshold ? 0 : 150
  const grandTotal = total + shippingCost

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-6 text-stone-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>
            <h1 className="font-serif text-2xl font-light mb-3">Tu carrito está vacío</h1>
            <p className="text-sm text-mare-gray mb-8">Agrega productos para continuar</p>
            <Link
              href="/productos"
              className="inline-block bg-mare-dark text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-stone-800 transition-colors"
            >
              Ver productos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-serif text-3xl font-light mb-10">Mi carrito</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 border-b border-stone-100 pb-6">
                  <div className="relative w-24 aspect-[3/4] flex-shrink-0 bg-stone-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-light mb-1">{item.name}</h3>
                        <p className="text-xs text-mare-gray">Color: {item.color}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-stone-400 hover:text-mare-dark transition-colors"
                        aria-label="Eliminar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm">${(item.price * item.quantity).toLocaleString('es-MX')} MXN</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 p-6 space-y-4">
                <h2 className="text-xs tracking-widest uppercase font-medium">Resumen del pedido</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-mare-gray">Subtotal</span>
                    <span>${total.toLocaleString('es-MX')} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mare-gray">Envío</span>
                    <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost} MXN`}</span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-mare-gray">
                      Agrega ${(SHIPPING.freeShippingThreshold - total).toLocaleString('es-MX')} más para envío gratis
                    </p>
                  )}
                </div>

                <div className="border-t border-stone-200 pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${grandTotal.toLocaleString('es-MX')} MXN</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-mare-dark text-white text-xs tracking-widest uppercase py-4 hover:bg-stone-800 transition-colors mt-2"
                >
                  Proceder al pago
                </Link>

                <Link
                  href="/productos"
                  className="block text-center text-xs text-mare-gray hover:text-mare-dark transition-colors underline underline-offset-4"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
