import { NextResponse } from 'next/server'
import { dbGetConfig, dbSaveConfig } from '@/lib/db'

export async function GET() {
  // TODO: add auth check here
  return NextResponse.json(dbGetConfig())
}

export async function PUT(req: Request) {
  // TODO: add auth check here
  const body = await req.json()
  const updated = dbSaveConfig(body)
  return NextResponse.json(updated)
}
