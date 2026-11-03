# Rooya Jelassi — Portfolio

A personal portfolio site: offensive-security projects, CTF results, certifications, and three live, sandboxed demos of tools built from scratch (HashRecon, a Ransomware Simulator visualization, and a simulated PortRecon scan).

Built with React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion. Fully static — no backend, no database, nothing to host beyond the built files.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Deploy to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`.

One-time setup after pushing this repo to GitHub:

1. Push this `site/` folder's contents as the root of a GitHub repository (e.g. `rooyajelassi.github.io` for a user site, or any repo name for a project site).
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). The site goes live at the URL GitHub Pages shows on that settings page.

The Vite config uses `base: './'` (relative asset paths), so the build works whether it's served from a user site root (`https://<user>.github.io/`) or a project subpath (`https://<user>.github.io/<repo>/`) without any changes.

## Live demos — what's real vs. simulated

- **HashRecon**: real. Runs entirely in your browser — identifies a hash's algorithm by format and attempts a dictionary crack against a small embedded common-password list. Nothing is sent over the network.
- **Ransomware Simulator**: real cryptography (Web Crypto API, AES-256-GCM + RSA-2048-OAEP), run only on sample text you type, entirely client-side, fully reversible. A visualization of the real project's kill chain, not the real project itself (which runs only in an air-gapped VirtualBox lab).
- **PortRecon**: simulated. Replays realistic canned output against a fixed, fictional host. The real PortRecon opens actual TCP sockets against an authorized target — running that against arbitrary visitor-supplied hosts from a public page would be both unsafe and a potential legal liability, so this panel demonstrates the tool's output shape without making any real network calls.

## Content

Site copy is sourced from `Jelassi_Rooya_CV_Cybersecurity_Padua.pdf`. Edit `src/data/content.ts` to update experience, education, projects, awards, or skills — the rest of the site is driven from that file.
