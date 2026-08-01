"""Safe-enough Python execution for beginner Mompy missions.

This runner is intentionally small and conservative. It executes simple
educational code in a separate process, captures stdout, blocks dangerous AST
nodes and names, and kills slow code after a short timeout.
"""

from __future__ import annotations

import ast
import contextlib
import io
import multiprocessing
import queue
import traceback
from dataclasses import dataclass
from types import MappingProxyType


TIMEOUT_SECONDS = 4.0
RESULT_QUEUE_TIMEOUT_SECONDS = 0.75
MAX_CODE_LENGTH = 4_000
MAX_OUTPUT_LENGTH = 2_000

ALLOWED_BUILTINS = MappingProxyType(
    {
        "abs": abs,
        "bool": bool,
        "dict": dict,
        "enumerate": enumerate,
        "float": float,
        "int": int,
        "len": len,
        "list": list,
        "max": max,
        "min": min,
        "print": print,
        "range": range,
        "round": round,
        "set": set,
        "str": str,
        "sum": sum,
        "tuple": tuple,
        "True": True,
        "False": False,
        "None": None,
    }
)

BLOCKED_NAMES = {
    "__builtins__",
    "__import__",
    "breakpoint",
    "compile",
    "delattr",
    "dir",
    "eval",
    "exec",
    "getattr",
    "globals",
    "help",
    "input",
    "locals",
    "memoryview",
    "open",
    "setattr",
    "type",
    "vars",
}

BLOCKED_NODES = (
    ast.AsyncFor,
    ast.AsyncFunctionDef,
    ast.AsyncWith,
    ast.Await,
    ast.ClassDef,
    ast.Delete,
    ast.Global,
    ast.Import,
    ast.ImportFrom,
    ast.Lambda,
    ast.Nonlocal,
    ast.Raise,
    ast.Try,
    ast.With,
)


@dataclass(frozen=True)
class SafetyIssue:
    message: str
    line: int | None = None
    column: int | None = None


def _source_line(user_code: str, line: int | None) -> str:
    if not line or line < 1:
        return ""

    lines = user_code.splitlines()
    if line > len(lines):
        return ""
    return lines[line - 1]


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
    end_line: int | None = None,
    end_column: int | None = None,
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
        "end_line": end_line,
        "end_column": end_column,
        "source_line": _source_line(user_code, line),
    }


def _syntax_suggestion(error: SyntaxError) -> str:
    message = (error.msg or "").lower()
    if "expected ':'" in message:
        return "Add a colon (:) at the end of the statement."
    if "parenthes" in message or "was never closed" in message:
        return "Check that every opening parenthesis has a matching closing parenthesis."
    if "unterminated string" in message or "eol while scanning string" in message:
        return "Close the text with the same kind of quote used to open it."
    if "indent" in message:
        return "Align the line with its block and use consistent four-space indentation."
    return "Check the highlighted line for a missing symbol, quote, colon, or misspelled Python keyword."


def _runtime_suggestion(error: Exception) -> tuple[str, str]:
    if isinstance(error, NameError):
        return (
            "Python does not know this name yet.",
            "Check its spelling and make sure it is assigned before this line runs.",
        )
    if isinstance(error, TypeError):
        return (
            "These values cannot be used together in that way.",
            "Check the value types and the operation used on this line.",
        )
    if isinstance(error, IndexError):
        return (
            "The requested list position does not exist.",
            "Remember that list positions start at 0 and must stay inside the list length.",
        )
    if isinstance(error, KeyError):
        return (
            "That key was not found.",
            "Check the key spelling or verify that it exists before using it.",
        )
    if isinstance(error, ZeroDivisionError):
        return (
            "Python cannot divide a value by zero.",
            "Change the divisor or check it before performing the division.",
        )
    if isinstance(error, AttributeError):
        return (
            "This value does not provide the requested operation.",
            "Check the value and the method name used on this line.",
        )
    return (
        "Python stopped while running this line.",
        "Read the error message, inspect the highlighted line, and check the values used there.",
    )


def _find_safety_issue(tree: ast.AST) -> SafetyIssue | None:
    for node in ast.walk(tree):
        if isinstance(node, BLOCKED_NODES):
            return SafetyIssue(
                "This feature is not allowed in missions yet.",
                getattr(node, "lineno", None),
                getattr(node, "col_offset", None),
            )

        if isinstance(node, ast.Name) and node.id in BLOCKED_NAMES:
            return SafetyIssue(
                f"The name '{node.id}' cannot be used here.",
                getattr(node, "lineno", None),
                getattr(node, "col_offset", None),
            )

        if isinstance(node, ast.Attribute) and node.attr.startswith("__"):
            return SafetyIssue(
                "Internal access with __ is not allowed.",
                getattr(node, "lineno", None),
                getattr(node, "col_offset", None),
            )

    return None


