import { Globe } from 'lucide-react'
import PageHero   from '@/components/ui/PageHero'
import Reveal     from '@/components/ui/Reveal'
import ContactCTA from '@/components/sections/ContactCTA'
import { team }   from '@/data/team'

// Deterministic color per initial — keeps it visual without being random
const initialColors = {
  J: { bg: '#0A1A08', text: '#9EFF00' },
  V: { bg: '#0A0F1A', text: '#4A9EFF' },
  A: { bg: '#1A0A0A', text: '#FF9E4A' },
  S: { bg: '#0F0A1A', text: '#C44AFF' },
  default: { bg: '#1A1A0A', text: '#FFE04A' },
}

function Avatar({ initials, size = 'lg' }) {
  const colors = initialColors[initials] ?? initialColors.default
  const dim = size === 'lg' ? 'w-full h-full' : 'w-14 h-14'
  return (
    <div
      className={`${dim} flex items-center justify-center font-head font-bold select-none`}
      style={{ background: colors.bg, color: colors.text }}
    >
      <span style={{ fontSize: size === 'lg' ? 'clamp(2rem,6vw,3.5rem)' : '1.375rem' }}>
        {initials}
      </span>
    </div>
  )
}

function MemberCard({ member }) {
  return (
    <Reveal>
      <div className="group border border-border bg-surface2 hover:bg-surface3 transition-colors duration-200 overflow-hidden h-full flex flex-col">

        {/* Avatar */}
        <div className="aspect-[4/3] border-b border-border overflow-hidden">
          {member.photo
            ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
            : <Avatar initials={member.initials} size="lg" />
          }
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-head font-semibold text-[1.0625rem] mb-0.5">{member.name}</h3>
          <p className="text-accent text-[0.8125rem] mb-3">{member.role}</p>
          <p className="text-dim text-[0.8375rem] leading-relaxed mb-5 flex-1">{member.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {member.skills.map(s => (
              <span key={s} className="text-[0.65rem] font-medium tracking-[0.06em] uppercase px-2 py-0.5 border border-border text-dim">
                {s}
              </span>
            ))}
          </div>

          {/* Links — only rendered when available */}
          {member.portfolio && (
            <div className="flex gap-2 pt-4 border-t border-border">
              <a
                href={member.portfolio}
                aria-label="Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-border flex items-center justify-center text-dim hover:text-offwhite hover:border-dim transition-colors duration-200"
              >
                <Globe size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function Team() {
  return (
    <>
      <PageHero
        label="The Team"
        title="The people<br />behind Dexena"
        subtitle="Nine people bringing together engineering, AI, 3D, game development, content, and data — working as one team."
      />

      <section className="section-pad bg-surface">
        <div className="max-w-content mx-auto container-pad">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {team.map(m => <MemberCard key={m.id} member={m} />)}
          </div>
          <p className="text-[0.8rem] text-muted mt-6">
            Photos and social links will be added soon.
          </p>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
