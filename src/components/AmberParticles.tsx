"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotSpeed: number;
}

export default function AmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 28;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const spawn = (y?: number): Particle => {
      const maxLife = Math.random() * 200 + 140;
      return {
        x:           Math.random() * canvas.width,
        y:           y ?? canvas.height + 20,
        vx:          (Math.random() - 0.5) * 0.5,
        vy:          -(Math.random() * 3.2 + 1.8),
        size:        Math.random() * 18 + 16,
        alpha:       0,
        life:        0,
        maxLife,
        wobble:      Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.008,
        rotation:    Math.random() * Math.PI * 2,
        rotSpeed:    (Math.random() - 0.5) * 0.03,
      };
    };

    for (let i = 0; i < COUNT; i++) {
      const p = spawn(Math.random() * canvas.height);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let lastTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;

    const draw = (timestamp: number) => {
      if (timestamp - lastTime < INTERVAL) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life++;
        p.wobble   += p.wobbleSpeed;
        p.rotation += p.rotSpeed;
        p.x        += p.vx + Math.sin(p.wobble) * 0.3;
        p.y        += p.vy;

        const ratio = p.life / p.maxLife;
        if      (ratio < 0.12) p.alpha = ratio / 0.12;
        else if (ratio > 0.72) p.alpha = 1 - (ratio - 0.72) / 0.28;
        else                   p.alpha = 1;

        if (p.life >= p.maxLife || p.y < -40) {
          particles[i] = spawn();
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha * 0.82;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font        = `${p.size}px serif`;
        ctx.textAlign   = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🍪", 0, 0);
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw as FrameRequestCallback);
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
