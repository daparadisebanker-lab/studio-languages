'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

/* ── Word token definition ───────────────────────────────── */
interface Token {
  text: string;
  gold?: boolean;
  italic?: boolean;
  lineBreak?: boolean;
}

const tokens: Token[] = [
  { text: 'La' },
  { text: 'escuela' },
  { text: 'te' },
  { text: 'abre' },
  { text: 'la' },
  { text: 'puerta.' },
  { lineBreak: true, text: '' },
  { text: 'El', gold: true, italic: true },
  { text: 'idioma', gold: true, italic: true },
  { text: 'decide', gold: true, italic: true },
  { text: 'si', gold: true, italic: true },
  { text: 'te', gold: true, italic: true },
  { text: 'quedas.', gold: true, italic: true },
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
  const [expanded, setExpanded] = useState(false);

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
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
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
          fontSize: isMobile ? 'clamp(2.6rem, 10vw, 4rem)' : 'clamp(3.5rem, 7vw, 7rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
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

      {/* Terra rule */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          width: 80,
          height: 1,
          background: '#c8451a',
          marginTop: '2rem',
          transformOrigin: 'left',
        }}
      />

      {/* Body copy — movement 2 (always visible) */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(245,242,236,0.6)',
          maxWidth: '560px',
          marginTop: '1.5rem',
        }}
      >
        Las escuelas son en inglés. La industria donde quieres trabajar después, no.
        El idioma no es el requisito — es la diferencia entre pasar cuatro años en Europa
        y quedarte.
      </motion.p>

      {/* Leer más toggle — mobile only */}
      {isMobile && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.35)',
            padding: '12px 0',
            minHeight: 44,
            display: 'block',
          }}
        >
          Leer más →
        </button>
      )}

      {/* Remaining paragraphs — collapsed on mobile until expanded */}
      <AnimatePresence>
        {(!isMobile || expanded) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Positioning argument — access, not language */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(245,242,236,0.55)',
                maxWidth: '560px',
                marginTop: '1rem',
              }}
            >
              El producto real del programa no es el idioma — es el acceso. El idioma es el mecanismo.
              Pertenecer al ecosistema creativo europeo es la promesa.
            </motion.p>

            {/* Closing line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#c8451a',
                marginTop: '2.5rem',
                marginBottom: 0,
              }}
            >
              No enseñamos el idioma. Abrimos la puerta.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ghost year — typographic depth layer */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.1em',
          right: '4rem',
          fontSize: 'clamp(120px, 20vw, 240px)',
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          lineHeight: 1,
          color: 'rgba(245,242,236,0.03)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        26
      </span>
    </section>
  );
}
