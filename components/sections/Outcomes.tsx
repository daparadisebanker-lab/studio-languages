'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface Pill {
  label: string
  variant: 'module' | 'vocab'
}

interface OutcomeExpanded {
  desarrollas: string
  modulos: Pill[]
  evaluacion: string
  vocabulario: Pill[]
  timeline: string
  instituciones: string
}

interface Outcome {
  number: string
  title: string
  body: string
  expanded: OutcomeExpanded
}

const outcomes: Outcome[] = [
  {
    number: '01',
    title: 'La crítica',
    body: 'Participas en una crítica de estudio en el idioma objetivo sin preparación previa. Entiendes, respondes y contribuyes.',
    expanded: {
      desarrollas:
        'Comprensión auditiva a velocidad natural en contexto de taller. Vocabulario de proceso, material y juicio crítico. Capacidad de respuesta espontánea y argumentada en el idioma objetivo.',
      modulos: [
        { label: 'A1 · El oído profesional', variant: 'module' },
        { label: 'A2 · Vocabulario de práctica creativa', variant: 'module' },
        { label: 'A3 · Leer la institución', variant: 'module' },
      ],
      evaluacion:
        'Una sesión de crítica simulada al final del programa. Tu trabajo presentado, feedback en el idioma objetivo, preguntas del evaluador. Sin guion. Sin aviso del tema.',
      vocabulario: [
        { label: 'critica', variant: 'vocab' },
        { label: 'proposta', variant: 'vocab' },
        { label: 'materiale', variant: 'vocab' },
        { label: 'processo', variant: 'vocab' },
        { label: 'riferimento', variant: 'vocab' },
        { label: 'intenzione', variant: 'vocab' },
        { label: 'struttura', variant: 'vocab' },
      ],
      timeline: '8–12 semanas desde nivel A2',
      instituciones:
        'Especialmente relevante para NABA, Domus Academy, Politecnico di Milano',
    },
  },
  {
    number: '02',
    title: 'El portfolio',
    body: 'Presentas tu trabajo y respondes preguntas del jurado en el idioma de la institución. Sin intérprete. Sin pausa.',
    expanded: {
      desarrollas:
        'Narrativa de trabajo coherente y argumentada. Lenguaje de intención artística. Vocabulario técnico de materiales y procesos. Manejo de preguntas inesperadas bajo presión.',
      modulos: [
        { label: 'A2 · Vocabulario de práctica creativa', variant: 'module' },
        { label: 'B1 · El idioma del portfolio y la carta', variant: 'module' },
      ],
      evaluacion:
        'Presentación de 10 minutos de tu portfolio real seguida de Q&A con evaluador externo. Sin guion. Las preguntas del evaluador no se conocen con antelación.',
      vocabulario: [
        { label: 'progetto', variant: 'vocab' },
        { label: 'opera', variant: 'vocab' },
        { label: 'serie', variant: 'vocab' },
        { label: 'ispirazione', variant: 'vocab' },
        { label: 'tecnica', variant: 'vocab' },
        { label: 'scala', variant: 'vocab' },
        { label: 'narrativa', variant: 'vocab' },
        { label: 'superficie', variant: 'vocab' },
      ],
      timeline: '6–10 semanas desde nivel A2',
      instituciones:
        'Crítico para ÉCAL, HEAD Genève, ENSAD Paris — instituciones con entrevista de portfolio en el proceso de admisión',
    },
  },
  {
    number: '03',
    title: 'La carta',
    body: 'Escribes una carta de motivación y un email a un profesor con el registro exacto que pide la institución — no B2 genérico.',
    expanded: {
      desarrollas:
        'Registro formal escrito en dos variantes: carta de motivación larga (600–800 palabras) y email corto a tutor o coordinador. Comprensión de convenciones epistolares institucionales europeas.',
      modulos: [
        { label: 'B1 · El idioma del portfolio y la carta', variant: 'module' },
        { label: 'C1 · Producción escrita y voz digital', variant: 'module' },
      ],
      evaluacion:
        'Redacción en tiempo limitado (45 minutos) de una carta de motivación real para tu institución objetivo. Evaluada en registro, coherencia argumentativa y adecuación cultural — no solo gramática.',
      vocabulario: [
        { label: 'Gentile professore', variant: 'vocab' },
        { label: 'Le scrivo per', variant: 'vocab' },
        { label: 'In riferimento a', variant: 'vocab' },
        { label: 'Sono a disposizione', variant: 'vocab' },
        { label: 'Cordiali saluti', variant: 'vocab' },
        { label: 'allegato', variant: 'vocab' },
      ],
      timeline: '4–8 semanas, puede desarrollarse en paralelo con otros módulos',
      instituciones:
        'Todas las instituciones de la lista — la carta de motivación es universal en el proceso de admisión europeo',
    },
  },
  {
    number: '04',
    title: 'El entorno social',
    body: 'Navegas situaciones informales — una apertura, una conversación en el estudio, una cena con compañeros — sin que el idioma sea una barrera.',
    expanded: {
      desarrollas:
        'Registro informal y coloquial. Prosodia e entonación social. Humor y referencias culturales. Cómo entrar a conversaciones ya en curso. Cómo pedir ayuda sin perder posición.',
      modulos: [
        { label: 'A1 · El oído profesional', variant: 'module' },
        { label: 'A3 · Leer la institución', variant: 'module' },
      ],
      evaluacion:
        'Conversación espontánea no estructurada al final de una sesión — sin aviso previo, sin tema asignado. El evaluador introduce referencias culturales del contexto italiano o francés.',
      vocabulario: [
        { label: 'dai', variant: 'vocab' },
        { label: 'comunque', variant: 'vocab' },
        { label: 'tipo', variant: 'vocab' },
        { label: 'magari', variant: 'vocab' },
        { label: 'insomma', variant: 'vocab' },
        { label: 'già', variant: 'vocab' },
        { label: 'vabbè', variant: 'vocab' },
      ],
      timeline:
        'Desarrollado progresivamente a lo largo de todo el programa — no tiene fecha de inicio ni fin discretos',
      instituciones:
        'Crítico especialmente para ciudades con vida cultural activa: Milán, París, Lausana, Lyon',
    },
  },
  {
    number: '05',
    title: 'Los documentos',
    body: 'Lees y entiendes syllabi, convocatorias, contratos y comunicaciones institucionales en el idioma original.',
    expanded: {
      desarrollas:
        'Comprensión lectora de textos especializados con vocabulario técnico, administrativo y legal. Capacidad de extraer información relevante de documentos densos. Lectura selectiva y skim eficiente en el idioma objetivo.',
      modulos: [
        { label: 'B2 · Investigar la institución', variant: 'module' },
        { label: 'C1 · Producción escrita y voz digital', variant: 'module' },
      ],
      evaluacion:
        'Lectura de un documento institucional real (syllabus o convocatoria) en el idioma objetivo, seguida de un resumen oral en español de los puntos clave. Tiempo límite: 20 minutos de lectura.',
      vocabulario: [
        { label: 'crediti formativi', variant: 'vocab' },
        { label: 'propedeutico', variant: 'vocab' },
        { label: 'laboratorio', variant: 'vocab' },
        { label: 'seminario', variant: 'vocab' },
        { label: 'tesi', variant: 'vocab' },
        { label: 'commissione', variant: 'vocab' },
        { label: 'bando', variant: 'vocab' },
        { label: 'scadenza', variant: 'vocab' },
      ],
      timeline: 'Módulo B2 inicia en semana 6–8, dependiendo del progreso en Fase A',
      instituciones:
        'Especialmente útil para NABA (syllabi densos), Politecnico di Milano (convocatorias de beca), ISIA (documentación en italiano únicamente)',
    },
  },
  {
    number: '06',
    title: 'Tu voz',
    body: 'Representas tu práctica latinoamericana con claridad y confianza en contexto europeo. No a pesar de tu origen — a través de él.',
    expanded: {
      desarrollas:
        'Capacidad de articular referencias visuales y conceptuales latinoamericanas en el idioma del contexto europeo. Vocabulario de referentes propios. Posicionamiento de identidad creativa que no pide disculpas por su origen.',
      modulos: [
        { label: 'A3 · Leer la institución', variant: 'module' },
        { label: 'C1 · Producción escrita y voz digital', variant: 'module' },
        { label: 'Todo el programa en integración', variant: 'module' },
      ],
      evaluacion:
        'Una declaración de artista de 3–5 minutos en el idioma objetivo que integra referencias latinoamericanas y posiciona el trabajo en diálogo crítico con el contexto europeo. Evaluada en coherencia de voz, no en gramática.',
      vocabulario: [
        { label: 'mestizaje visual', variant: 'vocab' },
        { label: 'território', variant: 'vocab' },
        { label: 'memoria colectiva', variant: 'vocab' },
        { label: 'práctica situada', variant: 'vocab' },
        { label: 'diálogo Norte-Sur', variant: 'vocab' },
      ],
      timeline:
        'Módulo de integración — emerge en Fase C después de haber construido base en Fases A y B',
      instituciones:
        'Más relevante para instituciones con fuerte dimensión crítica y discursiva: HEAD Genève, ENSAD, Le Fresnoy, Goldsmiths (para referencia)',
    },
  },
]

