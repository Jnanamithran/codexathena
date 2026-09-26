import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SITE } from '@/data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

// Animated background grid that reveals on scroll
function GridReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const lines = ref.current?.querySelectorAll('line')
    if (!lines?.length) return
    gsap.fromTo(lines,
      { opacity: 0 },
      { opacity: 1, duration: .4, stagger: { each: .03, from: 'random' }, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
    )
  }, [])
  const cols = 12, rows = 6
  const W = 1280, H = 320
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
      style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:.07 }}>
      {Array.from({ length: cols+1 }, (_,i) => (
        <line key={`v${i}`} x1={i*(W/cols)} y1={0} x2={i*(W/cols)} y2={H} stroke="#9EFF00" strokeWidth=".5"/>
      ))}
      {Array.from({ length: rows+1 }, (_,i) => (
        <line key={`h${i}`} x1={0} y1={i*(H/rows)} x2={W} y2={i*(H/rows)} stroke="#9EFF00" strokeWidth=".5"/>
      ))}
    </svg>
  )
}

export default function ContactCTA() {
  const emailRef = useRef(null)
  const inView = useInView(emailRef, { once: true })

  return (
    <section id="contact" style={{ borderTop:'1px solid #1A1A1A', padding:'clamp(5rem,10vw,9rem) 0', background:'#000', position:'relative', overflow:'hidden' }}>

      <GridReveal />

      {/* Big glow behind email */}
      <motion.div
        animate={{ scale:[1,1.1,1], opacity:[.08,.16,.08] }}
        transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:600,height:300,borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(158,255,0,.2) 0%,transparent 70%)',
          pointerEvents:'none',zIndex:0 }}
      />

      <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 clamp(1.25rem,5vw,3rem)',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',position:'relative',zIndex:1 }}>
        <Reveal>
          <SectionLabel className="text-center">Get in Touch</SectionLabel>

          <h2 style={{ fontFamily:'Space Grotesk',fontWeight:700,fontSize:'clamp(2rem,5vw,4rem)',lineHeight:1.05,letterSpacing:'-0.03em',margin:'.75rem 0 1.25rem' }}>
            Let's build<br/>something together
          </h2>

          <p style={{ color:'#9A9A9A',fontSize:'1.0625rem',lineHeight:1.75,maxWidth:'46ch',marginBottom:'2.5rem',textAlign:'center' }}>
            Have a project in mind? We're straightforward to reach and quick to respond.
          </p>

          {/* Email — animated underline draw */}
          <div ref={emailRef} style={{ position:'relative',marginBottom:'2.5rem',display:'inline-block' }}>
            <motion.a href={`mailto:${SITE.email}`}
              whileHover={{ color:'#9EFF00' }}
              style={{ display:'inline-block',fontFamily:'Space Grotesk',fontWeight:700,
                fontSize:'clamp(1.1rem,2.5vw,1.875rem)',color:'#F7F5F0',letterSpacing:'-0.01em',
                transition:'color .2s',position:'relative' }}>
              {SITE.email}
              {/* Underline draw on scroll-into-view */}
              <motion.span
                initial={{ scaleX:0 }} animate={inView?{ scaleX:1 }:{}}
                transition={{ duration:.9, delay:.3, ease:[.25,.1,.25,1] }}
                style={{ position:'absolute',bottom:-4,left:0,right:0,height:2,
                  background:'linear-gradient(90deg,#9EFF00,rgba(158,255,0,.3))',
                  transformOrigin:'left',display:'block' }}
              />
            </motion.a>
          </div>

          {/* Sub-brand */}
          <p style={{ fontSize:'.75rem',color:'#333',marginBottom:'2rem',letterSpacing:'.08em',fontFamily:'Space Grotesk',textTransform:'uppercase' }}>
            Dexena · {SITE.fullName}
          </p>

          {/* Magnetic CTAs */}
          <div style={{ display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center' }}>
            <Button href={`mailto:${SITE.email}`} size="lg">Send a Message</Button>
            <Button href={SITE.fiverr.url} variant="ghost" size="lg" target="_blank" rel="noopener noreferrer">
              View on Fiverr
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
