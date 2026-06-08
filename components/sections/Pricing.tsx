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

// ─── Admisión program (6 semanas) ────────────────────────────────────────────

const ADMISION_PROGRAM: { num: string; title: string; subtitle: string; tags: string[] }[] = [
  { num: 'S01', title: 'Diagnóstico y Posicionamiento',        subtitle: 'Análisis del trabajo y definición de la voz conceptual',         tags: ['Revisión de portafolio', 'Voz artística', 'Institución objetivo', 'Candidatos admitidos'] },
  { num: 'S02', title: 'Artist Statement — Primera versión',   subtitle: 'Redacción guiada con retroalimentación editorial',                tags: ['Redacción guiada', 'Registro académico', 'Revisión crítica', 'Calibración institucional'] },
  { num: 'S03', title: 'Artist Statement — Versión final',     subtitle: 'Refinamiento, tono y entrega del documento',                     tags: ['Edición final', 'Coherencia conceptual', 'Entregable 1'] },
  { num: 'S04', title: 'Carta de Motivación',                  subtitle: 'Estructura, narrativa institucional y fit académico',             tags: ['Motivación académica', 'Trayectoria', 'Proyecto futuro', 'Entregable 2'] },
  { num: 'S05', title: 'Revisión de Portafolio',               subtitle: 'Selección, secuencia y argumentación de obra',                   tags: ['Curaduría', 'Argumentación formal', 'Textos de obra', 'Presentación visual'] },
  { num: 'S06', title: 'Simulación de Entrevista',             subtitle: 'Mock interview + entregables finales y checklist de aplicación',  tags: ['Defensa en vivo', 'Feedback inmediato', 'Checklist por institución', 'Entregable final'] },
]

// ─── Immersion preview data ───────────────────────────────────────────────────

const INMERSION_PREVIEW: { num: string; title: string; subtitle: string; tags: string[] }[] = [
  { num: 'MI·01', title: 'Disciplina en el idioma',        subtitle: 'Vocabulario de tu campo · Calibrado por disciplina y ciudad',     tags: ['Moda · Arquitectura · Bellas Artes', 'Diseño Industrial · Comunicación', 'Crítica de estudio', 'Milano · Paris · Lausanne'] },
  { num: 'MI·02', title: 'Inserción profesional',           subtitle: 'Acceso al ecosistema de tu ciudad',                              tags: ['Pitch a estudios y galerías', 'Correspondencia profesional', 'Cultura de reunión', 'Primeras entrevistas'] },
  { num: 'MI·03', title: 'Capital cultural del ecosistema', subtitle: 'La ciudad como campo profesional activo',                        tags: ['Salone del Mobile', 'FIAC · Art Basel Genève', 'Circuito de galerías', 'Networking en el idioma'] },
]

// ─── Curriculum modal ─────────────────────────────────────────────────────────

type ModalType = 'programa' | 'admision' | 'inmersion'

const MODAL_TABS: { id: CurriculumLang; label: string; stripes: [string, string, string] }[] = [
  { id: 'it', label: 'Italiano', stripes: ['#009246', '#c2bfb9', '#CE2B37'] },
  { id: 'fr', label: 'Français', stripes: ['#002395', '#c2bfb9', '#ED2939'] },
]

