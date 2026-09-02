"""Mompy Python entry point."""

from __future__ import annotations

import argparse
import http.server
import json
import multiprocessing
import sys
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

from backend.api import MompyAPI


def app_root() -> Path:
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS)
    return Path(__file__).resolve().parent


ROOT_DIR = app_root()
FRONTEND_DIR = ROOT_DIR / "frontend"
FRONTEND_INDEX = FRONTEND_DIR / "index.html"


def serve_frontend(port: int = 8770, api: MompyAPI | None = None) -> None:
    handler = http.server.SimpleHTTPRequestHandler
    backend_api = api or MompyAPI()

    class FrontendHandler(handler):
        api = backend_api

        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(FRONTEND_DIR), **kwargs)

        def end_headers(self) -> None:
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            super().end_headers()

        def send_json(self, payload: dict, status: int = 200) -> None:
            body = json.dumps(payload).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def read_json_body(self) -> dict:
            length = int(self.headers.get("Content-Length", "0") or "0")
            if length <= 0:
                return {}
            raw_body = self.rfile.read(length)
            try:
                payload = json.loads(raw_body.decode("utf-8"))
            except json.JSONDecodeError:
                return {}
            return payload if isinstance(payload, dict) else {}

        def do_GET(self) -> None:
            parsed_request = urlparse(self.path)
            route = parsed_request.path.rstrip("/") or "/"
            query = parse_qs(parsed_request.query)
            locale = query.get("locale", [None])[0]
            if route == "/api/bootstrap":
                self.send_json(self.api.get_bootstrap_state())
                return
            if route == "/api/progress":
                self.send_json(self.api.get_progress())
                return
            if route == "/api/update-status":
                self.send_json(self.api.get_update_status())
                return
            if route == "/api/classroom-lessons":
                self.send_json(
                    {
                        **self.api.get_classroom_schema(),
                        "locale": locale,
                        "lessons": self.api.get_classroom_lessons(locale),
                    }
                )
                return
            if route.startswith("/api/classroom-lessons/"):
                parts = [unquote(part) for part in route.split("/") if part]
                if len(parts) == 3:
                    lesson = self.api.get_classroom_lesson(parts[2], locale)
                    if lesson is None:
                        self.send_json({"error": "Unknown classroom lesson."}, status=404)
                    else:
                        self.send_json(lesson)
                    return
                if len(parts) == 5 and parts[3] == "steps":
                    step = self.api.get_classroom_step(parts[2], parts[4], locale)
                    if step is None:
                        self.send_json({"error": "Unknown classroom step."}, status=404)
                    else:
                        self.send_json(step)
                    return

            if route.startswith("/frontend/"):
                parsed = urlparse(self.path)
                self.path = parsed.path.removeprefix("/frontend") or "/"
                if parsed.query:
                    self.path = f"{self.path}?{parsed.query}"

            super().do_GET()

        def do_HEAD(self) -> None:
            route = urlparse(self.path).path
            if route.startswith("/frontend/"):
                parsed = urlparse(self.path)
                self.path = parsed.path.removeprefix("/frontend") or "/"
                if parsed.query:
                    self.path = f"{self.path}?{parsed.query}"

            super().do_HEAD()

        def do_POST(self) -> None:
            route = urlparse(self.path).path.rstrip("/") or "/"
            payload = self.read_json_body()

            try:
                if route.startswith("/api/classroom/") and any(
                    key in payload for key in ("code", "user_code", "source")
                ):
                    raise ValueError(
                        "Classroom endpoints do not accept arbitrary Python source."
                    )
                if route == "/api/classroom/example/run":
                    self.send_json(
                        self.api.run_lesson_example(
                            str(payload.get("lesson_id", "")),
                            str(payload.get("step_id", "")),
                            str(payload.get("locale", "pt-BR")),
                        )
                    )
                    return
                if route == "/api/classroom/choice/check":
                    self.send_json(
                        self.api.check_lesson_choice(
                            str(payload.get("lesson_id", "")),
                            str(payload.get("step_id", "")),
                            str(payload.get("choice_id", "")),
                            str(payload.get("locale", "pt-BR")),
                        )
                    )
                    return
                if route == "/api/classroom/sequence/check":
                    item_ids = payload.get("item_ids", [])
                    if not isinstance(item_ids, list) or not all(
                        isinstance(item, str) for item in item_ids
                    ):
                        raise ValueError("item_ids must be a list of IDs.")
                    self.send_json(
                        self.api.check_lesson_sequence(
                            str(payload.get("lesson_id", "")),
                            str(payload.get("step_id", "")),
                            item_ids,
                            str(payload.get("locale", "pt-BR")),
                        )
                    )
                    return
                if route == "/api/classroom/complete":
                    self.send_json(
                        self.api.complete_classroom_lesson(
                            str(payload.get("lesson_id", ""))
                        )
                    )
                    return
                if route.startswith("/api/classroom-lessons/"):
                    parts = [unquote(part) for part in route.split("/") if part]
                    if any(key in payload for key in ("code", "user_code", "source")):
                        raise ValueError(
                            "Classroom endpoints do not accept arbitrary Python source."
                        )
                    if len(parts) == 6 and parts[3] == "steps" and parts[5] == "run":
                        self.send_json(
                            self.api.run_lesson_example(
                                parts[2],
                                parts[4],
                                str(payload.get("locale")) if payload.get("locale") else None,
                            )
                        )
                        return
                    if len(parts) == 6 and parts[3] == "steps" and parts[5] == "attempt":
                        self.send_json(
                            self.api.check_lesson_choice(
                                parts[2],
                                parts[4],
                                str(payload.get("choice_id", "")),
                                str(payload.get("locale")) if payload.get("locale") else None,
                            )
                        )
                        return
                    if len(parts) == 4 and parts[3] == "complete":
                        self.send_json(self.api.complete_classroom_lesson(parts[2]))
                        return
                if route == "/api/validate":
                    self.send_json(
                        self.api.validate_mission(
                            str(payload.get("mission_id", "")),
                            str(payload.get("user_code", "")),
                        )
                    )
                    return
                if route == "/api/mission/submit":
                    self.send_json(
                        self.api.submit_mission(
                            str(payload.get("mission_id", "")),
                            str(payload.get("user_code", "")),
                            bool(payload.get("hint_used", False)),
                        )
                    )
                    return
                if route == "/api/complete":
                    self.send_json(self.api.complete_mission(str(payload.get("mission_id", ""))))
                    return
                if route == "/api/reset":
                    self.send_json(self.api.reset_progress())
                    return
                if route == "/api/progress/current":
                    self.send_json(
                        self.api.set_current_mission_index(
                            int(payload.get("current_mission_index", 0))
                        )
                    )
                    return
                if route == "/api/profile/save":
                    profile = payload.get("profile", {})
                    self.send_json(self.api.save_profile(profile if isinstance(profile, dict) else {}))
                    return
                if route == "/api/profile/logout":
                    self.send_json(self.api.logout_profile())
                    return
            except Exception as error:
                self.send_json({"error": str(error)}, status=400)
                return

            self.send_json({"error": "Unknown API route."}, status=404)

    with http.server.ThreadingHTTPServer(("127.0.0.1", port), FrontendHandler) as server:
        print(f"Mompy frontend running at http://127.0.0.1:{port}/")
        server.serve_forever()


