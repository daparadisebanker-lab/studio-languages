'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const IconSearch = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)
const IconRoute = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3"/>
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
    <circle cx="18" cy="5" r="3"/>
  </svg>
)
const IconTool = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IconStar = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const steps = [
  {
    icon: <IconSearch />,
    number: '01',
    title: 'Diagnóstico',
    desc: 'La primera sesión es una evaluación. Identificamos tu nivel real, tu institución objetivo y los momentos específicos del idioma que necesitas dominar. No empezamos a enseñar hasta entender exactamente qué necesitas.',
    active: true,
  },
  {
    icon: <IconRoute />,
    number: '02',
    title: 'Programa calibrado',
    desc: 'Construimos una ruta específica para ti — no un programa genérico. El ritmo, los módulos y el foco están determinados por tu timeline de aplicación y tu nivel de entrada.',
    active: true,
  },
  {
    icon: <IconTool />,
    number: '03',
    title: 'Práctica en contexto real',
    desc: 'Cada sesión construida alrededor de una tarea real. Un email que necesitas enviar. Una presentación que tienes que hacer. Una crítica que vas a enfrentar. El idioma como herramienta, no como objeto de estudio.',
    active: false,
  },
  {
    icon: <IconStar />,
    number: '04',
    title: 'Evaluación final y capstone',
    desc: 'Al completar el programa, una sesión de evaluación final: una presentación de portfolio o participación en una crítica simulada en el idioma objetivo. Sin teoría — una demostración real de lo que puedes hacer.',
    active: false,
  },
]

function CtaLink({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 24px',
        border: '1px solid rgba(196,96,58,0.4)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: '#c4603a',
        textDecoration: 'none',
        whiteSpace: 'nowrap' as const,
        flexShrink: 0,
        transition: 'border-color 0.2s ease, background 0.2s ease',
        background: hovered ? 'rgba(196,96,58,0.06)' : 'transparent',
        borderColor: hovered ? 'rgba(196,96,58,0.7)' : 'rgba(196,96,58,0.4)',
      }}
    >
      Empezar el proceso
      <span
        style={{
          display: 'inline-block',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.2s ease',
        }}
      >
        →
      </span>
    </a>
  )
}

export default function StudioPath() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: '#ECE2CD',
        padding: isMobile ? '72px 0' : '120px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ghost numeral — editorial background layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: isMobile ? -10 : 0,
          fontSize: 'clamp(100px, 15vw, 180px)',
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          color: 'rgba(26,20,16,0.04)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        04
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
          position: 'relative',
          zIndex: 1,
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
            margin: '0 0 64px',
          }}
        >
          Cuatro pasos.
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>Al otro lado.</em>
        </motion.h2>

        {/* 4-step path */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? 0 : 0,
            position: 'relative',
          }}
        >
          {/* Connecting line — desktop only */}
          <div
            style={{
              display: isMobile ? 'none' : 'block',
              position: 'absolute',
              top: 36,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background: 'linear-gradient(to right, #c4603a, rgba(196,96,58,0.2))',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: easeOut, delay: i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: isMobile ? 'flex-start' : 'center',
                textAlign: isMobile ? 'left' : 'center',
                padding: isMobile ? 0 : '0 16px',
                paddingBottom: isMobile ? 24 : 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Vertical connector line between steps — mobile only */}
              {isMobile && i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: isMobile ? 25 : 'auto',
                    top: isMobile ? 52 : 'auto',
                    bottom: 0,
                    width: 1,
                    background: 'rgba(26,20,16,0.1)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Step circle */}
              <div
                style={{
                  width: isMobile ? 52 : 72,
                  height: isMobile ? 52 : 72,
                  borderRadius: '50%',
                  border: '2px solid #c4603a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: isMobile ? 0 : 20,
                  marginRight: isMobile ? 16 : 0,
                  background: step.active ? '#c4603a' : '#DDD3B8',
                  color: step.active ? '#F5F0E8' : '#c4603a',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.active ? (
                  <>
                    {step.icon}
                    {/* Active indicator dot */}
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        right: 6,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#F5F0E8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 8,
                        color: '#F5F0E8',
                        lineHeight: 1,
                      }}
                    >
                      ·
                    </span>
                  </>
                ) : (
                  step.icon
                )}
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: step.active ? '#c4603a' : '#6b6860',
                    margin: '0 0 8px',
                  }}
                >
                  {step.number}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isMobile ? 15 : 20,
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#1a1410',
                    lineHeight: 1.2,
                    margin: '0 0 8px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: 'rgba(26,20,16,0.55)',
                    maxWidth: isMobile ? '100%' : 200,
                    margin: isMobile ? 0 : '0 auto',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: '1px solid rgba(26,20,16,0.08)',
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 20,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1a1410',
              margin: 0,
            }}
          >
            Así funciona el proceso.
          </p>
          <CtaLink href="#contacto" />
        </motion.div>

      </div>
    </section>
  )
}
