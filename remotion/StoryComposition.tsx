import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
  delayRender,
  continueRender,
} from 'remotion';
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadDMMono } from '@remotion/google-fonts/DMMono';
import { useState, useEffect } from 'react';

/* ── Font loading ───────────────────────────────────────────────────────── */
const { waitUntilDone: waitCormorant } = loadCormorant('normal', {
  weights: ['300'],
  styles: ['normal', 'italic'],
  subsets: ['latin'],
});
const { waitUntilDone: waitDMMono } = loadDMMono('normal', {
  weights: ['400'],
  subsets: ['latin'],
});

const CORMORANT = 'Cormorant Garamond';
const DM_MONO   = 'DM Mono';

/* ── Animation helpers ──────────────────────────────────────────────────── */
const ease = Easing.out(Easing.cubic);

function anim(
  frame: number,
  startF: number,
  endF: number,
  from: number,
  to: number,
): number {
  return interpolate(frame, [startF, endF], [from, to], {
    extrapolateLeft:  'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
}

// fade opacity
function fade(frame: number, startF: number, durF = 18): { opacity: number } {
  return { opacity: anim(frame, startF, startF + durF, 0, 1) };
}

// slide up + fade
function up(frame: number, startF: number, durF = 22): { opacity: number; transform: string } {
  return {
    opacity:   anim(frame, startF, startF + durF, 0, 1),
    transform: `translateY(${anim(frame, startF, startF + durF, 28, 0)}px)`,
  };
}

// scaleX from left
function scaleX(frame: number, startF: number, durF = 17): { transform: string; transformOrigin: string } {
  return {
    transform:       `scaleX(${anim(frame, startF, startF + durF, 0, 1)})`,
    transformOrigin: 'left',
  };
}

// beat-level fade out (for transitions)
function beatOpacity(frame: number, totalFrames: number): number {
  const fadeIn  = anim(frame, 0, 12, 0, 1);
  const fadeOut = anim(frame, totalFrames - 14, totalFrames, 1, 0);
  return Math.min(fadeIn, fadeOut);
}

/* ── Noise texture ──────────────────────────────────────────────────────── */
const NOISE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

function Noise() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: NOISE_URL,
      opacity: 0.028, pointerEvents: 'none', zIndex: 10,
    }} />
  );
}

