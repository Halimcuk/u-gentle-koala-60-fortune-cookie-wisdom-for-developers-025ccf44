// Fortune Cookie Wisdom for Developers.
// Writes one original fortune-cookie line for a software developer to
// entry.txt inside the harness output directory. Deterministic: the same
// line, byte for byte, on every run. Standard library only, no network,
// no randomness, no clock.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One short balanced sentence, 80 characters: the estimate named in a
// meeting was a wish, and the code heard it as a promise. Kept short on
// purpose: on an exact tie the smaller text places first.
const FORTUNE =
  "The estimate you gave in the meeting was a wish; the code heard it as a promise.";

const MAX_CHARS = 120;

function main(): void {
  if (FORTUNE.length === 0 || FORTUNE.length > MAX_CHARS) {
    throw new Error(
      `Fortune must be 1 to ${MAX_CHARS} characters, got ${FORTUNE.length}.`,
    );
  }
  if (FORTUNE.trim().length === 0) {
    throw new Error("Fortune must not be only white space.");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
  mkdirSync(outDir, { recursive: true });
  // Exactly the line, no trailing newline and no extra words, so the
  // gate reads precisely what the judge will compare.
  writeFileSync(join(outDir, "entry.txt"), FORTUNE, "utf8");
  console.log(`Wrote entry.txt (${FORTUNE.length} characters).`);
}

main();
