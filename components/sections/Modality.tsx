'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const IconPerson = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)
const IconSliders = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>
)
const IconAward = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6"/>
    <path d="M15.477 13.89 17 22l-5-3-5 3 1.523-8.11"/>
  </svg>
)

const cards = [
  {
    icon: <IconPerson />,
    name: 'Clases virtuales en vivo',
    desc: 'Sesiones grupales en línea con profesor nativo especializado en arte y diseño. Grupos reducidos, diseñados para el contexto específico de las escuelas europeas a las que apuntan los estudiantes.',
  },
  {
    icon: <IconSliders />,
    name: 'Contenido a medida',
    desc: 'No existe un currículo genérico. El mapa de contenidos se construye a partir del programa al que aplica el estudiante. Lo que aprendes es exactamente lo que necesitas saber para llegar ahí.',
  },
  {
    icon: <IconAward />,
    name: 'Preparación de admisión',
    desc: 'El programa culmina en las herramientas concretas de aplicación: el artist statement en el idioma de destino, la carta de motivación, la preparación para la entrevista de portafolio.',
  },
]

function ModalityCard({
  icon,
  name,
  desc,
  index,
  isMobile,
}: {
  icon: React.ReactNode
  name: string
  desc: string
  index: number
  isMobile: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut, delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#f5f0e8',
        padding: isMobile ? '28px 24px' : '40px 36px',
        borderBottom: hovered ? '2px solid #c4603a' : '2px solid transparent',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
    >
      <div style={{ marginBottom: 20 }}>{icon}</div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#1a1410',
          marginBottom: 12,
          margin: '0 0 12px',
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'rgba(26,20,16,0.65)',
          margin: 0,
        }}
      >
        {desc}
      </p>
    </motion.div>
  )
}

export default function Modality() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: '#faf7f2',
        padding: isMobile ? '72px 0' : '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#c4603a',
            marginBottom: 24,
          }}
        >
          Modalidad de Trabajo
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px,4.5vw,64px)',
            fontWeight: 300,
            color: '#1a1410',
            lineHeight: 1.1,
            margin: '0 0 28px',
          }}
        >
          Cómo trabajamos
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>contigo.</em>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            fontWeight: 300,
            color: 'rgba(26,20,16,0.7)',
            maxWidth: 600,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          No son clases de idiomas genéricas. Cada sesión está diseñada para el contexto exacto de
          las escuelas europeas de arte y diseño a las que apuntas.
        </motion.p>

        {/* 3-col cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: 24,
            marginTop: 64,
          }}
        >
          {cards.map((card, i) => (
            <ModalityCard key={i} {...card} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
