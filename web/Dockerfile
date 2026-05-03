FROM node:24-alpine AS build

# Build-time api endpoint for the SPA. Vite reads VITE_* env vars
# at build and inlines them into the bundle. Default empty falls
# back to "/api" inside main.ts. Pass with:
#
#   docker build --build-arg VITE_API_URL=https://api.example.com .
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json vite.config.ts index.html ./
COPY src/ ./src/
COPY scripts/ ./scripts/
RUN npm run build

# Distroless nginx — runs as nonroot UID 65532, no shell, no package
# manager. Default config listens on port 8080 (binding to <1024
# requires root, which the image doesn't have). Webroot stays at
# /usr/share/nginx/html so the build copy is unchanged.
FROM cgr.dev/chainguard/nginx:latest AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
