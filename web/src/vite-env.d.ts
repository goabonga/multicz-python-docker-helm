/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL the SPA points its api fetches at.
   * Injected at build time via `--build-arg VITE_API_URL=...` →
   * `ENV VITE_API_URL=...` in the Dockerfile. When unset (local
   * `vite dev` / vite preview without an api running) we fall
   * back to "/api" inside main.ts.
   */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
