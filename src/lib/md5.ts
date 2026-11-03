// Minimal RFC 1321 MD5 implementation (string -> lowercase hex digest).
// Web Crypto's SubtleCrypto deliberately does not implement MD5 — it's only
// included here because the demo needs to reproduce it as a *broken* example.

function rotl(x: number, c: number): number {
  return (x << c) | (x >>> (32 - c));
}

const K = new Int32Array([
  ...Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) | 0),
]);

const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14,
  20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6,
  10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

export function md5(input: string): string {
  const bytes = new TextEncoder().encode(input);
  const bitLen = bytes.length * 8;

  const withOne = new Uint8Array(((bytes.length + 8) >> 6) * 64 + 64);
  withOne.set(bytes);
  withOne[bytes.length] = 0x80;
  const view = new DataView(withOne.buffer);
  view.setUint32(withOne.length - 8, bitLen >>> 0, true);
  view.setUint32(withOne.length - 4, Math.floor(bitLen / 2 ** 32), true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let chunk = 0; chunk < withOne.length; chunk += 64) {
    const M = new Int32Array(16);
    for (let i = 0; i < 16; i++) {
      M[i] = view.getInt32(chunk + i * 4, true);
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F = 0;
      let g = 0;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F + A + K[i] + M[g]) | 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, S[i])) | 0;
    }

    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  const toHex = (n: number) => {
    const bytes4 = new Uint8Array(4);
    new DataView(bytes4.buffer).setInt32(0, n, true);
    return Array.from(bytes4)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}
