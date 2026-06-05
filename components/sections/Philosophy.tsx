'use client';

import { motion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cards = [
  {
    ghost: 'I',
    title: 'El idioma es el medio, no el fin',
    text: 'El idioma no se enseña en el vacío. Cada clase existe dentro del universo conceptual y cultural de la disciplina que el estudiante quiere practicar. El vocabulario que construimos es operativo — sirve para hablar de obra, defender decisiones, leer teoría.',
  },
  {
    ghost: 'II',
    title: 'La alfabetización cultural antecede a la fluidez',
    text: 'Saber que la crítica contemporánea francesa proviene de Barthes, que el diseño milanés está en conversación con el Bauhausian y el postmoderno — eso cambia cómo el estudiante se posiciona en una entrevista de admisión. El contexto convierte el idioma en autoridad.',
  },
  {
    ghost: 'III',
    title: 'La admisión es el horizonte',
    text: 'Todo en el programa está calibrado al momento en que el estudiante tiene que demostrar competencia real — la entrevista de portafolio, la carta de motivación, el artist statement. El objetivo no es un examen. Es un comité de admisión europeo.',
  },
];

export default function Philosophy() {
  return (
    <section
      style={{
        background: '#faf7f2',
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#c4603a',
            }}
          >
            Filosofía Pedagógica
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: '#c4603a',
              flexShrink: 0,
            }}
          />
        </motion.div>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#1a1410',
            margin: 0,
          }}
        >
          Cómo entendemos
          <br />
          <em style={{ fontStyle: 'italic' }}>la enseñanza.</em>
        </motion.h2>

        {/* 3-col cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2px',
            marginTop: '64px',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.ghost}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 1.0,
                ease: easeOut,
                delay: i * 0.12,
              }}
              style={{
                background: '#f5f0e8',
                padding: '48px 40px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost number */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '28px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '80px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#c4603a',
                  opacity: 0.12,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {card.ghost}
              </span>

              {/* Title */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '26px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#1a1410',
                  margin: '0 0 16px 0',
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </p>

              {/* Text */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#1a1410',
                  opacity: 0.65,
                  margin: 0,
                }}
              >
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
