export interface Product {
  id: number
  name: string
  price: string
  category: string
  imageUrl: string
  imageAlt: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Oversized Noir Blazer',
    price: '€285',
    category: 'Outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Oversized black blazer on model',
  },
  {
    id: 2,
    name: 'Essential White Tee',
    price: '€65',
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Clean white t-shirt laid flat',
  },
  {
    id: 3,
    name: 'Cargo Beige Pants',
    price: '€195',
    category: 'Bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Beige cargo pants on model',
  },
  {
    id: 4,
    name: 'Minimal Black Dress',
    price: '€320',
    category: 'Dresses',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Minimal black dress on model',
  },
  {
    id: 5,
    name: 'Studio Grey Hoodie',
    price: '€145',
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Grey hoodie on model',
  },
  {
    id: 6,
    name: 'Sand Linen Set',
    price: '€240',
    category: 'Sets',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Sand colored linen co-ord set',
  },
]

export const NAV_LINKS = [
  { label: 'New In', href: '#collections' },
  { label: 'Collections', href: '#collections' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#newsletter' },
] satisfies { label: string; href: string }[]

export const MARQUEE_TEXT = 'NEW IN · SS26 COLLECTION · MARÉ · FREE RETURNS · MADE IN PORTUGAL · NEW IN · SS26 COLLECTION · MARÉ · FREE RETURNS · MADE IN PORTUGAL · '
