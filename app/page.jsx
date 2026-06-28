import Navbar from '@/components/Navbar.jsx'
import Hero from '@/components/Hero.jsx'
import PricingSection from '@/components/PricingSection.jsx'
import Features from '@/components/Features.jsx'
import Footer from '@/components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PricingSection />
        <Features />
      </main>
      <Footer />
    </>
  )
}
