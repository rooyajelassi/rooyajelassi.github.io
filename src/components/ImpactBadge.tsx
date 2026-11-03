import type { Impact } from "../data/content";

const STYLES: Record<Impact, { label: string; className: string; style?: React.CSSProperties }> = {
  critical: {
    label: "Impact: Critical",
    className: "text-[var(--color-bg)]",
    style: { backgroundColor: "var(--color-accent)" },
  },
  high: {
    label: "Impact: High",
    className: "border",
    style: { borderColor: "var(--color-accent)", color: "var(--color-accent)" },
  },
  medium: {
    label: "Impact: Standard",
    className: "border",
    style: { borderColor: "var(--color-border)", color: "var(--color-text-soft)" },
  },
};

export function ImpactBadge({ impact }: { impact: Impact }) {
  const s = STYLES[impact];
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[0.65rem] font-semibold tracking-[0.1em] uppercase ${s.className}`}
      style={s.style}
    >
      {s.label}
    </span>
  );
}
