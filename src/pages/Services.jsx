import PageHero   from '@/components/ui/PageHero'
import Reveal      from '@/components/ui/Reveal'
import Button      from '@/components/ui/Button'
import ContactCTA  from '@/components/sections/ContactCTA'
import { services } from '@/data/services'
import { SITE }     from '@/data/siteConfig'

function ServiceDetail({ svc, index }) {
  const isEven = index % 2 === 0
  return (
    <section className={`section-pad border-b border-border ${isEven ? '' : 'bg-surface'}`}>
      <div className="max-w-content mx-auto container-pad">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>

          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 border border-border flex items-center justify-center text-xl">{svc.icon}</div>
              {svc.status === 'coming-soon' && (
                <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase px-2 py-1 border border-border text-muted">Coming Soon</span>
              )}
            </div>
            <h2 className="text-h2 font-head font-semibold mb-4">{svc.title}</h2>
            <p className="text-dim leading-[1.8] mb-6">{svc.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {svc.tech.map(t => (
                <span key={t} className="text-[0.7rem] font-medium tracking-[0.06em] uppercase px-3 py-1 border border-border text-dim">{t}</span>
              ))}
            </div>
            <Button href={`mailto:${SITE.email}`} variant={svc.status === 'coming-soon' ? 'ghost' : 'primary'} size="md">
              {svc.status === 'coming-soon' ? 'Get Notified' : 'Start a Project'}
            </Button>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-head text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-muted mb-4">What we deliver</p>
            <ul className="flex flex-col gap-0 border border-border">
              {svc.deliverables.map((d, i) => (
                <li key={d} className={`flex items-start gap-3 px-5 py-3.5 ${i < svc.deliverables.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                  <span className="text-[0.9rem] text-dim">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        label="Services"
        title="What we<br />can build"
        subtitle="Five disciplines, one team. Here's what we can do for you."
      />
      {services.map((svc, i) => (
        <ServiceDetail key={svc.id} svc={svc} index={i} />
      ))}
      <ContactCTA />
    </>
  )
}
