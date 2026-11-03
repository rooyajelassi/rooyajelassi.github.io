import { profile } from "../data/content";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t py-6" style={{ borderColor: "var(--color-border)", color: "var(--color-text-soft)" }}>
      <Container className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.68rem] tracking-wide">
        <span>~/{profile.handle} &middot; EOF</span>
        <a href="#summary" className="transition-colors hover:text-[var(--color-accent-bright)]">
          back to top ↑
        </a>
      </Container>
    </footer>
  );
}
