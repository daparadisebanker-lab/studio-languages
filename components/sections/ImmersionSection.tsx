'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const scenes = [
  {
    label: 'El pitch',
    text: 'Mandas el email en italiano. La respuesta llega al día siguiente. El estudio que pensabas inalcanzable te abre la puerta.',
  },
  {
    label: 'La apertura',
    text: 'La primera vernissage que navegas sin perderte nada de lo que se dice. Conoces al director que te presenta tres meses después.',
  },
  {
    label: 'La entrevista',
    text: 'Tu primer proceso de selección en Europa — en el idioma. Sin el miedo de que la pregunta que no puedas responder sea la que decida.',
  },
]

const cities = [
  {
    flag: '🇮🇹',
    name: 'Milano',
    coords: "45°28'N 09°10'E",
    schools: ['NABA · Nuova Accademia di Belle Arti', 'Domus Academy', 'Politecnico di Milano'],
  },
  {
    flag: '🇫🇷',
    name: 'Paris',
    coords: "48°51'N 02°21'E",
    schools: ['ENSAD · École des Arts Décoratifs', 'ENSCI · Les Ateliers', 'École des Beaux-Arts'],
  },
  {
    flag: '🇨🇭',
    name: 'Lausanne',
    coords: "46°31'N 06°38'E",
    schools: ["ÉCAL · École Cantonale d'Art", 'HEAD Genève', 'ZHdK Zürich'],
  },
]

// Abstract institutional badge — geometric crest shape
function DecorativeCrest({
  top,
  bottom,
  left,
  right,
  shape,
}: {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  shape: 'circle' | 'square' | 'diamond' | 'rect'
}) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    opacity: 0.06,
    border: '1px solid currentColor',
    color: '#4E7262',
    pointerEvents: 'none',
    zIndex: 0,
    ...(top !== undefined ? { top } : {}),
    ...(bottom !== undefined ? { bottom } : {}),
    ...(left !== undefined ? { left } : {}),
    ...(right !== undefined ? { right } : {}),
  }
  if (shape === 'circle') return <div aria-hidden="true" style={{ ...baseStyle, width: 40, height: 40, borderRadius: '50%' }} />
  if (shape === 'square') return <div aria-hidden="true" style={{ ...baseStyle, width: 40, height: 40 }} />
  if (shape === 'diamond') return <div aria-hidden="true" style={{ ...baseStyle, width: 32, height: 32, transform: 'rotate(45deg)' }} />
  return <div aria-hidden="true" style={{ ...baseStyle, width: 56, height: 28 }} />
}

export default function ImmersionSection() {
  const isMobile = useIsMobile()

  return (
    <section
      id="inmersion"
      style={{
        background: '#2c2420',
        padding: isMobile ? '72px 0' : '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative abstract institutional crests */}
      <DecorativeCrest shape="circle" top={32} left={isMobile ? 16 : 48} />
      <DecorativeCrest shape="square" top={64} left={isMobile ? 48 : 100} />
      <DecorativeCrest shape="diamond" bottom={80} right={isMobile ? 16 : 80} />
      <DecorativeCrest shape="rect" bottom={40} right={isMobile ? 48 : 160} />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '55fr 45fr',
            gap: isMobile ? 48 : 80,
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#c4603a',
                marginBottom: 28,
                borderBottom: '1px solid rgba(26,20,16,0.08)',
                paddingBottom: 8,
                display: 'inline-block',
              }}
            >
              Para estudiantes en Europa
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px,4.5vw,64px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#f5f0e8',
                lineHeight: 1.1,
                marginBottom: 32,
              }}
            >
              Llegaste.
              <br />
              Ahora llega
              <br />
              de verdad.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                fontWeight: 300,
                color: 'rgba(245,240,232,0.65)',
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Tus clases son en inglés. Pero las conversaciones en los pasillos,
              los tutores que prefieren hablar en italiano, las aperturas, los
              estudios donde quieres hacer prácticas, los directores creativos
              con quienes quieres conectar — eso es en el idioma del país.
              <br /><br />
              El estudiante que habla el idioma no tiene mejor portafolio que tú.
              Tiene acceso a conversaciones que tú no estás teniendo.
            </p>
            <a
              href="#inscripcion"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#c4603a',
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              Ver el Immersion Track — y cómo empieza →
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {/* Stat card */}
            <div
              style={{
                background: 'rgba(245,240,232,0.04)',
                border: '1px solid rgba(245,240,232,0.1)',
                borderTop: '2px solid rgba(78,114,98,0.2)',
                padding: isMobile ? '28px 24px' : '36px 32px',
                marginBottom: 2,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(245,240,232,0.85)',
                  lineHeight: 1.4,
                  marginBottom: 16,
                }}
              >
                El mercado laboral europeo en diseño, moda, arquitectura y arte
                no opera en inglés.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#c4603a',
                }}
              >
                Opera en el idioma del país.
              </p>
            </div>

            {/* Cities */}
            {cities.map((city) => (
              <div
                key={city.name}
                style={{
                  background: 'rgba(245,240,232,0.03)',
                  border: '1px solid rgba(245,240,232,0.07)',
                  borderTop: '2px solid rgba(78,114,98,0.2)',
                  padding: '20px 32px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{city.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 20,
                        fontWeight: 300,
                        fontStyle: 'italic',
                        color: '#f5f0e8',
                        margin: 0,
                      }}
                    >
                      {city.name}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 8,
                        color: 'rgba(245,240,232,0.3)',
                        letterSpacing: '0.06em',
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {city.coords}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {city.schools.map(s => (
                      <span
                        key={s}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          letterSpacing: '0.08em',
                          color: 'rgba(245,240,232,0.4)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Destination micro-scenes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.15 }}
          style={{ marginTop: isMobile ? 56 : 72 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '0.24em',
              color: 'rgba(245,240,232,0.28)',
              marginBottom: 20,
            }}
          >
            Así se ve después
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {scenes.map((scene, i) => (
              <motion.div
                key={scene.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: i * 0.08 }}
                style={{
                  background: 'rgba(245,240,232,0.04)',
                  border: '1px solid rgba(245,240,232,0.07)',
                  borderTop: '2px solid rgba(78,114,98,0.2)',
                  padding: isMobile ? '24px 20px' : '28px 28px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    color: '#c4603a',
                    opacity: 0.8,
                    marginBottom: 14,
                  }}
                >
                  {scene.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(245,240,232,0.82)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {scene.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          style={{
            marginTop: isMobile ? 48 : 64,
            paddingTop: isMobile ? 32 : 40,
            borderTop: '1px solid rgba(245,240,232,0.07)',
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
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245,240,232,0.85)',
              margin: 0,
            }}
          >
            ¿Ya estás en Europa? Empieza cuando decides.
          </p>
          <a
            href={`https://wa.me/51983747658?text=${encodeURIComponent('Hola, estoy en Europa y me interesa el Immersion Track. Quisiera agendar la conversación inicial gratuita.')}`}
            target="_blank"
            rel="noopener noreferrer"
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
            Escríbenos por WhatsApp →
          </a>
        </motion.div>

      </div>

      {/* Distance line — flight-path motif, Latin America → Europe */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          height: '1px',
          background: 'repeating-linear-gradient(90deg, rgba(196,96,58,0.3) 0px, rgba(196,96,58,0.3) 6px, transparent 6px, transparent 14px)',
          width: isMobile ? '80%' : '60%',
          left: isMobile ? '10%' : '20%',
          bottom: isMobile ? 40 : 60,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
