"""Progress management for Mompy."""

from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from pathlib import Path

from .missions import MISSIONS, MISSIONS_BY_ID, PLANNED_TOTAL_MISSIONS
from .storage import PROGRESS_PATH, read_json, write_json
from .xp import calculate_level


PROGRESS_SCHEMA_VERSION = 4

CONSISTENCY_ACHIEVEMENT_GOALS = {
    "steady_start": ("active_days", 2),
    "three_days_online": ("active_days", 3),
    "initial_sequence": ("activity_streak", 3),
    "code_week": ("active_days", 7),
    "always_on_week": ("activity_streak", 7),
    "frequent_operator": ("active_days", 14),
    "month_on_console": ("active_days", 30),
    "quarterly_signal": ("active_months", 3),
    "programming_semester": ("active_months", 6),
    "mompy_companion": ("active_months", 12),
}


def _empty_mission_stats() -> dict:
    return {
        "attempts": 0,
        "incorrect_attempts": 0,
        "hints_used": 0,
        "stars": 0,
        "completed_at": None,
        "migrated": False,
    }


def default_progress() -> dict:
    return {
        "schema_version": PROGRESS_SCHEMA_VERSION,
        "current_mission_index": 0,
        "completed_mission_ids": [],
        "completed_briefing_ids": [],
        "skipped_briefing_ids": [],
        "mission_stats": {},
        "current_streak": 0,
        "best_streak": 0,
        "active_dates": [],
        "achievements": [],
        "total_xp": 0,
        "planned_total_missions": PLANNED_TOTAL_MISSIONS,
        "last_updated_at": None,
    }


def _timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def _today() -> str:
    return datetime.now().astimezone().date().isoformat()


def _valid_activity_date(value: object) -> str | None:
    if not isinstance(value, str):
        return None
    try:
        return date.fromisoformat(value).isoformat()
    except ValueError:
        return None


def _record_active_day(progress: dict, active_date: str | None = None) -> bool:
    active_dates = progress.setdefault("active_dates", [])
    today = _valid_activity_date(active_date or _today())
    if today is None:
        raise ValueError("active_date must use YYYY-MM-DD")
    if today not in active_dates:
        active_dates.append(today)
        active_dates.sort()
        return True
    return False


def _activity_metrics(active_dates: object) -> dict[str, int]:
    values = active_dates if isinstance(active_dates, list) else []
    normalized_dates = sorted({
        valid
        for value in values
        if (valid := _valid_activity_date(value)) is not None
    })
    parsed_dates = [date.fromisoformat(value) for value in normalized_dates]
    longest_streak = 0
    running_streak = 0
    previous_date: date | None = None

    for active_date in parsed_dates:
        if previous_date is not None and active_date == previous_date + timedelta(days=1):
            running_streak += 1
        else:
            running_streak = 1
        longest_streak = max(longest_streak, running_streak)
        previous_date = active_date

    return {
        "active_days": len(parsed_dates),
        "activity_streak": longest_streak,
        "active_months": len({value[:7] for value in normalized_dates}),
    }


def _consistency_progress(progress: dict) -> dict[str, dict[str, int | str]]:
    metrics = _activity_metrics(progress.get("active_dates", []))
    return {
        achievement_id: {
            "current": min(metrics[metric], target),
            "target": target,
            "metric": metric,
        }
        for achievement_id, (metric, target) in CONSISTENCY_ACHIEVEMENT_GOALS.items()
    }


def _mission_xp(mission_id: str) -> int:
    mission = MISSIONS_BY_ID.get(mission_id)
    return mission.xp if mission else 0


def _safe_non_negative_int(value: object, default: int = 0) -> int:
    if isinstance(value, bool):
        return default
    try:
        return max(0, int(value))
    except (TypeError, ValueError):
        return default


