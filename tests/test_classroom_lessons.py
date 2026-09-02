import tempfile
import unittest
from pathlib import Path

from backend.api import MompyAPI
from backend.classroom_lessons import (
    CLASSROOM_SCHEMA_VERSION,
    ClassroomContentError,
    assessment_step_ids,
    get_classroom_lessons,
    get_classroom_schema,
    get_internal_classroom_step,
    validate_classroom_payload,
)


def localized(title: str) -> dict:
    return {"pt-BR": {"title": title, "body": []}}


def lesson(lesson_id: str, order: int, steps: list[dict], outcomes: list[str]) -> dict:
    return {
        "id": lesson_id,
        "order": order,
        "prerequisite_concept_ids": [],
        "outcome_concept_ids": outcomes,
        "content": localized(lesson_id),
        "steps": steps,
    }


def teaching_step(step_id: str, concepts: list[str]) -> dict:
    return {
        "id": step_id,
        "type": "lesson",
        "teaches_concepts": concepts,
        "requires_concepts": [],
        "content": localized(step_id),
    }


def question_step(step_id: str, concept: str) -> dict:
    return {
        "id": step_id,
        "type": "question",
        "teaches_concepts": [],
        "requires_concepts": [concept],
        "checks_concepts": [concept],
        "content": localized(step_id),
        "assessment": {
            "choices": [
                {
                    "id": "choice_a1b2c3d4",
                    "content": {"pt-BR": {"text": "Uma opção", "body": []}},
                },
                {
                    "id": "choice_e5f6a7b8",
                    "content": {"pt-BR": {"text": "Outra opção", "body": []}},
                },
            ],
            "correct_choice_id": "choice_a1b2c3d4",
            "feedback": {
                "pt-BR": {"correct": "Certo.", "incorrect": "Tente novamente."}
            },
        },
    }


def payload(lessons: list[dict], mappings: list[dict] | None = None) -> dict:
    return {
        "schema_version": CLASSROOM_SCHEMA_VERSION,
        "curriculum_version": "test",
        "default_locale": "pt-BR",
        "supported_locales": ["pt-BR"],
        "lessons": lessons,
        "mission_prerequisites": mappings or [],
    }


