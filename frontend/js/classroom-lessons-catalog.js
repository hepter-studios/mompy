"use strict";

// Combines the offline/design-preview lesson modules. In the packaged app the
// Python bootstrap payload is authoritative; app.js uses this catalog only when
// that backend payload is unavailable.
(() => {
  const catalog = window.MOMPY_CLASSROOM_LESSONS || {};
  Object.assign(
    catalog,
    window.MOMPY_CLASSROOM_LESSONS_DRAFT_2_4 || {},
    window.MOMPY_CLASSROOM_LESSONS_DRAFT_5_8 || {},
  );
  window.MOMPY_CLASSROOM_LESSONS = catalog;

  window.MOMPY_CLASSROOM_CURRICULUM = {
    schemaVersion: 1,
    id: "python-foundations",
    sequencing: "concept-mastery",
    lessonOrder: [
      "briefing_001",
      "briefing_002",
      "briefing_003",
      "briefing_004",
      "briefing_005",
      "briefing_006",
      "briefing_007",
      "briefing_008",
    ],
    policy: "Lessons are sized by learning goals. Missions depend on explicit concept prerequisites, never a fixed lesson-to-mission count.",
  };

  const lessonOneConcepts = [
    "python.language",
    "python.instructions",
    "python.creator",
    "python.history",
    "python.name-origin",
    "python.uses",
    "python.interpreter",
    "python.syntax",
    "python.indentation",
    "python.comments",
    "python.function",
    "python.string",
    "program.execution",
    "program.input-output",
    "program.execution-order",
    "python.print",
    "print.output",
    "print.syntax",
    "python.text",
    "string.quotes",
    "call.parentheses",
  ];
  const lessonOnePedagogy = {
    "what-is-python": {
      teaches: ["python.language", "python.instructions", "program.execution", "program.input-output"],
    },
    guido: { teaches: ["python.creator"] },
    timeline: { teaches: ["python.history"] },
    "python-name-story": { teaches: ["python.name-origin"] },
    "name-origin": { checks: ["python.name-origin"] },
    "python-purpose-check": { checks: ["python.language", "python.instructions"] },
    uses: { teaches: ["python.uses"] },
    "history-check": { checks: ["python.creator"] },
    instruction: { teaches: ["program.execution", "program.input-output", "program.execution-order"] },
    interpreter: { teaches: ["python.interpreter", "program.execution"] },
    "code-flow": { teaches: ["program.execution", "program.input-output", "program.execution-order"] },
    "syntax-intro": { teaches: ["python.syntax", "python.indentation", "python.comments"] },
    "text-intro": { teaches: ["python.text", "python.string", "string.quotes"] },
    "print-purpose": { teaches: ["python.function", "python.print", "print.output"] },
    "first-print": { teaches: ["python.print", "print.output"] },
    "print-anatomy": { teaches: ["print.syntax", "python.text", "string.quotes", "call.parentheses"] },
    "predict-output": { checks: ["python.print", "print.output", "python.text"] },
    "two-lines-demo": { teaches: ["program.execution-order", "python.print", "print.output"] },
    "two-lines": { checks: ["program.execution-order", "python.print", "print.output"] },
    "syntax-pairs": { teaches: ["print.syntax", "python.text", "string.quotes", "call.parentheses"] },
    "fill-text": { checks: ["python.text", "string.quotes", "print.syntax"] },
    "mastery-python": { checks: ["python.language", "python.instructions"] },
    "mastery-print": { checks: ["python.print", "print.output"] },
    "mastery-text": { checks: ["python.text", "string.quotes"] },
    "mastery-order": { checks: ["program.execution-order", "python.print"] },
    "mastery-syntax": { checks: ["print.syntax", "string.quotes", "call.parentheses"] },
  };

  Object.entries(catalog).forEach(([lessonId, localizedLessons]) => {
    Object.entries(localizedLessons || {}).forEach(([locale, lesson]) => {
      if (!lesson || typeof lesson !== "object") {
        return;
      }

      lesson.id = lessonId;
      lesson.locale = locale;
      if (lessonId === "briefing_001") {
        lesson.prerequisites = [];
        lesson.concepts = [...lessonOneConcepts];
      }
      if (lessonId === "briefing_002") {
        lesson.concepts = [...new Set([...(lesson.concepts || []), "python.variables", "python.arithmetic"])];
      }
      if (lessonId === "briefing_003") {
        lesson.concepts = [...new Set([...(lesson.concepts || []), "python.comparisons"])];
      }
      if (lessonId === "briefing_004") {
        lesson.concepts = [...new Set([...(lesson.concepts || []), "python.for"])];
      }

      (lesson.steps || []).forEach((step) => {
        if (lessonId === "briefing_001" && lessonOnePedagogy[step.id]) {
          Object.assign(step, lessonOnePedagogy[step.id]);
        }
        (step.choices || []).forEach((choice, choiceIndex) => {
          choice.id ||= `choice_${String.fromCharCode(97 + choiceIndex)}`;
        });
        if (step.sequenceItems?.length) {
          step.sequenceLength ||= step.sequenceItems.length;
        }
      });
    });
  });

  delete window.MOMPY_CLASSROOM_LESSONS_DRAFT_2_4;
  delete window.MOMPY_CLASSROOM_LESSONS_DRAFT_5_8;
})();
