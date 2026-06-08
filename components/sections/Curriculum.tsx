'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

// ─── Constants ────────────────────────────────────────────────────────────────

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'italiano' | 'frances';
type PhaseKey = 'A' | 'B' | 'C';

interface ModuleDeepContent {
  pedagogy: string;
  task: string;
  vocabulary_it: string[];
  vocabulary_fr: string[];
  assessment: string;
  institutions: string;
  cefr_target: string;
}

interface CurriculumModule {
  code: string;
  title: string;
  description: string;
  outcome: string;
  deep: ModuleDeepContent;
}

interface Phase {
  key: PhaseKey;
  labelMono: string;
  titleItalic: string;
  modules: CurriculumModule[];
  color: string;
}

// ─── Curriculum data (shared across languages) ───────────────────────────────

const phases: Phase[] = [
  {
    key: 'A',
    labelMono: 'Fase A — Fundamentos',
    titleItalic: 'Foundations',
    color: '#C4603A',
    modules: [
      {
        code: 'A1',
        title: 'El oído profesional',
        description:
          'Fonología, prosodia y comprensión auditiva en contextos de estudio y crítica. Entrenamiento específico para el ritmo, la velocidad y el acento de las instituciones objetivo — no el idioma del aula.',
        outcome:
          'Comprenderás el 80 % de una crítica de estudio a velocidad natural en el idioma objetivo, sin subtítulos.',
        deep: {
          pedagogy:
            'Método: Shadowing y dictado activo. Escuchas grabaciones reales de críticas de estudio en NABA y ÉCAL. Repites, identificas patrones de entonación y reconstruyes el argumento sin texto de apoyo.',
          task: 'Tarea típica de sesión: Escuchar una crítica de 4 minutos en italiano, identificar el argumento central del crítico y responder en 90 segundos con posición propia.',
          vocabulary_it: ['critica', 'proposta', 'sviluppo', 'riferimento', 'superficie', 'intenzione', 'struttura', 'processo'],
          vocabulary_fr: ['critique', 'proposition', 'développement', 'référence', 'surface', 'intention', 'structure', 'processus'],
          assessment: 'Comprensión de grabación auténtica a velocidad natural: 80% de comprensión sin repetición.',
          institutions: 'NABA · Domus · Politecnico · ÉCAL · HEAD',
          cefr_target: 'Recepción oral: B1 → B2',
        },
      },
      {
        code: 'A2',
        title: 'Vocabulario de práctica creativa',
        description:
          'Vocabulario central de materiales, proceso, crítica y estudio. Cómo se nombra la obra, cómo se habla de una decisión formal, cómo se participa en una revisión sin perder el hilo.',
        outcome:
          'Usarás vocabulario específico de tu disciplina con precisión en contextos espontáneos de estudio, sin code-switching.',
        deep: {
          pedagogy:
            'Método: CLIL (Content and Language Integrated Learning). El vocabulario se aprende en contexto de análisis de obras reales — no de listas. Una sesión sobre escultura italiana enseña el vocabulario a través de la obra, no antes de ella.',
          task: 'Tarea típica: Describir un proceso de trabajo propio (materiales, decisiones, resultado) en 3 minutos sin preparación. El evaluador interrumpe con preguntas de especificación.',
          vocabulary_it: ['materiale', 'tecnica', 'scala', 'formato', 'gesto', 'impronta', 'strato', 'pigmento', 'tensione', 'vuoto'],
          vocabulary_fr: ['matériau', 'technique', 'échelle', 'format', 'geste', 'empreinte', 'couche', 'pigment', 'tension', 'vide'],
          assessment: 'Descripción espontánea de obra propia usando vocabulario específico sin code-switching al español.',
          institutions: 'Universal — todas las instituciones de la lista',
          cefr_target: 'Producción oral: A2 → B1+',
        },
      },
      {
        code: 'A3',
        title: 'Leer la institución',
        description:
          'Códigos culturales, scripts sociales, dinámicas de poder, y cómo funciona la crítica en cada institución objetivo. Lo que no está escrito en el prospecto pero define si te perciben como par o como extranjero.',
        outcome:
          'Navegarás situaciones institucionales formales e informales sin malentendidos culturales.',
        deep: {
          pedagogy:
            'Método: Análisis de casos. Estudiamos cómo funciona una crítica en NABA versus en ÉCAL — no como dato abstracto sino como preparación específica. Incluye análisis de videos de crits reales, entrevistas con egresados y lectura de documentos institucionales.',
          task: 'Tarea típica: Dado un escenario (primer día en el estudio, cena con profesores, apertura de galería), identificar los códigos culturales en juego y preparar una estrategia de inserción en el idioma objetivo.',
          vocabulary_it: ['gerarchie informali', 'tutor', 'commissione', 'vernissage', 'residenza', 'laboratorio aperto'],
          vocabulary_fr: ['hiérarchies informelles', 'directeur de mémoire', 'jury', 'vernissage', 'résidence', 'atelier ouvert'],
          assessment: 'Role play: situación institucional inesperada navegada en idioma objetivo sin preparación previa.',
          institutions: 'Contextualizado por institución: NABA (Milán), ÉCAL (Lausana), HEAD (Ginebra) tienen culturas institucionales distintas',
          cefr_target: 'Competencia intercultural: no hay equivalente CEFR — es una capacidad distinta',
        },
      },
    ],
  },
  {
    key: 'B',
    labelMono: 'Fase B — Admisión',
    titleItalic: 'Application',
    color: '#B8973A',
    modules: [
      {
        code: 'B1',
        title: 'El idioma del portfolio y la carta',
        description:
          'Presentación de portfolio, carta de motivación, entrevista de admisión. Cómo construir el argumento de tu candidatura en el idioma de la institución — no una traducción de tu texto en español.',
        outcome:
          'Realizarás una presentación de portfolio de 10 minutos y responderás preguntas del jurado sin tiempo de preparación.',
        deep: {
          pedagogy:
            'Método: Task-Based Language Teaching con materiales auténticos. Trabajamos con cartas de motivación reales de admitidos anteriores (anonimizadas). Analizamos estructura, registro y estrategia retórica antes de producir.',
          task: 'Tarea cumbre: Presentación completa de portfolio (10 min) ante evaluador externo con Q&A posterior. Grabada y analizada.',
          vocabulary_it: ['sono attratto da', 'il mio lavoro esplora', 'intendo sviluppare', 'mi ha formato', 'aspiro a contribuire', 'sono convinto che'],
          vocabulary_fr: ['je suis attiré par', 'mon travail explore', "j'envisage de développer", "m'a formé", "j'aspire à contribuer", 'je suis convaincu que'],
          assessment: 'Carta de motivación real evaluada en: registro, coherencia argumentativa, adecuación cultural, persuasión. Escala 1–4 por dimensión.',
          institutions: 'ÉCAL (entrevista obligatoria) · HEAD (carta en francés requerida) · ENSAD · NABA · Domus',
          cefr_target: 'Producción escrita: B1 → B2 / Producción oral: B1+',
        },
      },
      {
        code: 'B2',
        title: 'Investigar la institución',
        description:
          'Lectura de documentos institucionales, programas de estudio, perfiles de tutores en el idioma objetivo. Cómo extraer información relevante y usarla para posicionarte como candidato informado.',
        outcome:
          'Identificarás de forma autónoma 3 diferencias culturales/pedagógicas clave entre la institución objetivo y tu contexto de origen.',
        deep: {
          pedagogy:
            'Método: Investigación guiada. El estudiante recibe un perfil de institución objetivo y debe extraer, en el idioma original, los 5 puntos más relevantes para su candidatura. El tutor actúa como asesor, no como fuente.',
          task: 'Tarea típica: Leer el syllabus completo de un programa objetivo, identificar 3 tutores relevantes para el trabajo propio y redactar un párrafo de motivación personalizado que los mencione.',
          vocabulary_it: ['piano di studi', 'crediti', 'propedeutico', 'tutor di riferimento', 'laboratorio', 'tesi', "commissione d'esame"],
          vocabulary_fr: ["plan d'études", 'crédits', 'propédeutique', 'directeur de mémoire', 'atelier', 'mémoire', "jury d'examen"],
          assessment: 'Lectura de documento real (syllabus o convocatoria) + resumen oral de puntos clave en 20 minutos. Evaluado en precisión de información extraída.',
          institutions: 'Politecnico di Milano (documentación densa) · NABA · ISIA Firenze · ENSBA Lyon',
          cefr_target: 'Comprensión lectora: B1 → B2',
        },
      },
    ],
  },
  {
    key: 'C',
    labelMono: 'Fase C — Integración',
    titleItalic: 'Capstone',
    color: '#8B6040',
    modules: [
      {
        code: 'C1',
        title: 'Producción escrita y voz digital',
        description:
          'Registros académico y profesional escrito: email a profesores, propuesta de proyecto, Instagram como presencia profesional. La diferencia entre escribir correctamente y escribir con el registro exacto que las instituciones reconocen como propio.',
        outcome:
          'Redactarás un email formal a un profesor y un caption profesional de Instagram en el idioma objetivo, con registro apropiado para cada contexto.',
        deep: {
          pedagogy:
            'Método: Escritura en ciclos de borrador-feedback-revisión. Cada texto producido pasa por al menos dos revisiones con feedback específico de registro (no solo gramática). Se trabajan dos géneros: formal (carta, email institucional) e informal-profesional (caption, bio).',
          task: 'Tarea de integración: En 45 minutos, producir un email a un tutor de NABA solicitando reunión para discutir portfolio, y un caption de Instagram para una obra reciente. Dos registros. Una sesión.',
          vocabulary_it: ['Gentile Prof.', 'Le scrivo in merito a', 'sarei lieto di', 'allego il mio portfolio', 'rimango a disposizione', 'Cordiali saluti'],
          vocabulary_fr: ['Cher Professeur', 'Je vous écris concernant', 'je serais ravi de', 'je joins mon portfolio', 'je reste disponible', 'Cordialement'],
          assessment: 'Dos textos producidos en tiempo limitado: carta institucional + texto de voz digital. Rubrica de 4 dimensiones: registro, coherencia, vocabulario, adecuación al contexto.',
          institutions: 'Universal — competencia de integración final del programa',
          cefr_target: 'Producción escrita integrada: B2',
        },
      },
    ],
  },
];

