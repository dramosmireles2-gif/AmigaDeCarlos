import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&auto=format&fit=crop"
        alt="MARÉ SS26 Collection — model in minimalist fashion"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <p className="text-xs tracking-[0.5em] uppercase mb-6 font-light">
          New Collection
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8">
          MARÉ SS26
        </h1>
        <p className="text-sm tracking-widest uppercase mb-12 text-white/80 font-light">
          Wear the silence.
        </p>
        <Link
          href="#collections"
          className="border border-white text-white text-xs tracking-[0.3em] uppercase px-12 py-4 hover:bg-white hover:text-mare-dark transition-all duration-300"
        >
          Shop Now →
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  )
}
