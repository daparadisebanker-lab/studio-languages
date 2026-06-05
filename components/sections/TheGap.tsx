'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];
const BORDER = '1px solid rgba(245,242,236,0.1)';

/* ── Animated counter that rolls up from 0 ─────────────── */
function CountUp({
  target,
  decimals = 0,
  paperSuffix,       // part after the number in paper color
  terracottaSuffix,  // part appended in terracotta color
}: {
  target: number;
  decimals?: number;
  paperSuffix?: string;
  terracottaSuffix?: string;
}) {
  const numRef  = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(rootRef, { once: true, margin: '-60px' });
  const count   = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, target, {
      duration: 2,
      ease: easeOut,
      onUpdate: (v) => {
        if (numRef.current) {
          numRef.current.textContent = decimals > 0
            ? v.toFixed(decimals)
            : String(Math.round(v));
        }
      },
    });
    return ctrl.stop;
  }, [inView, target, decimals, count]);

  return (
    <div ref={rootRef}>
      <span style={{ color: '#f5f2ec' }}>
        <span ref={numRef}>{decimals > 0 ? (0).toFixed(decimals) : '0'}</span>
        {paperSuffix}
      </span>
      {terracottaSuffix && (
        <span style={{ color: '#c8451a' }}>{terracottaSuffix}</span>
      )}
    </div>
  );
}

/* ── Static zero ────────────────────────────────────────── */
function StaticZero() {
  return <span style={{ color: '#f5f2ec' }}>0</span>;
}

/* ── Cell config ────────────────────────────────────────── */
const cells = [
  {
    number: (
      <CountUp target={0.5} decimals={1} terracottaSuffix="%" />
    ),
    label: 'Tasa de captura actual',
    desc: 'América Latina envía menos del 0.5% de sus estudiantes creativos a las principales escuelas de arte europeas, frente al 10–12% de China y 6% de Corea del Sur.',
  },
  {
    number: (
      <CountUp target={160} paperSuffix="" terracottaSuffix="k" />
    ),
    label: 'Latinoamericanos en Europa',
    desc: 'Más de 160,000 estudiantes latinoamericanos están matriculados en universidades europeas. Menos de 6,000 están en programas de arte y diseño de primer nivel.',
  },
  {
    number: <StaticZero />,
    label: 'Instituciones feeder serias',
    desc: 'Ninguna institución en Perú — ni en toda la región andina — ha construido un pipeline serio y creíble hacia la educación de arte y diseño europea.',
  },
];

/* ── Section ────────────────────────────────────────────── */
export default function TheGap() {
  return (
    <section style={{ background: '#2d2b27', padding: '12rem 4rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: BORDER,
          borderLeft: BORDER,
        }}
      >
        {cells.map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: easeOut, delay: i * 0.15 }}
            style={{ borderRight: BORDER, borderBottom: BORDER, padding: '4rem 3rem' }}
          >
            {/* Animated number */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 8vw, 8rem)',
                fontWeight: 300,
                lineHeight: 1,
                marginBottom: '1.5rem',
              }}
            >
              {cell.number}
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#6b6860',
                marginBottom: '1.25rem',
              }}
            >
              {cell.label}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(245,242,236,0.5)',
              }}
            >
              {cell.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
