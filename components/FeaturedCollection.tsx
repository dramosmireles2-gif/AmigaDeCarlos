import Image from 'next/image'
import { PRODUCTS } from '@/lib/data'

export default function FeaturedCollection() {
  return (
    <section id="collections" className="py-24 px-6 bg-mare-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-mare-gray mb-4">SS26</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Featured Pieces</h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                {/* Quick view reveal */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs tracking-widest uppercase text-center text-mare-dark">
                    Quick View
                  </p>
                </div>
              </div>

              {/* Product info */}
              <div className="px-1">
                <p className="text-[10px] tracking-widest uppercase text-mare-gray mb-1">{product.category}</p>
                <p className="font-serif text-lg font-light">{product.name}</p>
                <p className="text-sm text-stone-500 mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16">
          <button className="border border-mare-dark text-mare-dark text-xs tracking-[0.3em] uppercase px-12 py-4 hover:bg-mare-dark hover:text-white transition-all duration-300">
            View All Pieces
          </button>
        </div>
      </div>
    </section>
  )
}
