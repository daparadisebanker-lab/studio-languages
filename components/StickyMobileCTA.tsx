'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const WA_LINK = 'https://wa.me/51983747658?text=Hola%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20Studio%20by%20Paradise'
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function StickyMobileCTA() {
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.55)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMobile || dismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDismissed(true)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              background: 'rgba(26,20,16,0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Centered card */}
          <motion.div
            key="cta-card"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              zIndex: 9999,
              width: 'calc(100vw - 48px)',
              maxWidth: 340,
              background: '#1a1410',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,240,232,0.07)',
            }}
          >
            {/* Terra accent bar */}
            <div style={{ height: 3, background: '#C4603A', width: '100%' }} />

            {/* Card body */}
            <div style={{ padding: '28px 24px 20px' }}>

              {/* Brand eyebrow */}
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.3)',
                margin: '0 0 22px',
              }}>
                Studio by Paradise
              </p>

              {/* Headline */}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F5F0E8',
                lineHeight: 1.2,
                margin: '0 0 6px',
              }}>
                ¿Listo para empezar?
              </p>

              {/* Sub */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'rgba(245,240,232,0.45)',
                margin: '0 0 28px',
              }}>
                Agenda una conversación gratuita. Te respondemos por WhatsApp.
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(245,240,232,0.06)', marginBottom: 24 }} />

              {/* WhatsApp CTA */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '16px 20px',
                  background: '#25D366',
                  borderRadius: 8,
                  textDecoration: 'none',
                  marginBottom: 10,
                  minHeight: 52,
                  boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
                }}
              >
                {/* WhatsApp icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="rgba(255,255,255,0.25)"/>
                  <path d="M9.5 7.5c-.2-.5-.4-.5-.6-.5-.15 0-.32 0-.49 0-.17 0-.44.06-.68.31C7.5 7.56 6.5 8.5 6.5 10.5s1.03 3.9 1.18 4.17c.14.26 2 3.25 5 4.5.7.3 1.25.48 1.67.6.7.22 1.34.19 1.84.12.57-.08 1.74-.7 1.99-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33-.29-.14-1.74-.86-2.01-.96-.27-.1-.47-.14-.66.14-.2.29-.76.96-.93 1.16-.17.2-.35.22-.64.08-.29-.15-1.23-.45-2.34-1.45-.87-.78-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.2.05-.37-.02-.52L9.5 7.5z" fill="white"/>
                </svg>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#fff',
                  letterSpacing: '0.01em',
                }}>
                  Consultar por WhatsApp
                </span>
              </a>

              {/* Dismiss */}
              <button
                onClick={() => setDismissed(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.22)',
                  minHeight: 44,
                  display: 'block',
                }}
              >
                Ahora no
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
