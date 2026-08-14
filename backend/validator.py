"""Mission validation backed by safe Python execution."""

from __future__ import annotations

import ast
from dataclasses import dataclass
from typing import Callable

from .code_runner import preflight_user_code, run_user_code_safely
from .missions import MISSIONS_BY_ID


@dataclass(frozen=True)
class ValidationResult:
    correct: bool
    message: str
    hints: tuple[str, ...] = ()
    diagnostics: tuple[dict, ...] = ()
    expected_output: str | None = None
    actual_output: str = ""
    runtime_error: str = ""

    def to_dict(self) -> dict:
        return {
            "correct": self.correct,
            "message": self.message,
            "hints": list(self.hints),
            "diagnostics": list(self.diagnostics),
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


_MISSING = object()


def _tree(user_code: str) -> ast.Module:
    tree = parse_python(user_code)
    if not isinstance(tree, ast.Module):
        raise ValueError("Expected valid Python code.")
    return tree


def _literal_value(node: ast.AST | None) -> object:
    if node is None:
        return _MISSING
    try:
        return ast.literal_eval(node)
    except (ValueError, TypeError, SyntaxError, MemoryError, RecursionError):
        return _MISSING


def _literal_is(node: ast.AST | None, expected: object) -> bool:
    value = _literal_value(node)
    return value is not _MISSING and type(value) is type(expected) and value == expected


def _name_targets(node: ast.AST) -> set[str]:
    names: set[str] = set()
    for child in ast.walk(node):
        if isinstance(child, ast.Name) and isinstance(child.ctx, ast.Store):
            names.add(child.id)
    return names


def _assigned_names(tree: ast.Module, expected: object) -> set[str]:
    names: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign) and _literal_is(node.value, expected):
            for target in node.targets:
                names.update(_name_targets(target))
        elif isinstance(node, ast.AnnAssign) and _literal_is(node.value, expected):
            names.update(_name_targets(node.target))
    return names


def _assignments(tree: ast.Module) -> list[tuple[str, ast.AST, int]]:
    result: list[tuple[str, ast.AST, int]] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            for target in node.targets:
                for name in _name_targets(target):
                    result.append((name, node.value, node.lineno))
        elif isinstance(node, ast.AnnAssign) and node.value is not None:
            for name in _name_targets(node.target):
                result.append((name, node.value, node.lineno))
    return sorted(result, key=lambda item: item[2])


def _call_name(node: ast.AST | None) -> str | None:
    if not isinstance(node, ast.Call):
        return None
    if isinstance(node.func, ast.Name):
        return node.func.id
    return None


def _calls_named(node: ast.AST, name: str) -> list[ast.Call]:
    return [
        child
        for child in ast.walk(node)
        if isinstance(child, ast.Call) and _call_name(child) == name
    ]


def _print_calls(node: ast.AST) -> list[ast.Call]:
    return _calls_named(node, "print")


def _print_uses_name(node: ast.AST, names: set[str]) -> bool:
    return any(
        any(
            isinstance(child, ast.Name)
            and isinstance(child.ctx, ast.Load)
            and child.id in names
            for child in ast.walk(argument)
        )
        for call in _print_calls(node)
        for argument in call.args
    )


def _contains_name(node: ast.AST | None, name: str) -> bool:
    return bool(
        node
        and any(
            isinstance(child, ast.Name)
            and isinstance(child.ctx, ast.Load)
            and child.id == name
            for child in ast.walk(node)
        )
    )


def _contains_literal(node: ast.AST | None, expected: object) -> bool:
    return bool(
        node
        and any(_literal_is(child, expected) for child in ast.walk(node))
    )


def _is_named_subscript(node: ast.AST | None, names: set[str], key: object) -> bool:
    return bool(
        isinstance(node, ast.Subscript)
        and isinstance(node.value, ast.Name)
        and node.value.id in names
        and _literal_is(node.slice, key)
    )


def _updates_name(
    node: ast.AST,
    name: str,
    amount: int,
    operation: type[ast.operator],
) -> bool:
    for update in ast.walk(node):
        if (
            isinstance(update, ast.AugAssign)
            and isinstance(update.target, ast.Name)
            and update.target.id == name
            and isinstance(update.op, operation)
            and _literal_is(update.value, amount)
        ):
            return True
        if not isinstance(update, ast.Assign) or not isinstance(update.value, ast.BinOp):
            continue
        targets = set().union(*(_name_targets(target) for target in update.targets))
        if (
            name in targets
            and isinstance(update.value.op, operation)
            and _contains_name(update.value, name)
            and _contains_literal(update.value, amount)
        ):
            return True
    return False


