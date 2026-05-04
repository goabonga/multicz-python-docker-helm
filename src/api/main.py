import os
import platform
import time
from functools import lru_cache
from importlib.metadata import PackageNotFoundError, version

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="multicz-demo")
_started_at = time.monotonic()

# CORS — allow the cross-origin browser fetches the SPA does when
# the web frontend is built with VITE_API_URL pointed at a different
# host (e.g. api.myapp.local). Origins are read from CORS_ORIGINS
# (comma-separated) so production can pin to specific URLs; default
# `*` is fine for the demo.
_cors_origins = os.environ.get("CORS_ORIGINS", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _cors_origins.split(",") if o.strip()],
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def _security_headers(request, call_next):  # type: ignore[no-untyped-def]
    """Attach cross-origin headers the SPA's COEP requires.

    With the web nginx config setting
    `Cross-Origin-Embedder-Policy: require-corp`, every cross-origin
    resource the SPA loads (including this api's JSON responses)
    must carry a `Cross-Origin-Resource-Policy` header explicitly
    granting the embed. `cross-origin` is the most permissive value
    and matches the demo's CORS allow-all default.

    Also sends `X-Content-Type-Options: nosniff` so browsers respect
    our `application/json` content type and don't sniff the body.
    """
    response = await call_next(request)
    response.headers["Cross-Origin-Resource-Policy"] = "cross-origin"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@lru_cache(maxsize=1)
def _app_version() -> str:
    try:
        return version("api")
    except PackageNotFoundError:
        return "unknown"


@app.get("/")
def root() -> dict[str, str]:
    return {"hello": "multicz"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/ping")
def ping() -> dict[str, str]:
    """Liveness probe with a tiny round-trip token.

    Distinct from /health: /ping is meant for L4/L7 keepalive checks
    and intentionally avoids any computation, so a hung dependency
    can't drag down the readiness signal.
    """
    return {"pong": "ok"}


@app.get("/version")
def get_version() -> dict[str, str]:
    return {"version": _app_version()}


@app.get("/info")
def info() -> dict[str, str]:
    return {
        "name": app.title,
        "version": _app_version(),
        "python": platform.python_version(),
        "platform": platform.platform(terse=True),
    }


@app.get("/status")
def status() -> dict[str, str | bool | int]:
    return {
        "healthy": True,
        "uptime_s": int(time.monotonic() - _started_at),
        "version": _app_version(),
    }
