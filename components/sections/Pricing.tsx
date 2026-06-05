'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PriceDetail {
  structure: string
  duration: string
  commitment: string
}

interface PriceCardProps {
  badge: string
  format: string
  duration: string
  desc: string
  amount: string
  note: string
  bundle?: string
  detail: PriceDetail
  featured: boolean
  index: number
  isMobile: boolean
}

function PriceCard({ badge, format, duration, desc, amount, note, bundle, detail, featured, index, isMobile }: PriceCardProps) {
  const [expanded, setExpanded] = useState(false)

  const fg      = featured ? '#f5f0e8'              : '#1a1410'
  const fgMuted = featured ? 'rgba(245,240,232,0.7)' : 'rgba(26,20,16,0.5)'
  const border  = featured ? 'rgba(245,240,232,0.15)': 'rgba(26,20,16,0.08)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.1 }}
      style={{
        background: featured ? '#c4603a' : '#ede8df',
        padding: isMobile ? '32px 24px' : '44px 36px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        background: featured ? 'rgba(245,240,232,0.2)' : '#1a1410',
        color: '#f5f0e8',
        padding: '5px 10px',
        display: 'inline-block',
        marginBottom: '20px',
        alignSelf: 'flex-start',
      }}>
        {badge}
      </span>

      {/* Format */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '32px',
        fontWeight: 300,
        fontStyle: 'italic',
        color: fg,
        lineHeight: 1,
        margin: '0 0 8px 0',
      }}>
        {format}
      </p>

      {/* Duration tag */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: featured ? 'rgba(245,240,232,0.7)' : '#c4603a',
        margin: '0 0 20px 0',
      }}>
        {duration}
      </p>

      {/* Desc */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 300,
        lineHeight: 1.65,
        color: featured ? 'rgba(245,240,232,0.85)' : '#1a1410',
        opacity: featured ? 1 : 0.7,
        flex: 1,
        margin: '0 0 28px 0',
      }}>
        {desc}
      </p>

      {/* Amount */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: isMobile ? '32px' : '40px',
        fontWeight: 300,
        color: fg,
        lineHeight: 1,
        margin: '0 0 4px 0',
      }}>
        {amount}
      </p>

      {/* Note */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.08em',
        color: fgMuted,
        margin: bundle ? '0 0 16px 0' : '0 0 24px 0',
      }}>
        {note}
      </p>

      {/* Bundle option */}
      {bundle && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: featured ? 'rgba(245,240,232,0.7)' : '#c4603a',
          borderTop: `1px solid ${border}`,
          paddingTop: '12px',
          margin: '0 0 24px 0',
        }}>
          {bundle}
        </p>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: border, marginBottom: 16 }} />

      {/* Explorar detalles toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: fgMuted,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = featured ? '#f5f0e8' : '#c4603a')}
        onMouseLeave={e => (e.currentTarget.style.color = fgMuted)}
      >
        <span>Explorar detalles</span>
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: 11,
        }}>↓</span>
      </button>

      {/* Expanded detail panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: `1px solid ${border}`,
              marginTop: 16,
              paddingTop: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}>
              {/* Detail rows */}
              {[
                { label: 'Estructura',  value: detail.structure   },
                { label: 'Duración',    value: detail.duration    },
                { label: 'Compromiso',  value: detail.commitment  },
              ].map(row => (
                <div key={row.label}>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: fgMuted,
                    margin: '0 0 3px 0',
                  }}>
                    {row.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: featured ? 'rgba(245,240,232,0.9)' : 'rgba(26,20,16,0.8)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {row.value}
                  </p>
                </div>
              ))}

              {/* Curriculum CTA */}
              <a
                href="#curriculum"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 4,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: featured ? '#f5f0e8' : '#c4603a',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${featured ? 'rgba(245,240,232,0.4)' : 'rgba(196,96,58,0.4)'}`,
                  paddingBottom: 2,
                  alignSelf: 'flex-start',
                }}
              >
                Ver curriculum completo →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const tiers: Omit<PriceCardProps, 'index' | 'isMobile'>[] = [
  {
    badge: 'Estándar',
    format: 'Programa mensual',
    duration: 'Clases virtuales grupales',
    desc: 'Clases en línea con profesor nativo especializado en arte y diseño. Para estudiantes en etapa de preparación con 12+ meses antes de su aplicación.',
    amount: '$120',
    note: 'por mes · sin matrícula',
    bundle: 'Paquete 5 meses · $490',
    detail: {
      structure:  '2 sesiones grupales por semana',
      duration:   '90 min por sesión',
      commitment: '~3 horas semanales',
    },
    featured: false,
  },
  {
    badge: 'Más elegido',
    format: 'Programa intensivo',
    duration: 'Clases virtuales grupales',
    desc: 'Mayor frecuencia semanal. Para estudiantes en año de aplicación activo o que quieren acelerar el progreso hacia su institución objetivo.',
    amount: '$200',
    note: 'por mes · sin matrícula',
    bundle: 'Paquete 5 meses · $800',
    detail: {
      structure:  '4 sesiones grupales por semana',
      duration:   '90 min por sesión',
      commitment: '~6 horas semanales',
    },
    featured: true,
  },
  {
    badge: 'Admisión',
    format: 'Paquete de admisión',
    duration: 'Proyecto cerrado · 6 semanas',
    desc: 'Para estudiantes con nivel intermedio que necesitan los materiales de aplicación: artist statement, carta de motivación y preparación para entrevista de portafolio.',
    amount: '$280',
    note: 'pago único · entregables definidos',
    detail: {
      structure:  'Sesiones de revisión + entregables semanales',
      duration:   '60 min por sesión',
      commitment: '~3 horas semanales durante 6 semanas',
    },
    featured: false,
  },
]

export default function Pricing() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: '#f5f0e8',
        padding: isMobile ? '72px 0' : '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#c4603a',
            margin: '0 0 40px 0',
          }}
        >
          Inversión
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            fontWeight: 300,
            color: '#1a1410',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
          }}
        >
          Formatos del programa
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>y tarifas.</em>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 300,
            color: '#1a1410',
            opacity: 0.7,
            maxWidth: '600px',
            lineHeight: 1.65,
            margin: '0 0 64px 0',
          }}
        >
          Clases virtuales grupales con profesor nativo especializado en arte y diseño. El contenido está orientado a las escuelas europeas a las que apuntas — no a un currículo genérico.
        </motion.p>

        {/* Pricing Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2px',
            marginTop: '64px',
          }}
        >
          {tiers.map((tier, i) => (
            <PriceCard key={tier.badge} {...tier} index={i} isMobile={isMobile} />
          ))}
        </div>

        {/* Below-grid note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
          style={{
            marginTop: '48px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#6b6860',
          }}
        >
          Becas disponibles para casos excepcionales ·{' '}
          <a href="#inscripcion" style={{ color: '#c4603a', textDecoration: 'none' }}>
            Consultar →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
