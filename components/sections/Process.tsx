'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Conversación inicial',
    description:
      'Hablamos sobre el perfil creativo del estudiante, sus instituciones objetivo y en qué punto del proceso se encuentra. Sin compromisos.',
  },
  {
    number: '02',
    title: 'Diagnóstico de nivel',
    description:
      'Evaluamos el nivel actual del idioma objetivo y definimos el itinerario de contenidos culturales y disciplinares más relevante para su trayectoria.',
  },
  {
    number: '03',
    title: 'Programa personalizado',
    description:
      'Clases con profesores nativos especializados en arte y diseño. El contenido está calibrado a la escuela y programa que el estudiante quiere ingresar.',
  },
  {
    number: '04',
    title: 'Preparación de admisión',
    description:
      'Cuando llegue el momento, el idioma ya es una herramienta — no un obstáculo. Entrevistas, cartas de motivación, portfolios escritos: todo con la voz correcta.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Process() {
  return (
    <section
      style={{
        background: '#f5f2ec',
        color: '#1a1916',
        padding: '14rem 4rem',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '8rem' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1a1916',
          }}
        >
          {'Cómo funciona /\nel '}
          <em style={{ color: '#c8451a', fontStyle: 'italic' }}>proceso</em>
        </h2>
      </motion.div>

      {/* Steps grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(26,25,22,0.12)',
          borderLeft: '1px solid rgba(26,25,22,0.12)',
        }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={stepVariants}
            style={{
              borderRight: '1px solid rgba(26,25,22,0.12)',
              borderBottom: '1px solid rgba(26,25,22,0.12)',
              padding: '3.5rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Step number — decorative */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4.5rem',
                fontWeight: 300,
                color: 'rgba(26,25,22,0.08)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              {step.number}
            </span>

            {/* Step title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 500,
                color: '#1a1916',
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </h3>

            {/* Step description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(26,25,22,0.55)',
              }}
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
