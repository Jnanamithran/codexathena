import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { team } from '@/data/team'

const colors = {
  J:{ bg:'#061206', accent:'#9EFF00' }, V:{ bg:'#060A12', accent:'#4A9EFF' },
  A:{ bg:'#120606', accent:'#FF9E4A' }, S:{ bg:'#0A0612', accent:'#C44AFF' },
  default:{ bg:'#0C0C06', accent:'#FFE04A' },
}

function Card({ member, index }) {
  const ref = useRef(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx,{ stiffness:120, damping:18 })
  const sy = useSpring(my,{ stiffness:120, damping:18 })
  const rotX = useTransform(sy,[-0.5,0.5],[6,-6])
  const rotY = useTransform(sx,[-0.5,0.5],[-6,6])
  const glX = useMotionValue(50), glY = useMotionValue(50)

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX-r.left)/r.width-.5); my.set((e.clientY-r.top)/r.height-.5)
    glX.set(((e.clientX-r.left)/r.width)*100); glY.set(((e.clientY-r.top)/r.height)*100)
  }
  const onLeave = () => { mx.set(0); my.set(0) }
  const c = colors[member.initials] ?? colors.default

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX:rotX, rotateY:rotY, transformStyle:'preserve-3d', perspective:800 }}
      initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ delay:index*.08, duration:.6, ease:[.25,.1,.25,1] }}
      whileHover={{ scale:1.03, zIndex:10 }}>
      <div style={{ border:'1px solid #1A1A1A', overflow:'hidden', position:'relative', background:'#0A0A0A' }}>
        {/* Spotlight */}
        <motion.div style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
          background:useTransform([glX,glY],([gx,gy])=>`radial-gradient(220px circle at ${gx}% ${gy}%,${c.accent}10,transparent 70%)`) }}/>

        {/* Avatar */}
        <div style={{ aspectRatio:'4/3', background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid #1A1A1A', position:'relative', zIndex:1 }}>
          {member.photo
            ? <img src={member.photo} alt={member.name} style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
            : <span style={{ fontFamily:'Space Grotesk', fontWeight:800, fontSize:'clamp(2.5rem,5vw,4rem)', color:c.accent, opacity:.9, letterSpacing:'-.02em' }}>
                {member.initials}
              </span>
          }
          {/* Accent corner */}
          <div style={{ position:'absolute',top:0,right:0,width:0,height:0,borderStyle:'solid',borderWidth:'0 2.5rem 2.5rem 0',borderColor:`transparent ${c.accent} transparent transparent`,opacity:.5 }}/>
        </div>

        {/* Info */}
        <div style={{ padding:'1.25rem', position:'relative', zIndex:1 }}>
          <h4 style={{ fontFamily:'Space Grotesk',fontWeight:700,fontSize:'1rem',marginBottom:'.2rem' }}>{member.name}</h4>
          <p style={{ fontSize:'.8rem',color:c.accent,marginBottom:'.75rem',fontFamily:'Space Grotesk',fontWeight:500 }}>{member.role}</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'.35rem' }}>
            {member.skills.slice(0,3).map(s => (
              <span key={s} style={{ fontSize:'.6rem',fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',padding:'.15rem .4rem',border:'1px solid #1A1A1A',color:'#555' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamPreview() {
  return (
    <section id="team" style={{ padding:'clamp(5rem,10vw,9rem) 0', background:'#000' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1.25rem,5vw,3rem)' }}>

        <Reveal>
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:'2rem',flexWrap:'wrap',marginBottom:'3.5rem' }}>
            <div>
              <SectionLabel>The People</SectionLabel>
              <h2 style={{ fontFamily:'Space Grotesk',fontWeight:600,fontSize:'clamp(2rem,4vw,3.5rem)',lineHeight:1.1,letterSpacing:'-0.02em',marginTop:'.5rem' }}>
                Meet the team
              </h2>
            </div>
            <Button to="/team" variant="ghost" size="sm">Full Team ({team.length}) →</Button>
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1px', background:'#1A1A1A' }}>
          {team.slice(0,4).map((m,i) => <Card key={m.id} member={m} index={i}/>)}
        </div>

      </div>
    </section>
  )
}
