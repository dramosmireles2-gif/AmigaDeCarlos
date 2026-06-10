'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/lib/types'

export default function ProductoCliente({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: product.price,
      color: selectedVariant.color,
      imageUrl: selectedVariant.images[0] ?? '/product-1.jpg',
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Selector de color */}
      {product.variants.length > 1 && (
        <div>
          <p className="text-xs tracking-widest uppercase mb-3 font-medium">
            Color: <span className="font-light normal-case tracking-normal">{selectedVariant.color}</span>
          </p>
          <div className="flex gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedVariant.id === v.id ? 'border-mare-dark scale-110' : 'border-stone-300 hover:border-stone-500'
                }`}
                style={{ backgroundColor: v.colorHex }}
                title={v.color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stock */}
      <p className="text-xs text-mare-gray">
        {selectedVariant.stock > 0
          ? selectedVariant.stock <= 3
            ? `¡Solo quedan ${selectedVariant.stock}!`
            : 'En stock'
          : 'Agotado'}
      </p>

      {/* Cantidad */}
      <div className="flex items-center gap-4">
        <p className="text-xs tracking-widest uppercase font-medium">Cantidad</p>
        <div className="flex items-center border border-stone-300">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            −
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(q => Math.min(selectedVariant.stock, q + 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={handleAddToCart}
        disabled={selectedVariant.stock === 0}
        className={`w-full py-4 text-xs tracking-widest uppercase transition-all duration-300 ${
          added
            ? 'bg-green-700 text-white'
            : selectedVariant.stock === 0
            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
            : 'bg-mare-dark text-white hover:bg-stone-800'
        }`}
      >
        {added ? '¡Agregado al carrito!' : selectedVariant.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
      </button>
    </div>
  )
}
