import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ORDER_STATUS_LABELS } from '@/lib/data'
import type { OrderStatus } from '@/lib/types'
import Link from 'next/link'

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'pendiente_pago', label: 'Pago pendiente' },
  { key: 'pago_confirmado', label: 'Pago confirmado' },
  { key: 'en_preparacion', label: 'En preparación' },
  { key: 'enviado', label: 'Enviado' },
  { key: 'entregado', label: 'Entregado' },
]

const MOCK_ORDER = {
  id: 'ORD-001',
  status: 'en_preparacion' as OrderStatus,
  createdAt: '2026-06-10',
  trackingNumber: undefined as string | undefined,
  carrier: undefined as string | undefined,
  items: [
    { name: 'Bolsa Mini Noir', color: 'Negro', quantity: 1, price: 890 },
    { name: 'Cartera Slim Minimalista', color: 'Camel', quantity: 1, price: 420 },
  ],
  total: 1310,
  shippingCost: 0,
}

interface Props {
  params: { id: string }
}

export default function OrdenPage({ params }: Props) {
  const order = MOCK_ORDER
  const currentStepIndex = STEPS.findIndex(s => s.key === order.status)

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-mare-gray mb-1">Pedido</p>
              <h1 className="font-serif text-2xl font-light">{params.id}</h1>
            </div>
            <span className="text-xs tracking-widest uppercase bg-stone-100 px-3 py-2">
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>

          {/* Progreso */}
          <div className="bg-stone-50 p-6 mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-px bg-stone-200 -z-0" />
              {STEPS.filter(s => s.key !== 'pendiente_pago').map((step, i) => {
                const stepIndex = STEPS.findIndex(s => s.key === step.key)
                const isDone = stepIndex <= currentStepIndex
                return (
                  <div key={step.key} className="flex flex-col items-center gap-2 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isDone ? 'bg-mare-dark text-white' : 'bg-white border border-stone-300 text-stone-400'}`}>
                      {isDone ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : i + 1}
                    </div>
                    <p className="text-[10px] text-center tracking-wide text-mare-gray max-w-[60px]">{step.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rastreo */}
          {order.trackingNumber ? (
            <div className="border border-stone-200 p-6 mb-8">
              <p className="text-xs tracking-widest uppercase font-medium mb-3">Información de envío</p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-mare-gray">Paquetería</span>
                  <span>{order.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mare-gray">Número de guía</span>
                  <span className="font-mono">{order.trackingNumber}</span>
                </div>
              </div>
            </div>
          ) : order.status === 'en_preparacion' ? (
            <div className="bg-blue-50 border border-blue-100 p-4 mb-8 text-sm text-blue-800">
              Tu pedido está siendo preparado. Recibirás tu número de guía por correo pronto.
            </div>
          ) : null}

          {/* Productos */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase font-medium mb-4">Productos</p>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-stone-100 pb-3">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-xs text-mare-gray">{item.color} × {item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toLocaleString('es-MX')} MXN</p>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-1">
                <span className="text-mare-gray">Envío</span>
                <span>{order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost}`}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
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
