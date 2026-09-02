"""Backend-owned rich classroom curriculum.

The browser receives presentation data from this module, but never owns answer
keys or executable Python source.  The curriculum deliberately has no rule such
as "one lesson per block" or "five missions per lesson".  Missions are unlocked
by explicit concept prerequisites, so lessons and missions may evolve with
independent cardinalities.
"""

from __future__ import annotations

from copy import deepcopy
from hashlib import sha256
import json
from pathlib import Path
import re
from typing import Mapping, Sequence

from .missions import MISSIONS, Mission


CLASSROOM_SCHEMA_VERSION = 1
DEFAULT_LOCALE = "pt-BR"
SUPPORTED_LOCALES = ("pt-BR", "en-US")
CLASSROOM_DATA_PATH = Path(__file__).resolve().parent / "data" / "classroom_lessons.json"

_ID_PATTERN = re.compile(r"^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$")
_CHOICE_ID_PATTERN = re.compile(r"^choice_[a-f0-9]{8,}$")
_ITEM_ID_PATTERN = re.compile(r"^item_[a-f0-9]{8,}$")


class ClassroomContentError(ValueError):
    """Raised when backend curriculum data violates its public contract."""


def concept_id(value: str) -> str:
    """Convert legacy mission concept labels into stable curriculum IDs."""

    replacements = {
        "==": "equality",
        ">=": "greater-or-equal",
        "<=": "less-or-equal",
        ">": "greater-than",
        "<": "less-than",
        "+=": "increase-assignment",
        "-=": "decrease-assignment",
    }
    normalized = replacements.get(value.strip(), value.strip().lower())
    normalized = re.sub(r"[^a-z0-9]+", "-", normalized).strip("-")
    return f"python.{normalized}"


