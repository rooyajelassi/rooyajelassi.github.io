export function Seal({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="RJ monogram seal"
    >
      <circle cx="32" cy="32" r="30" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="32" cy="32" r="25" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="1.5 3" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="22"
        fontWeight="600"
        fill="var(--color-accent)"
      >
        RJ
      </text>
    </svg>
  );
}
