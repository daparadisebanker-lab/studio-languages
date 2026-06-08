'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Constants ──────────────────────────────────────────────────────────── */
type Beat = 'provoke' | 'reveal' | 'cta';
const BEAT_MS = { provoke: 5200, reveal: 5200, cta: 5200 } as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

/* ── Animation helpers ──────────────────────────────────────────────────── */
const up = (delay: number, dur = 0.75) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: dur, delay, ease: easeOut },
});
const fade = (delay: number, dur = 0.6) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: dur, delay, ease: easeOut },
});
const scaleX = (delay: number) => ({
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.55, delay, ease: easeOut },
});

/* ── Shared noise overlay ───────────────────────────────────────────────── */
function Noise() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: NOISE,
      opacity: 0.028, pointerEvents: 'none', zIndex: 10,
    }} />
  );
}

/* ── Registration marks ─────────────────────────────────────────────────── */
function Marks({ color = 'rgba(196,96,58,0.25)' }) {
  const s: React.CSSProperties = { position: 'absolute', width: 22, height: 22, borderColor: color };
  return (
    <>
      <div style={{ ...s, top: 286, left: 80, borderTop: '1px solid', borderLeft: '1px solid' }} />
      <div style={{ ...s, top: 286, right: 80, borderTop: '1px solid', borderRight: '1px solid' }} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BEAT 1 — PROVOKE
   "You studied at the same school. He got the internship. You didn't."
   BG: Cream · 5.2s
   ══════════════════════════════════════════════════════════════════════════ */
function ProvokeView() {
  return (
    <motion.div
      key="provoke"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', inset: 0, background: '#F5F0E8' }}
    >
      <Noise />
      <Marks />

      {/* Eyebrow */}
      <motion.p {...fade(0.3)} style={{
        position: 'absolute', top: 326, left: 80,
        fontFamily: 'var(--font-mono)', fontSize: 21, letterSpacing: 5,
        textTransform: 'uppercase', color: '#C4603A',
      }}>
        STUDIO BY PARADISE
      </motion.p>

      {/* Ghost line — faint setup */}
      <motion.p {...fade(0.55, 0.5)} style={{
        position: 'absolute', top: 420, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 88, lineHeight: 1.05, color: 'rgba(26,20,16,1)',
      }}>
        Estudiaste en<br />la misma escuela.
      </motion.p>

      <motion.p {...fade(1.1, 0.5)} style={{
        position: 'absolute', top: 638, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 88, lineHeight: 1.05, color: 'rgba(26,20,16,0.3)',
      }}>
        Hiciste el mismo<br />portfolio.
      </motion.p>

      <motion.p {...fade(1.65, 0.5)} style={{
        position: 'absolute', top: 852, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 88, lineHeight: 1.05, color: 'rgba(26,20,16,0.3)',
      }}>
        Tuviste el mismo<br />tutor.
      </motion.p>

      {/* Terra rule */}
      <motion.div {...scaleX(2.35)} style={{
        position: 'absolute', top: 1070, left: 80,
        width: 108, height: 1, background: '#C4603A',
      }} />

      {/* Contrast */}
      <motion.p {...up(2.6, 0.8)} style={{
        position: 'absolute', top: 1100, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
        fontSize: 80, lineHeight: 1.08, color: 'rgba(26,20,16,1)',
      }}>
        Él consiguió<br />las prácticas.
      </motion.p>

      {/* Pause beat — "Tú, no." hits hardest */}
      <motion.p {...up(3.55, 0.9)} style={{
        position: 'absolute', top: 1326, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
        fontSize: 80, color: 'rgba(26,20,16,0.5)',
      }}>
        Tú, no.
      </motion.p>

      {/* Bottom CTA strip */}
      <motion.div {...fade(4.3, 0.5)} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 268,
        background: '#F5F0E8',
        borderTop: '1px solid rgba(196,96,58,0.18)',
        display: 'flex', alignItems: 'center',
        padding: '0 80px', gap: 20,
      }}>
        <div style={{ width: 32, height: 1, background: '#C4603A', flexShrink: 0 }} />
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 20, letterSpacing: 3,
          textTransform: 'uppercase', color: '#C4603A',
        }}>
          La diferencia no era el talento →
        </p>
      </motion.div>

      {/* Right edge measurement line */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(196,96,58,0.1), transparent)',
      }} />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BEAT 2 — REVEAL
   Product information: what it is, who for, schools, price, date.
   BG: Ink #1A1410 · 5.2s
   ══════════════════════════════════════════════════════════════════════════ */
