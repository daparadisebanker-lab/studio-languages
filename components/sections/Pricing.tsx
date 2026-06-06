'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Curriculum preview data ──────────────────────────────────────────────────

type CurriculumLang = 'it' | 'fr'

const CURRICULUM_PREVIEW: Record<CurriculumLang, { num: string; title: string; subtitle: string; tags: string[] }[]> = {
  it: [
    { num: 'M01', title: 'Il Vocabolario dello Studio',    subtitle: 'Vocabulario de Estudio y Crítica',                    tags: ['Crítica de portafolio', 'Vocabulario formal', 'Defensa de proyecto', 'Entrevista de admisión'] },
    { num: 'M02', title: 'La Forma Italiana',               subtitle: 'Historia del Diseño Italiano · 1945–Presente',        tags: ['Gio Ponti', 'Ettore Sottsass', 'Memphis Group', 'Bruno Munari', 'Domus Magazine'] },
    { num: 'M03', title: 'Spazio e Struttura',              subtitle: 'Arquitectura y Espacio · Del Renacimiento a Hoy',     tags: ['Brunelleschi', 'Palladio', 'Carlo Scarpa', 'Renzo Piano', 'Análisis espacial'] },
    { num: 'M04', title: 'Moda come Cultura',               subtitle: 'Sistema de Moda Italiano · Teoría y Práctica',        tags: ['Sistema moda Milano', 'Prada', 'Artigianalità', 'Runway review en italiano'] },
    { num: 'M05', title: 'Arte Contemporanea',              subtitle: 'Arte Contemporáneo Italiano · Discurso y Crítica',    tags: ['Arte povera', 'Michelangelo Pistoletto', 'Transavanguardia', 'Artist statement en italiano'] },
    { num: 'M06', title: 'Comunicazione Visiva',            subtitle: 'Diseño Gráfico y Comunicación Visual Italiana',       tags: ['Futurismo italiano', 'Olivetti', 'Massimo Vignelli', 'Tipografía italiana'] },
  ],
  fr: [
    { num: 'M01', title: "Le Vocabulaire de l'Atelier",    subtitle: 'Vocabulario de Estudio y Crítica de Arte',            tags: ["La critique d'atelier", 'Démarche artistique', "Note d'intention", "Entretien d'admission"] },
    { num: 'M02', title: "Théorie Critique de l'Image",    subtitle: 'Roland Barthes, Debord y la Tradición Crítica Francesa', tags: ['Roland Barthes', 'Guy Debord', 'Semiótica de la imagen', 'Crítica visual contemporánea'] },
    { num: 'M03', title: "L'École Suisse — Typographie",   subtitle: 'La Tradición Suiza · De la Tipografía Internacional al ÉCAL', tags: ['Müller-Brockmann', 'Tipografía Internacional', 'Grilla suiza', 'Emil Ruder'] },
    { num: 'M04', title: 'Mode et Identité Culturelle',    subtitle: 'Sistema de Moda Francés · De la Haute Couture al Conceptual', tags: ['Barthes — Le Système de la Mode', 'Haute couture', 'Maison Margiela', 'Crítica de colecciones'] },
    { num: 'M05', title: "L'Art Contemporain",             subtitle: 'Arte Contemporáneo · Circuito FIAC, Art Basel, Bienales', tags: ['Art Basel Genève', 'FIAC Paris', 'Nicolas Bourriaud', "Artist statement en francés"] },
    { num: 'M06', title: 'Photographie — Langage et Regard', subtitle: 'Fotografía como Lenguaje Visual · Nouvelle Vague al Contemporáneo', tags: ['Henri Cartier-Bresson', 'La Nouvelle Vague', 'Chris Marker', 'HEAD Genève — foto'] },
  ],
}

// ─── Curriculum modal ─────────────────────────────────────────────────────────

const MODAL_TABS: { id: CurriculumLang; label: string; stripes: [string, string, string] }[] = [
  { id: 'it', label: 'Italiano', stripes: ['#009246', '#c2bfb9', '#CE2B37'] },
  { id: 'fr', label: 'Français', stripes: ['#002395', '#c2bfb9', '#ED2939'] },
]

function CurriculumModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<CurriculumLang>('it')
  const isMobile = useIsMobile()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const modules = CURRICULUM_PREVIEW[activeTab]

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 0 : '24px' }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(26,20,16,0.82)' }}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.32, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#f5f0e8',
          width: '100%',
          maxWidth: isMobile ? '100%' : '760px',
          maxHeight: isMobile ? '100dvh' : '88vh',
          height: isMobile ? '100dvh' : 'auto',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Sticky header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: '#f5f0e8',
          zIndex: 2,
          borderBottom: '1px solid rgba(26,20,16,0.07)',
          padding: isMobile ? '20px 24px 16px' : '24px 40px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c4603a', margin: 0 }}>
            Curriculum del programa
          </p>
          <button
            onClick={onClose}
            style={{ background: 'none', border: '1px solid rgba(26,20,16,0.15)', cursor: 'pointer', padding: '6px 10px', color: 'rgba(26,20,16,0.5)', fontSize: 14, lineHeight: 1, fontFamily: 'var(--font-mono)' }}
          >
            ✕
          </button>
        </div>

        {/* Tab bar */}
        <div style={{ padding: isMobile ? '16px 24px 0' : '20px 40px 0', display: 'flex', gap: 6 }}>
          {MODAL_TABS.map(tab => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  textTransform: 'uppercase', letterSpacing: '0.15em',
                  padding: '9px 18px',
                  background: active ? '#1a1410' : 'transparent',
                  border: `1px solid ${active ? '#1a1410' : 'rgba(26,20,16,0.2)'}`,
                  cursor: 'pointer',
                  color: active ? '#f5f0e8' : 'rgba(26,20,16,0.45)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {tab.stripes.map((c, i) => (
                    <span key={i} style={{ width: 14, height: 2, background: c, display: 'block', borderRadius: 1, opacity: active ? 1 : 0.6 }} />
                  ))}
                </span>
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Modules list */}
        <div style={{ padding: isMobile ? '16px 24px 0' : '20px 40px 0', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {modules.map(mod => (
            <div key={mod.num} style={{ background: '#ede8df', padding: isMobile ? '20px' : '24px 28px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c4603a', opacity: 0.7 }}>
                {mod.num}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 22, fontWeight: 400, fontStyle: 'italic', color: '#1a1410', margin: '6px 0 4px', lineHeight: 1.2 }}>
                {mod.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: '#c4603a', opacity: 0.75, margin: '0 0 12px' }}>
                {mod.subtitle}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {mod.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.07em', color: '#1a1410', background: 'rgba(26,20,16,0.06)', padding: '4px 10px', borderRadius: 2 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: isMobile ? '20px 24px 32px' : '24px 40px 36px', marginTop: 4, borderTop: '1px solid rgba(26,20,16,0.07)' }}>
          <a
            href="#curriculum"
            onClick={onClose}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#c4603a', textDecoration: 'none',
              borderBottom: '1px solid rgba(196,96,58,0.4)', paddingBottom: 2,
            }}
          >
            Ver contenido completo en la página →
          </a>
        </div>
      </motion.div>
    </div>
  )
}

interface PriceDetail {
  structure: string
  duration: string
  commitment: string
}

interface PriceCardProps {
  badge: string
  format: string
  duration: string
  desc: string
  amount: string
  note: string
  bundle?: string
  detail: PriceDetail
  featured: boolean
  index: number
  isMobile: boolean
  onOpenCurriculum: () => void
}

