import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const previewRoot = path.resolve(scriptDir, "..");
const repositoryRoot = path.resolve(
  process.argv[2] || "C:/BOOK-07/project/mompy project/mompy",
);
const outputPath = path.resolve(
  process.argv[3] || path.join(repositoryRoot, "backend/data/classroom_lessons.json"),
);

const lessonSources = [
  "frontend/js/classroom-lessons.js",
  "frontend/js/classroom-lessons-control-flow.js",
  "frontend/js/classroom-lessons-data-structures.js",
  "frontend/js/classroom-lessons-pedagogy.js",
  "frontend/js/classroom-lessons-catalog.js",
];
const context = { window: {} };
vm.createContext(context);
for (const relativePath of lessonSources) {
  const absolutePath = path.join(previewRoot, relativePath);
  vm.runInContext(fs.readFileSync(absolutePath, "utf8"), context, {
    filename: absolutePath,
  });
}

const catalog = context.window.MOMPY_CLASSROOM_LESSONS;
const curriculum = context.window.MOMPY_CLASSROOM_CURRICULUM;
if (!catalog || !curriculum) {
  throw new Error("The browser lesson catalog did not initialize.");
}

const missionReader = [
  "import json",
  "from backend.missions import MISSIONS",
  "print(json.dumps([{'id': m.id, 'concepts': list(m.expected_concepts)} for m in MISSIONS]))",
].join(";");
const missions = JSON.parse(execFileSync("python", ["-c", missionReader], {
  cwd: repositoryRoot,
  encoding: "utf8",
}));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeConcept(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    throw new Error("Empty concept identifier.");
  }
  const normalized = raw
    .replaceAll("==", " equality ")
    .replaceAll(">=", " greater or equal ")
    .replaceAll("<=", " less or equal ")
    .replaceAll(">", " greater than ")
    .replaceAll("<", " less than ")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized.startsWith("python.") ? normalized : "python." + normalized;
}

function unique(values) {
  return [...new Set(values)];
}

function opaqueId(prefix, lessonId, stepId, index) {
  const digest = createHash("sha256")
    .update(lessonId + ":" + stepId + ":" + index)
    .digest("hex")
    .slice(0, 10);
  return prefix + "_" + digest;
}

function lessonForMission(rawConcepts) {
  const values = rawConcepts.map((value) => String(value).toLowerCase());
  const has = (...candidates) => candidates.some((candidate) => values.includes(candidate));
  if (has("while")) return "briefing_008";
  if (has("dictionary")) return "briefing_007";
  if (has("def", "function", "return", "parameter", "parameters")) return "briefing_006";
  if (has("list", "append", "zero based index")) return "briefing_005";
  if (has("for", "range", "loop variable", "string sequence")) return "briefing_004";
  if (has("if", "else", "boolean", "comparison", "equality", "greater than", "<=")) return "briefing_003";
  if (has("variable", "assignment", "reassignment", "number", "addition")) return "briefing_002";
  return "briefing_001";
}

const missionConceptsByLesson = new Map();
const missionPrerequisites = missions.map((mission) => {
  const lessonId = lessonForMission(mission.concepts);
  const conceptIds = unique(mission.concepts.map(normalizeConcept));
  const current = missionConceptsByLesson.get(lessonId) || [];
  missionConceptsByLesson.set(lessonId, unique([...current, ...conceptIds]));
  return {
    mission_id: mission.id,
    after_lesson_id: lessonId,
    concept_ids: conceptIds,
  };
});

const conceptAnchorByLesson = {
  briefing_001: "print-anatomy",
  briefing_002: "var-guided-run",
  briefing_003: "decision-if-anatomy",
  briefing_004: "for-accumulator-demo",
  briefing_005: "lists-toolbox",
  briefing_006: "functions-anatomy",
  briefing_007: "dicts-anatomy",
  briefing_008: "while-anatomy",
};

function safeLessonContent(lesson) {
  const content = clone(lesson);
  delete content.steps;
  delete content.concepts;
  delete content.prerequisites;
  delete content.id;
  delete content.locale;
  content.body = Array.isArray(content.body)
    ? content.body
    : content.subtitle
      ? [content.subtitle]
      : [];
  return content;
}