# These eight identifiers preserve the current product's navigation and save
# compatibility.  They are seed content, not a validator rule: new curricula
# may contain any number of lessons and each lesson may prepare any number of
# missions.
_COMPATIBILITY_SEED: tuple[dict, ...] = (
    {
        "id": "briefing_001",
        "legacy_lesson_id": "lesson_001",
        "order": 10,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(1, 6)),
        "titles": {
            "pt-BR": ("Primeiros comandos em Python", "Faça a máquina responder"),
            "en-US": ("First Python commands", "Make the machine respond"),
        },
        "body": {
            "pt-BR": [
                "Python é uma linguagem de programação: uma forma precisa de escrever instruções para o computador.",
                "Textos ficam entre aspas, print mostra um valor e os parênteses guardam o que será entregue ao comando.",
            ],
            "en-US": [
                "Python is a programming language: a precise way to write instructions for a computer.",
                "Text goes inside quotes, print displays a value, and parentheses hold what is passed to the command.",
            ],
        },
        "example": ('print("Olá, mundo!")', "Olá, mundo!"),
    },
    {
        "id": "briefing_002",
        "legacy_lesson_id": "lesson_002",
        "order": 20,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(6, 11)),
        "titles": {
            "pt-BR": ("Variáveis e valores", "Dê nomes aos dados"),
            "en-US": ("Variables and values", "Give data useful names"),
        },
        "body": {
            "pt-BR": [
                "Uma variável é um nome que guarda um valor. O sinal = faz a atribuição; ele não pergunta se dois valores são iguais.",
                "Sem aspas, Python procura uma variável. Com aspas, o conteúdo é um texto literal.",
            ],
            "en-US": [
                "A variable is a name that stores a value. The = sign assigns; it does not ask whether two values are equal.",
                "Without quotes, Python looks for a variable. With quotes, the content is literal text.",
            ],
        },
        "example": ('name = "Mompy"\nprint(name)', "Mompy"),
    },
    {
        "id": "briefing_003",
        "legacy_lesson_id": "lesson_003",
        "order": 30,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(11, 16)),
        "titles": {
            "pt-BR": ("Decisões", "Escolha caminhos com condições"),
            "en-US": ("Decisions", "Choose paths with conditions"),
        },
        "body": {
            "pt-BR": [
                "Uma condição produz verdadeiro ou falso. if executa seu bloco quando a condição é verdadeira; else cuida do outro caminho.",
                "Dois sinais == comparam igualdade. A indentação mostra quais linhas pertencem a cada caminho.",
            ],
            "en-US": [
                "A condition produces true or false. if runs its block when the condition is true; else handles the other path.",
                "Two == signs compare equality. Indentation shows which lines belong to each path.",
            ],
        },
        "example": ('energy = 10\nif energy > 0:\n    print("Ligado")', "Ligado"),
    },
    {
        "id": "briefing_004",
        "legacy_lesson_id": "lesson_004",
        "order": 40,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(16, 21)),
        "titles": {
            "pt-BR": ("Repetições com for", "Repita sem copiar código"),
            "en-US": ("For loops", "Repeat without copying code"),
        },
        "body": {
            "pt-BR": [
                "for percorre uma sequência. range cria sequências numéricas e não inclui o limite final.",
                "O bloco indentado roda uma vez para cada valor recebido pela variável do laço.",
            ],
            "en-US": [
                "for visits a sequence. range creates numeric sequences and excludes the final limit.",
                "The indented block runs once for every value received by the loop variable.",
            ],
        },
        "example": ('for number in range(3):\n    print(number)', "0\n1\n2"),
    },
    {
        "id": "briefing_005",
        "legacy_lesson_id": "lesson_005",
        "order": 50,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(21, 26)),
        "titles": {
            "pt-BR": ("Listas", "Guarde vários valores juntos"),
            "en-US": ("Lists", "Store several values together"),
        },
        "body": {
            "pt-BR": [
                "Uma lista reúne vários itens entre colchetes. Cada item tem uma posição chamada índice, começando em zero.",
                "append adiciona ao final, len conta os itens e for pode percorrer a lista inteira.",
            ],
            "en-US": [
                "A list groups several items inside brackets. Each item has a position called an index, starting at zero.",
                "append adds to the end, len counts items, and for can visit the entire list.",
            ],
        },
        "example": ('items = ["aprender", "praticar"]\nprint(items[0])', "aprender"),
    },
    {
        "id": "briefing_006",
        "legacy_lesson_id": "lesson_006",
        "order": 60,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(26, 31)),
        "titles": {
            "pt-BR": ("Funções", "Organize tarefas reutilizáveis"),
            "en-US": ("Functions", "Organize reusable tasks"),
        },
        "body": {
            "pt-BR": [
                "def cria uma função, mas criá-la não a executa. A chamada pelo nome e parênteses é que inicia o trabalho.",
                "Parâmetros recebem dados e return devolve um resultado para quem chamou a função.",
            ],
            "en-US": [
                "def creates a function, but creating it does not run it. Calling its name with parentheses starts the work.",
                "Parameters receive data and return sends a result back to the caller.",
            ],
        },
        "example": ('def double(value):\n    return value * 2\nprint(double(4))', "8"),
    },
    {
        "id": "briefing_007",
        "legacy_lesson_id": "lesson_007",
        "order": 70,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(31, 36)),
        "titles": {
            "pt-BR": ("Dicionários", "Associe chaves a valores"),
            "en-US": ("Dictionaries", "Associate keys with values"),
        },
        "body": {
            "pt-BR": [
                "Um dicionário guarda valores sob chaves nomeadas. A chave descreve o significado do valor.",
                "Colchetes leem ou alteram uma chave; get permite usar um valor alternativo quando ela não existe.",
            ],
            "en-US": [
                "A dictionary stores values under named keys. A key describes what its value means.",
                "Brackets read or change a key; get can provide a fallback when the key is absent.",
            ],
        },
        "example": ('profile = {"name": "Mompy"}\nprint(profile["name"])', "Mompy"),
    },
    {
        "id": "briefing_008",
        "legacy_lesson_id": "lesson_008",
        "order": 80,
        "mission_ids": tuple(f"mission_{number:03d}" for number in range(36, 41)),
        "titles": {
            "pt-BR": ("Repetições com while", "Repita enquanto a condição for verdadeira"),
            "en-US": ("While loops", "Repeat while a condition is true"),
        },
        "body": {
            "pt-BR": [
                "while testa uma condição antes de cada repetição. O bloco continua enquanto ela for verdadeira.",
                "O código normalmente atualiza um contador para avançar e permitir que o laço termine.",
            ],
            "en-US": [
                "while tests a condition before every repetition. Its block continues while the condition is true.",
                "The code normally updates a counter so it makes progress and can eventually stop.",
            ],
        },
        "example": ('count = 1\nwhile count <= 3:\n    print(count)\n    count += 1', "1\n2\n3"),
    },
)


def _localized_content(title: str, subtitle: str, body: list[str]) -> dict:
    return {"title": title, "subtitle": subtitle, "body": list(body)}


