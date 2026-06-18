"""GitHub release update checks for Mompy."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .version import APP_VERSION, LATEST_RELEASE_API_URL, RELEASES_URL


def _timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def version_parts(version: str) -> tuple[int, ...]:
    clean = (version or "").strip().lower().removeprefix("v")
    parts: list[int] = []

    for item in clean.split("."):
        digits = "".join(char for char in item if char.isdigit())
        parts.append(int(digits or "0"))

    return tuple(parts or [0])


def is_newer_version(latest: str, current: str = APP_VERSION) -> bool:
    latest_parts = version_parts(latest)
    current_parts = version_parts(current)
    width = max(len(latest_parts), len(current_parts))
    latest_parts += (0,) * (width - len(latest_parts))
    current_parts += (0,) * (width - len(current_parts))
    return latest_parts > current_parts


def _find_windows_installer(assets: list[dict]) -> str | None:
    for asset in assets:
        name = str(asset.get("name", "")).lower()
        if name.endswith(".exe") and "setup" in name:
            return asset.get("browser_download_url")
    return None


def check_for_updates(timeout: float = 3.0) -> dict:
    base = {
        "current_version": APP_VERSION,
        "latest_version": APP_VERSION,
        "update_available": False,
        "release_url": RELEASES_URL,
        "download_url": None,
        "checked_at": _timestamp(),
        "error": None,
    }

    request = Request(
        LATEST_RELEASE_API_URL,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": f"Mompy/{APP_VERSION}",
        },
    )

    try:
        with urlopen(request, timeout=timeout) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as error:
        base["error"] = str(error)
        return base

    latest_version = str(payload.get("tag_name") or APP_VERSION).strip()
    assets = payload.get("assets", [])
    if not isinstance(assets, list):
        assets = []

    base.update(
        {
            "latest_version": latest_version,
            "update_available": is_newer_version(latest_version),
            "release_url": payload.get("html_url") or RELEASES_URL,
            "download_url": _find_windows_installer(assets),
        }
    )
    return base