def _while_compares(
    statement: ast.While,
    name: str,
    operator: type[ast.cmpop],
    value: int,
) -> bool:
    return any(
        isinstance(compare, ast.Compare)
        and isinstance(compare.left, ast.Name)
        and compare.left.id == name
        and len(compare.ops) == 1
        and isinstance(compare.ops[0], operator)
        and len(compare.comparators) == 1
        and _literal_is(compare.comparators[0], value)
        for compare in ast.walk(statement.test)
    )


def _is_range_call(node: ast.AST | None, *arguments: int) -> bool:
    return bool(
        isinstance(node, ast.Call)
        and _call_name(node) == "range"
        and len(node.args) == len(arguments)
        and all(_literal_is(value, expected) for value, expected in zip(node.args, arguments))
    )


def _statement_contains_print(statement: ast.AST) -> bool:
    return bool(_print_calls(statement))


def _first_line(node: ast.AST, node_type: type[ast.AST] | tuple[type[ast.AST], ...]) -> int | None:
    lines = [
        child.lineno
        for child in ast.walk(node)
        if isinstance(child, node_type) and hasattr(child, "lineno")
    ]
    return min(lines, default=None)


def _printed_call(tree: ast.Module, function_name: str, *arguments: object) -> bool:
    for print_call in _print_calls(tree):
        for argument in print_call.args:
            if not isinstance(argument, ast.Call) or _call_name(argument) != function_name:
                continue
            if len(argument.args) != len(arguments):
                continue
            if all(_literal_is(value, expected) for value, expected in zip(argument.args, arguments)):
                return True
    return False


def _called_with(tree: ast.Module, function_name: str, *arguments: object) -> bool:
    return any(
        len(call.args) == len(arguments)
        and all(_literal_is(value, expected) for value, expected in zip(call.args, arguments))
        for call in _calls_named(tree, function_name)
    )


def _is_string_composition(node: ast.AST | None, parameter: str, prefix: str) -> bool:
    if not node or not _contains_name(node, parameter):
        return False

    if isinstance(node, ast.JoinedStr):
        text = "".join(
            value.value
            for value in node.values
            if isinstance(value, ast.Constant) and isinstance(value.value, str)
        )
        return prefix.strip() in text

    return bool(
        isinstance(node, ast.BinOp)
        and isinstance(node.op, ast.Add)
        and _contains_literal(node, prefix)
    )


def _source_line(user_code: str, line: int | None) -> str:
    if not line or line < 1:
        return ""
    lines = user_code.splitlines()
    return lines[line - 1] if line <= len(lines) else ""


def _diagnostic(
    *,
    category: str,
    code: str,
    title: str,
    summary: str,
    suggestion: str,
    user_code: str,
    line: int | None = None,
    column: int | None = None,
    expected: str | None = None,
    actual: str | None = None,
) -> dict:
    return {
        "category": category,
        "code": code,
        "severity": "error",
        "title": title,
        "summary": summary,
        "suggestion": suggestion,
        "line": line,
        "column": column,
        "end_line": line,
        "end_column": None,
        "source_line": _source_line(user_code, line),
        "expected": expected,
        "actual": actual,
    }


def _last_print_line(user_code: str) -> int | None:
    tree = parse_python(user_code)
    if tree is None:
        return None

    lines = [
        node.lineno
        for node in ast.walk(tree)
        if isinstance(node, ast.Call)
        and isinstance(node.func, ast.Name)
        and node.func.id == "print"
        and hasattr(node, "lineno")
    ]
    return max(lines, default=None)


def _ok(mission_id: str) -> ValidationResult:
    mission = MISSIONS_BY_ID[mission_id]
    return ValidationResult(
        correct=True,
        message="Correct. The answer has the expected structure.",
        expected_output=mission.expected_output,
    )


def _fail(
    mission_id: str,
    *hints: str,
    user_code: str = "",
    line: int | None = None,
) -> ValidationResult:
    mission = MISSIONS_BY_ID.get(mission_id)
    fallback = mission.help if mission else "Review the code structure."
    resolved_hints = tuple(hints or (fallback,))
    diagnostic_line = line or (1 if user_code.strip() else None)
    return ValidationResult(
        correct=False,
        message="One mission requirement is still missing.",
        hints=resolved_hints,
        diagnostics=(
            _diagnostic(
                category="concept",
                code="mission_requirement_missing",
                title="Check the mission requirement",
                summary=resolved_hints[0],
                suggestion=fallback,
                user_code=user_code,
                line=diagnostic_line,
            ),
        ),
        expected_output=mission.expected_output if mission else None,
    )