def _clean_mission_stats(raw_stats: object, *, migrated: bool = False) -> dict:
    clean = _empty_mission_stats()
    if isinstance(raw_stats, dict):
        clean["attempts"] = _safe_non_negative_int(raw_stats.get("attempts"))
        clean["incorrect_attempts"] = min(
            clean["attempts"],
            _safe_non_negative_int(raw_stats.get("incorrect_attempts")),
        )
        clean["hints_used"] = _safe_non_negative_int(raw_stats.get("hints_used"))
        clean["stars"] = min(3, _safe_non_negative_int(raw_stats.get("stars")))
        clean["completed_at"] = raw_stats.get("completed_at")
        clean["migrated"] = bool(raw_stats.get("migrated", migrated))
    else:
        clean["migrated"] = migrated
    return clean


def _block_summary(progress: dict, block: int) -> dict:
    block_missions = [mission for mission in MISSIONS if mission.block == block]
    completed_ids = set(progress["completed_mission_ids"])
    stats = progress.get("mission_stats", {})
    completed = sum(mission.id in completed_ids for mission in block_missions)
    stars = sum(_safe_non_negative_int(stats.get(mission.id, {}).get("stars")) for mission in block_missions)
    return {
        "block": block,
        "completed": completed,
        "total": len(block_missions),
        "stars": stars,
        "max_stars": len(block_missions) * 3,
        "complete": bool(block_missions) and completed == len(block_missions),
    }


def _earned_achievements(progress: dict) -> list[str]:
    completed_ids = set(progress["completed_mission_ids"])
    completed = len(completed_ids)
    stats = progress.get("mission_stats", {})
    total_stars = sum(
        _safe_non_negative_int(item.get("stars"))
        for item in stats.values()
        if isinstance(item, dict)
    )
    best_streak = _safe_non_negative_int(progress.get("best_streak"))
    activity = _activity_metrics(progress.get("active_dates", []))
    active_days = activity["active_days"]
    activity_streak = activity["activity_streak"]
    active_months = activity["active_months"]

    def completed_through(count: int) -> bool:
        required = MISSIONS[:count]
        return bool(required) and all(mission.id in completed_ids for mission in required)

    achievements: list[str] = []
    if completed >= 1:
        achievements.append("first_mission")
    if completed >= 5:
        achievements.append("mission_five")
    if completed >= 10:
        achievements.append("mission_ten")
    if completed >= 20:
        achievements.append("halfway_hero")
    if completed >= 30:
        achievements.append("mission_thirty")
    if completed >= len(MISSIONS):
        achievements.append("path_complete")
    if any(_safe_non_negative_int(item.get("stars")) >= 3 for item in stats.values() if isinstance(item, dict)):
        achievements.append("perfect_mission")
    if total_stars >= 25:
        achievements.append("star_collector_25")
    if total_stars >= 60:
        achievements.append("star_collector_60")
    if total_stars >= 100:
        achievements.append("star_master_100")
    if completed_through(5):
        achievements.append("first_block")
    if completed_through(15):
        achievements.append("three_blocks")
    if completed_through(30):
        achievements.append("six_blocks")
    if best_streak >= 3:
        achievements.append("clean_streak_3")
    if best_streak >= 5:
        achievements.append("clean_streak_5")
    if best_streak >= 10:
        achievements.append("clean_streak_10")
    if active_days >= 2:
        achievements.append("steady_start")
    if active_days >= 3:
        achievements.append("three_days_online")
    if activity_streak >= 3:
        achievements.append("initial_sequence")
    if active_days >= 7:
        achievements.append("code_week")
    if activity_streak >= 7:
        achievements.append("always_on_week")
    if active_days >= 14:
        achievements.append("frequent_operator")
    if active_days >= 30:
        achievements.append("month_on_console")
    if active_months >= 3:
        achievements.append("quarterly_signal")
    if active_months >= 6:
        achievements.append("programming_semester")
    if active_months >= 12:
        achievements.append("mompy_companion")
    if active_days >= 7:
        achievements.append("returning_learner")
    if active_days >= 14:
        achievements.append("dedicated_learner")
    if active_days >= 30:
        achievements.append("veteran_learner")
    return achievements


