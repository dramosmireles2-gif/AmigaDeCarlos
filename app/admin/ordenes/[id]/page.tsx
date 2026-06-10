'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ORDER_STATUS_LABELS } from '@/lib/data'
import type { OrderStatus } from '@/lib/types'

const STATUS_COLORS: Record<string, string> = {
  pendiente_pago: 'bg-amber-100 text-amber-800',
  pago_confirmado: 'bg-blue-100 text-blue-800',
  en_preparacion: 'bg-purple-100 text-purple-800',
  enviado: 'bg-cyan-100 text-cyan-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

const MOCK_ORDER = {
  id: 'ORD-024',
  status: 'pendiente_pago' as OrderStatus,
  createdAt: '2026-06-10',
  paymentMethod: 'transferencia',
  customer: { name: 'María García', email: 'maria@email.com', phone: '+52 55 1234 5678' },
  shipping: { street: 'Av. Insurgentes Sur 1234', city: 'Ciudad de México', state: 'Ciudad de México', zip: '03100', country: 'MX' },
  items: [
    { name: 'Bolsa Mini Noir', color: 'Negro', quantity: 1, price: 890 },
    { name: 'Cartera Slim Minimalista', color: 'Camel', quantity: 1, price: 420 },
  ],
  subtotal: 1310,
  shippingCost: 0,
  total: 1310,
  trackingNumber: '',
  carrier: '',
  voucherUrl: null as string | null,
}

interface Props {
  params: { id: string }
}

export default function AdminOrdenDetalle({ params }: Props) {
  const [status, setStatus] = useState<OrderStatus>(MOCK_ORDER.status)
  const [trackingNumber, setTrackingNumber] = useState(MOCK_ORDER.trackingNumber)
  const [carrier, setCarrier] = useState(MOCK_ORDER.carrier)
  const [saving, setSaving] = useState(false)

  function handleConfirmPayment() {
    setSaving(true)
    setTimeout(() => {
      setStatus('pago_confirmado')
      setSaving(false)
    }, 800)
  }

  function handleSaveTracking() {
    setSaving(true)
    setTimeout(() => {
      setStatus('enviado')
      setSaving(false)
    }, 800)
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/ordenes" className="text-stone-400 hover:text-stone-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">{params.id}</h1>
          <p className="text-sm text-stone-400">Creada el {MOCK_ORDER.createdAt}</p>
        </div>
        <span className={`ml-auto text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[status]}`}>
          {ORDER_STATUS_LABELS[status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          {/* Acción principal según estado */}
          {status === 'pendiente_pago' && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-amber-900 mb-3">Comprobante de pago</h2>
              {MOCK_ORDER.voucherUrl ? (
                <div className="space-y-3">
                  <p className="text-xs text-amber-700">El cliente subió su comprobante. Revísalo antes de confirmar.</p>
                  <div className="bg-white border border-amber-200 rounded-xl p-4 text-xs text-stone-500 text-center">
                    [Vista previa del comprobante]
                  </div>
                  <button
                    onClick={handleConfirmPayment}
                    disabled={saving}
                    className="w-full bg-green-600 text-white text-sm py-2.5 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60"
                  >
                    {saving ? 'Confirmando...' : '✓ Confirmar pago recibido'}
                  </button>
                  <button className="w-full border border-red-200 text-red-600 text-sm py-2.5 rounded-xl hover:bg-red-50 transition-colors">
                    ✗ Rechazar comprobante
                  </button>
                </div>
              ) : (
                <p className="text-xs text-amber-700">El cliente aún no ha subido el comprobante de pago.</p>
              )}
            </div>
          )}

          {(status === 'pago_confirmado' || status === 'en_preparacion') && (
            <div className="bg-white border border-stone-100 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-stone-700 mb-4">Agregar número de guía</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-stone-400 block mb-1.5">Paquetería</label>
                  <select
                    value={carrier}
                    onChange={e => setCarrier(e.target.value)}
                    className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 bg-white"
                  >
                    <option value="">Seleccionar paquetería</option>
                    <option value="DHL">DHL</option>
                    <option value="Estafeta">Estafeta</option>
                    <option value="FedEx">FedEx</option>
                    <option value="Correos México">Correos México</option>
                    <option value="UPS">UPS</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1.5">Número de guía</label>
                  <input
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    placeholder="Ej: 1234567890"
                    className="w-full border border-stone-200 px-4 py-2.5 text-sm rounded-xl focus:outline-none focus:border-stone-400 font-mono"
                  />
                </div>
                <button
                  onClick={handleSaveTracking}
                  disabled={saving || !trackingNumber || !carrier}
                  className="w-full bg-stone-900 text-white text-sm py-2.5 rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-40"
                >
                  {saving ? 'Guardando...' : 'Marcar como enviado'}
                </button>
              </div>
            </div>
          )}

          {/* Productos */}
          <div className="bg-white border border-stone-100 rounded-2xl p-6">
            <h2 className="text-sm font-medium text-stone-700 mb-4">Productos</h2>
            <div className="space-y-3">
              {MOCK_ORDER.items.map((item, i) => (
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
                <span>{MOCK_ORDER.shippingCost === 0 ? 'Gratis' : `$${MOCK_ORDER.shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-1">
                <span>Total</span>
                <span>${MOCK_ORDER.total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Cliente</h2>
            <p className="text-sm font-medium text-stone-900">{MOCK_ORDER.customer.name}</p>
            <p className="text-xs text-stone-400 mt-1">{MOCK_ORDER.customer.email}</p>
            <p className="text-xs text-stone-400">{MOCK_ORDER.customer.phone}</p>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Dirección de envío</h2>
            <div className="text-xs text-stone-600 space-y-0.5">
              <p>{MOCK_ORDER.shipping.street}</p>
              <p>{MOCK_ORDER.shipping.city}, {MOCK_ORDER.shipping.state}</p>
              <p>CP {MOCK_ORDER.shipping.zip}</p>
              <p>{MOCK_ORDER.shipping.country === 'MX' ? '🇲🇽 México' : '🇺🇸 Estados Unidos'}</p>
            </div>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Pago</h2>
            <p className="text-sm text-stone-700 capitalize">
              {MOCK_ORDER.paymentMethod === 'transferencia' ? 'Transferencia bancaria' : 'Tarjeta de crédito/débito'}
            </p>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Cambiar estado</h2>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as OrderStatus)}
              className="w-full border border-stone-200 px-3 py-2 text-sm rounded-lg focus:outline-none focus:border-stone-400 bg-white"
            >
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
