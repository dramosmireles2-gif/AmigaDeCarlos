import Link from 'next/link'
import { ORDER_STATUS_LABELS } from '@/lib/data'

const STATUS_COLORS: Record<string, string> = {
  pendiente_pago: 'bg-amber-100 text-amber-800',
  pago_confirmado: 'bg-blue-100 text-blue-800',
  en_preparacion: 'bg-purple-100 text-purple-800',
  enviado: 'bg-cyan-100 text-cyan-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

const MOCK_ORDERS = [
  { id: 'ORD-024', customer: 'María García', email: 'maria@email.com', total: 1310, status: 'pendiente_pago', date: '2026-06-10', country: 'MX' },
  { id: 'ORD-023', customer: 'Ana López', email: 'ana@email.com', total: 890, status: 'en_preparacion', date: '2026-06-09', country: 'MX' },
  { id: 'ORD-022', customer: 'Sofía Martínez', email: 'sofia@email.com', total: 650, status: 'enviado', date: '2026-06-08', country: 'US' },
  { id: 'ORD-021', customer: 'Valentina Ruiz', email: 'vale@email.com', total: 2200, status: 'entregado', date: '2026-06-07', country: 'MX' },
  { id: 'ORD-020', customer: 'Camila Torres', email: 'cami@email.com', total: 420, status: 'pago_confirmado', date: '2026-06-06', country: 'MX' },
]

export default function AdminOrdenes() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Órdenes</h1>
        <p className="text-sm text-stone-400 mt-1">{MOCK_ORDERS.length} órdenes</p>
      </div>

      {/* Filtros de estado */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-medium">Todas</button>
        {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
          <button key={key} className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 text-xs font-medium hover:border-stone-400 transition-colors">
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium">Orden</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium hidden md:table-cell">Cliente</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium hidden lg:table-cell">Fecha</th>
              <th className="text-left px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium">Estado</th>
              <th className="text-right px-6 py-3 text-xs text-stone-400 uppercase tracking-wider font-medium">Total</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-stone-900">{order.id}</p>
                  <p className="text-xs text-stone-400">{order.country === 'US' ? '🇺🇸 USA' : '🇲🇽 México'}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-stone-900">{order.customer}</p>
                  <p className="text-xs text-stone-400">{order.email}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-sm text-stone-600">{order.date}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-medium text-stone-900">${order.total.toLocaleString('es-MX')}</p>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/ordenes/${order.id}`}
                    className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
