import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { SITE } from '@/data/siteConfig'

const gigs = [
  { title:'Custom Websites',        desc:'Full stack MERN web app or React frontend with modern UI', price:'₹8,053 / project' },
  { title:'Web Development',        desc:'Modern, responsive websites built to convert',             price:'From quote' },
  { title:'Unreal Engine Dev',      desc:'Immersive gaming experiences and interactive simulations', price:'From quote' },
]

// Animated border on the section
function AnimatedBorder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:0 }}>
      <motion.div
        initial={{ pathLength:0, opacity:0 }}
        animate={inView ? { pathLength:1, opacity:.4 } : {}}
        transition={{ duration:2.5, ease:'easeInOut' }}
        style={{ position:'absolute', inset:0 }}
      >
        <svg width="100%" height="100%" style={{ position:'absolute',inset:0 }}>
          <motion.rect
            x="1" y="1" width="calc(100% - 2)" height="calc(100% - 2)"
            rx="0" fill="none" stroke="#9EFF00" strokeWidth="1"
            initial={{ pathLength:0 }} animate={inView?{pathLength:1}:{}}
            transition={{ duration:2.5, ease:'easeInOut' }}
            style={{ pathLength: inView ? 1 : 0 }}
          />
        </svg>
      </motion.div>
    </div>
  )
}

export default function FiverrBanner() {
  return (
    <section id="fiverr" style={{ padding:'clamp(5rem,10vw,9rem) 0', background:'#050505', borderTop:'1px solid #1A1A1A', borderBottom:'1px solid #1A1A1A', position:'relative', overflow:'hidden' }}>

      {/* Animated border trace */}
      <AnimatedBorder />

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1.25rem,5vw,3rem)', position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap:'4rem', alignItems:'center' }}>

          <Reveal>
            <div style={{ display:'inline-flex',alignItems:'center',gap:'.5rem',border:'1px solid #1A1A1A',padding:'.4rem .875rem',fontSize:'.7rem',color:'#555',marginBottom:'1.5rem' }}>
              <span style={{ color:'#9EFF00',fontSize:'.6rem' }}>✦</span>
              Available as {SITE.fiverr.handle}
            </div>
            <h2 style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'clamp(2rem,4vw,3.5rem)',lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:'1rem' }}>
              Find us<br/>on Fiverr
            </h2>
            <p style={{ color:'#9A9A9A',lineHeight:1.75,marginBottom:'2rem',maxWidth:'42ch' }}>
              Same team, same quality — choose the platform that works best for you. Fiverr gives you built-in payment protection and dispute resolution.
            </p>
            <div style={{ display:'flex',gap:'1rem',flexWrap:'wrap' }}>
              <Button href={SITE.fiverr.url} variant="primary" size="md" target="_blank" rel="noopener noreferrer">
                View Dexena on Fiverr
              </Button>
              <Button href={`mailto:${SITE.email}`} variant="ghost" size="md">Email Directly</Button>
            </div>
          </Reveal>

          {/* Gig cards with stagger */}
          <Reveal delay={150}>
            <div style={{ border:'1px solid #1A1A1A', padding:'1.5rem', display:'flex', flexDirection:'column', gap:'.75rem' }}>
              <p style={{ fontFamily:'Space Grotesk',fontSize:'.7rem',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'#444',marginBottom:'.25rem' }}>Active Gigs</p>
              {gigs.map((gig, i) => (
                <motion.a key={gig.title} href={SITE.fiverr.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                  transition={{ delay: i*.12, duration:.5, ease:[.25,.1,.25,1] }}
                  whileHover={{ x:6, borderColor:'#333' }}
                  style={{ display:'block',border:'1px solid #1A1A1A',padding:'1rem 1.25rem',textDecoration:'none',transition:'border-color .2s' }}>
                  <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'1rem' }}>
                    <div>
                      <p style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'.9375rem',marginBottom:'.2rem',color:'#F7F5F0' }}>{gig.title}</p>
                      <p style={{ fontSize:'.8rem',color:'#666',marginBottom:'.4rem' }}>{gig.desc}</p>
                      <p style={{ fontSize:'.75rem',color:'#9EFF00',fontWeight:500 }}>{gig.price}</p>
                    </div>
                    <motion.span whileHover={{ x:3,y:-3 }} style={{ color:'#444',flexShrink:0,marginTop:2,fontSize:'1rem' }}>→</motion.span>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
