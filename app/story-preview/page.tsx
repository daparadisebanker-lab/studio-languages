'use client';

import { useState, useCallback } from 'react';
import StoryAd from '@/components/campaign/StoryAd';

type Beat = 'provoke' | 'reveal' | 'cta';

const BEAT_LABELS: Record<Beat, string> = {
  provoke: '01 · Provoke',
  reveal:  '02 · Reveal',
  cta:     '03 · CTA',
};

const SCALE_OPTIONS = [
  { label: '25%', value: 0.25 },
  { label: '33%', value: 0.33 },
  { label: '50%', value: 0.5  },
  { label: '100%', value: 1   },
];

export default function StoryPreviewPage() {
  const [beat, setBeat] = useState<Beat>('provoke');
  const [scale, setScale] = useState(0.33);
  const [loop, setLoop] = useState(true);
  const [epoch, setEpoch] = useState(0);

  const handleBeatChange = useCallback((b: Beat) => setBeat(b), []);

  const replay = () => setEpoch(e => e + 1);

  const storyW = Math.round(1080 * scale);
  const storyH = Math.round(1920 * scale);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0E0C0A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 80px',
      gap: 32,
    }}>

      {/* Header */}
      <div style={{
        width: '100%',
        maxWidth: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.3)',
            marginBottom: 6,
          }}>
            Studio by Paradise · Campaign Preview
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 28, color: '#F5F0E8',
          }}>
            Instagram Story · 15s Video Ad
          </h1>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>

          {/* Scale selector */}
          <div style={{ display: 'flex', gap: 4 }}>
            {SCALE_OPTIONS.map(opt => (
              <button
                key={opt.label}
                onClick={() => setScale(opt.value)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: scale === opt.value ? '#C4603A' : 'rgba(245,240,232,0.06)',
                  color: scale === opt.value ? '#F5F0E8' : 'rgba(245,240,232,0.4)',
                  border: 'none', cursor: 'pointer',
                  padding: '8px 12px', borderRadius: 2,
                  transition: 'all 0.2s ease',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Loop toggle */}
          <button
            onClick={() => setLoop(l => !l)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: loop ? 'rgba(184,151,58,0.15)' : 'rgba(245,240,232,0.06)',
              color: loop ? '#B8973A' : 'rgba(245,240,232,0.4)',
              border: `1px solid ${loop ? 'rgba(184,151,58,0.3)' : 'rgba(245,240,232,0.1)'}`,
              cursor: 'pointer', padding: '8px 14px', borderRadius: 2,
              transition: 'all 0.2s ease',
            }}
          >
            {loop ? 'Loop ON' : 'Loop OFF'}
          </button>

          {/* Replay */}
          <button
            onClick={replay}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#C4603A', color: '#F5F0E8',
              border: 'none', cursor: 'pointer',
              padding: '8px 20px', borderRadius: 2,
              transition: 'opacity 0.2s ease',
            }}
          >
            ↺ Replay
          </button>
        </div>
      </div>

      {/* Beat indicator */}
      <div style={{
        display: 'flex', gap: 24, alignItems: 'center',
      }}>
        {(['provoke', 'reveal', 'cta'] as Beat[]).map(b => (
          <div key={b} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: beat === b ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: beat === b ? '#C4603A' : 'rgba(245,240,232,0.3)',
              transition: 'background 0.3s ease',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#F5F0E8',
            }}>
              {BEAT_LABELS[b]}
            </span>
          </div>
        ))}
      </div>

      {/* Canvas wrapper — clip and scale */}
      <div style={{
        width: storyW,
        height: storyH,
        overflow: 'hidden',
        flexShrink: 0,
        borderRadius: 12,
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)',
        position: 'relative',
      }}>
        <div style={{
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          width: 1080,
          height: 1920,
        }}>
          <StoryAd
            key={epoch}
            loop={loop}
            onBeatChange={handleBeatChange}
          />
        </div>
      </div>

      {/* Export instructions */}
      <div style={{
        width: '100%', maxWidth: 540,
        background: 'rgba(245,240,232,0.04)',
        border: '1px solid rgba(245,240,232,0.07)',
        padding: '28px 32px',
        borderRadius: 2,
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#C4603A', marginBottom: 16,
        }}>
          Export as MP4 — Instructions
        </p>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Set scale to 100% above — frame becomes 1080×1920',
            'Click Replay to restart from Beat 1',
            'Open OBS or QuickTime → New Screen Recording',
            'Crop capture to exactly this frame (1080×1920px)',
            'Click Replay → record 16 seconds → stop',
            'Export as MP4 H.264 → upload to Meta Ads Manager',
            'Meta Ads: set CTA → Más información → studiobyparadise.com',
          ].map((step, i) => (
            <li key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300,
              lineHeight: 1.6, color: 'rgba(245,240,232,0.6)',
            }}>
              {step}
            </li>
          ))}
        </ol>

        <div style={{
          marginTop: 24, paddingTop: 20,
          borderTop: '1px solid rgba(245,240,232,0.06)',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(245,240,232,0.25)',
            marginBottom: 8,
          }}>WA Link (pre-filled)</p>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: '#C4603A', wordBreak: 'break-all',
          }}>
            wa.me/51983747658?text=Hola%2C+quisiera+saber+m%C3%A1s+sobre+Studio+by+Paradise
          </p>
        </div>
      </div>
    </div>
  );
}
