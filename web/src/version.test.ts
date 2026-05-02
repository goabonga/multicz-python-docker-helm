import { describe, expect, it } from "vitest";

import { VERSION } from "./version.ts";

describe("VERSION", () => {
  it("matches semver-ish X.Y.Z", () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });
});
