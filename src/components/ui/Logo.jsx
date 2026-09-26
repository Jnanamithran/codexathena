// ─── DEXENA LOGO COMPONENTS ──────────────────────────────────────────────────
const logoSrc = '/logo.png'

export function WordmarkLogo({ height = 60, className = '' }) {
  return (
    <img
      src={logoSrc}
      alt="Dexena — CodeXAthena"
      width={height}
      height={height}
      style={{ display: 'block', objectFit: 'contain' }}
      className={className}
    />
  )
}

export function IconLogo({ size = 40, className = '' }) {
  return (
    <img
      src={logoSrc}
      alt="Dexena"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain' }}
      className={className}
    />
  )
}

// Compact navbar version — used in Navbar & mobile overlay
export function NavLogo({ height = 58, className = '' }) {
  return <WordmarkLogo height={height} className={className} />
}