def _with_execution(
    result: ValidationResult,
    mission_id: str,
    user_code: str,
    execution: dict | None = None,
) -> ValidationResult:
    mission = MISSIONS_BY_ID[mission_id]
    execution = execution or run_user_code_safely(user_code)
    actual_output = str(execution.get("output", ""))

    if not execution.get("ok"):
        error_message = str(execution.get("error") or "")
        diagnostic = execution.get("diagnostic")
        diagnostics = (diagnostic,) if isinstance(diagnostic, dict) else ()

        return ValidationResult(
            correct=False,
            message="Python stopped before the mission could be checked.",
            hints=(error_message or "Review the code and try again.",),
            diagnostics=diagnostics,
            expected_output=mission.expected_output,
            actual_output=actual_output,
            runtime_error=error_message,
        )

    if actual_output.strip() != mission.expected_output.strip():
        print_line = _last_print_line(user_code)
        return ValidationResult(
            correct=False,
            message="The program ran, but its output is different from the mission goal.",
            hints=("Compare the expected and received output below.",),
            diagnostics=(
                _diagnostic(
                    category="output",
                    code="output_mismatch",
                    title="The output does not match yet",
                    summary="Python ran the code successfully, but printed a different result.",
                    suggestion="Check the values and text passed to print().",
                    user_code=user_code,
                    line=print_line,
                    expected=mission.expected_output,
                    actual=actual_output,
                ),
            ),
            expected_output=mission.expected_output,
            actual_output=actual_output,
        )

    return ValidationResult(
        correct=result.correct,
        message="Correct. The code ran and produced the expected output.",
        hints=result.hints,
        diagnostics=result.diagnostics,
        expected_output=mission.expected_output,
        actual_output=actual_output,
    )


def _simple_print(mission_id: str, text: str) -> Callable[[str], ValidationResult]:
    def validator(code: str) -> ValidationResult:
        if print_count(code) >= 1:
            return _ok(mission_id)
        return _fail(
            mission_id,
            f'Use print() to show exactly: {text}',
            user_code=code,
            line=1,
        )

    return validator


def _mission_005(code: str) -> ValidationResult:
    tree = _tree(code)
    calls = _print_calls(tree)
    if len(calls) >= 2:
        return _ok("mission_005")
    return _fail(
        "mission_005",
        'Use two separate print() commands: one for "First" and one for "Second".',
        user_code=code,
        line=calls[-1].lineno if calls else 1,
    )


def _mission_006(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, "Mompy")
    if names and _print_uses_name(tree, names):
        return _ok("mission_006")
    return _fail(
        "mission_006",
        'Store "Mompy" in a variable, then pass that variable to print().',
        user_code=code,
        line=_first_line(tree, (ast.Assign, ast.AnnAssign, ast.Call)),
    )


def _mission_007(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 1)
    if names and _print_uses_name(tree, names):
        return _ok("mission_007")
    return _fail(
        "mission_007",
        "Store the number 1 in a variable, then print that variable.",
        user_code=code,
        line=_first_line(tree, (ast.Assign, ast.AnnAssign, ast.Call)),
    )


def _mission_008(code: str) -> ValidationResult:
    tree = _tree(code)
    assignments = _assignments(tree)
    for name, value, off_line in assignments:
        if not _literal_is(value, "off"):
            continue
        on_lines = [
            line
            for assigned_name, assigned_value, line in assignments
            if assigned_name == name and line > off_line and _literal_is(assigned_value, "on")
        ]
        if on_lines and _print_uses_name(tree, {name}):
            return _ok("mission_008")
    return _fail(
        "mission_008",
        'Assign "off" and then "on" to the same variable before printing it.',
        user_code=code,
        line=_first_line(tree, (ast.Assign, ast.AnnAssign, ast.Call)),
    )


def _mission_009(code: str) -> ValidationResult:
    tree = _tree(code)
    left_names = _assigned_names(tree, 2)
    right_names = _assigned_names(tree, 3)
    for call in _print_calls(tree):
        for argument in call.args:
            if not isinstance(argument, ast.BinOp) or not isinstance(argument.op, ast.Add):
                continue
            loaded_names = {
                child.id
                for child in ast.walk(argument)
                if isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load)
            }
            if loaded_names & left_names and loaded_names & right_names:
                return _ok("mission_009")
    return _fail(
        "mission_009",
        "Store 2 and 3 in two variables, then add those variables inside print().",
        user_code=code,
        line=_first_line(tree, (ast.BinOp, ast.Call, ast.Assign)),
    )


def _mission_010(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, "Ready")
    if names and _print_uses_name(tree, names):
        return _ok("mission_010")
    return _fail(
        "mission_010",
        'Store "Ready" in a variable, then print that variable.',
        user_code=code,
        line=_first_line(tree, (ast.Assign, ast.AnnAssign, ast.Call)),
    )


