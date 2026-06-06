'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

/* ── Word token definition ───────────────────────────────── */
interface Token {
  text: string;
  gold?: boolean;
  italic?: boolean;
  lineBreak?: boolean;
}

const tokens: Token[] = [
  { text: 'El' },
  { text: 'talento' },
  { text: 'creativo' },
  { text: 'de' },
  { text: 'América' },
  { text: 'Latina', lineBreak: true },
  { text: 'es', gold: true, italic: true },
  { text: 'invisible', gold: true, italic: true },
  { text: 'para' },
  { text: 'Europa.', lineBreak: true },
  { text: 'Studio' },
  { text: 'existe' },
  { text: 'para' },
  { text: 'cambiar' },
  { text: 'eso.' },
];

/* ── Single word — imperative opacity via MotionValue sub ── */
function RevealWord({
  token,
  progress,
  range,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const opacity = useTransform(progress, range, [0.12, 1]);

  useEffect(() => {
    return opacity.on('change', (v) => {
      if (spanRef.current) spanRef.current.style.opacity = String(v);
    });
  }, [opacity]);

  return (
    <>
      <span
        ref={spanRef}
        style={{
          display: 'inline-block',
          marginRight: '0.3em',
          opacity: 0.12,
          color: token.gold ? '#b89a5a' : '#f5f2ec',
          fontStyle: token.italic ? 'italic' : 'normal',
          willChange: 'opacity',
        }}
      >
        {token.text}
      </span>
      {token.lineBreak && <br />}
    </>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Manifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 0.8', 'end 0.55'],
  });

  return (
    <section
      ref={wrapperRef}
      style={{
        background: '#1a1916',
        padding: isMobile ? '72px 24px' : '8rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top divider */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(to right, transparent, #6b6860 30%, #6b6860 70%, transparent)',
        }}
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#c8451a',
          marginBottom: '2rem',
        }}
      >
        América Latina · 2026
      </motion.p>

      {/* Scroll-reveal headline */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(2.4rem, 9vw, 3.6rem)' : 'clamp(2.8rem, 5vw, 5.5rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: '900px',
          color: '#f5f2ec',
        }}
      >
        {tokens.map((token, i) => (
          <RevealWord
            key={i}
            token={token}
            progress={scrollYProgress}
            range={[i / tokens.length, (i + 1) / tokens.length]}
          />
        ))}
      </h1>

      {/* Body copy — single condensed paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(245,242,236,0.6)',
          maxWidth: '560px',
          marginTop: '2.5rem',
        }}
      >
        El talento existe. Lo que falta es la preparación específica para llegar a{' '}
        <strong style={{ color: '#f5f2ec', fontWeight: 400 }}>
          la RCA, Central Saint Martins, NABA, ÉCAL.
        </strong>{' '}
        Studio existe para cerrar esa brecha.
      </motion.p>
    </section>
  );
}
