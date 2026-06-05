'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Feature { text: string }

interface ProgramCardProps {
  index: number;
  tag: string;
  accentColor: string;
  spotlightColor: string;
  name: React.ReactNode;
  subtitle: string;
  description: string;
  features: Feature[];
  ctaHref: string;
  ctaLabel: string;
}

/* ── Spotlight card ─────────────────────────────────────── */
function ProgramCard({
  index, tag, accentColor, spotlightColor,
  name, subtitle, description, features, ctaHref, ctaLabel,
}: ProgramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: easeOut, delay: index * 0.18 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#232019' : '#1a1916',
        padding: '4rem 3.5rem',
        overflow: 'hidden',
        cursor: 'none',
        position: 'relative',
        transition: 'background 0.5s ease',
      }}
    >
      {/* Mouse-tracking radial spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
          zIndex: 0,
        }}
      />

      {/* Bottom accent bar — scaleX on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '3px',
          background: accentColor,
          transformOrigin: 'left center',
          zIndex: 1,
        }}
      />

      {/* All content above spotlight */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tag */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: accentColor,
          marginBottom: '2rem',
        }}>
          {tag}
        </p>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 4vw, 4rem)',
          fontWeight: 400,
          lineHeight: 1.05,
          color: '#f5f2ec',
          marginBottom: '1rem',
        }}>
          {name}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontStyle: 'italic',
          color: '#6b6860',
          marginBottom: '2rem',
        }}>
          {subtitle}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: 300,
          lineHeight: 1.8,
          color: 'rgba(245,242,236,0.55)',
          maxWidth: '460px',
          marginBottom: '2.5rem',
        }}>
          {description}
        </p>

        {/* Features */}
        <ul style={{
          listStyle: 'none', padding: 0,
          margin: '0 0 3rem',
          display: 'flex', flexDirection: 'column', gap: '0.9rem',
        }}>
          {features.map((f, i) => (
            <li key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(245,242,236,0.65)',
              display: 'flex', gap: '0.75rem',
            }}>
              <span aria-hidden="true" style={{ color: accentColor, flexShrink: 0 }}>—</span>
              {f.text}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            color: accentColor,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4em',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {ctaLabel}
        </a>
      </div>
    </motion.div>
  );
}

/* ── Data ───────────────────────────────────────────────── */
const italian = {
  tag: 'Idioma · 01',
  accentColor: '#c8451a',
  spotlightColor: 'rgba(200,69,26,0.12)',
  name: (<>Italiano<br />para el Arte</>),
  subtitle: 'La lengua del diseño que domina el mundo',
  description: 'Italia aloja seis de las veinte escuelas de arte y diseño más importantes de Europa. Politecnico di Milano, NABA, Domus Academy, IED — para entrar en ese mundo con ventaja real, el italiano no es opcional. Es fundacional.',
  features: [
    { text: 'Historia del diseño milanés y la tradición Bauhausiana en contexto italiano' },
    { text: 'Vocabulario técnico de arquitectura, moda y diseño de producto' },
    { text: 'Lectura crítica de textos de teoría del arte en italiano' },
    { text: 'Preparación para entrevistas de admisión en instituciones italianas' },
  ],
  ctaHref: 'https://wa.me/51983747658?text=Hola,%20me%20interesa%20el%20programa%20de%20Italiano%20para%20el%20Arte',
  ctaLabel: 'Consultar disponibilidad →',
};

const french = {
  tag: 'Idioma · 02',
  accentColor: '#b89a5a',
  spotlightColor: 'rgba(184,154,90,0.12)',
  name: (<>Francés<br />para el Arte</>),
  subtitle: 'La lengua del pensamiento crítico en el arte',
  description: 'Francia, Suiza francófona, Bélgica — el francés abre acceso a ENSAD, HEAD Ginebra, ÉCAL Lausana. Pero más allá de los destinos, el francés es el idioma de la teoría del arte contemporáneo. Derrida, Bourdieu, Baudrillard. El vocabulario con el que se juzga el trabajo.',
  features: [
    { text: 'Teoría del arte contemporáneo: de Duchamp a los conceptualistas franceses' },
    { text: 'Cultura de las bienales europeas y el circuito de galerías parisino' },
    { text: 'Escritura de propuestas artísticas y statements en francés' },
    { text: 'Preparación para concours de admisión en ENSAD y ÉCAL' },
  ],
  ctaHref: 'https://wa.me/51983747658?text=Hola,%20me%20interesa%20el%20programa%20de%20Franc%C3%A9s%20para%20el%20Arte',
  ctaLabel: 'Consultar disponibilidad →',
};

/* ── Section ────────────────────────────────────────────── */
export default function Programs() {
  return (
    <section style={{ background: '#f5f2ec', color: '#1a1916', padding: '14rem 4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '7rem' }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            maxWidth: '680px',
            color: '#1a1916',
          }}
        >
          Idiomas para{' '}
          <em style={{ fontStyle: 'normal', color: '#c8451a' }}>el Arte y el Diseño</em>
        </motion.h2>
        <span aria-hidden="true" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '9rem', fontWeight: 300,
          color: '#e8e4dc', lineHeight: 1, userSelect: 'none', flexShrink: 0,
        }}>02</span>
      </div>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: easeOut }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem', fontWeight: 300, lineHeight: 1.8,
          color: 'rgba(26,25,22,0.6)', maxWidth: '720px', marginBottom: '5rem',
        }}
      >
        El idioma no es un trámite. Es el medio a través del cual los estudiantes
        desarrollan la{' '}
        <strong style={{ fontWeight: 500, color: 'rgba(26,25,22,0.85)' }}>alfabetización cultural</strong>{' '}
        que las instituciones europeas premian. Un estudiante que puede discutir el
        diseño milanés en italiano o leer a Le Corbusier en francés no está solo
        lingüísticamente preparado — está institucionalmente legible de una forma
        que cambia cómo lo leen los comités de admisión.
      </motion.p>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
        <ProgramCard index={0} {...italian} />
        <ProgramCard index={1} {...french} />
      </div>
    </section>
  );
}
