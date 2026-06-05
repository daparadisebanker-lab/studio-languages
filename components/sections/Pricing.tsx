'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PriceCardProps {
  badge: string
  format: string
  duration: string
  desc: string
  amount: string
  note: string
  bundle?: string
  featured: boolean
  index: number
  isMobile: boolean
}

function PriceCard({ badge, format, duration, desc, amount, note, bundle, featured, index, isMobile }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        background: featured ? '#c4603a' : '#ede8df',
        padding: isMobile ? '32px 24px' : '44px 36px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s',
      }}
    >
      {/* Badge */}
      <span
        style={{
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
        }}
      >
        {badge}
      </span>

      {/* Format */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 300,
          fontStyle: 'italic',
          color: featured ? '#f5f0e8' : '#1a1410',
          lineHeight: 1,
          marginBottom: '8px',
          margin: '0 0 8px 0',
        }}
      >
        {format}
      </p>

      {/* Duration */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: featured ? 'rgba(245,240,232,0.7)' : '#c4603a',
          marginBottom: '20px',
          margin: '0 0 20px 0',
        }}
      >
        {duration}
      </p>

      {/* Desc */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.65,
          color: featured ? 'rgba(245,240,232,0.85)' : '#1a1410',
          opacity: featured ? 1 : 0.7,
          flex: 1,
          marginBottom: '28px',
          margin: '0 0 28px 0',
        }}
      >
        {desc}
      </p>

      {/* Amount */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? '32px' : '40px',
          fontWeight: 300,
          color: featured ? '#f5f0e8' : '#1a1410',
          lineHeight: 1,
          marginBottom: '4px',
          margin: '0 0 4px 0',
        }}
      >
        {amount}
      </p>

      {/* Note */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: featured ? 'rgba(245,240,232,0.5)' : '#1a1410',
          opacity: featured ? 1 : 0.4,
          margin: bundle ? '0 0 16px 0' : 0,
        }}
      >
        {note}
      </p>

      {/* Bundle option */}
      {bundle && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: featured ? 'rgba(245,240,232,0.7)' : '#c4603a',
            borderTop: featured ? '1px solid rgba(245,240,232,0.2)' : '1px solid rgba(196,96,58,0.2)',
            paddingTop: '12px',
            margin: 0,
          }}
        >
          {bundle}
        </p>
      )}
    </motion.div>
  )
}

const tiers: Omit<PriceCardProps, 'index' | 'isMobile'>[] = [
  {
    badge: 'Estándar',
    format: 'Programa mensual',
    duration: 'Clases virtuales grupales',
    desc: 'Clases en línea con profesor nativo especializado en arte y diseño. Para estudiantes en etapa de preparación con 12+ meses antes de su aplicación.',
    amount: 'S/ 400',
    note: 'por mes · sin matrícula',
    bundle: 'Paquete 5 meses · S/ 1,800',
    featured: false,
  },
  {
    badge: 'Más elegido',
    format: 'Programa intensivo',
    duration: 'Clases virtuales grupales',
    desc: 'Mayor frecuencia semanal. Para estudiantes en año de aplicación activo o que quieren acelerar el progreso hacia su institución objetivo.',
    amount: 'S/ 720',
    note: 'por mes · sin matrícula',
    bundle: 'Paquete 5 meses · S/ 3,000',
    featured: true,
  },
  {
    badge: 'Admisión',
    format: 'Paquete de admisión',
    duration: 'Proyecto cerrado',
    desc: 'Para estudiantes con nivel intermedio que necesitan los materiales de aplicación: artist statement, carta de motivación y preparación para entrevista de portafolio.',
    amount: 'S/ 990',
    note: 'pago único · entregables definidos',
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
            marginBottom: '40px',
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
            marginBottom: '64px',
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
          <a
            href="#inscripcion"
            style={{
              color: '#c4603a',
              textDecoration: 'none',
            }}
          >
            Consultar →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
