'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';

/* ── Keyframe styles injected once ───────────────────────── */
const GLOBAL_STYLES = `
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.5; transform: scaleY(1); }
    50%       { opacity: 1;   transform: scaleY(1.12); }
  }
  @keyframes cityTicker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes constellationDrift {
    0%, 100% { transform: translate(0px, 0px); }
    33%       { transform: translate(-8px, 6px); }
    66%       { transform: translate(6px, -4px); }
  }
  @keyframes constellationDriftB {
    0%, 100% { transform: translate(0px, 0px); }
    33%       { transform: translate(10px, -8px); }
    66%       { transform: translate(-6px, 5px); }
  }
  @keyframes constellationDriftC {
    0%, 100% { transform: translate(0px, 0px); }
    33%       { transform: translate(-5px, -10px); }
    66%       { transform: translate(8px, 7px); }
  }
  @keyframes constellationDriftD {
    0%, 100% { transform: translate(0px, 0px); }
    33%       { transform: translate(7px, 4px); }
    66%       { transform: translate(-9px, -6px); }
  }
`;

const CITIES = [
  'Lima', 'Bogotá', 'Santiago', 'Buenos Aires', 'Ciudad de México',
  'Medellín', 'São Paulo', 'Montevideo', 'Quito', 'Cali',
  'Guadalajara', 'Córdoba', 'Santa Cruz', 'Rosario', 'Arequipa',
  'Guayaquil', 'Monterrey', 'Cartagena',
];

/* ── Destination cities for right panel ─────────────────── */
const DESTINATIONS = [
  { name: 'Milano',   size: 148, ambientOpacity: 0.09, drift: 'constellationDrift',  top: '10%',  left: '-5%'  },
  { name: 'Parigi',   size: 108, ambientOpacity: 0.07, drift: 'constellationDriftB', top: '34%',  left: '22%'  },
  { name: 'Lausanne', size: 88,  ambientOpacity: 0.06, drift: 'constellationDriftC', top: '58%',  left: '-8%'  },
  { name: 'Genève',   size: 120, ambientOpacity: 0.08, drift: 'constellationDriftD', top: '72%',  left: '18%'  },
];

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── City Ticker Strip ───────────────────────────────────── */
function CityTicker() {
  const doubled = [...CITIES, ...CITIES];
  return (
    <div
      style={{
        background: '#1a1410',
        borderTop: '1px solid rgba(245,240,232,0.06)',
        display: 'flex',
        alignItems: 'center',
        height: 52,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Static label */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '0 24px 0 32px',
          borderRight: '1px solid rgba(245,240,232,0.1)',
          height: '100%',
          background: '#1a1410',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.35)',
          }}
        >
          Para creativos ambiciosos en
        </span>
      </div>

      {/* Scrolling cities */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left fade mask */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 48,
            background: 'linear-gradient(to right, #1a1410, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Right fade mask */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 48,
            background: 'linear-gradient(to left, #1a1410, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            animation: 'cityTicker 55s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {doubled.map((city, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.65)',
                  padding: '0 28px',
                }}
              >
                {city}
              </span>
              <span
                style={{
                  color: '#c4603a',
                  fontSize: 8,
                  opacity: 0.6,
                }}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Fade-up variant ──────────────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/* ── Flag stripes ────────────────────────────────────────── */
const STRIPE_COLORS: Record<string, [string, string, string]> = {
  it: ['#009246', 'rgba(245,240,232,0.55)', '#CE2B37'],
  fr: ['#002395', 'rgba(245,240,232,0.55)', '#ED2939'],
}

function FlagStripes({ lang, width = 22, height = 3, gap = 3 }: { lang: 'it' | 'fr'; width?: number; height?: number; gap?: number }) {
  const [c1, c2, c3] = STRIPE_COLORS[lang]
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap, flexShrink: 0 }}>
      {[c1, c2, c3].map((c, i) => (
        <span key={i} style={{ width, height, background: c, display: 'block', borderRadius: 1 }} />
      ))}
    </span>
  )
}

/* ── Language Card ───────────────────────────────────────── */
interface CardProps {
  lang: 'it' | 'fr';
  name: string;
  targets: string;
  schools: string;
  delay: number;
}

