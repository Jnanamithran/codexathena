import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const items = [
  'Web Development','✦','Full-Stack Engineering','✦','3D & Blender',
  '✦','Video Editing','✦','Game Development','✦','UI/UX Design',
  '✦','React & Next.js','✦','AI Integration','✦',
]
const doubled = [...items, ...items, ...items]

export default function Marquee({ reverse = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const totalW = el.scrollWidth / 3  // one third = one set

    const tween = gsap.to(el, {
      x: reverse ? totalW : -totalW,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalW)
      }
    })

    // Speed up on mouse enter, slow on leave
    const container = el.parentElement
    const speedUp = () => gsap.to(tween, { timeScale: 2.5, duration: .4 })
    const slowDown= () => gsap.to(tween, { timeScale: 1,   duration: .8 })
    container?.addEventListener('mouseenter', speedUp)
    container?.addEventListener('mouseleave', slowDown)
    return () => {
      tween.kill()
      container?.removeEventListener('mouseenter', speedUp)
      container?.removeEventListener('mouseleave', slowDown)
    }
  }, [reverse])

  return (
    <div style={{ overflow:'hidden', borderTop:'1px solid #1A1A1A', borderBottom:'1px solid #1A1A1A', padding:'.75rem 0', background:'#050505', userSelect:'none' }}>
      <div ref={trackRef} style={{ display:'flex', whiteSpace:'nowrap', willChange:'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ flexShrink:0, padding:'0 1.5rem', fontFamily:'Space Grotesk', fontWeight:600, fontSize:'.72rem', letterSpacing:'.12em', textTransform:'uppercase',
            color: item==='✦' ? '#9EFF00' : '#444' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
