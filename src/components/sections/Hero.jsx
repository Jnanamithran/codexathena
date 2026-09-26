import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE } from '@/data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

// ── Particle canvas ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvas = useRef(null)
  useEffect(() => {
    const c = canvas.current; if (!c) return
    const ctx = c.getContext('2d')
    let W = c.width = window.innerWidth
    let H = c.height = window.innerHeight
    let raf, mx = W / 2, my = H / 2

    const N = Math.min(90, Math.floor(W * H / 14000))
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .4, a: Math.random() * .6 + .1,
    }))

    const onMove = e => { mx = e.clientX; my = e.clientY }
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx*dx+dy*dy)
        if (d < 130) { p.vx += dx/d*.04; p.vy += dy/d*.04 }
        p.x += p.vx; p.y += p.vy
        p.vx *= .985; p.vy *= .985
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(158,255,0,${Math.min(.9, p.a + .2)})`; ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy)
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle = `rgba(158,255,0,${.16*(1-d/120)})`; ctx.lineWidth=.7; ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove',onMove); window.removeEventListener('resize',onResize) }
  }, [])
  return <canvas ref={canvas} style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.9 }}/>
}

// ── Magnetic button ──────────────────────────────────────────────────────────
function MagneticBtn({ children, href, to, style, className }) {
  const ref = useRef(null)
  const x = useSpring(0,{ stiffness:220, damping:22 })
  const y = useSpring(0,{ stiffness:220, damping:22 })
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width/2) * .38)
    y.set((e.clientY - r.top  - r.height/2) * .38)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  const El = to ? Link : 'a'
  const props = to ? { to } : { href }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x, y, display:'inline-block' }}>
      <El {...props} style={style} className={className}>{children}</El>
    </motion.div>
  )
}

// ── Animated counter ─────────────────────────────────────────────────────────
function Stat({ n, label }) {
  const el = useRef(null)
  useEffect(() => {
    gsap.fromTo(el.current, { textContent: 0 }, {
      textContent: n, duration: 1.8, ease: 'power2.out', delay: 1.8,
      snap: { textContent: 1 },
      onUpdate() { el.current && (el.current.textContent = Math.round(+el.current.textContent)) }
    })
  }, [n])
  return (
    <div>
      <div style={{ fontFamily:'Space Grotesk', fontWeight:700, fontSize:'clamp(1.75rem,3.5vw,2.5rem)', color:'#F7F5F0', lineHeight:1, letterSpacing:'-0.02em' }}>
        <span ref={el}>0</span>
        {typeof n === 'string' && n.includes('%') ? '%' : n > 5 ? '+' : ''}
      </div>
      <div style={{ fontFamily:'Space Grotesk', fontSize:'0.7rem', fontWeight:500, color:'#555', marginTop:'.35rem', letterSpacing:'.1em', textTransform:'uppercase' }}>{label}</div>
    </div>
  )
}

const subtitleWords = ['digital','experiences','through','code,','creativity','&','technology.']

export default function Hero() {
  const [ready,    setReady]    = useState(false)
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 80)

    // GSAP: subtle parallax on the headline as user scrolls
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        y: -60, opacity: .3,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }
    return () => { clearTimeout(t1) }
  }, [])

  return (
    <section ref={sectionRef} style={{ position:'relative', minHeight:'100svh', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden', background:'radial-gradient(circle at 72% 22%, rgba(158,255,0,.07), transparent 30%), #000' }}>

      {/* Slow ambient movement keeps the hero alive without interaction. */}
      <motion.div
        animate={{ x:['-4%','4%','-4%'], y:['-2%','3%','-2%'], scale:[1,1.08,1] }}
        transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', inset:'-12%', pointerEvents:'none', zIndex:0,
          background:'radial-gradient(ellipse at 25% 35%, rgba(158,255,0,.13), transparent 36%), radial-gradient(ellipse at 78% 64%, rgba(40,120,70,.11), transparent 40%), radial-gradient(ellipse at 55% 100%, rgba(20,70,45,.1), transparent 42%)', filter:'blur(18px)' }}
      />

      <ParticleField />

      {/* Radial vignette */}
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 82% 82% at 50% 48%,transparent 42%,rgba(0,0,0,.92) 100%)',pointerEvents:'none',zIndex:1 }}/>

      {/* Film grain */}
      <div style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none',opacity:.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'128px' }}/>

      {/* Glowing orbs */}
      <motion.div animate={{ scale:[1,1.18,1], opacity:[.12,.22,.12] }} transition={{ duration:7, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute',top:'-8%',right:'-4%',width:640,height:640,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(158,255,0,.24) 0%,rgba(158,255,0,.08) 35%,transparent 72%)',pointerEvents:'none',zIndex:1 }}/>
      <motion.div animate={{ scale:[1,1.25,1], opacity:[.07,.15,.07] }} transition={{ duration:9, repeat:Infinity, ease:'easeInOut', delay:2.5 }}
        style={{ position:'absolute',bottom:'-12%',left:'-8%',width:520,height:520,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(74,158,255,.1) 0%,transparent 70%)',pointerEvents:'none',zIndex:1 }}/>

      {/* Content */}
      <div ref={headlineRef} style={{ position:'relative',zIndex:2,maxWidth:1280,margin:'0 auto',padding:'0 clamp(1.25rem,5vw,3rem)',width:'100%',paddingTop:'7rem',paddingBottom:'5rem' }}>

        {/* Tag */}
        <motion.div initial={{ opacity:0,y:20 }} animate={ready?{opacity:1,y:0}:{}} transition={{ duration:.6,delay:.1 }}
          style={{ display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'2.5rem' }}>
          <span style={{ width:'2.5rem',height:'1px',background:'#9EFF00',display:'block' }}/>
          <span style={{ fontFamily:'Space Grotesk',fontSize:'.7rem',fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',color:'#9EFF00' }}>
            Digital Creative Agency — India
          </span>
          <span style={{ display:'flex',alignItems:'center',gap:'.3rem',marginLeft:'.4rem' }}>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#9EFF00',animation:'blink 1.4s ease infinite',display:'block' }}/>
            <span style={{ fontFamily:'Space Grotesk',fontSize:'.65rem',color:'#555',letterSpacing:'.08em',textTransform:'uppercase' }}>Available</span>
          </span>
        </motion.div>

        {/* Brand mark */}
        <motion.div initial={{ opacity:0 }} animate={ready?{opacity:1}:{}} transition={{ duration:.4,delay:.2 }} style={{ marginBottom:'.6rem',overflow:'hidden' }}>
          <img src="/logo.png" alt="Dexena — CodeXAthena" style={{ display:'block',width:'clamp(13rem,28vw,23rem)',height:'auto',objectFit:'contain' }}/>
        </motion.div>

        {/* Word stagger subtitle */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'2.5rem',maxWidth:'76ch' }}>
          {subtitleWords.map((w,i)=>(
            <motion.span key={i}
              initial={{ opacity:0,y:28,filter:'blur(8px)' }}
              animate={ready?{opacity:1,y:0,filter:'blur(0px)'}:{}}
              transition={{ duration:.55,delay:.45+i*.09,ease:[.25,.1,.25,1] }}
              style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'clamp(1.4rem,3.2vw,2.6rem)',lineHeight:1.15,letterSpacing:'-0.02em',
                color:['code,','creativity','&'].includes(w)?'#9EFF00':'#F7F5F0' }}>
              {w}
            </motion.span>
          ))}
        </div>

        {/* Description */}
        <motion.p initial={{ opacity:0,y:18 }} animate={ready?{opacity:1,y:0}:{}} transition={{ duration:.6,delay:1.1 }}
          style={{ fontSize:'clamp(.9375rem,1.5vw,1.125rem)',color:'#9A9A9A',maxWidth:'52ch',lineHeight:1.8,marginBottom:'3rem',fontWeight:300 }}>
          Dexena is a team of developers, 3D artists, and creatives from India — building premium digital products that make clients ask{' '}
          <em style={{ fontStyle:'normal',color:'#F7F5F0' }}>"how did they do that?"</em>
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0,y:18 }} animate={ready?{opacity:1,y:0}:{}} transition={{ duration:.6,delay:1.25 }}
          style={{ display:'flex',gap:'1rem',flexWrap:'wrap',alignItems:'center' }}>
          <MagneticBtn to="/work"
            style={{ display:'inline-block',fontFamily:'Space Grotesk',fontWeight:700,fontSize:'.9rem',padding:'.875rem 2rem',background:'#9EFF00',color:'#000',letterSpacing:'.03em' }}>
            View Our Work
          </MagneticBtn>
          <MagneticBtn href={`mailto:${SITE.email}`}
            style={{ display:'inline-block',fontFamily:'Space Grotesk',fontWeight:700,fontSize:'.9rem',padding:'.875rem 2rem',border:'1px solid #222',color:'#F7F5F0',letterSpacing:'.03em' }}>
            Work With Us →
          </MagneticBtn>
          <motion.a href={SITE.fiverr.url} target="_blank" rel="noopener noreferrer"
            whileHover={{ color:'#9EFF00',borderColor:'#9EFF00' }}
            style={{ fontFamily:'Space Grotesk',fontSize:'.8125rem',fontWeight:500,color:'#555',borderBottom:'1px solid #2A2A2A',paddingBottom:2,letterSpacing:'.04em',transition:'color .2s,border-color .2s' }}>
            {SITE.fiverr.handle} on Fiverr
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity:0 }} animate={ready?{opacity:1}:{}} transition={{ duration:1,delay:1.6 }}
          style={{ display:'flex',gap:'clamp(2rem,5vw,4rem)',marginTop:'5rem',paddingTop:'2.5rem',borderTop:'1px solid #141414' }}>
          <Stat n={7}   label="Team Members"/>
          <Stat n={5}   label="Core Services"/>
          <Stat n={100} label="Commitment"/>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={ready?{opacity:1}:{}} transition={{ delay:2.2,duration:.8 }}
        style={{ position:'absolute',bottom:'2.5rem',right:'clamp(1.25rem,5vw,3rem)',display:'flex',flexDirection:'column',alignItems:'center',gap:'.5rem',zIndex:2 }}>
        <span style={{ fontFamily:'Space Grotesk',fontSize:'.6rem',letterSpacing:'.14em',textTransform:'uppercase',color:'#333',writingMode:'vertical-rl' }}>Scroll</span>
        <motion.div animate={{ y:[0,10,0] }} transition={{ duration:1.6,repeat:Infinity,ease:'easeInOut' }}
          style={{ width:1,height:40,background:'linear-gradient(to bottom,#9EFF00,transparent)' }}/>
      </motion.div>
    </section>
  )
}
