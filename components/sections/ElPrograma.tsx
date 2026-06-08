'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const foundationPoints: { num: string; title: string; text: string }[] = [
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
    text: 'Un estudiante que puede hablar de la historia de su disciplina en el idioma de la institución no solo domina el idioma — tiene la legibilidad cultural que cambia cómo lo percibe un comité de admisión europeo.',
  },
  {
    num: '04',
    title: 'Integrado con el proceso de aplicación',
    text: 'Terminas con el artist statement escrito, la entrevista de portafolio ensayada, y la carta de motivación calibrada a la institución a la que aplicas. En el idioma. Sin traductor.',
  },
];

const immersionPoints: { num: string; title: string; text: string }[] = [
  {
    num: 'I·01',
    title: 'El idioma como pertenencia, no como requisito',
    text: 'Llegaste. El programa es en inglés. El idioma del país resuelve la distancia entre ser estudiante allí y pertenecer al ecosistema que te rodea — el tutor que cambia al italiano, la apertura donde se construyen relaciones, el estudio donde quieres hacer prácticas.',
  },
  {
    num: 'I·02',
    title: 'Vocabulario calibrado a tu disciplina y a tu ciudad',
    text: 'Un estudiante de moda en Milano no necesita el mismo italiano que un estudiante de arquitectura en Politecnico. Un estudiante en HEAD Genève no necesita el mismo francés que alguien en ENSAD París. Cada módulo se construye alrededor del ecosistema específico donde vives.',
  },
  {
    num: 'I·03',
    title: 'El idioma que construye la carrera después del título',
    text: 'Las prácticas, las relaciones con directores creativos, la capacidad de moverte en la industria después de graduarte — todo pasa por conversaciones en el idioma del país. El objetivo no es el idioma en sí: es lo que el idioma te permite hacer dentro del ecosistema creativo europeo.',
  },
];

export default function ElPrograma() {
  const isMobile = useIsMobile();

  return (
    <section
      id="foundation"
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
              position: isMobile ? 'static' : 'sticky',
              top: '120px',
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
              No enseñamos idiomas.
              <br />
              <em style={{ fontStyle: 'italic', color: '#c4603a' }}>
                Construimos la capa
                <br />
                que la escuela
                <br />
                no incluye.
              </em>
            </p>
          </motion.div>

          {/* Right — Foundation + Immersion points */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Foundation points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {foundationPoints.map((point, i) => (
                <motion.div
                  key={point.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, ease: easeOut, delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    paddingBottom: '28px',
                    borderBottom: '1px solid rgba(26,20,16,0.06)',
                  }}
                >
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

            {/* Immersion separator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
              style={{
                marginTop: '48px',
                marginBottom: '32px',
                paddingTop: '40px',
                borderTop: '1px solid rgba(26,20,16,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, background: '#4E7262', borderRadius: '50%', flexShrink: 0 }} />
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.24em',
                    color: '#4E7262',
                    margin: 0,
                  }}
                >
                  Immersion Track · Para quienes ya están en Europa
                </p>
              </div>
            </motion.div>

            {/* Immersion points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {immersionPoints.map((point, i) => (
                <motion.div
                  key={point.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, ease: easeOut, delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    paddingBottom: i < immersionPoints.length - 1 ? '28px' : '0',
                    borderBottom: i < immersionPoints.length - 1 ? '1px solid rgba(78,114,98,0.1)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: '#4E7262',
                      opacity: 0.8,
                      flexShrink: 0,
                      paddingTop: '4px',
                    }}
                  >
                    {point.num}
                  </span>
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

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          style={{
            marginTop: isMobile ? 56 : 80,
            paddingTop: isMobile ? 32 : 40,
            borderTop: '1px solid rgba(26,20,16,0.07)',
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
              color: '#1a1410',
              margin: 0,
            }}
          >
            ¿Listo para empezar?
          </p>
          <a
            href="#contacto"
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
            Agenda la conversación gratuita →
          </a>
        </motion.div>

      </div>

      {/* ── Philosophy strip ─────────────────────────────────── */}
      <div
        style={{
          background: '#f5f0e8',
          borderTop: '1px solid rgba(26,20,16,0.07)',
          marginTop: isMobile ? '72px' : '120px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '64px 32px' : '64px 64px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
              gap: isMobile ? '48px' : '0',
            }}
          >
            {[
              {
                eyebrow: 'Cómo aprendemos',
                title: 'Tareas reales, no ejercicios.',
                body: 'Cada sesión está construida alrededor de algo que necesitas hacer — escribir un email real, preparar una defensa de portfolio, entender una crítica. El idioma se aprende como herramienta, no como objeto de estudio.',
              },
              {
                eyebrow: 'La diferencia con otros programas',
                title: 'El contexto lo es todo.',
                body: 'No enseñamos italiano general ni francés para turistas. Enseñamos el italiano de NABA y el francés de ÉCAL — el registro específico, el vocabulario exacto, los códigos culturales que determinan si perteneces o no.',
              },
              {
                eyebrow: 'Sobre la IA y la traducción automática',
                title: 'La IA traduce palabras. No traduce pertenencia.',
                body: 'Las herramientas de traducción automática pueden manejar un email básico. No pueden hacer que un tutor en Milán te vea como un colega. La diferencia está en el idioma que hablas cuando nadie te está esperando que lo hables.',
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: easeOut, delay: i * 0.1 }}
                style={{
                  padding: isMobile ? '0' : '0 40px',
                  borderRight:
                    !isMobile && i < 2
                      ? '1px solid rgba(26,20,16,0.08)'
                      : 'none',
                  paddingLeft: isMobile ? '0' : i === 0 ? '0' : '40px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 300,
                    color: 'rgba(26,20,16,0.08)',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {`${i + 1}.`}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    color: '#c4603a',
                    margin: '0 0 14px 0',
                  }}
                >
                  {col.eyebrow}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#1a1410',
                    lineHeight: 1.25,
                    margin: '0 0 16px 0',
                  }}
                >
                  {col.title}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: '#1a1410',
                    opacity: 0.58,
                    margin: 0,
                  }}
                >
                  {col.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Measurable outcomes ──────────────────────────────── */}
      <div
        style={{
          background: '#ede8df',
          borderTop: '1px solid rgba(26,20,16,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '64px 32px' : '64px 64px',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: easeOut }}
            style={{ marginBottom: '48px' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#c4603a',
                margin: '0 0 12px 0',
              }}
            >
              Al completar el programa
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 2.5vw, 36px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#1a1410',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Lo que puedes hacer.
            </p>
          </motion.div>

          {/* Outcomes grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '20px' : '16px 64px',
            }}
          >
            {[
              'Participar en una crítica de estudio en italiano o francés sin preparación previa.',
              'Presentar tu portfolio y responder preguntas del jurado en el idioma de la institución.',
              'Escribir una carta de motivación y email a profesores con el registro correcto.',
              'Navegar situaciones sociales y profesionales informales sin que el idioma sea una barrera.',
              'Investigar y entender documentos institucionales — syllabi, convocatorias, contratos — en el idioma original.',
              'Representar tu práctica latinoamericana con claridad y confianza en un contexto europeo.',
            ].map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: easeOut, delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(26,20,16,0.06)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    color: '#c4603a',
                    opacity: 0.8,
                    flexShrink: 0,
                    minWidth: 28,
                    lineHeight: 1.55,
                    userSelect: 'none',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: '#1a1410',
                    opacity: 0.75,
                    margin: 0,
                  }}
                >
                  {outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