function safeStepContent(step, lessonId, stepId, locale) {
  const content = clone(step);
  delete content.id;
  content.presentationType = content.type;
  delete content.type;
  delete content.teaches;
  delete content.requires;
  delete content.checks;
  delete content.correctOrder;

  if (Array.isArray(content.choices)) {
    content.choices = content.choices.map((choice, index) => {
      const safe = clone(choice);
      delete safe.correct;
      safe.id = opaqueId("choice", lessonId, stepId, index);
      return safe;
    });
  }

  if (Array.isArray(content.sequenceItems)) {
    content.sequenceItems = content.sequenceItems.map((item, index) => ({
      ...clone(item),
      id: opaqueId("item", lessonId, stepId, index),
    }));
    content.sequenceLength = content.sequenceItems.length;
  }

  content.body = Array.isArray(content.body) ? content.body : [];
  if (!content.title) {
    content.title = locale === "pt-BR" ? "Etapa da aula" : "Lesson step";
  }
  return content;
}

function coreStepType(step) {
  if (step.type === "choice") return "question";
  if (step.type === "sequence") return "sequence";
  if (step.type === "summary") return "recap";
  if (step.type === "run" || step.executionDemo) return "demo";
  return "lesson";
}

function buildAssessment(lessonId, stepId, localizedSteps, type) {
  if (type === "question") {
    const defaultChoices = localizedSteps["pt-BR"].choices || [];
    const correctIndexes = defaultChoices
      .map((choice, index) => choice.correct ? index : -1)
      .filter((index) => index >= 0);
    if (correctIndexes.length !== 1) {
      throw new Error(lessonId + "/" + stepId + " must have exactly one correct choice.");
    }
    const choices = defaultChoices.map((choice, index) => ({
      id: opaqueId("choice", lessonId, stepId, index),
      content: Object.fromEntries(Object.entries(localizedSteps).map(([locale, step]) => [
        locale,
        {
          text: String(step.choices[index].text),
          body: [],
        },
      ])),
    }));
    return {
      choices,
      correct_choice_id: choices[correctIndexes[0]].id,
      feedback: Object.fromEntries(Object.entries(localizedSteps).map(([locale, step]) => [
        locale,
        {
          correct: String(step.success || (locale === "pt-BR" ? "Resposta correta." : "Correct answer.")),
          incorrect: String(step.error || (locale === "pt-BR" ? "Tente novamente." : "Try again.")),
          hint: String(step.hint || ""),
        },
      ])),
    };
  }

  if (type === "sequence") {
    const defaultItems = localizedSteps["pt-BR"].sequenceItems || [];
    const itemIndexByLegacyId = new Map(defaultItems.map((item, index) => [item.id, index]));
    const items = defaultItems.map((item, index) => ({
      id: opaqueId("item", lessonId, stepId, index),
      content: Object.fromEntries(Object.entries(localizedSteps).map(([locale, step]) => [
        locale,
        {
          text: String(step.sequenceItems[index].label),
          body: step.sequenceItems[index].detail ? [String(step.sequenceItems[index].detail)] : [],
        },
      ])),
    }));
    const correctOrder = (localizedSteps["pt-BR"].correctOrder || []).map((legacyId) => {
      const index = itemIndexByLegacyId.get(legacyId);
      if (index === undefined) {
        throw new Error(lessonId + "/" + stepId + " has an unknown sequence answer item.");
      }
      return items[index].id;
    });
    return {
      items,
      correct_order: correctOrder,
      feedback: Object.fromEntries(Object.entries(localizedSteps).map(([locale, step]) => [
        locale,
        {
          correct: String(step.success || (locale === "pt-BR" ? "Ordem correta." : "Correct order.")),
          incorrect: String(step.error || (locale === "pt-BR" ? "Tente novamente." : "Try again.")),
          hint: String(step.hint || ""),
        },
      ])),
    };
  }

  return undefined;
}

