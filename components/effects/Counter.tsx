"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ value }: { value: string | number }) {
  const s = String(value);
  const m = s.match(/^(\D*)(\d+)(.*)$/);
  const target = m ? parseInt(m[2], 10) : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!m || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s]);
  if (!m) return <span>{s}</span>;
  return <span ref={ref}>{m[1]}{n ?? m[2]}{m[3]}</span>;
}
