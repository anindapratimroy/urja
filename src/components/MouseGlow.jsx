import React, { useEffect, useState } from 'react';

const MouseGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [dot, setDot] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animFrame;
    let current = { x: -200, y: -200 };

    const onMove = (e) => {
      setDot({ x: e.clientX, y: e.clientY });
      current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const el = e.target;
      setIsHovering(
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.closest('.glass-card')
      );
    };

    // Lerp the glow ring to follow cursor smoothly
    let ring = { x: -200, y: -200 };
    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      ring.x = lerp(ring.x, current.x, 0.1);
      ring.y = lerp(ring.y, current.y, 0.1);
      setPos({ x: ring.x, y: ring.y });
      animFrame = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      {/* Large soft glow */}
      <div
        className={`cursor-glow ${isHovering ? 'hovering' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      {/* Crisp dot */}
      <div
        className="cursor-dot"
        style={{ left: dot.x, top: dot.y }}
      />
      <style>{`
        .cursor-glow {
          position: fixed;
          pointer-events: none;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%);
          z-index: 9998;
          transition: width 0.3s, height 0.3s, background 0.3s;
        }
        .cursor-glow.hovering {
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%);
        }
        .cursor-dot {
          position: fixed;
          pointer-events: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(96,165,250,0.5);
          transform: translate(-50%, -50%);
          z-index: 9999;
          box-shadow: 0 0 4px rgba(96,165,250,0.4);
        }
        @media (hover: none) {
          .cursor-glow, .cursor-dot { display: none; }
        }
      `}</style>
    </>
  );
};

export default MouseGlow;
