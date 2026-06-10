export interface Category {
  slug: string
  label: string
  description?: string
}

export interface ProductVariant {
  id: number
  color: string
  colorHex: string
  stock: number
  images: string[]
}

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  comparePrice?: number
  category: string
  description: string
  isNew: boolean
  variants: ProductVariant[]
}

export interface CartItem {
  productId: number
  variantId: number
  name: string
  price: number
  color: string
  imageUrl: string
  quantity: number
}

export type OrderStatus =
  | 'pendiente_pago'
  | 'pago_confirmado'
  | 'en_preparacion'
  | 'enviado'
  | 'entregado'
  | 'cancelado'

export type PaymentMethod = 'tarjeta' | 'transferencia'

export interface ShippingAddress {
  name: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  country: 'MX' | 'US'
}

export interface Order {
  id: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  items: CartItem[]
  shipping: ShippingAddress
  subtotal: number
  shippingCost: number
  total: number
  trackingNumber?: string
  carrier?: string
  createdAt: string
}
