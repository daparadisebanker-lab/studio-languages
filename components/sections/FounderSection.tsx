'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FounderSection() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        background: '#E9DFCA',
        paddingTop: isMobile ? '64px' : '96px',
        paddingBottom: isMobile ? '64px' : '96px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '48px' : '80px',
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: easeOut, delay: 0 }}
          style={isMobile ? {} : { position: 'sticky', top: '100px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#c4603a',
            }}
          >
            Quiénes lo construimos
          </p>

          {/* Abstract portrait frame */}
          <div
            style={{
              position: 'relative',
              width: isMobile ? 140 : 180,
              height: isMobile ? 180 : 220,
              marginTop: '20px',
            }}
          >
            {/* Outer rectangle */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(196,96,58,0.25)',
                background: 'transparent',
              }}
            />
            {/* Middle rectangle */}
            <div
              style={{
                position: 'absolute',
                inset: '8px 12px',
                border: '1px solid rgba(196,96,58,0.15)',
                background: 'rgba(196,96,58,0.04)',
              }}
            />
            {/* Inner rectangle */}
            <div
              style={{
                position: 'absolute',
                inset: '16px 24px',
                background: 'rgba(196,96,58,0.08)',
              }}
            />
            {/* Vertical terra line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '20px',
                bottom: '20px',
                width: '1px',
                background: 'rgba(196,96,58,0.2)',
              }}
            />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(26,20,16,0.35)',
              marginTop: '10px',
            }}
          >
            Retrato próximamente
          </p>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '26px',
              fontWeight: 300,
              color: '#1a1410',
              marginTop: '16px',
            }}
          >
            El equipo de Studio
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(26,20,16,0.6)',
              lineHeight: 1.65,
              marginTop: '8px',
              maxWidth: '280px',
            }}
          >
            Diseñadores y educadores formados en las instituciones europeas de
            arte y diseño que enseñamos. Construimos el programa que
            necesitamos cuando éramos estudiantes.
          </p>

          <a
            href="#inscripcion"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              borderBottom: '1px solid rgba(196,96,58,0.4)',
              paddingBottom: '2px',
              color: '#c4603a',
              textDecoration: 'none',
              marginTop: '20px',
            }}
          >
            Hablar con el equipo →
          </a>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: easeOut, delay: 0.1 }}
          style={{}}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(24px, 3vw, 36px)',
              lineHeight: 1.3,
              color: '#1a1410',
              borderLeft: '2px solid rgba(196,96,58,0.3)',
              paddingLeft: isMobile ? 20 : 28,
              marginTop: 24,
            }}
          >
            "Lo construimos porque lo necesitamos — y nadie lo había
            construido antes."
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'rgba(26,20,16,0.65)',
              marginTop: '24px',
            }}
          >
            Studio by Paradise nació de observar a estudiantes
            latinoamericanos de arte y diseño llegar a las mejores
            instituciones de Europa con el portafolio correcto y el idioma
            incorrecto. El idioma que enseñamos en NABA no es el italiano de
            una app — es el italiano de Domus, de una crítica de estudio en
            Politecnico, de una entrevista de admisión en el formato que esos
            jurados esperan. Lo construimos porque sabemos exactamente qué
            conversación necesitas tener — y en qué idioma.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
