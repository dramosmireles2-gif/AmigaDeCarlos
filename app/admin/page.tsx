import Link from 'next/link'
import { ORDER_STATUS_LABELS } from '@/lib/data'
import { dbGetProducts, dbGetOrders } from '@/lib/db'

const STATUS_COLORS: Record<string, string> = {
  pendiente_pago: 'bg-amber-100 text-amber-800',
  pago_confirmado: 'bg-blue-100 text-blue-800',
  en_preparacion: 'bg-purple-100 text-purple-800',
  enviado: 'bg-cyan-100 text-cyan-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

export default async function AdminDashboard() {
  const [products, orders] = await Promise.all([dbGetProducts(), dbGetOrders()])

  const pendingOrders = orders.filter(o => o.status === 'pendiente_pago').length
  const revenue = orders
    .filter(o => o.status !== 'cancelado')
    .reduce((sum, o) => sum + o.total, 0)
  const recentOrders = orders.slice(0, 4)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-400 mt-1">Resumen general del negocio</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-stone-100">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Total órdenes</p>
          <p className="text-2xl font-semibold text-stone-900">{orders.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-100">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Pendientes de pago</p>
          <p className="text-2xl font-semibold text-amber-600">{pendingOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-100">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Ingresos</p>
          <p className="text-2xl font-semibold text-stone-900">${revenue.toLocaleString('es-MX')}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-stone-100">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Productos</p>
          <p className="text-2xl font-semibold text-stone-900">{products.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-medium text-stone-900">Órdenes recientes</h2>
          <Link href="/admin/ordenes" className="text-xs text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2">Ver todas</Link>
        </div>
        <div className="divide-y divide-stone-50">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/ordenes/${order.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-900">{order.id}</p>
                  <p className="text-xs text-stone-400">{order.shipping.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
                <p className="text-sm font-medium text-stone-900 w-20 text-right">${order.total.toLocaleString('es-MX')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
