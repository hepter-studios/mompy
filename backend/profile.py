"""Local user profile helpers."""

from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
from pathlib import Path

from .storage import read_json, resolve_data_path, write_json


PROFILE_PATH = resolve_data_path("profile.json")
DEFAULT_PROFILE = {
    "name": "Guest",
    "created_at": None,
    "last_seen_at": None,
    "settings": {
        "music_enabled": True,
        "sfx_enabled": True,
        "music_volume": 0.10,
        "sfx_volume": 0.45,
    },
}


def _timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def _clean_name(name: str) -> str:
    clean = " ".join((name or "").strip().split())
    if not clean:
        return DEFAULT_PROFILE["name"]
    return clean[:24]


def load_profile(path: Path = PROFILE_PATH) -> dict:
    profile = read_json(path, deepcopy(DEFAULT_PROFILE))
    if not isinstance(profile, dict):
        profile = deepcopy(DEFAULT_PROFILE)
    merged = deepcopy(DEFAULT_PROFILE)
    merged.update(profile)
    merged["name"] = _clean_name(str(merged.get("name", "")))
    settings = deepcopy(DEFAULT_PROFILE["settings"])
    if isinstance(profile.get("settings"), dict):
        settings.update(profile["settings"])
    merged["settings"] = settings
    return merged


def save_profile(profile: dict, path: Path = PROFILE_PATH) -> dict:
    if not isinstance(profile, dict):
        profile = {}

    current = load_profile(path)
    current_settings = current.get("settings", {})
    incoming_settings = profile.get("settings")
    current.update({key: value for key, value in profile.items() if key != "settings"})

    settings = deepcopy(DEFAULT_PROFILE["settings"])
    if isinstance(current_settings, dict):
        settings.update(current_settings)
    if isinstance(incoming_settings, dict):
        settings.update(incoming_settings)
    current["settings"] = settings
    current["name"] = _clean_name(str(current.get("name", "")))
    if not current.get("created_at"):
        current["created_at"] = _timestamp()
    current["last_seen_at"] = _timestamp()
    write_json(path, current)
    return current


def logout_profile(path: Path = PROFILE_PATH) -> dict:
    profile = deepcopy(DEFAULT_PROFILE)
    profile["last_seen_at"] = _timestamp()
    write_json(path, profile)
    return load_profile(path)
