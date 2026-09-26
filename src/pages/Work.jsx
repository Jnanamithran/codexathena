import { useState }  from 'react'
import { ArrowUpRight } from 'lucide-react'
import PageHero        from '@/components/ui/PageHero'
import Reveal          from '@/components/ui/Reveal'
import ContactCTA      from '@/components/sections/ContactCTA'
import { projects, categoryColors, categoryLabels } from '@/data/projects'

const allCategories = ['All', ...new Set(projects.map(p => p.category))]

function ProjectCard({ project }) {
  const gradClass = categoryColors[project.category] ?? 'from-surface2 to-surface3'
  const label     = categoryLabels[project.category] ?? '···'

  return (
    <Reveal>
      <article className="group bg-surface2 border border-border hover:border-dim transition-colors duration-200 overflow-hidden cursor-pointer">
        <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradClass} flex items-center justify-center overflow-hidden`}>
          {project.thumb
            ? <img src={project.thumb} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
            : <span className="font-head font-bold text-3xl text-offwhite/20 border border-offwhite/10 px-5 py-3 tracking-[0.06em]">{label}</span>
          }
          {project.placeholder && (
            <span className="absolute top-3 left-3 text-[0.65rem] font-semibold tracking-[0.08em] uppercase px-2 py-1 bg-black/70 border border-border text-muted">Demo</span>
          )}
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ArrowUpRight size={26} className="text-accent" />
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-head font-semibold text-[0.9375rem] mb-1">{project.title}</p>
              <p className="text-[0.8rem] text-muted mb-3">{project.category}</p>
              <p className="text-[0.8375rem] text-dim leading-relaxed">{project.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map(t => (
              <span key={t} className="text-[0.65rem] font-medium tracking-[0.05em] uppercase px-2 py-0.5 border border-border text-dim">{t}</span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Work() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Our work"
        subtitle="Projects we've built across web, 3D, full-stack and video. Real projects will replace these placeholders as we complete them."
      />

      <section className="section-pad">
        <div className="max-w-content mx-auto container-pad">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-head text-[0.78rem] font-semibold tracking-wide px-4 py-2 border transition-colors duration-200 ${
                  active === cat
                    ? 'border-accent text-accent'
                    : 'border-border text-dim hover:border-dim hover:text-offwhite'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>

        </div>
      </section>

      <ContactCTA />
    </>
  )
}
