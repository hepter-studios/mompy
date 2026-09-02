import json
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
EXPECTED_MAIN_SCRIPT = (
    ("opening", "We are starting from zero. You do not need any programming experience."),
    ("what-is-python", "Programming means explaining precisely what the machine should do."),
    ("guido", "The origin had a concrete goal: start from what already existed and build a new language. Now let us mark when it became public."),
    ("timeline", "Keep the sequence, not the numbers: a personal project, a public announcement, and a foundation that holds the project's rights."),
    ("python-name-story", "Identity resolved: Guido started the project, the public announcement came in 1991, and the name came from Monty Python scripts."),
    ("uses", "This preview showed code becoming action. Now we will look at the central step in that path: the interpreter that reads the code."),
    ("instruction", "Code is what you write. Execution is Python carrying it out. Output is what the program produces."),
    ("interpreter", "Watch the middle of the path: code enters, the interpreter conducts execution, and output appears afterward."),
    ("code-flow", "For the interpreter to recognize an instruction, its writing must follow rules. That is the next concept: syntax."),
    ("syntax-intro", "Now we know that writing has rules. Next, we will identify exactly where a piece of text begins and ends."),
    ("text-intro", "We have the message. Next, we need to tell Python to show it."),
    ("print-purpose", "First came the idea of a function; now it has a name: print. Watch the call produce output without extra setup."),
    ("first-print", "Reveal the code, give it to the interpreter, and compare the instruction with the output. Next, we will see what changes when there are two lines."),
    ("two-lines-demo", "Trace one line at a time: finish the first and move to the second. Next, we will take the complete call apart symbol by symbol."),
    ("print-anatomy", "These are two independent pairs: parentheses delimit the call; quotes delimit the text inside it."),
    ("syntax-pairs", "Check the two pairs separately. When call and text are closed, the instruction is ready to run."),
    ("summary", "You started with Python's origin, followed the interpreter, and reached a complete print call. Now use the missions to prove that every symbol and every line has a purpose."),
)


class LessonOneMompyScriptTests(unittest.TestCase):
    def test_en_us_main_script_keeps_approved_ids_order_and_copy(self):
        payload_path = PROJECT_ROOT / "backend" / "data" / "classroom_lessons.json"
        payload = json.loads(payload_path.read_text(encoding="utf-8"))
        lesson = next(item for item in payload["lessons"] if item["id"] == "briefing_001")

        actual = tuple(
            (step["id"], step["content"]["en-US"]["mompy"])
            for step in lesson["steps"]
            if step["content"]["en-US"].get("mompyVisible")
            and step["content"]["en-US"].get("mompy")
        )

        self.assertEqual(actual, EXPECTED_MAIN_SCRIPT)

    def test_only_approved_audio_001_to_003_remains_enabled(self):
        app_source = (PROJECT_ROOT / "frontend" / "js" / "app.js").read_text(encoding="utf-8")
        step_ids = (
            "opening",
            "what-is-python",
            "guido",
            "timeline",
            "python-name-story",
            "uses",
            "instruction",
        )

        for index, step_id in enumerate(step_ids, start=1):
            key = f'"en-US:briefing_001:{step_id}:mompy"'
            block_start = app_source.index(key)
            block_end = app_source.index("\n  }),", block_start)
            manifest_block = app_source[block_start:block_end]

            if index <= 3:
                self.assertNotIn("enabled: false", manifest_block)
            else:
                self.assertIn("enabled: false", manifest_block)


if __name__ == "__main__":
    unittest.main()
