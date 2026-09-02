import json
import tempfile
import unittest
from pathlib import Path

from backend.progress import (
    complete_mission,
    load_progress,
    record_app_open,
    reset_progress,
    set_current_mission_index,
    submit_mission_result,
)


class ProgressTests(unittest.TestCase):
    def test_reset_progress_creates_default_state(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            progress = reset_progress(path)
            self.assertEqual(progress["current_mission_index"], 0)
            self.assertEqual(progress["completed_mission_ids"], [])
            self.assertEqual(progress["total_xp"], 0)
            self.assertEqual(progress["mission_stats"], {})
            self.assertEqual(progress["completed_classroom_lesson_ids"], [])
            self.assertEqual(progress["classroom_step_stats"], {})
            self.assertEqual(progress["total_stars"], 0)
            self.assertEqual(progress["current_streak"], 0)

    def test_complete_mission_adds_xp_once(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            complete_mission("mission_001", path)
            progress = complete_mission("mission_001", path)
            self.assertEqual(progress["completed_mission_ids"], ["mission_001"])
            self.assertEqual(progress["current_mission_index"], 0)
            self.assertEqual(progress["total_xp"], 35)
            self.assertEqual(progress["missions_completed"], 1)
            self.assertEqual(progress["level_info"]["level"], 1)

    def test_level_is_derived_from_completed_missions(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            for mission_id in ("mission_001", "mission_002", "mission_003"):
                progress = complete_mission(mission_id, path)

            self.assertEqual(progress["missions_completed"], 3)
            self.assertGreaterEqual(progress["total_xp"], 100)
            self.assertEqual(progress["level_info"]["level"], 2)

    def test_set_current_mission_index_is_persisted_by_backend(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            progress = set_current_mission_index(4, path)
            self.assertEqual(progress["current_mission_index"], 4)

            reloaded = load_progress(path)
            self.assertEqual(reloaded["current_mission_index"], 4)

    def test_load_progress_sanitizes_unknown_ids(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            path.write_text(
                '{"completed_mission_ids":["bad","mission_001"],"current_mission_index":99}',
                encoding="utf-8",
            )
            progress = load_progress(path)
            self.assertEqual(progress["completed_mission_ids"], ["mission_001"])
            self.assertEqual(progress["current_mission_index"], 39)

    def test_old_progress_is_migrated_without_losing_completion(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            path.write_text(
                '{"completed_mission_ids":["mission_001"],"current_mission_index":1}',
                encoding="utf-8",
            )
            progress = load_progress(path)
            stats = progress["mission_stats"]["mission_001"]
            self.assertEqual(stats["stars"], 1)
            self.assertTrue(stats["migrated"])
            self.assertEqual(progress["total_stars"], 1)

    def test_first_try_completion_awards_three_stars_and_streak(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            result = submit_mission_result("mission_001", correct=True, path=path)
            reward = result["reward"]
            self.assertTrue(reward["first_completion"])
            self.assertEqual(reward["stars"], 3)
            self.assertEqual(reward["xp_awarded"], 35)
            self.assertEqual(reward["current_streak"], 1)
            self.assertIn("first_mission", reward["new_achievements"])
            self.assertIn("perfect_mission", reward["new_achievements"])
            self.assertEqual(result["progress"]["active_days"], 1)

    def test_long_term_achievements_use_distinct_active_days(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            path.write_text(
                '{"active_dates":["2026-01-01","2026-01-02","2026-01-03",'
                '"2026-01-04","2026-01-05","2026-01-06","2026-01-07"]}',
                encoding="utf-8",
            )
            progress = load_progress(path)
            self.assertEqual(progress["active_days"], 7)
            self.assertIn("steady_start", progress["achievements"])
            self.assertIn("returning_learner", progress["achievements"])
            self.assertNotIn("dedicated_learner", progress["achievements"])
            self.assertNotIn("veteran_learner", progress["achievements"])

    def test_consistency_achievements_use_days_and_consecutive_sequences(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            dates = [f"2026-01-{day:02d}" for day in range(1, 31)]
            path.write_text(
                '{"active_dates":' + json.dumps(dates) + "}",
                encoding="utf-8",
            )

            progress = load_progress(path)
            for achievement_id in (
                "steady_start",
                "three_days_online",
                "initial_sequence",
                "code_week",
                "always_on_week",
                "frequent_operator",
                "month_on_console",
            ):
                self.assertIn(achievement_id, progress["achievements"])
            self.assertEqual(progress["active_days"], 30)
            self.assertEqual(progress["activity_streak"], 30)
            self.assertEqual(
                progress["achievement_progress"]["month_on_console"],
                {"current": 30, "target": 30, "metric": "active_days"},
            )

    def test_monthly_consistency_achievements_use_distinct_months(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            dates = [f"2026-{month:02d}-01" for month in range(1, 13)]
            path.write_text(
                '{"active_dates":' + json.dumps(dates) + "}",
                encoding="utf-8",
            )

            progress = load_progress(path)
            self.assertIn("quarterly_signal", progress["achievements"])
            self.assertIn("programming_semester", progress["achievements"])
            self.assertIn("mompy_companion", progress["achievements"])
            self.assertEqual(progress["active_months"], 12)

    def test_record_app_open_counts_each_calendar_day_once(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            record_app_open(path, active_date="2026-08-20")
            repeated = record_app_open(path, active_date="2026-08-20")
            returned = record_app_open(path, active_date="2026-08-21")

            self.assertEqual(repeated["active_days"], 1)
            self.assertEqual(returned["active_days"], 2)
            self.assertIn("steady_start", returned["achievements"])

    def test_twenty_achievements_have_reachable_progression(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            for index in range(1, 31):
                result = submit_mission_result(f"mission_{index:03d}", correct=True, path=path)

            achievements = result["progress"]["achievements"]
            self.assertIn("mission_thirty", achievements)
            self.assertIn("star_collector_60", achievements)
            self.assertIn("three_blocks", achievements)
            self.assertIn("six_blocks", achievements)
            self.assertIn("clean_streak_10", achievements)
            self.assertNotIn("path_complete", achievements)
            self.assertNotIn("star_master_100", achievements)

    def test_first_block_requires_its_actual_five_missions(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            for index in range(6, 11):
                result = submit_mission_result(f"mission_{index:03d}", correct=True, path=path)

            self.assertIn("mission_five", result["progress"]["achievements"])
            self.assertNotIn("first_block", result["progress"]["achievements"])

    def test_retry_then_completion_awards_two_stars_without_streak(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            submit_mission_result("mission_001", correct=False, path=path)
            result = submit_mission_result("mission_001", correct=True, path=path)
            self.assertEqual(result["reward"]["stars"], 2)
            self.assertEqual(result["reward"]["current_streak"], 0)
            self.assertEqual(result["progress"]["total_attempts"], 2)

    def test_hint_reduces_first_try_reward_to_two_stars(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            result = submit_mission_result("mission_001", correct=True, hint_used=True, path=path)
            self.assertEqual(result["reward"]["stars"], 2)

    def test_replaying_completed_mission_does_not_duplicate_xp_or_streak(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            submit_mission_result("mission_001", correct=True, path=path)
            replay = submit_mission_result("mission_001", correct=True, path=path)
            self.assertFalse(replay["reward"]["first_completion"])
            self.assertEqual(replay["reward"]["xp_awarded"], 0)
            self.assertEqual(replay["progress"]["total_xp"], 35)
            self.assertEqual(replay["progress"]["current_streak"], 1)

    def test_completing_fifth_mission_finishes_first_block(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "progress.json"
            for index in range(1, 6):
                result = submit_mission_result(f"mission_{index:03d}", correct=True, path=path)
            self.assertTrue(result["reward"]["block_completed"])
            self.assertEqual(result["reward"]["block"]["stars"], 15)
            self.assertEqual(result["reward"]["unlocked_block"], 2)
            self.assertIn("first_block", result["reward"]["new_achievements"])


if __name__ == "__main__":
    unittest.main()
