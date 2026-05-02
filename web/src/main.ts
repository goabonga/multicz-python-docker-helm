import { VERSION } from "./version.ts";

const app = document.querySelector<HTMLElement>("#app");
if (!app) {
  throw new Error("missing #app mount point");
}

app.innerHTML = `
  <h1>multicz demo</h1>
  <p>web <span class="version" data-testid="web-version">v${VERSION}</span></p>
  <p>
    Try fetching the api: <code>curl http://localhost:8000/version</code>
  </p>
  <p id="api-version" class="version" aria-busy="true">
    api: <em>loading…</em>
  </p>
  <section id="api-status" aria-busy="true">
    <h2>API status</h2>
    <p><em>loading…</em></p>
  </section>
`;

async function loadApiVersion(): Promise<void> {
  const target = document.querySelector<HTMLElement>("#api-version");
  if (!target) return;
  try {
    const response = await fetch("/api/version");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = (await response.json()) as { version: string };
    target.innerHTML = `api: <span data-testid="api-version">v${data.version}</span>`;
  } catch (err) {
    target.innerHTML = `api: <span class="error">unavailable (${String(err)})</span>`;
  } finally {
    target.removeAttribute("aria-busy");
  }
}

interface ApiStatus {
  healthy: boolean;
  uptime_s: number;
  version: string;
}

async function loadApiStatus(): Promise<void> {
  const target = document.querySelector<HTMLElement>("#api-status");
  if (!target) return;
  try {
    const response = await fetch("/api/status");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = (await response.json()) as ApiStatus;
    const healthIcon = data.healthy ? "✓ healthy" : "✗ degraded";
    target.innerHTML = `
      <h2>API status</h2>
      <ul>
        <li>${healthIcon} (v${data.version})</li>
        <li>uptime: ${data.uptime_s}s</li>
      </ul>
    `;
  } catch (err) {
    target.innerHTML = `
      <h2>API status</h2>
      <p class="error">unavailable (${String(err)})</p>
    `;
  } finally {
    target.removeAttribute("aria-busy");
  }
}

void loadApiVersion();
void loadApiStatus();
