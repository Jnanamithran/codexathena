import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { services } from '@/data/services'

function ServiceCard({ svc, index, featured = false }) {
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 150, damping: 20 })
  const springY = useSpring(my, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)

  const onMove = e => {
    const rect = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width  - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
    spotX.set(((e.clientX - rect.left) / rect.width)  * 100)
    spotY.set(((e.clientY - rect.top)  / rect.height) * 100)
  }
  const onLeave = () => { mx.set(0); my.set(0); spotX.set(50); spotY.set(50) }

  return (
    <Reveal delay={index * 70} className={featured ? 'lg:col-span-2' : ''}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800, height: '100%' }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      >
        <Link
          to="/services"
          className={featured ? 'service-card-featured' : ''}
          style={{
            display: 'flex',
            flexDirection: featured ? 'row' : 'column',
            alignItems: featured ? 'center' : 'flex-start',
            gap: featured ? '3rem' : '0',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            background: svc.status === 'coming-soon' ? '#080808' : '#0A0A0A',
            border: '1px solid #1A1A1A',
            padding: '2rem',
          }}
        >
          {/* Spotlight */}
          <motion.div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: useTransform(
              [spotX, spotY],
              ([sx, sy]) => `radial-gradient(260px circle at ${sx}% ${sy}%, rgba(158,255,0,0.07), transparent 70%)`
            ),
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, flex: featured ? '0 0 auto' : '1' }}>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              style={{
                width: '2.75rem', height: '2.75rem',
                border: '1px solid #222',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', marginBottom: '1.5rem', color: '#F7F5F0',
              }}
            >
              {svc.icon}
            </motion.div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '1.0625rem', marginBottom: '0.75rem', color: '#F7F5F0' }}>
              {svc.title}
            </h3>
          </div>

          <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
            <p style={{ fontSize: '0.875rem', color: '#9A9A9A', lineHeight: 1.65, marginBottom: svc.status === 'coming-soon' ? '1rem' : 0 }}>
              {svc.short}
            </p>
            {svc.status === 'coming-soon' && (
              <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', border: '1px solid #2A2A2A', color: '#555' }}>
                Coming Soon
              </span>
            )}
          </div>

          {/* Arrow */}
          <motion.div
            initial={{ x: -8, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', color: '#9EFF00', fontSize: '1.1rem', zIndex: 1 }}
          >→</motion.div>

          {/* Bottom beam on hover */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#9EFF00', transformOrigin: 'left', zIndex: 2 }}
          />
        </Link>
      </motion.div>
    </Reveal>
  )
}

export default function ServicesGrid() {
  // Split: first 4 active services in a 4-col row, Game Dev spans full width as a featured strip
  const mainServices = services.filter(s => s.status === 'active')
  const comingSoon   = services.filter(s => s.status === 'coming-soon')

  return (
    <section id="services" style={{ padding: 'clamp(5rem,10vw,9rem) 0', background: '#0A0A0A' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>

        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
                Capabilities
              </h2>
            </div>
            <p style={{ color: '#9A9A9A', fontSize: '0.9375rem', maxWidth: '34ch', lineHeight: 1.65 }}>
              From pixels to polygons, from APIs to animations — we cover it all.
            </p>
          </div>
        </Reveal>

        {/* 4-col grid for active services */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: '#1A1A1A', marginBottom: '1px' }}>
          {mainServices.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>

        {/* Coming soon — full width strip, not a lonely small card */}
        {comingSoon.map((svc, i) => (
          <div key={svc.id} style={{ background: '#1A1A1A', padding: '1px 0 0 0' }}>
            <ServiceCard svc={svc} index={mainServices.length + i} featured />
          </div>
        ))}

      </div>
    </section>
  )
}