def _seed_payload() -> dict:
    missions_by_id = {mission.id: mission for mission in MISSIONS}
    lessons: list[dict] = []
    prerequisites: list[dict] = []

    for seed in _COMPATIBILITY_SEED:
        mission_ids = list(seed["mission_ids"])
        concepts = list(
            dict.fromkeys(
                concept_id(concept)
                for mission_id in mission_ids
                for concept in missions_by_id[mission_id].expected_concepts
            )
        )
        lesson_content = {
            locale: _localized_content(
                seed["titles"][locale][0],
                seed["titles"][locale][1],
                seed["body"][locale],
            )
            for locale in SUPPORTED_LOCALES
        }
        overview_content = {
            locale: {
                "title": seed["titles"][locale][0],
                "body": list(seed["body"][locale]),
            }
            for locale in SUPPORTED_LOCALES
        }
        demo_content = {
            "pt-BR": {
                "title": "Veja o Python executar",
                "body": ["A entrada mostra a instrução; a saída mostra a resposta produzida."],
            },
            "en-US": {
                "title": "Watch Python execute",
                "body": ["The input shows the instruction; the output shows the produced response."],
            },
        }
        steps: list[dict] = [
            {
                "id": f"{seed['id']}_teach",
                "type": "lesson",
                "teaches_concepts": concepts,
                "requires_concepts": [],
                "content": overview_content,
            },
            {
                "id": f"{seed['id']}_demo",
                "type": "demo",
                "teaches_concepts": [],
                "requires_concepts": concepts,
                "content": demo_content,
                "example": {
                    "language": "python",
                    "code": seed["example"][0],
                    "expected_output": seed["example"][1],
                },
            },
        ]

        if seed["id"] == "briefing_001":
            steps.append(
                {
                    "id": "briefing_001_check_print",
                    "type": "question",
                    "teaches_concepts": [],
                    "requires_concepts": [concept_id("print"), concept_id("quotes")],
                    "checks_concepts": [concept_id("print"), concept_id("quotes")],
                    "content": {
                        "pt-BR": {"title": "Qual instrução mostra um texto?", "body": []},
                        "en-US": {"title": "Which instruction displays text?", "body": []},
                    },
                    "assessment": {
                        "choices": [
                            {
                                "id": "choice_8f32a4d1",
                                "content": {
                                    "pt-BR": {"text": 'print("Olá")'},
                                    "en-US": {"text": 'print("Hello")'},
                                },
                            },
                            {
                                "id": "choice_c19e50ab",
                                "content": {
                                    "pt-BR": {"text": 'if "Olá"'},
                                    "en-US": {"text": 'if "Hello"'},
                                },
                            },
                            {
                                "id": "choice_41d7bc93",
                                "content": {
                                    "pt-BR": {"text": 'range("Olá")'},
                                    "en-US": {"text": 'range("Hello")'},
                                },
                            },
                        ],
                        "correct_choice_id": "choice_8f32a4d1",
                        "feedback": {
                            "pt-BR": {
                                "correct": "Certo: print recebe o texto entre aspas e o mostra na saída.",
                                "incorrect": "Ainda não. Procure o comando print com o texto entre aspas.",
                            },
                            "en-US": {
                                "correct": "Correct: print receives quoted text and displays it as output.",
                                "incorrect": "Not yet. Look for print with the text inside quotes.",
                            },
                        },
                    },
                }
            )
        if seed["id"] == "briefing_002":
            steps.append(
                {
                    "id": "briefing_002_sequence_assignment",
                    "type": "sequence",
                    "teaches_concepts": [],
                    "requires_concepts": [concept_id("assignment"), concept_id("print")],
                    "checks_concepts": [concept_id("assignment"), concept_id("print")],
                    "content": {
                        "pt-BR": {
                            "title": "Coloque o programa em ordem",
                            "body": ["Primeiro guarde o valor; depois use o nome."],
                        },
                        "en-US": {
                            "title": "Put the program in order",
                            "body": ["Store the value first; then use its name."],
                        },
                    },
                    "assessment": {
                        "items": [
                            {
                                "id": "item_83f0a2c1",
                                "content": {
                                    "pt-BR": {"text": 'name = "Mompy"'},
                                    "en-US": {"text": 'name = "Mompy"'},
                                },
                            },
                            {
                                "id": "item_c6d10b4e",
                                "content": {
                                    "pt-BR": {"text": "print(name)"},
                                    "en-US": {"text": "print(name)"},
                                },
                            },
                        ],
                        "correct_order": ["item_83f0a2c1", "item_c6d10b4e"],
                        "feedback": {
                            "pt-BR": {
                                "correct": "Certo: a variável existe antes de print tentar usá-la.",
                                "incorrect": "Primeiro crie a variável; depois peça para print mostrar seu valor.",
                            },
                            "en-US": {
                                "correct": "Correct: the variable exists before print tries to use it.",
                                "incorrect": "Create the variable first; then ask print to display its value.",
                            },
                        },
                    },
                }
            )

        lessons.append(
            {
                "id": seed["id"],
                "legacy_lesson_id": seed["legacy_lesson_id"],
                "order": seed["order"],
                "prerequisite_concept_ids": [],
                "outcome_concept_ids": concepts,
                "content": lesson_content,
                "steps": steps,
            }
        )
        for mission_id in mission_ids:
            prerequisites.append(
                {
                    "mission_id": mission_id,
                    "after_lesson_id": seed["id"],
                    "concept_ids": list(
                        dict.fromkeys(
                            concept_id(value)
                            for value in missions_by_id[mission_id].expected_concepts
                        )
                    ),
                }
            )

    return {
        "schema_version": CLASSROOM_SCHEMA_VERSION,
        "curriculum_version": "2026.08",
        "default_locale": DEFAULT_LOCALE,
        "supported_locales": list(SUPPORTED_LOCALES),
        "lessons": lessons,
        "mission_prerequisites": prerequisites,
    }


