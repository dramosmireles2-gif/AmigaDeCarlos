import { NextResponse } from 'next/server'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { MOCK_PRODUCTS } from '@/lib/data'
import type { StoreConfig } from '@/lib/db'

export async function GET(req: Request) {
  // En producción requiere ?secret=SEED_SECRET
  if (process.env.NODE_ENV === 'production') {
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')
    if (!secret || secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }

  const results: string[] = []

  // ── Productos ──────────────────────────────────────────────────────────────
  let productosSeeded = 0
  for (const product of MOCK_PRODUCTS) {
    const ref = doc(db, 'products', String(product.id))
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      const { id, ...data } = product
      await setDoc(ref, data)
      productosSeeded++
    }
  }
  results.push(`Productos: ${productosSeeded} nuevos (${MOCK_PRODUCTS.length - productosSeeded} ya existían)`)

  // ── Contador de productos ──────────────────────────────────────────────────
  const maxProductId = Math.max(...MOCK_PRODUCTS.map(p => p.id))
  const counterRef = doc(db, 'config', 'counters')
  const counterSnap = await getDoc(counterRef)
  if (!counterSnap.exists()) {
    await setDoc(counterRef, { productCount: maxProductId, orderCount: 24 })
    results.push('Contadores inicializados (productCount=' + maxProductId + ', orderCount=24)')
  } else {
    results.push('Contadores ya existían, no se modificaron')
  }

  // ── Configuración ──────────────────────────────────────────────────────────
  const configRef = doc(db, 'config', 'store')
  const configSnap = await getDoc(configRef)
  if (!configSnap.exists()) {
    const defaultConfig: StoreConfig = {
      bank: 'BBVA',
      clabe: '012 345 678 901 234 567',
      beneficiary: '',
      mxCarriers: 'DHL, Estafeta',
      mxLeadTime: '3-5 días hábiles',
      mxShipping: 150,
      mxFreeFrom: 999,
      usCarriers: 'FedEx Internacional',
      usLeadTime: '7-10 días hábiles',
      usShipping: 350,
      usFreeFrom: 2500,
    }
    await setDoc(configRef, defaultConfig)
    results.push('Configuración inicial creada')
  } else {
    results.push('Configuración ya existía, no se modificó')
  }

  return NextResponse.json({
    ok: true,
    message: 'Seed completado',
    results,
  })
}