def print_backend_status() -> None:
    api = MompyAPI()
    progress = api.get_progress()
    current = api.get_current_mission()
    print("Mompy backend ready.")
    print(f"Current mission: {current['id']} - {current['title']}")
    print(f"Level: {progress['level_info']['label']}")


def require_pywebview():
    try:
        import webview
    except ImportError as error:
        raise SystemExit(
            "pywebview is required for desktop mode. "
            "Install it with: python -m pip install -r requirements.txt"
        ) from error
    return webview


def run_desktop(debug: bool = False) -> None:
    webview = require_pywebview()
    if not FRONTEND_INDEX.exists():
        raise SystemExit(f"Frontend not found: {FRONTEND_INDEX}")

    webview.create_window(
        "Mompy",
        FRONTEND_INDEX.as_uri(),
        js_api=MompyAPI(),
        width=1280,
        height=720,
        min_size=(960, 540),
        background_color="#020403",
    )
    webview.start(debug=debug)


def main() -> None:
    parser = argparse.ArgumentParser(description="Mompy Python app")
    parser.add_argument("--serve", action="store_true", help="serve the frontend locally")
    parser.add_argument("--port", type=int, default=8770, help="local frontend port")
    parser.add_argument("--check", action="store_true", help="print backend status and exit")
    parser.add_argument("--debug", action="store_true", help="enable pywebview debug mode")
    args = parser.parse_args()

    if args.serve:
        serve_frontend(args.port)
        return

    if args.check:
        print_backend_status()
        return

    run_desktop(debug=args.debug)


if __name__ == "__main__":
    multiprocessing.freeze_support()
    main()