def _mission_011(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, True)
    for statement in ast.walk(tree):
        if (
            isinstance(statement, ast.If)
            and any(_contains_name(statement.test, name) for name in names)
            and any(_statement_contains_print(child) for child in statement.body)
        ):
            return _ok("mission_011")
    return _fail(
        "mission_011",
        'Store True in a variable and use that variable in an if before printing "Ready".',
        user_code=code,
        line=_first_line(tree, (ast.If, ast.Assign)),
    )


def _mission_012(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 10)
    for statement in ast.walk(tree):
        if not isinstance(statement, ast.If) or not isinstance(statement.test, ast.Compare):
            continue
        test = statement.test
        if (
            any(_contains_name(test.left, name) for name in names)
            and len(test.ops) == 1
            and isinstance(test.ops[0], ast.Gt)
            and len(test.comparators) == 1
            and _literal_is(test.comparators[0], 5)
            and any(_statement_contains_print(child) for child in statement.body)
        ):
            return _ok("mission_012")
    return _fail(
        "mission_012",
        'Compare the variable that stores 10 with 5 using >, then print "Warm" inside the if.',
        user_code=code,
        line=_first_line(tree, (ast.If, ast.Compare, ast.Assign)),
    )


def _mission_013(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, "py")
    for statement in ast.walk(tree):
        if not isinstance(statement, ast.If) or not isinstance(statement.test, ast.Compare):
            continue
        test = statement.test
        if (
            len(test.ops) == 1
            and isinstance(test.ops[0], ast.Eq)
            and any(_contains_name(test, name) for name in names)
            and _contains_literal(test, "py")
            and any(_statement_contains_print(child) for child in statement.body)
        ):
            return _ok("mission_013")
    return _fail(
        "mission_013",
        'Compare the variable that stores "py" using ==, then print "Python" inside the if.',
        user_code=code,
        line=_first_line(tree, (ast.If, ast.Compare, ast.Assign)),
    )


def _mission_014(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 1)
    for statement in ast.walk(tree):
        if not isinstance(statement, ast.If) or not isinstance(statement.test, ast.Compare):
            continue
        test = statement.test
        if (
            len(test.ops) == 1
            and isinstance(test.ops[0], ast.GtE)
            and any(_contains_name(test.left, name) for name in names)
            and len(test.comparators) == 1
            and _literal_is(test.comparators[0], 2)
            and any(_statement_contains_print(child) for child in statement.body)
            and any(_statement_contains_print(child) for child in statement.orelse)
        ):
            return _ok("mission_014")
    return _fail(
        "mission_014",
        'Compare the variable that stores 1 with 2 using >=, and print a result in both if and else.',
        user_code=code,
        line=_first_line(tree, (ast.If, ast.Compare, ast.Assign)),
    )


def _mission_015(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 3)
    for statement in ast.walk(tree):
        if not isinstance(statement, ast.If) or not isinstance(statement.test, ast.Compare):
            continue
        test = statement.test
        if (
            len(test.ops) == 1
            and isinstance(test.ops[0], ast.LtE)
            and any(_contains_name(test.left, name) for name in names)
            and len(test.comparators) == 1
            and _literal_is(test.comparators[0], 3)
            and any(_statement_contains_print(child) for child in statement.body)
        ):
            return _ok("mission_015")
    return _fail(
        "mission_015",
        'Compare the variable that stores 3 using <= 3, then print "Inside" in the if.',
        user_code=code,
        line=_first_line(tree, (ast.If, ast.Compare, ast.Assign)),
    )


def _mission_016(code: str) -> ValidationResult:
    tree = _tree(code)
    for statement in ast.walk(tree):
        if (
            isinstance(statement, ast.For)
            and _is_range_call(statement.iter, 3)
            and _print_uses_name(statement, _name_targets(statement.target))
        ):
            return _ok("mission_016")
    return _fail(
        "mission_016",
        "Loop over range(3) and print the loop variable inside the for.",
        user_code=code,
        line=_first_line(tree, (ast.For, ast.Call)),
    )


def _mission_017(code: str) -> ValidationResult:
    tree = _tree(code)
    for statement in ast.walk(tree):
        if (
            isinstance(statement, ast.For)
            and _is_range_call(statement.iter, 2)
            and any(_statement_contains_print(child) for child in statement.body)
        ):
            return _ok("mission_017")
    return _fail(
        "mission_017",
        'Loop over range(2) and print "Mompy" inside the for.',
        user_code=code,
        line=_first_line(tree, (ast.For, ast.Call)),
    )


