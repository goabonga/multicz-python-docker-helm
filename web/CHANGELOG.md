# Changelog

All notable changes to this component are documented here.

## [0.8.0] - 2026-05-03

### Features

- **security**: scope-split ZAP rule overrides + helm-templated CSP (`69330dd`)

### Fixes

- **web**: swap no-store for private+revalidate to drop ZAP 10049 (`5a276b5`)

## [0.7.0] - 2026-05-03

### Features

- **security**: close ZAP baseline web findings + api CORP for COEP (`b753b1e`)

## [0.6.0] - 2026-05-03

### Features

- **web**: cucumber + playwright e2e suite, runnable against any BASE_URL (`f30a4d2`)
- cross-origin api fetch wired via VITE_API_URL build-arg + CORS (`43ed2d0`)
- **chart-web**: runtime SPA config via ConfigMap-rendered window.APP_CONFIG (`c51fafe`)

## [0.5.0] - 2026-05-03

### Features

- switch api and web base images to chainguard distroless (`fb7e97e`)

## [0.4.0] - 2026-05-02

### Features

- cross-stack /status endpoint and live status panel (`d45e744`)

## [0.3.0] - 2026-05-02

### Features

- **web**: show live api version next to the embedded web version (`1bbc557`)

## [0.2.0] - 2026-05-02

### Features

- **release**: kind smoke test gates the push (`7821913`)

### Fixes

- **web**: copy scripts/ into the build stage (`a552a8b`)

## [0.1.0] - 2026-05-02

### Features

- **web**: scaffold vanilla TypeScript frontend with Docker delivery (`08a4fe0`)
