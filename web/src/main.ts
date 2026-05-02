import { VERSION } from "./version.ts";

const app = document.querySelector<HTMLElement>("#app");
if (!app) {
  throw new Error("missing #app mount point");
}

app.innerHTML = `
  <h1>multicz demo</h1>
  <p>web <span class="version">v${VERSION}</span></p>
  <p>
    Try fetching the api: <code>curl http://localhost:8000/version</code>
  </p>
`;