def _execute_in_child(user_code: str, result_queue: multiprocessing.Queue) -> None:
    stdout = io.StringIO()
    execution_scope = {"__builtins__": dict(ALLOWED_BUILTINS)}

    try:
        compiled = compile(user_code, "<mompy-user-code>", "exec")
        with contextlib.redirect_stdout(stdout):
            exec(compiled, execution_scope, execution_scope)
    except Exception as error:
        frames = traceback.extract_tb(error.__traceback__)
        user_frame = next(
            (frame for frame in reversed(frames) if frame.filename == "<mompy-user-code>"),
            frames[-1] if frames else None,
        )
        line = user_frame.lineno if user_frame else None
        column = (
            user_frame.colno + 1
            if user_frame and getattr(user_frame, "colno", None) is not None
            else None
        )
        summary, suggestion = _runtime_suggestion(error)
        result_queue.put(
            {
                "ok": False,
                "output": stdout.getvalue()[:MAX_OUTPUT_LENGTH],
                "error": f"{error.__class__.__name__}: {error}",
                "error_type": error.__class__.__name__,
                "traceback": traceback.format_exc(limit=3),
                "timeout": False,
                "diagnostic": _diagnostic(
                    category="runtime",
                    code=error.__class__.__name__.lower(),
                    title=error.__class__.__name__,
                    summary=f"{summary} {error}",
                    suggestion=suggestion,
                    user_code=user_code,
                    line=line,
                    column=column,
                ),
            }
        )
        return

    result_queue.put(
        {
            "ok": True,
            "output": stdout.getvalue()[:MAX_OUTPUT_LENGTH].rstrip("\n"),
            "error": "",
            "error_type": "",
            "traceback": "",
            "timeout": False,
            "diagnostic": None,
        }
    )


def run_user_code_safely(user_code: str, timeout: float = TIMEOUT_SECONDS) -> dict:
    code = user_code or ""
    if len(code) > MAX_CODE_LENGTH:
        return {
            "ok": False,
            "output": "",
            "error": "Code is too long for this mission.",
            "error_type": "CodeLengthError",
            "timeout": False,
            "implemented": True,
            "diagnostic": _diagnostic(
                category="safety",
                code="code_too_long",
                title="This code is too long for one mission",
                summary=f"The editor contains more than {MAX_CODE_LENGTH} characters.",
                suggestion="Keep only the code needed for the current mission.",
                user_code=code,
            ),
        }

    try:
        tree = ast.parse(code)
    except SyntaxError as error:
        line = error.lineno
        column = error.offset
        return {
            "ok": False,
            "output": "",
            "error": f"SyntaxError: {error.msg}"
            + (f" (line {line}, column {column})" if line else ""),
            "error_type": "SyntaxError",
            "timeout": False,
            "implemented": True,
            "diagnostic": _diagnostic(
                category="syntax",
                code="syntax_error",
                title="Python could not read this line",
                summary=error.msg,
                suggestion=_syntax_suggestion(error),
                user_code=code,
                line=line,
                column=column,
                end_line=getattr(error, "end_lineno", None),
                end_column=getattr(error, "end_offset", None),
            ),
        }

    safety_issue = _find_safety_issue(tree)
    if safety_issue:
        return {
            "ok": False,
            "output": "",
            "error": safety_issue.message,
            "error_type": "SafetyError",
            "timeout": False,
            "implemented": True,
            "diagnostic": _diagnostic(
                category="safety",
                code="feature_not_available",
                title="This feature is not available in missions",
                summary=safety_issue.message,
                suggestion="Use only the Python concepts introduced by the current learning block.",
                user_code=code,
                line=safety_issue.line,
                column=(safety_issue.column + 1) if safety_issue.column is not None else None,
            ),
        }

    context = multiprocessing.get_context("spawn")
    result_queue: multiprocessing.Queue = context.Queue(maxsize=1)
    process = context.Process(target=_execute_in_child, args=(code, result_queue))
    process.start()
    process.join(timeout)

    if process.is_alive():
        process.terminate()
        process.join(0.5)
        result_queue.close()
        process.close()
        return {
            "ok": False,
            "output": "",
            "error": "Time limit exceeded.",
            "error_type": "TimeoutError",
            "timeout": True,
            "implemented": True,
            "diagnostic": _diagnostic(
                category="timeout",
                code="time_limit_exceeded",
                title="The program took too long",
                summary="Mompy stopped the code so the application would remain responsive.",
                suggestion="Check for a loop that never ends or reduce the amount of repeated work.",
                user_code=code,
            ),
        }

    try:
        result = result_queue.get(timeout=RESULT_QUEUE_TIMEOUT_SECONDS)
    except queue.Empty:
        result = {
            "ok": False,
            "output": "",
            "error": "Execution finished with no response.",
            "error_type": "ExecutionResponseError",
            "timeout": False,
            "diagnostic": _diagnostic(
                category="runtime",
                code="missing_execution_response",
                title="Mompy could not read the execution result",
                summary="The code process ended before returning its result.",
                suggestion="Run the mission again. If it repeats, report this as a Mompy issue.",
                user_code=code,
            ),
        }
    finally:
        result_queue.close()
        process.close()

    result["implemented"] = True
    return result
