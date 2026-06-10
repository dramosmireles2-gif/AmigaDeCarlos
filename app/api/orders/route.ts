import { NextResponse } from 'next/server'
import { dbGetOrders } from '@/lib/db'

export async function GET() {
  // TODO: add auth check here
  const orders = dbGetOrders()
  return NextResponse.json(orders)
}
