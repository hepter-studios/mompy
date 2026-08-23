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
        "mission_031": 'profile = {"name": "Mompy", "level": 1}\nprint(profile)',
        "mission_032": 'profile = {"name": "Mompy", "level": 1}\nprint(profile["name"])',
        "mission_033": 'profile = {"name": "Mompy"}\nprofile["language"] = "Python"\nprint(profile["language"])',
        "mission_034": 'profile = {"level": 1}\nprofile["level"] = 2\nprint(profile["level"])',
        "mission_035": 'profile = {"name": "Mompy"}\nprint(profile.get("mode", "offline"))',
        "mission_036": "count = 1\nwhile count <= 3:\n    print(count)\n    count += 1",
        "mission_037": "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1",
        "mission_038": "total = 0\ncount = 1\nwhile count <= 4:\n    total += count\n    count += 1\nprint(total)",
        "mission_039": "number = 0\nwhile number <= 4:\n    print(number)\n    number += 2",
        "mission_040": 'steps = ["learn", "practice", "build"]\nindex = 0\nwhile index < len(steps):\n    print(steps[index])\n    index += 1',
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
        "mission_031": 'learner = {"name": "Mompy", "level": 1}\nprint(learner)',
        "mission_032": 'learner = {"name": "Mompy", "level": 1}\nprint(learner["name"])',
        "mission_033": 'learner = {"name": "Mompy"}\nlearner["language"] = "Python"\nprint(learner["language"])',
        "mission_034": 'learner = {"level": 1}\nlearner["level"] = 2\nprint(learner["level"])',
        "mission_035": 'learner = {"name": "Mompy"}\nmode = learner.get("mode", "offline")\nprint(mode)',
        "mission_036": "step = 1\nwhile step <= 3:\n    print(step)\n    step = step + 1",
        "mission_037": "remaining = 3\nwhile remaining > 0:\n    print(remaining)\n    remaining = remaining - 1",
        "mission_038": "answer = 0\nvalue = 1\nwhile value <= 4:\n    answer = answer + value\n    value = value + 1\nprint(answer)",
        "mission_039": "value = 0\nwhile value <= 4:\n    print(value)\n    value = value + 2",
        "mission_040": 'actions = ["learn", "practice", "build"]\nposition = 0\nwhile position < len(actions):\n    print(actions[position])\n    position = position + 1',
    }

    PROFESSIONAL_EQUIVALENTS = {
        "mission_006": 'parts = ["Mom", "py"]\nmascot = "".join(parts)\nprint(mascot)',
        "mission_009": "left = 2\nright = 3\nanswer = left + right\nprint(answer)",
        "mission_012": 'heat = int("10")\nif 5 < heat:\n    print("Warm")',
        "mission_016": "for counter in range(0, 3):\n    print(counter)",
        "mission_019": 'letters = str("py")\nfor character in letters:\n    print(character)',
        "mission_021": 'tools = list(("onion", "terminal", "python"))\nprint(tools)',
        "mission_027": 'def welcome(name):\n    message = "Hello, {}".format(name)\n    print(message)\nwelcome("Mompy")',
        "mission_028": "def combine(left, right):\n    result = left + right\n    return result\nanswer = combine(2, 3)\nprint(answer)",
        "mission_029": 'def message_for(name):\n    message = f"Hello, {name}"\n    return message\nresult = message_for("Mackson")\nprint(result)',
        "mission_031": 'profile = dict(name="Mompy", level=1)\nprint(profile)',
        "mission_035": 'profile = dict(name="Mompy")\nkey = "mode"\nfallback = "offline"\nresult = profile.get(key, fallback)\nprint(result)',
        "mission_036": 'counter = int("1")\nstep = 1\nwhile counter < 4:\n    print(counter)\n    counter += step',
        "mission_040": 'actions = list(("learn", "practice", "build"))\nposition = 0\nwhile position != len(actions):\n    print(actions[position])\n    position += 1',
    }

    INVALID_SHORTCUTS = {
        "mission_006": 'print("Mompy")',
        "mission_009": "answer = 5\nprint(answer)",
        "mission_011": 'print("Ready")',
        "mission_016": "print(0)\nprint(1)\nprint(2)",
        "mission_021": 'print(["onion", "terminal", "python"])',
        "mission_026": 'print("Hello")',
        "mission_030": "print(8)",
        "mission_031": 'print({"name": "Mompy", "level": 1})',
        "mission_035": 'print("offline")',
        "mission_036": "print(1)\nprint(2)\nprint(3)",
        "mission_040": 'print("learn")\nprint("practice")\nprint("build")',
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
        self.assertEqual(len(MISSIONS), 40)
        for mission_id, code in self.VALID_SOLUTIONS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertTrue(result["correct"], result)

    def test_missions_accept_equivalent_python_solutions(self):
        for mission_id, code in self.ALTERNATIVE_SOLUTIONS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertTrue(result["correct"], result)

    def test_missions_accept_clean_equivalent_implementations(self):
        for mission_id, code in self.PROFESSIONAL_EQUIVALENTS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertTrue(result["correct"], result)

    def test_advanced_solution_metadata_is_returned_only_after_success(self):
        result = validate_mission(
            "mission_027",
            'def welcome(name):\n    message = f"Hello, {name}"\n    print(message)\nwelcome("Mompy")',
        )
        self.assertTrue(result["correct"])
        self.assertEqual(result["solution_quality"], "advanced")
        self.assertTrue(result["advanced_solution"])

        wrong = validate_mission(
            "mission_027",
            'def welcome(name):\n    print(f"Hi, {name}")\nwelcome("Mompy")',
        )
        self.assertFalse(wrong["correct"])
        self.assertEqual(wrong["solution_quality"], "standard")
        self.assertFalse(wrong["advanced_solution"])

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
        self.assertIn("Output line 1", result["diagnostics"][0]["cause"])
        self.assertIn("run the mission again", result["diagnostics"][0]["action"])

    def test_output_diagnostic_points_to_the_print_that_first_differs(self):
        result = validate_mission(
            "mission_005",
            'print("First")\nprint("Wrong")',
        )

        self.assertFalse(result["correct"])
        diagnostic = result["diagnostics"][0]
        self.assertEqual(diagnostic["category"], "output")
        self.assertEqual(diagnostic["line"], 2)
        self.assertEqual(diagnostic["source_line"], 'print("Wrong")')
        self.assertIn("'Second'", diagnostic["cause"])
        self.assertIn("'Wrong'", diagnostic["cause"])

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
        self.assertEqual(
            result["diagnostics"][0]["cause"],
            result["diagnostics"][0]["summary"],
        )
        self.assertEqual(
            result["diagnostics"][0]["action"],
            result["diagnostics"][0]["suggestion"],
        )

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
            7: {"dictionary", "keys", "values", "assignment", "print", "key access", "brackets", "key assignment", "number", "get", "fallback"},
            8: {"while", "condition", "comparison", "variable update", "indentation", "print", "subtraction", "accumulator", "addition", "step", "list", "index", "len"},
        }

        for mission in MISSIONS:
            allowed = block_concepts[mission.block]
            with self.subTest(mission=mission.id):
                self.assertTrue(set(mission.expected_concepts).issubset(allowed))


if __name__ == "__main__":
    unittest.main()
