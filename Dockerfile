# Build stage: chainguard's python *-dev tag has a shell, apk, and pip
# alongside python — same Python ABI as the runtime tag below, so the
# site-packages copy is binary-compatible.
FROM cgr.dev/chainguard/python:latest-dev AS build

USER root
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1

COPY --from=ghcr.io/astral-sh/uv:0.8 /uv /usr/local/bin/uv

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY src/ ./src/
RUN uv sync --frozen --no-dev


# Runtime: distroless. No shell, no package manager, runs as a fixed
# nonroot UID (65532) — satisfies the runAsNonRoot / high-UID checkov
# rules out of the box. Site-packages are copied from the build venv
# instead of the whole .venv because the venv's bin/python symlinks
# point at the builder's absolute path; chainguard's python on PATH
# replaces it. The build and runtime tags share the same Python ABI
# since both come from chainguard's python image at the same time.
FROM cgr.dev/chainguard/python:latest AS runtime

WORKDIR /app

ENV PYTHONPATH="/app/site-packages:/app/src" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# The site-packages glob takes whichever python3.X directory the venv
# was built against — keeps this Dockerfile working when chainguard's
# `:latest` rolls forward to a newer python without touching the path.
COPY --from=build /app/.venv/lib/python*/site-packages /app/site-packages
COPY --from=build /app/src /app/src

EXPOSE 8000

ENTRYPOINT ["python", "-m", "uvicorn"]
CMD ["api.main:app", "--host", "0.0.0.0", "--port", "8000"]
