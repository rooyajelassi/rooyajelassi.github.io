const PALETTE = [
  "var(--color-tag-violet)",
  "var(--color-tag-cyan)",
  "var(--color-tag-green)",
  "var(--color-tag-amber)",
  "var(--color-tag-rose)",
  "var(--color-tag-orange)",
];

function colorFor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++) hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export function TagPill({ label, size = "sm" }: { label: string; size?: "sm" | "xs" }) {
  const color = colorFor(label);
  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono tracking-wide ${
        size === "xs" ? "px-2 py-0.5 text-[0.62rem]" : "px-2.5 py-1 text-[0.7rem]"
      }`}
      style={{ borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
    >
      {label}
    </span>
  );
}
