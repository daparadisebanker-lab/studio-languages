'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

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

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 0.8', 'end 0.55'],
  });

  return (
    <section
      ref={wrapperRef}
      style={{
        background: '#1a1916',
        padding: '14rem 4rem',
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
          marginBottom: '3rem',
        }}
      >
        Lima, Perú · 2026
      </motion.p>

      {/* Scroll-reveal headline — each word lights up as you scroll */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.2rem, 7vw, 7.5rem)',
          fontWeight: 300,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          maxWidth: '1100px',
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

      {/* Body copy */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          maxWidth: '900px',
          marginTop: '5rem',
        }}
      >
        {[
          <>
            Las familias cuyos hijos son genuinamente talentosos en arte, diseño,
            arquitectura y cine no tienen a dónde enviarlos para prepararse
            rigurosamente para las instituciones que importan:{' '}
            <strong style={{ color: '#f5f2ec', fontWeight: 400 }}>
              la RCA, Central Saint Martins, NABA, Domus Academy, ÉCAL.
            </strong>
          </>,
          <>
            No porque el talento no exista. Sino porque{' '}
            <strong style={{ color: '#f5f2ec', fontWeight: 400 }}>
              la infraestructura de preparación no existe.
            </strong>{' '}
            Studio es la primera institución creativa pre-universitaria de la región
            construida específicamente para cerrar esa brecha.
          </>,
        ].map((content, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.15 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(245,242,236,0.65)',
            }}
          >
            {content}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
