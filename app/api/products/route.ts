import { NextResponse } from 'next/server'
import { dbGetProducts, dbCreateProduct } from '@/lib/db'

export async function GET() {
  const products = await dbGetProducts()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, slug, category, description, price, comparePrice, isNew, variants } = body

  if (!name || !slug || !category || !price || !variants?.length) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const product = await dbCreateProduct({ name, slug, category, description, price, comparePrice, isNew: !!isNew, variants })
  return NextResponse.json(product, { status: 201 })
}
