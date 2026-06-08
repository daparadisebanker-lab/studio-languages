'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: scrolled
          ? (isMobile ? 'max(env(safe-area-inset-top, 12px), 12px)' : 'max(env(safe-area-inset-top, 14px), 14px)')
          : (isMobile ? 'max(env(safe-area-inset-top, 16px), 16px)' : 'max(env(safe-area-inset-top, 20px), 20px)'),
        paddingBottom: scrolled ? (isMobile ? '12px' : '14px') : (isMobile ? '16px' : '20px'),
        paddingLeft: isMobile ? '24px' : '48px',
        paddingRight: isMobile ? '24px' : '48px',
        background: 'rgba(245,240,232,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,20,16,0.08)',
        transition: 'padding 0.3s ease',
      }}
    >
      <motion.a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'block', lineHeight: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-header.png"
          alt="Studio by Paradise"
          style={{ height: isMobile ? 26 : 34, width: 'auto', display: 'block' }}
        />
      </motion.a>

      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 24 }}>
        {!isMobile && (
          <a
            href="#precios"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.18em',
              color: 'rgba(26,20,16,0.55)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1410')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(26,20,16,0.55)')}
          >
            Precios
          </a>
        )}
        <motion.a
        href="#contacto"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#f5f0e8',
          background: '#c4603a',
          padding: isMobile ? '13px 18px' : '12px 20px',
          minHeight: isMobile ? '44px' : 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          opacity: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.85';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Conversación gratuita
      </motion.a>
      </div>
    </nav>
  );
}
