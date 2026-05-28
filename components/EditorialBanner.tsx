import Image from 'next/image'
import Link from 'next/link'

export default function EditorialBanner() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1440&q=80&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover object-top"
        sizes="100vw"
      />
      {/* Gradient overlay — left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

      {/* Text content — left aligned */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-32">
        <p className="text-white/70 text-xs tracking-[0.5em] uppercase mb-4">Editorial</p>
        <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-6 max-w-lg leading-tight">
          The SS26 Edit
        </h2>
        <p className="text-white/80 text-sm md:text-base font-light mb-10 max-w-sm leading-relaxed">
          Designed for those who move in silence.
        </p>
        <Link
          href="#collections"
          className="text-white text-xs tracking-[0.3em] uppercase border-b border-white/60 pb-1 w-fit hover:border-white transition-colors"
        >
          Explore Collection →
        </Link>
      </div>
    </section>
  )
}
