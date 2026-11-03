import { useRef, useState } from "react";

type Stage = "idle" | "encrypting" | "encrypted" | "decrypted";

const STEPS = ["Recon", "Deploy", "Encrypt (AES-256)", "Wrap key (RSA-2048)", "Ransom note"];

function toHex(buf: ArrayBuffer, max = 64): string {
  const bytes = Array.from(new Uint8Array(buf));
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex.length > max ? hex.slice(0, max) + "…" : hex;
}

export function RansomwareDemo() {
  const [plaintext, setPlaintext] = useState("These are the Q3 pentest findings — do not lose this file.");
  const [stage, setStage] = useState<Stage>("idle");
  const [ciphertextHex, setCiphertextHex] = useState("");
  const [wrappedKeyHex, setWrappedKeyHex] = useState("");
  const [recovered, setRecovered] = useState("");

  const keysRef = useRef({
    rsaPriv: null as CryptoKey | null,
    iv: null as Uint8Array | null,
    cipherBuf: null as ArrayBuffer | null,
    wrappedKeyBuf: null as ArrayBuffer | null,
  }).current;

  async function encrypt() {
    setStage("encrypting");
    const aesKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
    const rsaPair = await crypto.subtle.generateKey(
      { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true,
      ["encrypt", "decrypt"],
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipherBuf = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      aesKey,
      new TextEncoder().encode(plaintext),
    );
    const rawAes = await crypto.subtle.exportKey("raw", aesKey);
    const wrappedKeyBuf = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, rsaPair.publicKey, rawAes);

    keysRef.rsaPriv = rsaPair.privateKey;
    keysRef.iv = iv;
    keysRef.cipherBuf = cipherBuf;
    keysRef.wrappedKeyBuf = wrappedKeyBuf;

    setCiphertextHex(toHex(cipherBuf));
    setWrappedKeyHex(toHex(wrappedKeyBuf));
    setRecovered("");
    setStage("encrypted");
  }

  async function decrypt() {
    if (!keysRef.rsaPriv || !keysRef.cipherBuf || !keysRef.iv || !keysRef.wrappedKeyBuf) return;
    const rawAes = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, keysRef.rsaPriv, keysRef.wrappedKeyBuf);
    const aesKey = await crypto.subtle.importKey("raw", rawAes, { name: "AES-GCM" }, false, ["decrypt"]);
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: keysRef.iv as BufferSource },
      aesKey,
      keysRef.cipherBuf,
    );
    setRecovered(new TextDecoder().decode(plainBuf));
    setStage("decrypted");
  }

  const stepIndex = stage === "idle" ? -1 : stage === "encrypting" ? 2 : 4;

  return (
    <div className="mt-5 rounded-lg border p-5 sm:p-6" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-raised)" }}>
      <p className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--color-accent)" }}>
        Live demo &middot; Web Crypto, in your browser only &middot; nothing leaves this tab
      </p>

      <ol className="mt-4 flex flex-wrap gap-x-1 gap-y-2 font-mono text-[0.65rem] tracking-wide uppercase">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-1 px-2 py-1"
            style={{
              color: i <= stepIndex ? "var(--color-bg)" : "var(--color-text-soft)",
              backgroundColor: i <= stepIndex ? "var(--color-accent)" : "transparent",
              border: i <= stepIndex ? "none" : "1px solid var(--color-border)",
            }}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-mono text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-text-soft)" }}>
            Sample file contents (yours — type anything)
          </label>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            aria-label="Sample file contents to encrypt"
            rows={3}
            disabled={stage === "encrypted" || stage === "decrypted"}
            className="w-full resize-none border p-2.5 font-mono text-xs"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={encrypt}
              disabled={stage === "encrypting"}
              className="rounded-md px-3 py-2 font-mono text-xs font-semibold tracking-wide uppercase disabled:opacity-50"
              style={{ backgroundColor: "var(--color-accent)", color: "#0a0a12" }}
            >
              {stage === "encrypting" ? "Encrypting…" : "Simulate attack"}
            </button>
            {(stage === "encrypted" || stage === "decrypted") && (
              <button
                onClick={decrypt}
                className="border-2 px-3 py-2 font-mono text-xs font-semibold tracking-wide uppercase"
                style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
              >
                Recover with key
              </button>
            )}
          </div>
        </div>

        <div
          className="rounded-md border p-3 font-mono text-[0.68rem] leading-relaxed break-all"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-sunken)", color: "var(--color-text)", minHeight: "8.5rem" }}
        >
          {stage === "idle" && <p style={{ opacity: 0.55 }}>ciphertext will appear here…</p>}
          {stage === "encrypting" && <p style={{ opacity: 0.7 }}>generating AES-256 + RSA-2048 keypair…</p>}
          {(stage === "encrypted" || stage === "decrypted") && (
            <>
              <p style={{ color: "var(--color-tag-amber)" }}>YOUR FILES HAVE BEEN ENCRYPTED.</p>
              <p className="mt-1 opacity-80">AES-256-GCM ciphertext:</p>
              <p className="opacity-90">{ciphertextHex}</p>
              <p className="mt-1.5 opacity-80">AES key, wrapped under RSA-2048-OAEP (attacker-held):</p>
              <p className="opacity-90">{wrappedKeyHex}</p>
              {stage === "decrypted" && (
                <>
                  <p className="mt-2 opacity-80">recovered plaintext:</p>
                  <p style={{ color: "var(--color-tag-green)" }}>{recovered}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
        The real project runs this full kill chain — including a Flask HTTPS C2 server — only inside an
        air-gapped VirtualBox lab, TTPs mapped to MITRE ATT&amp;CK. This panel keeps both keys in your own
        browser memory so you can see the whole round trip; a real attacker only ever gives you the lock, not
        the key.
      </p>
    </div>
  );
}
