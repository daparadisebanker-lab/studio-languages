'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const criteria = [
  {
    strong: 'Tienes una dirección creativa clara',
    normal:
      'Sabes que quieres estudiar diseño, arte, arquitectura o moda en Europa — y ya tienes o estás construyendo un portafolio.',
  },
  {
    strong: 'Tu lista de instituciones objetivo está definida',
    normal:
      'Ya investigaste a NABA, ÉCAL, Politecnico o HEAD. Sabes que estas escuelas exigen el idioma. Necesitas un programa que te lleve ahí.',
  },
  {
    strong: 'Estás a 1–3 años de aplicar',
    normal:
      'Ya sea en ciclo de preparación temprana o en el año de aplicación activo, tienes tiempo para construir el nivel de idioma que los comités realmente reconocen.',
  },
  {
    strong: 'Quieres más que gramática',
    normal:
      'Entiendes que el idioma es la puerta al mundo cultural al que quieres pertenecer — no solo un requisito de admisión que cumplir.',
  },
  {
    strong: 'Puedes comprometerte con un programa serio',
    normal:
      'Esto requiere entre 4 y 8 sesiones mensuales de trabajo real. No es un curso de apps. Es preparación de nivel institucional.',
  },
]

export default function WhySection() {
  const isMobile = useIsMobile()

  return (
    <section
      id="para-quien"
      style={{
        background: '#2c2420',
        color: '#f5f0e8',
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
            color: 'rgba(245,240,232,0.4)',
            marginBottom: 24,
          }}
        >
          ¿Para quién es este programa?
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
            color: '#f5f0e8',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 28,
          }}
        >
          Esto es para ti si
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(245,240,232,0.6)' }}>ya lo sabes.</em>
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
            color: 'rgba(245,240,232,0.6)',
            maxWidth: 600,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          No enseñamos a cualquiera. El programa está diseñado para estudiantes que ya tienen una
          dirección creativa y necesitan el idioma como herramienta estratégica para llegar adonde
          quieren.
        </motion.p>

        {/* 2-col grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 64,
            marginTop: 64,
            alignItems: 'start',
          }}
        >
          {/* Left — Criteria list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {criteria.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: i === 0 ? '0 0 24px' : '24px 0',
                  borderBottom: '1px solid rgba(245,240,232,0.07)',
                }}
              >
                {/* Check circle */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    border: '1px solid #c4603a',
                    borderRadius: '50%',
                    flexShrink: 0,
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#c4603a' }}>✓</span>
                </div>

                {/* Text */}
                <div>
                  <strong
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 17,
                      fontWeight: 500,
                      color: 'rgba(245,240,232,0.95)',
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    {item.strong}
                  </strong>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      fontWeight: 300,
                      color: 'rgba(245,240,232,0.75)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.normal}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — Quote box */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            style={{
              background: 'rgba(245,240,232,0.03)',
              border: '1px solid rgba(245,240,232,0.08)',
              padding: 48,
              position: 'relative',
            }}
          >
            {/* Decorative quote mark */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 80 : 120,
                color: '#c4603a',
                opacity: 0.2,
                position: 'absolute',
                top: 10,
                left: 28,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              ❝
            </span>

            {/* Quote text */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(245,240,232,0.85)',
                lineHeight: 1.45,
                marginBottom: 24,
                position: 'relative',
                zIndex: 1,
                margin: '0 0 24px',
              }}
            >
              El portafolio abre la puerta. El idioma determina si te dejan entrar.
            </p>

            {/* Attribution */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#c4603a',
                margin: 0,
              }}
            >
              — Studio by Paradise
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
