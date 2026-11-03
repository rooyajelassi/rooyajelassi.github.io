import { md5 } from "./md5";
import { COMMON_PASSWORDS } from "./wordlist";

export type HashAlgo = "MD5" | "SHA-1" | "SHA-256" | "SHA-512" | "unknown";

export function detectAlgo(hash: string): HashAlgo {
  const clean = hash.trim().toLowerCase();
  if (!/^[0-9a-f]+$/.test(clean)) return "unknown";
  switch (clean.length) {
    case 32:
      return "MD5";
    case 40:
      return "SHA-1";
    case 64:
      return "SHA-256";
    case 128:
      return "SHA-512";
    default:
      return "unknown";
  }
}

async function digest(algo: HashAlgo, text: string): Promise<string> {
  if (algo === "MD5") return md5(text);
  const subtleName = algo === "SHA-1" ? "SHA-1" : algo === "SHA-256" ? "SHA-256" : "SHA-512";
  const bytes = new TextEncoder().encode(text);
  const out = await crypto.subtle.digest(subtleName, bytes);
  return Array.from(new Uint8Array(out))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashText(algo: HashAlgo, text: string): Promise<string> {
  return digest(algo, text);
}

export type CrackResult =
  | { status: "cracked"; plaintext: string; attempts: number; ms: number }
  | { status: "exhausted"; attempts: number; ms: number }
  | { status: "unknown-format" };

export async function crackHash(
  hash: string,
  onProgress?: (attempts: number, candidate: string) => void,
): Promise<CrackResult> {
  const algo = detectAlgo(hash);
  if (algo === "unknown") return { status: "unknown-format" };

  const target = hash.trim().toLowerCase();
  const start = performance.now();
  let attempts = 0;

  for (const candidate of COMMON_PASSWORDS) {
    attempts++;
    const digestHex = await digest(algo, candidate);
    if (attempts % 6 === 0) {
      onProgress?.(attempts, candidate);
      await new Promise((r) => setTimeout(r, 0));
    }
    if (digestHex === target) {
      onProgress?.(attempts, candidate);
      return { status: "cracked", plaintext: candidate, attempts, ms: performance.now() - start };
    }
  }

  return { status: "exhausted", attempts, ms: performance.now() - start };
}
