import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot   = useRef(null)
  const ring  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [hidden,  setHidden]  = useState(true)

  useEffect(() => {
    // Only desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf
    let mx = 0, my = 0
    let rx = 0, ry = 0

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      setHidden(false)
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnter = e => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(true)
    }
    const onLeave = e => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(false)
    }
    const onOut = () => setHidden(true)

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseover',  onEnter)
    window.addEventListener('mouseout',   onLeave)
    document.addEventListener('mouseleave', onOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onEnter)
      window.removeEventListener('mouseout',   onLeave)
      document.removeEventListener('mouseleave', onOut)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dot}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#9EFF00',
          pointerEvents: 'none',
          marginLeft: -3, marginTop: -3,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Ring — lerped */}
      <div
        ref={ring}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
          borderRadius: '50%',
          border: `1px solid ${hovered ? '#9EFF00' : 'rgba(158,255,0,0.4)'}`,
          pointerEvents: 'none',
          marginLeft: hovered ? -28 : -16,
          marginTop:  hovered ? -28 : -16,
          opacity: hidden ? 0 : 1,
          transition: 'width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s, opacity 0.3s',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
