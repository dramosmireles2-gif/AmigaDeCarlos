import Link from 'next/link'
import { dbGetOrders } from '@/lib/db'
import { ORDER_STATUS_LABELS } from '@/lib/data'

const STATUS_COLORS: Record<string, string> = {
  pendiente_pago: 'bg-amber-100 text-amber-800',
  pago_confirmado: 'bg-blue-100 text-blue-800',
  en_preparacion: 'bg-purple-100 text-purple-800',
  enviado: 'bg-cyan-100 text-cyan-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

export default async function AdminOrdenes() {
  // TODO: replace with → const orders = await db.orders.findMany(...)
  const orders = await dbGetOrders()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Órdenes</h1>
        <p className="text-sm text-stone-400 mt-1">{orders.length} órdenes</p>
      </div>

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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-stone-900">{order.id}</p>
                  <p className="text-xs text-stone-400">{order.shipping.country === 'US' ? '🇺🇸 USA' : '🇲🇽 México'}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-stone-900">{order.shipping.name}</p>
                  <p className="text-xs text-stone-400">{order.shipping.email}</p>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-sm text-stone-600">{order.createdAt}</p>
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
                  <Link href={`/admin/ordenes/${order.id}`}
                    className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2">
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
