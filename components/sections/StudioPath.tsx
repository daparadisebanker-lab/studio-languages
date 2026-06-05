'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* Minimal stroke SVG icons — inherit color via currentColor */
const IconChat = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconClipboard = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)
const IconBook = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)
const IconPen = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)
const IconArrowIn = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
)

const steps = [
  {
    active: true,
    icon: <IconChat />,
    number: '01',
    title: 'Conversación inicial',
    desc: 'Hablamos sobre tu perfil creativo, tus instituciones objetivo y tu nivel actual. Sin compromisos.',
  },
  {
    active: true,
    icon: <IconClipboard />,
    number: '02',
    title: 'Diagnóstico',
    desc: 'Evaluamos tu nivel y definimos el mapa de contenidos calibrado a tu destino específico.',
  },
  {
    active: false,
    icon: <IconBook />,
    number: '03',
    title: 'Programa en marcha',
    desc: 'Clases 1 a 1 con profesor nativo, contenido especializado, ritmo calibrado a tu proceso de aplicación.',
  },
  {
    active: false,
    icon: <IconPen />,
    number: '04',
    title: 'Materiales de admisión',
    desc: 'Artist statement, carta de motivación y preparación de entrevista en el idioma de destino.',
  },
  {
    active: false,
    icon: <IconArrowIn />,
    number: '05',
    title: 'Aplicación',
    desc: 'Llegas a la instancia de admisión con el idioma como herramienta — no como obstáculo.',
  },
]

export default function StudioPath() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: '#f5f0e8',
        padding: isMobile ? '72px 0' : '120px 0',
        overflow: 'hidden',
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
          El Recorrido
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
            margin: '0 0 0',
          }}
        >
          De cero al idioma
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>como herramienta.</em>
        </motion.h2>

        {/* 5-step path */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
            gap: isMobile ? 24 : 0,
            marginTop: 80,
            position: 'relative',
          }}
        >
          {/* Connecting line — desktop only */}
          <div
            style={{
              display: isMobile ? 'none' : 'block',
              position: 'absolute',
              top: 36,
              left: '10%',
              right: '10%',
              height: 1,
              background: 'linear-gradient(to right, #c4603a, rgba(196,96,58,0.2))',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.1 + i * 0.07 }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: isMobile ? 'flex-start' : 'center',
                textAlign: isMobile ? 'left' : 'center',
                padding: isMobile ? 0 : '0 16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step dot */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  border: '2px solid #c4603a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: isMobile ? 0 : 20,
                  marginRight: isMobile ? 16 : 0,
                  background: step.active ? '#c4603a' : '#ede8df',
                  color: step.active ? '#f5f0e8' : '#c4603a',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

              {/* Text content */}
              <div>
                {/* Step number */}
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: step.active ? '#c4603a' : '#6b6860',
                    marginBottom: 8,
                    margin: '0 0 8px',
                  }}
                >
                  {step.number}
                </p>

                {/* Step title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#1a1410',
                    lineHeight: 1.2,
                    marginBottom: 8,
                    margin: '0 0 8px',
                  }}
                >
                  {step.title}
                </h3>

                {/* Step desc */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: 'rgba(26,20,16,0.55)',
                    maxWidth: isMobile ? 'none' : 160,
                    margin: isMobile ? 0 : '0 auto',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
