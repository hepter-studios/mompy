import re
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]


class ClassroomAuxCrtTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = (PROJECT_ROOT / "frontend" / "index.html").read_text(encoding="utf-8")
        cls.styles = (PROJECT_ROOT / "frontend" / "css" / "styles.css").read_text(encoding="utf-8")
        cls.app = (PROJECT_ROOT / "frontend" / "js" / "app.js").read_text(encoding="utf-8")
        cls.service_worker = (PROJECT_ROOT / "frontend" / "sw.js").read_text(encoding="utf-8")

    def test_crt_layers_are_visual_only_and_do_not_clone_the_interface(self):
        self.assertEqual(self.index.count('id="classroomAuxMonitorContent"'), 1)
        self.assertEqual(self.index.count('id="classroomAuxCrt"'), 1)
        self.assertIn('class="classroom-aux-crt" aria-hidden="true"', self.index)
        self.assertIn(".classroom-aux-crt > span", self.styles)
        self.assertIn("pointer-events: none;", self.styles)

        crt_markup = re.search(
            r'<div id="classroomAuxCrt".*?</div>',
            self.index,
            flags=re.DOTALL,
        )
        self.assertIsNotNone(crt_markup)
        self.assertNotIn("<img", crt_markup.group(0))
        self.assertNotIn("<canvas", crt_markup.group(0))
        self.assertNotIn("<video", crt_markup.group(0))

    def test_every_question_uses_the_centered_question_screen(self):
        self.assertIn('"question",\n    "identity"', self.app)
        self.assertIn('classroom-aux-question-mark', self.app)
        self.assertIn('symbol: "?"', self.app)
        self.assertIn('.classroom-aux-monitor-content.is-question', self.styles)
        self.assertIn('.classroom-aux-question-mark', self.styles)

    def test_correct_answers_use_only_the_centered_check_and_inline_continue(self):
        self.assertIn('symbol: "✓"', self.app)
        self.assertIn('symbolNode.classList.toggle("is-success", symbol === "✓")', self.app)
        self.assertIn('actions.classList.add("is-answer-continue")', self.app)
        self.assertIn('anchor.after(actions)', self.app)
        self.assertIn('.classroom-rich-actions.is-answer-continue', self.styles)

    def test_order_caption_and_science_frames_fit_the_monitor(self):
        order_footer = re.search(
            r"\.mompy-order-footer\s*\{.*?\}",
            self.styles,
            flags=re.DOTALL,
        )
        self.assertIsNotNone(order_footer)
        self.assertIn("transform: translateY(-0.42rem);", order_footer.group(0))

        science_frame = re.search(
            r"\.classroom-aux-science-education-frame\s*\{.*?\}",
            self.styles,
            flags=re.DOTALL,
        )
        self.assertIsNotNone(science_frame)
        self.assertIn("transform: scale(1.11);", science_frame.group(0))

    def test_asset_versions_stay_synchronized(self):
        self.assertIn('./css/styles.css?v=266', self.index)
        self.assertIn('./js/app.js?v=217', self.index)
        self.assertIn('./css/styles.css?v=266', self.service_worker)
        self.assertIn('./js/app.js?v=217', self.service_worker)
        self.assertIn('const CACHE_NAME = "mompy-v331";', self.service_worker)


if __name__ == "__main__":
    unittest.main()
