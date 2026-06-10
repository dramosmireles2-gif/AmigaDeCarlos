import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const firstVariant = product.variants[0]
  const imageUrl = firstVariant?.images[0] ?? '/product-1.jpg'
  const hoverImage = firstVariant?.images[1] ?? firstVariant?.images[0] ?? '/product-1.jpg'
  const hasDiscount = product.comparePrice && product.comparePrice > product.price

  return (
    <Link href={`/productos/${product.category}/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <Image
          src={hoverImage}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-mare-dark text-white text-[10px] tracking-widest uppercase px-2 py-1">
            Nuevo
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] tracking-widest uppercase px-2 py-1">
            Sale
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase text-mare-gray">{product.category}</p>
        <h3 className="text-sm font-light">{product.name}</h3>

        <div className="flex items-center gap-2">
          <p className="text-sm">${product.price.toLocaleString('es-MX')} MXN</p>
          {hasDiscount && (
            <p className="text-xs text-stone-400 line-through">${product.comparePrice!.toLocaleString('es-MX')}</p>
          )}
        </div>

        {product.variants.length > 1 && (
          <div className="flex gap-1.5 pt-1">
            {product.variants.map((v) => (
              <span
                key={v.id}
                className="w-3 h-3 rounded-full border border-stone-300"
                style={{ backgroundColor: v.colorHex }}
                title={v.color}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
