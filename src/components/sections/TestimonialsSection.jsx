import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { testimonials } from '@/data/testimonials'
import { SITE } from '@/data/siteConfig'

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ border: '1px solid #1A1A1A', padding: '1.75rem', background: '#0A0A0A', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '0.2rem' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: '#9EFF00', fontSize: '0.75rem' }}>★</span>
        ))}
      </div>
      <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#F7F5F0', flex: 1 }}>"{t.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1rem', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ width: '2.25rem', height: '2.25rem', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.875rem', background: '#111', flexShrink: 0 }}>
          {t.name[0]}
        </div>
        <div>
          <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</p>
          {t.role && <p style={{ fontSize: '0.75rem', color: '#555' }}>{t.role}</p>}
        </div>
        {t.service && (
          <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', border: '1px solid #1A1A1A', padding: '0.15rem 0.4rem' }}>
            {t.service}
          </span>
        )}
      </div>
    </motion.div>
  )
}

// Empty state — compact, intentional, not a big hollow box
function EmptyState() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: '#1A1A1A' }}>

      {/* Left — message */}
      <div style={{ background: '#0A0A0A', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: '#2A2A2A', fontSize: '0.85rem' }}>★</span>
          ))}
        </div>
        <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '1.25rem', color: '#F7F5F0', lineHeight: 1.3 }}>
          Real reviews,<br />incoming.
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, maxWidth: '32ch' }}>
          We don't fake reviews. Client testimonials will appear here as Dexena completes projects. Only real ones.
        </p>
        <Button href={`mailto:${SITE.email}`} variant="ghost" size="sm" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}>
          Be our first client
        </Button>
      </div>

      {/* Right — placeholder cards (clearly marked) */}
      <div style={{ background: '#060606', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { name: 'Your Name', role: 'Your Company', text: 'This is where your review goes after working with Dexena.' },
          { name: 'Client Name', role: 'Project Type', text: 'Real feedback from real projects. Leave yours after we work together.' },
        ].map((p, i) => (
          <div key={i} style={{ border: '1px dashed #1A1A1A', padding: '1.25rem', opacity: 0.45 }}>
            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.6rem' }}>
              {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#333', fontSize: '0.7rem' }}>★</span>)}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.6, marginBottom: '0.75rem' }}>"{p.text}"</p>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>{p.name}</p>
            <p style={{ fontSize: '0.72rem', color: '#333' }}>{p.role}</p>
          </div>
        ))}
        <p style={{ fontSize: '0.65rem', color: '#333', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Space Grotesk', fontWeight: 600 }}>
          — Placeholder preview —
        </p>
      </div>

    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: 'clamp(5rem,10vw,9rem) 0', background: '#000' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>

        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div>
              <SectionLabel>Client Feedback</SectionLabel>
              <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
                Testimonials
              </h2>
            </div>
            {testimonials.length > 0 && (
              <p style={{ fontSize: '0.875rem', color: '#666' }}>{testimonials.length} verified review{testimonials.length > 1 ? 's' : ''}</p>
            )}
          </div>
        </Reveal>

        <Reveal>
          {testimonials.length === 0
            ? <EmptyState />
            : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: '#1A1A1A' }}>
                {testimonials.map((t, i) => (
                  <div key={t.id} style={{ background: '#0A0A0A' }}>
                    <TestimonialCard t={t} />
                  </div>
                ))}
              </div>
            )
          }
        </Reveal>

      </div>
    </section>
  )
}