function PillTag({ pill }: { pill: Pill }) {
  if (pill.variant === 'module') {
    return (
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.04em',
          color: '#c4603a',
          background: 'rgba(196,96,58,0.12)',
          border: '1px solid rgba(196,96,58,0.22)',
          borderRadius: 2,
          padding: '3px 8px',
          whiteSpace: 'nowrap',
        }}
      >
        {pill.label}
      </span>
    )
  }
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        color: 'rgba(245,240,232,0.75)',
        background: 'rgba(245,240,232,0.08)',
        border: '1px solid rgba(245,240,232,0.5)',
        borderRadius: 2,
        padding: '3px 8px',
        whiteSpace: 'nowrap',
      }}
    >
      {pill.label}
    </span>
  )
}

function SectionRule() {
  return (
    <div
      style={{
        height: 1,
        background: 'rgba(196,96,58,0.2)',
        margin: '16px 0',
      }}
    />
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: 'rgba(196,96,58,0.6)',
        margin: '0 0 8px',
      }}
    >
      {children}
    </p>
  )
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 300,
        lineHeight: 1.65,
        color: 'rgba(245,240,232,0.6)',
        margin: 0,
      }}
    >
      {children}
    </p>
  )
}

function SmallMutedText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        lineHeight: 1.5,
        color: 'rgba(245,240,232,0.35)',
        margin: 0,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </p>
  )
}

