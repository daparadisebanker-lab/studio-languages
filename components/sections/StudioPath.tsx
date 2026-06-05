'use client'

import { motion } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const steps = [
  {
    active: true,
    icon: '🔍',
    number: '01',
    title: 'Conversación inicial',
    desc: 'Hablamos sobre tu perfil creativo, tus instituciones objetivo y tu nivel actual. Sin compromisos.',
  },
  {
    active: true,
    icon: '📋',
    number: '02',
    title: 'Diagnóstico',
    desc: 'Evaluamos tu nivel y definimos el mapa de contenidos calibrado a tu destino específico.',
  },
  {
    active: false,
    icon: '📖',
    number: '03',
    title: 'Programa en marcha',
    desc: 'Clases 1 a 1 con profesor nativo, contenido especializado, ritmo calibrado a tu proceso de aplicación.',
  },
  {
    active: false,
    icon: '✍️',
    number: '04',
    title: 'Materiales de admisión',
    desc: 'Artist statement, carta de motivación y preparación de entrevista en el idioma de destino.',
  },
  {
    active: false,
    icon: '🎓',
    number: '05',
    title: 'Aplicación',
    desc: 'Llegas a la instancia de admisión con el idioma como herramienta — no como obstáculo.',
  },
]

export default function StudioPath() {
  return (
    <section
      style={{
        background: '#f5f0e8',
        padding: '120px 0',
        overflow: 'hidden',
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

        {/* 5-step horizontal path */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            marginTop: 80,
            position: 'relative',
          }}
        >
          {/* Connecting line */}
          <div
            style={{
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
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 16px',
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
                  marginBottom: 20,
                  fontSize: 24,
                  background: step.active ? '#c4603a' : '#ede8df',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

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
                  maxWidth: 160,
                  margin: '0 auto',
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
