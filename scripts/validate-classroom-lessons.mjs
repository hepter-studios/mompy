import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(scriptDir, "..", "frontend");
const sources = [
  "js/classroom-lessons.js",
  "js/classroom-lessons-control-flow.js",
  "js/classroom-lessons-data-structures.js",
  "js/classroom-lessons-catalog.js",
];
const context = vm.createContext({ window: {} });

for (const relativePath of sources) {
  const sourcePath = path.join(frontendDir, relativePath);
  vm.runInContext(fs.readFileSync(sourcePath, "utf8"), context, { filename: sourcePath });
}

const catalog = context.window.MOMPY_CLASSROOM_LESSONS;
const curriculum = context.window.MOMPY_CLASSROOM_CURRICULUM;
const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

assert(catalog && typeof catalog === "object", "Missing lesson catalog.");
assert(curriculum?.sequencing === "concept-mastery", "Curriculum must use concept mastery sequencing.");
assert(Array.isArray(curriculum?.lessonOrder) && curriculum.lessonOrder.length > 0, "Missing lesson order.");

const coveredConcepts = new Set();
for (const lessonId of curriculum?.lessonOrder || []) {
  const localized = catalog?.[lessonId];
  assert(localized, `${lessonId}: missing from catalog.`);
  if (!localized) continue;

  const locales = Object.keys(localized).sort();
  assert(locales.includes("pt-BR") && locales.includes("en-US"), `${lessonId}: PT-BR and en-US are required.`);
  const referenceIds = (localized["pt-BR"]?.steps || []).map((step) => step.id);

  for (const locale of locales) {
    const lesson = localized[locale];
    const steps = lesson?.steps || [];
    const stepIds = steps.map((step) => step.id);
    assert(new Set(stepIds).size === stepIds.length, `${lessonId}/${locale}: duplicate step id.`);
    assert(JSON.stringify(stepIds) === JSON.stringify(referenceIds), `${lessonId}/${locale}: step order differs from PT-BR.`);

    const knownConcepts = new Set(lesson.prerequisites || []);
    for (const step of steps) {
      for (const conceptId of step.checks || []) {
        assert(
          knownConcepts.has(conceptId),
          `${lessonId}/${locale}/${step.id}: checks ${conceptId} before it is taught.`,
        );
      }

      if (step.type === "choice") {
        const correctCount = (step.choices || []).filter((choice) => choice.correct === true).length;
        assert(correctCount === 1, `${lessonId}/${locale}/${step.id}: expected exactly one correct choice.`);
        const choiceIds = (step.choices || []).map((choice) => choice.id);
        assert(choiceIds.every(Boolean), `${lessonId}/${locale}/${step.id}: every choice needs an id.`);
        assert(new Set(choiceIds).size === choiceIds.length, `${lessonId}/${locale}/${step.id}: duplicate choice id.`);
      }

      if (step.type === "sequence") {
        assert(step.correctOrder?.length === step.sequenceItems?.length, `${lessonId}/${locale}/${step.id}: incomplete sequence answer.`);
      }

      if (step.executionDemo) {
        assert(Boolean(step.executionDemo.code), `${lessonId}/${locale}/${step.id}: execution demo needs code.`);
        assert(typeof step.executionDemo.output === "string", `${lessonId}/${locale}/${step.id}: execution demo needs output.`);
        assert(
          ["INPUT", "INSTRUÇÃO", "INSTRUCTION"].includes(step.executionDemo.inputLabel),
          `${lessonId}/${locale}/${step.id}: invalid demo input label.`,
        );
        assert(
          ["OUTPUT", "RESULTADO", "RESULT"].includes(step.executionDemo.outputLabel),
          `${lessonId}/${locale}/${step.id}: invalid demo output label.`,
        );
      }

      for (const conceptId of step.teaches || []) {
        knownConcepts.add(conceptId);
      }
    }

    for (const conceptId of lesson.concepts || []) {
      assert(knownConcepts.has(conceptId) || conceptId.startsWith("python."), `${lessonId}/${locale}: concept ${conceptId} is never taught.`);
    }
  }

  const ptLesson = localized["pt-BR"];
  for (const prerequisite of ptLesson?.prerequisites || []) {
    assert(coveredConcepts.has(prerequisite), `${lessonId}: prerequisite ${prerequisite} is not covered earlier.`);
  }
  for (const conceptId of ptLesson?.concepts || []) {
    coveredConcepts.add(conceptId);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  const lessonCount = curriculum.lessonOrder.length;
  const stepCount = curriculum.lessonOrder.reduce(
    (total, lessonId) => total + catalog[lessonId]["pt-BR"].steps.length,
    0,
  );
  console.log(`CLASSROOM_OK lessons=${lessonCount} pt_steps=${stepCount} sequencing=${curriculum.sequencing}`);
}