function ExpandedPanel({ data }: { data: OutcomeExpanded }) {
  return (
    <div style={{ padding: 28 }}>
      {/* Lo que desarrollas */}
      <SectionLabel>Lo que desarrollas</SectionLabel>
      <SectionText>{data.desarrollas}</SectionText>

      <SectionRule />

      {/* Módulos */}
      <SectionLabel>Módulos que construyen esto</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {data.modulos.map((p, i) => (
          <PillTag key={i} pill={p} />
        ))}
      </div>

      <SectionRule />

      {/* Evaluación */}
      <SectionLabel>Cómo lo evaluamos</SectionLabel>
      <SectionText>{data.evaluacion}</SectionText>

      <SectionRule />

      {/* Vocabulario */}
      <SectionLabel>Vocabulario clave</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {data.vocabulario.map((p, i) => (
          <PillTag key={i} pill={p} />
        ))}
      </div>

      <SectionRule />

      {/* Timeline */}
      <SectionLabel>Timeline orientativo</SectionLabel>
      <SmallMutedText>{data.timeline}</SmallMutedText>

      <div style={{ marginTop: 12 }}>
        <SectionLabel>Instituciones</SectionLabel>
        <SmallMutedText>{data.instituciones}</SmallMutedText>
      </div>
    </div>
  )
}

