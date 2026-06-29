"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  colorIndex: number;
  life: number;
  maxLife: number;
  wobble: number;
  wobbleSpeed: number;
}

const COLORS = [
  [200, 122, 20],  // ember
  [232, 168, 32],  // honey gold
  [250, 190, 80],  // warm flame
  [180, 90, 12],   // deep ember
];

export default function AmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const COUNT = 90;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const spawn = (y?: number): Particle => {
      const maxLife = Math.random() * 220 + 120;
      return {
        x:           Math.random() * canvas.width,
        y:           y ?? canvas.height + 20,
        vx:          (Math.random() - 0.5) * 0.6,
        vy:          -(Math.random() * 1.2 + 0.4),
        radius:      Math.random() * 2.5 + 0.5,
        alpha:       0,
        colorIndex:  Math.floor(Math.random() * COLORS.length),
        life:        0,
        maxLife,
        wobble:      Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.025 + 0.01,
      };
    };

    for (let i = 0; i < COUNT; i++) {
      const p = spawn(Math.random() * canvas.height);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life++;
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.35;
        p.y += p.vy;

        const ratio = p.life / p.maxLife;
        if      (ratio < 0.15) p.alpha = ratio / 0.15;
        else if (ratio > 0.70) p.alpha = 1 - (ratio - 0.70) / 0.30;
        else                   p.alpha = 1;

        if (p.life >= p.maxLife || p.y < -30) {
          particles[i] = spawn();
          continue;
        }

        const [r, g, b] = COLORS[p.colorIndex];
        const a = p.alpha * 0.75;

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();

        // Radial glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        grd.addColorStop(0, `rgba(${r},${g},${b},${a * 0.3})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
