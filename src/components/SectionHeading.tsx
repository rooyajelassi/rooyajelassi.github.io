export function SectionHeading({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--color-text)" }}>
        {title}
      </h2>
      {lede && (
        <p className="mt-3 text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-soft)" }}>
          {lede}
        </p>
      )}
    </div>
  );
}
