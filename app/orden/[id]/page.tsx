'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ORDER_STATUS_LABELS } from '@/lib/data'
import type { Order, OrderStatus } from '@/lib/types'

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'pago_confirmado', label: 'Pago confirmado' },
  { key: 'en_preparacion', label: 'En preparación' },
  { key: 'enviado', label: 'Enviado' },
  { key: 'entregado', label: 'Entregado' },
]

const ALL_STEPS_ORDER: OrderStatus[] = [
  'pendiente_pago', 'pago_confirmado', 'en_preparacion', 'enviado', 'entregado',
]

interface Props { params: { id: string } }

export default function OrdenPage({ params }: Props) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then(data => {
        if (data) { setOrder(data); setLoading(false) }
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [params.id])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <p className="text-mare-gray text-sm">Buscando tu pedido...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (notFound || !order) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-sm px-6">
            <p className="font-serif text-2xl font-light mb-3">Pedido no encontrado</p>
            <p className="text-sm text-mare-gray mb-8">No encontramos un pedido con el ID <strong>{params.id}</strong>. Verifica el número en tu correo de confirmación.</p>
            <Link href="/productos" className="text-xs tracking-widest uppercase underline underline-offset-4 text-mare-gray hover:text-mare-dark transition-colors">
              Ir a la tienda
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const currentStepIndex = ALL_STEPS_ORDER.indexOf(order.status)
  const isCancelled = order.status === 'cancelado'

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-mare-gray mb-1">Pedido</p>
              <h1 className="font-serif text-2xl font-light">{order.id}</h1>
              <p className="text-xs text-mare-gray mt-1">Realizado el {order.createdAt}</p>
            </div>
            <span className={`text-xs tracking-widest uppercase px-3 py-2 rounded-full font-medium ${
              isCancelled ? 'bg-red-100 text-red-700' :
              order.status === 'entregado' ? 'bg-green-100 text-green-700' :
              'bg-stone-100 text-stone-600'
            }`}>
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>

          {/* Barra de progreso */}
          {!isCancelled && (
            <div className="bg-stone-50 p-6 mb-8 rounded-2xl">
              {order.status === 'pendiente_pago' ? (
                <div className="text-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-stone-800">Esperando tu pago</p>
                  <p className="text-xs text-mare-gray mt-1">Una vez que confirmemos tu transferencia, prepararemos tu pedido.</p>
                </div>
              ) : (
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-px bg-stone-200 -z-0" />
                  <div
                    className="absolute top-4 left-0 h-px bg-mare-dark -z-0 transition-all duration-700"
                    style={{ width: `${(Math.max(0, ALL_STEPS_ORDER.indexOf(order.status) - 1) / (STEPS.length - 1)) * 100}%` }}
                  />
                  {STEPS.map((step) => {
                    const stepIndex = ALL_STEPS_ORDER.indexOf(step.key)
                    const isDone = stepIndex <= currentStepIndex
                    return (
                      <div key={step.key} className="flex flex-col items-center gap-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone ? 'bg-mare-dark text-white' : 'bg-white border border-stone-300 text-stone-400'
                        }`}>
                          {isDone
                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            : <span className="w-2 h-2 rounded-full bg-stone-300 block" />
                          }
                        </div>
                        <p className="text-[10px] text-center tracking-wide text-mare-gray max-w-[64px] leading-tight">{step.label}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Cancelado */}
          {isCancelled && (
            <div className="bg-red-50 border border-red-200 p-5 rounded-2xl mb-8 text-sm text-red-800">
              Este pedido fue cancelado. Si tienes dudas escríbenos a <a href={`mailto:${order.shipping.email}`} className="underline">{order.shipping.email}</a>.
            </div>
          )}

          {/* Guía de envío */}
          {order.trackingNumber && (
            <div className="border border-stone-200 p-6 mb-8 rounded-2xl">
              <p className="text-xs tracking-widest uppercase font-medium mb-4">Información de envío</p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-mare-gray">Paquetería</span>
                  <span className="font-medium">{order.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mare-gray">Número de guía</span>
                  <span className="font-mono font-medium">{order.trackingNumber}</span>
                </div>
              </div>
            </div>
          )}

          {order.status === 'en_preparacion' && (
            <div className="bg-blue-50 border border-blue-100 p-4 mb-8 rounded-xl text-sm text-blue-800">
              Tu pedido está siendo preparado. Recibirás tu número de guía por correo pronto.
            </div>
          )}

          {/* Productos */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6 mb-6">
            <p className="text-xs tracking-widest uppercase font-medium mb-5">Productos</p>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-light">{item.name}</p>
                    <p className="text-xs text-mare-gray">{item.color} × {item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toLocaleString('es-MX')} MXN</p>
                </div>
              ))}
              <div className="flex justify-between text-sm text-mare-gray pt-2">
                <span>Envío</span>
                <span>{order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost.toLocaleString('es-MX')} MXN`}</span>
              </div>
              <div className="flex justify-between font-medium pt-1 border-t border-stone-100">
                <span>Total</span>
                <span>${order.total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6 mb-8">
            <p className="text-xs tracking-widest uppercase font-medium mb-3">Enviar a</p>
            <p className="text-sm text-stone-700">{order.shipping.name}</p>
            <p className="text-sm text-mare-gray">{order.shipping.street}</p>
            <p className="text-sm text-mare-gray">{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
            <p className="text-sm text-mare-gray">{order.shipping.country === 'MX' ? 'México' : 'Estados Unidos'}</p>
          </div>

          <Link href="/productos" className="text-xs tracking-widest uppercase underline underline-offset-4 text-mare-gray hover:text-mare-dark transition-colors">
            ← Seguir comprando
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
