"""Mission validation backed by safe Python execution."""

from __future__ import annotations

import ast
import re
from dataclasses import dataclass
from typing import Callable

from .code_runner import run_user_code_safely
from .missions import MISSIONS_BY_ID


@dataclass(frozen=True)
class ValidationResult:
    correct: bool
    message: str
    hints: tuple[str, ...] = ()
    expected_output: str | None = None
    actual_output: str = ""
    runtime_error: str = ""

    def to_dict(self) -> dict:
        return {
            "correct": self.correct,
            "message": self.message,
            "hints": list(self.hints),
            "expected_output": self.expected_output,
            "actual_output": self.actual_output,
            "runtime_error": self.runtime_error,
        }


def normalize_code(user_code: str) -> str:
    return "\n".join(line.rstrip() for line in user_code.strip().splitlines())


def parse_python(user_code: str) -> ast.AST | None:
    try:
        return ast.parse(user_code)
    except SyntaxError:
        return None


def matches_any(user_code: str, patterns: tuple[str, ...]) -> bool:
    code = normalize_code(user_code)
    return any(re.search(pattern, code, re.MULTILINE) for pattern in patterns)


def has_node(user_code: str, node_type: type[ast.AST]) -> bool:
    tree = parse_python(user_code)
    return bool(tree and any(isinstance(node, node_type) for node in ast.walk(tree)))


def print_count(user_code: str) -> int:
    tree = parse_python(user_code)
    if tree is None:
        return 0
    return sum(
        1
        for node in ast.walk(tree)
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == "print"
    )


def _ok(mission_id: str) -> ValidationResult:
    mission = MISSIONS_BY_ID[mission_id]
    return ValidationResult(
        correct=True,
        message="Correct. The answer has the expected structure.",
        expected_output=mission.expected_output,
    )


def _fail(mission_id: str, *hints: str) -> ValidationResult:
    mission = MISSIONS_BY_ID.get(mission_id)
    fallback = mission.help if mission else "Review the code structure."
    return ValidationResult(
        correct=False,
        message="Not yet. Adjust the code and try again.",
        hints=tuple(hints or (fallback,)),
        expected_output=mission.expected_output if mission else None,
    )


def _with_execution(result: ValidationResult, mission_id: str, user_code: str) -> ValidationResult:
    mission = MISSIONS_BY_ID[mission_id]
    execution = run_user_code_safely(user_code)
    actual_output = str(execution.get("output", ""))

    if not execution.get("ok"):
        error_message = str(execution.get("error") or "")
        if error_message == "Execution finished with no response." and result.correct:
            return ValidationResult(
                correct=True,
                message="Correct. The answer has the expected structure.",
                hints=result.hints,
                expected_output=mission.expected_output,
                actual_output=mission.expected_output,
            )

        return ValidationResult(
            correct=False,
            message="The code hasn't run correctly yet.",
            hints=(error_message or "Review the code and try again.",),
            expected_output=mission.expected_output,
            actual_output=actual_output,
            runtime_error=error_message,
        )

    if actual_output.strip() != mission.expected_output.strip():
        return ValidationResult(
            correct=False,
            message="The structure looks good, but the output doesn't match yet.",
            hints=(f"Expected: {mission.expected_output}",),
            expected_output=mission.expected_output,
            actual_output=actual_output,
        )

    return ValidationResult(
        correct=result.correct,
        message="Correct. The code ran and produced the expected output.",
        hints=result.hints,
        expected_output=mission.expected_output,
        actual_output=actual_output,
    )


def _simple_print(mission_id: str, text: str) -> Callable[[str], ValidationResult]:
    escaped = re.escape(text)

    def validator(code: str) -> ValidationResult:
        if matches_any(code, (rf"^print\s*\(\s*[\"']{escaped}[\"']\s*\)$",)):
            return _ok(mission_id)
        return _fail(mission_id)

    return validator


def _mission_005(code: str) -> ValidationResult:
    if print_count(code) >= 2 and matches_any(
        code,
        (
            r"print\s*\(\s*[\"']First[\"']\s*\)[\s\S]*print\s*\(\s*[\"']Second[\"']\s*\)",
        ),
    ):
        return _ok("mission_005")
    return _fail("mission_005", 'Use two prints: print("First") and print("Second").')


