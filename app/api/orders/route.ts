import { NextResponse } from 'next/server'
import { dbGetOrders } from '@/lib/db'

export async function GET() {
  const orders = await dbGetOrders()
  return NextResponse.json(orders)
}
