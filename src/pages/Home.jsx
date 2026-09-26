import Hero               from '@/components/sections/Hero'
import Marquee            from '@/components/ui/Marquee'
import ServicesGrid       from '@/components/sections/ServicesGrid'
import SelectedWork       from '@/components/sections/SelectedWork'
import WhyDexena          from '@/components/sections/WhyDexena'
import FiverrBanner       from '@/components/sections/FiverrBanner'
import TeamPreview        from '@/components/sections/TeamPreview'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection         from '@/components/sections/FAQSection'
import ContactCTA         from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesGrid />
      <Marquee reverse />
      <SelectedWork />
      <WhyDexena />
      <FiverrBanner />
      <TeamPreview />
      <TestimonialsSection />
      <FAQSection preview />
      <ContactCTA />
    </>
  )
}
