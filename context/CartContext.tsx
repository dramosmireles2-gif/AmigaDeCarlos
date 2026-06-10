'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { CartItem } from '@/lib/types'

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (productId: number, variantId: number) => void
  updateQuantity: (productId: number, variantId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addItem = useCallback((newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.productId === newItem.productId && i.variantId === newItem.variantId
      )
      if (existing) {
        return prev.map(i =>
          i.productId === newItem.productId && i.variantId === newItem.variantId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      }
      return [...prev, newItem]
    })
  }, [])

  const removeItem = useCallback((productId: number, variantId: number) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)))
  }, [])

  const updateQuantity = useCallback((productId: number, variantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId)
      return
    }
    setItems(prev =>
      prev.map(i =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
