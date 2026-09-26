import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NavLogo } from '@/components/ui/Logo'
import { SITE } from '@/data/siteConfig'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        className="site-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .6, delay: 1.6, ease: [.25,.1,.25,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem clamp(1.25rem,5vw,3rem)',
          borderBottom: scrolled ? '1px solid #1A1A1A' : '1px solid transparent',
          background: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          transition: 'border-color .3s, background .3s',
        }}
      >
        {/* ── Logo ── */}
        <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', lineHeight: 0, minWidth: 0 }}>
          <NavLogo height={58} className="nav-logo" />
        </Link>

        {/* ── Desktop links ── */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2.25rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden lg:flex">
          {SITE.nav.map(({ label, href }) => (
            <li key={href}>
              <NavLink to={href}>
                {({ isActive }) => (
                  <motion.span
                    style={{ fontFamily: 'Space Grotesk', fontSize: '.875rem', fontWeight: 500,
                      color: isActive ? '#F7F5F0' : '#555', letterSpacing: '.01em', display: 'block',
                      cursor: 'pointer', position: 'relative' }}
                    whileHover={{ color: '#F7F5F0' }}
                    transition={{ duration: .15 }}
                  >
                    {label}
                    {isActive && (
                      <motion.span layoutId="nav-underline"
                        style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 1, background: '#9EFF00', display: 'block' }}
                      />
                    )}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <motion.a href={`mailto:${SITE.email}`}
          className="hidden lg:inline-block"
          whileHover={{ borderColor: '#9EFF00', color: '#9EFF00' }}
          style={{ fontFamily: 'Space Grotesk', fontSize: '.8rem', fontWeight: 600,
            padding: '.6rem 1.25rem', border: '1px solid #222', color: '#F7F5F0',
            letterSpacing: '.04em', transition: 'none' }}>
          Let's Work Together
        </motion.a>

        {/* ── Mobile toggle ── */}
        <button onClick={() => setOpen(v => !v)} className="lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', color: '#F7F5F0', padding: 4, lineHeight: 0 }}>
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x"   initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.2}}><X size={22}/></motion.span>
              : <motion.span key="men" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.2}}><Menu size={22}/></motion.span>
            }
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .25 }}
            className="lg:hidden"
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.97)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', overflowY: 'auto', padding: '5rem 1.5rem 2rem' }}>

            <button type="button" onClick={close} aria-label="Close menu"
              style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'none', border: '1px solid #333', color: '#F7F5F0', padding: '.6rem', lineHeight: 0 }}>
              <X size={24} />
            </button>

            <NavLogo height={56} className="mobile-menu-logo" />

            {SITE.nav.map(({ label, href }, i) => (
              <motion.div key={href}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * .06, duration: .35, ease: [.25,.1,.25,1] }}>
                <NavLink to={href} onClick={close} className="mobile-menu-link">
                  {({ isActive }) => (
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.875rem', fontWeight: 700,
                      color: isActive ? '#9EFF00' : '#F7F5F0', letterSpacing: '-0.01em' }}>
                      {label}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}

            <motion.a href={`mailto:${SITE.email}`} onClick={close}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
              style={{ fontFamily: 'Space Grotesk', fontSize: '.85rem', color: '#9EFF00',
                borderBottom: '1px solid #9EFF00', paddingBottom: 2, marginTop: '1rem' }}>
              {SITE.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