function RevealView() {
  return (
    <motion.div
      key="reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      transition={{ duration: 0.55 }}
      style={{ position: 'absolute', inset: 0, background: '#1A1410' }}
    >
      <Noise />

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(107,104,96,0.5) 30%, rgba(107,104,96,0.5) 70%, transparent)',
      }} />

      {/* Eyebrow */}
      <motion.p {...fade(0.25)} style={{
        position: 'absolute', top: 318, left: 80,
        fontFamily: 'var(--font-mono)', fontSize: 19, letterSpacing: 4.5,
        textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)',
      }}>
        STUDIO BY PARADISE · 2026
      </motion.p>

      {/* Main language line */}
      <motion.p {...up(0.45, 0.8)} style={{
        position: 'absolute', top: 405, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 100, lineHeight: 1.04, color: '#F5F0E8',
      }}>
        Italiano<br />y français.
      </motion.p>

      {/* Discipline subtitle */}
      <motion.p {...up(0.9, 0.7)} style={{
        position: 'absolute', top: 660, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
        fontSize: 44, lineHeight: 1.2, color: 'rgba(245,240,232,0.5)',
      }}>
        para arte, diseño y arquitectura.
      </motion.p>

      {/* Terra rule */}
      <motion.div {...scaleX(1.3)} style={{
        position: 'absolute', top: 790, left: 80,
        width: 80, height: 1, background: '#C4603A',
      }} />

      {/* School badges */}
      <motion.div {...fade(1.45, 0.6)} style={{
        position: 'absolute', top: 826, left: 80,
        display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap',
      }}>
        {['NABA', 'ÉCAL', 'HEAD', 'ENSAD'].map((s, i) => (
          <span key={s} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 19, letterSpacing: 3.5,
              textTransform: 'uppercase', color: 'rgba(245,240,232,0.22)',
            }}>{s}</span>
            {i < 3 && (
              <span style={{ color: '#C4603A', fontSize: 10, opacity: 0.5, margin: '0 18px' }}>·</span>
            )}
          </span>
        ))}
      </motion.div>

      {/* Two-track split */}
      <motion.div {...up(1.9, 0.7)} style={{
        position: 'absolute', top: 924, left: 80, right: 80,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
        borderTop: '1px solid rgba(245,240,232,0.07)',
        paddingTop: 28,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 16, letterSpacing: 3,
            textTransform: 'uppercase', color: '#C4603A', marginBottom: 10,
          }}>Si vas a Europa</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 30, lineHeight: 1.3, color: 'rgba(245,240,232,0.7)',
          }}>
            Llega con<br />el idioma.
          </p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(245,240,232,0.07)', paddingLeft: 40 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 16, letterSpacing: 3,
            textTransform: 'uppercase', color: '#C4603A', marginBottom: 10,
          }}>Si ya estás</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 30, lineHeight: 1.3, color: 'rgba(245,240,232,0.7)',
          }}>
            Pertenece<br />de verdad.
          </p>
        </div>
      </motion.div>

      {/* Price + date row */}
      <motion.div {...up(2.5, 0.7)} style={{
        position: 'absolute', top: 1200, left: 80, right: 80,
        borderTop: '1px solid rgba(245,240,232,0.06)',
        paddingTop: 32,
        display: 'flex', alignItems: 'center', gap: 40,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: 2.5,
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)',
            marginBottom: 6,
          }}>DESDE</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 36, color: '#F5F0E8',
          }}>$90 / mes</p>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(245,240,232,0.1)' }} />
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: 2.5,
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)',
            marginBottom: 6,
          }}>DURACIÓN</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 36, color: '#F5F0E8',
          }}>8 semanas</p>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(245,240,232,0.1)' }} />
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: 2.5,
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)',
            marginBottom: 6,
          }}>COHORTE</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 36, color: '#C4603A',
          }}>22 de junio</p>
        </div>
      </motion.div>

      {/* Ghost destination */}
      <motion.p {...fade(0.8, 1.2)} style={{
        position: 'absolute', bottom: 240, right: -50,
        fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
        fontSize: 260, lineHeight: 1, color: 'rgba(245,240,232,0.04)',
        whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
      }}>
        Milano
      </motion.p>

      {/* Bottom link */}
      <motion.div {...fade(3.2, 0.5)} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 248,
        background: 'rgba(26,20,16,0.9)',
        borderTop: '1px solid rgba(245,240,232,0.06)',
        display: 'flex', alignItems: 'center',
        padding: '0 80px', gap: 20,
      }}>
        <div style={{ width: 32, height: 1, background: '#C4603A', flexShrink: 0 }} />
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 20, letterSpacing: 3,
          textTransform: 'uppercase', color: 'rgba(196,96,58,0.85)',
        }}>
          studiobyparadise.com →
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BEAT 3 — CTA
   Conversion. Terra BG. WhatsApp direct.
   BG: Terra #C4603A · 5.2s
   ══════════════════════════════════════════════════════════════════════════ */
