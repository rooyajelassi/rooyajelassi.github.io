import { useEffect, useRef, useState } from "react";
import { crackHash, detectAlgo, hashText, type HashAlgo } from "../../lib/hashUtils";

const PRESETS: { algo: HashAlgo; word: string }[] = [
  { algo: "MD5", word: "dragon" },
  { algo: "SHA-1", word: "football" },
  { algo: "SHA-256", word: "qwerty123" },
];

type Phase = "idle" | "cracking" | "cracked" | "exhausted" | "unknown";

export function HashReconDemo() {
  const [presetHashes, setPresetHashes] = useState<string[]>([]);
  const [hashInput, setHashInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [algo, setAlgo] = useState<HashAlgo>("unknown");
  const [tried, setTried] = useState(0);
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState<{ plaintext?: string; attempts: number; ms: number } | null>(null);
  const runId = useRef(0);

  const [ownWord, setOwnWord] = useState("CyberHorizon2026");
  const [ownAlgo, setOwnAlgo] = useState<HashAlgo>("SHA-256");
  const [ownHash, setOwnHash] = useState("");

  useEffect(() => {
    Promise.all(PRESETS.map((p) => hashText(p.algo, p.word))).then(setPresetHashes);
  }, []);

  useEffect(() => {
    hashText(ownAlgo, ownWord).then(setOwnHash);
  }, [ownWord, ownAlgo]);

  async function runCrack(target: string) {
    const id = ++runId.current;
    setHashInput(target);
    setResult(null);
    setTried(0);
    setCurrent("");
    const detected = detectAlgo(target);
    setAlgo(detected);
    if (detected === "unknown") {
      setPhase("unknown");
      return;
    }
    setPhase("cracking");
    const res = await crackHash(target, (attempts, candidate) => {
      if (runId.current !== id) return;
      setTried(attempts);
      setCurrent(candidate);
    });
    if (runId.current !== id) return;
    if (res.status === "cracked") {
      setResult({ plaintext: res.plaintext, attempts: res.attempts, ms: res.ms });
      setPhase("cracked");
    } else if (res.status === "exhausted") {
      setResult({ attempts: res.attempts, ms: res.ms });
      setPhase("exhausted");
    } else {
      setPhase("unknown");
    }
  }

  return (
    <div
      className="mt-5 rounded-lg border p-5 sm:p-6"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-raised)" }}
    >
      <p className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--color-accent-bright)" }}>
        Live demo &middot; runs entirely in your browser
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* Step 1: hash something yourself */}
        <div>
          <p className="mb-2 font-mono text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-text-soft)" }}>
            1 &middot; Hash a word
          </p>
          <input
            value={ownWord}
            onChange={(e) => setOwnWord(e.target.value)}
            aria-label="Word to hash"
            className="w-full border px-3 py-2 font-mono text-sm"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
            placeholder="type any word"
          />
          <div className="mt-2 flex gap-1.5">
            {(["MD5", "SHA-1", "SHA-256"] as HashAlgo[]).map((a) => (
              <button
                key={a}
                onClick={() => setOwnAlgo(a)}
                className="border px-2 py-1 font-mono text-[0.68rem] transition-colors"
                style={{
                  borderColor: ownAlgo === a ? "var(--color-accent)" : "var(--color-border)",
                  backgroundColor: ownAlgo === a ? "var(--color-accent-wash)" : "transparent",
                  color: ownAlgo === a ? "var(--color-accent-bright)" : "var(--color-text-soft)",
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <p className="mt-2 truncate font-mono text-[0.68rem]" style={{ color: "var(--color-text-soft)" }} title={ownHash}>
            {ownHash || "…"}
          </p>
          <button
            onClick={() => ownHash && runCrack(ownHash)}
            disabled={!ownHash}
            className="mt-2 w-full border-2 py-1.5 font-mono text-xs font-semibold tracking-wide uppercase transition-colors disabled:opacity-40"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
          >
            Send to cracker &darr;
          </button>
        </div>

        <div className="hidden w-px lg:block" style={{ backgroundColor: "var(--color-border)" }} />

        {/* Step 2: identify + crack */}
        <div>
          <p className="mb-2 font-mono text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-text-soft)" }}>
            2 &middot; Identify &amp; crack
          </p>
          <div className="flex gap-1.5">
            <input
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              aria-label="Hash to identify and crack"
              placeholder="paste a hash, or try a sample below"
              className="min-w-0 flex-1 border px-3 py-2 font-mono text-xs"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
            />
            <button
              onClick={() => hashInput && runCrack(hashInput)}
              className="shrink-0 rounded-md px-3 py-2 font-mono text-xs font-semibold tracking-wide uppercase"
              style={{ backgroundColor: "var(--color-accent)", color: "#0a0a12" }}
            >
              Run
            </button>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESETS.map((p, i) =>
              presetHashes[i] ? (
                <button
                  key={p.algo}
                  onClick={() => runCrack(presetHashes[i])}
                  className="border px-2 py-1 font-mono text-[0.65rem] tracking-wide uppercase"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-soft)" }}
                >
                  sample {p.algo}
                </button>
              ) : null,
            )}
          </div>

          <div
            className="mt-3 min-h-[6.5rem] rounded-md border p-3 font-mono text-[0.72rem] leading-relaxed"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-sunken)", color: "var(--color-text)" }}
          >
            {phase === "idle" && <p style={{ opacity: 0.55 }}>awaiting input…</p>}
            {phase === "unknown" && <p>format not recognized (expected 32 / 40 / 64 hex chars)</p>}
            {phase !== "idle" && phase !== "unknown" && (
              <>
                <p>algorithm detected: {algo}</p>
                <p style={{ opacity: 0.7 }}>target: {hashInput.slice(0, 28)}{hashInput.length > 28 ? "…" : ""}</p>
                {phase === "cracking" && (
                  <p className="mt-1.5">
                    trying candidate #{tried}: <span style={{ color: "var(--color-tag-amber)" }}>{current}</span>
                  </p>
                )}
                {phase === "cracked" && result && (
                  <p className="mt-1.5">
                    ✓ match found after {result.attempts} attempts ({result.ms.toFixed(0)}ms) → plaintext ={" "}
                    <strong style={{ color: "var(--color-tag-green)" }}>{result.plaintext}</strong>
                  </p>
                )}
                {phase === "exhausted" && result && (
                  <p className="mt-1.5">
                    ✕ not in the {result.attempts}-word demo list — a real attack would try millions more
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
        This is why fast, unsalted hashes (MD5, SHA&#8209;1) are unsafe for passwords: identical input always
        produces the identical digest, so an attacker just hashes a dictionary and compares. bcrypt and Argon2
        defeat this by being deliberately slow and salted — HashRecon's real CLI reports that distinction instead
        of attempting to crack them.
      </p>
    </div>
  );
}
