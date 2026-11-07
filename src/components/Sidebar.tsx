import { awards, certifications, education, experience, profile, projects, skills } from "../data/content";
import { GithubGlyph, LinkedinGlyph } from "./icons/BrandIcons";
import { Mail } from "lucide-react";
import { Seal } from "./Seal";
import { useActiveSection } from "../lib/useActiveSection";

const SECTIONS = [
  { id: "summary", label: "summary", count: null as number | null },
  { id: "history", label: "history", count: experience.length + education.length + awards.length },
  { id: "exhibits", label: "exhibits", count: projects.length },
  { id: "attachments", label: "attachments", count: certifications.length + Object.keys(skills).length },
  { id: "contact", label: "contact", count: null },
];

export function Sidebar() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <aside
      className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r lg:flex"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-raised)" }}
    >
      <a href="#summary" className="flex items-center gap-2.5 px-5 pt-6 pb-5" aria-label="Back to top">
        <Seal size={30} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            rooyajelassi
          </p>
          <p className="text-[0.65rem] tracking-wide" style={{ color: "var(--color-text-soft)" }}>
            security vault
          </p>
        </div>
      </a>

      <nav aria-label="Section navigation" className="flex-1 overflow-y-auto px-3 py-2">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center justify-between gap-2 rounded-md px-3 py-2 font-mono text-[0.8rem] transition-colors"
              style={{
                color: isActive ? "var(--color-accent-bright)" : "var(--color-text-soft)",
                backgroundColor: isActive ? "var(--color-accent-wash)" : "transparent",
              }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: isActive ? "var(--color-accent-bright)" : "var(--color-border)" }}
                />
                {s.label}
              </span>
              {s.count !== null && (
                <span className="font-mono text-[0.68rem]" style={{ color: "var(--color-text-soft)" }}>
                  {s.count}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 border-t px-4 py-4" style={{ borderColor: "var(--color-border)" }}>
        <a
          href={profile.githubPrimary}
          target="_blank"
          rel="noreferrer"
          aria-label="Primary GitHub profile"
          className="rounded-md p-2 transition-colors hover:bg-[var(--color-accent-wash)]"
          style={{ color: "var(--color-text-soft)" }}
        >
          <GithubGlyph size={16} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="rounded-md p-2 transition-colors hover:bg-[var(--color-accent-wash)]"
          style={{ color: "var(--color-text-soft)" }}
        >
          <LinkedinGlyph size={16} />
        </a>
        <a
          href={`mailto:${profile.email}`}
          aria-label="Send email"
          className="rounded-md p-2 transition-colors hover:bg-[var(--color-accent-wash)]"
          style={{ color: "var(--color-text-soft)" }}
        >
          <Mail size={16} strokeWidth={2} />
        </a>
      </div>
    </aside>
  );
}
