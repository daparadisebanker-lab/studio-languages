'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface School {
  name: string;
}

interface TrackCardProps {
  flag: string;
  langName: string;
  tagline: string;
  desc: string;
  schools: School[];
  animDelay?: number;
  isMobile: boolean;
}

function TrackCard({
  flag,
  langName,
  tagline,
  desc,
  schools,
  animDelay = 0,
  isMobile,
}: TrackCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.0, ease: easeOut, delay: animDelay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered
          ? 'rgba(245,240,232,0.05)'
          : 'rgba(245,240,232,0.03)',
        border: '1px solid rgba(245,240,232,0.08)',
        padding: isMobile ? '36px 24px' : '52px 48px',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: '#c4603a',
          transformOrigin: 'top',
        }}
      />

      {/* Flag */}
      <span
        style={{
          fontSize: '48px',
          marginBottom: '20px',
          display: 'block',
          lineHeight: 1,
        }}
      >
        {flag}
      </span>

      {/* Language name */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? '40px' : '52px',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(245,240,232,0.9)',
          lineHeight: 1,
          margin: '0 0 8px 0',
        }}
      >
        {langName}
      </p>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#c4603a',
          margin: '0 0 28px 0',
        }}
      >
        {tagline}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(245,240,232,0.55)',
          margin: '0 0 28px 0',
        }}
      >
        {desc}
      </p>

      {/* Schools */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {schools.map((school) => (
          <div
            key={school.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                color: '#c4603a',
                fontSize: '12px',
                flexShrink: 0,
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: 'rgba(245,240,232,0.4)',
                textTransform: 'uppercase',
              }}
            >
              {school.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Languages() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        background: '#2c2420',
        padding: isMobile ? '72px 0' : '120px 0',
        color: '#f5f0e8',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'rgba(245,240,232,0.4)',
            }}
          >
            Idiomas disponibles
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(245,240,232,0.2)',
              flexShrink: 0,
            }}
          />
        </motion.div>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: easeOut }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 4.5vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#f5f0e8',
            margin: '0 0 28px 0',
          }}
        >
          Dos idiomas.
          <br />
          Dos mundos creativos.
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: easeOut, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(245,240,232,0.65)',
            maxWidth: '600px',
            margin: 0,
          }}
        >
          Cada programa es una puerta específica a un ecosistema europeo de arte
          y diseño. Las instituciones son reales. Los destinos son precisos.
        </motion.p>

        {/* Track cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '1px' : '2px',
            marginTop: '64px',
          }}
        >
          <TrackCard
            flag="🇮🇹"
            langName="Italiano"
            tagline="Arte · Diseño · Arquitectura · Moda"
            desc="Italia concentra algunas de las instituciones de diseño más influyentes del mundo. Milán es la capital global del diseño industrial, la moda y la comunicación visual. El italiano que enseñamos es el idioma de Domus, de la crítica de estudio en Politecnico, de una entrevista de admisión en NABA. No el italiano del turismo."
            schools={[
              { name: 'NABA — Nuova Accademia di Belle Arti' },
              { name: 'Domus Academy, Milano' },
              { name: 'IED — Istituto Europeo di Design' },
              { name: 'Politecnico di Milano, Scuola del Design' },
              { name: 'Accademia di Belle Arti di Bologna' },
            ]}
            animDelay={0}
            isMobile={isMobile}
          />
          <TrackCard
            flag="🇫🇷"
            langName="Français"
            tagline="Arte · Fotografía · Moda · Diseño"
            desc="Francia y Suiza francófona albergan programas de arte y diseño de rigor y prestige excepcionales — desde ÉCAL en Lausana hasta las grandes écoles de París bajo el Ministerio de Cultura. El francés que enseñamos abre puertas que el inglés no puede abrir en estos ecosistemas."
            schools={[
              { name: "ÉCAL, École cantonale d'art de Lausanne" },
              { name: "HEAD — Haute École d'art de Genève" },
              { name: 'ENSAD, École des Arts Décoratifs Paris' },
              { name: 'Institut Français de la Mode' },
              { name: 'École Nationale Supérieure des Beaux-Arts' },
            ]}
            animDelay={0.12}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
}