def _require(condition: bool, message: str) -> None:
    if not condition:
        raise ClassroomContentError(message)


def _require_id(value: object, label: str) -> str:
    _require(isinstance(value, str) and bool(_ID_PATTERN.fullmatch(value)), f"Invalid {label}: {value!r}")
    return str(value)


def _require_concept_ids(values: object, label: str) -> list[str]:
    _require(isinstance(values, list), f"{label} must be a list")
    result: list[str] = []
    for value in values:
        _require(
            isinstance(value, str) and value.startswith("python.") and len(value) > 7,
            f"Invalid concept id in {label}: {value!r}",
        )
        _require(value not in result, f"Duplicate concept id in {label}: {value}")
        result.append(value)
    return result


def _validate_localized_content(
    content: object,
    *,
    default_locale: str,
    label: str,
    require_title: bool = True,
) -> None:
    _require(isinstance(content, dict), f"{label}.content must be an object")
    _require(default_locale in content, f"{label}.content is missing {default_locale}")
    for locale, localized in content.items():
        _require(isinstance(locale, str), f"{label} has an invalid locale")
        _require(isinstance(localized, dict), f"{label}.content.{locale} must be an object")
        if require_title:
            _require(
                isinstance(localized.get("title"), str) and bool(localized["title"].strip()),
                f"{label}.content.{locale}.title is required",
            )
        body = localized.get("body", [])
        _require(
            isinstance(body, list) and all(isinstance(item, str) for item in body),
            f"{label}.content.{locale}.body must be a string list",
        )


def _deterministic_interaction_id(
    prefix: str,
    lesson_id: object,
    step_id: object,
    index: int,
) -> str:
    digest = sha256(f"{lesson_id}:{step_id}:{index}".encode("utf-8")).hexdigest()[:10]
    return f"{prefix}_{digest}"


def _normalize_interaction_answers(payload: dict) -> None:
    """Normalize legacy answer markers while keeping them backend-private."""

    for lesson in payload.get("lessons", []):
        if not isinstance(lesson, dict):
            continue
        for step in lesson.get("steps", []):
            if not isinstance(step, dict):
                continue
            assessment = step.get("assessment")
            if not isinstance(assessment, dict):
                continue
            if step.get("type") == "question":
                correct_from_legacy: list[str] = []
                for index, choice in enumerate(assessment.get("choices", [])):
                    if not isinstance(choice, dict):
                        continue
                    if not choice.get("id"):
                        choice["id"] = _deterministic_interaction_id(
                            "choice", lesson.get("id"), step.get("id"), index
                        )
                    if choice.pop("correct", False):
                        correct_from_legacy.append(choice["id"])
                if not assessment.get("correct_choice_id") and len(correct_from_legacy) == 1:
                    assessment["correct_choice_id"] = correct_from_legacy[0]
            if step.get("type") == "sequence":
                legacy_order = assessment.pop("correctOrder", None)
                if legacy_order is not None and "correct_order" not in assessment:
                    assessment["correct_order"] = legacy_order
                for index, item in enumerate(assessment.get("items", [])):
                    if isinstance(item, dict) and not item.get("id"):
                        item["id"] = _deterministic_interaction_id(
                            "item", lesson.get("id"), step.get("id"), index
                        )