def _sanitize_progress(progress: dict | None) -> dict:
    clean = default_progress()
    if not isinstance(progress, dict):
        return clean

    valid_ids = {mission.id for mission in MISSIONS}
    completed = progress.get("completed_mission_ids", [])
    if isinstance(completed, list):
        clean["completed_mission_ids"] = [
            mission_id for mission_id in dict.fromkeys(completed) if mission_id in valid_ids
        ]

    raw_stats = progress.get("mission_stats", {})
    if isinstance(raw_stats, dict):
        clean["mission_stats"] = {
            mission_id: _clean_mission_stats(stats)
            for mission_id, stats in raw_stats.items()
            if mission_id in valid_ids
        }

    # Existing saves predate attempt tracking. Preserve their completions and
    # assign one migration star without pretending we know past performance.
    for mission_id in clean["completed_mission_ids"]:
        if mission_id not in clean["mission_stats"]:
            migrated_stats = _empty_mission_stats()
            migrated_stats.update({"stars": 1, "migrated": True})
            clean["mission_stats"][mission_id] = migrated_stats
        elif clean["mission_stats"][mission_id]["stars"] < 1:
            clean["mission_stats"][mission_id]["stars"] = 1

    for key in ("completed_briefing_ids", "skipped_briefing_ids"):
        values = progress.get(key, [])
        if isinstance(values, list):
            clean[key] = [str(value) for value in dict.fromkeys(values)]

    active_dates = progress.get("active_dates", [])
    if isinstance(active_dates, list):
        clean["active_dates"] = sorted({
            valid
            for value in active_dates
            if (valid := _valid_activity_date(value)) is not None
        })

    index = progress.get("current_mission_index", 0)
    if isinstance(index, int):
        clean["current_mission_index"] = min(max(index, 0), max(0, len(MISSIONS) - 1))

    clean["current_streak"] = _safe_non_negative_int(progress.get("current_streak"))
    clean["best_streak"] = max(
        clean["current_streak"],
        _safe_non_negative_int(progress.get("best_streak")),
    )
    clean["achievements"] = _earned_achievements(clean)

    clean["total_xp"] = sum(_mission_xp(mission_id) for mission_id in clean["completed_mission_ids"])
    clean["last_updated_at"] = progress.get("last_updated_at")
    return clean


def _with_progress_metadata(progress: dict) -> dict:
    enriched = dict(progress)
    enriched["total_xp"] = sum(_mission_xp(mission_id) for mission_id in enriched["completed_mission_ids"])
    enriched["missions_completed"] = len(enriched["completed_mission_ids"])
    enriched["total_missions"] = PLANNED_TOTAL_MISSIONS
    enriched["planned_total_missions"] = PLANNED_TOTAL_MISSIONS
    enriched["level_info"] = calculate_level(enriched["total_xp"])
    enriched["total_attempts"] = sum(
        _safe_non_negative_int(stats.get("attempts"))
        for stats in enriched["mission_stats"].values()
    )
    enriched["total_stars"] = sum(
        _safe_non_negative_int(stats.get("stars"))
        for stats in enriched["mission_stats"].values()
    )
    enriched["max_stars"] = len(MISSIONS) * 3
    activity = _activity_metrics(enriched["active_dates"])
    enriched.update(activity)
    enriched["achievement_progress"] = _consistency_progress(enriched)
    enriched["block_progress"] = [
        _block_summary(enriched, block)
        for block in sorted({mission.block for mission in MISSIONS})
    ]
    return enriched


def load_progress(path: Path = PROGRESS_PATH) -> dict:
    progress = _sanitize_progress(read_json(path, default_progress()))
    return _with_progress_metadata(progress)


def record_app_open(
    path: Path = PROGRESS_PATH,
    *,
    active_date: str | None = None,
) -> dict:
    """Record one Mompy visit per local calendar day."""
    progress = load_progress(path)
    if _record_active_day(progress, active_date):
        progress["last_updated_at"] = _timestamp()
        progress["achievements"] = _earned_achievements(progress)
        save_progress(progress, path)
    return load_progress(path)


def save_progress(progress: dict, path: Path = PROGRESS_PATH) -> None:
    write_json(path, _sanitize_progress(progress))


