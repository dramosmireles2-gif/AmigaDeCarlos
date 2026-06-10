import type { Category, Product } from './types'

export const CATEGORIES: Category[] = [
  { slug: 'bolsas', label: 'Bolsas', description: 'Bolsas para cada ocasión' },
  { slug: 'carteras', label: 'Carteras', description: 'Carteras y porta documentos' },
  { slug: 'joyeria', label: 'Joyería', description: 'Aretes, collares y pulseras' },
  { slug: 'accesorios', label: 'Accesorios', description: 'Cinturones, bufandas y más' },
]

export const NAV_LINKS = [
  { label: 'Nueva colección', href: '/productos?sort=new' },
  { label: 'Bolsas', href: '/productos/bolsas' },
  { label: 'Carteras', href: '/productos/carteras' },
  { label: 'Joyería', href: '/productos/joyeria' },
  { label: 'Accesorios', href: '/productos/accesorios' },
  { label: 'Ver todo', href: '/productos' },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'bolsa-mini-negro',
    name: 'Bolsa Mini Noir',
    price: 890,
    category: 'bolsas',
    description: 'Bolsa mini de cuero sintético premium. Perfecta para salidas nocturnas o del día a día.',
    isNew: true,
    variants: [
      { id: 1, color: 'Negro', colorHex: '#1A1A1A', stock: 5, images: ['/product-1.jpg'] },
      { id: 2, color: 'Hueso', colorHex: '#F5F0E8', stock: 3, images: ['/product-2.jpg'] },
    ],
  },
  {
    id: 2,
    slug: 'bolsa-tote-canvas',
    name: 'Tote Canvas Clásico',
    price: 650,
    comparePrice: 799,
    category: 'bolsas',
    description: 'Tote espacioso de canvas resistente. Ideal para el trabajo o el día a día.',
    isNew: false,
    variants: [
      { id: 3, color: 'Natural', colorHex: '#C9B99A', stock: 8, images: ['/product-3.jpg'] },
      { id: 4, color: 'Negro', colorHex: '#1A1A1A', stock: 4, images: ['/product-4.jpg'] },
    ],
  },
  {
    id: 3,
    slug: 'cartera-slim',
    name: 'Cartera Slim Minimalista',
    price: 420,
    category: 'carteras',
    description: 'Cartera delgada con espacio para tarjetas y billetes. Elegante y funcional.',
    isNew: true,
    variants: [
      { id: 5, color: 'Camel', colorHex: '#C19A6B', stock: 10, images: ['/product-5.jpg'] },
      { id: 6, color: 'Negro', colorHex: '#1A1A1A', stock: 6, images: ['/product-6.jpg'] },
    ],
  },
  {
    id: 4,
    slug: 'aretes-perla',
    name: 'Aretes Perla Clásica',
    price: 280,
    category: 'joyeria',
    description: 'Aretes de perla sintética en chapa de oro. Un clásico que nunca pasa de moda.',
    isNew: false,
    variants: [
      { id: 7, color: 'Oro', colorHex: '#D4AF37', stock: 15, images: ['/product-1.jpg'] },
      { id: 8, color: 'Plata', colorHex: '#C0C0C0', stock: 12, images: ['/product-2.jpg'] },
    ],
  },
  {
    id: 5,
    slug: 'collar-cadena-fina',
    name: 'Collar Cadena Fina',
    price: 320,
    category: 'joyeria',
    description: 'Collar de cadena fina en chapa de oro de 18k. Delicado y versátil.',
    isNew: true,
    variants: [
      { id: 9, color: 'Oro', colorHex: '#D4AF37', stock: 20, images: ['/product-3.jpg'] },
    ],
  },
  {
    id: 6,
    slug: 'cinturon-trenzado',
    name: 'Cinturón Trenzado',
    price: 380,
    comparePrice: 450,
    category: 'accesorios',
    description: 'Cinturón trenzado de cuero sintético. Detalle perfecto para cualquier outfit.',
    isNew: false,
    variants: [
      { id: 10, color: 'Camel', colorHex: '#C19A6B', stock: 7, images: ['/product-4.jpg'] },
      { id: 11, color: 'Negro', colorHex: '#1A1A1A', stock: 5, images: ['/product-5.jpg'] },
    ],
  },
]

export const MARQUEE_TEXT = 'NUEVA COLECCIÓN · ENVÍOS A MÉXICO Y USA · ACCESORIOS PARA MUJER · ENVÍO GRATIS +$999 · NUEVA COLECCIÓN · ENVÍOS A MÉXICO Y USA · ACCESORIOS PARA MUJER · ENVÍO GRATIS +$999 · '

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pendiente_pago: 'Pendiente de pago',
  pago_confirmado: 'Pago confirmado',
  en_preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}
