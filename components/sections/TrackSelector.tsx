'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

function TrackCard({
  trackLabel,
  headline,
  body,
  cta,
  href,
  variant,
  delay,
  isMobile,
  priceHint,
}: {
  trackLabel: string
  headline: string
  body: string
  cta: string
  href: string
  variant: 'light' | 'dark'
  delay: number
  isMobile: boolean
  priceHint: string
}) {
  const [hovered, setHovered] = useState(false)
  const isLight = variant === 'light'

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: easeOut, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: isLight ? '#f5f0e8' : '#1a1410',
        padding: isMobile ? '40px 24px' : '88px 72px',
        flex: 1,
        width: isMobile ? '100%' : 'auto',
        minHeight: isMobile ? 280 : 'auto',
        borderRight: isLight && !isMobile ? '1px solid rgba(26,20,16,0.08)' : 'none',
        borderTop: isMobile && !isLight ? '1px solid rgba(245,240,232,0.08)' : 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered && !isMobile ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered && !isMobile
          ? '0 12px 40px rgba(26,20,16,0.12), 0 2px 8px rgba(26,20,16,0.06)'
          : '0 2px 8px rgba(26,20,16,0.06)',
        transition: 'background 0.4s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Hover fill — terra wash */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: isLight
            ? 'rgba(196,96,58,0.04)'
            : 'rgba(196,96,58,0.07)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Track label */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: '#c4603a',
          marginBottom: 32,
          position: 'relative',
        }}
      >
        {trackLabel}
      </p>

      {/* Headline */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 'clamp(32px,8vw,48px)' : 'clamp(36px,3.2vw,56px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: isLight ? '#1a1410' : '#f5f0e8',
          lineHeight: 1.1,
          marginBottom: 28,
          maxWidth: 500,
          position: 'relative',
        }}
      >
        {headline}
      </h2>

      {/* Terra rule — expands on hover */}
      <div
        aria-hidden="true"
        style={{
          width: 48,
          height: 1,
          background: '#c4603a',
          marginBottom: 28,
          transformOrigin: 'left',
          transform: hovered ? 'scaleX(2)' : 'scaleX(1)',
          transition: 'transform 0.45s ease',
          position: 'relative',
        }}
      />

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 300,
          lineHeight: 1.8,
          color: isLight ? 'rgba(26,20,16,0.58)' : 'rgba(245,240,232,0.5)',
          maxWidth: 440,
          marginBottom: 'auto',
          paddingBottom: 40,
          position: 'relative',
        }}
      >
        {body}
      </p>

      {/* Price hint — mobile only */}
      <span
        style={{
          display: isMobile ? 'block' : 'none',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 16,
          color: 'rgba(26,20,16,0.5)',
          marginTop: 12,
          position: 'relative',
        }}
      >
        {priceHint}
      </span>

      {/* CTA link */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: '#c4603a',
          borderBottom: `1px solid ${hovered ? '#c4603a' : 'transparent'}`,
          paddingBottom: 3,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          transition: 'border-color 0.3s ease',
          position: 'relative',
        }}
      >
        <span>{cta.replace(/\s*→\s*$/, '')}</span>
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          →
        </span>
      </span>
    </motion.a>
  )
}

export default function TrackSelector() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        borderTop: '1px solid rgba(26,20,16,0.08)',
      }}
    >
      <div
        style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: '1fr 1fr',
          flexDirection: 'column',
        }}
      >
        <TrackCard
          trackLabel="Foundation · Advanced Studio"
          headline="Voy a estudiar arte o diseño en Europa."
          body="Tu programa es en inglés. Pero el tutor que cambia al italiano, las prácticas en el estudio que quieres, la ciudad donde construirás tu carrera — eso es en otro idioma. Llegamos antes que el problema."
          cta="Ver el programa de preparación →"
          href="#foundation"
          variant="light"
          delay={0.1}
          isMobile={isMobile}
          priceHint="Desde $90 / mes"
        />
        <TrackCard
          trackLabel="Immersion Track"
          headline="Estás adentro. Ahora entra de verdad."
          body="Llevas semanas ahí. Y ya sabes qué conversaciones no estás teniendo — con el tutor, en la apertura, en el estudio donde quieres hacer prácticas. El idioma tiene solución."
          cta="Ver el Immersion Track →"
          href="#inmersion"
          variant="dark"
          delay={0.2}
          isMobile={isMobile}
          priceHint="Desde $120 / mes"
        />
      </div>

      {/* Jump to pricing — mobile only */}
      <div
        style={{
          display: isMobile ? 'flex' : 'none',
          justifyContent: 'center',
          paddingTop: 24,
        }}
      >
        <a
          href="#precios"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(26,20,16,0.4)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(26,20,16,0.15)',
            paddingBottom: 2,
          }}
        >
          Ver precios →
        </a>
      </div>
    </section>
  )
}
