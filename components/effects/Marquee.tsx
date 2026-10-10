export default function Marquee({ items }: { items: string[] }) {
  if (!items.length) return null;
  const row = items.flatMap((t) => [t, "✦"]);
  const set = [...row, ...row];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-set" key={k}>
            {set.map((t, i) => <span key={i} className={t === "✦" ? "marquee-dot" : undefined}>{t}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
