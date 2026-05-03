import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";

import type { HomePage } from "../pages/home.page.ts";

// Each cucumber Scenario gets a fresh World. We hang the Playwright
// browser/context/page off it (populated in hooks.ts) plus the
// chosen baseUrl so steps can navigate without rewiring env reads.
//
// BASE_URL is read once at construction so the suite can be re-run
// against a different target by changing the env var (vite preview,
// kind ingress, staging, …) without recompiling.
export class PlaywrightWorld extends World {
  baseUrl: string;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  home?: HomePage;

  constructor(options: IWorldOptions) {
    super(options);
    this.baseUrl = process.env.BASE_URL ?? "http://localhost:5173";
  }
}

setWorldConstructor(PlaywrightWorld);
