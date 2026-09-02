import json
import multiprocessing
import socket
import tempfile
import time
import unittest
import urllib.error
import urllib.request
from pathlib import Path

from backend.api import MompyAPI
from backend.classroom_lessons import (
    assessment_step_ids,
    get_classroom_lessons,
    get_internal_classroom_step,
)
from main import serve_frontend


def available_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.bind(("127.0.0.1", 0))
        return int(server_socket.getsockname()[1])


def request_json(url: str, payload: dict | None = None) -> tuple[int, dict]:
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"} if body is not None else {},
        method="POST" if body is not None else "GET",
    )
    try:
        with urllib.request.urlopen(request, timeout=8) as response:
            return response.status, json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        try:
            return error.code, json.loads(error.read().decode("utf-8"))
        finally:
            error.close()


class ClassroomHTTPTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.port = available_port()
        api = MompyAPI(progress_path=Path(self.temp_dir.name) / "progress.json")
        context = multiprocessing.get_context("spawn")
        self.process = context.Process(target=serve_frontend, args=(self.port, api))
        self.process.start()

        deadline = time.monotonic() + 8
        while time.monotonic() < deadline:
            try:
                status, _ = request_json(
                    f"http://127.0.0.1:{self.port}/api/classroom-lessons?locale=pt-BR"
                )
                if status == 200:
                    break
            except (OSError, TimeoutError):
                time.sleep(0.05)
        else:
            self.tearDown()
            self.fail("Mompy HTTP test server did not start")

    def tearDown(self):
        process = getattr(self, "process", None)
        if process is not None and process.is_alive():
            process.terminate()
            process.join(3)
        temp_dir = getattr(self, "temp_dir", None)
        if temp_dir is not None:
            temp_dir.cleanup()

    def test_http_exposes_lesson_and_step_without_answer_key(self):
        status, lesson = request_json(
            f"http://127.0.0.1:{self.port}/api/classroom-lessons/briefing_001?locale=pt-BR"
        )
        self.assertEqual(status, 200)
        question = next(step for step in lesson["steps"] if step["type"] == "question")
        self.assertNotIn("correct_choice_id", question["assessment"])

        demo = next(step for step in lesson["steps"] if step["type"] == "demo")
        status, step = request_json(
            f"http://127.0.0.1:{self.port}/api/classroom-lessons/briefing_001/steps/{demo['id']}?locale=pt-BR"
        )
        self.assertEqual(status, 200)
        self.assertEqual(step["type"], "demo")
        self.assertNotIn("code", step["example"])

    def test_http_rejects_browser_supplied_source_and_runs_declared_example(self):
        endpoint = f"http://127.0.0.1:{self.port}/api/classroom/example/run"
        lesson = next(item for item in get_classroom_lessons("pt-BR") if item["id"] == "briefing_001")
        demo = next(step for step in lesson["steps"] if step["type"] == "demo")
        identifiers = {
            "lesson_id": "briefing_001",
            "step_id": demo["id"],
            "locale": "pt-BR",
        }
        status, rejected = request_json(
            endpoint, {**identifiers, "user_code": 'print("injetado")'}
        )
        self.assertEqual(status, 400)
        self.assertIn("do not accept arbitrary", rejected["error"])

        status, result = request_json(endpoint, identifiers)
        self.assertEqual(status, 200)
        self.assertTrue(result["matches_expected_output"])
        self.assertTrue(result["output"].strip())

    def test_http_choice_sequence_and_completion_routes_use_backend_progress(self):
        choice_endpoint = f"http://127.0.0.1:{self.port}/api/classroom/choice/check"
        lesson_one = next(item for item in get_classroom_lessons("pt-BR") if item["id"] == "briefing_001")
        public_question = next(step for step in lesson_one["steps"] if step["type"] == "question")
        private_question = get_internal_classroom_step("briefing_001", public_question["id"])
        status, choice = request_json(
            choice_endpoint,
            {
                "lesson_id": "briefing_001",
                "step_id": public_question["id"],
                "choice_id": private_question["assessment"]["correct_choice_id"],
                "locale": "pt-BR",
            },
        )
        self.assertEqual(status, 200)
        self.assertTrue(choice["correct"])

        sequence_endpoint = f"http://127.0.0.1:{self.port}/api/classroom/sequence/check"
        sequence_lesson = next(
            item for item in get_classroom_lessons("pt-BR")
            if any(step["type"] == "sequence" for step in item["steps"])
        )
        public_sequence = next(step for step in sequence_lesson["steps"] if step["type"] == "sequence")
        private_sequence = get_internal_classroom_step(sequence_lesson["id"], public_sequence["id"])
        status, sequence = request_json(
            sequence_endpoint,
            {
                "lesson_id": sequence_lesson["id"],
                "step_id": public_sequence["id"],
                "item_ids": private_sequence["assessment"]["correct_order"],
                "locale": "pt-BR",
            },
        )
        self.assertEqual(status, 200)
        self.assertTrue(sequence["correct"])

        for step_id in assessment_step_ids("briefing_003"):
            step = get_internal_classroom_step("briefing_003", step_id)
            if step["type"] == "question":
                status, _ = request_json(choice_endpoint, {
                    "lesson_id": "briefing_003",
                    "step_id": step_id,
                    "choice_id": step["assessment"]["correct_choice_id"],
                    "locale": "pt-BR",
                })
            else:
                status, _ = request_json(sequence_endpoint, {
                    "lesson_id": "briefing_003",
                    "step_id": step_id,
                    "item_ids": step["assessment"]["correct_order"],
                    "locale": "pt-BR",
                })
            self.assertEqual(status, 200)

        status, progress = request_json(
            f"http://127.0.0.1:{self.port}/api/classroom/complete",
            {"lesson_id": "briefing_003"},
        )
        self.assertEqual(status, 200)
        self.assertIn("briefing_003", progress["completed_classroom_lesson_ids"])


if __name__ == "__main__":
    multiprocessing.freeze_support()
    unittest.main()