const lessons = curriculum.lessonOrder.map((lessonId, orderIndex) => {
  const localizedLessons = catalog[lessonId];
  if (!localizedLessons?.["pt-BR"] || !localizedLessons?.["en-US"]) {
    throw new Error(lessonId + " must contain pt-BR and en-US.");
  }
  const locales = Object.keys(localizedLessons);
  const defaultLesson = localizedLessons["pt-BR"];
  const defaultStepIds = defaultLesson.steps.map((step) => step.id);
  for (const locale of locales) {
    const localizedStepIds = localizedLessons[locale].steps.map((step) => step.id);
    if (JSON.stringify(localizedStepIds) !== JSON.stringify(defaultStepIds)) {
      throw new Error(lessonId + " has mismatched localized step IDs.");
    }
  }

  const prerequisiteConceptIds = unique((defaultLesson.prerequisites || []).map(normalizeConcept));
  const declaredOutcomes = unique([
    ...(defaultLesson.concepts || []).map(normalizeConcept),
    ...(missionConceptsByLesson.get(lessonId) || []),
  ]);
  const anchorStepId = conceptAnchorByLesson[lessonId] || defaultStepIds[0];
  const existingTeaching = new Set(
    defaultLesson.steps.flatMap((step) => (step.teaches || []).map(normalizeConcept)),
  );
  const additionalTeaching = declaredOutcomes.filter((concept) => !existingTeaching.has(concept));

  const steps = defaultStepIds.map((stepId, stepIndex) => {
    const localizedSteps = Object.fromEntries(locales.map((locale) => [
      locale,
      localizedLessons[locale].steps[stepIndex],
    ]));
    const defaultStep = localizedSteps["pt-BR"];
    const coreType = coreStepType(defaultStep);
    const teaches = unique([
      ...(defaultStep.teaches || []).map(normalizeConcept),
      ...(stepId === anchorStepId ? additionalTeaching : []),
    ]);
    const checks = unique((defaultStep.checks || []).map(normalizeConcept));
    const requires = unique([
      ...(defaultStep.requires || []).map(normalizeConcept),
      ...checks,
    ]);
    const step = {
      id: stepId,
      type: coreType,
      teaches_concepts: teaches,
      requires_concepts: requires,
      content: Object.fromEntries(locales.map((locale) => [
        locale,
        safeStepContent(localizedSteps[locale], lessonId, stepId, locale),
      ])),
    };

    if (checks.length) step.checks_concepts = checks;
    const assessment = buildAssessment(lessonId, stepId, localizedSteps, coreType);
    if (assessment) step.assessment = assessment;

    if (coreType === "demo") {
      const variants = Object.fromEntries(locales.map((locale) => {
        const localized = localizedSteps[locale];
        const demo = localized.executionDemo || localized;
        return [locale, {
          code: String(demo.code || ""),
          expected_output: String(demo.output || ""),
        }];
      }));
      step.example = {
        language: "python",
        code: variants["pt-BR"].code,
        expected_output: variants["pt-BR"].expected_output,
        variants,
      };
    }
    return step;
  });

  const taught = unique(steps.flatMap((step) => step.teaches_concepts));
  return {
    id: lessonId,
    legacy_lesson_id: "lesson_" + String(orderIndex + 1).padStart(3, "0"),
    order: (orderIndex + 1) * 10,
    prerequisite_concept_ids: prerequisiteConceptIds,
    outcome_concept_ids: taught,
    content: Object.fromEntries(locales.map((locale) => [
      locale,
      safeLessonContent(localizedLessons[locale]),
    ])),
    steps,
  };
});

const payload = {
  schema_version: 1,
  curriculum_version: "2026.08-concept-mastery.1",
  default_locale: "pt-BR",
  supported_locales: ["pt-BR", "en-US"],
  curriculum: {
    id: curriculum.id,
    sequencing: curriculum.sequencing,
    policy: curriculum.policy,
    lesson_order: [...curriculum.lessonOrder],
  },
  lessons,
  mission_prerequisites: missionPrerequisites,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
const localizedSteps = lessons.reduce(
  (total, lesson) => total + lesson.steps.length * Object.keys(lesson.content).length,
  0,
);
console.log(
  "EXPORTED_CLASSROOM lessons=" + lessons.length
  + " localized_steps=" + localizedSteps
  + " missions=" + missionPrerequisites.length
  + " target=" + outputPath,
);