def validate_classroom_payload(
    payload: object,
    *,
    known_missions: Sequence[Mission] | None = None,
    require_mission_coverage: bool = False,
) -> dict:
    """Validate curriculum structure, pedagogy order, and mission coverage.

    The validator intentionally makes no assumptions about lesson count or the
    number of missions prepared by a lesson.
    """

    _require(isinstance(payload, dict), "Classroom payload must be an object")
    payload = deepcopy(payload)
    _normalize_interaction_answers(payload)
    _require(
        payload.get("schema_version") == CLASSROOM_SCHEMA_VERSION,
        f"Unsupported classroom schema_version: {payload.get('schema_version')!r}",
    )
    default_locale = payload.get("default_locale")
    locales = payload.get("supported_locales")
    _require(isinstance(default_locale, str), "default_locale is required")
    _require(
        isinstance(locales, list) and default_locale in locales and all(isinstance(item, str) for item in locales),
        "supported_locales must include default_locale",
    )
    lessons = payload.get("lessons")
    mappings = payload.get("mission_prerequisites")
    _require(isinstance(lessons, list) and lessons, "lessons must be a non-empty list")
    _require(isinstance(mappings, list), "mission_prerequisites must be a list")

    lesson_ids: set[str] = set()
    step_keys: set[tuple[str, str]] = set()
    lesson_orders: dict[str, int] = {}
    taught_globally: set[str] = set()
    concept_first_order: dict[str, int] = {}

    ordered_lessons: list[dict] = []
    for lesson in lessons:
        _require(isinstance(lesson, dict), "Each lesson must be an object")
        lesson_id = _require_id(lesson.get("id"), "lesson id")
        _require(lesson_id not in lesson_ids, f"Duplicate lesson id: {lesson_id}")
        lesson_ids.add(lesson_id)
        order = lesson.get("order")
        _require(isinstance(order, int) and not isinstance(order, bool), f"{lesson_id}.order must be an integer")
        _require(order not in lesson_orders.values(), f"Duplicate lesson order: {order}")
        lesson_orders[lesson_id] = order
        ordered_lessons.append(lesson)

    for lesson in sorted(ordered_lessons, key=lambda item: item["order"]):
        lesson_id = lesson["id"]
        order = lesson["order"]
        _validate_localized_content(
            lesson.get("content"), default_locale=default_locale, label=lesson_id
        )
        outcomes = _require_concept_ids(
            lesson.get("outcome_concept_ids"), f"{lesson_id}.outcome_concept_ids"
        )
        lesson_prerequisites = _require_concept_ids(
            lesson.get("prerequisite_concept_ids", []),
            f"{lesson_id}.prerequisite_concept_ids",
        )
        unknown_prerequisites = set(lesson_prerequisites) - taught_globally
        _require(
            not unknown_prerequisites,
            f"{lesson_id} declares prerequisites before they are taught: {sorted(unknown_prerequisites)}",
        )
        steps = lesson.get("steps")
        _require(isinstance(steps, list) and steps, f"{lesson_id}.steps must be non-empty")
        # A lesson must state cross-lesson dependencies explicitly.  Inside a
        # lesson, only declared prerequisites and earlier teaching steps may be
        # checked by an interactive step.
        available = set(lesson_prerequisites)
        taught_here: set[str] = set()

        for step in steps:
            _require(isinstance(step, dict), f"{lesson_id} contains a non-object step")
            step_id = _require_id(step.get("id"), f"step id in {lesson_id}")
            key = (lesson_id, step_id)
            _require(key not in step_keys, f"Duplicate step id in {lesson_id}: {step_id}")
            step_keys.add(key)
            step_type = step.get("type")
            _require(
                step_type in {"lesson", "demo", "question", "sequence", "recap", "media"},
                f"Unsupported step type in {lesson_id}/{step_id}: {step_type!r}",
            )
            teaches = _require_concept_ids(
                step.get("teaches_concepts", []), f"{lesson_id}/{step_id}.teaches_concepts"
            )
            requires = _require_concept_ids(
                step.get("requires_concepts", []), f"{lesson_id}/{step_id}.requires_concepts"
            )
            missing = set(requires) - available
            _require(
                not missing,
                f"{lesson_id}/{step_id} requires concepts before they are taught: {sorted(missing)}",
            )
            _validate_localized_content(
                step.get("content"), default_locale=default_locale, label=f"{lesson_id}/{step_id}"
            )

            if step_type == "demo":
                example = step.get("example")
                _require(isinstance(example, dict), f"{lesson_id}/{step_id}.example is required")
                _require(example.get("language") == "python", f"{lesson_id}/{step_id} must declare Python")
                _require(
                    isinstance(example.get("code"), str) and bool(example["code"].strip()),
                    f"{lesson_id}/{step_id}.example.code is required",
                )
                _require(
                    isinstance(example.get("expected_output"), str),
                    f"{lesson_id}/{step_id}.example.expected_output must be text",
                )
                variants = example.get("variants")
                if variants is not None:
                    _require(
                        isinstance(variants, dict) and default_locale in variants,
                        f"{lesson_id}/{step_id}.example.variants must include {default_locale}",
                    )
                    for locale, variant in variants.items():
                        _require(
                            locale in locales and isinstance(variant, dict),
                            f"{lesson_id}/{step_id}.example.variants.{locale} is invalid",
                        )
                        _require(
                            isinstance(variant.get("code"), str) and bool(variant["code"].strip()),
                            f"{lesson_id}/{step_id}.example.variants.{locale}.code is required",
                        )
                        _require(
                            isinstance(variant.get("expected_output"), str),
                            f"{lesson_id}/{step_id}.example.variants.{locale}.expected_output must be text",
                        )

            if step_type == "question":
                checks = _require_concept_ids(
                    step.get("checks_concepts"), f"{lesson_id}/{step_id}.checks_concepts"
                )
                _require(checks, f"{lesson_id}/{step_id} must check at least one concept")
                missing_checks = set(checks) - available
                _require(
                    not missing_checks,
                    f"{lesson_id}/{step_id} asks before teaching: {sorted(missing_checks)}",
                )
                assessment = step.get("assessment")
                _require(isinstance(assessment, dict), f"{lesson_id}/{step_id}.assessment is required")
                choices = assessment.get("choices")
                _require(
                    isinstance(choices, list) and len(choices) >= 2,
                    f"{lesson_id}/{step_id} needs at least two choices",
                )
                choice_ids: set[str] = set()
                for choice in choices:
                    _require(isinstance(choice, dict), f"{lesson_id}/{step_id} has an invalid choice")
                    choice_id = choice.get("id")
                    _require(
                        isinstance(choice_id, str) and bool(_CHOICE_ID_PATTERN.fullmatch(choice_id)),
                        f"{lesson_id}/{step_id} choice IDs must be opaque",
                    )
                    _require(choice_id not in choice_ids, f"Duplicate choice id: {choice_id}")
                    choice_ids.add(choice_id)
                    _validate_localized_content(
                        choice.get("content"),
                        default_locale=default_locale,
                        label=f"{lesson_id}/{step_id}/{choice_id}",
                        require_title=False,
                    )
                    for locale, localized in choice["content"].items():
                        _require(
                            isinstance(localized.get("text"), str) and bool(localized["text"].strip()),
                            f"{lesson_id}/{step_id}/{choice_id}.content.{locale}.text is required",
                        )
                correct_choice_id = assessment.get("correct_choice_id")
                _require(
                    correct_choice_id in choice_ids,
                    f"{lesson_id}/{step_id}.correct_choice_id must reference a choice",
                )
                feedback = assessment.get("feedback")
                _require(isinstance(feedback, dict) and default_locale in feedback, f"{lesson_id}/{step_id}.feedback is required")
                for locale, localized in feedback.items():
                    _require(isinstance(localized, dict), f"{lesson_id}/{step_id}.feedback.{locale} must be an object")
                    _require(
                        all(isinstance(localized.get(key), str) for key in ("correct", "incorrect")),
                        f"{lesson_id}/{step_id}.feedback.{locale} needs correct and incorrect text",
                    )

            if step_type == "sequence":
                checks = _require_concept_ids(
                    step.get("checks_concepts"), f"{lesson_id}/{step_id}.checks_concepts"
                )
                _require(checks, f"{lesson_id}/{step_id} must check at least one concept")
                missing_checks = set(checks) - available
                _require(
                    not missing_checks,
                    f"{lesson_id}/{step_id} asks before teaching: {sorted(missing_checks)}",
                )
                assessment = step.get("assessment")
                _require(isinstance(assessment, dict), f"{lesson_id}/{step_id}.assessment is required")
                items = assessment.get("items")
                _require(
                    isinstance(items, list) and len(items) >= 2,
                    f"{lesson_id}/{step_id} needs at least two sequence items",
                )
                item_ids: set[str] = set()
                for item in items:
                    _require(isinstance(item, dict), f"{lesson_id}/{step_id} has an invalid item")
                    item_id = item.get("id")
                    _require(
                        isinstance(item_id, str) and bool(_ITEM_ID_PATTERN.fullmatch(item_id)),
                        f"{lesson_id}/{step_id} item IDs must be opaque",
                    )
                    _require(item_id not in item_ids, f"Duplicate sequence item id: {item_id}")
                    item_ids.add(item_id)
                    _validate_localized_content(
                        item.get("content"),
                        default_locale=default_locale,
                        label=f"{lesson_id}/{step_id}/{item_id}",
                        require_title=False,
                    )
                    for locale, localized in item["content"].items():
                        _require(
                            isinstance(localized.get("text"), str) and bool(localized["text"].strip()),
                            f"{lesson_id}/{step_id}/{item_id}.content.{locale}.text is required",
                        )
                correct_order = assessment.get("correct_order")
                _require(
                    isinstance(correct_order, list)
                    and len(correct_order) == len(item_ids)
                    and len(set(correct_order)) == len(correct_order)
                    and set(correct_order) == item_ids,
                    f"{lesson_id}/{step_id}.correct_order must contain every item exactly once",
                )
                feedback = assessment.get("feedback")
                _require(isinstance(feedback, dict) and default_locale in feedback, f"{lesson_id}/{step_id}.feedback is required")
                for locale, localized in feedback.items():
                    _require(isinstance(localized, dict), f"{lesson_id}/{step_id}.feedback.{locale} must be an object")
                    _require(
                        all(isinstance(localized.get(key), str) for key in ("correct", "incorrect")),
                        f"{lesson_id}/{step_id}.feedback.{locale} needs correct and incorrect text",
                    )

            available.update(teaches)
            taught_here.update(teaches)
            for taught in teaches:
                concept_first_order.setdefault(taught, order)

        missing_outcomes = set(outcomes) - taught_here
        _require(
            not missing_outcomes,
            f"{lesson_id} declares outcomes it does not teach: {sorted(missing_outcomes)}",
        )
        undeclared_teaching = taught_here - set(outcomes)
        _require(
            not undeclared_teaching,
            f"{lesson_id} teaches concepts missing from its outcomes: {sorted(undeclared_teaching)}",
        )
        taught_globally.update(taught_here)

    mission_by_id = {mission.id: mission for mission in (known_missions or ())}
    mapped_missions: set[str] = set()
    for mapping in mappings:
        _require(isinstance(mapping, dict), "Each mission prerequisite mapping must be an object")
        mission_id = _require_id(mapping.get("mission_id"), "mission prerequisite mission_id")
        _require(mission_id not in mapped_missions, f"Duplicate mission prerequisite mapping: {mission_id}")
        mapped_missions.add(mission_id)
        anchor = mapping.get("after_lesson_id")
        _require(anchor in lesson_orders, f"{mission_id} references unknown lesson: {anchor!r}")
        prerequisites = _require_concept_ids(mapping.get("concept_ids"), f"{mission_id}.concept_ids")
        _require(prerequisites, f"{mission_id} must declare at least one prerequisite concept")
        unavailable = {
            item
            for item in prerequisites
            if item not in concept_first_order or concept_first_order[item] > lesson_orders[anchor]
        }
        _require(
            not unavailable,
            f"{mission_id} is ordered before prerequisite concepts are taught: {sorted(unavailable)}",
        )
        if mission_by_id:
            _require(mission_id in mission_by_id, f"Unknown mission in curriculum: {mission_id}")
            expected = {concept_id(value) for value in mission_by_id[mission_id].expected_concepts}
            missing_expected = expected - set(prerequisites)
            _require(
                not missing_expected,
                f"{mission_id} omits mission concepts: {sorted(missing_expected)}",
            )

    if require_mission_coverage and mission_by_id:
        missing_missions = set(mission_by_id) - mapped_missions
        _require(not missing_missions, f"Curriculum does not prepare missions: {sorted(missing_missions)}")

    return deepcopy(payload)


