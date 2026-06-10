import { NextResponse } from 'next/server'
import { dbGetOrder, dbUpdateOrder } from '@/lib/db'

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const order = await dbGetOrder(params.id)
  if (!order) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()
  const updated = await dbUpdateOrder(params.id, body)
  if (!updated) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(updated)
}
