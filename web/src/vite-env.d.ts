/// <reference types="vite/client" />

// Runtime config injected by `<script src="/config.js">` (loaded
// before main.ts in index.html). In production the file comes from
// the helm ConfigMap mounted at /usr/share/nginx/html/config.js;
// locally `public/config.js` ships an empty default so vite dev
// and vite preview keep working without k8s in the loop.

interface AppConfig {
  readonly API_URL?: string;
}

declare global {
  interface Window {
    APP_CONFIG?: AppConfig;
  }
}

export {};
