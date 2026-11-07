import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile, projects } from "../data/content";
import { Container } from "./Container";
import { TagPill } from "./TagPill";

const FACTS: [string, string][] = [
  ["role", "final-year it student"],
  ["focus", "offensive security"],
  ["location", profile.location.toLowerCase()],
  ["ctf", "1st place"],
  ["htb_cpts", "in progress"],
  ["exhibits", `${projects.length} shipped`],
];

function WhoamiPanel() {
  return (
    <div
      className="w-80 rounded-lg border font-mono text-xs"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-sunken)" }}
    >
      <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: "var(--color-border)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        <span className="ml-2 text-[0.68rem]" style={{ color: "var(--color-text-soft)" }}>
          whoami
        </span>
      </div>
      <dl className="space-y-1.5 px-4 py-4">
        {FACTS.map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <dt className="w-24 shrink-0" style={{ color: "var(--color-text-soft)" }}>
              {k}
            </dt>
            <dd style={{ color: "var(--color-accent-bright)" }}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Hero() {
  return (
    <section id="summary" className="grid-texture relative overflow-hidden border-b" style={{ borderColor: "var(--color-border)" }}>
      <Container className="relative z-10 flex flex-col gap-10 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="min-w-0 lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {profile.badges.map((b) => (
              <TagPill key={b} label={b} />
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: "var(--color-text)" }}
          >
            <span style={{ color: "var(--color-text-soft)" }}>~/</span>
            {profile.name.toLowerCase().replace(" ", "_")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--color-text-soft)" }}
          >
            {profile.abstract}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#exhibits"
              className="inline-flex items-center gap-2 px-5 py-3 font-mono text-sm font-semibold tracking-[0.04em] transition-transform duration-150 hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--color-accent)", color: "#0a0a12" }}
            >
              ./view-exhibits
            </a>
            <a
              href={profile.cvHref}
              download
              className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-sm font-semibold tracking-[0.04em] transition-colors duration-150 hover:bg-[var(--color-accent-wash)]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              <Download size={15} strokeWidth={2.25} />
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden shrink-0 lg:block"
        >
          <WhoamiPanel />
        </motion.div>
      </Container>
    </section>
  );
}
