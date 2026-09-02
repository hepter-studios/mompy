"""Application-facing Python API for Mompy."""

from __future__ import annotations

from pathlib import Path

from .briefings import briefing_for_mission_index, get_briefing, get_briefings
from .classroom_lessons import (
    CLASSROOM_SCHEMA_VERSION,
    assessment_step_ids,
    get_classroom_lesson,
    get_classroom_lessons,
    get_classroom_schema,
    get_classroom_step,
    get_internal_classroom_step,
)
from .code_runner import run_user_code_safely
from .lessons import get_lessons
from .missions import get_current_mission, get_mission, get_missions
from .profile import load_profile, logout_profile, save_profile
from .progress import (
    complete_mission,
    load_progress,
    mark_classroom_lesson_completed,
    record_app_open,
    record_classroom_choice_result,
    reset_progress,
    set_current_mission_index,
    submit_mission_result,
)
from .storage import PROGRESS_PATH
from .updater import check_for_updates
from .validator import validate_mission
from .version import APP_VERSION


class MompyAPI:
    """Small in-process API that pywebview can expose in phase 10.3."""

    def __init__(self, progress_path: Path | None = None) -> None:
        self.progress_path = progress_path

    def get_bootstrap_state(self) -> dict:
        progress = self.record_app_open()
        profile = self.get_profile()
        locale = str(profile.get("language", "pt-BR"))
        return {
            "backend": {
                "name": "Mompy Python Backend",
                "phase": "11.0",
                "connected": True,
                "version": APP_VERSION,
            },
            "profile": profile,
            "progress": progress,
            "current_mission": self.get_current_mission(),
            "missions": self.get_missions(),
            "lessons": self.get_lessons(),
            "briefings": self.get_briefings(),
            "next_briefing": self.get_next_briefing(),
            "classroom_schema_version": CLASSROOM_SCHEMA_VERSION,
            "classroom_lessons": {
                "schema_version": CLASSROOM_SCHEMA_VERSION,
                "curriculum": self.get_classroom_schema(),
                "lessons": self.get_classroom_lessons(locale),
            },
        }

    def record_app_open(self) -> dict:
        if self.progress_path is None:
            return record_app_open()
        return record_app_open(self.progress_path)

    def get_missions(self) -> list[dict]:
        return get_missions()

    def get_lessons(self) -> list[dict]:
        return get_lessons()

    def get_briefings(self) -> list[dict]:
        return get_briefings()

    def get_briefing(self, briefing_id: str) -> dict | None:
        return get_briefing(briefing_id)

    def get_next_briefing(self) -> dict | None:
        progress = self.get_progress()
        return briefing_for_mission_index(progress["current_mission_index"])

    def get_classroom_schema(self) -> dict:
        return get_classroom_schema()

    def get_classroom_lessons(self, locale: str | None = None) -> list[dict]:
        return get_classroom_lessons(locale)

    def get_classroom_lesson(
        self,
        lesson_id: str,
        locale: str | None = None,
    ) -> dict | None:
        return get_classroom_lesson(lesson_id, locale)

    def get_classroom_step(
        self,
        lesson_id: str,
        step_id: str,
        locale: str | None = None,
    ) -> dict | None:
        return get_classroom_step(lesson_id, step_id, locale)

    def run_lesson_example(
        self,
        lesson_id: str,
        step_id: str,
        locale: str = "pt-BR",
    ) -> dict:
        """Run only Python source declared by a trusted curriculum step."""

        step = get_internal_classroom_step(lesson_id, step_id)
        if not step:
            raise ValueError(f"Unknown classroom step: {lesson_id}/{step_id}")
        example = step.get("example")
        if not isinstance(example, dict):
            raise ValueError(f"Classroom step has no declared example: {lesson_id}/{step_id}")

        variants = example.get("variants", {})
        selected = variants.get(locale) if isinstance(variants, dict) else None
        if not isinstance(selected, dict):
            selected = example
        code = str(selected["code"])
        expected_output = str(selected["expected_output"])
        result = run_user_code_safely(code)
        response = {
            "lesson_id": lesson_id,
            "step_id": step_id,
            "locale": locale,
            "language": "python",
            "code": code,
            "expected_output": expected_output,
            "ok": bool(result.get("ok")),
            "output": str(result.get("output", "")),
            "matches_expected_output": bool(
                result.get("ok") and result.get("output") == expected_output
            ),
        }
        if result.get("error"):
            response["error"] = str(result["error"])
        if result.get("diagnostic"):
            response["diagnostic"] = result["diagnostic"]
        return response

    def run_classroom_example(
        self,
        lesson_id: str,
        step_id: str,
        locale: str = "pt-BR",
    ) -> dict:
        """Compatibility alias for older native bridges."""

        return self.run_lesson_example(lesson_id, step_id, locale)

    def check_lesson_choice(
        self,
        lesson_id: str,
        step_id: str,
        choice_id: str,
        locale: str = "pt-BR",
    ) -> dict:
        """Validate an opaque choice ID without exposing the answer key."""

        step = get_internal_classroom_step(lesson_id, step_id)
        if not step or not isinstance(step.get("assessment"), dict):
            raise ValueError(f"Unknown classroom assessment: {lesson_id}/{step_id}")
        assessment = step["assessment"]
        known_choice_ids = {choice["id"] for choice in assessment["choices"]}
        if choice_id not in known_choice_ids:
            raise ValueError(f"Unknown classroom choice id: {choice_id}")
        correct = choice_id == assessment["correct_choice_id"]
        path = self.progress_path or PROGRESS_PATH
        progress = record_classroom_choice_result(
            lesson_id,
            step_id,
            correct=correct,
            path=path,
        )

        required = assessment_step_ids(lesson_id)
        passed = all(
            progress["classroom_step_stats"].get(
                f"{lesson_id}:{required_step_id}", {}
            ).get("passed", False)
            for required_step_id in required
        )
        if correct and passed:
            progress = mark_classroom_lesson_completed(
                lesson_id,
                required_step_ids=required,
                path=path,
            )

        selected_locale = locale if locale in assessment["feedback"] else "pt-BR"
        feedback = assessment["feedback"].get(selected_locale) or next(
            iter(assessment["feedback"].values())
        )
        response = {
            "lesson_id": lesson_id,
            "step_id": step_id,
            "choice_id": choice_id,
            "correct": correct,
            "feedback": feedback["correct" if correct else "incorrect"],
            "lesson_completed": lesson_id
            in progress["completed_classroom_lesson_ids"],
            "progress": progress,
        }
        if feedback.get("hint"):
            response["hint"] = feedback["hint"]
        return response

    def attempt_classroom_choice(
        self,
        lesson_id: str,
        step_id: str,
        choice_id: str,
        locale: str = "pt-BR",
    ) -> dict:
        """Compatibility alias for older native bridges."""

        return self.check_lesson_choice(lesson_id, step_id, choice_id, locale)

    def check_lesson_sequence(
        self,
        lesson_id: str,
        step_id: str,
        item_ids: list[str],
        locale: str = "pt-BR",
    ) -> dict:
        """Validate an ordered interaction without exposing its correct order."""

        step = get_internal_classroom_step(lesson_id, step_id)
        if not step or step.get("type") != "sequence":
            raise ValueError(f"Unknown classroom sequence: {lesson_id}/{step_id}")
        assessment = step.get("assessment")
        if not isinstance(assessment, dict):
            raise ValueError(f"Unknown classroom sequence: {lesson_id}/{step_id}")
        known_ids = {item["id"] for item in assessment["items"]}
        if (
            not isinstance(item_ids, list)
            or len(item_ids) != len(known_ids)
            or len(set(item_ids)) != len(item_ids)
            or set(item_ids) != known_ids
        ):
            raise ValueError("Sequence item_ids must contain every declared item exactly once.")

        correct = item_ids == assessment["correct_order"]
        path = self.progress_path or PROGRESS_PATH
        progress = record_classroom_choice_result(
            lesson_id,
            step_id,
            correct=correct,
            path=path,
        )
        required = assessment_step_ids(lesson_id)
        passed = all(
            progress["classroom_step_stats"].get(
                f"{lesson_id}:{required_step_id}", {}
            ).get("passed", False)
            for required_step_id in required
        )
        if correct and passed:
            progress = mark_classroom_lesson_completed(
                lesson_id,
                required_step_ids=required,
                path=path,
            )

        selected_locale = locale if locale in assessment["feedback"] else "pt-BR"
        feedback = assessment["feedback"].get(selected_locale) or next(
            iter(assessment["feedback"].values())
        )
        response = {
            "lesson_id": lesson_id,
            "step_id": step_id,
            "correct": correct,
            "feedback": feedback["correct" if correct else "incorrect"],
            "lesson_completed": lesson_id
            in progress["completed_classroom_lesson_ids"],
            "progress": progress,
        }
        if feedback.get("hint"):
            response["hint"] = feedback["hint"]
        return response

    def complete_classroom_lesson(self, lesson_id: str) -> dict:
        if get_classroom_lesson(lesson_id) is None:
            raise ValueError(f"Unknown classroom lesson: {lesson_id}")
        path = self.progress_path or PROGRESS_PATH
        return mark_classroom_lesson_completed(
            lesson_id,
            required_step_ids=assessment_step_ids(lesson_id),
            path=path,
        )

    def get_profile(self) -> dict:
        return load_profile()

    def get_update_status(self) -> dict:
        return check_for_updates()

    def save_profile(self, profile: dict) -> dict:
        return save_profile(profile)

    def logout_profile(self) -> dict:
        return logout_profile()

    def get_progress(self) -> dict:
        if self.progress_path is None:
            return load_progress()
        return load_progress(self.progress_path)

    def get_current_mission(self) -> dict:
        progress = self.get_progress()
        return get_current_mission(progress["current_mission_index"]).to_dict()

    def validate_mission(self, mission_id: str, user_code: str) -> dict:
        return validate_mission(mission_id, user_code)

    def submit_mission(self, mission_id: str, user_code: str, hint_used: bool = False) -> dict:
        validation = self.validate_mission(mission_id, user_code)
        path = self.progress_path or PROGRESS_PATH
        progression = submit_mission_result(
            mission_id,
            correct=bool(validation["correct"]),
            hint_used=bool(hint_used),
            path=path,
        )
        return {"validation": validation, **progression}

    def complete_mission(self, mission_id: str) -> dict:
        if get_mission(mission_id) is None:
            raise ValueError(f"Unknown mission id: {mission_id}")
        if self.progress_path is None:
            return complete_mission(mission_id)
        return complete_mission(mission_id, self.progress_path)

    def reset_progress(self) -> dict:
        if self.progress_path is None:
            return reset_progress()
        return reset_progress(self.progress_path)

    def set_current_mission_index(self, index: int) -> dict:
        if self.progress_path is None:
            return set_current_mission_index(index)
        return set_current_mission_index(index, self.progress_path)

    def run_user_code_safely(self, user_code: str) -> dict:
        return run_user_code_safely(user_code)

    def check_answer(self, mission_id: str, user_code: str) -> dict:
        result = self.submit_mission(mission_id, user_code)
        validation = result["validation"]
        validation["progress"] = result["progress"]
        validation["reward"] = result["reward"]
        return validation