function PriceCard({ badge, format, duration, desc, amount, note, bundle, detail, featured, index, isMobile, onOpenCurriculum }: PriceCardProps) {
  const [expanded, setExpanded] = useState(false)

  const fg      = featured ? '#f5f0e8'              : '#1a1410'
  const fgMuted = featured ? 'rgba(245,240,232,0.7)' : 'rgba(26,20,16,0.5)'
  const border  = featured ? 'rgba(245,240,232,0.15)': 'rgba(26,20,16,0.08)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.1 }}
      style={{
        background: featured ? '#c4603a' : '#ede8df',
        padding: isMobile ? '32px 24px' : '44px 36px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        background: featured ? 'rgba(245,240,232,0.2)' : '#1a1410',
        color: '#f5f0e8',
        padding: '5px 10px',
        display: 'inline-block',
        marginBottom: '20px',
        alignSelf: 'flex-start',
      }}>
        {badge}
      </span>

      {/* Format */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '32px',
        fontWeight: 300,
        fontStyle: 'italic',
        color: fg,
        lineHeight: 1,
        margin: '0 0 8px 0',
      }}>
        {format}
      </p>

      {/* Duration tag */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: featured ? 'rgba(245,240,232,0.7)' : '#c4603a',
        margin: '0 0 20px 0',
      }}>
        {duration}
      </p>

      {/* Desc */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 300,
        lineHeight: 1.65,
        color: featured ? 'rgba(245,240,232,0.85)' : '#1a1410',
        opacity: featured ? 1 : 0.7,
        flex: 1,
        margin: '0 0 28px 0',
      }}>
        {desc}
      </p>

      {/* Amount */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: isMobile ? '32px' : '40px',
        fontWeight: 300,
        color: fg,
        lineHeight: 1,
        margin: '0 0 4px 0',
      }}>
        {amount}
      </p>

      {/* Note */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.08em',
        color: fgMuted,
        margin: bundle ? '0 0 16px 0' : '0 0 24px 0',
      }}>
        {note}
      </p>

      {/* Bundle option */}
      {bundle && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: featured ? 'rgba(245,240,232,0.7)' : '#c4603a',
          borderTop: `1px solid ${border}`,
          paddingTop: '12px',
          margin: '0 0 24px 0',
        }}>
          {bundle}
        </p>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: border, marginBottom: 16 }} />

      {/* Explorar detalles toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: fgMuted,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = featured ? '#f5f0e8' : '#c4603a')}
        onMouseLeave={e => (e.currentTarget.style.color = fgMuted)}
      >
        <span>Explorar detalles</span>
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: 11,
        }}>↓</span>
      </button>

      {/* Expanded detail panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: `1px solid ${border}`,
              marginTop: 16,
              paddingTop: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}>
              {/* Detail rows */}
              {[
                { label: 'Estructura',  value: detail.structure   },
                { label: 'Duración',    value: detail.duration    },
                { label: 'Compromiso',  value: detail.commitment  },
              ].map(row => (
                <div key={row.label}>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: fgMuted,
                    margin: '0 0 3px 0',
                  }}>
                    {row.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: featured ? 'rgba(245,240,232,0.9)' : 'rgba(26,20,16,0.8)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {row.value}
                  </p>
                </div>
              ))}

              {/* Curriculum CTA */}
              <button
                onClick={onOpenCurriculum}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 4,
                  background: 'none',
                  border: 'none',
                  borderBottom: `1px solid ${featured ? 'rgba(245,240,232,0.4)' : 'rgba(196,96,58,0.4)'}`,
                  padding: '0 0 2px 0',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: featured ? '#f5f0e8' : '#c4603a',
                  alignSelf: 'flex-start',
                }}
              >
                Ver curriculum completo →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const tiers: Omit<PriceCardProps, 'index' | 'isMobile' | 'onOpenCurriculum'>[] = [
  {
    badge: 'Estándar',
    format: 'Programa mensual',
    duration: 'Clases virtuales grupales',
    desc: 'Clases en línea con profesor nativo especializado en arte y diseño. Para estudiantes en etapa de preparación con 12+ meses antes de su aplicación.',
    amount: '$120',
    note: 'por mes · sin matrícula',
    bundle: 'Paquete 5 meses · $490',
    detail: {
      structure:  '2 sesiones grupales por semana',
      duration:   '90 min por sesión',
      commitment: '~3 horas semanales',
    },
    featured: false,
  },
  {
    badge: 'Más elegido',
    format: 'Programa intensivo',
    duration: 'Clases virtuales grupales',
    desc: 'Mayor frecuencia semanal. Para estudiantes en año de aplicación activo o que quieren acelerar el progreso hacia su institución objetivo.',
    amount: '$200',
    note: 'por mes · sin matrícula',
    bundle: 'Paquete 5 meses · $800',
    detail: {
      structure:  '4 sesiones grupales por semana',
      duration:   '90 min por sesión',
      commitment: '~6 horas semanales',
    },
    featured: true,
  },
  {
    badge: 'Admisión',
    format: 'Paquete de admisión',
    duration: 'Proyecto cerrado · 6 semanas',
    desc: 'Para estudiantes con nivel intermedio que necesitan los materiales de aplicación: artist statement, carta de motivación y preparación para entrevista de portafolio.',
    amount: '$280',
    note: 'pago único · entregables definidos',
    detail: {
      structure:  'Sesiones de revisión + entregables semanales',
      duration:   '60 min por sesión',
      commitment: '~3 horas semanales durante 6 semanas',
    },
    featured: false,
  },
]

export default function Pricing() {
  const isMobile = useIsMobile()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  return (
    <>
    <AnimatePresence>
      {modalOpen && <CurriculumModal onClose={() => setModalOpen(false)} />}
    </AnimatePresence>
    <section
      style={{
        background: '#f5f0e8',
        padding: isMobile ? '72px 0' : '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#c4603a',
            margin: '0 0 40px 0',
          }}
        >
          Inversión
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            fontWeight: 300,
            color: '#1a1410',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
          }}
        >
          Formatos del programa
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>y tarifas.</em>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 300,
            color: '#1a1410',
            opacity: 0.7,
            maxWidth: '600px',
            lineHeight: 1.65,
            margin: '0 0 64px 0',
          }}
        >
          Clases virtuales grupales con profesor nativo especializado en arte y diseño. El contenido está orientado a las escuelas europeas a las que apuntas — no a un currículo genérico.
        </motion.p>

        {/* Pricing Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2px',
            marginTop: '64px',
          }}
        >
          {tiers.map((tier, i) => (
            <PriceCard key={tier.badge} {...tier} index={i} isMobile={isMobile} onOpenCurriculum={() => setModalOpen(true)} />
          ))}
        </div>

      </div>
    </section>
    </>
  )
}
