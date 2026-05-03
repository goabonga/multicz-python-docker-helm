"""behave hooks — wires the BASE_URL env var into the test context.

The same suite runs against any reachable api: pytest dev server,
docker-run container, kind ingress, staging, etc. — change the env
var, no code edits.
"""

from __future__ import annotations

import os


def before_all(context: object) -> None:
    base_url = os.environ.get("BASE_URL", "http://localhost:8000")
    context.base_url = base_url.rstrip("/")  # type: ignore[attr-defined]
