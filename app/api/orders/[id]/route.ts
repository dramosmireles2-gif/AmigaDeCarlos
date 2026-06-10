import { NextResponse } from 'next/server'
import { dbGetOrder, dbUpdateOrder } from '@/lib/db'

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const order = dbGetOrder(params.id)
  if (!order) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PUT(req: Request, { params }: Params) {
  // TODO: add auth check here
  const body = await req.json()
  const updated = dbUpdateOrder(params.id, body)
  if (!updated) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(updated)
}
