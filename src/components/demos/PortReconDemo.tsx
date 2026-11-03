import { useState } from "react";
import { SIM_HOST, SIM_PORTS, type SimPort } from "../../lib/portreconData";

const STATE_COLOR: Record<SimPort["state"], string> = {
  open: "var(--color-tag-green)",
  closed: "var(--color-text-soft)",
  filtered: "var(--color-tag-amber)",
};

export function PortReconDemo() {
  const [scanning, setScanning] = useState(false);
  const [revealed, setRevealed] = useState<SimPort[]>([]);
  const [run, setRun] = useState(0);

  function scan() {
    setScanning(true);
    setRevealed([]);
    const order = [...SIM_PORTS].sort(() => Math.random() - 0.5);
    order.forEach((p, i) => {
      setTimeout(
        () => {
          setRevealed((prev) => [...prev, p].sort((a, b) => a.port - b.port));
          if (i === order.length - 1) setScanning(false);
        },
        220 + i * 260,
      );
    });
    setRun((r) => r + 1);
  }

  return (
    <div className="mt-5 rounded-lg border p-5 sm:p-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-raised)" }}>
      <p className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--color-accent)" }}>
        Simulated demo &middot; fixed sandbox host &middot; no real network calls
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm" style={{ color: "var(--color-text)" }}>
          target: <strong>{SIM_HOST}</strong>
        </span>
        <button
          onClick={scan}
          disabled={scanning}
          className="rounded-md px-3 py-1.5 font-mono text-xs font-semibold tracking-wide uppercase disabled:opacity-50"
          style={{ backgroundColor: "var(--color-accent)", color: "#0a0a12" }}
        >
          {scanning ? "Scanning…" : run > 0 ? "Scan again" : "Run scan"}
        </button>
      </div>

      <div
        className="mt-4 min-h-[13rem] overflow-x-auto rounded-md border p-3 font-mono text-xs"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-sunken)", color: "var(--color-text)" }}
      >
        <table className="w-full min-w-[26rem] border-collapse">
          <thead>
            <tr style={{ opacity: 0.6 }}>
              <th className="py-1 text-left font-normal">PORT</th>
              <th className="py-1 text-left font-normal">SERVICE</th>
              <th className="py-1 text-left font-normal">STATE</th>
              <th className="py-1 text-left font-normal">BANNER</th>
            </tr>
          </thead>
          <tbody>
            {revealed.map((p) => (
              <tr key={`${run}-${p.port}`}>
                <td className="py-0.5 pr-3">{p.port}/tcp</td>
                <td className="py-0.5 pr-3" style={{ opacity: 0.85 }}>{p.service}</td>
                <td className="py-0.5 pr-3 font-semibold" style={{ color: STATE_COLOR[p.state] }}>{p.state}</td>
                <td className="py-0.5" style={{ opacity: 0.7 }}>{p.banner ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {revealed.length === 0 && !scanning && <p style={{ opacity: 0.55 }}>press "run scan" to start…</p>}
      </div>

      <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
        The real PortRecon opens TCP connect sockets against a target you're authorized to test and classifies
        states from the raw connection outcome. Running that against visitor-supplied hosts from a public page
        would be an abuse and legal liability, so this panel replays realistic output against a fixed, fictional
        host instead — same CLI output shape, zero network calls. Full source on GitHub.
      </p>
    </div>
  );
}
