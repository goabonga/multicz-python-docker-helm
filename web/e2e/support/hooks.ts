import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { type Browser, chromium } from "playwright";

import type { PlaywrightWorld } from "./world.ts";

// One Browser shared across the suite (cheap reuse). Each Scenario
// gets a fresh BrowserContext + Page — equivalent to a clean
// incognito session, so cookies / localStorage don't bleed.
let sharedBrowser: Browser;

BeforeAll(async () => {
  sharedBrowser = await chromium.launch({ headless: true });
});

AfterAll(async () => {
  await sharedBrowser?.close();
});

Before(async function (this: PlaywrightWorld) {
  this.browser = sharedBrowser;
  this.context = await sharedBrowser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: PlaywrightWorld) {
  await this.context?.close();
});
