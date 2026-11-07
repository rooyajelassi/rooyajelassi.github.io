import { Award } from "lucide-react";
import { awards, education, experience, type Entry } from "../data/content";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

function TimelineBlock({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative ml-2 space-y-8 border-l-2 pl-7" style={{ borderColor: "var(--color-border)" }}>
      {entries.map((e, i) => (
        <li key={i} className="relative">
          <span
            className="absolute top-1.5 -left-[2.05rem] h-3 w-3 rounded-full border-2"
            style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-bg)" }}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
              {e.org}
            </h3>
            <span className="font-mono text-xs tracking-wide" style={{ color: "var(--color-text-soft)" }}>
              {e.period}
            </span>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
            {e.role} &middot; <span style={{ color: "var(--color-text-soft)" }}>{e.place}</span>
          </p>
          {e.bullets.length > 0 && (
            <ul className="mt-2.5 space-y-1.5">
              {e.bullets.map((b, bi) => (
                <li key={bi} className="text-sm leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export function History() {
  return (
    <section id="history" className="border-b py-16 sm:py-24" style={{ borderColor: "var(--color-border)" }}>
      <Container>
        <SectionHeading
          title="history"
          lede="Experience, education, and record of distinction — read in order, the way a reviewer would."
        />

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-5 font-mono text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "var(--color-text-soft)" }}>
              experience
            </h3>
            <TimelineBlock entries={experience} />
          </div>

          <div>
            <h3 className="mb-5 font-mono text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "var(--color-text-soft)" }}>
              education
            </h3>
            <TimelineBlock entries={education} />
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-5 font-mono text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "var(--color-text-soft)" }}>
            citations &amp; leadership
          </h3>
          <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
            {awards.map((a, i) => (
              <li key={i} className="flex flex-wrap items-start gap-x-4 gap-y-1 border-t py-3.5 first:border-t-0" style={{ borderColor: "color-mix(in srgb, var(--color-border) 45%, transparent)" }}>
                <Award size={16} strokeWidth={2} className="mt-1 shrink-0" style={{ color: "var(--color-accent)" }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                    {a.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
                    {a.detail}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[0.68rem] tracking-wide" style={{ color: "var(--color-text-soft)" }}>
                  {a.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
