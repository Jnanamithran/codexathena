import PageHero    from '@/components/ui/PageHero'
import FAQSection  from '@/components/sections/FAQSection'
import ContactCTA  from '@/components/sections/ContactCTA'

export default function FAQ() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Common<br />questions"
        subtitle="Everything you might want to know before working with Dexena."
      />
      <FAQSection preview={false} />
      <ContactCTA />
    </>
  )
}
