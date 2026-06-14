import unittest

from backend.validator import validate_mission


class ValidatorTests(unittest.TestCase):
    VALID_SOLUTIONS = {
        "mission_001": 'print("Hello, Mompy!")',
        "mission_002": 'name = "Mompy"\nprint(name)',
        "mission_003": "a = 2\nb = 3\nprint(a + b)",
        "mission_004": 'power = True\nif power:\n    print("Ready")',
        "mission_005": "for i in range(3):\n    print(i)",
        "mission_006": 'items = ["onion", "terminal", "python"]\nprint(items[1])',
        "mission_007": 'word = "Mompy"\nprint(len(word))',
        "mission_008": 'def greet(user):\n    return "Hello, " + user\nprint(greet("Mompy"))',
        "mission_009": "is_ready = True\nprint(is_ready)",
        "mission_010": 'name = "mompy"\nprint(name.upper())',
        "mission_011": "numbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)",
        "mission_012": 'profile = {"name": "Mompy"}\nprint(profile["name"])',
        "mission_013": "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
        "mission_014": 'user = "Mackson"\nprint(f"Hello, {user}")',
        "mission_015": "print(10 > 3)",
        "mission_016": "print(8 % 2)",
        "mission_017": "numbers = [1, 2, 3]\nprint([n * 2 for n in numbers])",
        "mission_018": "def add(a, b):\n    return a + b\nprint(add(2, 3))",
        "mission_019": 'phrase = "Python is fun"\nprint(phrase.split())',
        "mission_020": 'for letter in "py":\n    print(letter.upper())',
    }

    def test_first_mission_accepts_exact_print(self):
        result = validate_mission("mission_001", 'print("Hello, Mompy!")')
        self.assertTrue(result["correct"])
        self.assertEqual(result["expected_output"], "Hello, Mompy!")

    def test_all_current_missions_accept_reference_solution(self):
        for mission_id, code in self.VALID_SOLUTIONS.items():
            with self.subTest(mission_id=mission_id):
                result = validate_mission(mission_id, code)
                self.assertTrue(result["correct"], result)

    def test_first_mission_rejects_wrong_message(self):
        result = validate_mission("mission_001", 'print("Hello")')
        self.assertFalse(result["correct"])
        self.assertTrue(result["hints"])

    def test_variable_mission_accepts_variable_print(self):
        result = validate_mission("mission_002", 'name = "Mompy"\nprint(name)')
        self.assertTrue(result["correct"])

    def test_syntax_error_returns_hint(self):
        result = validate_mission("mission_001", 'print("Hello, Mompy!"')
        self.assertFalse(result["correct"])
        self.assertIn("sintaxe", result["hints"][0])


if __name__ == "__main__":
    unittest.main()
