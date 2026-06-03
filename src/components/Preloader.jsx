import React, { useState, useEffect, useRef } from 'react';

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

  const FILL_DURATION = 2500;   // ms — progress bar fill
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

  /* ─── IIT Indore SVG Logo (circular emblem) ─────────── */
  const Logo = () => (
    <svg
      viewBox="0 0 200 200"
      width="120"
      height="120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 18px rgba(59,130,246,0.35))' }}
      aria-label="IIT Indore emblem"
    >
      <defs>
        <linearGradient id="preloader-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="preloader-cog-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
        </linearGradient>
        <filter id="preloader-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle
        cx="100" cy="100" r="90"
        fill="none"
        stroke="url(#preloader-ring-grad)"
        strokeWidth="2.5"
        opacity="0.85"
      />

      {/* Inner ring */}
      <circle
        cx="100" cy="100" r="78"
        fill="none"
        stroke="url(#preloader-ring-grad)"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Gear / cog teeth (12 teeth around the outer ring) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const innerR = 85;
        const outerR = 94;
        const x1 = 100 + innerR * Math.cos(angle);
        const y1 = 100 + innerR * Math.sin(angle);
        const x2 = 100 + outerR * Math.cos(angle);
        const y2 = 100 + outerR * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#preloader-cog-grad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}

      {/* Small inner circle detail */}
      <circle
        cx="100" cy="100" r="6"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="1.5"
        opacity="0.45"
      />

      {/* IIT text */}
      <text
        x="100" y="88"
        textAnchor="middle"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#F8FAFC"
        letterSpacing="3"
        filter="url(#preloader-glow)"
      >
        IIT
      </text>

      {/* INDORE text */}
      <text
        x="100" y="118"
        textAnchor="middle"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill="#60A5FA"
        letterSpacing="5"
      >
        INDORE
      </text>

      {/* Decorative arc — bottom */}
      <path
        d="M 45 145 A 65 65 0 0 0 155 145"
        fill="none"
        stroke="url(#preloader-ring-grad)"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );

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
        {/* Logo with pulse glow */}
        <div className="urja-preloader__logo">
          <Logo />
        </div>

        {/* URJA LAB heading */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '0.12em',
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
            fontSize: '0.85rem',
            color: '#64748B',
            letterSpacing: '0.18em',
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

        .urja-preloader__logo {
          animation: urjaLogoPulse 2.5s ease-in-out infinite;
        }
        @keyframes urjaLogoPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(59,130,246,0.2)); }
          50%      { filter: drop-shadow(0 0 24px rgba(59,130,246,0.45)); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
