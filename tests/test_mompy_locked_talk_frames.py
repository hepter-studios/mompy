import hashlib
import struct
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = PROJECT_ROOT / "frontend" / "assets"
EXPECTED_FRAME_HASHES = (
    "c52dfaa8db91671f67e2f6540cc340ad67379f51889063640735df26df22647c",
    "597aa524f6167911a2522b66a7ae9317e2efb783d6928ca816a84f7e1f6ccc10",
    "976ee6059aac114c49996b9f94bb28ca5f09732e29fd230440e7b27ce45fba9d",
    "e3ce82dc9581ae6397c5611e8cb67f1f060d7595bb37e6ce889a9af848f69f32",
    "4b7f6d33923a3677ddf8e645b0e653be283914fd64c072efc440a5eb09e28d66",
    "83ebceb132a3abc13dd6147f907980d13b2fd3d2f3d95afbe807ecf1eabc5d7a",
)


class LockedMompyTalkFrameTests(unittest.TestCase):
    def test_approved_frames_keep_exact_pixels_and_dimensions(self):
        for index, expected_hash in enumerate(EXPECTED_FRAME_HASHES, start=1):
            frame_path = ASSET_ROOT / f"mompy_talk_articulation_locked_{index}.png"
            frame_bytes = frame_path.read_bytes()

            self.assertEqual(frame_bytes[:8], b"\x89PNG\r\n\x1a\n")
            self.assertEqual(struct.unpack(">II", frame_bytes[16:24]), (1254, 1254))
            self.assertEqual(hashlib.sha256(frame_bytes).hexdigest(), expected_hash)

    def test_runtime_css_and_offline_cache_reference_locked_frames(self):
        app_source = (PROJECT_ROOT / "frontend" / "js" / "app.js").read_text(encoding="utf-8")
        styles = (PROJECT_ROOT / "frontend" / "css" / "styles.css").read_text(encoding="utf-8")
        service_worker = (PROJECT_ROOT / "frontend" / "sw.js").read_text(encoding="utf-8")

        for index in range(1, 7):
            frame_name = f"mompy_talk_articulation_locked_{index}.png?v=1"
            self.assertIn(frame_name, app_source)
            self.assertIn(frame_name, styles)
            self.assertIn(frame_name, service_worker)


if __name__ == "__main__":
    unittest.main()
