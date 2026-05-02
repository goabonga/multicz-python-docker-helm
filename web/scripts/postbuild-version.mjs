// Emits dist/version.json so the running site exposes a stable
// machine-readable version endpoint (used by the release pipeline's
// smoke test). Reads the version from package.json, which multicz
// bumps in lockstep with src/version.ts.

import { readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
writeFileSync(
  "dist/version.json",
  JSON.stringify({ version: pkg.version }) + "\n",
);
console.log(`wrote dist/version.json (version=${pkg.version})`);
