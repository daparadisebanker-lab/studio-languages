'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

const cityCoords: Record<string, string> = {
  'Italia':        "45°28'N 09°10'E",
  'Francia':       "48°51'N 02°21'E",
  'Suiza':         "46°31'N 06°38'E",
  'Reino Unido':   "51°30'N 00°07'W",
  'Países Bajos':  "52°22'N 04°54'E",
  'España':        "40°25'N 03°41'W",
};

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
          {/* Country + coordinate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            {cityCoords[dest.country] && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  color: 'rgba(245,240,232,0.3)',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                }}
              >
                {cityCoords[dest.country]}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Destinations() {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);

  const visibleDestinations = isMobile && !showAll ? destinations.slice(0, 3) : destinations;

  return (
    <section
      style={{
        background: '#1a1916',
        padding: isMobile ? '72px 24px' : '12rem 4rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* World map outline — geographic depth at near-zero opacity */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          pointerEvents: 'none',
          color: '#C4603A',
        }}
      >
        {/* Europe approximate outline */}
        <path
          d="M380 80 L420 75 L450 85 L480 70 L500 80 L510 100 L490 115 L470 120 L450 130 L430 140 L410 135 L390 120 L370 110 L360 95 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* South America approximate */}
        <path
          d="M220 280 L250 270 L280 275 L295 300 L290 350 L280 400 L260 430 L240 450 L220 440 L200 420 L195 380 L200 330 L205 300 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
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

      {/* Ticker on desktop / static list on mobile */}
      {isMobile ? (
        <div>
          {visibleDestinations.map((dest, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid rgba(245,240,232,0.07)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(245,242,236,0.75)',
                  }}
                >
                  {dest.name}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0, textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#6b6860',
                  }}
                >
                  {dest.country}
                </span>
                {cityCoords[dest.country] && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'rgba(245,240,232,0.3)',
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                    }}
                  >
                    {cityCoords[dest.country]}
                  </span>
                )}
              </div>
            </div>
          ))}

          {isMobile && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: 16,
                padding: '16px',
                background: 'rgba(245,240,232,0.05)',
                border: '1px solid rgba(245,240,232,0.1)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.4)',
                minHeight: 52,
                borderRadius: 4,
              }}
            >
              Ver todos los destinos →
            </button>
          )}
        </div>
      ) : (
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
      )}

      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
          marginTop: isMobile ? 48 : 56,
          paddingTop: 32,
          borderTop: '1px solid rgba(245,240,232,0.08)',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 20,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.85)',
            margin: 0,
          }}
        >
          ¿Tu escuela está en esta lista?
        </p>
        <a
          href="#inscripcion"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#c4603a',
            textDecoration: 'none',
            borderBottom: '1px solid #c4603a',
            paddingBottom: 2,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Construyamos el idioma que necesitas →
        </a>
      </motion.div>
    </section>
  );
}