function LanguageCard({ lang, name, targets, schools, delay }: CardProps) {
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
      {/* Flag stripes */}
      <div style={{ marginTop: 4, flexShrink: 0 }}>
        <FlagStripes lang={lang} />
      </div>

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
function PrimaryBtn({ href, children, isMobile, target, rel }: { href: string; children: React.ReactNode; isMobile?: boolean; target?: string; rel?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: hovered ? '#f5f0e8' : '#c4603a',
        background: hovered ? '#c4603a' : 'transparent',
        border: '2px solid #c4603a',
        padding: isMobile ? '14px 24px' : '14px 32px',
        minHeight: isMobile ? '52px' : 'auto',
        display: isMobile ? 'flex' : 'inline-block',
        alignItems: isMobile ? 'center' : undefined,
        justifyContent: isMobile ? 'center' : undefined,
        width: isMobile ? '100%' : 'auto',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </a>
  );
}

/* ── Secondary Button ────────────────────────────────────── */
function SecondaryBtn({ href, children, isMobile }: { href: string; children: React.ReactNode; isMobile?: boolean }) {
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
        justifyContent: isMobile ? 'flex-start' : undefined,
        width: isMobile ? '100%' : 'auto',
        gap: 8,
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </a>
  );
}

/* ── City Constellation (Right Panel Background) ─────────── */
function CityConstellation({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Ambient ghost layer — always visible, ultra-low opacity */}
      {DESTINATIONS.map((city, i) => (
        <span
          key={`ambient-${i}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: city.size,
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(245,240,232,1)',
            opacity: city.ambientOpacity,
            position: 'absolute',
            top: city.top,
            left: city.left,
            whiteSpace: 'nowrap',
            lineHeight: 1,
            animation: `${city.drift} ${28 + i * 4}s ease-in-out infinite`,
            animationDelay: `${-i * 5}s`,
            userSelect: 'none',
          }}
        >
          {city.name}
        </span>
      ))}

      {/* Featured "live" layer — one city at full presence, cycling every 4s */}
      <AnimatePresence mode="wait">
        {DESTINATIONS.map((city, i) =>
          i === activeIndex ? (
            <motion.span
              key={`featured-${city.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.52 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: easeOut }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: city.size * 1.05,
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#f5f0e8',
                position: 'absolute',
                top: city.top,
                left: city.left,
                whiteSpace: 'nowrap',
                lineHeight: 1,
                userSelect: 'none',
                /* very subtle text shadow lifts the featured word off the plane */
                textShadow: '0 0 120px rgba(196,96,58,0.18)',
              }}
            >
              {city.name}
            </motion.span>
          ) : null
        )}
      </AnimatePresence>

      {/* Coordinate dot + label for the active city */}
      <AnimatePresence mode="wait">
        {DESTINATIONS.map((city, i) =>
          i === activeIndex ? (
            <motion.div
              key={`coord-${city.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeOut }}
              style={{
                position: 'absolute',
                bottom: '18%',
                right: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 6,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,96,58,0.7)',
                }}
              >
                {city.name}
              </span>
              <div
                style={{
                  width: 48,
                  height: 1,
                  background: 'linear-gradient(to left, rgba(196,96,58,0.5), transparent)',
                }}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Static ruled lines — architectural depth */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 0,
          pointerEvents: 'none',
        }}
      >
        {[0.03, 0.025, 0.04, 0.03, 0.02].map((opacity, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              height: 1,
              background: `rgba(245,240,232,${opacity})`,
              marginBottom: [28, 20, 14, 9, 5][i],
            }}
          />
        ))}
      </div>

      {/* Top-right corner mark */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          right: 32,
          width: 24,
          height: 24,
          borderTop: '1px solid rgba(245,240,232,0.12)',
          borderRight: '1px solid rgba(245,240,232,0.12)',
        }}
      />
      {/* Bottom-left corner mark */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          width: 24,
          height: 24,
          borderBottom: '1px solid rgba(245,240,232,0.12)',
          borderLeft: '1px solid rgba(245,240,232,0.12)',
        }}
      />
    </div>
  );
}

/* ── Hero Section ────────────────────────────────────────── */
export default function Hero() {
  const isMobile = useIsMobile();
  const [activeCity, setActiveCity] = useState(0);

  /* Cycle through destination cities every 4 seconds */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveCity(prev => (prev + 1) % DESTINATIONS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

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
              Cohorte Inaugural · Junio 2026
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.35)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 6vw, 84px)',
              fontWeight: 300,
              lineHeight: 0.97,
              letterSpacing: '-0.02em',
              color: '#1a1410',
              marginBottom: 32,
            }}
          >
            Tus clases
            <br />
            son en inglés.
            <br />
            <em style={{ color: '#c4603a', fontStyle: 'italic' }}>La carrera no.</em>
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
              marginBottom: 32,
            }}
          >
            Italiano y francés para estudiantes de arte y diseño en América Latina
            — calibrados a las escuelas europeas a las que apuntas y al ecosistema
            profesional donde vivirás.
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote
            {...fadeUp(0.58)}
            style={{
              borderLeft: '2px solid #c4603a',
              paddingLeft: 24,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#1a1410',
              opacity: 0.75,
              margin: '0 0 32px 0',
              maxWidth: 480,
            }}
          >
            <p style={{ margin: 0 }}>
              La pregunta no es si puedes entrar sin el idioma.
              La pregunta es qué tan adentro llegas con él.
            </p>
            <footer
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#c4603a',
                fontStyle: 'normal',
                marginTop: 16,
              }}
            >
              — Studio by Paradise
            </footer>
          </motion.blockquote>

          {/* Price anchor — mobile only */}
          <motion.div
            {...fadeUp(0.62)}
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(26,20,16,0.4)',
            }}>
              Desde
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(26,20,16,0.75)',
            }}>
              $90 / mes
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              color: 'rgba(26,20,16,0.3)',
            }}>
              · sin compromiso
            </span>
          </motion.div>

          {/* Actions */}
          <motion.div
            {...fadeUp(0.65)}
            style={{
              display: 'flex',
              gap: 24,
              alignItems: isMobile ? 'stretch' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
            }}
          >
            <PrimaryBtn
              href={isMobile
                ? 'https://wa.me/51983747658?text=Hola%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20Studio%20by%20Paradise'
                : '#inscripcion'
              }
              target={isMobile ? '_blank' : undefined}
              rel={isMobile ? 'noopener noreferrer' : undefined}
              isMobile={isMobile}
            >
              Conversación inicial gratuita
            </PrimaryBtn>
            <SecondaryBtn href="#programa" isMobile={isMobile}>Ver el programa →</SecondaryBtn>
          </motion.div>

          {/* Social proof micro-signal — mobile only */}
          <motion.div
            {...fadeUp(0.75)}
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              gap: 12,
              marginTop: 24,
              opacity: 0.5,
            }}
          >
            <div style={{ display: 'flex', gap: -4 }}>
              {(['NABA', 'ÉCAL', 'HEAD', 'ENSAD'] as const).map((school, i) => (
                <span key={school} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 8,
                  letterSpacing: '0.1em',
                  color: '#1a1410',
                  background: 'rgba(26,20,16,0.06)',
                  border: '1px solid rgba(26,20,16,0.12)',
                  padding: '4px 7px',
                  marginLeft: i > 0 ? -1 : 0,
                }}>
                  {school}
                </span>
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              letterSpacing: '0.1em',
              color: 'rgba(26,20,16,0.4)',
              whiteSpace: 'nowrap',
            }}>
              y más
            </span>
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

          {/* Vertical measurement line — far right edge of left panel */}
          {!isMobile && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 1,
                height: '50%',
                background: 'linear-gradient(to bottom, transparent, rgba(196,96,58,0.15), transparent)',
                pointerEvents: 'none',
              }}
            />
          )}
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
          {/* City Constellation background layer */}
          <CityConstellation activeIndex={activeCity} />

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
              lang="it"
              name="Italiano"
              targets="Arte · Diseño · Arquitectura"
              schools="NABA · Domus Academy · IED · Politecnico di Milano"
              delay={0.7}
            />
            <LanguageCard
              lang="fr"
              name="Français"
              targets="Arte · Moda · Fotografía"
              schools="ÉCAL · HEAD Genève · École des Beaux-Arts · ENSAD"
              delay={0.9}
            />
          </div>
        </div>
      </section>

      {/* ── City Ticker ── */}
      <CityTicker />
    </>
  );
}
