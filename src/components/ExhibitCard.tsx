import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Project } from "../data/content";
import { ImpactBadge } from "./ImpactBadge";
import { GithubGlyph } from "./icons/BrandIcons";
import { TagPill } from "./TagPill";
import { HashReconDemo } from "./demos/HashReconDemo";
import { PortReconDemo } from "./demos/PortReconDemo";
import { RansomwareDemo } from "./demos/RansomwareDemo";

const DEMOS: Record<NonNullable<Project["demo"]>, React.ComponentType> = {
  hashrecon: HashReconDemo,
  ransomware: RansomwareDemo,
  portrecon: PortReconDemo,
};

export function ExhibitCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const Demo = project.demo ? DEMOS[project.demo] : null;

  return (
    <article className="border-b py-10 first:pt-0 last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
      <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[1fr_11rem]">
        <div className="order-1 lg:order-2">
          <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end lg:gap-3">
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--color-text-soft)" }}>
              {project.exhibit}
            </span>
            <ImpactBadge impact={project.impact} />
          </div>
          <div className="mt-3 hidden flex-wrap gap-1.5 lg:flex lg:justify-end">
            {project.stack.map((s) => (
              <TagPill key={s} label={s} size="xs" />
            ))}
          </div>
        </div>

        <div className="order-2 min-w-0 lg:order-1">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--color-text)" }}>
            {project.name}
          </h3>

          <div className="mt-2.5 flex flex-wrap gap-1.5 lg:hidden">
            {project.stack.map((s) => (
              <TagPill key={s} label={s} size="xs" />
            ))}
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
            {project.summary}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
            {project.detail}
          </p>

          {project.features && (
            <ul className="mt-3 grid max-w-2xl gap-1.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5 text-xs leading-snug" style={{ color: "var(--color-text-soft)" }}>
                  <Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: "var(--color-tag-green)" }} />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {project.screenshots && (
            <div className="mt-4 flex flex-wrap gap-3">
              {project.screenshots.map((s) => (
                <figure key={s.src} className="max-w-full">
                  <div className="overflow-hidden rounded-md border" style={{ borderColor: "var(--color-border)" }}>
                    <img src={s.src} alt={s.caption} className="block h-auto max-h-56 w-auto max-w-full" loading="lazy" />
                  </div>
                  <figcaption className="mt-1 font-mono text-[0.65rem]" style={{ color: "var(--color-text-soft)" }}>
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide uppercase underline decoration-dashed underline-offset-4 transition-colors hover:text-[var(--color-accent-bright)]"
                style={{ color: "var(--color-text)" }}
              >
                <GithubGlyph size={14} />
                {project.repoLabel}
              </a>
            )}
            {!project.repoUrl && project.repoLabel && (
              <a
                href="https://github.com/rooyajelassi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide uppercase underline decoration-dashed underline-offset-4 transition-colors hover:text-[var(--color-accent-bright)]"
                style={{ color: "var(--color-text)" }}
              >
                <ExternalLink size={14} strokeWidth={2} />
                {project.repoLabel}
              </a>
            )}

            {Demo && (
              <button
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-semibold tracking-wide uppercase"
                style={{ backgroundColor: "var(--color-accent)", color: "#0a0a12" }}
                aria-expanded={open}
              >
                {open ? "Hide live demo" : "Run live demo"}
                <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {Demo && open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.3, 1] }}
                className="overflow-hidden"
              >
                <Demo />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
