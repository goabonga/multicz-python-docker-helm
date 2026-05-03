import { Given, Then, When } from "@cucumber/cucumber";
import { strict as assert } from "node:assert";

import { HomePage } from "../pages/home.page.ts";
import type { PlaywrightWorld } from "../support/world.ts";

const SEMVER = /^v\d+\.\d+\.\d+/;

Given("I open the home page", async function (this: PlaywrightWorld) {
  if (!this.page) throw new Error("page not initialised — check hooks.ts");
  this.home = new HomePage(this.page);
  await this.home.goto(this.baseUrl);
});

Then(
  "the web version badge shows a semver string",
  async function (this: PlaywrightWorld) {
    if (!this.home) throw new Error("home page not initialised");
    const text = (await this.home.webVersion())?.trim() ?? "";
    assert.match(text, SEMVER, `web version "${text}" doesn't look like vX.Y.Z`);
  },
);

When(
  "the api version finishes loading",
  async function (this: PlaywrightWorld) {
    if (!this.home) throw new Error("home page not initialised");
    await this.home.waitForApiVersion();
  },
);

Then(
  "the api version badge shows a semver string",
  async function (this: PlaywrightWorld) {
    if (!this.home) throw new Error("home page not initialised");
    const text = (await this.home.apiVersion())?.trim() ?? "";
    assert.match(text, SEMVER, `api version "${text}" doesn't look like vX.Y.Z`);
  },
);
