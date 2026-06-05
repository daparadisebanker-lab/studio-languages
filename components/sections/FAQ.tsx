'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: '¿Necesito tener experiencia previa en el idioma?',
    a: 'No es necesario. Comenzamos con un diagnóstico de nivel que determina exactamente dónde estás. Los programas se estructuran desde cero o desde niveles intermedios según el punto de partida del estudiante.',
  },
  {
    q: '¿Cuánto dura el programa?',
    a: 'La duración depende del objetivo. Para estudiantes en etapa temprana (2+ años antes de aplicar), recomendamos un mínimo de 12 meses. Para estudiantes en ciclo de aplicación activo, tenemos formatos intensivos de 6 meses.',
  },
  {
    q: '¿Las clases son presenciales o virtuales?',
    a: 'Actualmente operamos en modalidad virtual sincrónica — sesiones 1 a 1 por videollamada con el profesor asignado. Esto permite flexibilidad de horario sin sacrificar la intensidad del acompañamiento.',
  },
  {
    q: '¿Cómo sé si elegir italiano o francés?',
    a: 'Depende de tus instituciones objetivo. Si tu lista incluye NABA, Domus Academy o Politecnico di Milano, el italiano es la elección natural. Si apuntas a ENSAD, HEAD Genève o ÉCAL, el francés es el idioma estratégico. En muchos casos, recomendamos comenzar con uno e introducir el segundo en el segundo año.',
  },
  {
    q: '¿En qué momento del proceso de admisión debo comenzar?',
    a: 'Cuanto antes, mejor. Lo ideal es iniciar el programa de idiomas 18 a 24 meses antes de la fecha de aplicación. Esto permite alcanzar un nivel de fluidez funcional y desarrollar el vocabulario técnico especializado que los comités de admisión buscan.',
  },
  {
    q: '¿Los profesores tienen experiencia en arte y diseño?',
    a: 'Sí. Todos nuestros instructores son hablantes nativos del idioma con formación o experiencia en el campo de las artes, el diseño o la arquitectura. No son profesores de idiomas generales — conocen el mundo al que tus estudiantes quieren ingresar.',
  },
  {
    q: '¿Qué pasa si el estudiante no logra ingresar a la institución objetivo?',
    a: 'Studio no garantiza admisiones — ninguna institución honesta puede hacerlo. Lo que sí garantizamos es que el estudiante llega a la instancia de aplicación con el nivel de idioma y la preparación cultural necesarios para ser considerado seriamente. La decisión final siempre es del comité de admisión.',
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(245,242,236,0.1)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          padding: '2rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 400,
            lineHeight: 1.3,
            color: '#f5f2ec',
          }}
        >
          {q}
        </span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            fontWeight: 400,
            color: '#c8451a',
            flexShrink: 0,
            lineHeight: 1,
            width: '1em',
            textAlign: 'center',
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(245,242,236,0.55)',
                paddingBottom: '2rem',
                margin: 0,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      style={{
        background: '#1a1916',
        padding: '12rem 4rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '6rem',
          alignItems: 'start',
        }}
      >
        {/* Left column — sticky header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'sticky',
            top: '8rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c8451a',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          >
            Preguntas
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#f5f2ec',
              margin: 0,
            }}
          >
            {'Lo que suelen\npreguntar'}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,242,236,0.4)',
              marginTop: '2rem',
            }}
          >
            Si tienes una pregunta que no aparece aquí, escríbenos por WhatsApp
            — te respondemos en menos de 24 horas.
          </p>
        </motion.div>

        {/* Right column — accordion */}
        <div>
          {/* First item has a top border */}
          <div
            style={{
              borderTop: '1px solid rgba(245,242,236,0.1)',
            }}
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
