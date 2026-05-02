import platform
import time
from functools import lru_cache
from importlib.metadata import PackageNotFoundError, version

from fastapi import FastAPI

app = FastAPI(title="multicz-demo")
_started_at = time.monotonic()


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