def _mission_018(code: str) -> ValidationResult:
    tree = _tree(code)
    for statement in ast.walk(tree):
        if (
            isinstance(statement, ast.For)
            and _is_range_call(statement.iter, 1, 4)
            and _print_uses_name(statement, _name_targets(statement.target))
        ):
            return _ok("mission_018")
    return _fail(
        "mission_018",
        "Loop over range(1, 4) and print the loop variable inside the for.",
        user_code=code,
        line=_first_line(tree, (ast.For, ast.Call)),
    )


def _mission_019(code: str) -> ValidationResult:
    tree = _tree(code)
    for statement in ast.walk(tree):
        if (
            isinstance(statement, ast.For)
            and _literal_is(statement.iter, "py")
            and _print_uses_name(statement, _name_targets(statement.target))
        ):
            return _ok("mission_019")
    return _fail(
        "mission_019",
        'Loop directly over "py" and print each loop variable.',
        user_code=code,
        line=_first_line(tree, (ast.For, ast.Call)),
    )


def _mission_020(code: str) -> ValidationResult:
    tree = _tree(code)
    total_names = _assigned_names(tree, 0)
    for statement in ast.walk(tree):
        if not isinstance(statement, ast.For) or not _is_range_call(statement.iter, 3):
            continue
        loop_names = _name_targets(statement.target)
        updated_names: set[str] = set()
        for child in statement.body:
            for update in ast.walk(child):
                if (
                    isinstance(update, ast.AugAssign)
                    and isinstance(update.target, ast.Name)
                    and update.target.id in total_names
                    and isinstance(update.op, ast.Add)
                    and any(_contains_name(update.value, name) for name in loop_names)
                ):
                    updated_names.add(update.target.id)
                elif isinstance(update, ast.Assign) and isinstance(update.value, ast.BinOp):
                    if not isinstance(update.value.op, ast.Add):
                        continue
                    targets = set().union(*(_name_targets(target) for target in update.targets))
                    for name in targets & total_names:
                        if _contains_name(update.value, name) and any(
                            _contains_name(update.value, loop_name) for loop_name in loop_names
                        ):
                            updated_names.add(name)
        if updated_names and _print_uses_name(tree, updated_names):
            return _ok("mission_020")
    return _fail(
        "mission_020",
        "Start a total at 0, add each value from range(3) inside the loop, then print the total.",
        user_code=code,
        line=_first_line(tree, (ast.For, ast.AugAssign, ast.Assign)),
    )


def _mission_021(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, ["onion", "terminal", "python"])
    if names and _print_uses_name(tree, names):
        return _ok("mission_021")
    return _fail(
        "mission_021",
        'Store ["onion", "terminal", "python"] in a list variable, then print that variable.',
        user_code=code,
        line=_first_line(tree, (ast.List, ast.Assign, ast.Call)),
    )


def _mission_022(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, ["onion", "terminal", "python"])
    for call in _print_calls(tree):
        for argument in call.args:
            if (
                isinstance(argument, ast.Subscript)
                and isinstance(argument.value, ast.Name)
                and argument.value.id in names
                and _literal_is(argument.slice, 1)
            ):
                return _ok("mission_022")
    return _fail(
        "mission_022",
        "Print index [1] from the variable that stores the three-item list.",
        user_code=code,
        line=_first_line(tree, (ast.Subscript, ast.Call, ast.List)),
    )


def _mission_023(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, [1, 2, 3])
    appended: set[str] = set()
    for call in ast.walk(tree):
        if (
            isinstance(call, ast.Call)
            and isinstance(call.func, ast.Attribute)
            and call.func.attr == "append"
            and isinstance(call.func.value, ast.Name)
            and call.func.value.id in names
            and len(call.args) == 1
            and _literal_is(call.args[0], 4)
        ):
            appended.add(call.func.value.id)
    if appended and _print_uses_name(tree, appended):
        return _ok("mission_023")
    return _fail(
        "mission_023",
        "Store [1, 2, 3], call .append(4) on that same variable, then print it.",
        user_code=code,
        line=_first_line(tree, (ast.List, ast.Call)),
    )


def _mission_024(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, ["onion", "python"])
    for statement in ast.walk(tree):
        if (
            isinstance(statement, ast.For)
            and isinstance(statement.iter, ast.Name)
            and statement.iter.id in names
            and _print_uses_name(statement, _name_targets(statement.target))
        ):
            return _ok("mission_024")
    return _fail(
        "mission_024",
        "Loop over the variable that stores the list and print the loop item inside the for.",
        user_code=code,
        line=_first_line(tree, (ast.For, ast.List, ast.Call)),
    )


