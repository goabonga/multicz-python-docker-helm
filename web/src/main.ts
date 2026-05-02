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

void loadApiVersion();
