import { MARQUEE_TEXT } from '@/lib/data'

export default function MarqueeBanner() {
  return (
    <section className="bg-mare-dark py-5 overflow-hidden" aria-label="Marquee banner">
      <div className="flex w-max animate-marquee">
        {/* Render twice for seamless loop */}
        <span className="text-white text-xs tracking-[0.4em] uppercase whitespace-nowrap pr-0">
          {MARQUEE_TEXT}
        </span>
        <span className="text-white text-xs tracking-[0.4em] uppercase whitespace-nowrap" aria-hidden="true">
          {MARQUEE_TEXT}
        </span>
      </div>
    </section>
  )
}