function OutcomeCard({
  outcome,
  index,
  isOpen,
  onToggle,
  prefersReduced,
  isMobile,
}: {
  outcome: Outcome
  index: number
  isOpen: boolean
  onToggle: () => void
  prefersReduced: boolean
  isMobile: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`outcome-card-${index}`}
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReduced ? 0 : 0.65,
        ease: easeOut,
        delay: prefersReduced ? 0 : index * 0.08,
        layout: { duration: prefersReduced ? 0 : 0.45, ease: easeOut },
      }}
      onClick={() => {
        onToggle()
        if (typeof window !== 'undefined' && isMobile) {
          setTimeout(() => {
            document.getElementById(`outcome-card-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }, 100)
        }
      }}
      style={{
        background: isOpen
          ? '#ffffff'
          : hovered
          ? 'rgba(196,96,58,0.04)'
          : '#ffffff',
        border: isOpen
          ? '1px solid #c4603a'
          : '1px solid rgba(26,20,16,0.06)',
        cursor: 'default',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        position: 'relative',
      }}
    >
      {/* Card summary area */}
      <div
        style={{
          padding: isMobile ? '24px 20px' : '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          background: isOpen ? 'rgba(245,240,232,0.35)' : '#ffffff',
          transition: 'background 0.25s ease',
        }}
      >
        {/* Top row: number + toggle indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isMobile ? 24 : 32,
              fontWeight: 400,
              color: 'rgba(196,96,58,0.15)',
              lineHeight: 1,
              display: 'block',
            }}
          >
            {outcome.number}
          </span>

          {/* +/× indicator — 52×52 touch target */}
          <div
            style={{
              width: 52,
              minHeight: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: -10,
              marginTop: -10,
            }}
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{
                duration: prefersReduced ? 0 : 0.3,
                ease: easeOut,
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: isOpen
                  ? '1px solid rgba(196,96,58,0.4)'
                  : '1px solid rgba(26,20,16,0.12)',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: isOpen ? '#c4603a' : 'rgba(26,20,16,0.4)',
                lineHeight: 1,
                flexShrink: 0,
                transition: 'border-color 0.25s ease, color 0.25s ease',
                transformOrigin: 'center',
              }}
            >
              +
            </motion.span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#1a1410',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {outcome.title}
        </h3>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'rgba(26,20,16,0.6)',
            margin: 0,
          }}
        >
          {outcome.body}
        </p>
      </div>

      {/* Expanded dark panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: prefersReduced ? 0 : 0.45,
                ease: easeOut,
              },
              opacity: {
                duration: prefersReduced ? 0 : 0.3,
                ease: 'easeInOut',
              },
            }}
            style={{
              overflow: 'hidden',
              background: '#1a1410',
            }}
          >
            <ExpandedPanel data={outcome.expanded} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Outcomes() {
  const isMobile = useIsMobile()
  const prefersReduced = useReducedMotion() ?? false
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function handleToggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section
      style={{
        background: '#FAFAF7',
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
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: prefersReduced ? 0 : 0.7, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#c4603a',
            marginBottom: 20,
          }}
        >
          Lo que construyes
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: prefersReduced ? 0 : 0.8,
            ease: easeOut,
            delay: prefersReduced ? 0 : 0.05,
          }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 48px)',
            fontStyle: 'italic',
            color: '#1a1410',
            lineHeight: 1.1,
            margin: '0 0 20px',
          }}
        >
          <span style={{ fontWeight: 300 }}>Seis </span>
          <span style={{ fontWeight: 400 }}>capacidades.</span>
          <span style={{ fontWeight: 300 }}> Medibles. Verificables.</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: prefersReduced ? 0 : 0.7,
            ease: easeOut,
            delay: prefersReduced ? 0 : 0.1,
          }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(26,20,16,0.55)',
            maxWidth: 520,
            margin: '0 0 12px',
          }}
        >
          No describimos resultados en abstracto. Estos son los seis momentos
          concretos en los que el programa se demuestra — o no.
        </motion.p>

        {/* Touch hint — mobile only */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: prefersReduced ? 0 : 0.6,
            ease: easeOut,
            delay: prefersReduced ? 0 : 0.18,
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(26,20,16,0.25)',
            margin: '0 0 52px',
            display: isMobile ? 'block' : 'none',
          }}
        >
          Toca para explorar →
        </motion.p>

        {/* 2-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? 12 : 24,
            alignItems: 'start',
          }}
        >
          {outcomes.map((outcome, i) => (
            <OutcomeCard
              key={i}
              outcome={outcome}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              prefersReduced={prefersReduced}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: prefersReduced ? 0 : 0.7, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 24,
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#c4603a',
            textAlign: 'center',
            marginTop: 56,
            marginBottom: 0,
          }}
        >
          Si al completar el programa no puedes hacer estas seis cosas, el
          programa no cumplió su función.
        </motion.p>
      </div>
    </section>
  )
}
