import unittest
from unittest.mock import patch

from backend.missions import MISSIONS
from backend.validator import validate_mission


class ValidatorTests(unittest.TestCase):
    VALID_SOLUTIONS = {
        "mission_001": 'print("Hello, Mompy!")',
        "mission_002": 'print("Python")',
        "mission_003": 'print("Boot ready")',
        "mission_004": 'print("Mompy")',
        "mission_005": 'print("First")\nprint("Second")',
        "mission_006": 'name = "Mompy"\nprint(name)',
        "mission_007": "level = 1\nprint(level)",
        "mission_008": 'mode = "off"\nmode = "on"\nprint(mode)',
        "mission_009": "a = 2\nb = 3\nprint(a + b)",
        "mission_010": 'message = "Ready"\nprint(message)',
        "mission_011": 'power = True\nif power:\n    print("Ready")',
        "mission_012": 'temperature = 10\nif temperature > 5:\n    print("Warm")',
        "mission_013": 'code = "py"\nif code == "py":\n    print("Python")',
        "mission_014": 'score = 1\nif score >= 2:\n    print("Pass")\nelse:\n    print("Try again")',
        "mission_015": 'count = 3\nif count <= 3:\n    print("Inside")',
        "mission_016": "for i in range(3):\n    print(i)",
        "mission_017": 'for i in range(2):\n    print("Mompy")',
        "mission_018": "for number in range(1, 4):\n    print(number)",
        "mission_019": 'for letter in "py":\n    print(letter)',
        "mission_020": "total = 0\nfor number in range(3):\n    total = total + number\nprint(total)",
        "mission_021": 'items = ["onion", "terminal", "python"]\nprint(items)',
        "mission_022": 'items = ["onion", "terminal", "python"]\nprint(items[1])',
        "mission_023": "numbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)",
        "mission_024": 'items = ["onion", "python"]\nfor item in items:\n    print(item)',
        "mission_025": "numbers = [1, 2, 3]\nprint(len(numbers))",
        "mission_026": 'def say_hello():\n    print("Hello")\nsay_hello()',
        "mission_027": 'def greet(user):\n    print("Hello, " + user)\ngreet("Mompy")',
        "mission_028": "def add(a, b):\n    return a + b\nprint(add(2, 3))",
        "mission_029": 'def make_message(user):\n    return "Hello, " + user\nprint(make_message("Mackson"))',
        "mission_030": "def double(n):\n    return n * 2\nprint(double(4))",
    }

    ALTERNATIVE_SOLUTIONS = {
        "mission_006": 'mascot = "Mompy"\nprint(mascot)',
        "mission_007": "current_level = 1\nprint(current_level)",
        "mission_008": 'status = "off"\nstatus = "on"\nprint(status)',
        "mission_009": "left = 2\nright = 3\nprint(right + left)",
        "mission_010": 'screen_text = "Ready"\nprint(screen_text)',
        "mission_011": 'is_ready = True\nif is_ready:\n    print("Ready")',
        "mission_012": 'heat = 10\nif heat > 5:\n    print("Warm")',
        "mission_013": 'language = "py"\nif language == "py":\n    print("Python")',
        "mission_014": 'points = 1\nif points >= 2:\n    print("Pass")\nelse:\n    print("Try again")',
        "mission_015": 'amount = 3\nif amount <= 3:\n    print("Inside")',
        "mission_016": "for counter in range(3):\n    print(counter)",
        "mission_017": 'for _ in range(2):\n    print("Mompy")',
        "mission_018": "for step in range(1, 4):\n    print(step)",
        "mission_019": 'for character in "py":\n    print(character)',
        "mission_020": "sum_value = 0\nfor value in range(3):\n    sum_value += value\nprint(sum_value)",
        "mission_021": 'tools = ["onion", "terminal", "python"]\nprint(tools)',
        "mission_022": 'tools = ["onion", "terminal", "python"]\nprint(tools[1])',
        "mission_023": "values = [1, 2, 3]\nvalues.append(4)\nprint(values)",
        "mission_024": 'tools = ["onion", "python"]\nfor tool in tools:\n    print(tool)',
        "mission_025": "values = [1, 2, 3]\nprint(len(values))",
        "mission_026": 'def boot_message():\n    print("Hello")\nboot_message()',
        "mission_027": 'def welcome(name):\n    print(f"Hello, {name}")\nwelcome("Mompy")',
        "mission_028": "def combine(left, right):\n    return right + left\nprint(combine(2, 3))",
        "mission_029": 'def message_for(name):\n    return f"Hello, {name}"\nprint(message_for("Mackson"))',
        "mission_030": "def twice(value):\n    return 2 * value\nprint(twice(4))",
    }

    INVALID_SHORTCUTS = {
        "mission_006": 'print("Mompy")',
        "mission_009": "answer = 5\nprint(answer)",
        "mission_011": 'print("Ready")',
        "mission_016": "print(0)\nprint(1)\nprint(2)",
        "mission_021": 'print(["onion", "terminal", "python"])',
        "mission_026": 'print("Hello")',
        "mission_030": "print(8)",
    }

    def test_first_mission_accepts_exact_print(self):
        result = validate_mission("mission_001", 'print("Hello, Mompy!")')
        self.assertTrue(result["correct"])
        self.assertEqual(result["expected_output"], "Hello, Mompy!")
        self.assertEqual(result["actual_output"], "Hello, Mompy!")

    def test_first_mission_rejects_empty_child_process_response(self):
        with patch(
            "backend.validator.run_user_code_safely",
            return_value={
                "ok": False,
                "output": "",
                "error": "Execution finished with no response.",
                "error_type": "ExecutionResponseError",
                "timeout": False,
                "implemented": True,
                "diagnostic": {
                    "category": "runtime",
                    "code": "missing_execution_response",
                    "title": "Mompy could not read the execution result",
                    "summary": "The code process ended before returning its result.",
                    "suggestion": "Run the mission again.",
                    "line": None,
                    "column": None,
                },
            },
        ):
            result = validate_mission("mission_001", 'print("Hello, Mompy!")')

        self.assertFalse(result["correct"])
        self.assertEqual(result["expected_output"], "Hello, Mompy!")
        self.assertEqual(result["actual_output"], "")
        self.assertEqual(
            result["diagnostics"][0]["code"],
            "missing_execution_response",
        )

    def test_all_current_missions_accept_reference_solution(self):
        self.assertEqual(len(MISSIONS), 30)
        for mission_id, code in self.VALID_SOLUTIONS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertTrue(result["correct"], result)

    def test_missions_accept_equivalent_python_solutions(self):
        for mission_id, code in self.ALTERNATIVE_SOLUTIONS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertTrue(result["correct"], result)

    def test_correct_output_does_not_bypass_the_required_concept(self):
        for mission_id, code in self.INVALID_SHORTCUTS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertFalse(result["correct"], result)
                self.assertEqual(result["diagnostics"][0]["category"], "concept")
                self.assertTrue(result["diagnostics"][0]["line"])
                self.assertTrue(result["diagnostics"][0]["source_line"])

    def test_first_mission_rejects_wrong_message(self):
        result = validate_mission("mission_001", 'print("Hello")')
        self.assertFalse(result["correct"])
        self.assertEqual(result["diagnostics"][0]["category"], "output")
        self.assertEqual(result["diagnostics"][0]["expected"], "Hello, Mompy!")
        self.assertEqual(result["diagnostics"][0]["actual"], "Hello")
        self.assertEqual(result["diagnostics"][0]["line"], 1)

    def test_first_mission_accepts_equivalent_variable_solution(self):
        result = validate_mission(
            "mission_001",
            'message = "Hello, Mompy!"\nprint(message)',
        )

        self.assertTrue(result["correct"])
        self.assertEqual(result["actual_output"], "Hello, Mompy!")

    def test_rejects_correct_shape_with_wrong_runtime_output(self):
        result = validate_mission(
            "mission_027",
            'def greet(user):\n    print("Hello, " + user)\ngreet("Python")',
        )
        self.assertFalse(result["correct"])
        self.assertNotEqual(result["actual_output"], result["expected_output"])

    def test_variable_block_starts_at_mission_six(self):
        result = validate_mission("mission_006", 'name = "Mompy"\nprint(name)')
        self.assertTrue(result["correct"])

    def test_syntax_error_returns_hint(self):
        result = validate_mission("mission_001", 'print("Hello, Mompy!"')
        self.assertFalse(result["correct"])
        self.assertEqual(result["diagnostics"][0]["category"], "syntax")
        self.assertEqual(result["diagnostics"][0]["line"], 1)
        self.assertTrue(result["diagnostics"][0]["suggestion"])

    def test_runtime_error_returns_actionable_diagnostic(self):
        result = validate_mission("mission_001", "print(missing_name)")

        self.assertFalse(result["correct"])
        self.assertEqual(result["diagnostics"][0]["category"], "runtime")
        self.assertEqual(result["diagnostics"][0]["line"], 1)
        self.assertIn("assigned", result["diagnostics"][0]["suggestion"])

    def test_concepts_are_ordered_for_beginners(self):
        block_concepts = {
            1: {"print", "string", "quotes", "parentheses", "multiple commands", "output"},
            2: {"variable", "assignment", "reassignment", "number", "addition", "print", "string"},
            3: {"if", "else", "boolean", "comparison", "greater than", "equality", "==", "<=", "colon", "indentation", "print", "string"},
            4: {"for", "range", "loop variable", "indentation", "print", "string sequence", "variable update", "addition"},
            5: {"list", "brackets", "items", "commas", "index", "zero based index", "append", "number", "for", "item", "indentation", "len", "print"},
            6: {"def", "function", "call", "indentation", "print", "parameter", "parameters", "string concatenation", "return", "addition", "multiplication"},
        }

        for mission in MISSIONS:
            allowed = block_concepts[mission.block]
            with self.subTest(mission=mission.id):
                self.assertTrue(set(mission.expected_concepts).issubset(allowed))


if __name__ == "__main__":
    unittest.main()
