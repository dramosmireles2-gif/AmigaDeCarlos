import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedCollection from '@/components/FeaturedCollection'
import MarqueeBanner from '@/components/MarqueeBanner'
import EditorialBanner from '@/components/EditorialBanner'
import BrandStory from '@/components/BrandStory'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedCollection />
      <MarqueeBanner />
      <EditorialBanner />
      <BrandStory />
      <Newsletter />
      <Footer />
    </main>
  )
}
