import { NextResponse } from 'next/server'
import { dbGetConfig, dbSaveConfig } from '@/lib/db'

export async function GET() {
  const config = await dbGetConfig()
  return NextResponse.json(config)
}

export async function PUT(req: Request) {
  const body = await req.json()
  const updated = await dbSaveConfig(body)
  return NextResponse.json(updated)
}
