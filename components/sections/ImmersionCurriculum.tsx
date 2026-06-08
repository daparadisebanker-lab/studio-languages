'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

// ─── Constants ────────────────────────────────────────────────────────────────

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]
const WA_NUMBER = '51983747658'
const WA_MSG = encodeURIComponent(
  'Hola, estoy estudiando en Europa y me interesa el Immersion Track. Quisiera agendar la conversación inicial gratuita.'
)

// ─── Types ────────────────────────────────────────────────────────────────────

type PhaseKey = 'A' | 'B' | 'C'

interface ImmersionModule {
  code: string
  title: string
  description: string
  outcome: string
}

interface ImmersionPhase {
  key: PhaseKey
  labelMono: string
  titleItalic: string
  timeframe: string
  modules: ImmersionModule[]
  color: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const immersionPhases: ImmersionPhase[] = [
  {
    key: 'A',
    labelMono: 'Fase A — Inserción Inmediata',
    titleItalic: 'Immediate Insertion',
    timeframe: 'Semanas 1–4',
    color: '#C4603A',
    modules: [
      {
        code: 'MI·01',
        title: 'Supervivencia profesional',
        description:
          'Vocabulario urgente para estudio, crítica, administración, vivienda, banca. Este módulo no se enseña en orden — es de despliegue rápido basado en lo que el estudiante encuentra primero. La semana uno en Milán no es igual a la semana uno en París.',
        outcome:
          'Gestionarás las interacciones administrativas y sociales urgentes de tu primera semana sin depender de aplicaciones de traducción.',
      },
      {
        code: 'MI·02',
        title: 'El entorno social del estudio',
        description:
          'Registro informal, humor, rituales sociales entre pares, cómo entrar a conversaciones que ya están en curso. La diferencia entre ser percibido como estudiante extranjero o como colega del programa.',
        outcome:
          'Participarás en conversaciones informales entre pares en el idioma del país sin esperar a que te incluyan explícitamente.',
      },
    ],
  },
  {
    key: 'B',
    labelMono: 'Fase B — Profundización',
    titleItalic: 'Deepening',
    timeframe: 'Meses 2–4',
    color: '#B8973A',
    modules: [
      {
        code: 'MI·03',
        title: 'Registro académico avanzado',
        description:
          'Seminarios, trabajos escritos, discurso académico, argumentación en el idioma objetivo. Cómo sostener una posición en una discusión de seminar sin perder precisión cuando el debate se acelera.',
        outcome:
          'Participarás en seminarios y entregarás trabajos escritos en el idioma del programa con el registro que la facultad espera.',
      },
      {
        code: 'MI·04',
        title: 'El ecosistema profesional',
        description:
          'Prácticas, inauguraciones, cultura de galería, email profesional, eventos de networking. Cómo leer un contrato de práctica, cómo escribir al director de un estudio, cómo presentarte en la apertura de una feria.',
        outcome:
          'Conseguirás y gestionarás una oportunidad de práctica o colaboración profesional operando completamente en el idioma del país.',
      },
    ],
  },
  {
    key: 'C',
    labelMono: 'Fase C — Posicionamiento',
    titleItalic: 'Positioning',
    timeframe: 'Meses 4–6',
    color: '#B8973A',
    modules: [
      {
        code: 'MI·05',
        title: 'Voz e identidad',
        description:
          'Cómo representar la perspectiva creativa latinoamericana en contextos institucionales europeos. No a pesar de ser latinoamericano sino a través de ello — como posición intelectual, no como exotismo.',
        outcome:
          'Articularás tu posición como creador latinoamericano en el contexto europeo con precisión y sin disculpa, en el idioma del país.',
      },
      {
        code: 'MI·06',
        title: 'Herramientas digitales y AI',
        description:
          'Uso estratégico de herramientas de traducción AI: cuándo ayudan y cuándo dañan la pertenencia profesional. Construcción de presencia profesional digital en italiano o francés — redes sociales, portfolio, correspondencia pública.',
        outcome:
          'Usarás herramientas AI de traducción con criterio profesional y mantendrás una presencia digital activa en el idioma del país con registro apropiado.',
      },
    ],
  },
]

// ─── Module Card ──────────────────────────────────────────────────────────────

function ImmersionModuleCard({ mod, isMobile }: { mod: ImmersionModule; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#322822' : '#2c2420',
        padding: isMobile ? '20px 16px' : '24px 28px',
        transition: 'background 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.22em',
          color: '#B8973A',
          opacity: 0.8,
          marginBottom: 10,
          display: 'block',
        }}
      >
        {mod.code}
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(245,240,232,0.9)',
          lineHeight: 1.2,
          margin: '0 0 12px 0',
        }}
      >
        {mod.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'rgba(245,240,232,0.44)',
          margin: '0 0 20px 0',
          flexGrow: 1,
        }}
      >
        {mod.description}
      </p>

      <div
        style={{
          borderTop: '1px solid rgba(184,151,58,0.2)',
          paddingTop: 14,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.18em',
            color: '#B8973A',
            display: 'block',
            marginBottom: 6,
          }}
        >
          Al completar:
        </span>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(245,240,232,0.6)',
            margin: 0,
          }}
        >
          {mod.outcome}
        </p>
      </div>
    </div>
  )
}

// ─── Phase Accordion ──────────────────────────────────────────────────────────

