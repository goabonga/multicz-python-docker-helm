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
