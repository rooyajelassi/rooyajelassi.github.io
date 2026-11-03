import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { profile } from "../data/content";
import { Container } from "./Container";
import { GithubGlyph, LinkedinGlyph } from "./icons/BrandIcons";
import { Seal } from "./Seal";
import { TagPill } from "./TagPill";

export function Hero() {
  return (
    <section id="summary" className="grid-texture relative overflow-hidden border-b" style={{ borderColor: "var(--color-border)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 1.5, rotate: -20 }}
        animate={{ opacity: 0.5, scale: 1, rotate: 8 }}
        transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1], delay: 0.15 }}
        className="pointer-events-none absolute top-10 -right-16 hidden lg:block"
        aria-hidden="true"
      >
        <Seal size={340} />
      </motion.div>

      <Container className="relative z-10 pt-12 pb-14 sm:pt-16 sm:pb-20">
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
          className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
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

          <div className="ml-1 flex items-center gap-1">
            <a
              href={profile.githubPrimary}
              target="_blank"
              rel="noreferrer"
              aria-label="Primary GitHub profile"
              className="rounded-full p-2.5 transition-colors hover:bg-[var(--color-bg-raised)]"
              style={{ color: "var(--color-text-soft)" }}
            >
              <GithubGlyph size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full p-2.5 transition-colors hover:bg-[var(--color-bg-raised)]"
              style={{ color: "var(--color-text-soft)" }}
            >
              <LinkedinGlyph size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="rounded-full p-2.5 transition-colors hover:bg-[var(--color-bg-raised)]"
              style={{ color: "var(--color-text-soft)" }}
            >
              <Mail size={19} strokeWidth={2} />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