function ImmersionPhaseAccordion({
  phase,
  isOpen,
  onToggle,
  isMobile,
}: {
  phase: ImmersionPhase
  isOpen: boolean
  onToggle: () => void
  isMobile: boolean
}) {
  return (
    <div style={{ borderTop: `2px solid ${phase.color}` }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '16px 20px' : '24px 0',
          minHeight: isMobile ? 52 : undefined,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Timeframe tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.22em',
                color: phase.color,
                background: `${phase.color}1A`,
                padding: '3px 8px',
                borderRadius: 2,
              }}
            >
              {phase.timeframe}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.2em',
              color: phase.color,
            }}
          >
            {phase.labelMono}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 22 : 26,
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f5f0e8',
              lineHeight: 1.15,
            }}
          >
            {phase.titleItalic}
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 16,
            color: phase.color,
            flexShrink: 0,
            lineHeight: 1,
            transition: 'transform 0.3s ease',
            display: 'inline-block',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : phase.modules.length === 1
                  ? '1fr'
                  : 'repeat(2, 1fr)',
                gap: '2px',
                paddingBottom: '32px',
              }}
            >
              {phase.modules.map((mod) => (
                <ImmersionModuleCard key={mod.code} mod={mod} isMobile={isMobile} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImmersionCurriculum() {
  const isMobile = useIsMobile()
  const [openPhases, setOpenPhases] = useState<Set<PhaseKey>>(new Set(['A']))

  function togglePhase(key: PhaseKey) {
    setOpenPhases((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        if (isMobile) {
          // On mobile: single-open — close all others, open only the tapped phase
          next.clear()
        }
        next.add(key)
      }
      return next
    })
  }

  return (
    <section style={{ background: '#172219', color: '#f5f0e8' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '72px 24px 0' : '120px 64px 0',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#c4603a',
            margin: '0 0 28px 0',
          }}
        >
          Immersion Track · Qué se trabaja
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? 'clamp(32px, 9vw, 48px)' : 'clamp(40px, 4vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.08,
            color: '#f5f0e8',
            margin: '0 0 56px 0',
          }}
        >
          No aprendes el idioma.
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
            Entras al ecosistema.
          </em>
        </motion.h2>

        {/* 2-col intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.12 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 80,
            marginBottom: '72px',
            paddingBottom: '64px',
            borderBottom: '1px solid rgba(245,240,232,0.06)',
            alignItems: 'start',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 26,
              fontWeight: 300,
              lineHeight: 1.4,
              color: '#f5f0e8',
              paddingLeft: 28,
              borderLeft: '2px solid #c4603a',
              margin: 0,
            }}
          >
            El programa en inglés resuelve las clases.{' '}
            <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
              El idioma del país resuelve el resto.
            </em>
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,240,232,0.52)',
              margin: 0,
            }}
          >
            El Immersion Track no es gramática ni vocabulario. Es el idioma con el que tu tutor cambia de
            registro cuando la conversación se vuelve interesante. Es el pitch que abre la práctica. Es la
            apertura donde construyes la red que importa. Sus módulos están calibrados a tu disciplina
            específica y a la ciudad donde estudias — no a un currículo genérico de idiomas.
          </p>
        </motion.div>

        {/* Phase accordion label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c4603a',
              whiteSpace: 'nowrap',
            }}
          >
            Tres fases · Seis módulos
          </span>
          <span
            style={{
              flexGrow: 1,
              maxWidth: 120,
              height: 1,
              background: 'rgba(245,240,232,0.06)',
              display: 'block',
            }}
          />
        </div>

        {/* Phase accordion */}
        <div>
          {immersionPhases.map((phase) => (
            <ImmersionPhaseAccordion
              key={phase.key}
              phase={phase}
              isOpen={openPhases.has(phase.key)}
              onToggle={() => togglePhase(phase.key)}
              isMobile={isMobile}
            />
          ))}
          <div style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }} />
        </div>
      </div>

      {/* CTA strip — full width */}
      <div
        style={{
          borderTop: '1px solid rgba(245,240,232,0.07)',
          marginTop: 64,
          padding: isMobile ? '40px 24px 48px' : '48px 64px 56px',
          maxWidth: '100%',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 28,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 2.8vw, 36px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f5f0e8',
              margin: '0 0 10px 0',
              lineHeight: 1.15,
            }}
          >
            ¿Ya estás en Europa?
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(245,240,232,0.42)',
              margin: 0,
            }}
          >
            La primera conversación es gratuita. En 30 minutos evaluamos tu ciudad, tu disciplina
            y el momento exacto en que estás — y definimos si el Immersion Track es lo que necesitas.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 16,
            flexShrink: 0,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: '#25D366',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              textDecoration: 'none',
              padding: isMobile ? '16px 24px' : '15px 28px',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease',
              width: isMobile ? '100%' : 'auto',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1da851')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#25D366')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribir por WhatsApp
          </a>
          <a
            href="#inscripcion"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(184,151,58,0.4)',
              color: '#B8973A',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              textDecoration: 'none',
              padding: isMobile ? '16px 24px' : '14px 28px',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
              width: isMobile ? '100%' : 'auto',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(184,151,58,0.7)'
              e.currentTarget.style.color = '#d4b24a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(184,151,58,0.4)'
              e.currentTarget.style.color = '#B8973A'
            }}
          >
            Agenda la conversación gratuita →
          </a>
        </div>
      </div>
    </section>
  )
}