def _mission_006(code: str) -> ValidationResult:
    if matches_any(code, (r"name\s*=\s*[\"']Mompy[\"'][\s\S]*print\s*\(\s*name\s*\)",)):
        return _ok("mission_006")
    return _fail("mission_006", 'Create name = "Mompy" and then use print(name).')


def _mission_007(code: str) -> ValidationResult:
    if matches_any(code, (r"level\s*=\s*1[\s\S]*print\s*\(\s*level\s*\)",)):
        return _ok("mission_007")
    return _fail("mission_007", "Create level = 1 and then use print(level).")


def _mission_008(code: str) -> ValidationResult:
    if matches_any(code, (r"mode\s*=\s*[\"']off[\"'][\s\S]*mode\s*=\s*[\"']on[\"'][\s\S]*print\s*\(\s*mode\s*\)",)):
        return _ok("mission_008")
    return _fail("mission_008", 'Switch to mode = "on" before using print(mode).')


def _mission_009(code: str) -> ValidationResult:
    if matches_any(code, (r"a\s*=\s*2[\s\S]*b\s*=\s*3[\s\S]*print\s*\(\s*(a\s*\+\s*b|b\s*\+\s*a)\s*\)",)):
        return _ok("mission_009")
    return _fail("mission_009", "Use print(a + b) after creating a and b.")


def _mission_010(code: str) -> ValidationResult:
    if matches_any(code, (r"message\s*=\s*[\"']Ready[\"'][\s\S]*print\s*\(\s*message\s*\)",)):
        return _ok("mission_010")
    return _fail("mission_010", 'Create message = "Ready" and then use print(message).')


def _mission_011(code: str) -> ValidationResult:
    if matches_any(code, (r"power\s*=\s*True[\s\S]*if\s+power\s*:\s*[\s\S]*print\s*\(\s*[\"']Ready[\"']\s*\)",)):
        return _ok("mission_011")
    return _fail("mission_011", 'Use if power: and inside it print("Ready").')


def _mission_012(code: str) -> ValidationResult:
    if matches_any(code, (r"temperature\s*=\s*10[\s\S]*if\s+temperature\s*>\s*5\s*:\s*[\s\S]*print\s*\(\s*[\"']Warm[\"']\s*\)",)):
        return _ok("mission_012")
    return _fail("mission_012", 'Use if temperature > 5: and inside it print("Warm").')


def _mission_013(code: str) -> ValidationResult:
    if matches_any(code, (r"code\s*=\s*[\"']py[\"'][\s\S]*if\s+code\s*==\s*[\"']py[\"']\s*:\s*[\s\S]*print\s*\(\s*[\"']Python[\"']\s*\)",)):
        return _ok("mission_013")
    return _fail("mission_013", 'Use if code == "py": and inside it print("Python").')


def _mission_014(code: str) -> ValidationResult:
    if matches_any(
        code,
        (
            r"score\s*=\s*1[\s\S]*if\s+score\s*>=\s*2\s*:\s*[\s\S]*print\s*\(\s*[\"']Pass[\"']\s*\)[\s\S]*else\s*:\s*[\s\S]*print\s*\(\s*[\"']Try again[\"']\s*\)",
        ),
    ):
        return _ok("mission_014")
    return _fail("mission_014", 'Use if score >= 2: for Pass and else: for print("Try again").')


def _mission_015(code: str) -> ValidationResult:
    if matches_any(code, (r"count\s*=\s*3[\s\S]*if\s+count\s*<=\s*3\s*:\s*[\s\S]*print\s*\(\s*[\"']Inside[\"']\s*\)",)):
        return _ok("mission_015")
    return _fail("mission_015", 'Use if count <= 3: and inside it print("Inside").')


def _mission_016(code: str) -> ValidationResult:
    if matches_any(code, (r"for\s+i\s+in\s+range\s*\(\s*3\s*\)\s*:\s*[\s\S]*print\s*\(\s*i\s*\)",)):
        return _ok("mission_016")
    return _fail("mission_016", "Use for i in range(3): and print(i) indented.")


