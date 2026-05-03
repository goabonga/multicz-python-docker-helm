import type { Page } from "playwright";

// Page Object for the demo home page. Encapsulates locators so the
// step definitions stay readable; if main.ts moves the testids, the
// fix is here, not strewn through the steps.
export class HomePage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  }

  async webVersion(): Promise<string | null> {
    return this.page
      .locator('[data-testid="web-version"]')
      .textContent();
  }

  async waitForApiVersion(timeoutMs = 10_000): Promise<void> {
    await this.page
      .locator('[data-testid="api-version"]')
      .waitFor({ state: "visible", timeout: timeoutMs });
  }

  async apiVersion(): Promise<string | null> {
    return this.page
      .locator('[data-testid="api-version"]')
      .textContent();
  }
}
