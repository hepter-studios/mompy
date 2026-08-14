import tempfile
import unittest
from pathlib import Path

from backend.briefings import briefing_for_mission_index, get_briefings
from backend.profile import load_profile, logout_profile, save_profile


class BriefingProfileTests(unittest.TestCase):
    def test_briefings_cover_current_blocks(self):
        briefings = get_briefings()
        self.assertGreaterEqual(len(briefings), 8)
        self.assertEqual(briefing_for_mission_index(0)["subtitle"], "First Python Commands")
        self.assertEqual(briefing_for_mission_index(30)["subtitle"], "Dictionaries")
        self.assertEqual(briefing_for_mission_index(35)["subtitle"], "While Loops")

    def test_profile_name_is_sanitized(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "profile.json"
            profile = save_profile({"name": "  Mackson   Victor  "}, path)
            self.assertEqual(profile["name"], "Mackson Victor")
            self.assertEqual(load_profile(path)["name"], "Mackson Victor")

    def test_new_profile_starts_in_english(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "profile.json"
            profile = save_profile({"name": "Mackson"}, path)
            self.assertEqual(profile["language"], "en-US")

    def test_profile_persists_supported_language_only(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "profile.json"
            profile = save_profile({"name": "Mackson", "language": "pt-BR"}, path)
            self.assertEqual(profile["language"], "pt-BR")
            self.assertEqual(load_profile(path)["language"], "pt-BR")

            profile = save_profile({"language": "es-ES"}, path)
            self.assertEqual(profile["language"], "en-US")

    def test_profile_save_persists_session_metadata(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "profile.json"
            profile = save_profile({"name": "Mackson"}, path)

            self.assertEqual(profile["name"], "Mackson")
            self.assertIsNotNone(profile["created_at"])
            self.assertIsNotNone(profile["last_seen_at"])

            reloaded = load_profile(path)
            self.assertEqual(reloaded["created_at"], profile["created_at"])
            self.assertEqual(reloaded["last_seen_at"], profile["last_seen_at"])

    def test_profile_settings_merge_without_losing_defaults(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "profile.json"
            profile = save_profile(
                {"name": "Mackson", "settings": {"music_enabled": False}},
                path,
            )

            self.assertFalse(profile["settings"]["music_enabled"])
            self.assertTrue(profile["settings"]["sfx_enabled"])
            self.assertEqual(profile["settings"]["music_volume"], 0.10)
            self.assertEqual(profile["settings"]["sfx_volume"], 0.45)

    def test_logout_resets_profile(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "profile.json"
            save_profile({"name": "Mackson"}, path)
            profile = logout_profile(path)
            self.assertEqual(profile["name"], "Guest")


if __name__ == "__main__":
    unittest.main()
