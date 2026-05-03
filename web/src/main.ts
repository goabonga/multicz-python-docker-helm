import { VERSION } from "./version.ts";

// Where the SPA hits the api. Provided at runtime by /config.js,
// which is loaded as a plain (non-module) script ahead of this
// module in index.html. In the demo's kind deployment that file is
// rendered into the helm ConfigMap from `myapp-web.config.apiUrl`
// and mounted over /usr/share/nginx/html/config.js — change the
// value, restart the pod, no rebuild. Local `vite dev` / preview
// uses `public/config.js`'s empty default and falls through to
// the same-origin `/api` path.
const API_URL = window.APP_CONFIG?.API_URL || "/api";

const app = document.querySelector<HTMLElement>("#app");
if (!app) {
  throw new Error("missing #app mount point");
}

// DOM helper — text content goes through `textContent` rather than
// being parsed as HTML, which is what `eslint-plugin-no-unsanitized`
// asks us to do. Safer than `el.innerHTML = `${userInput}`` even
// when the input is currently trusted.
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    node.setAttribute(k, v);
  }
  for (const c of children) {
    node.append(c);
  }
  return node;
}

const initialApiVersion = el(
  "p",
  { id: "api-version", class: "version", "aria-busy": "true" },
  ["api: ", el("em", {}, ["loading…"])],
);

const initialApiStatus = el(
  "section",
  { id: "api-status", "aria-busy": "true" },
  [el("h2", {}, ["API status"]), el("p", {}, [el("em", {}, ["loading…"])])],
);

app.replaceChildren(
  el("h1", {}, ["multicz demo"]),
  el("p", {}, [
    "web ",
    el(
      "span",
      { class: "version", "data-testid": "web-version" },
      [`v${VERSION}`],
    ),
  ]),
  el("p", {}, [
    "Try fetching the api: ",
    el("code", {}, ["curl http://localhost:8000/version"]),
  ]),
  initialApiVersion,
  initialApiStatus,
);

async function loadApiVersion(): Promise<void> {
  const target = document.querySelector<HTMLElement>("#api-version");
  if (!target) return;
  try {
    const response = await fetch(`${API_URL}/version`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = (await response.json()) as { version: string };
    target.replaceChildren(
      "api: ",
      el(
        "span",
        { "data-testid": "api-version" },
        [`v${data.version}`],
      ),
    );
  } catch (err) {
    target.replaceChildren(
      "api: ",
      el("span", { class: "error" }, [`unavailable (${String(err)})`]),
    );
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
    const response = await fetch(`${API_URL}/status`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = (await response.json()) as ApiStatus;
    const healthIcon = data.healthy ? "✓ healthy" : "✗ degraded";
    target.replaceChildren(
      el("h2", {}, ["API status"]),
      el("ul", {}, [
        el("li", {}, [`${healthIcon} (v${data.version})`]),
        el("li", {}, [`uptime: ${data.uptime_s}s`]),
      ]),
    );
  } catch (err) {
    target.replaceChildren(
      el("h2", {}, ["API status"]),
      el("p", { class: "error" }, [`unavailable (${String(err)})`]),
    );
  } finally {
    target.removeAttribute("aria-busy");
  }
}

void loadApiVersion();
void loadApiStatus();
