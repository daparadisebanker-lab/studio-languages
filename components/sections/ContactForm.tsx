'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent, CSSProperties } from 'react'
import { useIsMobile } from '@/lib/useIsMobile'

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

const WA_NUMBER = '51983747658'

const WHATSAPP_SVG_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

const selectArrowUri = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(245,240,232,0.5)' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`

const inputBase: CSSProperties = {
  backgroundColor: 'rgba(245,240,232,0.1)',
  border: '1px solid rgba(245,240,232,0.2)',
  padding: '16px 20px',
  color: '#f5f0e8',
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  fontWeight: 300,
  width: '100%',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
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

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
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

  return (
    <textarea
      rows={3}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
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
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        appearance: 'none',
        WebkitAppearance: 'none',
        backgroundColor: focused ? 'rgba(245,240,232,0.15)' : 'rgba(245,240,232,0.1)',
        backgroundImage: selectArrowUri,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 20px center',
        backgroundSize: '12px 8px',
        paddingRight: 48,
        cursor: 'pointer',
        borderColor: focused ? 'rgba(245,240,232,0.5)' : 'rgba(245,240,232,0.2)',
      }}
    >
      <option value="" disabled>
        — Idioma de interés —
      </option>
      <option value="Italiano para el Arte">Italiano para el Arte</option>
      <option value="Français para el Arte">Français para el Arte</option>
      <option value="Ambos idiomas">Ambos idiomas</option>
    </select>
  )
}

export default function ContactForm() {
  const isMobile = useIsMobile()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [idioma, setIdioma] = useState('')
  const [institucion, setInstitucion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [btnHovered, setBtnHovered] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Hola,%20me%20llamo%20${encodeURIComponent(name)}%20y%20estoy%20interesado%20en%20el%20programa%20de%20${encodeURIComponent(idioma || 'idiomas')}%20de%20Studio.%20Mi%20institución%20objetivo%20es%20${encodeURIComponent(institucion)}.`
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
  }

  return (
    <section
      id="inscripcion"
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
              Reserva tu
              <br />
              <em style={{ fontStyle: 'italic', color: '#c4603a' }}>lugar.</em>
              <br />
              Las clases inician
              <br />
              el 22 de junio.
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
              Las plazas son limitadas. Cada estudiante trabaja en sesiones individuales — el número
              de estudiantes en cada cohorte es pequeño por diseño. Si tienes interés, es mejor
              iniciar la conversación ahora.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20el%20programa%20de%20idiomas%20de%20Studio`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 32,
                padding: '14px 24px',
                background: '#25D366',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 500,
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 4,
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
              Escribir por WhatsApp
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
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

              <FormSelect value={idioma} onChange={setIdioma} />

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
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  background: btnHovered ? '#c4603a' : '#1a1410',
                  color: '#f5f0e8',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: '18px 36px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 0.25s ease',
                }}
              >
                Reservar mi lugar →
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
        </div>
      </div>
    </section>
  )
}
