# Changelog

All notable changes to this component are documented here.

## [0.4.2] - 2026-05-04

### Dependencies

- chart-web now ships the web image at `0.9.0`

## [0.4.1] - 2026-05-03

### Fixes

- **security**: externalize CSS to drop CSP unsafe-inline + handle remaining ZAP findings (`1ea7916`)

### Dependencies

- Track `web` `0.8.1`

## [0.4.0] - 2026-05-03

### Features

- **security**: scope-split ZAP rule overrides + helm-templated CSP (`69330dd`)

### Fixes

- **web**: swap no-store for private+revalidate to drop ZAP 10049 (`5a276b5`)

### Dependencies

- Track `web` `0.8.0`

## [0.3.1] - 2026-05-03

### Dependencies

- Track `web` `0.7.0`

## [0.3.0] - 2026-05-03

### Features

- **chart-web**: runtime SPA config via ConfigMap-rendered window.APP_CONFIG (`c51fafe`)

### Dependencies

- Track `web` `0.6.0`

## [0.2.0] - 2026-05-03

### Features

- switch api and web base images to chainguard distroless (`fb7e97e`)

### Fixes

- set CPU + memory limits/requests on api and web charts (`6d64d22`)
- **charts**: harden api+web pods to clear all checkov findings (`4d57d96`)
- **chart-web**: mount the writable paths chainguard nginx actually uses (`084b4a7`)

### Dependencies

- Track `web` `0.5.0`

## [0.1.0] - 2026-05-02

### Features

- **chart-web**: add optional networking.k8s.io/v1 Ingress (`fd23722`)

## [0.0.4] - 2026-05-02

### Dependencies

- Track `web` `0.4.0`

## [0.0.3] - 2026-05-02

### Dependencies

- Track `web` `0.3.0`

## [0.0.2] - 2026-05-02

### Dependencies

- Track `web` `0.2.0`

## [0.0.1] - 2026-05-02

### Fixes

- **chart-web**: align appVersion to 0.1.0 after web rebase (`735833e`)
