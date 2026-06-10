'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ORDER_STATUS_LABELS } from '@/lib/data'
import type { Order, OrderStatus } from '@/lib/types'

const STATUS_COLORS: Record<string, string> = {
  pendiente_pago: 'bg-amber-100 text-amber-800',
  pago_confirmado: 'bg-blue-100 text-blue-800',
  en_preparacion: 'bg-purple-100 text-purple-800',
  enviado: 'bg-cyan-100 text-cyan-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

interface Props { params: { id: string } }

export default function AdminOrdenDetalle({ params }: Props) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [carrier, setCarrier] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(r => r.json())
      .then((o: Order) => {
        setOrder(o)
        setTrackingNumber(o.trackingNumber ?? '')
        setCarrier(o.carrier ?? '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  async function updateOrder(data: Partial<Pick<Order, 'status' | 'trackingNumber' | 'carrier'>>) {
    setSaving(true)
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const updated = await res.json()
      setOrder(updated)
    } finally {
      setSaving(false)
    }
  }

  function handleConfirmPayment() {
    updateOrder({ status: 'pago_confirmado' })
  }

  function handleSaveTracking() {
    updateOrder({ status: 'enviado', trackingNumber, carrier })
  }

  function handleStatusChange(status: OrderStatus) {
    updateOrder({ status })
    setOrder(prev => prev ? { ...prev, status } : prev)
  }

  if (loading) return <div className="p-8 text-sm text-stone-400">Cargando...</div>
  if (!order) return <div className="p-8 text-sm text-red-500">Orden no encontrada</div>

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/ordenes" className="text-stone-400 hover:text-stone-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">{order.id}</h1>
          <p className="text-sm text-stone-400">Creada el {order.createdAt}</p>
        </div>
        <span className={`ml-auto text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          {order.status === 'pendiente_pago' && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-amber-900 mb-3">Comprobante de pago</h2>
              <p className="text-xs text-amber-700 mb-4">
                {order.paymentMethod === 'transferencia'
                  ? 'El cliente aún no ha subido el comprobante de pago.'
                  : 'Pago por tarjeta pendiente de confirmación.'}
              </p>
              <button onClick={handleConfirmPayment} disabled={saving}
                className="w-full bg-green-600 text-white text-sm py-2.5 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60">
                {saving ? 'Confirmando...' : '✓ Confirmar pago recibido'}
              </button>
            </div>
          )}

          {(order.status === 'pago_confirmado' || order.status === 'en_preparacion') && (
            <div className="bg-white border border-stone-100 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-stone-700 mb-4">Agregar número de guía</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-stone-400 block mb-1.5">Paquetería</label>
                  <select value={carrier} onChange={e => setCarrier(e.target.value)}
                    className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 bg-white">
                    <option value="">Seleccionar paquetería</option>
                    <option>DHL</option>
                    <option>Estafeta</option>
                    <option>FedEx</option>
                    <option>Correos México</option>
                    <option>UPS</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1.5">Número de guía</label>
                  <input value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)}
                    placeholder="Ej: 1234567890"
                    className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 font-mono" />
                </div>
                <button onClick={handleSaveTracking} disabled={saving || !trackingNumber || !carrier}
                  className="w-full bg-stone-900 text-white text-sm py-2.5 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-40">
                  {saving ? 'Guardando...' : 'Marcar como enviado'}
                </button>
              </div>
            </div>
          )}

          {order.status === 'enviado' && order.trackingNumber && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-cyan-900 mb-2">Envío en camino</h2>
              <p className="text-xs text-cyan-700">Paquetería: <span className="font-medium">{order.carrier}</span></p>
              <p className="text-xs text-cyan-700 font-mono mt-1">Guía: {order.trackingNumber}</p>
            </div>
          )}

          <div className="bg-white border border-stone-100 rounded-2xl p-6">
            <h2 className="text-sm font-medium text-stone-700 mb-4">Productos</h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-stone-50 pb-3">
                  <div>
                    <p className="text-stone-900">{item.name}</p>
                    <p className="text-xs text-stone-400">{item.color} × {item.quantity}</p>
                  </div>
                  <p className="text-stone-900">${(item.price * item.quantity).toLocaleString('es-MX')}</p>
                </div>
              ))}
              <div className="flex justify-between text-sm text-stone-500">
                <span>Envío</span>
                <span>{order.shippingCost === 0 ? 'Gratis' : `$${order.shippingCost.toLocaleString('es-MX')}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-1">
                <span>Total</span>
                <span>${order.total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Cliente</h2>
            <p className="text-sm font-medium text-stone-900">{order.shipping.name}</p>
            <p className="text-xs text-stone-400 mt-1">{order.shipping.email}</p>
            <p className="text-xs text-stone-400">{order.shipping.phone}</p>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Dirección de envío</h2>
            <div className="text-xs text-stone-600 space-y-0.5">
              <p>{order.shipping.street}</p>
              <p>{order.shipping.city}, {order.shipping.state}</p>
              <p>CP {order.shipping.zip}</p>
              <p>{order.shipping.country === 'MX' ? '🇲🇽 México' : '🇺🇸 Estados Unidos'}</p>
            </div>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Pago</h2>
            <p className="text-sm text-stone-700">
              {order.paymentMethod === 'transferencia' ? 'Transferencia bancaria' : 'Tarjeta de crédito/débito'}
            </p>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Cambiar estado</h2>
            <select value={order.status} onChange={e => handleStatusChange(e.target.value as OrderStatus)}
              disabled={saving}
              className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400 bg-white disabled:opacity-60">
              {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
