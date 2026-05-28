import Image from 'next/image'

export default function BrandStory() {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2">
      {/* Image — left */}
      <div className="relative h-[500px] md:h-auto min-h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&auto=format&fit=crop"
          alt="Craftsperson working with fabric — MARÉ atelier"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Text — right */}
      <div className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20 bg-stone-50">
        <p className="text-xs tracking-[0.5em] uppercase text-mare-gray mb-6">Our Story</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8">
          Crafted with intention.
        </h2>
        <p className="text-stone-600 leading-relaxed mb-6 font-light">
          MARÉ was born from a belief that clothing should outlast trends. Founded in 2019 in Lisbon, we work exclusively with certified sustainable mills in Portugal and Italy — places where craft is still passed down through generations.
        </p>
        <p className="text-stone-600 leading-relaxed mb-10 font-light">
          Every piece is designed with a single question in mind: will you still reach for this in ten years? Our answer, always, is yes.
        </p>
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-mare-dark" />
          <p className="font-serif text-lg italic text-stone-500">— Ana Ribeiro, Founder</p>
        </div>
      </div>
    </section>
  )
}
