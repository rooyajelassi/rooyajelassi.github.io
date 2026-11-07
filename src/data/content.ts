import hashreconIdentify from "../assets/screenshots/hashrecon-identify.webp";
import hashreconCrack from "../assets/screenshots/hashrecon-crack.webp";
import portreconScan from "../assets/screenshots/portrecon-scan.webp";
import myvetSwagger from "../assets/screenshots/myvet-swagger.webp";
import zsecurityImg from "../assets/certs/zsecurity-certificate.webp";
import artFactoryImg from "../assets/certs/art-factory-certificate.webp";
import aiesecImg from "../assets/certs/aiesec-certificate.webp";

export const profile = {
  name: "Rooya Jelassi",
  handle: "rooyajelassi",
  location: "Tunis, Tunisia",
  email: "rooyajelassi3@gmail.com",
  linkedin: "https://www.linkedin.com/in/rooya-jelassi-49ab75295",
  githubPrimary: "https://github.com/rooyajelassi",
  githubPrimaryLabel: "github.com/rooyajelassi",
  githubSecondary: "https://github.com/Rooyajelassi6",
  githubSecondaryLabel: "github.com/Rooyajelassi6",
  cvHref: "/Rooya-Jelassi-CV.pdf",
  badges: ["offensive security", "ctf — 1st place", "htb cpts — in progress", "final-year it student"],
  abstract:
    "Final-year IT student with a hands-on focus on offensive security: 1st place in a national CTF, halfway through the Hack The Box CPTS path, and builder of red-team / blue-team tooling, including an AI-driven detection platform. Every project below ships with the real tool running — not just a description of it.",
};

export type Entry = {
  org: string;
  role: string;
  place: string;
  period: string;
  bullets: string[];
};

export const experience: Entry[] = [
  {
    org: "Sagemcom",
    role: "Mobile Application Developer Intern",
    place: "Ezzahra, Tunisia",
    period: "Aug 2026",
    bullets: [
      "Migrated an internal factory-floor tool from a shared-workstation web app to a React Native (Expo) mobile app, designing per-user authentication (Django REST Framework + JWT) for ~66 users to replace an unauthenticated shared login.",
      "Shipped defense-in-depth controls: rotating/blacklisted refresh tokens, rate-limited login, OS-backed token storage (iOS Keychain / Android Keystore), enforced HTTPS. Received a written recommendation letter.",
    ],
  },
  {
    org: "El Mazraa",
    role: "IT Intern",
    place: "Nabeul, Tunisia",
    period: "Jul – Aug 2025",
    bullets: [
      "Troubleshot network and hardware issues with the IT team, gaining hands-on experience with network configuration and device vulnerabilities.",
    ],
  },
];

export const education: Entry[] = [
  {
    org: "Tunis Business School",
    role: "Bachelor in Business Administration — IT major, Business Analytics minor",
    place: "Tunis, Tunisia",
    period: "Sept 2023 – June 2027 (expected)",
    bullets: [
      "Coursework: Algorithms & Programming, OOP, Database Design, Networking Fundamentals, Linux System Administration, Web Services, Information Assurance & Security, Artificial Intelligence.",
      "In progress: Machine Learning, Cloud Computing. GPA (last 3 semesters): 3.04/4.0.",
      "Final-year project (PFE): 6-month offensive-security internship starting Jan/Feb 2027, supervised by the Head of the IT Department.",
    ],
  },
  {
    org: "Lycée Pilote Bourguiba Tunis",
    role: "Baccalauréat in Mathematics — Mention Très Bien (national competitive entry)",
    place: "Tunis, Tunisia",
    period: "June 2023",
    bullets: [],
  },
];

export type Impact = "critical" | "high" | "medium";

export type Screenshot = { src: string; caption: string };

export type Project = {
  id: string;
  exhibit: string;
  name: string;
  impact: Impact;
  stack: string[];
  summary: string;
  detail: string;
  features?: string[];
  repoUrl?: string;
  repoLabel?: string;
  demo?: "hashrecon" | "ransomware" | "portrecon";
  screenshots?: Screenshot[];
};

