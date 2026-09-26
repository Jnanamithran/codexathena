import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { projects, categoryColors, categoryLabels } from '@/data/projects'

function ProjectCard({ project }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 120, damping: 18 })
  const springY = useSpring(my, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const onMove = e => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width  - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
    glowX.set(((e.clientX - rect.left) / rect.width)  * 100)
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const grad  = categoryColors[project.category] ?? 'from-[#0A0A0A] to-[#111]'
  const label = categoryLabels[project.category] ?? '···'

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000, background: '#0D0D0D', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.015, zIndex: 10 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
    >
      {/* Glow */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: useTransform([glowX, glowY], ([gx, gy]) =>
          `radial-gradient(300px circle at ${gx}% ${gy}%, rgba(158,255,0,0.07), transparent 60%)`
        ),
      }} />

      {/* Thumb */}
      <div className={`relative aspect-video bg-gradient-to-br ${grad} flex flex-1 items-center justify-center overflow-hidden`} style={{ minHeight: 'clamp(10rem, 22vw, 20rem)' }}>
        {project.thumb
          ? <img src={project.thumb} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
          : (
            <span style={{
              fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '2.25rem',
              color: 'rgba(247,245,240,0.48)', border: '1px solid rgba(247,245,240,0.16)',
              padding: '0.6rem 1.25rem', letterSpacing: '0.08em',
            }}>{label}</span>
          )
        }
        {project.placeholder && (
          <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.15rem 0.4rem', background: 'rgba(0,0,0,0.7)', border: '1px solid #1A1A1A', color: '#555' }}>
            Demo
          </span>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
        >
          <motion.div initial={{ scale: 0.7, rotate: -15 }} whileHover={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300 }}>
            <ArrowUpRight size={28} color="#9EFF00" />
          </motion.div>
        </motion.div>
      </div>

      {/* Label */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <div>
          <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.2rem' }}>{project.title}</p>
          <p style={{ fontSize: '0.75rem', color: '#777' }}>{project.category} · {project.year}</p>
        </div>
        <motion.div
          whileHover={{ x: 3, y: -3 }}
          style={{ width: '1.875rem', height: '1.875rem', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', flexShrink: 0 }}
        >→</motion.div>
      </div>
    </motion.article>
  )
}

export default function SelectedWork() {
  // Show up to 5 projects in a clean masonry-style grid — no gaps
  const shown = projects.slice(0, 5)

  return (
    <section id="work" style={{ padding: 'clamp(5rem,10vw,9rem) 0', background: '#000' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>

        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
                Selected Work
              </h2>
            </div>
            <p style={{ color: '#9A9A9A', fontSize: '0.9375rem', maxWidth: '30ch', lineHeight: 1.65 }}>
              Built by Dexena. Projects replacing placeholders as we complete them.
            </p>
          </div>
        </Reveal>

        {/*
          Grid strategy: always fills completely
          Row 1 → project 0 (wide 7col) + project 1 (narrow 5col)
          Row 2 → project 2, 3, 4 equal thirds
          Result: zero empty cells regardless of count
        */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1A1A1A' }}>

          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '1px' }} className="responsive-work-row">
            {shown[0] && <Reveal><ProjectCard project={shown[0]} /></Reveal>}
            {shown[1] && <Reveal delay={100}><ProjectCard project={shown[1]} /></Reveal>}
          </div>

          {/* Row 2 — always 3 equal cols using exactly projects 2,3,4 */}
          {shown.length > 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' }} className="responsive-work-row responsive-work-grid">
              {shown[2] && <Reveal delay={50}><ProjectCard project={shown[2]} /></Reveal>}
              {shown[3] && <Reveal delay={120}><ProjectCard project={shown[3]} /></Reveal>}
              {shown[4] && <Reveal delay={190}><ProjectCard project={shown[4]} /></Reveal>}
            </div>
          )}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button to="/work" variant="ghost" size="lg">View All Work →</Button>
        </Reveal>

      </div>
    </section>
  )
}
