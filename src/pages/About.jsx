import PageHero from '@/components/ui/PageHero'
import Reveal    from '@/components/ui/Reveal'
import Button    from '@/components/ui/Button'
import { SITE }  from '@/data/siteConfig'

const disciplines = ['Web Development', 'Full-Stack Engineering', '3D & Blender', 'Video Editing', 'Game Development']

export default function About() {
  return (
    <>
      <PageHero
        label="About Dexena"
        title="One team.<br />Every layer."
        subtitle="A digital creative team built at the intersection of code, design, 3D, and video — working as one unit, not five freelancers."
      />

      <section className="section-pad bg-surface">
        <div className="max-w-content mx-auto container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <Reveal>
              <h2 className="text-h2 font-head font-semibold mb-6">What Dexena is</h2>
              <p className="text-dim leading-[1.8] mb-4">
                Dexena is a small team of people who met through a shared interest in building digital things —
                and decided to formalize that into something real. We work across web development, full-stack
                engineering, 3D work in Blender, video editing, and game development.
              </p>
              <p className="text-dim leading-[1.8] mb-4">
                The name is new. The work isn't. Each person on the team brings a specific craft they've been
                developing independently, and Dexena is where that work comes together under one identity.
              </p>
              <p className="text-dim leading-[1.8]">
                We're not trying to be everything to everyone. We're building a reputation for doing good work
                in the disciplines we've chosen, and expanding carefully from there.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-h2 font-head font-semibold mb-6">What we work on</h2>
              <div className="flex flex-col gap-0 border border-border">
                {disciplines.map((d, i) => (
                  <div key={d} className={`flex items-center gap-4 px-5 py-4 ${i < disciplines.length - 1 ? 'border-b border-border' : ''}`}>
                    <span className="text-accent text-sm">◈</span>
                    <span className="font-head font-medium text-[0.9375rem]">{d}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.8rem] text-muted mt-3">Game development is currently being built out.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-content mx-auto container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <Reveal>
              <h2 className="text-h2 font-head font-semibold mb-6">Our approach</h2>
              <p className="text-dim leading-[1.8] mb-4">
                We treat every project as a design and engineering problem, not a delivery exercise.
                That means understanding what you're actually trying to achieve before writing a single line
                of code or opening a file.
              </p>
              <p className="text-dim leading-[1.8] mb-4">
                We communicate directly. You'll know what's happening, why decisions were made, and what's
                coming next. We don't hide behind timelines and vague updates.
              </p>
              <p className="text-dim leading-[1.8]">
                We're careful about what we take on. If we're not the right fit for something, we'll say so.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-h2 font-head font-semibold mb-6">Where we're headed</h2>
              <p className="text-dim leading-[1.8] mb-4">
                Right now we're establishing Dexena as a reliable team for the services we currently offer.
                Game development is the next capability we're formally adding.
              </p>
              <p className="text-dim leading-[1.8] mb-8">
                Longer term, we want to build toward larger and more complex projects — things that require
                the full breadth of what we can do together, rather than individual services in isolation.
              </p>
              <Button href={`mailto:${SITE.email}`} variant="primary" size="md">Work With Us</Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