class ClassroomContractTests(unittest.TestCase):
    def test_seed_curriculum_covers_every_current_mission_without_fixed_cardinality_rule(self):
        schema = get_classroom_schema()
        lessons = get_classroom_lessons("pt-BR")

        self.assertEqual(schema["schema_version"], CLASSROOM_SCHEMA_VERSION)
        self.assertEqual(
            {item["mission_id"] for item in schema["mission_prerequisites"]},
            {f"mission_{number:03d}" for number in range(1, 41)},
        )
        self.assertTrue({f"briefing_{number:03d}" for number in range(1, 9)}.issubset(
            {item["id"] for item in lessons}
        ))

        # Public payloads contain opaque choices, never an answer key.
        question = next(
            step
            for lesson_data in lessons
            for step in lesson_data["steps"]
            if step["type"] == "question"
        )
        self.assertNotIn("correct_choice_id", question["assessment"])
        self.assertTrue(
            all("correct" not in choice for choice in question["assessment"]["choices"])
        )
        sequence = next(
            step
            for lesson_data in lessons
            for step in lesson_data["steps"]
            if step["type"] == "sequence"
        )
        self.assertNotIn("correct_order", sequence["assessment"])
        self.assertNotIn("correctOrder", sequence["assessment"])

    def test_validator_accepts_free_lesson_to_mission_cardinality(self):
        concept = "python.print"
        custom = payload(
            [
                lesson("one_lesson", 7, [teaching_step("teach_print", [concept])], [concept]),
                lesson(
                    "another_lesson",
                    91,
                    [teaching_step("teach_string", ["python.string"])],
                    ["python.string"],
                ),
            ],
            [
                {
                    "mission_id": mission_id,
                    "after_lesson_id": "one_lesson",
                    "concept_ids": [concept],
                }
                for mission_id in ("mission_alpha", "mission_beta", "mission_gamma")
            ],
        )

        validated = validate_classroom_payload(custom)
        self.assertEqual(len(validated["lessons"]), 2)
        self.assertEqual(len(validated["mission_prerequisites"]), 3)

    def test_validator_rejects_question_before_concept_is_taught(self):
        concept = "python.print"
        invalid = payload(
            [
                lesson(
                    "lesson_early_question",
                    1,
                    [
                        question_step("ask_first", concept),
                        teaching_step("teach_later", [concept]),
                    ],
                    [concept],
                )
            ]
        )

        with self.assertRaisesRegex(ClassroomContentError, "before they are taught"):
            validate_classroom_payload(invalid)

    def test_cross_lesson_concept_must_be_an_explicit_lesson_prerequisite(self):
        concept = "python.print"
        invalid = payload(
            [
                lesson(
                    "teach_lesson",
                    1,
                    [teaching_step("teach_print", [concept])],
                    [concept],
                ),
                lesson(
                    "check_lesson",
                    2,
                    [question_step("check_print", concept)],
                    [],
                ),
            ]
        )

        with self.assertRaisesRegex(ClassroomContentError, "before they are taught"):
            validate_classroom_payload(invalid)

        valid = payload(
            [
                lesson(
                    "teach_lesson",
                    1,
                    [teaching_step("teach_print", [concept])],
                    [concept],
                ),
                lesson(
                    "check_lesson",
                    2,
                    [question_step("check_print", concept)],
                    [],
                ),
            ]
        )
        valid["lessons"][1]["prerequisite_concept_ids"] = [concept]
        self.assertEqual(validate_classroom_payload(valid)["lessons"][1]["id"], "check_lesson")

    def test_validator_rejects_mission_before_prerequisite_concept(self):
        print_concept = "python.print"
        string_concept = "python.string"
        invalid = payload(
            [
                lesson(
                    "early_lesson",
                    10,
                    [teaching_step("teach_print", [print_concept])],
                    [print_concept],
                ),
                lesson(
                    "later_lesson",
                    20,
                    [teaching_step("teach_string", [string_concept])],
                    [string_concept],
                ),
            ],
            [
                {
                    "mission_id": "mission_alpha",
                    "after_lesson_id": "early_lesson",
                    "concept_ids": [print_concept, string_concept],
                }
            ],
        )

        with self.assertRaisesRegex(ClassroomContentError, "ordered before"):
            validate_classroom_payload(invalid)

    def test_validator_generates_deterministic_opaque_choice_ids_for_legacy_content(self):
        concept = "python.print"
        check = question_step("legacy_check", concept)
        check["assessment"].pop("correct_choice_id")
        for index, choice in enumerate(check["assessment"]["choices"]):
            choice.pop("id")
            choice["correct"] = index == 0
        legacy = payload(
            [
                lesson(
                    "legacy_lesson",
                    1,
                    [teaching_step("teach_print", [concept]), check],
                    [concept],
                )
            ]
        )

        first = validate_classroom_payload(legacy)
        second = validate_classroom_payload(legacy)
        first_assessment = first["lessons"][0]["steps"][1]["assessment"]
        second_assessment = second["lessons"][0]["steps"][1]["assessment"]
        first_ids = [choice["id"] for choice in first_assessment["choices"]]

        self.assertEqual(
            first_ids,
            [choice["id"] for choice in second_assessment["choices"]],
        )
        self.assertTrue(all(choice_id.startswith("choice_") for choice_id in first_ids))
        self.assertTrue(all("correct" not in choice for choice in first_assessment["choices"]))
        self.assertIn(first_assessment["correct_choice_id"], first_ids)

    def test_backend_runs_only_the_example_declared_for_the_step(self):
        api = MompyAPI()
        lesson = next(item for item in get_classroom_lessons("pt-BR") if item["id"] == "briefing_001")
        demo = next(step for step in lesson["steps"] if step["type"] == "demo")
        result = api.run_lesson_example(lesson["id"], demo["id"], "pt-BR")

        self.assertTrue(result["ok"])
        self.assertTrue(result["matches_expected_output"])
        self.assertTrue(result["code"].strip())

    def test_choice_validation_and_lesson_completion_are_python_owned(self):
        with tempfile.TemporaryDirectory() as tmp:
            api = MompyAPI(progress_path=Path(tmp) / "progress.json")

            with self.assertRaisesRegex(ValueError, "unanswered assessment"):
                api.complete_classroom_lesson("briefing_001")

            assessment_ids = assessment_step_ids("briefing_001")
            question_id = next(
                step_id
                for step_id in assessment_ids
                if get_internal_classroom_step("briefing_001", step_id)["type"] == "question"
            )
            question = get_internal_classroom_step("briefing_001", question_id)
            correct_choice_id = question["assessment"]["correct_choice_id"]
            wrong_choice_id = next(
                choice["id"]
                for choice in question["assessment"]["choices"]
                if choice["id"] != correct_choice_id
            )
            wrong = api.check_lesson_choice(
                "briefing_001",
                question_id,
                wrong_choice_id,
                "pt-BR",
            )
            self.assertFalse(wrong["correct"])
            self.assertFalse(wrong["lesson_completed"])

            correct = api.check_lesson_choice(
                "briefing_001",
                question_id,
                correct_choice_id,
                "pt-BR",
            )
            self.assertTrue(correct["correct"])
            for step_id in assessment_ids:
                if step_id == question_id:
                    continue
                step = get_internal_classroom_step("briefing_001", step_id)
                if step["type"] == "question":
                    api.check_lesson_choice(
                        "briefing_001",
                        step_id,
                        step["assessment"]["correct_choice_id"],
                        "pt-BR",
                    )
                else:
                    api.check_lesson_sequence(
                        "briefing_001",
                        step_id,
                        step["assessment"]["correct_order"],
                        "pt-BR",
                    )
            completed = api.complete_classroom_lesson("briefing_001")
            self.assertIn(
                "briefing_001",
                completed["completed_classroom_lesson_ids"],
            )
            self.assertIn(
                "briefing_001", completed["completed_briefing_ids"]
            )

    def test_sequence_order_is_checked_only_by_python(self):
        lesson_data = next(
            lesson_data
            for lesson_data in get_classroom_lessons("pt-BR")
            if any(step["type"] == "sequence" for step in lesson_data["steps"])
        )
        public = next(step for step in lesson_data["steps"] if step["type"] == "sequence")
        self.assertNotIn("correct_order", public["assessment"])
        internal = get_internal_classroom_step(lesson_data["id"], public["id"])
        correct_order = internal["assessment"]["correct_order"]

        with tempfile.TemporaryDirectory() as tmp:
            api = MompyAPI(progress_path=Path(tmp) / "progress.json")
            wrong = api.check_lesson_sequence(
                lesson_data["id"],
                public["id"],
                list(reversed(correct_order)),
                "pt-BR",
            )
            self.assertFalse(wrong["correct"])
            correct = api.check_lesson_sequence(
                lesson_data["id"],
                public["id"],
                correct_order,
                "pt-BR",
            )
            self.assertTrue(correct["correct"])


if __name__ == "__main__":
    unittest.main()
