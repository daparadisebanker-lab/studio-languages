'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

/* ── Keyframe styles injected once ───────────────────────── */
const GLOBAL_STYLES = `
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.5; transform: scaleY(1); }
    50%       { opacity: 1;   transform: scaleY(1.12); }
  }
  @keyframes drift {
    0%, 100% { transform: translateX(0); }
    50%       { transform: translateX(-30px); }
  }
`;

/* ── Fade-up variant ──────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/* ── Language Card ───────────────────────────────────────── */
interface CardProps {
  flag: string;
  name: string;
  targets: string;
  schools: string;
  delay: number;
}

function LanguageCard({ flag, name, targets, schools, delay }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        background: hovered ? 'rgba(196,96,58,0.12)' : 'rgba(245,240,232,0.05)',
        border: `1px solid ${hovered ? 'rgba(196,96,58,0.3)' : 'rgba(245,240,232,0.12)'}`,
        backdropFilter: 'blur(8px)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        transform: hovered ? 'translateX(-6px)' : 'translateX(0)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Flag */}
      <span
        style={{
          fontSize: 30,
          flexShrink: 0,
          marginTop: 2,
          lineHeight: 1,
        }}
      >
        {flag}
      </span>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(245,240,232,0.9)',
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#c4603a',
            marginBottom: 8,
          }}
        >
          {targets}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.5,
          }}
        >
          {schools}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Primary Button ──────────────────────────────────────── */
function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#f5f0e8',
        background: hovered ? '#1a1410' : '#c4603a',
        padding: '16px 32px',
        display: 'inline-block',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
      }}
    >
      {children}
    </a>
  );
}

/* ── Secondary Button ────────────────────────────────────── */
function SecondaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: hovered ? '#c4603a' : '#1a1410',
        background: 'none',
        borderBottom: `1px solid ${hovered ? '#c4603a' : '#1a1410'}`,
        paddingBottom: 2,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        textDecoration: 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {children}
    </a>
  );
}

/* ── Drifting word ───────────────────────────────────────── */
interface DriftWordProps {
  text: string;
  size: number;
  color: string;
  delay: string;
  top?: string;
  left?: string;
}

function DriftWord({ text, size, color, delay, top, left }: DriftWordProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: size,
        fontWeight: 300,
        fontStyle: 'italic',
        color,
        display: 'block',
        animation: `drift 20s ease-in-out ${delay} infinite`,
        whiteSpace: 'nowrap',
        ...(top ? { position: 'absolute' as const, top, left: left ?? '10%' } : {}),
      }}
    >
      {text}
    </span>
  );
}

/* ── Hero Section ────────────────────────────────────────── */
export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Inject keyframes */}
      <style>{GLOBAL_STYLES}</style>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          style={{
            background: '#f5f0e8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: isMobile ? '100px 24px 60px' : '140px 64px 80px',
            position: 'relative',
          }}
        >
          {/* Eyebrow */}
          <motion.div {...fadeUp(0.2)} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div
              aria-hidden="true"
              style={{ width: 32, height: 1, background: '#c4603a', flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#c4603a',
              }}
            >
              Lima, Perú · Programa 2026
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.35)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 7vw, 96px)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#1a1410',
              marginBottom: 32,
            }}
          >
            Idiomas
            <br />
            para{' '}
            <em style={{ color: '#c4603a', fontStyle: 'italic' }}>Arte</em>
            <br />
            <em style={{ color: '#c4603a', fontStyle: 'italic' }}>y Diseño</em>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.5)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#1a1410',
              maxWidth: 440,
              marginBottom: 48,
            }}
          >
            El primer programa en el Perú que enseña italiano y francés
            específicamente para estudiantes que se preparan para escuelas de
            arte y diseño europeas. No aprendes el idioma. Aprendes a pertenecer
            al mundo al que quieres llegar.
          </motion.p>

          {/* Actions */}
          <motion.div
            {...fadeUp(0.65)}
            style={{ display: 'flex', gap: 24, alignItems: 'center' }}
          >
            <PrimaryBtn href="#inscripcion">Reservar lugar</PrimaryBtn>
            <SecondaryBtn href="#programa">Ver el programa →</SecondaryBtn>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            {...fadeUp(1.1)}
            style={{
              position: 'absolute',
              bottom: 40,
              left: isMobile ? 24 : 64,
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 1,
                height: 48,
                background: '#c4603a',
                flexShrink: 0,
                animation: 'scrollPulse 2s ease-in-out infinite',
                transformOrigin: 'top',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c4603a',
                writingMode: 'vertical-rl',
              }}
            >
              Descubrir
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            background: '#2c2420',
            position: 'relative',
            overflow: 'hidden',
            ...(isMobile ? { height: '350px' } : {}),
          }}
        >
          {/* Decorative drifting words layer */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 60,
              overflow: 'hidden',
              zIndex: 0,
              gap: 24,
              pointerEvents: 'none',
            }}
          >
            <DriftWord
              text="Milano"
              size={120}
              color="rgba(245,240,232,0.06)"
              delay="0s"
            />
            <DriftWord
              text="Parigi"
              size={88}
              color="rgba(196,96,58,0.08)"
              delay="-7s"
            />
            <DriftWord
              text="Design"
              size={140}
              color="rgba(245,240,232,0.06)"
              delay="-14s"
            />
            <DriftWord
              text="Lausanne"
              size={100}
              color="rgba(184,151,58,0.06)"
              delay="-3s"
            />
          </div>

          {/* Language cards layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: isMobile ? 20 : 40,
              zIndex: 2,
            }}
          >
            <LanguageCard
              flag="🇮🇹"
              name="Italiano"
              targets="Arte · Diseño · Arquitectura"
              schools="NABA · Domus Academy · IED · Politecnico di Milano"
              delay={0.7}
            />
            <LanguageCard
              flag="🇫🇷"
              name="Français"
              targets="Arte · Moda · Fotografía"
              schools="ÉCAL · HEAD Genève · École des Beaux-Arts · ENSAD"
              delay={0.9}
            />
          </div>
        </div>
      </section>
    </>
  );
}
