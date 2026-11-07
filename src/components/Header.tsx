import { useActiveSection } from "../lib/useActiveSection";
import { Container } from "./Container";
import { Seal } from "./Seal";

const TABS = [
  { id: "summary", label: "summary" },
  { id: "history", label: "history" },
  { id: "exhibits", label: "exhibits" },
  { id: "attachments", label: "attachments" },
  { id: "contact", label: "contact" },
];

export function Header() {
  const active = useActiveSection(TABS.map((t) => t.id));

  return (
    <header
      className="sticky top-0 z-40 border-b lg:hidden"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
    >
      <Container className="flex items-center gap-4 py-2.5">
        <a href="#summary" className="flex shrink-0 items-center gap-2" aria-label="Back to top">
          <Seal size={24} />
        </a>

        <nav aria-label="Section navigation" className="nav-fade flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                aria-current={isActive ? "true" : undefined}
                className="shrink-0 rounded-md px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.02em] whitespace-nowrap transition-colors duration-150"
                style={{
                  color: isActive ? "var(--color-accent-bright)" : "var(--color-text-soft)",
                  backgroundColor: isActive ? "var(--color-accent-wash)" : "transparent",
                }}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
