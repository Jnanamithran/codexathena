import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export default function TextScramble({ text, trigger = true, className = '', delay = 0 }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf   = useRef(null)

  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(() => {
      let iteration = 0
      const total = text.length * 3

      cancelAnimationFrame(raf.current)
      const tick = () => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < Math.floor(iteration / 3)) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        iteration++
        if (iteration < total + text.length) raf.current = requestAnimationFrame(tick)
        else setDisplay(text)
      }
      raf.current = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf.current) }
  }, [trigger, text, delay])

  return <span className={className}>{display}</span>
}
