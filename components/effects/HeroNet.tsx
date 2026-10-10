"use client";
import { useEffect, useRef } from "react";

export default function HeroNet() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    type P = { x: number; y: number; vx: number; vy: number };
    let w = 0, h = 0, raf = 0, visible = true;
    let pts: P[] = [];
    const mouse = { x: -999, y: -999 };
    const size = () => {
      const r = c.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * d; c.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }));
    };
    const move = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const line = (x1: number, y1: number, x2: number, y2: number, a: number) => {
      ctx.strokeStyle = `rgba(255,189,57,${a})`;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    };
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) line(a.x, a.y, b.x, b.y, (1 - d / 130) * 0.28);
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 160) line(a.x, a.y, mouse.x, mouse.y, (1 - md / 160) * 0.5);
        ctx.fillStyle = "rgba(255,189,57,.7)";
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
    };
    size(); draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", move);
    };
  }, []);
  return <canvas ref={ref} className="hero-net" aria-hidden="true" />;
}
