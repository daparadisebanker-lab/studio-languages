'use client'

const navLinks = [
  { href: '#programa', label: 'El Programa' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#inscripcion', label: 'Inscripción' },
  { href: '#para-quien', label: '¿Para quién?' },
]

export default function Footer() {
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
          padding: '0 64px',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
          }}
        >
          {/* Brand */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.4)',
            }}
          >
            Paradise{' '}
            <span style={{ color: '#c4603a' }}>Studio</span>
          </span>

          {/* Nav links */}
          <nav
            style={{
              display: 'flex',
              gap: '32px',
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(245,240,232,0.3)',
            }}
          >
            studio.paradise.edu.pe
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            © 2026 Paradise Education Group · Lima, Perú
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
