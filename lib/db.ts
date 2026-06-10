// ─────────────────────────────────────────────────────────────────────────────
// CAPA DE DATOS — Firebase Firestore
// Colecciones: products | orders | config/store | config/counters
// ─────────────────────────────────────────────────────────────────────────────

import {
  collection, doc,
  getDocs, getDoc,
  setDoc, updateDoc, deleteDoc,
  query, orderBy,
  runTransaction, increment,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Product, Order, OrderStatus } from './types'

// ── TIPOS EXPORTADOS ──────────────────────────────────────────────────────────

export interface StoreConfig {
  bank: string
  clabe: string
  beneficiary: string
  mxCarriers: string
  mxLeadTime: string
  mxShipping: number
  mxFreeFrom: number
  usCarriers: string
  usLeadTime: string
  usShipping: number
  usFreeFrom: number
}

const DEFAULT_CONFIG: StoreConfig = {
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

// ── PRODUCTOS ────────────────────────────────────────────────────────────────

export async function dbGetProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, 'products'))
  return snap.docs.map(d => ({ id: parseInt(d.id), ...d.data() }) as Product)
}

export async function dbGetProduct(id: number): Promise<Product | undefined> {
  const snap = await getDoc(doc(db, 'products', String(id)))
  if (!snap.exists()) return undefined
  return { id: parseInt(snap.id), ...snap.data() } as Product
}

export async function dbCreateProduct(data: Omit<Product, 'id'>): Promise<Product> {
  // Genera ID numérico incrementando contador
  const counterRef = doc(db, 'config', 'counters')
  let newId = 1
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef)
    newId = (snap.exists() ? (snap.data().productCount ?? 0) : 0) + 1
    tx.set(counterRef, { productCount: newId }, { merge: true })
  })
  const product: Product = { id: newId, ...data }
  await setDoc(doc(db, 'products', String(newId)), data)
  return product
}

export async function dbUpdateProduct(id: number, data: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
  const ref = doc(db, 'products', String(id))
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  await updateDoc(ref, data as Record<string, unknown>)
  return { id, ...snap.data(), ...data } as Product
}

export async function dbDeleteProduct(id: number): Promise<boolean> {
  const ref = doc(db, 'products', String(id))
  const snap = await getDoc(ref)
  if (!snap.exists()) return false
  await deleteDoc(ref)
  return true
}

// ── ÓRDENES ──────────────────────────────────────────────────────────────────

export async function generateOrderId(): Promise<string> {
  const counterRef = doc(db, 'config', 'counters')
  let newCount = 1
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef)
    newCount = (snap.exists() ? (snap.data().orderCount ?? 0) : 0) + 1
    tx.set(counterRef, { orderCount: newCount }, { merge: true })
  })
  return `ORD-${String(newCount).padStart(3, '0')}`
}

export async function dbGetOrders(): Promise<Order[]> {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Order)
}

export async function dbGetOrder(id: string): Promise<Order | undefined> {
  const snap = await getDoc(doc(db, 'orders', id))
  if (!snap.exists()) return undefined
  return { id: snap.id, ...snap.data() } as Order
}

export async function dbCreateOrder(data: Omit<Order, 'id'>): Promise<Order> {
  const id = await generateOrderId()
  await setDoc(doc(db, 'orders', id), data)
  return { id, ...data }
}

export async function dbUpdateOrder(
  id: string,
  data: Partial<Pick<Order, 'status' | 'trackingNumber' | 'carrier'>>
): Promise<Order | null> {
  const ref = doc(db, 'orders', id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  await updateDoc(ref, data as Record<string, unknown>)
  return { id, ...snap.data(), ...data } as Order
}

// ── CONFIGURACIÓN ─────────────────────────────────────────────────────────────

export async function dbGetConfig(): Promise<StoreConfig> {
  const snap = await getDoc(doc(db, 'config', 'store'))
  if (!snap.exists()) return DEFAULT_CONFIG
  return { ...DEFAULT_CONFIG, ...snap.data() } as StoreConfig
}

export async function dbSaveConfig(data: Partial<StoreConfig>): Promise<StoreConfig> {
  const ref = doc(db, 'config', 'store')
  await setDoc(ref, data, { merge: true })
  const snap = await getDoc(ref)
  return { ...DEFAULT_CONFIG, ...snap.data() } as StoreConfig
}
