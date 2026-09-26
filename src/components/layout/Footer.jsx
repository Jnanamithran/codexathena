import { Link } from 'react-router-dom'
import { NavLogo, IconLogo } from '@/components/ui/Logo'
import { SITE }   from '@/data/siteConfig'
import { services } from '@/data/services'

const year = new Date().getFullYear()

// Only render social links that have a real URL
const allSocials = [
  { label: 'GitHub',    href: SITE.social?.github },
  { label: 'LinkedIn',  href: SITE.social?.linkedin },
  { label: 'Instagram', href: SITE.social?.instagram },
  { label: 'Twitter',   href: SITE.social?.twitter },
  { label: 'Fiverr',    href: SITE.fiverr.url },
].filter(s => s.href && s.href !== '#' && s.href !== null)

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid #1A1A1A' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(3.5rem,6vw,5rem) clamp(1.25rem,5vw,3rem) 2rem' }}>

        {/* Top — brand + nav grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand col */}
          <div style={{ gridColumn: 'span 2' }} className="footer-brand lg:col-span-2">
            {/* Wordmark */}
            <div style={{ marginBottom: '1rem' }}>
              <NavLogo />
            </div>
            {/* Tagline */}
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.75, maxWidth: '28ch', marginBottom: '1.25rem' }}>
              {SITE.description}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              style={{ fontSize: '0.8125rem', color: '#666', borderBottom: '1px solid #222', paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.target.style.color = '#F7F5F0'; e.target.style.borderColor = '#666' }}
              onMouseLeave={e => { e.target.style.color = '#666'; e.target.style.borderColor = '#222' }}
            >
              {SITE.email}
            </a>

            {/* Social + Fiverr icons */}
            {allSocials.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                {allSocials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '2.25rem', height: '2.25rem',
                      border: '1px solid #1A1A1A',
                      fontFamily: 'Space Grotesk', fontSize: '0.65rem', fontWeight: 600,
                      color: '#666', letterSpacing: '0.04em',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#9EFF00'; e.currentTarget.style.color = '#9EFF00' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.color = '#666' }}
                  >
                    {label.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Company */}
          <div>
            <h5 style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', marginBottom: '1.25rem' }}>
              Company
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[['About', '/about'], ['Work', '/work'], ['Team', '/team'], ['Blog', '/blog'], ['FAQ', '/faq']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} style={{ fontSize: '0.875rem', color: '#666', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#F7F5F0'}
                    onMouseLeave={e => e.target.style.color = '#666'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', marginBottom: '1.25rem' }}>
              Services
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {services.map(s => (
                <li key={s.id}>
                  <Link to="/services" style={{ fontSize: '0.875rem', color: '#666', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#F7F5F0'}
                    onMouseLeave={e => e.target.style.color = '#666'}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', marginBottom: '1.25rem' }}>
              Connect
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a href={SITE.fiverr.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: '#666', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#9EFF00'}
                  onMouseLeave={e => e.target.style.color = '#666'}>
                  Fiverr — {SITE.fiverr.handle}
                </a>
              </li>
              <li>
                <Link to="/contact" style={{ fontSize: '0.875rem', color: '#666', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#F7F5F0'}
                  onMouseLeave={e => e.target.style.color = '#666'}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#1A1A1A', marginBottom: '1.75rem' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* DE icon mark small */}
            <IconLogo size={28} />
            <p style={{ fontSize: '0.8rem', color: '#444' }}>© {year} Dexena · CodeXAthena. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[['Privacy Policy', '/privacy'], ['Terms', '/terms']].map(([label, to]) => (
              <Link key={to} to={to} style={{ fontSize: '0.8rem', color: '#444', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#666'}
                onMouseLeave={e => e.target.style.color = '#444'}>
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
