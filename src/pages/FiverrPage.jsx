import PageHero  from '@/components/ui/PageHero'
import Reveal    from '@/components/ui/Reveal'
import Button    from '@/components/ui/Button'
import ContactCTA from '@/components/sections/ContactCTA'
import { SITE }  from '@/data/siteConfig'
import { services } from '@/data/services'

export default function FiverrPage() {
  const active = services.filter(s => s.status === 'active')

  return (
    <>
      <PageHero
        label="Fiverr"
        title="Find us on<br />Fiverr"
        subtitle="Dexena is available through Fiverr for clients who prefer that platform. Same team, same quality — your choice of how we work together."
      />

      <section className="section-pad bg-surface">
        <div className="max-w-content mx-auto container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <h2 className="text-h2 font-head font-semibold mb-5">Why Fiverr</h2>
              <p className="text-dim leading-[1.8] mb-4">
                Fiverr gives clients a familiar, secure way to hire and pay. It handles contracts,
                payments, and dispute resolution, so you can engage with Dexena through a platform
                you already trust.
              </p>
              <p className="text-dim leading-[1.8] mb-8">
                Our Fiverr profile is {SITE.fiverr.handle}. You'll find our gigs listed there
                with current pricing and availability. For larger or more complex projects, direct
                contact is often more efficient.
              </p>
              <Button href={SITE.fiverr.url} variant="primary" size="lg">View Dexena on Fiverr</Button>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-head font-semibold text-[1.25rem] mb-5 text-dim">Available Gigs</h2>
              <div className="flex flex-col gap-3">
                {active.map(svc => (
                  <a key={svc.id} href={SITE.fiverr.url} className="block border border-border p-5 hover:border-dim transition-colors duration-200 group">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-head font-semibold text-[0.9375rem] mb-1">{svc.title}</p>
                        <p className="text-[0.8rem] text-dim leading-relaxed mb-2">{svc.short}</p>
                        <p className="text-[0.75rem] text-muted">Starting from $— · Link coming soon</p>
                      </div>
                      <span className="text-muted group-hover:text-accent transition-colors duration-200 flex-shrink-0 mt-1">→</span>
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-[0.75rem] text-muted mt-4">Pricing and gig links will be added once our Fiverr profile is published.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
