'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const cards = [
  {
    icon: '🎯',
    name: 'Sesiones 1 a 1',
    desc: 'Cada clase es una sesión individual con un profesor nativo especializado en arte y diseño. El contenido se calibra al perfil del estudiante — sus instituciones objetivo, su disciplina, su nivel actual.',
  },
  {
    icon: '📚',
    name: 'Contenido a medida',
    desc: 'No existe un currículo genérico. El mapa de contenidos se construye a partir del programa al que aplica el estudiante. Lo que aprendes es exactamente lo que necesitas saber para llegar ahí.',
  },
  {
    icon: '🏛️',
    name: 'Preparación de admisión',
    desc: 'El programa culmina en las herramientas concretas de aplicación: el artist statement en el idioma de destino, la carta de motivación, la preparación para la entrevista de portafolio.',
  },
]

function ModalityCard({
  icon,
  name,
  desc,
  index,
}: {
  icon: string
  name: string
  desc: string
  index: number
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
        padding: '40px 36px',
        borderBottom: hovered ? '2px solid #c4603a' : '2px solid transparent',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: 32, marginBottom: 20, display: 'block' }}>{icon}</span>
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
  return (
    <section
      style={{
        background: '#faf7f2',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 64px',
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
          El programa no es un grupo de conversación. Es un acompañamiento personalizado hacia una
          meta institucional específica.
        </motion.p>

        {/* 3-col cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
            marginTop: 64,
          }}
        >
          {cards.map((card, i) => (
            <ModalityCard key={i} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
