"""Step definitions for the api BDD suite.

Uses `requests` for HTTP — picked over httpx because the test
target is the running api (no async fixture needed) and behave's
sync runtime maps cleanly to a sync HTTP client.
"""

from __future__ import annotations

import json
import re

import requests
from behave import given, then, when

SEMVER = re.compile(r"^\d+\.\d+\.\d+")


@given("the api is reachable")
def step_api_reachable(context):  # type: ignore[no-untyped-def]
    response = requests.get(f"{context.base_url}/health", timeout=5)
    assert response.status_code == 200, (
        f"/health returned {response.status_code}, expected 200"
    )
    assert response.json() == {"status": "ok"}


@when('I GET "{path}"')
def step_get(context, path):  # type: ignore[no-untyped-def]
    context.response = requests.get(f"{context.base_url}{path}", timeout=5)


@then("the response status is {expected:d}")
def step_status(context, expected):  # type: ignore[no-untyped-def]
    actual = context.response.status_code
    assert actual == expected, f"expected status {expected}, got {actual}"


@then('the JSON field "{field}" matches semver')
def step_field_semver(context, field):  # type: ignore[no-untyped-def]
    body = context.response.json()
    assert field in body, f"missing field {field!r} in {body}"
    value = str(body[field])
    assert SEMVER.match(value), f"field {field!r}={value!r} doesn't match semver"


@then('the JSON field "{field}" equals {expected}')
def step_field_equals(context, field, expected):  # type: ignore[no-untyped-def]
    # `expected` is captured raw (e.g. `true`, `"multicz-demo"`).
    # Round-trip it through json.loads so booleans / numbers / strings
    # decode predictably.
    expected_value = json.loads(expected)
    body = context.response.json()
    assert field in body, f"missing field {field!r} in {body}"
    assert body[field] == expected_value, (
        f"field {field!r}: expected {expected_value!r}, got {body[field]!r}"
    )


@then('the JSON field "{field}" is a non-negative integer')
def step_field_non_negative_int(context, field):  # type: ignore[no-untyped-def]
    body = context.response.json()
    assert field in body, f"missing field {field!r} in {body}"
    value = body[field]
    assert isinstance(value, int) and value >= 0, (
        f"field {field!r}={value!r} is not a non-negative integer"
    )
