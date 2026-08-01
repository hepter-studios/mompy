import unittest

from backend.code_runner import run_user_code_safely


class CodeRunnerTests(unittest.TestCase):
    def test_captures_print_output(self):
        result = run_user_code_safely('name = "Mompy"\nprint(name)')
        self.assertTrue(result["ok"])
        self.assertEqual(result["output"], "Mompy")
        self.assertTrue(result["implemented"])

    def test_blocks_file_access(self):
        result = run_user_code_safely('open("x.txt", "w")')
        self.assertFalse(result["ok"])
        self.assertIn("open", result["error"])
        self.assertEqual(result["diagnostic"]["category"], "safety")

    def test_blocks_imports(self):
        result = run_user_code_safely("import os\nprint(os.getcwd())")
        self.assertFalse(result["ok"])
        self.assertIn("not allowed", result["error"])
        self.assertEqual(result["diagnostic"]["line"], 1)

    def test_times_out_slow_code(self):
        result = run_user_code_safely("while True:\n    pass", timeout=0.2)
        self.assertFalse(result["ok"])
        self.assertTrue(result["timeout"])
        self.assertEqual(result["diagnostic"]["category"], "timeout")

    def test_syntax_error_reports_source_location_and_suggestion(self):
        result = run_user_code_safely('print("Hello, Mompy!"')

        self.assertFalse(result["ok"])
        self.assertEqual(result["error_type"], "SyntaxError")
        self.assertEqual(result["diagnostic"]["category"], "syntax")
        self.assertEqual(result["diagnostic"]["line"], 1)
        self.assertGreater(result["diagnostic"]["column"], 0)
        self.assertEqual(result["diagnostic"]["source_line"], 'print("Hello, Mompy!"')
        self.assertTrue(result["diagnostic"]["suggestion"])

    def test_runtime_error_reports_failing_line(self):
        result = run_user_code_safely('name = "Mompy"\nprint(missing_name)')

        self.assertFalse(result["ok"])
        self.assertEqual(result["error_type"], "NameError")
        self.assertEqual(result["diagnostic"]["category"], "runtime")
        self.assertEqual(result["diagnostic"]["line"], 2)
        self.assertEqual(result["diagnostic"]["source_line"], "print(missing_name)")
        self.assertIn("assigned", result["diagnostic"]["suggestion"])


if __name__ == "__main__":
    unittest.main()