function ModuleRow({ num, title, subtitle, tags, isMobile }: { num: string; title: string; subtitle: string; tags: string[]; isMobile: boolean }) {
  return (
    <div style={{ background: '#ede8df', padding: isMobile ? '20px' : '24px 28px' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c4603a', opacity: 0.7 }}>
        {num}
      </span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 22, fontWeight: 400, fontStyle: 'italic', color: '#1a1410', margin: '6px 0 4px', lineHeight: 1.2 }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: '#c4603a', opacity: 0.75, margin: '0 0 12px' }}>
        {subtitle}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {tags.map(tag => (
          <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.07em', color: '#1a1410', background: 'rgba(26,20,16,0.06)', padding: '4px 10px', borderRadius: 2 }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function CurriculumModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<CurriculumLang>('it')
  const isMobile = useIsMobile()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const isAdmision = type === 'admision'
  const isInmersion = type === 'inmersion'
  const modules = isAdmision ? ADMISION_PROGRAM : isInmersion ? INMERSION_PREVIEW : CURRICULUM_PREVIEW[activeTab]
  const headerLabel = isAdmision ? 'Programa de Admisión · 6 Semanas' : isInmersion ? 'Immersion Track · Tres módulos' : 'Curriculum del programa'

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
          position: 'sticky', top: 0, background: '#f5f0e8', zIndex: 2,
          borderBottom: '1px solid rgba(26,20,16,0.07)',
          padding: isMobile ? '20px 24px 16px' : '24px 40px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c4603a', margin: 0 }}>
            {headerLabel}
          </p>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(26,20,16,0.15)', cursor: 'pointer', padding: '6px 10px', color: 'rgba(26,20,16,0.5)', fontSize: 14, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
            ✕
          </button>
        </div>

        {/* IT/FR tab bar — only for programa */}
        {!isAdmision && !isInmersion && (
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
                    transition: 'all 0.2s ease', whiteSpace: 'nowrap',
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
        )}

        {/* Admisión intro — only for admision */}
        {isAdmision && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300,
            lineHeight: 1.65, color: 'rgba(26,20,16,0.6)',
            padding: isMobile ? '16px 24px 0' : '20px 40px 0',
            margin: 0, maxWidth: 560,
          }}>
            Programa cerrado de seis semanas para estudiantes con nivel intermedio.
            Cada sesión produce un entregable real — ninguna sesión es solo teoría.
          </p>
        )}

        {/* Inmersion intro */}
        {isInmersion && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300,
            lineHeight: 1.65, color: 'rgba(26,20,16,0.6)',
            padding: isMobile ? '16px 24px 0' : '20px 40px 0',
            margin: 0, maxWidth: 560,
          }}>
            El Immersion Track no es un programa de idiomas. Es integración profesional
            y cultural entregada a través del idioma — calibrada a tu disciplina y ciudad.
          </p>
        )}

        {/* Modules list */}
        <div style={{ padding: isMobile ? '16px 24px 0' : '20px 40px 0', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {modules.map(mod => (
            <ModuleRow key={mod.num} {...mod} isMobile={isMobile} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: isMobile ? '20px 24px 32px' : '24px 40px 36px', marginTop: 4, borderTop: '1px solid rgba(26,20,16,0.07)' }}>
          {isAdmision ? (
            <a href="#contacto" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c4603a', textDecoration: 'none', borderBottom: '1px solid rgba(196,96,58,0.4)', paddingBottom: 2 }}>
              Iniciar la conversación →
            </a>
          ) : (
            <a href="#contacto" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c4603a', textDecoration: 'none', borderBottom: '1px solid rgba(196,96,58,0.4)', paddingBottom: 2 }}>
              Agenda la conversación gratuita →
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Quick Contact Panel ─────────────────────────────────────────────────────

const WA_NUMBER = '51983747658'
const WA_ICON = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

interface QuickContactProps {
  format: string
  amount: string
  note: string
  message: string
  onClose: () => void
}

function QuickContactPanel({ format, amount, note, message, onClose }: QuickContactProps) {
  const isMobile = useIsMobile()
  const waMsg = encodeURIComponent(`Hola, me interesa el formato "${format}" (${amount}). Quisiera agendar la conversación inicial gratuita.`)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleFormScroll = () => {
    onClose()
    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 0 : 24 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(26,20,16,0.78)' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: easeOut }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', zIndex: 1,
          background: '#1a1410',
          width: '100%',
          maxWidth: isMobile ? '100%' : 460,
          height: isMobile ? '100dvh' : 'auto',
          paddingTop: isMobile ? `max(env(safe-area-inset-top, 0px), 48px)` : '48px',
          paddingBottom: isMobile ? `max(env(safe-area-inset-bottom, 20px), 40px)` : '44px',
          paddingLeft: isMobile ? '28px' : '48px',
          paddingRight: isMobile ? '28px' : '48px',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 18,
            background: 'none', border: '1px solid rgba(245,240,232,0.12)',
            cursor: 'pointer',
            color: 'rgba(245,240,232,0.35)', fontSize: 13,
            fontFamily: 'var(--font-mono)', lineHeight: 1,
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        {/* Eyebrow */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.24em', color: '#c4603a', margin: '0 0 10px 0', opacity: 0.8 }}>
          Formato seleccionado
        </p>

        {/* Format name — context label */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 300, fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', lineHeight: 1.2, margin: '0 0 14px 0' }}>
          {format}
        </p>
        {/* Price — dominant anchor */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 300, color: '#f5f0e8', lineHeight: 1, letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
          {amount}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(245,240,232,0.35)', margin: '0 0 32px 0' }}>
          {note}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(245,240,232,0.07)', marginBottom: 28 }} />

        {/* Value message */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(245,240,232,0.62)', margin: '0 0 36px 0', flex: 1 }}>
          {message}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              textDecoration: 'none', padding: isMobile ? '14px 20px' : '16px 24px',
              minHeight: isMobile ? 52 : undefined,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1da851')}
            onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={WA_ICON} /></svg>
            Escríbenos por WhatsApp
          </a>
          <button
            onClick={handleFormScroll}
            style={{
              background: 'transparent', border: '1px solid rgba(245,240,232,0.45)',
              color: 'rgba(245,240,232,0.65)',
              fontFamily: 'var(--font-mono)', fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              cursor: 'pointer', padding: isMobile ? '14px 20px' : '14px 24px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.75)'; e.currentTarget.style.color = '#f5f0e8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.45)'; e.currentTarget.style.color = 'rgba(245,240,232,0.65)' }}
          >
            Ir al formulario de contacto →
          </button>
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
  onStartFormat: () => void
  cta: string
}

function PriceCard({ badge, format, duration, desc, amount, note, bundle, detail, featured, index, isMobile, onOpenCurriculum, onStartFormat, cta }: PriceCardProps) {
  const [expanded, setExpanded] = useState(false)

  const fg        = featured ? '#f5f0e8'              : '#1a1410'
  const fgMuted   = featured ? 'rgba(245,240,232,0.7)' : 'rgba(26,20,16,0.5)'
  const border    = featured ? 'rgba(245,240,232,0.15)': 'rgba(26,20,16,0.08)'
  const priceColor = featured ? '#f5f0e8' : '#B8973A'
  const noteColor  = featured ? 'rgba(245,240,232,0.7)' : '#B8973A'

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
        borderTop: featured ? '2px solid #B8973A' : undefined,
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
        color: featured ? 'rgba(245,240,232,0.7)' : '#B8973A',
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
        color: priceColor,
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
        color: noteColor,
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
          color: featured ? 'rgba(245,240,232,0.7)' : '#B8973A',
          borderTop: `1px solid ${border}`,
          paddingTop: '12px',
          margin: '0 0 24px 0',
        }}>
          {bundle}
        </p>
      )}

      {/* Primary CTA */}
      <button
        onClick={onStartFormat}
        style={{
          width: '100%',
          background: featured ? 'rgba(245,240,232,0.14)' : '#1a1410',
          border: 'none',
          padding: isMobile ? '14px 16px' : '14px 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.18em',
          color: '#f5f0e8',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = featured ? 'rgba(245,240,232,0.24)' : '#c4603a')}
        onMouseLeave={e => (e.currentTarget.style.background = featured ? 'rgba(245,240,232,0.14)' : '#1a1410')}
      >
        <span>{cta}</span>
        <span>→</span>
      </button>

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

interface PricingGroup {
  label: string
  cards: (Omit<PriceCardProps, 'index' | 'isMobile' | 'onOpenCurriculum' | 'onStartFormat'> & { curriculumType: ModalType; message: string })[]
}

const pricingGroups: PricingGroup[] = [
  {
    label: 'Para quienes aplican',
    cards: [
      {
        badge: 'Estándar',
        cta: 'Construir el idioma',
        message: 'Evaluamos tu nivel actual y construimos el mapa de idioma calibrado a tu lista de instituciones. Sin compromisos.',
        curriculumType: 'programa',
        format: 'Programa mensual',
        duration: 'Clases virtuales grupales',
        desc: 'Construyes el idioma del mundo creativo europeo desde cero. Vocabulario de disciplina, historia del arte, registro académico — calibrado a las instituciones de tu lista.',
        amount: '$120',
        note: 'por mes · sin matrícula',
        bundle: 'Paquete 5 meses · $490',
        detail: { structure: '2 sesiones grupales por semana', duration: '90 min por sesión', commitment: '~3 horas semanales' },
        featured: false,
      },
      {
        badge: 'Más elegido',
        cta: 'Llegar listo a aplicar',
        message: 'Con tu fecha de aplicación en mente, definimos el ritmo exacto que necesitas para llegar con el idioma listo. Sin compromisos.',
        curriculumType: 'programa',
        format: 'Programa intensivo',
        duration: 'Clases virtuales grupales',
        desc: 'Mayor frecuencia, mayor ritmo. Para el año de aplicación activo — llegas a la entrevista de portafolio con el idioma como herramienta, no como obstáculo.',
        amount: '$200',
        note: 'por mes · sin matrícula',
        bundle: 'Paquete 5 meses · $800',
        detail: { structure: '4 sesiones grupales por semana', duration: '90 min por sesión', commitment: '~6 horas semanales' },
        featured: true,
      },
      {
        badge: 'Admisión',
        cta: 'Preparar la aplicación',
        message: 'Revisamos tu perfil, tus instituciones objetivo y definimos el plan de seis semanas para tener los materiales listos. Sin compromisos.',
        curriculumType: 'admision',
        format: 'Paquete de admisión',
        duration: 'Proyecto cerrado · 6 semanas',
        desc: 'Artist statement, carta de motivación y simulación de entrevista en el idioma de destino. Seis semanas, seis entregables reales. Para aplicaciones en menos de 8 semanas.',
        amount: '$280',
        note: 'pago único · entregables definidos',
        detail: { structure: 'Sesiones de revisión + entregables semanales', duration: '60 min por sesión', commitment: '~3 horas semanales durante 6 semanas' },
        featured: false,
      },
    ],
  },
  {
    label: 'Ya tienes base. Vas más lejos.',
    cards: [
      {
        badge: 'Advanced Studio',
        cta: 'Obtener el entregable',
        message: 'Identificamos el módulo que corresponde a tu disciplina y escuela objetivo, y definimos el entregable exacto. Sin compromisos.',
        curriculumType: 'programa',
        format: 'Módulo Individual',
        duration: 'Para estudiantes con nivel B1–B2',
        desc: '4 semanas, un entregable concreto. Cada módulo corresponde a una disciplina y destino específicos — vocabulario de estudio, historia del diseño, crítica de obra.',
        amount: '$180',
        note: 'por módulo · sin matrícula',
        detail: { structure: '2 sesiones por semana', duration: '90 min por sesión', commitment: '~4 horas semanales durante 4 semanas' },
        featured: false,
      },
      {
        badge: 'Más elegido · Advanced Studio',
        cta: 'Iniciar la secuencia',
        message: 'Diseñamos la secuencia de tres módulos calibrada a tu disciplina y destino específico. Sin compromisos.',
        curriculumType: 'programa',
        format: 'Bundle 3 Módulos',
        duration: 'Secuencia dirigida por disciplina y destino',
        desc: '12 semanas. Vocabulario, historia del diseño y dominio de la crítica de obra — en secuencia calibrada a tu institución objetivo y disciplina.',
        amount: '$480',
        note: 'ahorra $60 vs módulos individuales',
        detail: { structure: '3 módulos en secuencia', duration: '12 semanas total', commitment: '~4 horas semanales' },
        featured: true,
      },
      {
        badge: 'Advanced Studio Completo',
        cta: 'Completar el track',
        message: 'Mapeamos tu trayectoria completa — 24 semanas, seis módulos, todos los materiales de aplicación. Sin compromisos.',
        curriculumType: 'programa',
        format: 'Track Completo',
        duration: 'Los 6 módulos del programa',
        desc: '24 semanas · todos los módulos del track en secuencia completa. Preparación disciplinaria exhaustiva + todos los materiales de aplicación.',
        amount: '$840',
        note: 'ahorra $240 · equivale al programa completo',
        detail: { structure: '6 módulos en secuencia completa', duration: '24 semanas', commitment: '~4 horas semanales' },
        featured: false,
      },
    ],
  },
  {
    label: 'Para quienes ya están en Europa',
    cards: [
      {
        badge: 'Immersion Track',
        cta: 'Entrar al ecosistema',
        message: 'Hablamos de tu ciudad, tu disciplina y las conversaciones específicas que quieres poder tener. Sin compromisos.',
        curriculumType: 'inmersion',
        format: 'Inmersión Mensual',
        duration: 'Para estudiantes en programas en inglés en Europa',
        desc: 'El idioma del país donde estudias — calibrado a tu disciplina y ciudad. Las conversaciones que el programa en inglés no resuelve, aquí sí.',
        amount: '$90',
        note: 'por mes · sin matrícula · ritmo flexible',
        detail: { structure: '2 sesiones por semana', duration: '90 min por sesión', commitment: '~3 horas semanales' },
        featured: false,
      },
      {
        badge: 'Immersion Track · Compromiso',
        cta: 'Integrarme de verdad',
        message: 'Con tu año académico en mente, definimos el mapa de integración al ecosistema donde estudias. Sin compromisos.',
        curriculumType: 'inmersion',
        format: 'Inmersión Semestral',
        duration: '6 meses · mismo formato',
        desc: 'Para primer y segundo año en Europa. Construyes vocabulario activo mientras navegas la industria — los estudios, las aperturas, los directores que deciden tu siguiente paso.',
        amount: '$450',
        note: '6 meses · ahorra $90',
        detail: { structure: '2 sesiones por semana', duration: '6 meses', commitment: '~3 horas semanales' },
        featured: true,
      },
      {
        badge: 'Immersion Track · Intensivo',
        cta: 'Preparar el primer pitch',
        message: 'Identificamos los estudios y relaciones específicas que quieres construir, y diseñamos el vocabulario para llegar ahí. Sin compromisos.',
        curriculumType: 'inmersion',
        format: 'Módulo de Inserción Profesional',
        duration: '4 semanas · vocabulario profesional',
        desc: 'Pitches a estudios, correspondencia profesional, networking en la industria. Al terminar, puedes conducir tu primera entrevista de prácticas en el idioma.',
        amount: '$220',
        note: 'pago único · 4 semanas · entregables profesionales',
        detail: { structure: '2 sesiones por semana', duration: '4 semanas', commitment: '~4 horas semanales' },
        featured: false,
      },
    ],
  },
]

interface QuickContactState {
  format: string
  amount: string
  note: string
  message: string
}

export default function Pricing() {
  const isMobile = useIsMobile()
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [quickContact, setQuickContact] = useState<QuickContactState | null>(null)

  useEffect(() => {
    document.body.style.overflow = (modalType || quickContact) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalType, quickContact])

  return (
    <>
    <AnimatePresence>
      {modalType && <CurriculumModal type={modalType} onClose={() => setModalType(null)} />}
    </AnimatePresence>
    <AnimatePresence>
      {quickContact && <QuickContactPanel {...quickContact} onClose={() => setQuickContact(null)} />}
    </AnimatePresence>
    <section
      id="precios"
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
          Elige tu punto
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>de entrada.</em>
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
            margin: '0 0 16px 0',
          }}
        >
          El título no garantiza la carrera. El idioma sí. Contenido construido alrededor de las escuelas europeas a las que apuntas — no a un currículo genérico. Primera conversación gratuita, sin compromiso.
        </motion.p>

        {/* Founding cohort signal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 0,
            marginTop: 8,
          }}
        >
          <div style={{ width: 6, height: 6, background: '#c4603a', borderRadius: '50%' }} />
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#c4603a',
            margin: 0,
            opacity: 0.8,
          }}>
            Cohorte inaugural · Julio 2026 · Cierre de inscripciones: 30 de junio
          </p>
        </motion.div>

        {/* Grouped pricing */}
        {pricingGroups.map((group, gi) => (
          <div key={group.label}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#c4603a',
                marginTop: gi === 0 ? 64 : 48,
                marginBottom: 24,
                paddingBottom: 12,
                borderBottom: '1px solid #c4603a',
                opacity: 0.8,
              }}
            >
              {group.label}
            </motion.div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '2px',
              }}
            >
              {group.cards.map(({ curriculumType, message, ...card }, i) => (
                <PriceCard
                  key={card.badge}
                  {...card}
                  index={i}
                  isMobile={isMobile}
                  onOpenCurriculum={() => setModalType(curriculumType)}
                  onStartFormat={() => setQuickContact({ format: card.format, amount: card.amount, note: card.note, message })}
                />
              ))}
            </div>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(26,20,16,0.45)',
            textAlign: 'center',
            maxWidth: 560,
            margin: '48px auto 0',
            lineHeight: 1.7,
          }}
        >
          Si en la primera conversación el programa no es lo correcto para ti, te lo decimos.
          Sin compromiso, sin costo. La conversación es gratuita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row' as const,
            gap: 20,
            marginTop: 40,
            paddingTop: 32,
            borderTop: '1px solid rgba(26,20,16,0.07)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#1a1410',
            margin: 0,
          }}>
            ¿No sabes cuál formato es el correcto para ti?
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, estoy evaluando Studio by Paradise pero no sé qué formato es el correcto para mi situación. ¿Pueden orientarme?')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.18em',
              color: '#c4603a',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(196,96,58,0.5)',
              padding: '12px 0',
              display: 'inline-block',
              minHeight: 44,
              whiteSpace: 'nowrap' as const,
              flexShrink: 0,
            }}
          >
            Cuéntanos tu situación →
          </a>
        </motion.div>
      </div>
    </section>
    </>
  )
}