def _mission_025(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, [1, 2, 3])
    for print_call in _print_calls(tree):
        for argument in print_call.args:
            if (
                isinstance(argument, ast.Call)
                and _call_name(argument) == "len"
                and len(argument.args) == 1
                and isinstance(argument.args[0], ast.Name)
                and argument.args[0].id in names
            ):
                return _ok("mission_025")
    return _fail(
        "mission_025",
        "Pass the variable that stores [1, 2, 3] to len(), then print the result.",
        user_code=code,
        line=_first_line(tree, (ast.Call, ast.List)),
    )


def _mission_026(code: str) -> ValidationResult:
    tree = _tree(code)
    for function in (node for node in tree.body if isinstance(node, ast.FunctionDef)):
        if function.args.args or not _print_calls(function):
            continue
        if _called_with(tree, function.name):
            return _ok("mission_026")
    return _fail(
        "mission_026",
        'Create a function with no parameters, print "Hello" inside it, and call the function.',
        user_code=code,
        line=_first_line(tree, (ast.FunctionDef, ast.Call)),
    )


def _mission_027(code: str) -> ValidationResult:
    tree = _tree(code)
    for function in (node for node in tree.body if isinstance(node, ast.FunctionDef)):
        if len(function.args.args) != 1:
            continue
        parameter = function.args.args[0].arg
        has_message = any(
            _is_string_composition(argument, parameter, "Hello, ")
            for call in _print_calls(function)
            for argument in call.args
        )
        if has_message and _called_with(tree, function.name, "Mompy"):
            return _ok("mission_027")
    return _fail(
        "mission_027",
        'Create a one-parameter function that prints "Hello, " with its parameter, then call it with "Mompy".',
        user_code=code,
        line=_first_line(tree, (ast.FunctionDef, ast.Call)),
    )


def _mission_028(code: str) -> ValidationResult:
    tree = _tree(code)
    for function in (node for node in tree.body if isinstance(node, ast.FunctionDef)):
        if len(function.args.args) != 2:
            continue
        parameters = {argument.arg for argument in function.args.args}
        has_sum = any(
            isinstance(statement.value, ast.BinOp)
            and isinstance(statement.value.op, ast.Add)
            and all(_contains_name(statement.value, parameter) for parameter in parameters)
            for statement in ast.walk(function)
            if isinstance(statement, ast.Return) and statement.value is not None
        )
        if has_sum and _printed_call(tree, function.name, 2, 3):
            return _ok("mission_028")
    return _fail(
        "mission_028",
        "Create a two-parameter function that returns their sum, then print its result for 2 and 3.",
        user_code=code,
        line=_first_line(tree, (ast.FunctionDef, ast.Return, ast.Call)),
    )


def _mission_029(code: str) -> ValidationResult:
    tree = _tree(code)
    for function in (node for node in tree.body if isinstance(node, ast.FunctionDef)):
        if len(function.args.args) != 1:
            continue
        parameter = function.args.args[0].arg
        has_message = any(
            _is_string_composition(statement.value, parameter, "Hello, ")
            for statement in ast.walk(function)
            if isinstance(statement, ast.Return)
        )
        if has_message and _printed_call(tree, function.name, "Mackson"):
            return _ok("mission_029")
    return _fail(
        "mission_029",
        'Return a "Hello, " message built with the parameter, then print the function result for "Mackson".',
        user_code=code,
        line=_first_line(tree, (ast.FunctionDef, ast.Return, ast.Call)),
    )


def _mission_030(code: str) -> ValidationResult:
    tree = _tree(code)
    for function in (node for node in tree.body if isinstance(node, ast.FunctionDef)):
        if len(function.args.args) != 1:
            continue
        parameter = function.args.args[0].arg
        has_double = any(
            isinstance(statement.value, ast.BinOp)
            and isinstance(statement.value.op, ast.Mult)
            and _contains_name(statement.value, parameter)
            and _contains_literal(statement.value, 2)
            for statement in ast.walk(function)
            if isinstance(statement, ast.Return) and statement.value is not None
        )
        if has_double and _printed_call(tree, function.name, 4):
            return _ok("mission_030")
    return _fail(
        "mission_030",
        "Create a one-parameter function that returns the value multiplied by 2, then print its result for 4.",
        user_code=code,
        line=_first_line(tree, (ast.FunctionDef, ast.Return, ast.Call)),
    )


def _mission_031(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, {"name": "Mompy", "level": 1})
    if names and _print_uses_name(tree, names):
        return _ok("mission_031")
    return _fail(
        "mission_031",
        'Store both "name" and "level" in one dictionary variable, then print that variable.',
        user_code=code,
        line=_first_line(tree, (ast.Dict, ast.Assign, ast.Call)),
    )


