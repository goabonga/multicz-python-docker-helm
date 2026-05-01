from fastapi import FastAPI

app = FastAPI(title="multicz-demo")


@app.get("/")
def root() -> dict[str, str]:
    return {"hello": "multicz"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
