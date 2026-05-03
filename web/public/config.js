// Default runtime config — bundled into the docker image.
// Helm overrides this in production by mounting a ConfigMap at
// /usr/share/nginx/html/config.js (subPath, single-file mount).
// Empty values mean main.ts falls back to its own defaults.
window.APP_CONFIG = {
  API_URL: "",
};