def load_classroom_payload(path: Path | None = None) -> dict:
    """Load and validate the canonical JSON, with a packaged compatibility seed."""

    curriculum_path = path or CLASSROOM_DATA_PATH
    if curriculum_path.exists():
        try:
            raw_payload = json.loads(curriculum_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise ClassroomContentError(
                f"Could not read classroom curriculum at {curriculum_path}: {error}"
            ) from error
    else:
        raw_payload = _seed_payload()
    return validate_classroom_payload(
        raw_payload,
        known_missions=MISSIONS,
        require_mission_coverage=True,
    )


_CLASSROOM_PAYLOAD = load_classroom_payload()


def _locale_or_default(locale: str | None) -> str:
    if locale in _CLASSROOM_PAYLOAD["supported_locales"]:
        return str(locale)
    return str(_CLASSROOM_PAYLOAD["default_locale"])


def _localized_value(values: Mapping[str, dict], locale: str) -> dict:
    selected = values.get(locale) or values[_CLASSROOM_PAYLOAD["default_locale"]]
    return deepcopy(selected)


def _public_step(lesson_id: str, step: dict, locale: str) -> dict:
    public = {
        "id": step["id"],
        "type": step["type"],
        "teaches_concepts": list(step.get("teaches_concepts", [])),
        "requires_concepts": list(step.get("requires_concepts", [])),
        **_localized_value(step["content"], locale),
    }
    if step.get("checks_concepts"):
        public["checks_concepts"] = list(step["checks_concepts"])
    if "example" in step:
        public["example"] = {
            "available": True,
            "language": "python",
            "run_path": "/api/classroom/example/run",
        }
    if step.get("type") == "question" and "assessment" in step:
        public["assessment"] = {
            "choices": [
                {"id": choice["id"], **_localized_value(choice["content"], locale)}
                for choice in step["assessment"]["choices"]
            ],
            "attempt_path": "/api/classroom/choice/check",
        }
    if step.get("type") == "sequence" and "assessment" in step:
        public["assessment"] = {
            "items": [
                {"id": item["id"], **_localized_value(item["content"], locale)}
                for item in step["assessment"]["items"]
            ],
            "check_path": "/api/classroom/sequence/check",
        }
    return public


def _public_lesson(lesson: dict, locale: str) -> dict:
    return {
        "id": lesson["id"],
        "legacy_lesson_id": lesson.get("legacy_lesson_id"),
        "order": lesson["order"],
        "locale": locale,
        "prerequisite_concept_ids": list(lesson.get("prerequisite_concept_ids", [])),
        "outcome_concept_ids": list(lesson["outcome_concept_ids"]),
        **_localized_value(lesson["content"], locale),
        "steps": [_public_step(lesson["id"], step, locale) for step in lesson["steps"]],
    }


def get_classroom_lessons(locale: str | None = None) -> list[dict]:
    selected_locale = _locale_or_default(locale)
    ordered = sorted(_CLASSROOM_PAYLOAD["lessons"], key=lambda lesson: lesson["order"])
    return [_public_lesson(lesson, selected_locale) for lesson in ordered]


def get_classroom_lesson(lesson_id: str, locale: str | None = None) -> dict | None:
    selected_locale = _locale_or_default(locale)
    lesson = next((item for item in _CLASSROOM_PAYLOAD["lessons"] if item["id"] == lesson_id), None)
    return _public_lesson(lesson, selected_locale) if lesson else None


def get_classroom_step(
    lesson_id: str,
    step_id: str,
    locale: str | None = None,
) -> dict | None:
    lesson = get_classroom_lesson(lesson_id, locale)
    if not lesson:
        return None
    return next((step for step in lesson["steps"] if step["id"] == step_id), None)


def get_step(
    lesson_id: str,
    step_id: str,
    locale: str | None = None,
) -> dict | None:
    """Short compatibility name used by curriculum tooling."""

    return get_classroom_step(lesson_id, step_id, locale)


def get_classroom_schema() -> dict:
    return {
        "schema_version": _CLASSROOM_PAYLOAD["schema_version"],
        "curriculum_version": _CLASSROOM_PAYLOAD["curriculum_version"],
        "default_locale": _CLASSROOM_PAYLOAD["default_locale"],
        "supported_locales": list(_CLASSROOM_PAYLOAD["supported_locales"]),
        "mission_prerequisites": deepcopy(_CLASSROOM_PAYLOAD["mission_prerequisites"]),
    }


def get_internal_classroom_step(lesson_id: str, step_id: str) -> dict | None:
    """Return a defensive internal copy for trusted backend services only."""

    lesson = next((item for item in _CLASSROOM_PAYLOAD["lessons"] if item["id"] == lesson_id), None)
    if not lesson:
        return None
    step = next((item for item in lesson["steps"] if item["id"] == step_id), None)
    return deepcopy(step) if step else None


def assessment_step_ids(lesson_id: str) -> list[str]:
    lesson = next((item for item in _CLASSROOM_PAYLOAD["lessons"] if item["id"] == lesson_id), None)
    if not lesson:
        raise ClassroomContentError(f"Unknown classroom lesson: {lesson_id}")
    return [
        step["id"]
        for step in lesson["steps"]
        if step["type"] in {"question", "sequence"}
    ]
