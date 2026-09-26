import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from '@/components/ui/CountUp'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SITE } from '@/data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { n:'01', title:'Cross-discipline team',  body:"Code, design, 3D, and video under one roof — fewer handoffs, faster decisions, coherent output." },
  { n:'02', title:'Custom over template',    body:"We don't build from kits. Every project starts from your requirements, not a theme we dressed differently." },
  { n:'03', title:'Direct communication',   body:"You talk to the people building. No account managers, no lost context, no telephone chain." },
  { n:'04', title:'Attention to detail',    body:"We notice the things most people skip — spacing, transitions, edge cases, the feeling of the thing." },
]

const stats = [
  { n:7,   suffix:'',  label:'Team Members' },
  { n:5,   suffix:'+', label:'Core Services' },
  { n:100, suffix:'%', label:'Commitment' },
  { n:1,   suffix:'',  label:'Team Always' },
]

export default function WhyDexena() {
  const h2Ref = useRef(null)

  useEffect(() => {
    // GSAP char-by-char reveal on the big heading
    if (!h2Ref.current) return
    const chars = h2Ref.current.querySelectorAll('.char')
    if (chars.length === 0) return
    gsap.fromTo(chars,
      { opacity: 0, y: 40, rotateX: -90 },
      { opacity: 1, y: 0,  rotateX: 0,
        duration: .7, stagger: .04, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: h2Ref.current, start: 'top 80%' }
      }
    )
  }, [])

  const splitText = (text) => text.split('').map((ch, i) => (
    <span key={i} className="char" style={{ display:'inline-block', transformOrigin:'top center' }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  return (
    <section id="about" style={{ background:'#0A0A0A', padding:'clamp(5rem,10vw,9rem) 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1.25rem,5vw,3rem)' }}>

        {/* Animated stats strip */}
        <Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, border:'1px solid #1A1A1A', marginBottom:'clamp(4rem,8vw,7rem)' }}
            className="responsive-stats">
            {stats.map((s,i) => (
              <div key={s.label} style={{ padding:'2rem', borderRight: i<stats.length-1?'1px solid #1A1A1A':'none', textAlign:'center' }}
                className="responsive-stat-cell">
                <div style={{ fontFamily:'Space Grotesk', fontWeight:700, fontSize:'clamp(2rem,4vw,3rem)', color:'#9EFF00', lineHeight:1, letterSpacing:'-0.02em' }}>
                  <CountUp to={s.n} suffix={s.suffix} duration={1600}/>
                </div>
                <div style={{ fontFamily:'Space Grotesk', fontSize:'.7rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'#555', marginTop:'.5rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap:'5rem' }}>

          {/* Left */}
          <div>
            <SectionLabel>Why Dexena</SectionLabel>
            <h2 ref={h2Ref} style={{ fontFamily:'Space Grotesk', fontWeight:600, fontSize:'clamp(2rem,4vw,3.5rem)', lineHeight:1.1, letterSpacing:'-0.02em', marginTop:'.75rem', marginBottom:'1.5rem', perspective:600 }}>
              {splitText('One team.')}
              <br/>
              {splitText('Every layer.')}
            </h2>
            <p style={{ color:'#9A9A9A', lineHeight:1.8, marginBottom:'1rem' }}>
              Most teams do one thing. Dexena was built differently — a group of people with complementary skills who work together as one unit.
            </p>
            <p style={{ color:'#9A9A9A', lineHeight:1.8, marginBottom:'2rem' }}>
              Development, design, 3D, and video all sit at the same table. Your project doesn't get passed between strangers.
            </p>
            <Button href={`mailto:${SITE.email}`} variant="ghost" size="md">Start a Conversation</Button>
          </div>

          {/* Right — reasons with slide on hover */}
          <div>
            {reasons.map((r,i) => (
              <Reveal key={r.n} delay={i*70}>
                <motion.div
                  whileHover={{ x:8, borderColor:'#2A2A2A' }}
                  transition={{ type:'spring', stiffness:280 }}
                  style={{ display:'grid', gridTemplateColumns:'2.5rem 1fr', gap:'1rem', padding:'1.5rem 0', borderBottom:'1px solid #1A1A1A', cursor:'default' }}>
                  <span style={{ fontFamily:'Space Grotesk', fontSize:'.7rem', fontWeight:600, color:'#9EFF00', paddingTop:'.15rem' }}>{r.n}</span>
                  <div>
                    <h4 style={{ fontFamily:'Space Grotesk', fontWeight:600, fontSize:'1rem', marginBottom:'.4rem' }}>{r.title}</h4>
                    <p style={{ fontSize:'.875rem', color:'#9A9A9A', lineHeight:1.65 }}>{r.body}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
