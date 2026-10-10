"use client";
import { useEffect, useState } from "react";

export default function Typed({ words }: { words: string[] }) {
  const key = words.join("|");
  const [text, setText] = useState(words[0] ?? "");
  useEffect(() => {
    const list = key.split("|").filter(Boolean);
    if (!list.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0, n = list[0].length, del = true;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = list[i];
      n += del ? -1 : 1;
      setText(w.slice(0, n));
      let wait = del ? 40 : 85;
      if (!del && n === w.length) { del = true; wait = 1400; }
      else if (del && n === 0) { del = false; i = (i + 1) % list.length; wait = 350; }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 1500);
    return () => clearTimeout(t);
  }, [key]);
  return <>{text}<span className="typed-cursor" aria-hidden="true">|</span></>;
}