export const projects: Project[] = [
  {
    id: "haris",
    exhibit: "EXHIBIT A",
    name: "HARIS — AI Security Platform",
    impact: "critical",
    stack: ["FastAPI", "React", "Neo4j", "Docker"],
    summary:
      "AI agent that simulates red-team attacks and learns to detect them, built to support SOC teams. 2nd place, AI × Cybersecurity track, CyberHorizon Hackathon.",
    detail:
      "Microservice architecture around a Neo4j graph database (vector index) that generates attacks, evaluates detections, and keeps auditable forensic traces — a team project built under hackathon time pressure.",
    repoLabel: "View on GitHub",
  },
  {
    id: "ransomware-sim",
    exhibit: "EXHIBIT B",
    name: "Ransomware Simulator",
    impact: "critical",
    stack: ["Python", "Flask"],
    summary:
      "Full ransomware kill-chain simulator: AES-256 hybrid encryption, RSA-2048-OAEP key wrapping, and a Flask HTTPS command-and-control server.",
    detail:
      "TTPs mapped to MITRE ATT&CK; the real project runs only inside an air-gapped VirtualBox lab. The panel below is a safe, in-browser visualization of the same kill chain — it never leaves your tab.",
    demo: "ransomware",
  },
  {
    id: "hashrecon",
    exhibit: "EXHIBIT C",
    name: "HashRecon",
    impact: "high",
    stack: ["Python", "rich", "bcrypt", "pytest"],
    summary:
      "CLI tool that ranks a hash's likely algorithm by confidence and attempts a dictionary attack to recover its plaintext.",
    detail:
      "Identification covers 13+ digest formats (MD5 → SHA-3, BLAKE2, bcrypt) with reasoned confidence levels; cracking supports case-variant mutation, manual algorithm override, an interactive prompt mode, and constant-time digest comparison via hmac.compare_digest. When every identified candidate is unsupported (Argon2, scrypt, NTLM…), it says so instead of silently guessing. The panel below is a smaller, client-side illustration of the same idea — the real CLI's actual output is the screenshots beside it.",
    features: [
      "Ranked identification with confidence + reasoning, not just a guess",
      "Dictionary attack across MD5, SHA-1/2/3, BLAKE2, and bcrypt",
      "Case-variant mutation, manual --algo override, interactive mode",
      "Exit codes for scripting; attempt count + elapsed time reporting",
    ],
    repoUrl: "https://github.com/rooyajelassi/hashrecon",
    repoLabel: "github.com/rooyajelassi/hashrecon",
    demo: "hashrecon",
    screenshots: [
      { src: hashreconIdentify, caption: "hashrecon identify — ranked algorithm candidates" },
      { src: hashreconCrack, caption: "hashrecon crack — real dictionary attack, 16 attempts" },
    ],
  },
  {
    id: "portrecon",
    exhibit: "EXHIBIT D",
    name: "PortRecon",
    impact: "high",
    stack: ["Python", "asyncio", "pytest"],
    summary:
      "Concurrent TCP connect scanner with banner grabbing, classifying every requested port as open, closed, filtered, unreachable, or error.",
    detail:
      "Built on real OS-level connection outcomes (ECONNREFUSED → closed, timeout → filtered) rather than guesswork, and is explicit that 'filtered' is an inference, not proof of a firewall. Supports port ranges, a full 1–65535 sweep, JSON export, and a banner-free fast mode. The screenshot beside this card is a real scan the tool ran against this machine's own localhost — not a mockup.",
    features: [
      "5-state classification (open / closed / filtered / unreachable / error)",
      "Concurrent connect scanning with configurable thread count + timeouts",
      "Lightweight banner grabbing, JSON export, --only-open filtering",
      "Full pytest suite covering parsing, classification, and sorting",
    ],
    repoUrl: "https://github.com/rooyajelassi/portrecon",
    repoLabel: "github.com/rooyajelassi/portrecon",
    demo: "portrecon",
    screenshots: [{ src: portreconScan, caption: "portrecon 127.0.0.1 — a real scan of this machine" }],
  },
  {
    id: "myvet",
    exhibit: "EXHIBIT E",
    name: "MyVet",
    impact: "medium",
    stack: ["Flask", "flask-smorest", "JWT", "PyOTP", "React"],
    summary:
      "API-first veterinary appointment platform for Tunisia: JWT auth, mandatory TOTP 2FA, role-based access, and a trilingual (EN/FR/AR) service catalog.",
    detail:
      "Every user — owner, vet, or admin — goes through a password-then-TOTP login flow before receiving a JWT. The API is fully self-documenting via auto-generated Swagger/OpenAPI (flask-smorest), and includes geocoding-backed proximity search for nearby clinics. The screenshot is that real, live Swagger UI, generated by actually building and running the project's own Docker image.",
    features: [
      "Mandatory TOTP 2FA for every account, not just an optional toggle",
      "Role-based access: pet owners, vets, and admins each get a distinct surface",
      "Service names and search stored in English, French, and Arabic",
      "Auto-generated OpenAPI 3.0 docs; geocoding endpoint for distance search",
    ],
    repoUrl: "https://github.com/Rooyajelassi6/MyVet",
    repoLabel: "github.com/Rooyajelassi6/MyVet",
    screenshots: [{ src: myvetSwagger, caption: "MyVet's live Swagger / OpenAPI docs" }],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  image?: string;
};

export const certifications: Certification[] = [
  { name: "Learn Hacking Using the Cloud From Scratch", issuer: "zSecurity", date: "Aug 2026", image: zsecurityImg },
  { name: "Certificate of Membership — President", issuer: "Art Factory, Tunis Business School", date: "2024 – 2025", image: artFactoryImg },
  { name: "Leadership Development Experience — Global Volunteer", issuer: "AIESEC", date: "Aug 2024", image: aiesecImg },
  { name: "Penetration Testing (CPTS path)", issuer: "Hack The Box Academy", date: "In progress — halfway" },
];

export const awards = [
  {
    title: "CyberHorizon Hackathon — Hammamet",
    detail: "1st place, CTF track · 2nd place, AI × Cybersecurity track",
    date: "Apr 2026",
  },
  {
    title: "President, Art Factory — Tunis Business School",
    detail: "Led a 60-member club; organized \"TBS Got Talent,\" a flagship campus event.",
    date: "2024 – 2025",
  },
  {
    title: "Global Volunteer, AIESEC",
    detail: "Taught English to youth in Istanbul as part of an international volunteer team.",
    date: "Summer 2024",
  },
];

export const skills = {
  "Offensive Security": ["Burp Suite", "gobuster", "Hydra", "Kali Linux", "Empire", "BeEF", "Hack The Box", "TryHackMe", "CTF"],
  Programming: ["Python", "C", "Java", "Kotlin", "JavaScript", "SQL", "Shell"],
  "Dev & Infra": ["FastAPI", "Flask", "Django REST Framework", "JWT", "React", "React Native", "Neo4j", "Docker", "nginx", "Git"],
  Languages: ["English (fluent)", "French (fluent)", "Arabic (fluent)", "German (beginner)", "Korean (beginner)"],
};