def _mission_032(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, {"name": "Mompy", "level": 1})
    if any(
        _is_named_subscript(argument, names, "name")
        for call in _print_calls(tree)
        for argument in call.args
    ):
        return _ok("mission_032")
    return _fail(
        "mission_032",
        'Read the "name" key from the profile dictionary with brackets and print it.',
        user_code=code,
        line=_first_line(tree, (ast.Subscript, ast.Dict, ast.Call)),
    )


def _mission_033(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, {"name": "Mompy"})
    changed = {
        target.value.id
        for statement in ast.walk(tree)
        if isinstance(statement, ast.Assign) and _literal_is(statement.value, "Python")
        for target in statement.targets
        if _is_named_subscript(target, names, "language")
        and isinstance(target.value, ast.Name)
    }
    if changed and any(
        _is_named_subscript(argument, changed, "language")
        for call in _print_calls(tree)
        for argument in call.args
    ):
        return _ok("mission_033")
    return _fail(
        "mission_033",
        'Assign "Python" to the new "language" key, then print that key from the same dictionary.',
        user_code=code,
        line=_first_line(tree, (ast.Subscript, ast.Assign, ast.Call)),
    )


def _mission_034(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, {"level": 1})
    changed = {
        target.value.id
        for statement in ast.walk(tree)
        if isinstance(statement, ast.Assign) and _literal_is(statement.value, 2)
        for target in statement.targets
        if _is_named_subscript(target, names, "level")
        and isinstance(target.value, ast.Name)
    }
    if changed and any(
        _is_named_subscript(argument, changed, "level")
        for call in _print_calls(tree)
        for argument in call.args
    ):
        return _ok("mission_034")
    return _fail(
        "mission_034",
        'Assign 2 to the existing "level" key, then print the updated value.',
        user_code=code,
        line=_first_line(tree, (ast.Subscript, ast.Assign, ast.Call)),
    )


def _mission_035(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, {"name": "Mompy"})
    get_calls = [
        call
        for call in ast.walk(tree)
        if isinstance(call, ast.Call)
        and isinstance(call.func, ast.Attribute)
        and call.func.attr == "get"
        and isinstance(call.func.value, ast.Name)
        and call.func.value.id in names
        and len(call.args) == 2
        and _literal_is(call.args[0], "mode")
        and _literal_is(call.args[1], "offline")
    ]
    directly_printed = any(
        any(argument is get_call for argument in print_call.args)
        for get_call in get_calls
        for print_call in _print_calls(tree)
    )
    result_names = {
        name
        for name, value, _line in _assignments(tree)
        if any(value is get_call for get_call in get_calls)
    }
    if directly_printed or (result_names and _print_uses_name(tree, result_names)):
        return _ok("mission_035")
    return _fail(
        "mission_035",
        'Call profile.get("mode", "offline") and print the value it returns.',
        user_code=code,
        line=_first_line(tree, (ast.Attribute, ast.Call, ast.Dict)),
    )


def _mission_036(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 1)
    for statement in (node for node in ast.walk(tree) if isinstance(node, ast.While)):
        for name in names:
            if (
                _while_compares(statement, name, ast.LtE, 3)
                and _print_uses_name(statement, {name})
                and _updates_name(statement, name, 1, ast.Add)
            ):
                return _ok("mission_036")
    return _fail(
        "mission_036",
        "Start a counter at 1, repeat while it is <= 3, print it, and increase it by 1.",
        user_code=code,
        line=_first_line(tree, (ast.While, ast.Compare, ast.AugAssign, ast.Assign)),
    )


def _mission_037(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 3)
    for statement in (node for node in ast.walk(tree) if isinstance(node, ast.While)):
        for name in names:
            if (
                _while_compares(statement, name, ast.Gt, 0)
                and _print_uses_name(statement, {name})
                and _updates_name(statement, name, 1, ast.Sub)
            ):
                return _ok("mission_037")
    return _fail(
        "mission_037",
        "Start at 3, repeat while the counter is > 0, print it, and decrease it by 1.",
        user_code=code,
        line=_first_line(tree, (ast.While, ast.Compare, ast.AugAssign, ast.Assign)),
    )


