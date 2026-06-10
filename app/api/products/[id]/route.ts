import { NextResponse } from 'next/server'
import { dbGetProduct, dbUpdateProduct, dbDeleteProduct } from '@/lib/db'

interface Params { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
  const product = await dbGetProduct(Number(params.id))
  if (!product) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()
  const updated = await dbUpdateProduct(Number(params.id), body)
  if (!updated) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: Params) {
  const ok = await dbDeleteProduct(Number(params.id))
  if (!ok) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ success: true })
}