function CTAView() {
  return (
    <motion.div
      key="cta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      transition={{ duration: 0.5 }}
      style={{ position: 'absolute', inset: 0, background: '#C4603A', overflow: 'hidden' }}
    >
      <Noise />
      <Marks color="rgba(245,240,232,0.2)" />

      {/* Terra sweep — darker layer that sweeps from bottom gives depth */}
      <motion.div
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: easeOut }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '40%', background: 'rgba(26,20,16,0.14)',
          pointerEvents: 'none',
        }}
      />

      {/* Eyebrow */}
      <motion.p {...fade(0.3)} style={{
        position: 'absolute', top: 340, left: 80,
        fontFamily: 'var(--font-mono)', fontSize: 19, letterSpacing: 4,
        textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)',
      }}>
        CONVERSACIÓN INICIAL GRATUITA
      </motion.p>

      {/* Horizontal rule */}
      <motion.div {...scaleX(0.5)} style={{
        position: 'absolute', top: 395, left: 80, right: 80, height: 1,
        background: 'rgba(245,240,232,0.15)',
      }} />

      {/* Headline */}
      <motion.p {...up(0.55, 0.85)} style={{
        position: 'absolute', top: 432, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 100, lineHeight: 1.04, color: '#F5F0E8',
      }}>
        Nos dices<br />a dónde vas.
      </motion.p>

      {/* Subline */}
      <motion.p {...up(1.05, 0.8)} style={{
        position: 'absolute', top: 736, left: 80,
        fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
        fontSize: 80, lineHeight: 1.1, color: 'rgba(245,240,232,0.64)',
      }}>
        Te decimos<br />qué necesitas.
      </motion.p>

      {/* Fine print */}
      <motion.p {...fade(1.8, 0.6)} style={{
        position: 'absolute', top: 1030, left: 80,
        fontFamily: 'var(--font-mono)', fontSize: 18, letterSpacing: 2,
        color: 'rgba(245,240,232,0.42)',
      }}>
        Sin costo · Sin compromiso · 22 de junio
      </motion.p>

      {/* Ghost "26" */}
      <motion.p {...fade(0.6, 1.4)} style={{
        position: 'absolute', bottom: 170, right: -40,
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 460, lineHeight: 1,
        color: 'rgba(245,240,232,0.055)',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        26
      </motion.p>

      {/* WA Button */}
      <motion.div
        {...up(2.4, 0.7)}
        style={{
          position: 'absolute', bottom: 290, left: 80, right: 80,
          height: 100, background: '#F5F0E8', borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
        }}
      >
        {/* WA icon */}
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          border: '2px solid #C4603A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{ width: 19, height: 19, background: '#C4603A', borderRadius: '50%' }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 22, letterSpacing: 4,
          textTransform: 'uppercase', color: '#C4603A',
        }}>
          HABLAR POR WHATSAPP →
        </p>
      </motion.div>

      {/* WA URL */}
      <motion.p {...fade(2.9, 0.5)} style={{
        position: 'absolute', bottom: 244, left: 80,
        fontFamily: 'var(--font-mono)', fontSize: 17,
        color: 'rgba(245,240,232,0.28)',
      }}>
        wa.me/51983747658
      </motion.p>

      {/* Bottom */}
      <motion.div {...fade(3.1, 0.5)} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'rgba(26,20,16,0.18)',
        borderTop: '1px solid rgba(245,240,232,0.1)',
        display: 'flex', alignItems: 'center',
        padding: '0 80px',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 17, letterSpacing: 2,
          color: 'rgba(245,240,232,0.32)',
        }}>
          Studio by Paradise · Italiano · Français · Arte y Diseño
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
interface StoryAdProps {
  onBeatChange?: (beat: Beat, index: number) => void;
  loop?: boolean;
}