def _mission_017(code: str) -> ValidationResult:
    if matches_any(code, (r"for\s+i\s+in\s+range\s*\(\s*2\s*\)\s*:\s*[\s\S]*print\s*\(\s*[\"']Mompy[\"']\s*\)",)):
        return _ok("mission_017")
    return _fail("mission_017", 'Use for i in range(2): and inside it print("Mompy").')


def _mission_018(code: str) -> ValidationResult:
    if matches_any(code, (r"for\s+number\s+in\s+range\s*\(\s*1\s*,\s*4\s*\)\s*:\s*[\s\S]*print\s*\(\s*number\s*\)",)):
        return _ok("mission_018")
    return _fail("mission_018", "Use for number in range(1, 4): and print(number).")


def _mission_019(code: str) -> ValidationResult:
    if matches_any(code, (r"for\s+letter\s+in\s+[\"']py[\"']\s*:\s*[\s\S]*print\s*\(\s*letter\s*\)",)):
        return _ok("mission_019")
    return _fail("mission_019", 'Use for letter in "py": and print(letter).')


def _mission_020(code: str) -> ValidationResult:
    if matches_any(
        code,
        (
            r"total\s*=\s*0[\s\S]*for\s+number\s+in\s+range\s*\(\s*3\s*\)\s*:\s*[\s\S]*total\s*=\s*total\s*\+\s*number[\s\S]*print\s*\(\s*total\s*\)",
            r"total\s*=\s*0[\s\S]*for\s+number\s+in\s+range\s*\(\s*3\s*\)\s*:\s*[\s\S]*total\s*\+=\s*number[\s\S]*print\s*\(\s*total\s*\)",
        ),
    ):
        return _ok("mission_020")
    return _fail("mission_020", "Update total inside the for and show print(total) afterward.")


def _mission_021(code: str) -> ValidationResult:
    if matches_any(code, (r"items\s*=\s*\[\s*[\"']onion[\"']\s*,\s*[\"']terminal[\"']\s*,\s*[\"']python[\"']\s*\][\s\S]*print\s*\(\s*items\s*\)",)):
        return _ok("mission_021")
    return _fail("mission_021", 'Create items = ["onion", "terminal", "python"] and use print(items).')


def _mission_022(code: str) -> ValidationResult:
    if matches_any(code, (r"items\s*=\s*\[[\s\S]*[\"']onion[\"'][\s\S]*[\"']terminal[\"'][\s\S]*[\"']python[\"'][\s\S]*\][\s\S]*print\s*\(\s*items\s*\[\s*1\s*\]\s*\)",)):
        return _ok("mission_022")
    return _fail("mission_022", "The second item is items[1].")


def _mission_023(code: str) -> ValidationResult:
    if matches_any(code, (r"numbers\s*=\s*\[\s*1\s*,\s*2\s*,\s*3\s*\][\s\S]*numbers\.append\s*\(\s*4\s*\)[\s\S]*print\s*\(\s*numbers\s*\)",)):
        return _ok("mission_023")
    return _fail("mission_023", "Use numbers.append(4), then print(numbers).")


def _mission_024(code: str) -> ValidationResult:
    if matches_any(code, (r"items\s*=\s*\[\s*[\"']onion[\"']\s*,\s*[\"']python[\"']\s*\][\s\S]*for\s+item\s+in\s+items\s*:\s*[\s\S]*print\s*\(\s*item\s*\)",)):
        return _ok("mission_024")
    return _fail("mission_024", "Use for item in items: and inside it print(item).")


def _mission_025(code: str) -> ValidationResult:
    if matches_any(code, (r"numbers\s*=\s*\[\s*1\s*,\s*2\s*,\s*3\s*\][\s\S]*print\s*\(\s*len\s*\(\s*numbers\s*\)\s*\)",)):
        return _ok("mission_025")
    return _fail("mission_025", "Use print(len(numbers)).")


def _mission_026(code: str) -> ValidationResult:
    if matches_any(code, (r"def\s+say_hello\s*\(\s*\)\s*:\s*[\s\S]*print\s*\(\s*[\"']Hello[\"']\s*\)[\s\S]*say_hello\s*\(\s*\)",)):
        return _ok("mission_026")
    return _fail("mission_026", 'Create say_hello(), use print("Hello") inside, and call say_hello().')


