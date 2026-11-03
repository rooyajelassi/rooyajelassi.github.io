import { Mail } from "lucide-react";
import { profile } from "../data/content";
import { Container } from "./Container";
import { GithubGlyph, LinkedinGlyph } from "./icons/BrandIcons";
import { TagPill } from "./TagPill";

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24" style={{ backgroundColor: "var(--color-bg-raised)" }}>
      <Container>
        <TagPill label="further engagement" />
        <h2 className="mt-5 max-w-xl font-mono text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--color-text)" }}>
          Open to internships, research collaboration, and graduate programs in cybersecurity.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
          The fastest way to reach {profile.name.split(" ")[0]} is email or LinkedIn. Source for every exhibit
          above is on GitHub.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 font-mono text-sm font-semibold tracking-[0.04em]"
            style={{ backgroundColor: "var(--color-accent)", color: "#0a0a12" }}
          >
            <Mail size={16} strokeWidth={2.25} />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-sm font-semibold tracking-[0.04em]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            <LinkedinGlyph size={16} />
            LinkedIn
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:gap-6" style={{ borderColor: "var(--color-border)" }}>
          <a href={profile.githubPrimary} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm" style={{ color: "var(--color-text)" }}>
            <GithubGlyph size={16} />
            {profile.githubPrimaryLabel}
            <span className="text-[0.65rem] tracking-wide uppercase" style={{ color: "var(--color-text-soft)" }}>primary</span>
          </a>
          <a href={profile.githubSecondary} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm" style={{ color: "var(--color-text-soft)" }}>
            <GithubGlyph size={16} />
            {profile.githubSecondaryLabel}
            <span className="text-[0.65rem] tracking-wide uppercase">secondary</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