def set_current_mission_index(index: int, path: Path = PROGRESS_PATH) -> dict:
    progress = load_progress(path)
    progress["current_mission_index"] = min(max(int(index), 0), max(0, len(MISSIONS) - 1))
    progress["last_updated_at"] = _timestamp()
    save_progress(progress, path)
    return load_progress(path)


def complete_mission(mission_id: str, path: Path = PROGRESS_PATH) -> dict:
    if mission_id not in MISSIONS_BY_ID:
        raise ValueError(f"Unknown mission id: {mission_id}")

    progress = load_progress(path)
    completed = progress["completed_mission_ids"]
    if mission_id not in completed:
        completed.append(mission_id)

    _record_active_day(progress)

    stats = progress["mission_stats"].setdefault(mission_id, _empty_mission_stats())
    if stats["stars"] < 1:
        stats["stars"] = 1
    if not stats["completed_at"]:
        stats["completed_at"] = _timestamp()

    progress["total_xp"] = sum(_mission_xp(item) for item in completed)
    progress["last_updated_at"] = _timestamp()
    save_progress(progress, path)
    return load_progress(path)


def submit_mission_result(
    mission_id: str,
    *,
    correct: bool,
    hint_used: bool = False,
    path: Path = PROGRESS_PATH,
) -> dict:
    """Record one validation attempt and return its progression reward."""
    if mission_id not in MISSIONS_BY_ID:
        raise ValueError(f"Unknown mission id: {mission_id}")

    progress = load_progress(path)
    previous_achievements = set(progress["achievements"])
    _record_active_day(progress)
    completed = progress["completed_mission_ids"]
    first_completion = mission_id not in completed
    stats = progress["mission_stats"].setdefault(mission_id, _empty_mission_stats())
    stats["attempts"] += 1
    if hint_used:
        stats["hints_used"] += 1

    awarded_stars = stats["stars"]
    if correct:
        if stats["attempts"] == 1 and stats["hints_used"] == 0:
            awarded_stars = 3
        elif stats["attempts"] <= 3 and stats["hints_used"] <= 1:
            awarded_stars = 2
        else:
            awarded_stars = 1
        stats["stars"] = max(stats["stars"], awarded_stars)
        stats["migrated"] = False

        if first_completion:
            completed.append(mission_id)
            stats["completed_at"] = _timestamp()
            if stats["incorrect_attempts"] == 0:
                progress["current_streak"] += 1
            else:
                progress["current_streak"] = 0
            progress["best_streak"] = max(progress["best_streak"], progress["current_streak"])
    else:
        stats["incorrect_attempts"] += 1

    progress["last_updated_at"] = _timestamp()
    progress["achievements"] = _earned_achievements(progress)
    save_progress(progress, path)
    saved = load_progress(path)
    mission = MISSIONS_BY_ID[mission_id]
    block = _block_summary(saved, mission.block)
    available_blocks = sorted({item.block for item in MISSIONS})
    unlocked_block = None
    if correct and first_completion and block["complete"]:
        next_blocks = [number for number in available_blocks if number > mission.block]
        unlocked_block = next_blocks[0] if next_blocks else None
    return {
        "progress": saved,
        "reward": {
            "first_completion": first_completion and correct,
            "stars": stats["stars"] if correct else 0,
            "xp_awarded": mission.xp if first_completion and correct else 0,
            "current_streak": saved["current_streak"],
            "best_streak": saved["best_streak"],
            "block_completed": bool(correct and first_completion and block["complete"]),
            "block": block,
            "unlocked_block": unlocked_block,
            "new_achievements": [
                achievement
                for achievement in saved["achievements"]
                if achievement not in previous_achievements
            ],
        },
    }


def mark_briefing_completed(briefing_id: str, path: Path = PROGRESS_PATH) -> dict:
    progress = load_progress(path)
    completed = progress["completed_briefing_ids"]
    if briefing_id not in completed:
        completed.append(briefing_id)
    progress["last_updated_at"] = _timestamp()
    save_progress(progress, path)
    return load_progress(path)


def reset_progress(path: Path = PROGRESS_PATH) -> dict:
    progress = default_progress()
    progress["last_updated_at"] = _timestamp()
    write_json(path, progress)
    return load_progress(path)
