from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


def test_root() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"hello": "multicz"}


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_version() -> None:
    response = client.get("/version")
    assert response.status_code == 200
    body = response.json()
    assert "version" in body
    # SemVer-ish or "unknown" if the package isn't installed yet.
    assert body["version"]


def test_info() -> None:
    response = client.get("/info")
    assert response.status_code == 200
    body = response.json()
    for key in ("name", "version", "python", "platform"):
        assert key in body, f"missing {key} in {body}"
    assert body["name"] == "multicz-demo"


def test_status() -> None:
    response = client.get("/status")
    assert response.status_code == 200
    body = response.json()
    assert body["healthy"] is True
    assert isinstance(body["uptime_s"], int) and body["uptime_s"] >= 0
    assert "version" in body
