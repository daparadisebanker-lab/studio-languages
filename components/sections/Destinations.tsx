'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

const destinations = [
  { name: 'Politecnico di Milano', country: 'Italia' },
  { name: 'NABA', country: 'Italia' },
  { name: 'Domus Academy', country: 'Italia' },
  { name: 'Central Saint Martins', country: 'Reino Unido' },
  { name: 'Royal College of Art', country: 'Reino Unido' },
  { name: 'ÉCAL', country: 'Suiza' },
  { name: 'HEAD Genève', country: 'Suiza' },
  { name: 'ENSAD', country: 'Francia' },
  { name: 'Goldsmiths', country: 'Reino Unido' },
  { name: 'Design Academy Eindhoven', country: 'Países Bajos' },
  { name: 'IED Madrid', country: 'España' },
  { name: 'Gerrit Rietveld Academie', country: 'Países Bajos' },
];

function TickerTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="animate-ticker"
      aria-hidden={ariaHidden || undefined}
      style={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
      }}
    >
      {destinations.map((dest, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.5rem',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '0 1.5rem',
          }}
        >
          {/* Dot */}
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#c8451a',
              flexShrink: 0,
              display: 'block',
            }}
          />
          {/* Name */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245,242,236,0.35)',
              letterSpacing: '0.01em',
            }}
          >
            {dest.name}
          </span>
          {/* Country */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#6b6860',
            }}
          >
            {dest.country}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Destinations() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        background: '#1a1916',
        padding: isMobile ? '72px 24px' : '12rem 4rem',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: isMobile ? '3rem' : '5rem' }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: '#c8451a',
            marginBottom: '1.25rem',
          }}
        >
          Destinos que abrimos
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 300,
            color: '#f5f2ec',
            lineHeight: 1.1,
            whiteSpace: 'pre-line',
          }}
        >
          {'Donde llegan /\nnuestros estudiantes'}
        </h2>
      </motion.div>

      {/* Ticker wrapper */}
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left fade gradient */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(to right, #1a1916, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Right fade gradient */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(to left, #1a1916, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Track — rendered twice for seamless loop */}
        <TickerTrack />
        <TickerTrack ariaHidden />
      </div>
    </section>
  );
}