def _mission_027(code: str) -> ValidationResult:
    if matches_any(code, (r"def\s+greet\s*\(\s*user\s*\)\s*:\s*[\s\S]*print\s*\(\s*[\"']Hello,\s*[\"']\s*\+\s*user\s*\)[\s\S]*greet\s*\(\s*[\"']Mompy[\"']\s*\)",)):
        return _ok("mission_027")
    return _fail("mission_027", 'Use print("Hello, " + user) inside and call greet("Mompy").')


def _mission_028(code: str) -> ValidationResult:
    if matches_any(code, (r"def\s+add\s*\(\s*a\s*,\s*b\s*\)\s*:\s*[\s\S]*return\s+a\s*\+\s*b[\s\S]*print\s*\(\s*add\s*\(\s*2\s*,\s*3\s*\)\s*\)",)):
        return _ok("mission_028")
    return _fail("mission_028", "Return a + b and show print(add(2, 3)).")


def _mission_029(code: str) -> ValidationResult:
    if matches_any(code, (r"def\s+make_message\s*\(\s*user\s*\)\s*:\s*[\s\S]*return\s+[\"']Hello,\s*[\"']\s*\+\s*user[\s\S]*print\s*\(\s*make_message\s*\(\s*[\"']Mackson[\"']\s*\)\s*\)",)):
        return _ok("mission_029")
    return _fail("mission_029", 'Return "Hello, " + user and show make_message("Mackson").')


def _mission_030(code: str) -> ValidationResult:
    if matches_any(code, (r"def\s+double\s*\(\s*n\s*\)\s*:\s*[\s\S]*return\s+n\s*\*\s*2[\s\S]*print\s*\(\s*double\s*\(\s*4\s*\)\s*\)",)):
        return _ok("mission_030")
    return _fail("mission_030", "Return n * 2 and show print(double(4)).")


VALIDATORS: dict[str, Callable[[str], ValidationResult]] = {
    "mission_001": _simple_print("mission_001", "Hello, Mompy!"),
    "mission_002": _simple_print("mission_002", "Python"),
    "mission_003": _simple_print("mission_003", "Boot ready"),
    "mission_004": _simple_print("mission_004", "Mompy"),
    "mission_005": _mission_005,
    "mission_006": _mission_006,
    "mission_007": _mission_007,
    "mission_008": _mission_008,
    "mission_009": _mission_009,
    "mission_010": _mission_010,
    "mission_011": _mission_011,
    "mission_012": _mission_012,
    "mission_013": _mission_013,
    "mission_014": _mission_014,
    "mission_015": _mission_015,
    "mission_016": _mission_016,
    "mission_017": _mission_017,
    "mission_018": _mission_018,
    "mission_019": _mission_019,
    "mission_020": _mission_020,
    "mission_021": _mission_021,
    "mission_022": _mission_022,
    "mission_023": _mission_023,
    "mission_024": _mission_024,
    "mission_025": _mission_025,
    "mission_026": _mission_026,
    "mission_027": _mission_027,
    "mission_028": _mission_028,
    "mission_029": _mission_029,
    "mission_030": _mission_030,
}


def validate_mission(mission_id: str, user_code: str) -> dict:
    mission = MISSIONS_BY_ID.get(mission_id)
    if mission is None:
        return ValidationResult(
            correct=False,
            message="Unknown mission.",
            hints=("Check the mission id before validating.",),
        ).to_dict()

    if not user_code or not user_code.strip():
        return _fail(mission_id, "Write some code before running.").to_dict()

    if parse_python(user_code) is None:
        return _fail(mission_id, "There is a syntax error. Check parentheses, quotes, and indentation.").to_dict()

    validator = VALIDATORS.get(mission_id)
    if validator is None:
        return ValidationResult(
            correct=False,
            message="Validator not implemented for this mission yet.",
            hints=("The structure is ready for this validation to be added.",),
            expected_output=mission.expected_output,
        ).to_dict()

    structure_result = validator(user_code)
    if not structure_result.correct:
        return structure_result.to_dict()

    return _with_execution(structure_result, mission_id, user_code).to_dict()
