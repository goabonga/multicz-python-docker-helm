FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json vite.config.ts index.html ./
COPY src/ ./src/
COPY scripts/ ./scripts/
# vite copies public/ verbatim into dist/ — that's where the
# placeholder config.js lives until helm overrides it at runtime.
COPY public/ ./public/
RUN npm run build

# Distroless nginx — runs as nonroot UID 65532, no shell, no package
# manager. Default config listens on port 8080 (binding to <1024
# requires root, which the image doesn't have). Webroot stays at
# /usr/share/nginx/html so the build copy is unchanged.
FROM cgr.dev/chainguard/nginx:latest AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
