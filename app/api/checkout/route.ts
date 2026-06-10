import { NextResponse } from 'next/server'
import { dbCreateOrder } from '@/lib/db'
import type { Order, PaymentMethod, ShippingAddress } from '@/lib/types'

export async function POST(req: Request) {
  const body = await req.json()

  const {
    name, email, phone,
    street, apartment, city, state, zip, country,
    paymentMethod,
    items, subtotal, shippingCost, total,
  } = body

  if (!name || !email || !street || !city || !state || !zip || !items?.length) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const shipping: ShippingAddress = {
    name,
    email,
    phone: phone ?? '',
    street: apartment ? `${street}, ${apartment}` : street,
    city,
    state,
    zip,
    country,
  }

  const today = new Date().toISOString().split('T')[0]

  // TODO: if paymentMethod === 'tarjeta' → create Stripe PaymentIntent here
  //       and return { clientSecret } instead of creating the order immediately.
  //       For 'transferencia', create the order right away (status: 'pendiente_pago').

  const order: Omit<Order, 'id'> = {
    status: 'pendiente_pago',
    paymentMethod: paymentMethod as PaymentMethod,
    createdAt: today,
    subtotal: Number(subtotal),
    shippingCost: Number(shippingCost),
    total: Number(total),
    trackingNumber: '',
    carrier: '',
    items,
    shipping,
  }

  // TODO: replace with → await db.orders.create({ data: order })
  const created = dbCreateOrder(order)

  return NextResponse.json({ orderId: created.id, status: created.status })
}
