'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, FormEvent, CSSProperties } from 'react'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const WA_NUMBER = '51983747658'
const WA_LINK = 'https://wa.me/51983747658?text=Hola%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20Studio%20by%20Paradise'

const WHATSAPP_SVG_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

const selectArrowUri = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(245,240,232,0.5)' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`

function inputBase(isMobile: boolean): CSSProperties {
  return {
    backgroundColor: 'rgba(245,240,232,0.1)',
    border: '1px solid rgba(245,240,232,0.2)',
    padding: isMobile ? '14px 16px' : '16px 20px',
    color: '#f5f0e8',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    fontWeight: 300,
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
  }
}

function FormInput({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const isMobile = useIsMobile()

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase(isMobile),
        borderColor: focused ? 'rgba(245,240,232,0.5)' : 'rgba(245,240,232,0.2)',
        backgroundColor: focused ? 'rgba(245,240,232,0.15)' : 'rgba(245,240,232,0.1)',
      }}
    />
  )
}

function FormTextarea({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const isMobile = useIsMobile()

  return (
    <textarea
      rows={3}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase(isMobile),
        borderColor: focused ? 'rgba(245,240,232,0.5)' : 'rgba(245,240,232,0.2)',
        backgroundColor: focused ? 'rgba(245,240,232,0.15)' : 'rgba(245,240,232,0.1)',
        resize: 'vertical',
      }}
    />
  )
}

function FormSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) {
  const [focused, setFocused] = useState(false)
  const isMobile = useIsMobile()

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase(isMobile),
        appearance: 'none',
        WebkitAppearance: 'none',
        backgroundColor: focused ? 'rgba(245,240,232,0.15)' : 'rgba(245,240,232,0.1)',
        backgroundImage: selectArrowUri,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isMobile ? 'right 14px center' : 'right 20px center',
        backgroundSize: '12px 8px',
        paddingRight: isMobile ? 40 : 48,
        cursor: 'pointer',
        borderColor: focused ? 'rgba(245,240,232,0.5)' : 'rgba(245,240,232,0.2)',
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

const idiomaOptions = [
  { value: 'Italiano para el Arte', label: 'Italiano para el Arte' },
  { value: 'Français para el Arte', label: 'Français para el Arte' },
  { value: 'Ambos idiomas',         label: 'Ambos idiomas' },
]

const momentoOptions = [
  { value: 'Me estoy preparando para aplicar (1–3 años)', label: 'Me estoy preparando para aplicar (1–3 años)' },
  { value: 'Estoy en el año de aplicación activo',        label: 'Estoy en el año de aplicación activo' },
  { value: 'Ya fui admitido / estoy estudiando en Europa', label: 'Ya fui admitido / estoy estudiando en Europa' },
  { value: 'Estoy explorando opciones',                   label: 'Estoy explorando opciones' },
]

const modalidadOptions = [
  { value: 'Estándar ($120/mes)',          label: 'Estándar — $120 / mes' },
  { value: 'Intensivo ($200/mes)',         label: 'Intensivo — $200 / mes' },
  { value: 'Paquete Admisión ($280)',      label: 'Paquete Admisión — $280' },
  { value: 'Módulo Individual ($180)',     label: 'Módulo Individual — $180' },
  { value: 'Bundle 3 Módulos ($480)',      label: 'Bundle 3 Módulos — $480' },
  { value: 'Track Completo ($840)',        label: 'Track Completo — $840' },
  { value: 'Inmersión Mensual ($90/mes)',  label: 'Inmersión Mensual — $90 / mes' },
  { value: 'Inmersión Semestral ($450)',   label: 'Inmersión Semestral — $450' },
  { value: 'Módulo Inserción Profesional ($220)', label: 'Módulo Inserción Profesional — $220' },
]

const steps = [
  {
    number: '01',
    title: 'Recibimos tu solicitud',
    description: 'Nos llega por WhatsApp. Ese es nuestro canal — respondemos ahí, no por email.',
  },
  {
    number: '02',
    title: 'Coordinamos el horario',
    description: 'Te escribimos para encontrar un momento que funcione para los dos.',
  },
  {
    number: '03',
    title: '30 minutos. Sin compromiso.',
    description: 'Hablamos de tu institución objetivo, tu nivel actual y si el programa tiene sentido para ti.',
  },
]

export default function ContactForm() {
  const isMobile = useIsMobile()
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [idioma, setIdioma] = useState('')
  const [momento, setMomento] = useState('')
  const [modalidad, setModalidad] = useState('')
  const [institucion, setInstitucion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [btnHovered, setBtnHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const parts = [
      `Hola, me interesa el programa de idiomas de Studio by Paradise. Quisiera saber más sobre las opciones disponibles.`,
      name ? `Mi nombre es ${name}.` : '',
      idioma ? `Idioma de interés: ${idioma}.` : '',
      momento ? `Momento: ${momento}.` : '',
      modalidad ? `Modalidad de interés: ${modalidad}.` : '',
      institucion ? `Institución objetivo: ${institucion}.` : '',
      mensaje ? `Mensaje: ${mensaje}.` : '',
    ].filter(Boolean).join(' ')
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(parts)}`, '_blank')
    setIsSubmitting(false)
    setSubmitted(true)
    if (email.trim()) {
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      }).catch(() => {})
    }
  }

  return (
    <section
      id="contacto"
      style={{
        background: '#2c2420',
        color: '#f5f0e8',
        padding: isMobile ? '72px 0' : '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
        }}
      >
        {/* ¿Qué pasa después? — 3-step process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
          style={{
            marginBottom: isMobile ? 48 : 56,
            paddingBottom: 40,
            borderBottom: '1px solid rgba(245,240,232,0.1)',
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(196,96,58,0.6)',
              margin: '0 0 32px',
            }}
          >
            ¿Qué pasa después?
          </p>

          {/* Steps row */}
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 24 : 48,
            }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                style={{
                  flex: 1,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? 20 : 28,
                    color: 'rgba(196,96,58,0.6)',
                    margin: '0 0 8px',
                    letterSpacing: '0.1em',
                  }}
                >
                  {step.number}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 300,
                    color: '#f5f0e8',
                    margin: '0 0 10px',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: 'rgba(245,240,232,0.5)',
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 48 : 80,
            alignItems: 'center',
          }}
        >
          {/* Left — Text side */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            {/* Label */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.4)',
                marginBottom: 24,
                margin: '0 0 24px',
              }}
            >
              Inscripción
            </p>

            {/* H2 */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px,4.5vw,64px)',
                fontWeight: 300,
                color: '#f5f0e8',
                lineHeight: 1.05,
                margin: '0 0 28px',
              }}
            >
              El talento
              <br />
              latinoamericano
              <br />
              es un arte
              <br />
              <em style={{ fontStyle: 'italic', color: '#c4603a' }}>en sí mismo.</em>
            </h2>

            {/* Body */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                fontWeight: 300,
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Este programa es para quienes ya saben a dónde van — y para quienes ya llegaron
              y quieren estar de verdad. Las clases inician el 22 de junio.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me interesa el programa de idiomas de Studio by Paradise. Quisiera saber más sobre las opciones disponibles.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: 12,
                marginTop: isMobile ? 24 : 32,
                padding: '14px 24px',
                background: '#25D366',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 500,
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 4,
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <path d={WHATSAPP_SVG_PATH} />
              </svg>
              Iniciar la conversación
            </a>
          </motion.div>

          {/* Right — Form or Success state */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            style={{ position: 'relative' }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      fontSize: 'clamp(32px, 4vw, 52px)',
                      color: '#f5f0e8',
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    Recibimos tu solicitud.
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: 'rgba(245,240,232,0.55)',
                      marginTop: 16,
                      maxWidth: 480,
                    }}
                  >
                    Te contactamos en las próximas horas para coordinar la conversación. Revisa tu email — y si prefieres escribirnos directamente:
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      padding: '16px 24px',
                      background: '#25D366',
                      borderRadius: 8,
                      textDecoration: 'none',
                      marginTop: 20,
                      minHeight: 52,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillOpacity=".25"/>
                      <path d="M9.5 7.5c-.2-.5-.4-.5-.6-.5-.15 0-.32 0-.49 0-.17 0-.44.06-.68.31C7.5 7.56 6.5 8.5 6.5 10.5s1.03 3.9 1.18 4.17c.14.26 2 3.25 5 4.5.7.3 1.25.48 1.67.6.7.22 1.34.19 1.84.12.57-.08 1.74-.7 1.99-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33-.29-.14-1.74-.86-2.01-.96-.27-.1-.47-.14-.66.14-.2.29-.76.96-.93 1.16-.17.2-.35.22-.64.08-.29-.15-1.23-.45-2.34-1.45-.87-.78-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.2.05-.37-.02-.52L9.5 7.5z"/>
                    </svg>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#fff',
                    }}>
                      Escríbenos ahora por WhatsApp
                    </span>
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                    }}
                  >
                    <FormInput
                      type="text"
                      placeholder="Nombre completo"
                      value={name}
                      onChange={setName}
                    />

                    <FormInput
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={setEmail}
                    />

                    <FormSelect
                      value={idioma}
                      onChange={setIdioma}
                      placeholder="— Idioma de interés —"
                      options={idiomaOptions}
                    />

                    <FormSelect
                      value={momento}
                      onChange={setMomento}
                      placeholder="— ¿En qué momento estás? —"
                      options={momentoOptions}
                    />

                    <FormSelect
                      value={modalidad}
                      onChange={setModalidad}
                      placeholder="— Modalidad —"
                      options={modalidadOptions}
                    />

                    <FormInput
                      type="text"
                      placeholder="Institución objetivo (NABA, ÉCAL, HEAD...)"
                      value={institucion}
                      onChange={setInstitucion}
                    />

                    <FormTextarea
                      placeholder="¿En qué momento del proceso estás? (opcional)"
                      value={mensaje}
                      onChange={setMensaje}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => setBtnHovered(true)}
                      onMouseLeave={() => setBtnHovered(false)}
                      style={{
                        background: '#c4603a',
                        color: '#f5f0e8',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        padding: isMobile ? '16px 24px' : '18px 36px',
                        minHeight: 52,
                        border: 'none',
                        cursor: isSubmitting ? 'wait' : 'pointer',
                        width: '100%',
                        opacity: isSubmitting ? 0.6 : btnHovered ? 0.85 : 1,
                        transform: (!isSubmitting && btnHovered) ? 'translateY(-1px)' : 'translateY(0)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Reservar mi lugar →'}
                    </button>

                    {/* Disclaimer */}
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        color: 'rgba(245,240,232,0.3)',
                        textAlign: 'center',
                        margin: 0,
                      }}
                    >
                      Respondemos en menos de 24 horas · Sin compromiso de matrícula
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