function Marks({ color = 'rgba(196,96,58,0.25)' }: { color?: string }) {
  const base: React.CSSProperties = { position: 'absolute', width: 22, height: 22 };
  return (
    <>
      <div style={{ ...base, top: 286, left: 80, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <div style={{ ...base, top: 286, right: 80, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BEAT 1 — PROVOKE  (Sequence frames 0-167, 168 total)
   Cream background. The uncomfortable truth.
   ══════════════════════════════════════════════════════════════════════════ */
function ProvokeView() {
  const f = useCurrentFrame();
  const TOTAL = 168;

  return (
    <AbsoluteFill style={{ background: '#F5F0E8', opacity: beatOpacity(f, TOTAL) }}>
      <Noise />
      <Marks />

      {/* Eyebrow */}
      <p style={{
        position: 'absolute', top: 326, left: 80,
        fontFamily: DM_MONO, fontSize: 21, letterSpacing: 5,
        textTransform: 'uppercase', color: '#C4603A', margin: 0,
        ...fade(f, 9, 15),
      }}>STUDIO BY PARADISE</p>

      {/* Line 1 — Full weight */}
      <p style={{
        position: 'absolute', top: 420, left: 80,
        fontFamily: CORMORANT, fontWeight: 300,
        fontSize: 88, lineHeight: 1.05, color: 'rgba(26,20,16,1)', margin: 0,
        ...fade(f, 13, 20),
      }}>
        Estudiaste en<br />la misma escuela.
      </p>

      {/* Line 2 — Ghosted */}
      <p style={{
        position: 'absolute', top: 638, left: 80,
        fontFamily: CORMORANT, fontWeight: 300,
        fontSize: 88, lineHeight: 1.05, margin: 0,
        opacity: anim(f, 33, 48, 0, 0.32),
        transform: `translateY(${anim(f, 33, 48, 24, 0)}px)`,
        color: 'rgba(26,20,16,1)',
      }}>
        Hiciste el mismo<br />portfolio.
      </p>

      {/* Line 3 — Ghosted */}
      <p style={{
        position: 'absolute', top: 852, left: 80,
        fontFamily: CORMORANT, fontWeight: 300,
        fontSize: 88, lineHeight: 1.05, margin: 0,
        opacity: anim(f, 50, 65, 0, 0.32),
        transform: `translateY(${anim(f, 50, 65, 24, 0)}px)`,
        color: 'rgba(26,20,16,1)',
      }}>
        Tuviste el mismo<br />tutor.
      </p>

      {/* Terra rule */}
      <div style={{
        position: 'absolute', top: 1070, left: 80,
        width: 108, height: 1, background: '#C4603A',
        ...scaleX(f, 71, 16),
      }} />

      {/* Contrast 1 — he got it */}
      <p style={{
        position: 'absolute', top: 1100, left: 80,
        fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
        fontSize: 80, lineHeight: 1.08, color: 'rgba(26,20,16,1)', margin: 0,
        ...up(f, 78, 26),
      }}>
        Él consiguió<br />las prácticas.
      </p>

      {/* Contrast 2 — pause beat */}
      <p style={{
        position: 'absolute', top: 1326, left: 80,
        fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
        fontSize: 80, margin: 0,
        opacity: anim(f, 107, 130, 0, 0.52),
        transform: `translateY(${anim(f, 107, 130, 24, 0)}px)`,
        color: 'rgba(26,20,16,1)',
      }}>
        Tú, no.
      </p>

      {/* Bottom strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 268,
        background: '#F5F0E8',
        borderTop: '1px solid rgba(196,96,58,0.18)',
        display: 'flex', alignItems: 'center',
        padding: '0 80px', gap: 20,
        ...fade(f, 129, 15),
      }}>
        <div style={{ width: 32, height: 1, background: '#C4603A', flexShrink: 0 }} />
        <p style={{
          fontFamily: DM_MONO, fontSize: 20, letterSpacing: 3,
          textTransform: 'uppercase', color: '#C4603A', margin: 0,
        }}>La diferencia no era el talento →</p>
      </div>

      {/* Right measurement line */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(196,96,58,0.1), transparent)',
      }} />
    </AbsoluteFill>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BEAT 2 — REVEAL  (Sequence frames 144-311, 168 total)
   Ink background. Full product information.
   ══════════════════════════════════════════════════════════════════════════ */
function RevealView() {
  const f = useCurrentFrame();
  const TOTAL = 168;

  return (
    <AbsoluteFill style={{ background: '#1A1410', opacity: beatOpacity(f, TOTAL) }}>
      <Noise />

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(107,104,96,0.5) 30%, rgba(107,104,96,0.5) 70%, transparent)',
      }} />

      {/* Eyebrow */}
      <p style={{
        position: 'absolute', top: 318, left: 80,
        fontFamily: DM_MONO, fontSize: 19, letterSpacing: 4.5,
        textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)', margin: 0,
        ...fade(f, 8, 12),
      }}>STUDIO BY PARADISE · 2026</p>

      {/* Main: languages */}
      <p style={{
        position: 'absolute', top: 405, left: 80,
        fontFamily: CORMORANT, fontWeight: 300,
        fontSize: 100, lineHeight: 1.04, color: '#F5F0E8', margin: 0,
        ...up(f, 14, 24),
      }}>
        Italiano<br />y français.
      </p>

      {/* Discipline */}
      <p style={{
        position: 'absolute', top: 660, left: 80,
        fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
        fontSize: 44, lineHeight: 1.2, color: 'rgba(245,240,232,0.5)', margin: 0,
        ...up(f, 27, 21),
      }}>
        para arte, diseño y arquitectura.
      </p>

      {/* Terra rule */}
      <div style={{
        position: 'absolute', top: 790, left: 80,
        width: 80, height: 1, background: '#C4603A',
        ...scaleX(f, 39, 17),
      }} />

      {/* School badges */}
      <div style={{
        position: 'absolute', top: 826, left: 80,
        display: 'flex', alignItems: 'center',
        ...fade(f, 44, 18),
      }}>
        {['NABA', 'ÉCAL', 'HEAD', 'ENSAD'].map((s, i) => (
          <span key={s} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: DM_MONO, fontSize: 19, letterSpacing: 3.5,
              textTransform: 'uppercase', color: 'rgba(245,240,232,0.22)',
            }}>{s}</span>
            {i < 3 && (
              <span style={{ color: '#C4603A', fontSize: 10, opacity: 0.5, margin: '0 18px' }}>·</span>
            )}
          </span>
        ))}
      </div>

      {/* Two-track split */}
      <div style={{
        position: 'absolute', top: 924, left: 80, right: 80,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid rgba(245,240,232,0.07)',
        paddingTop: 28,
        ...up(f, 57, 21),
      }}>
        <div>
          <p style={{
            fontFamily: DM_MONO, fontSize: 16, letterSpacing: 3,
            textTransform: 'uppercase', color: '#C4603A', marginBottom: 10, margin: '0 0 10px 0',
          }}>Si vas a Europa</p>
          <p style={{
            fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
            fontSize: 30, lineHeight: 1.3, color: 'rgba(245,240,232,0.7)', margin: 0,
          }}>
            Llega con<br />el idioma.
          </p>
        </div>
        <div style={{ borderLeft: '1px solid rgba(245,240,232,0.07)', paddingLeft: 40 }}>
          <p style={{
            fontFamily: DM_MONO, fontSize: 16, letterSpacing: 3,
            textTransform: 'uppercase', color: '#C4603A', margin: '0 0 10px 0',
          }}>Si ya estás</p>
          <p style={{
            fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
            fontSize: 30, lineHeight: 1.3, color: 'rgba(245,240,232,0.7)', margin: 0,
          }}>
            Pertenece<br />de verdad.
          </p>
        </div>
      </div>

      {/* Price · Duration · Date row */}
      <div style={{
        position: 'absolute', top: 1200, left: 80, right: 80,
        borderTop: '1px solid rgba(245,240,232,0.06)',
        paddingTop: 32,
        display: 'flex', alignItems: 'center', gap: 40,
        ...up(f, 75, 21),
      }}>
        {[
          { label: 'DESDE',    value: '$90 / mes',   italic: true  },
          { label: 'DURACIÓN', value: '8 semanas',   italic: false },
          { label: 'COHORTE',  value: '22 de junio', italic: false, terra: true },
        ].map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {i > 0 && <div style={{ width: 1, height: 60, background: 'rgba(245,240,232,0.1)' }} />}
            <div>
              <p style={{
                fontFamily: DM_MONO, fontSize: 15, letterSpacing: 2.5,
                textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)',
                margin: '0 0 6px 0',
              }}>{item.label}</p>
              <p style={{
                fontFamily: CORMORANT, fontWeight: 300,
                fontStyle: item.italic ? 'italic' : 'normal',
                fontSize: 36,
                color: item.terra ? '#C4603A' : '#F5F0E8',
                margin: 0,
              }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ghost city */}
      <p style={{
        position: 'absolute', bottom: 240, right: -50,
        fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
        fontSize: 260, lineHeight: 1,
        color: 'rgba(245,240,232,0.04)',
        whiteSpace: 'nowrap', userSelect: 'none', margin: 0,
        ...fade(f, 24, 37),
      }}>Milano</p>

      {/* Bottom link */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 248,
        background: 'rgba(26,20,16,0.9)',
        borderTop: '1px solid rgba(245,240,232,0.06)',
        display: 'flex', alignItems: 'center',
        padding: '0 80px', gap: 20,
        ...fade(f, 96, 15),
      }}>
        <div style={{ width: 32, height: 1, background: '#C4603A', flexShrink: 0 }} />
        <p style={{
          fontFamily: DM_MONO, fontSize: 20, letterSpacing: 3,
          textTransform: 'uppercase', color: 'rgba(196,96,58,0.85)', margin: 0,
        }}>studiobyparadise.com →</p>
      </div>
    </AbsoluteFill>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BEAT 3 — CTA  (Sequence frames 288-467, 180 total)
   Terra background. WhatsApp conversion.
   ══════════════════════════════════════════════════════════════════════════ */
function CTAView() {
  const f = useCurrentFrame();
  const TOTAL = 180;

  // WA button subtle pulse (scale 1 → 1.015 → 1, cycle every 60 frames after f=100)
  const pulseF = Math.max(0, f - 100);
  const pulseT = (pulseF % 60) / 60;
  const pulseCurve = Math.sin(pulseT * Math.PI);
  const btnScale = f > 100 ? 1 + pulseCurve * 0.012 : 1;

  return (
    <AbsoluteFill style={{ background: '#C4603A', overflow: 'hidden', opacity: beatOpacity(f, TOTAL) }}>
      <Noise />
      <Marks color="rgba(245,240,232,0.2)" />

      {/* Depth layer — darker sweep from bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: `${anim(f, 0, 17, 0, 40)}%`,
        background: 'rgba(26,20,16,0.14)',
      }} />

      {/* Eyebrow */}
      <p style={{
        position: 'absolute', top: 340, left: 80,
        fontFamily: DM_MONO, fontSize: 19, letterSpacing: 4,
        textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', margin: 0,
        ...fade(f, 9, 12),
      }}>CONVERSACIÓN INICIAL GRATUITA</p>

      {/* Rule */}
      <div style={{
        position: 'absolute', top: 395, left: 80, right: 80, height: 1,
        background: 'rgba(245,240,232,0.15)',
        ...scaleX(f, 15, 17),
      }} />

      {/* Headline */}
      <p style={{
        position: 'absolute', top: 432, left: 80,
        fontFamily: CORMORANT, fontWeight: 300,
        fontSize: 100, lineHeight: 1.04, color: '#F5F0E8', margin: 0,
        ...up(f, 17, 26),
      }}>
        Nos dices<br />a dónde vas.
      </p>

      {/* Subline */}
      <p style={{
        position: 'absolute', top: 736, left: 80,
        fontFamily: CORMORANT, fontWeight: 300, fontStyle: 'italic',
        fontSize: 80, lineHeight: 1.1, margin: 0,
        opacity: anim(f, 32, 56, 0, 0.64),
        transform: `translateY(${anim(f, 32, 56, 28, 0)}px)`,
        color: '#F5F0E8',
      }}>
        Te decimos<br />qué necesitas.
      </p>

      {/* Fine print */}
      <p style={{
        position: 'absolute', top: 1030, left: 80,
        fontFamily: DM_MONO, fontSize: 18, letterSpacing: 2,
        color: 'rgba(245,240,232,0.42)', margin: 0,
        ...fade(f, 54, 18),
      }}>
        Sin costo · Sin compromiso · 22 de junio
      </p>

      {/* Ghost "26" */}
      <p style={{
        position: 'absolute', bottom: 170, right: -40,
        fontFamily: CORMORANT, fontWeight: 300,
        fontSize: 460, lineHeight: 1,
        color: 'rgba(245,240,232,0.055)',
        whiteSpace: 'nowrap', userSelect: 'none', margin: 0,
        opacity: anim(f, 18, 60, 0, 1),
      }}>26</p>

      {/* WA Button */}
      <div style={{
        position: 'absolute', bottom: 290, left: 80, right: 80,
        height: 100, background: '#F5F0E8', borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
        transform: `translateY(${anim(f, 72, 93, 40, 0)}px) scale(${btnScale})`,
        opacity: anim(f, 72, 93, 0, 1),
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          border: '2px solid #C4603A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{ width: 19, height: 19, background: '#C4603A', borderRadius: '50%' }} />
        </div>
        <p style={{
          fontFamily: DM_MONO, fontSize: 22, letterSpacing: 4,
          textTransform: 'uppercase', color: '#C4603A', margin: 0,
        }}>HABLAR POR WHATSAPP →</p>
      </div>

      {/* WA URL */}
      <p style={{
        position: 'absolute', bottom: 244, left: 80,
        fontFamily: DM_MONO, fontSize: 17,
        color: 'rgba(245,240,232,0.28)', margin: 0,
        ...fade(f, 87, 15),
      }}>wa.me/51983747658</p>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'rgba(26,20,16,0.18)',
        borderTop: '1px solid rgba(245,240,232,0.1)',
        display: 'flex', alignItems: 'center',
        padding: '0 80px',
        ...fade(f, 93, 15),
      }}>
        <p style={{
          fontFamily: DM_MONO, fontSize: 17, letterSpacing: 2,
          color: 'rgba(245,240,232,0.32)', margin: 0,
        }}>
          Studio by Paradise · Italiano · Français · Arte y Diseño
        </p>
      </div>
    </AbsoluteFill>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROGRESS BAR  (always on top, shows beat position)
   ══════════════════════════════════════════════════════════════════════════ */
function ProgressBar() {
  const f = useCurrentFrame();
  // Beat index from global frame
  const beatIndex = f < 156 ? 0 : f < 312 ? 1 : 2;

  return (
    <div style={{
      position: 'absolute', top: 180, left: 80, right: 80,
      display: 'flex', gap: 6, zIndex: 20, pointerEvents: 'none',
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          flex: 1, height: 2, borderRadius: 1,
          background: i <= beatIndex
            ? (beatIndex === 2 ? '#F5F0E8' : '#C4603A')
            : 'rgba(107,104,96,0.35)',
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ROOT COMPOSITION
   Sequences overlap by 12 frames on each side for cross-fades.
   Timeline: Beat1(0-167) · Beat2(144-311) · Beat3(288-467)
   ══════════════════════════════════════════════════════════════════════════ */
export const StoryComposition = () => {
  const [handle] = useState(() => delayRender('Loading fonts'));

  useEffect(() => {
    Promise.all([waitCormorant(), waitDMMono()])
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle)); // don't block render if fonts fail
  }, [handle]);

  return (
    <AbsoluteFill>
      <Sequence from={0}   durationInFrames={168} name="Provoke">
        <ProvokeView />
      </Sequence>
      <Sequence from={144} durationInFrames={168} name="Reveal">
        <RevealView />
      </Sequence>
      <Sequence from={288} durationInFrames={180} name="CTA">
        <CTAView />
      </Sequence>
      <ProgressBar />
    </AbsoluteFill>
  );
};
