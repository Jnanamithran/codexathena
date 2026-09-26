import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NavLogo } from '@/components/ui/Logo'

export default function Loader({ onDone }) {
  const overlayRef = useRef(null)
  const barRef     = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100, duration: .7, ease: 'power3.inOut',
          onComplete: onDone,
        })
      }
    })

    // Fake progress bar
    tl.to({}, {
      duration: 1.4,
      onUpdate() {
        const p = Math.round(tl.progress() * 100)
        setPct(p)
        if (barRef.current) barRef.current.style.width = p + '%'
      }
    })
  }, [])

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '2.5rem',
    }}>
      <NavLogo height={68} />

      <div style={{ width: 200, height: 1, background: '#111', position: 'relative', overflow: 'hidden' }}>
        <div ref={barRef} style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          background: 'linear-gradient(90deg, #9EFF00, rgba(158,255,0,.4))',
          width: '0%', transition: 'width .05s linear',
        }}/>
      </div>

      <span style={{
        fontFamily: 'Space Grotesk', fontSize: '.65rem', fontWeight: 600,
        letterSpacing: '.14em', textTransform: 'uppercase', color: '#333',
      }}>
        {pct}%
      </span>
    </div>
  )
}
