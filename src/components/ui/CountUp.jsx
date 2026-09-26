import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

export default function CountUp({ to, suffix = '', duration = 1800, className = '' }) {
  const [ref, inView] = useInView()
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const tick = now => {
      const t = Math.min((now - start) / duration, 1)
      // ease out cubic
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(ease * to))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref} className={className}>{val}{suffix}</span>
}
