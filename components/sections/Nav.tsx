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
        padding: scrolled
          ? (isMobile ? '12px 24px' : '14px 48px')
          : (isMobile ? '16px 24px' : '20px 48px'),
        background: 'rgba(245,240,232,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,20,16,0.08)',
        transition: 'padding 0.3s ease',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-header.png"
          alt="Studio by Paradise"
          style={{ height: isMobile ? 26 : 34, width: 'auto', display: 'block' }}
        />
      </motion.div>

      <motion.a
        href="#inscripcion"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isMobile ? '9px' : '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#f5f0e8',
          background: '#1a1410',
          padding: isMobile ? '8px 14px' : '10px 20px',
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#c4603a')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#1a1410')}
      >
        Reserva tu lugar
      </motion.a>
    </nav>
  );
}
