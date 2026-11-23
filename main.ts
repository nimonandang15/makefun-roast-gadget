import * as fs from "node:fs";

// A one-line roast of the gadget used every day: the smartwatch.
// Structure: setup (the watch celebrates a trivial win — standing up),
// reversal (you undo it ten seconds later), punchline (the watch is a
// personal trainer so fed up it now charges by the sigh).
const text =
  "My smartwatch congratulates me for standing up, then watches me sit straight back down like a personal trainer billing me by the sigh.";

// Gate: the competition requires /output/entry.txt to be UTF-8 text of
// 1–200 characters, not only whitespace. Count code points (not UTF-16
// code units) so astral characters count once, and reject multi-line
// text outright — a roast is one line.
const length = [...text].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1–200 characters, got ${length}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (/[\r\n]/.test(text)) {
  throw new Error("entry must be a single line");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", text, "utf8");
