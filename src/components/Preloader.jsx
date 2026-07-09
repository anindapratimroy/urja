import React, { useState, useEffect, useRef } from 'react';
import urjaLogo from '../assets/logo/urja_logo_processed.png';
import iitiLogo from '../assets/logo/iiti_logo.png';

/* ═══════════════════════════════════════════════════════════
   Preloader — shown ONCE per browser session (first load /
   hard refresh only). Skipped on SPA route changes.
   ═══════════════════════════════════════════════════════════ */

const SESSION_KEY = 'urja_preloader_shown';

// ── tiny star-dot generator (deterministic) ──────────────
const generateStars = (count) => {
  const stars = [];
  // Use a simple seeded approach for consistency
  for (let i = 0; i < count; i++) {
    const seed = (i * 2654435761) % 2147483647; // Knuth multiplicative hash
    stars.push({
      id: i,
      x: (seed % 10000) / 100,                           // 0-100 %
      y: ((seed * 31) % 10000) / 100,                     // 0-100 %
      size: 1 + ((seed * 7) % 200) / 100,                 // 1-3 px
      opacity: 0.15 + ((seed * 13) % 600) / 1000,         // 0.15-0.75
      delay: ((seed * 3) % 3000) / 1000,                  // 0-3 s
      duration: 2 + ((seed * 11) % 3000) / 1000,          // 2-5 s
    });
  }
  return stars;
};

const STARS = generateStars(65);

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const FILL_DURATION = 1500;   // ms — progress bar fill
  const FADE_DURATION = 600;    // ms — fade-out transition

  useEffect(() => {
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const pct = Math.min(elapsed / FILL_DURATION, 1);

      // ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // progress complete → start fade-out
        setFadeOut(true);
        setTimeout(() => {
          onComplete && onComplete();
        }, FADE_DURATION);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  /* ─── Removed old SVG Logo component ─────────── */

  return (
    <div
      className={`urja-preloader ${fadeOut ? 'urja-preloader--fade' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), visibility ${FADE_DURATION}ms`,
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
      }}
    >
      {/* ── Stars ───────────────────────────────────── */}
      {STARS.map((s) => (
        <span
          key={s.id}
          className="urja-preloader__star"
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: '#fff',
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* ── Radial gradient atmosphere ────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.07), transparent 70%), ' +
            'radial-gradient(ellipse at 70% 70%, rgba(139,92,246,0.05), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ─────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logos with smooth floating pulse */}
        <div className="urja-preloader__logos" style={{ display: 'flex', gap: '3.5rem', alignItems: 'center' }}>
          <img src={iitiLogo} alt="IIT Indore" style={{ height: '125px', width: 'auto' }} />
          <img 
            src={urjaLogo} 
            alt="URJA Lab" 
            style={{ height: '135px', width: 'auto' }} 
          />
        </div>

        {/* URJA LAB heading */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            margin: 0,
            background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          URJA LAB
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1rem',
            color: '#94A3B8',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Indian Institute of Technology Indore
        </p>

        {/* ── Progress bar ─────────────────────────── */}
        <div
          style={{
            width: 'clamp(180px, 40vw, 280px)',
            height: '3px',
            borderRadius: '100px',
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
            marginTop: '0.75rem',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: '100px',
              background: 'linear-gradient(90deg, #3B82F6, #60A5FA, #A78BFA)',
              transition: 'width 60ms linear',
              boxShadow: '0 0 12px rgba(96,165,250,0.45)',
            }}
          />
        </div>

        {/* Percentage counter */}
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#475569',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.08em',
          }}
        >
          {progress}%
        </span>
      </div>

      {/* ── Scoped keyframes ────────────────────────── */}
      <style>{`
        .urja-preloader__star {
          animation: urjaStarTwinkle 3s ease-in-out infinite alternate;
        }
        @keyframes urjaStarTwinkle {
          0%   { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }

        .urja-preloader__logos {
          animation: urjaLogoPulse 3s ease-in-out infinite;
        }
        @keyframes urjaLogoPulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-8px) scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
