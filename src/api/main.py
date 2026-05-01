from functools import lru_cache
from importlib.metadata import PackageNotFoundError, version

from fastapi import FastAPI

app = FastAPI(title="multicz-demo")


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
