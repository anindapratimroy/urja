import React, { useRef, useEffect, useCallback } from 'react';

/**
 * CosmosBackground — Pure canvas interactive starfield (Enhanced v2)
 *
 * Features:
 *  ✦ Twinkling stars with varied sizes, colors, and opacity pulsation
 *  ✦ Gentle drift movement simulating cosmic flow
 *  ✦ Mouse interaction: stars attract toward cursor with a soft gravitational pull
 *  ✦ Glowing mouse trail / cursor aura that illuminates nearby stars
 *  ✦ Occasional shooting stars streaking across
 *  ✦ Faint constellation lines between nearby stars
 *  ✦ Floating nebula blobs that drift slowly
 *  ✦ Pulsing deep-space "beacons" — larger brighter stars that throb gently
 *  ✦ Zero external dependencies
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 });
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const nebulasRef = useRef([]);
  const timeRef = useRef(0);

  // Star color palette — cosmos blues, whites, warm hints
  const STAR_COLORS = [
    'rgba(255, 255, 255,',
    'rgba(200, 220, 255,',
    'rgba(170, 200, 255,',
    'rgba(96, 165, 250,',
    'rgba(139, 92, 246,',
    'rgba(255, 220, 180,',
    'rgba(120, 180, 255,',
  ];

  const createStar = useCallback((w, h) => {
    const colorBase = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    const isBeacon = Math.random() < 0.04; // 4% chance of being a pulsing beacon
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: isBeacon ? (Math.random() * 2 + 2.5) : (Math.random() * 2.2 + 0.3),
      colorBase,
      opacity: isBeacon ? (Math.random() * 0.3 + 0.5) : (Math.random() * 0.6 + 0.2),
      twinkleSpeed: isBeacon ? (Math.random() * 0.008 + 0.003) : (Math.random() * 0.02 + 0.005),
      twinkleOffset: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.1,
      driftY: (Math.random() - 0.5) * 0.05 + 0.015,
      isBeacon,
      // For mouse gravitational pull — store velocity offsets
      vx: 0,
      vy: 0,
    };
  }, []);

  const createShootingStar = useCallback((w, h) => {
    const startX = Math.random() * w * 1.2 - w * 0.1;
    const startY = Math.random() * h * 0.4;
    const angle = Math.PI / 5 + Math.random() * Math.PI / 5;
    const speed = 5 + Math.random() * 7;
    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      decay: 0.006 + Math.random() * 0.01,
      length: 40 + Math.random() * 60,
      width: 1 + Math.random() * 1.5,
    };
  }, []);

  const createNebula = useCallback((w, h) => {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      radius: 100 + Math.random() * 250,
      color: Math.random() > 0.5
        ? `rgba(29, 78, 216, ${0.015 + Math.random() * 0.025})`
        : `rgba(139, 92, 246, ${0.01 + Math.random() * 0.02})`,
      driftX: (Math.random() - 0.5) * 0.03,
      driftY: (Math.random() - 0.5) * 0.02,
      pulseSpeed: 0.003 + Math.random() * 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const STAR_COUNT = 120;
    const NEBULA_COUNT = 3;
    const ATTRACT_RADIUS = 300;
    const ATTRACT_STRENGTH = 0.15;
    const MOUSE_GLOW_RADIUS = 300;
    const LINE_DISTANCE = 100;
    const LINE_OPACITY = 0.035;
    const FRICTION = 0.96;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Initialize stars
    starsRef.current = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      starsRef.current.push(createStar(w, h));
    }

    // Initialize nebula blobs
    nebulasRef.current = [];
    for (let i = 0; i < NEBULA_COUNT; i++) {
      nebulasRef.current.push(createNebula(w, h));
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const handleMouseClick = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Scatter stars near the mouse
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const dx = star.x - e.clientX;
        const dy = star.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (400 - dist) / 10;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }
      }
      // Spawn 1-3 shooting stars on click
      const count = Math.floor(Math.random() * 3) + 1;
      for(let i=0; i<count; i++) {
         shootingStarsRef.current.push(createShootingStar(w, h));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      timeRef.current += 1;

      ctx.clearRect(0, 0, width, height);

      // ── Floating Nebula Blobs ──
      const nebulas = nebulasRef.current;
      for (let i = 0; i < nebulas.length; i++) {
        const nb = nebulas[i];
        nb.x += nb.driftX;
        nb.y += nb.driftY;
        // Wrap
        if (nb.x < -nb.radius) nb.x = width + nb.radius;
        if (nb.x > width + nb.radius) nb.x = -nb.radius;
        if (nb.y < -nb.radius) nb.y = height + nb.radius;
        if (nb.y > height + nb.radius) nb.y = -nb.radius;

        const pulse = 0.7 + 0.3 * Math.sin(timeRef.current * nb.pulseSpeed + nb.pulseOffset);
        const grad = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.radius * pulse);
        grad.addColorStop(0, nb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(nb.x - nb.radius, nb.y - nb.radius, nb.radius * 2, nb.radius * 2);
      }

      const mouse = mouseRef.current;
      const stars = starsRef.current;

      // ── Mouse Glow Aura ──
      if (mouse.x > 0 && mouse.y > 0) {
        const auraGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_GLOW_RADIUS);
        auraGrad.addColorStop(0, 'rgba(96, 165, 250, 0.06)');
        auraGrad.addColorStop(0.5, 'rgba(96, 165, 250, 0.02)');
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Update and Draw Stars ──
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Mouse gravitational attraction
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACT_RADIUS && dist > 1) {
          const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }

        // Apply friction
        star.vx *= FRICTION;
        star.vy *= FRICTION;

        // Apply velocity + drift
        star.x += star.driftX + star.vx;
        star.y += star.driftY + star.vy;

        // Wrap around
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        // Twinkle
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity + twinkle * (star.isBeacon ? 0.35 : 0.25);
        const clampedOpacity = Math.max(0.05, Math.min(1, currentOpacity));

        // Proximity glow boost from mouse
        let proximityBoost = 0;
        if (dist < MOUSE_GLOW_RADIUS) {
          proximityBoost = (1 - dist / MOUSE_GLOW_RADIUS) * 0.4;
        }
        const finalOpacity = Math.min(1, clampedOpacity + proximityBoost);

        // Draw beacon glow (large pulsing stars)
        if (star.isBeacon) {
          const beaconGrad = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 8
          );
          beaconGrad.addColorStop(0, star.colorBase + (finalOpacity * 0.2).toFixed(3) + ')');
          beaconGrad.addColorStop(0.5, star.colorBase + (finalOpacity * 0.06).toFixed(3) + ')');
          beaconGrad.addColorStop(1, star.colorBase + '0)');
          ctx.fillStyle = beaconGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 8, 0, Math.PI * 2);
          ctx.fill();
        }
        // Regular star glow
        else if (star.size > 1.0) {
          const glowGrad = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 4
          );
          glowGrad.addColorStop(0, star.colorBase + (finalOpacity * 0.25).toFixed(3) + ')');
          glowGrad.addColorStop(1, star.colorBase + '0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.fillStyle = star.colorBase + finalOpacity.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Store for lines
        star._rx = star.x;
        star._ry = star.y;
        star._opacity = finalOpacity;
      }

      // ── Constellation Lines ──
      ctx.lineWidth = 0.5;
      const lineCheckMax = Math.min(stars.length, 90);
      for (let i = 0; i < lineCheckMax; i++) {
        let linesFromStar = 0;
        for (let j = i + 1; j < lineCheckMax && linesFromStar < 3; j++) {
          const ldx = stars[i]._rx - stars[j]._rx;
          const ldy = stars[i]._ry - stars[j]._ry;
          const distSq = ldx * ldx + ldy * ldy;
          if (distSq < LINE_DISTANCE * LINE_DISTANCE) {
            const d = Math.sqrt(distSq);
            const lineAlpha = (1 - d / LINE_DISTANCE) * LINE_OPACITY * Math.min(stars[i]._opacity, stars[j]._opacity);
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha.toFixed(4)})`;
            ctx.beginPath();
            ctx.moveTo(stars[i]._rx, stars[i]._ry);
            ctx.lineTo(stars[j]._rx, stars[j]._ry);
            ctx.stroke();
            linesFromStar++;
          }
        }
      }

      // ── Interactive Mouse Constellation Lines ──
      if (mouse.x > 0 && mouse.y > 0) {
        let mouseLines = 0;
        for (let i = 0; i < stars.length && mouseLines < 8; i++) {
          const mdx = stars[i]._rx - mouse.x;
          const mdy = stars[i]._ry - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const connectDist = LINE_DISTANCE * 2.2;
          if (mDistSq < connectDist * connectDist) {
            const d = Math.sqrt(mDistSq);
            const lineAlpha = (1 - d / connectDist) * (LINE_OPACITY * 4) * stars[i]._opacity;
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha.toFixed(4)})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(stars[i]._rx, stars[i]._ry);
            ctx.stroke();
            mouseLines++;
          }
        }
      }

      // ── Shooting Stars ──
      if (Math.random() < 0.004) {
        shootingStarsRef.current.push(createShootingStar(width, height));
      }

      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const ss = shootingStarsRef.current[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;

        if (ss.life <= 0) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        const mag = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
        const tailX = ss.x - ss.vx * (ss.length / mag);
        const tailY = ss.y - ss.vy * (ss.length / mag);

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.5, `rgba(200, 220, 255, ${ss.life * 0.3})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.life * 0.9})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width * ss.life;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Bright head dot
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * ss.life * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [createStar, createShootingStar, createNebula]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#020617',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
