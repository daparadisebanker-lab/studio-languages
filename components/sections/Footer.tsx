'use client'

import { useIsMobile } from '@/lib/useIsMobile'

const navLinks = [
  { href: '#programa', label: 'El Programa' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#inscripcion', label: 'Inscripción' },
  { href: '#para-quien', label: '¿Para quién?' },
]

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer
      style={{
        background: '#2c2420',
        padding: '48px 0',
        borderTop: '1px solid rgba(245,240,232,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? 24 : 0,
            marginBottom: '32px',
          }}
        >
          {/* Brand logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-footer.png"
            alt="Studio by Paradise"
            style={{ height: 40, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.6 }}
          />

          {/* Nav links */}
          <nav
            style={{
              display: 'flex',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              gap: isMobile ? '16px' : '32px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.3)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#c4603a'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,240,232,0.3)'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* External contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
            <a
              href="mailto:studio_paradise@icloud.com"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(245,240,232,0.3)', textDecoration: 'none' }}
            >
              studio_paradise@icloud.com
            </a>
            <a
              href="https://studiobyparadise.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(245,240,232,0.3)', textDecoration: 'none' }}
            >
              studiobyparadise.com
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? 12 : 0,
            paddingTop: '24px',
            borderTop: '1px solid rgba(245,240,232,0.06)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.2)',
            }}
          >
            © 2026 Studio by Paradise · Lima, Perú
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.2)',
            }}
          >
            Formación creativa pre-universitaria · Programas de idiomas para arte y diseño
          </span>
        </div>
      </div>
    </footer>
  )
}
