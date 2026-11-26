// news-image-20261126 — "THE WORLD IN ONE DAY"
// A newspaper front page summing up Thursday 26 November 2026.
//
// The entry image (entry.png, kept beside this file) is written into
// the grader's output directory unchanged. The program only uses the
// Node standard library, touches no network, and reads no clock or
// random source, so every run writes exactly the same bytes.
//
// The folder holding this script comes from process.argv[1] (the path
// of the script being run). That works under both CommonJS and ESM,
// where __dirname is not defined.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// The eight-byte PNG signature. Checking it here keeps a damaged or
// misnamed entry.png from ever reaching the grader as entry.png.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(resolve(process.argv[1]));
const image = readFileSync(join(here, "entry.png"));

if (image.length === 0 || !image.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is missing, empty, or not a PNG file");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), image);
