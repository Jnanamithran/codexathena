import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export default function PageTransition({ children }) {
  const ref  = useRef(null)
  const curtainRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const curtain = curtainRef.current
    const content = ref.current
    if (!curtain || !content) return

    // Curtain sweeps down then up, content fades in
    const tl = gsap.timeline()
    tl.set(curtain, { scaleY: 0, transformOrigin: 'top' })
      .set(content, { opacity: 0, y: 18 })
      .to(curtain, { scaleY: 1, duration: .35, ease: 'power3.inOut', transformOrigin: 'top' })
      .to(curtain, { scaleY: 0, duration: .35, ease: 'power3.inOut', transformOrigin: 'bottom' })
      .to(content, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }, '-=.2')

    return () => tl.kill()
  }, [pathname])

  return (
    <div style={{ position: 'relative' }}>
      {/* Transition curtain */}
      <div ref={curtainRef} style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: '#9EFF00',
        pointerEvents: 'none',
        transform: 'scaleY(0)',
      }}/>
      <div ref={ref}>{children}</div>
    </div>
  )
}
