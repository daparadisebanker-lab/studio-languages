'use client'

import { motion } from 'framer-motion'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PriceCardProps {
  badge: string
  format: string
  duration: string
  desc: string
  amount: string
  note: string
  featured: boolean
  index: number
}

function PriceCard({ badge, format, duration, desc, amount, note, featured, index }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        background: featured ? '#c4603a' : '#ede8df',
        padding: '44px 36px',
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
          fontSize: '40px',
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
          margin: 0,
        }}
      >
        {note}
      </p>
    </motion.div>
  )
}

const tiers: Omit<PriceCardProps, 'index'>[] = [
  {
    badge: 'Estándar',
    format: 'Programa mensual',
    duration: '4 sesiones · 90 min c/u',
    desc: 'Programa de 4 sesiones mensuales individuales. Contenido personalizado según tu disciplina e institución objetivo. Para estudiantes en etapa de preparación con 12+ meses antes de su aplicación.',
    amount: 'S/ 280',
    note: 'por mes · sin matrícula',
    featured: false,
  },
  {
    badge: 'Más elegido',
    format: 'Programa intensivo',
    duration: '8 sesiones · 90 min c/u',
    desc: 'Doble frecuencia mensual. Para estudiantes en año de aplicación activo o que quieren acelerar el progreso. Incluye preparación completa de materiales de admisión.',
    amount: 'S/ 480',
    note: 'por mes · todo incluido',
    featured: true,
  },
  {
    badge: 'Aplicación',
    format: 'Paquete de admisión',
    duration: 'Proyecto de 6 semanas',
    desc: 'Para estudiantes que ya tienen nivel intermedio y necesitan los materiales de aplicación: artist statement, carta de motivación y preparación de entrevista. Proyecto único con entregables definidos.',
    amount: 'S/ 890',
    note: 'pago único · 6 semanas',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section
      style={{
        background: '#f5f0e8',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 64px',
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
          Todos los programas incluyen sesiones individuales con profesor nativo especializado. El contenido se calibra al perfil y destino de cada estudiante.
        </motion.p>

        {/* Pricing Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            marginTop: '64px',
          }}
        >
          {tiers.map((tier, i) => (
            <PriceCard key={tier.badge} {...tier} index={i} />
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
