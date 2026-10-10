export default function TerminalCard({ data }: { data: Record<string, string | null | undefined> }) {
  const rows = Object.entries(data).filter(([, v]) => v);
  if (!rows.length) return null;
  return (
    <div className="term-card stagger-item">
      <div className="term-bar"><i /><i /><i /><span>~/profile/about.json</span></div>
      <pre>
        {"{\n"}
        {rows.map(([k, v], i) => (
          <span key={k}>{"  "}<b className="tk">&quot;{k}&quot;</b>: <span className="ts">&quot;{v}&quot;</span>{i < rows.length - 1 ? "," : ""}{"\n"}</span>
        ))}
        {"}"}
      </pre>
    </div>
  );
}