def _mission_038(code: str) -> ValidationResult:
    tree = _tree(code)
    total_names = _assigned_names(tree, 0)
    count_names = _assigned_names(tree, 1)
    for statement in (node for node in ast.walk(tree) if isinstance(node, ast.While)):
        for count_name in count_names:
            if not _while_compares(statement, count_name, ast.LtE, 4):
                continue
            if not _updates_name(statement, count_name, 1, ast.Add):
                continue
            for total_name in total_names:
                adds_counter = any(
                    isinstance(update, ast.AugAssign)
                    and isinstance(update.target, ast.Name)
                    and update.target.id == total_name
                    and isinstance(update.op, ast.Add)
                    and _contains_name(update.value, count_name)
                    for update in ast.walk(statement)
                ) or any(
                    isinstance(update, ast.Assign)
                    and total_name in set().union(*(_name_targets(target) for target in update.targets))
                    and isinstance(update.value, ast.BinOp)
                    and isinstance(update.value.op, ast.Add)
                    and _contains_name(update.value, total_name)
                    and _contains_name(update.value, count_name)
                    for update in ast.walk(statement)
                )
                if adds_counter and _print_uses_name(tree, {total_name}):
                    return _ok("mission_038")
    return _fail(
        "mission_038",
        "Use a while counter from 1 through 4, add each counter value to total, then print total.",
        user_code=code,
        line=_first_line(tree, (ast.While, ast.AugAssign, ast.Assign, ast.Call)),
    )


def _mission_039(code: str) -> ValidationResult:
    tree = _tree(code)
    names = _assigned_names(tree, 0)
    for statement in (node for node in ast.walk(tree) if isinstance(node, ast.While)):
        for name in names:
            if (
                _while_compares(statement, name, ast.LtE, 4)
                and _print_uses_name(statement, {name})
                and _updates_name(statement, name, 2, ast.Add)
            ):
                return _ok("mission_039")
    return _fail(
        "mission_039",
        "Start at 0, repeat while the number is <= 4, print it, and increase it by 2.",
        user_code=code,
        line=_first_line(tree, (ast.While, ast.Compare, ast.AugAssign, ast.Assign)),
    )


def _mission_040(code: str) -> ValidationResult:
    tree = _tree(code)
    list_names = _assigned_names(tree, ["learn", "practice", "build"])
    index_names = _assigned_names(tree, 0)
    for statement in (node for node in ast.walk(tree) if isinstance(node, ast.While)):
        for index_name in index_names:
            compares_length = any(
                isinstance(compare, ast.Compare)
                and isinstance(compare.left, ast.Name)
                and compare.left.id == index_name
                and len(compare.ops) == 1
                and isinstance(compare.ops[0], ast.Lt)
                and len(compare.comparators) == 1
                and isinstance(compare.comparators[0], ast.Call)
                and _call_name(compare.comparators[0]) == "len"
                and len(compare.comparators[0].args) == 1
                and isinstance(compare.comparators[0].args[0], ast.Name)
                and compare.comparators[0].args[0].id in list_names
                for compare in ast.walk(statement.test)
            )
            prints_item = any(
                isinstance(argument, ast.Subscript)
                and isinstance(argument.value, ast.Name)
                and argument.value.id in list_names
                and isinstance(argument.slice, ast.Name)
                and argument.slice.id == index_name
                for call in _print_calls(statement)
                for argument in call.args
            )
            if compares_length and prints_item and _updates_name(statement, index_name, 1, ast.Add):
                return _ok("mission_040")
    return _fail(
        "mission_040",
        "Use an index starting at 0, loop while it is below len(steps), print steps[index], and increase the index.",
        user_code=code,
        line=_first_line(tree, (ast.While, ast.Subscript, ast.Call, ast.Assign)),
    )


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
    "mission_031": _mission_031,
    "mission_032": _mission_032,
    "mission_033": _mission_033,
    "mission_034": _mission_034,
    "mission_035": _mission_035,
    "mission_036": _mission_036,
    "mission_037": _mission_037,
    "mission_038": _mission_038,
    "mission_039": _mission_039,
    "mission_040": _mission_040,
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

    validator = VALIDATORS.get(mission_id)
    if validator is None:
        return ValidationResult(
            correct=False,
            message="Validator not implemented for this mission yet.",
            hints=("The structure is ready for this validation to be added.",),
            expected_output=mission.expected_output,
        ).to_dict()

    preflight = preflight_user_code(user_code)
    if not preflight.get("ok"):
        return _with_execution(_fail(mission_id), mission_id, user_code, preflight).to_dict()

    structure_result = validator(user_code)
    if not structure_result.correct:
        return ValidationResult(
            correct=False,
            message=structure_result.message,
            hints=structure_result.hints,
            diagnostics=structure_result.diagnostics,
            expected_output=mission.expected_output,
        ).to_dict()

    execution = run_user_code_safely(user_code)
    if not execution.get("ok"):
        return _with_execution(_fail(mission_id), mission_id, user_code, execution).to_dict()

    return _with_execution(structure_result, mission_id, user_code, execution).to_dict()
