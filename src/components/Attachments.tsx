import { certifications, skills } from "../data/content";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { TagPill } from "./TagPill";

export function Attachments() {
  return (
    <section id="attachments" className="border-b py-16 sm:py-24" style={{ borderColor: "var(--color-border)" }}>
      <Container>
        <SectionHeading title="attachments" lede="Verified scans and a record of capabilities on file." />

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {certifications.map((c) =>
            c.image ? (
              <figure
                key={c.name}
                className="overflow-hidden rounded-lg border"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-raised)", boxShadow: "var(--shadow-panel)" }}
              >
                <img src={c.image} alt={c.name} className="w-full" loading="lazy" />
                <figcaption className="p-4">
                  <p className="text-sm leading-snug font-semibold" style={{ color: "var(--color-text)" }}>
                    {c.name}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "var(--color-text-soft)" }}>
                    {c.issuer} &middot; {c.date}
                  </p>
                </figcaption>
              </figure>
            ) : (
              <figure
                key={c.name}
                className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p className="font-mono text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--color-accent-bright)" }}>
                  in progress
                </p>
                <p className="mt-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {c.name}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--color-text-soft)" }}>
                  {c.issuer} &middot; {c.date}
                </p>
              </figure>
            ),
          )}
        </div>

        <div className="mt-16">
          <h3 className="mb-5 font-mono text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "var(--color-text-soft)" }}>
            capabilities on record
          </h3>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {Object.entries(skills).map(([category, list]) => (
              <div key={category}>
                <dt className="mb-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {category}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {list.map((s) => (
                    <TagPill key={s} label={s} size="xs" />
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
