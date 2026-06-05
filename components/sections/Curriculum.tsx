'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

/* ── Skill icons — stroke SVGs, terra on smoke ─────────── */
const IconFeather = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
    <line x1="16" y1="8" x2="2" y2="22"/>
    <line x1="17" y1="15" x2="9" y2="15"/>
  </svg>
)
const IconMic = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="11" rx="3"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
)
const IconFileText = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IconSearch = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4603a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = 'italiano' | 'frances';

interface Module {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

interface AppSkill {
  icon: React.ReactNode;
  name: string;
  desc: string;
}

interface PanelData {
  introLeft: React.ReactNode;
  introRight: string;
  modules: Module[];
  skills: AppSkill[];
  references: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const italianPanel: PanelData = {
  introLeft: (
    <>
      El italiano que enseñamos es el idioma de{' '}
      <em style={{ fontStyle: 'italic', color: '#c4603a' }}>Domus</em>, de Gio
      Ponti, de una crítica de estudio en Politecnico — no el italiano del
      turismo.
    </>
  ),
  introRight:
    'Italia produce el diseño industrial, la moda y la arquitectura que definen el estándar global. Milán es el centro anual del mundo del diseño. El italiano que necesita un estudiante que va a NABA o Domus Academy no es gramática y vocabulario — es la capacidad de participar como interlocutor en conversaciones que han estado ocurriendo en ese idioma durante cinco siglos. Eso es lo que construimos.',
  modules: [
    {
      num: 'M01',
      title: 'Il Vocabolario dello Studio',
      subtitle: 'Vocabulario de Estudio y Crítica',
      description:
        'El lenguaje del estudio de diseño italiano — cómo se conduce una crítica de obra, cómo se discute una propuesta conceptual, cómo se defienden decisiones formales ante un jurado. Vocabulario técnico de las disciplinas visuales en contexto de práctica real.',
      tags: [
        'Crítica de portafolio',
        'Vocabulario formal',
        'Defensa de proyecto',
        'Terminología de materiales',
        'Entrevista de admisión',
      ],
    },
    {
      num: 'M02',
      title: 'La Forma Italiana',
      subtitle: 'Historia del Diseño Italiano · 1945–Presente',
      description:
        'Del racionalismo milanés de posguerra al Memphis Group hasta el diseño contemporáneo. Leemos textos originales de Gio Ponti sobre la forma, las entrevistas de Ettore Sottsass en su idioma original, el manifiesto Memphis.',
      tags: [
        'Gio Ponti — La forma',
        'Ettore Sottsass',
        'Memphis Group',
        'Achille Castiglioni',
        'Bruno Munari',
        'Domus Magazine',
      ],
    },
    {
      num: 'M03',
      title: 'Spazio e Struttura',
      subtitle: 'Arquitectura y Espacio · Del Renacimiento a Hoy',
      description:
        'El vocabulario espacial del Renacimiento todavía estructura cómo la facultad de arquitectura de Politecnico piensa el entorno construido. Estudiamos cómo esa tradición — Brunelleschi, Palladio, Piranesi — se convierte en el lenguaje conceptual del diseño contemporáneo italiano.',
      tags: [
        'Brunelleschi',
        'Palladio',
        'Piranesi',
        'Carlo Scarpa',
        'Renzo Piano',
        'Análisis espacial',
      ],
    },
    {
      num: 'M04',
      title: 'Moda come Cultura',
      subtitle: 'Sistema de Moda Italiano · Teoría y Práctica',
      description:
        'Milán como capital de la moda — no solo su industria sino su estructura cultural e intelectual. Cómo Prada construyó una identidad conceptual, qué significa artigianalità en el contexto del lujo italiano, cómo leer una colección como un argumento cultural.',
      tags: [
        'Sistema moda Milano',
        'Prada — identidad conceptual',
        'Artigianalità',
        'Giorgio Armani',
        'Crítica de colecciones',
        'Runway review en italiano',
      ],
    },
    {
      num: 'M05',
      title: 'Arte Contemporanea',
      subtitle: 'Arte Contemporáneo Italiano · Discurso y Crítica',
      description:
        'Arte povera, el movimiento que redefinió la relación entre arte y material en los años 60 y 70. Transavanguardia. El sistema del arte contemporáneo italiano y cómo funciona — galerías, ferias, bienales, crítica.',
      tags: [
        'Arte povera',
        'Michelangelo Pistoletto',
        'Jannis Kounellis',
        'Transavanguardia',
        'Artist statement en italiano',
        'Crítica de exposición',
      ],
    },
    {
      num: 'M06',
      title: 'Comunicazione Visiva',
      subtitle: 'Diseño Gráfico y Comunicación Visual Italiana',
      description:
        'La tradición italiana de comunicación visual — desde los carteles futuristas hasta el diseño editorial de Olivetti. Análisis de piezas icónicas en italiano. Vocabulario específico para programas de graphic design en NABA y Politecnico.',
      tags: [
        'Futurismo italiano',
        'Olivetti — diseño corporativo',
        'Massimo Vignelli',
        'Bob Noorda',
        'Tipografía italiana',
        'Análisis gráfico',
      ],
    },
  ],
  skills: [
    {
      icon: <IconFeather />,
      name: 'Artist Statement',
      desc: 'Redacción de declaración artística en italiano con vocabulario de práctica contemporánea real.',
    },
    {
      icon: <IconMic />,
      name: 'Entrevista de Portafolio',
      desc: 'Conducir una revisión de portafolio y defender decisiones creativas ante un jurado italiano.',
    },
    {
      icon: <IconFileText />,
      name: 'Carta de Motivación',
      desc: 'Escritura de motivation letter institucional calibrada al tono de NABA, Domus y IED.',
    },
    {
      icon: <IconSearch />,
      name: 'Crítica de Obra',
      desc: 'Análisis escrito y oral de obra artística y de diseño usando el vocabulario crítico italiano.',
    },
  ],
  references: [
    'Rivista Domus',
    'Gio Ponti — L\'architettura è un cristallo',
    'Ettore Sottsass — Scritti',
    'Memphis: The New International Style',
    'Bruno Munari — Da cosa nasce cosa',
    'Achille Castiglioni — Design!',
    'Arte povera (Germano Celant, ed.)',
    'Massimo Vignelli — The Vignelli Canon',
    'Fondazione Prada — Pubblicazioni',
    'Salone del Mobile — Milano',
  ],
};

const frenchPanel: PanelData = {
  introLeft: (
    <>
      El francés que enseñamos no es el idioma de un examen. Es el idioma en que{' '}
      <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
        Barthes, Debord y Bourriaud
      </em>{' '}
      pensaron el arte contemporáneo.
    </>
  ),
  introRight:
    'Francia y Suiza francófona albergan algunos de los programas de arte y diseño más rigurosos del mundo — y sus culturas académicas son distintas a las anglosajonas. La admisión a ÉCAL, HEAD Geneva o ENSAD no evalúa solo el portafolio; evalúa si el candidato tiene la formación intelectual que esas instituciones esperan. Esa formación está escrita en francés.',
  modules: [
    {
      num: 'M01',
      title: 'Le Vocabulaire de l\'Atelier',
      subtitle: 'Vocabulario de Estudio y Crítica de Arte',
      description:
        'El lenguaje del estudio de arte francés — cómo se conduce una critique, cómo se habla de intención, proceso y resultado ante un jurado de una grande école. Vocabulario técnico de las disciplinas visuales y el registro académico específico que esperan las escuelas francesas y suizas.',
      tags: [
        'La critique d\'atelier',
        'Vocabulario formal',
        'Démarche artistique',
        'Note d\'intention',
        'Entretien d\'admission',
      ],
    },
    {
      num: 'M02',
      title: 'Théorie Critique de l\'Image',
      subtitle: 'Roland Barthes, Debord y la Tradición Crítica Francesa',
      description:
        'Las tradiciones críticas que más han formado el discurso del arte contemporáneo global fueron escritas en francés. Leemos La Chambre Claire de Barthes sobre la fotografía, fragmentos de La Société du Spectacle de Debord. No como ejercicio académico — como formación del vocabulario conceptual que los tutores de ÉCAL y ENSAD reconocen.',
      tags: [
        'Roland Barthes — La Chambre Claire',
        'Guy Debord — Spectacle',
        'Semiótica de la imagen',
        'Punctum / Studium',
        'Crítica visual contemporánea',
      ],
    },
    {
      num: 'M03',
      title: 'L\'École Suisse — Typographie et Design',
      subtitle: 'La Tradición Suiza · De la Tipografía Internacional al ÉCAL',
      description:
        'El movimiento de tipografía internacional suizo — Müller-Brockmann, el sistema de grilla, Helvetica — es el lenguaje visual con el que ÉCAL Lausana está en conversación directa. Estudiamos ese linaje en francés y cómo se aplica al diseño gráfico contemporáneo.',
      tags: [
        'Müller-Brockmann',
        'Tipografía Internacional',
        'Grilla suiza',
        'Helvetica — origen',
        'Emil Ruder',
        'ÉCAL — método pedagógico',
      ],
    },
    {
      num: 'M04',
      title: 'Mode et Identité Culturelle',
      subtitle: 'Sistema de Moda Francés · De la Haute Couture al Conceptual',
      description:
        'La haute couture parisina y la moda conceptual como formas de pensamiento cultural — no como industria. Derrida sobre el vestido, Barthes sobre el sistema de la moda, cómo Rei Kawakubo y Yohji Yamamoto dialogaron con la tradición francesa. Preparación para programmes de fashion en l\'IFM y ESMOD.',
      tags: [
        'Barthes — Le Système de la Mode',
        'Haute couture — estructura',
        'Maison Margiela',
        'Comme des Garçons en París',
        'Crítica de colecciones',
        'Lenguaje editorial',
      ],
    },
    {
      num: 'M05',
      title: 'L\'Art Contemporain en France et Suisse',
      subtitle: 'Arte Contemporáneo · Circuito FIAC, Art Basel, Bienales',
      description:
        'El sistema del arte contemporáneo en el mundo francófono — cómo funciona el circuito de galerías parisinas, qué significa Art Basel Ginebra, cómo leer un artist statement en el registro de una grande école de arte. Escritura de dossier artístico y note d\'intention en francés.',
      tags: [
        'Art Basel Genève',
        'FIAC Paris',
        'Galerie nationale du Jeu de Paume',
        'Nicolas Bourriaud — Esthétique relationnelle',
        'Artist statement en francés',
        'Critique d\'exposition',
      ],
    },
    {
      num: 'M06',
      title: 'Photographie — Langage et Regard',
      subtitle: 'Fotografía como Lenguaje Visual · De la Nouvelle Vague al Contemporáneo',
      description:
        'La fotografía en el pensamiento francés — de Henri Cartier-Bresson al discurso sobre imagen de Godard. Por qué HEAD Ginebra tiene uno de los mejores programas de fotografía del mundo y qué registro intelectual esperan de sus candidatos. Análisis de obra fotográfica en francés.',
      tags: [
        'Henri Cartier-Bresson',
        'La Nouvelle Vague',
        'Chris Marker',
        'Nan Goldin en París',
        'HEAD Genève — foto',
        'Análisis de imagen en francés',
      ],
    },
  ],
  skills: [
    {
      icon: <IconFeather />,
      name: 'Note d\'intention',
      desc: 'Redacción de declaración artística y nota de intención en francés con vocabulario de práctica contemporánea.',
    },
    {
      icon: <IconMic />,
      name: 'Entretien d\'admission',
      desc: 'Conducir una revisión de portafolio y defender decisiones creativas ante un jurado de una grande école.',
    },
    {
      icon: <IconFileText />,
      name: 'Lettre de motivation',
      desc: 'Escritura de carta de motivación institucional calibrada al tono de ÉCAL, HEAD y ENSAD.',
    },
    {
      icon: <IconSearch />,
      name: 'Critique d\'œuvre',
      desc: 'Análisis escrito y oral de obra artística usando el vocabulario crítico de la tradición francesa.',
    },
  ],
  references: [
    'Roland Barthes — La Chambre Claire',
    'Guy Debord — La Société du Spectacle',
    'Nicolas Bourriaud — Esthétique relationnelle',
    'Müller-Brockmann — Grid Systems',
    'Emil Ruder — Typography',
    'HEAD Genève — Annuaire étudiant',
    'ÉCAL — Catalog',
    'Institut Français de la Mode',
    'Maison Margiela Archives',
    'Art Basel Genève',
  ],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ModuleCard({ mod }: { mod: Module }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#faf7f2' : '#ede8df',
        padding: '36px',
        transition: 'background 0.25s ease',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#c4603a',
          opacity: 0.7,
          marginBottom: '10px',
        }}
      >
        {mod.num}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#1a1410',
          marginBottom: '10px',
          lineHeight: 1.2,
        }}
      >
        {mod.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: '#c4603a',
          opacity: 0.75,
          marginBottom: '14px',
        }}
      >
        {mod.subtitle}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.65,
          color: '#1a1410',
          opacity: 0.65,
          marginBottom: '18px',
        }}
      >
        {mod.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {mod.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9.5px',
              letterSpacing: '0.08em',
              color: '#1a1410',
              background: 'rgba(26,20,16,0.06)',
              padding: '4px 10px',
              borderRadius: '2px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CurriculumPanel({ data, isMobile }: { data: PanelData; isMobile: boolean }) {
  return (
    <div>
      {/* Intro block */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '32px' : '64px',
          marginBottom: '64px',
          paddingBottom: '56px',
          borderBottom: '1px solid rgba(26,20,16,0.06)',
          alignItems: 'start',
        }}
      >
        {/* Left */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 300,
            lineHeight: 1.35,
            color: '#1a1410',
            paddingLeft: '28px',
            borderLeft: '2px solid #c4603a',
          }}
        >
          {data.introLeft}
        </p>
        {/* Right */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: '#1a1410',
            opacity: 0.75,
          }}
        >
          {data.introRight}
        </p>
      </div>

      {/* Modules label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#c4603a',
            whiteSpace: 'nowrap',
          }}
        >
          Módulos del programa
        </span>
        <span
          style={{
            flexGrow: 1,
            maxWidth: '120px',
            height: '1px',
            background: 'rgba(26,20,16,0.06)',
          }}
        />
      </div>

      {/* Modules grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '2px',
          marginBottom: '2px',
        }}
      >
        {data.modules.map((mod) => (
          <ModuleCard key={mod.num} mod={mod} />
        ))}
      </div>

      {/* Application skills */}
      <div
        style={{
          background: '#2c2420',
          padding: '48px',
          marginTop: '2px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c4603a',
            marginBottom: '28px',
          }}
        >
          Habilidades de aplicación que desarrollas
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '16px' : '24px',
          }}
        >
          {data.skills.map((skill) => (
            <div
              key={skill.name}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ marginBottom: 4 }}>{skill.icon}</div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(245,240,232,0.85)',
                }}
              >
                {skill.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.55,
                  color: 'rgba(245,240,232,0.4)',
                }}
              >
                {skill.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* References row */}
      <div
        style={{
          paddingTop: '40px',
          borderTop: '1px solid rgba(26,20,16,0.06)',
          marginTop: '48px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c4603a',
            marginBottom: '20px',
          }}
        >
          Lecturas de referencia
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '6px' : '10px' }}>
          {data.references.map((ref) => (
            <ReferenceItem key={ref} label={ref} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReferenceItem({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        fontStyle: 'italic',
        color: '#1a1410',
        opacity: hovered ? 0.9 : 0.5,
        padding: '6px 16px',
        border: hovered
          ? '1px solid #c4603a'
          : '1px solid rgba(26,20,16,0.06)',
        transition: 'opacity 0.2s ease, border-color 0.2s ease',
        cursor: 'default',
      }}
    >
      {label}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState<Tab>('italiano');
  const isMobile = useIsMobile();

  const tabs: { id: Tab; label: string }[] = [
    { id: 'italiano', label: '🇮🇹  Italiano' },
    { id: 'frances', label: '🇫🇷  Français' },
  ];

  return (
    <section
      id="curriculum"
      style={{
        background: '#f5f0e8',
        padding: isMobile ? '72px 0' : '120px 0',
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#c4603a',
            marginBottom: '28px',
          }}
        >
          Contenido del Programa
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
            color: '#1a1410',
            marginBottom: '28px',
          }}
        >
          Lo que se aprende
          <br />
          <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
            en cada idioma.
          </em>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.16 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: '#1a1410',
            opacity: 0.75,
            maxWidth: '600px',
          }}
        >
          Cada track es un mapa específico hacia el mundo creativo europeo que
          el estudiante quiere habitar. Los módulos están construidos alrededor
          de los temas, referentes y habilidades que los comités de admisión de
          escuelas europeas realmente evalúan.
        </motion.p>

        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(26,20,16,0.06)',
            marginTop: '56px',
            overflowX: isMobile ? 'auto' : undefined,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  padding: isMobile ? '12px 20px' : '16px 36px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive
                    ? '2px solid #c4603a'
                    : '2px solid transparent',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  color: isActive ? '#c4603a' : '#1a1410',
                  opacity: isActive ? 1 : 0.35,
                  transition:
                    'opacity 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '0.65';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '0.35';
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panels */}
        <div style={{ marginTop: '64px' }}>
          {activeTab === 'italiano' && (
            <CurriculumPanel data={italianPanel} isMobile={isMobile} />
          )}
          {activeTab === 'frances' && (
            <CurriculumPanel data={frenchPanel} isMobile={isMobile} />
          )}
        </div>
      </div>
    </section>
  );
}
