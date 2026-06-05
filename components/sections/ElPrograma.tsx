'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const points = [
  {
    num: '01',
    title: 'Contexto disciplinario, no comunicación genérica',
    text: 'Cada sesión está anclada en el mundo que el estudiante quiere habitar — la crítica de estudio, el vocabulario del diseño, la historia de las instituciones que son su destino.',
  },
  {
    num: '02',
    title: 'Registro académico europeo',
    text: 'Los comités de admisión de escuelas de arte evalúan cómo escribe y habla un candidato sobre su trabajo. Preparamos ese registro específico — el statement de artista, la entrevista de portafolio, la presentación de proyecto.',
  },
  {
    num: '03',
    title: 'Alfabetización cultural real',
    text: 'Un estudiante que puede hablar de Brunelleschi en italiano o de Maison Margiela en francés no solo tiene el idioma. Tiene la legibilidad institucional que cambia cómo lo percibe un comité de admisión.',
  },
  {
    num: '04',
    title: 'Integrado con el proceso de aplicación',
    text: 'Al terminar el programa, el estudiante puede escribir su artist statement en el idioma de destino y conducir una revisión de portafolio con un jurado europeo.',
  },
];

export default function ElPrograma() {
  const isMobile = useIsMobile();

  return (
    <section
      id="programa"
      style={{
        background: '#f5f0e8',
        padding: isMobile ? '72px 0' : '120px 0',
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
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#c4603a',
            }}
          >
            El Programa
          </span>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: '#c4603a',
              flexShrink: 0,
            }}
          />
        </motion.div>

        {/* 2-col grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            marginTop: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left — Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: easeOut }}
            style={{
              borderLeft: '2px solid #c4603a',
              paddingLeft: isMobile ? '20px' : '32px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 300,
                lineHeight: 1.25,
                color: '#1a1410',
                margin: 0,
              }}
            >
              No enseñamos italiano.
              <br />
              Preparamos estudiantes
              <br />
              para{' '}
              <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
                estudiar diseño
                <br />
                en Milán.
              </em>
            </p>
          </motion.div>

          {/* Right — 4 points */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {points.map((point, i) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.9,
                  ease: easeOut,
                  delay: i * 0.1,
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  paddingBottom: i < points.length - 1 ? '28px' : '0',
                  borderBottom:
                    i < points.length - 1
                      ? '1px solid rgba(26,20,16,0.06)'
                      : 'none',
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: '#c4603a',
                    opacity: 0.6,
                    flexShrink: 0,
                    paddingTop: '4px',
                  }}
                >
                  {point.num}
                </span>

                {/* Content */}
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: '#1a1410',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {point.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      color: '#1a1410',
                      opacity: 0.7,
                      margin: 0,
                    }}
                  >
                    {point.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