// ─── Expanded Panel ───────────────────────────────────────────────────────────

function ModuleExpandedPanel({
  deep,
  activeTab,
}: {
  deep: ModuleDeepContent;
  activeTab: Tab;
}) {
  const vocabulary = activeTab === 'italiano' ? deep.vocabulary_it : deep.vocabulary_fr;
  const vocabLabel = activeTab === 'italiano' ? 'Vocabolario chiave' : 'Vocabulaire clé';

  const sectionLabel: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 8,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(184,151,58,0.55)',
    display: 'block',
    marginBottom: 6,
  };

  const sectionContent: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    fontWeight: 300,
    lineHeight: 1.65,
    color: 'rgba(245,240,232,0.55)',
    margin: 0,
  };

  return (
    <div
      style={{
        borderTop: '1px solid rgba(245,240,232,0.08)',
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      {/* Pedagogy */}
      <div>
        <span style={sectionLabel}>Metodología</span>
        <p style={sectionContent}>{deep.pedagogy}</p>
      </div>

      {/* Task */}
      <div>
        <span style={sectionLabel}>Tarea representativa</span>
        <p style={sectionContent}>{deep.task}</p>
      </div>

      {/* Vocabulary */}
      <div>
        <span style={sectionLabel}>{vocabLabel}</span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          {vocabulary.map((word) => (
            <span
              key={word}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: '#f5f0e8',
                background: 'rgba(245,240,232,0.06)',
                border: '1px solid rgba(245,240,232,0.2)',
                borderRadius: 2,
                padding: '4px 10px',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Assessment */}
      <div>
        <span style={sectionLabel}>Evaluación</span>
        <p style={sectionContent}>{deep.assessment}</p>
      </div>

      {/* Institutions + CEFR row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap: 14,
        }}
      >
        <div style={{ flex: 1, minWidth: 160 }}>
          <span style={sectionLabel}>Instituciones</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(245,240,232,0.35)',
              lineHeight: 1.5,
              display: 'block',
            }}
          >
            {deep.institutions}
          </span>
        </div>

        <div>
          <span style={sectionLabel}>CEFR</span>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: '#B8973A',
              background: 'rgba(184,151,58,0.15)',
              borderRadius: 20,
              padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {deep.cefr_target}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Module Card ──────────────────────────────────────────────────────────────

function ModuleCard({
  mod,
  isExpanded,
  onToggle,
  activeTab,
  isMobile,
}: {
  mod: CurriculumModule;
  isExpanded: boolean;
  onToggle: () => void;
  activeTab: Tab;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered || isExpanded ? '#1a2236' : '#131929',
        padding: isMobile ? '20px 16px' : '24px 28px',
        transition: 'background 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        cursor: 'pointer',
      }}
      onClick={onToggle}
      role="button"
      aria-expanded={isExpanded}
    >
      {/* Code + toggle icon row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 10,
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
            display: 'block',
            paddingTop: 1,
          }}
        >
          {mod.code}
        </span>

        {/* + / × toggle — 44×44 touch target */}
        <div
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 16,
              color: '#B8973A',
              lineHeight: 1,
              flexShrink: 0,
              display: 'inline-block',
              transformOrigin: 'center',
              userSelect: 'none',
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
          color: 'rgba(245,240,232,0.9)',
          lineHeight: 1.2,
          margin: '0 0 12px 0',
        }}
      >
        {mod.title}
      </h3>

      {/* Description */}
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

      {/* Outcome */}
      <div
        style={{
          borderTop: '1px solid rgba(184,151,58,0.2)',
          paddingTop: 14,
          marginTop: 'auto',
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

      {/* Expanded academic panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: easeOut }}
            style={{ overflow: 'hidden' }}
          >
            <ModuleExpandedPanel deep={mod.deep} activeTab={activeTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Phase Accordion ──────────────────────────────────────────────────────────

function PhaseAccordion({
  phase,
  isOpen,
  onToggle,
  isMobile,
  activeTab,
}: {
  phase: Phase;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
  activeTab: Tab;
}) {
  // Track which module (by code) is expanded within this phase
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  function handleModuleToggle(code: string) {
    setExpandedModule((prev) => (prev === code ? null : code));
  }

  return (
    <div
      style={{
        borderTop: `2px solid ${phase.color}`,
      }}
    >
      {/* Phase header — clickable */}
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.22em',
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

        {/* Toggle icon */}
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

      {/* Expanded modules */}
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
                  : phase.modules.length === 2
                  ? 'repeat(2, 1fr)'
                  : 'repeat(3, 1fr)',
                gap: '2px',
                paddingBottom: '32px',
              }}
            >
              {phase.modules.map((mod) => (
                <ModuleCard
                  key={mod.code}
                  mod={mod}
                  isExpanded={expandedModule === mod.code}
                  onToggle={() => handleModuleToggle(mod.code)}
                  activeTab={activeTab}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState<Tab>('italiano');
  const [openPhases, setOpenPhases] = useState<Set<PhaseKey>>(new Set(['A']));
  const isMobile = useIsMobile();

  const tabs: { id: Tab; label: string; stripes: [string, string, string] }[] = [
    { id: 'italiano', label: 'Italiano', stripes: ['#009246', '#c2bfb9', '#CE2B37'] },
    { id: 'frances',  label: 'Français', stripes: ['#002395', '#c2bfb9', '#ED2939'] },
  ];

  function togglePhase(key: PhaseKey) {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <section
      id="curriculum"
      style={{
        background: '#0E1422',
        padding: isMobile ? '72px 0 0' : '120px 0 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#c4603a',
            marginBottom: 28,
          }}
        >
          Foundation Track · Contenido del Programa
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#f5f0e8',
            marginBottom: 16,
          }}
        >
          Lo que construyes
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
            antes de llegar.
          </em>
        </motion.h2>
        <div style={{ width: 60, height: 1, background: '#B8973A', marginBottom: 28 }} />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.16 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(245,240,232,0.6)',
            maxWidth: 600,
            marginBottom: 56,
          }}
        >
          El Foundation Track prepara a estudiantes latinoamericanos para presentar candidaturas
          a instituciones europeas de arte y diseño. Tres fases, seis módulos — desde la escucha
          profesional hasta la integración escrita.
        </motion.p>

        {/* Language tab bar */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 4,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
            scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
            msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'],
            paddingBottom: isMobile ? 4 : 0,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: isMobile ? '13px 20px' : '12px 32px',
                  background: isActive ? '#f5f0e8' : 'transparent',
                  border: `1px solid ${isActive ? '#f5f0e8' : 'rgba(245,240,232,0.2)'}`,
                  cursor: 'pointer',
                  color: isActive ? '#1a1410' : 'rgba(245,240,232,0.4)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#f5f0e8';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,240,232,0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,240,232,0.4)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,240,232,0.2)';
                  }
                }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {tab.stripes.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        width: 14,
                        height: 2,
                        background: c,
                        display: 'block',
                        borderRadius: 1,
                        opacity: isActive ? 1 : 0.55,
                      }}
                    />
                  ))}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab note — same structure both languages */}
        <div
          style={{
            height: 1,
            background: 'rgba(245,240,232,0.08)',
            marginBottom: 8,
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.14em',
            color: 'rgba(245,240,232,0.28)',
            margin: '0 0 48px 0',
          }}
        >
          {activeTab === 'italiano'
            ? 'Contenido calibrado a NABA, Domus Academy, Politecnico di Milano, IED.'
            : 'Contenido calibrado a ÉCAL, HEAD Geneva, ENSAD, IFM Paris.'}
        </p>

        {/* Phase accordion */}
        <div>
          {phases.map((phase) => (
            <PhaseAccordion
              key={phase.key}
              phase={phase}
              isOpen={openPhases.has(phase.key)}
              onToggle={() => togglePhase(phase.key)}
              isMobile={isMobile}
              activeTab={activeTab}
            />
          ))}
          {/* closing border */}
          <div style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }} />
        </div>

        {/* CEFR reference note */}
        <div
          style={{
            marginTop: 40,
            marginBottom: 64,
            padding: isMobile ? '16px 20px' : '20px 28px',
            borderLeft: '2px solid rgba(196,96,58,0.35)',
            background: 'rgba(196,96,58,0.04)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8.5,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.2em',
              color: '#c4603a',
              display: 'block',
              marginBottom: 6,
            }}
          >
            CEFR reference
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(245,240,232,0.45)',
              margin: 0,
            }}
          >
            Equivalencia orientativa: A2 entrada → B2 funcional al completar.
            El programa no es un curso de idiomas general — los niveles CEFR son referencia
            indicativa, no el objetivo pedagógico central.
          </p>
        </div>
      </div>
    </section>
  );
}