export default function StoryAd({ onBeatChange, loop = true }: StoryAdProps) {
  const [beat, setBeat] = useState<Beat>('provoke');
  const [beatIndex, setBeatIndex] = useState(0);
  const [epoch, setEpoch] = useState(0); // triggers replay

  const advance = useCallback(() => {
    setBeat(prev => {
      const next = prev === 'provoke' ? 'reveal' : prev === 'reveal' ? 'cta' : 'provoke';
      const idx = next === 'provoke' ? 0 : next === 'reveal' ? 1 : 2;
      setBeatIndex(idx);
      onBeatChange?.(next, idx);
      return next;
    });
  }, [onBeatChange]);

  useEffect(() => {
    setBeat('provoke');
    setBeatIndex(0);
    onBeatChange?.('provoke', 0);

    const t1 = setTimeout(() => {
      setBeat('reveal'); setBeatIndex(1); onBeatChange?.('reveal', 1);
    }, BEAT_MS.provoke);

    const t2 = setTimeout(() => {
      setBeat('cta'); setBeatIndex(2); onBeatChange?.('cta', 2);
    }, BEAT_MS.provoke + BEAT_MS.reveal);

    let t3: ReturnType<typeof setTimeout> | undefined;
    if (loop) {
      t3 = setTimeout(() => {
        setEpoch(e => e + 1);
      }, BEAT_MS.provoke + BEAT_MS.reveal + BEAT_MS.cta);
    }

    return () => { clearTimeout(t1); clearTimeout(t2); if (t3) clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epoch, loop]);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait">
        {beat === 'provoke' && <ProvokeView key={`provoke-${epoch}`} />}
        {beat === 'reveal'  && <RevealView  key={`reveal-${epoch}`}  />}
        {beat === 'cta'     && <CTAView     key={`cta-${epoch}`}     />}
      </AnimatePresence>

      {/* Progress dots — safe zone top */}
      <div style={{
        position: 'absolute', top: 180, left: 80, right: 80,
        display: 'flex', gap: 6, zIndex: 20, pointerEvents: 'none',
      }}>
        {(['provoke', 'reveal', 'cta'] as Beat[]).map((b, i) => (
          <div key={b} style={{
            flex: 1, height: 2, borderRadius: 1,
            background: i <= beatIndex
              ? (beat === 'cta' ? '#F5F0E8' : '#C4603A')
              : 'rgba(107,104,96,0.35)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}
