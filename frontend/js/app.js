const ASSETS = {
  idle: "./assets/mompy_idle.png?v=2",
  side: "./assets/mompy_look_side.png?v=1",
  front: "./assets/mompy_front.png?v=5",
  gazeTransition: "./assets/mompy_gaze_transition.png?v=1",
  frontBlink: "./assets/mompy_front_blink.png?v=1",
  achievements: "./assets/mompy_achievements.png?v=1",
  settings: "./assets/mompy_settings.png?v=1",
  talk1: "./assets/mompy_talk_1.png?v=1",
  talk2: "./assets/mompy_talk_2.png?v=1",
  talkArticulation1: "./assets/mompy_talk_articulation_locked_1.png?v=1",
  talkArticulation2: "./assets/mompy_talk_articulation_locked_2.png?v=1",
  talkArticulation3: "./assets/mompy_talk_articulation_locked_3.png?v=1",
  talkArticulation4: "./assets/mompy_talk_articulation_locked_4.png?v=1",
  talkArticulation5: "./assets/mompy_talk_articulation_locked_5.png?v=1",
  talkArticulation6: "./assets/mompy_talk_articulation_locked_6.png?v=1",
  success: "./assets/mompy_happy.png",
  error: "./assets/mompy_sad.png",
  celebrate: "./assets/mompy_celebrate.png",
  blank: "./assets/desligando5.png",
  shutdown: "./assets/desligando5.png",
  shutdown2: "./assets/desligando2.png",
  shutdown3: "./assets/desligando3.png",
  shutdown4: "./assets/desligando4.png",
  clickSfx: "./assets/audio/click.wav",
  runSfx: "./assets/audio/run.wav",
  successSfx: "./assets/audio/success.wav",
  errorSfx: "./assets/audio/error.wav",
  shutdownSfx: "./assets/audio/shutdown.wav",
  achievementRailSfx: "./assets/audio/achievement-rail-arrive.wav?v=1",
  achievementGlassSfx: "./assets/audio/achievement-glass-descend.wav?v=1",
  achievementRevealSfx: "./assets/audio/achievement-content-reveal.wav?v=1",
  rewardCapsuleClosed: "./assets/reward-capsule/capsule-frame-01-closed.png?v=1",
  rewardCapsuleUnlocking: "./assets/reward-capsule/capsule-frame-02-unlocking.png?v=1",
  rewardCapsuleOpening: "./assets/reward-capsule/capsule-frame-03-opening.png?v=1",
  rewardCapsuleOpen: "./assets/reward-capsule/capsule-frame-04-open.png?v=1",
  rewardCapsuleMonitor: "./assets/reward-capsule/reward-monitor-frame.png?v=1",
  rewardCapsuleLegendaryStages: "./assets/reward-capsule/legendary-capsule-stages.png?v=1",
  achievementPythonConsole1: "./assets/achievements/python/achievement-python-console-frame-01.png?v=1",
  achievementPythonConsole2: "./assets/achievements/python/achievement-python-console-frame-02.png?v=1",
  achievementPythonConsole3: "./assets/achievements/python/achievement-python-console-frame-03.png?v=1",
  settingsPanel: "./assets/settings-panel/settings-panel-base.png?v=1",
  settingsGearLarge: "./assets/settings-panel/settings-gear-large.png?v=1",
  settingsGearMedium: "./assets/settings-panel/settings-gear-medium.png?v=1",
  settingsGearSmall: "./assets/settings-panel/settings-gear-small.png?v=1",
  settingsGearEngageSfx: "./assets/audio/settings-gear-engage.wav?v=1",
  settingsGearsTurnSfx: "./assets/audio/settings-gears-turn.wav?v=1",
  settingsPanelLockSfx: "./assets/audio/settings-panel-lock.wav?v=1",
  ambientLoop: "./assets/audio/mompy_crt_ambient_loop_minimal.wav",
  classroomIndustrialLoop: "./assets/audio/classroom/02_industrial_motors_ventilation_loop.mp3?v=1",
  classroomElectricalLoop: "./assets/audio/classroom/03_energy_wires_electrical_loop.mp3?v=1",
  classroomComputersLoop: "./assets/audio/classroom/04_old_computers_crt_terminal_loop-soft-v2.mp3?v=1",
  classroomRelaysLoop: "./assets/audio/classroom/05_robotics_relays_metal_details_loop.mp3?v=1",
  classroomWeldContact: "./assets/audio/classroom/welding-contact-real-v1.wav?v=2",
  classroomAuxMonitor: "./assets/classroom/classroom-aux-monitor-sheet-v2.png?v=1",
  classroomGuidoPortrait: "./assets/classroom/guido-van-rossum-crt-v2.png?v=1",
  classroomTalkClosed: "./assets/classroom/mompy-lesson-talk-closed-v1.png?v=4",
  classroomTalkOpen: "./assets/classroom/mompy-lesson-talk-open-v2.png?v=1",
  classroomTalkMask: "./assets/classroom/mompy-lesson-talk-mask-v1.png?v=1",
  classroomAutomationArm1: "./assets/classroom/automation-arm-frame-01-v1.png?v=1",
  classroomAutomationArm2: "./assets/classroom/automation-arm-frame-02-v1.png?v=1",
  classroomAutomationArm3: "./assets/classroom/automation-arm-frame-03-v1.png?v=1",
  classroomAutomationArm4: "./assets/classroom/automation-arm-frame-04-v1.png?v=1",
  classroomSitesServer: "./assets/classroom/sites-server-v2.png?v=1",
  classroomSitesDocument: "./assets/classroom/sites-document-v2.png?v=1",
  classroomSitesBrowser: "./assets/classroom/sites-browser-v2.png?v=1",
  classroomDataAiSequence: "./assets/classroom/data-ai-sequence-v1.png?v=1",
  classroomScienceEducation1: "./assets/classroom/science-education-frame-01-v1.png?v=1",
  classroomScienceEducation2: "./assets/classroom/science-education-frame-02-v1.png?v=1",
  classroomScienceEducation3: "./assets/classroom/science-education-frame-03-v1.png?v=1",
  classroomScienceEducation4: "./assets/classroom/science-education-frame-04-v1.png?v=1",
  classroomInterpreter1: "./assets/classroom/interpreter-frame-01-v1.png?v=1",
  classroomInterpreter2: "./assets/classroom/interpreter-frame-02-v1.png?v=1",
  classroomInterpreter3: "./assets/classroom/interpreter-frame-03-v1.png?v=1",
  classroomInterpreter4: "./assets/classroom/interpreter-frame-04-v1.png?v=1",
};

const MOMPY_VOICE_MANIFEST = Object.freeze({
  "en-US:briefing_001:opening:mompy": Object.freeze({
    source: "./assets/audio/mompy/en/mompy_001_en.ogg",
    durationMs: 4155,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0.24, 0.39, 0.48, 0.26, 0.23, 0.08, 0, 0.24, 0.15, 0.16, 0.18, 0.27,
      0.38, 0.19, 0.05, 0.26, 0.45, 0.43, 0.11, 0.03, 0.18, 0.28, 0.45, 0.42,
      0.29, 0.16, 0.14, 0.05, 0, 0, 0, 0.41, 0.61, 0.51, 0.14, 1, 0.97, 0.89,
      0.29, 0.1, 0.08, 0.67, 1, 0.92, 0.64, 0.22, 0.14, 0.27, 0.29, 0.27, 0.09,
      0.01, 0.23, 0.19, 0.23, 0.09, 0.35, 0.22, 0.2, 0.28, 0.38, 0.38, 0.44,
      0.27, 0, 0.01, 0, 0.49, 0.65, 0.5, 0.42, 0.29, 0.17, 0.11, 0.01, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ]),
  }),
  "en-US:briefing_001:what-is-python:mompy": Object.freeze({
    source: "./assets/audio/mompy/en/mompy_002_en.ogg",
    durationMs: 4602,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.03, 0.49, 0.22, 0.39, 0.14,
      0.13, 0.33, 0.17, 0.17, 0.28, 0.25, 0.26, 0.3, 0.35, 0.33, 0.34, 0.29,
      0.33, 0.12, 0.12, 0.01, 0, 0.03, 0.01, 0.18, 0.4, 0.42, 0.57, 0.69, 0.64,
      0.87, 0.3, 0.02, 0.46, 0.19, 0, 0, 0.29, 0.16, 0.74, 0.1, 0, 0.06, 0.47,
      0.72, 0.4, 0.34, 0.16, 0.01, 0.22, 0.35, 0.36, 0.11, 0, 0.29, 0.5, 0.48,
      0.61, 0.37, 0.02, 0.34, 0.24, 0.08, 0.7, 1, 0.72, 0.55, 0.42, 0.13, 0.03,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]),
  }),
  "en-US:briefing_001:guido:mompy": Object.freeze({
    source: "./assets/audio/mompy/en/mompy_003_en.ogg",
    durationMs: 8334,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0, 0, 0, 0.64, 0.83, 0.58, 0.16, 0.2, 0.21, 0, 0.01, 0.24, 0.13, 0.23,
      0.67, 0.75, 0.33, 0.23, 0.21, 0.15, 0.22, 0.21, 0.09, 0.15, 0.41, 0.55,
      1, 0.61, 0.51, 0.55, 0.26, 0.26, 0.07, 0.1, 0.19, 0.2, 0.36, 0.01, 0.5,
      0.49, 0.43, 0.19, 0.03, 0, 0, 0.57, 0.41, 0.35, 0.17, 0.13, 0.41, 0.47,
      0.41, 0.32, 0.18, 0.14, 0.25, 0.3, 0.28, 0.27, 0.4, 0.38, 0.43, 0.45,
      0.29, 0.32, 0.37, 0.67, 0.36, 0.32, 0.21, 0.12, 0.04, 0.03, 0.01, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0.38, 0.42, 0.74, 0.75, 0.11, 0.58, 0.24,
      0.32, 0.02, 0.18, 0.32, 0.25, 0.01, 0.03, 0.22, 0.17, 0.26, 0.5, 0.1,
      0.35, 0.08, 0.01, 0.25, 0.16, 0.13, 0.22, 0.08, 0.36, 0.25, 0.1, 0.04,
      0, 0, 0, 0, 0, 0.06, 0.38, 0.74, 0.44, 0.35, 0.09, 0.03, 0.28, 0.12,
      0.24, 0.28, 0.03, 0.02, 0.45, 0.46, 0.49, 0.51, 0.94, 0.81, 0.44, 0.46,
      0.54, 0.34, 0.15, 0.23, 0.16, 0.03, 0.01, 0.51, 0.26, 0, 0.31, 0.43,
      0.21, 0.21, 0.19, 0.14, 0.03, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]),
  }),
  "en-US:briefing_001:timeline:mompy": Object.freeze({
    enabled: false,
    source: "./assets/audio/mompy/en/mompy_004_en.ogg",
    durationMs: 6558,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0, 0, 0, 0.27, 0.92, 0.18, 1, 0.79, 0.78, 0.03, 0, 0, 0.46, 0.48,
      0.38, 0.57, 0.49, 0.06, 0.01, 0.53, 0.39, 0.44, 0.22, 0, 0.01, 0.59,
      0.63, 0.65, 0.51, 0.66, 0.28, 0, 0.16, 0.07, 0.04, 0.01, 0, 0, 0, 0.01,
      0.42, 0.54, 0.65, 0.26, 0, 0.19, 0.45, 0.32, 0.02, 0.42, 0.47, 0.43,
      0.21, 0.02, 0.45, 0.34, 0.18, 0.26, 0.1, 0.36, 0.24, 0.1, 0, 0.02,
      0.44, 0.31, 0.42, 0.41, 0.35, 0.42, 0.43, 0.57, 0.65, 0.42, 0.41, 0.33,
      0.09, 0.15, 0.47, 0.43, 0.36, 0.52, 0.48, 0.04, 0.36, 0.48, 0.4, 0.5,
      0.68, 0.25, 0.13, 0.32, 0.17, 0.29, 0.26, 0.34, 0.24, 0.25, 0.42, 0.4,
      0.33, 0.4, 0.28, 0.22, 0.36, 0.16, 0.21, 0.31, 0.1, 0.01, 0.51, 0.65,
      0.66, 0.64, 0.52, 0.51, 0.54, 0.39, 0.32, 0.15, 0.04, 0.01, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ]),
  }),
  "en-US:briefing_001:python-name-story:mompy": Object.freeze({
    enabled: false,
    source: "./assets/audio/mompy/en/mompy_005_en.ogg",
    durationMs: 9196,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0, 0, 0.01, 0.16, 0.18, 0.03, 0.01, 0.49, 1, 0.77, 0.59, 0.49, 0.62,
      0.54, 0.48, 0.02, 0, 0.54, 0.13, 0.15, 0.22, 0.24, 0.35, 0.06, 0, 0,
      0.1, 0.09, 0.1, 0.12, 0.16, 0.2, 0.08, 0.19, 0.27, 0.23, 0.23, 0.27,
      0.25, 0.23, 0.22, 0.09, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.01, 0.24,
      0.14, 0.2, 0.21, 0, 0.23, 0.12, 0.13, 0.12, 0.17, 0.17, 0.24, 0.07, 0, 0,
      0.57, 0.42, 0.36, 0.33, 0.15, 0.49, 0.29, 0.15, 0.15, 0.26, 0.3, 0.27,
      0.22, 0.18, 0.01, 0, 0.15, 0.15, 0.13, 0.07, 0.09, 0.21, 0.18, 0.18,
      0.28, 0.32, 0.22, 0.01, 0, 0.22, 0.17, 0.09, 0.01, 0, 0.19, 0.14, 0.07,
      0.05, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.18, 0.26, 0.42, 0.22,
      0.17, 0.1, 0.45, 0.48, 0.32, 0.3, 0.13, 0.01, 0.37, 0.26, 0.08, 0,
      0.26, 0.21, 0.13, 0.26, 0.2, 0.03, 0.05, 0.28, 0.24, 0.14, 0.08, 0.01,
      0, 0.18, 0.3, 0.27, 0.13, 0.18, 0.32, 0.06, 0, 0.04, 0.35, 0.17, 0.31,
      0.07, 0.01, 0, 0.18, 0.2, 0.13, 0.01, 0.22, 0.23, 0.17, 0.18, 0.19,
      0.14, 0.17, 0.09, 0.03, 0, 0, 0, 0, 0, 0, 0, 0,
    ]),
  }),
  "en-US:briefing_001:uses:mompy": Object.freeze({
    enabled: false,
    source: "./assets/audio/mompy/en/mompy_006_en.ogg",
    durationMs: 9667,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0, 0, 0, 0, 0.11, 1, 0.52, 0.26, 0.02, 0.69, 0.42, 0.23, 0.01, 0.12, 0.27, 0.23, 0.19, 0.18, 0.16, 0.21, 0.16, 0.07, 0.05, 0.03, 0.01, 0, 0, 0, 0, 0, 0, 0.01, 0.35, 0.29, 0.37, 0.33, 0.01, 0, 0.45, 0.29, 0.36, 0.62, 0.1, 0, 0.39, 0.33, 0.24, 0.55, 0.03, 0.04, 0.36, 0.2, 0.25, 0.41, 0.2, 0.16, 0.31, 0.32, 0.31, 0.37, 0.23, 0.24, 0.11, 0.02, 0.45, 0.63, 0.43, 0.05, 0, 0.09, 0.12, 0.35, 0.27, 0.18, 0.37, 0.31, 0.25, 0.18, 0.15, 0.14, 0.01, 0, 0.28, 0.06, 0, 0.88, 0.78, 0.91, 0.09, 0, 0.45, 0.26, 0.14, 0.08, 0, 0, 0, 0.01, 0.18, 0.19, 0.45, 0.65, 0.35, 0.24, 0.38, 0.33, 0.11, 0.02, 0, 0.39, 0.32, 0.2, 0.15, 0, 0.34, 0.19, 0.16, 0.01, 0.01, 0, 0.49, 0.66, 0.13, 0.98, 0.72, 0.56, 0.22, 0.04, 0, 0.01, 0, 0, 0, 0, 0, 0, 0, 0.15, 0.54, 0.88, 0.2, 0.74, 0.62, 0.78, 0.47, 0.38, 0.22, 0.02, 0.37, 0.71, 0.89, 0.83, 0.78, 0.16, 0.03, 0.65, 0.72, 0.88, 0.61, 0.49, 0.78, 0.5, 0.26, 0.14, 0.14, 0.15, 0.31, 0.07, 0, 0.23, 0.17, 0.03, 0.33, 0.29, 0.26, 0.64, 0.19, 0.08, 0.56, 0.18, 0.08, 0.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]),
  }),
  "en-US:briefing_001:instruction:mompy": Object.freeze({
    enabled: false,
    source: "./assets/audio/mompy/en/mompy_007_en.ogg",
    durationMs: 7107,
    mouthWindowMs: 50,
    mouthLevels: Object.freeze([
      0, 0, 0, 0.23, 0.87, 0.73, 0.2, 0, 0.01, 0.3, 0.45, 0.49, 0.63, 0.57, 0.18, 0.18, 0.39, 0.44, 0.39, 0.07, 0.17, 0.14, 0.26, 0.46, 0.23, 0.21, 0.18, 0.04, 0, 0, 0.59, 0.57, 0.83, 0.49, 0.46, 0.37, 0.17, 0.07, 0.06, 0.01, 0, 0, 0, 0, 0, 0, 0, 0.15, 0.15, 0.22, 0.34, 0.01, 0, 0.17, 0.2, 0.28, 0.34, 0.05, 0, 0.04, 0.37, 0.18, 0.17, 0.25, 0.42, 0.43, 0.19, 0.02, 0, 0, 0.11, 0.2, 0.21, 0.38, 0.58, 0.52, 0.26, 0.2, 0.23, 0.12, 0.21, 0.11, 0.03, 0, 0.21, 0.18, 0.01, 0.26, 0.97, 1, 0.27, 0, 0.29, 0.16, 0.09, 0.04, 0, 0, 0, 0, 0.12, 0.38, 0.65, 0.84, 0.54, 0.7, 0.21, 0.47, 0.35, 0.31, 0.21, 0.26, 0.26, 0.02, 0.36, 0.21, 0.45, 0.37, 0.2, 0.18, 0.18, 0.41, 0.3, 0.19, 0.22, 0.28, 0.23, 0.21, 0.27, 0.14, 0.09, 0.05, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]),
  }),
});

const REWARD_CAPSULE_FRAMES = Object.freeze({
  closed: ASSETS.rewardCapsuleClosed,
  unlocking: ASSETS.rewardCapsuleUnlocking,
  opening: ASSETS.rewardCapsuleOpening,
  open: ASSETS.rewardCapsuleOpen,
});
const PYTHON_CONSOLE_ACHIEVEMENT_FRAMES = Object.freeze([
  ASSETS.achievementPythonConsole1,
  ASSETS.achievementPythonConsole2,
  ASSETS.achievementPythonConsole3,
]);
const CLASSROOM_AUTOMATION_ARM_FRAMES = Object.freeze([
  ASSETS.classroomAutomationArm1,
  ASSETS.classroomAutomationArm2,
  ASSETS.classroomAutomationArm3,
  ASSETS.classroomAutomationArm4,
]);
const CLASSROOM_SCIENCE_EDUCATION_FRAMES = Object.freeze([
  ASSETS.classroomScienceEducation1,
  ASSETS.classroomScienceEducation2,
  ASSETS.classroomScienceEducation3,
  ASSETS.classroomScienceEducation4,
]);
const CLASSROOM_INTERPRETER_FRAMES = Object.freeze([
  ASSETS.classroomInterpreter1,
  ASSETS.classroomInterpreter2,
  ASSETS.classroomInterpreter3,
  ASSETS.classroomInterpreter4,
]);
// Set to false to restore the safe two-frame talk animation.
const USE_EXTENDED_TALK_FRAMES = true;
const MOMPY_TALK_ARTICULATION_FRAMES = Object.freeze([
  ASSETS.talkArticulation1,
  ASSETS.talkArticulation2,
  ASSETS.talkArticulation3,
  ASSETS.talkArticulation4,
  ASSETS.talkArticulation5,
  ASSETS.talkArticulation6,
]);
let rewardCapsulePreloadPromise = null;

function preloadRewardCapsuleFrames() {
  if (!rewardCapsulePreloadPromise) {
    const sources = [
      ...Object.values(REWARD_CAPSULE_FRAMES),
      ASSETS.rewardCapsuleMonitor,
      ASSETS.rewardCapsuleLegendaryStages,
      ...PYTHON_CONSOLE_ACHIEVEMENT_FRAMES,
    ];
    rewardCapsulePreloadPromise = Promise.all(sources.map((source) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(source);
      image.onerror = () => reject(new Error(`Could not preload reward capsule frame: ${source}`));
      image.src = source;
    })));
  }

  return rewardCapsulePreloadPromise;
}

const MOMPY_GAZE_TRANSITION_MS = 165;
const MOMPY_FRONT_BLINK_MS = 135;
const MOMPY_FRONT_BLINK_MIN_MS = 4200;
const MOMPY_FRONT_BLINK_MAX_MS = 8200;
const MOMPY_FIRST_FORWARD_MIN_MS = 1800;
const MOMPY_FIRST_FORWARD_MAX_MS = 3000;
const MOMPY_SIDE_GAZE_MIN_MS = 9000;
const MOMPY_SIDE_GAZE_MAX_MS = 16000;
const MOMPY_FORWARD_GAZE_MIN_MS = 30000;
const MOMPY_FORWARD_GAZE_MAX_MS = 60000;
const MOMPY_TYPING_PAUSE_MS = 2600;
const mompyAmbientPreloads = [ASSETS.side, ASSETS.front, ASSETS.gazeTransition, ASSETS.frontBlink].map((source) => {
  const image = new Image();
  image.src = source;
  return image;
});
const classroomVisualPreloads = [
  ASSETS.classroomAuxMonitor,
  ASSETS.classroomGuidoPortrait,
  ASSETS.classroomTalkClosed,
  ASSETS.classroomTalkOpen,
  ASSETS.classroomTalkMask,
  ...MOMPY_TALK_ARTICULATION_FRAMES,
].map((source) => {
  const image = new Image();
  image.src = source;
  return image;
});

const USER_PROFILE_KEY = "mompy_user_profile_v1";
const PROGRESS_KEY = "mompy_progress_v1";
const BRIEFING_PROGRESS_KEY = "mompy_briefing_progress_v1";
const LANGUAGE_KEY = "mompy_language_v1";
const CRT_BRIGHTNESS_KEY = "mompy_crt_brightness_v1";
const MOMPY_ANIMATIONS_KEY = "mompy_animations_v1";
const DEFAULT_USER_NAME = "Guest";
const PLANNED_TOTAL_MISSIONS = 40;
const FALLBACK_APP_VERSION = "0.1.6";
const SUPPORTED_LANGUAGES = ["en-US", "pt-BR"];

const UI_TEXT = {
  "en-US": {
    loadingMompy: "Loading Mompy",
    loading: "Loading...",
    currentLevel: "Current level",
    level: "Level",
    settings: "Settings",
    gameComingSoon: "Mompy game — coming soon",
    settingsControlPanel: "Mompy control panel",
    systemOnline: "System online",
    expandWindow: "Expand window",
    restoreWindow: "Restore window",
    trainingConsole: "Python Training Console",
    start: "Start",
    continue: "Continue",
    userInformation: "User information",
    user: "User",
    beginner: "Beginner",
    missionsCompleted: "Missions completed",
    firstVisit: "First visit",
    firstNameQuestion: "What's your first name?",
    firstNamePlaceholder: "Type your first name here",
    missionComplete: "Mission complete.",
    continueQuestion: "Continue?",
    retry: "Retry",
    nextMission: "Next mission",
    currentMission: "Current mission",
    mission: "Mission",
    codeEditor: "Code editor",
    editorActions: "Editor actions",
    back: "Back",
    help: "Help",
    run: "Run",
    output: "Output",
    readyOutput: "Mompy ready. Write the code and click Run.",
    close: "Close",
    gotIt: "Got it",
    dontUnderstand: "I don't understand",
    chooseCorrect: "Choose the correct answer.",
    correctAnswer: "Correct answer",
    missionHelp: "Mission help",
    goal: "Goal",
    scrollOrDragForMore: "Scroll or drag for more ↓",
    decrease: "Decrease",
    increase: "Increase",
    on: "ON",
    off: "OFF",
    shortcuts: "Shortcuts",
    audio: "Audio",
    ambientMusic: "Ambient music",
    musicVolume: "Music volume",
    soundEffects: "Sound effects",
    effectsVolume: "Effects volume",
    interface: "Interface",
    language: "Language",
    crtBrightness: "CRT brightness",
    mompyAnimations: "Mompy animations",
    progress: "Progress",
    currentMissionSetting: "Current mission",
    localProgress: "Local progress",
    resetProgress: "Reset progress",
    account: "Account",
    currentUser: "Current user",
    session: "Session",
    logOut: "Log out",
    updates: "Updates",
    installedVersion: "Installed version",
    updateStatus: "Update status",
    checkUpdates: "Check for updates",
    checking: "Checking",
    openRelease: "Open release",
    queryingReleases: "Querying GitHub Releases",
    notChecked: "Not checked",
    checkUnavailable: "Check unavailable",
    newVersion: "New version {version}",
    upToDate: "Up to date",
    exit: "Exit",
    runShortcut: "Run",
    indentShortcut: "Indent code",
    newLineShortcut: "New line",
    viewMoreShortcut: "View more content",
    closeShortcut: "Close",
    lessonReady: "Lesson ready.",
    learn: "Learn",
    skip: "Skip",
    briefingComplete: "Briefing complete",
    conceptsLoaded: "Concepts loaded.",
    goodLuck: "Good luck, trainee.",
    shortcutAlsoRuns: "Shortcut: Ctrl+Enter also runs.",
    stars: "Stars",
    streak: "Streak",
    bestStreak: "Best streak",
    xpEarned: "+{xp} XP",
    blockComplete: "Block {block} complete · {stars}/{max} stars",
    blockUnlocked: "Block {block} unlocked",
    achievementUnlocked: "Achievement: {name}",
    newReward: "New reward",
    openRewardCapsule: "Open reward capsule",
    openRewardCapsuleHint: "Click or press Enter to open",
    rewardCapsuleOpening: "Opening reward capsule",
    rewardRevealed: "Reward revealed",
    achievementFirstMission: "First Transmission",
    achievementMissionFive: "Console warm-up",
    achievementMissionTen: "Double digits",
    achievementMissionThirty: "Deep circuit",
    achievementPerfectMission: "Perfect start",
    achievementStarCollector25: "Code Constellation",
    achievementStarCollector60: "Bright archive",
    achievementStarMaster100: "Centurion signal",
    achievementFirstBlock: "First block",
    achievementThreeBlocks: "Three blocks strong",
    achievementSixBlocks: "Core curriculum",
    achievementPerfectBlock: "Perfect Block",
    achievementCleanStreak3: "Three-mission streak",
    achievementCleanStreak5: "Focused run",
    achievementCleanStreak10: "Unbroken circuit",
    achievementHalfwayHero: "Halfway hero",
    achievementPathComplete: "Python path complete",
    achievementSteadyStart: "Return signal",
    achievementThreeDaysOnline: "Three days online",
    achievementInitialSequence: "Initial sequence",
    achievementCodeWeek: "Code week",
    achievementAlwaysOnWeek: "Always-on week",
    achievementFrequentOperator: "Frequent operator",
    achievementMonthOnConsole: "Month on the console",
    achievementQuarterlySignal: "Quarterly signal",
    achievementProgrammingSemester: "Programming semester",
    achievementMompyCompanion: "Mompy's companion",
    achievementReturningLearner: "Returning learner",
    achievementDedicatedLearner: "Dedicated operator",
    achievementVeteranLearner: "Mompy veteran",
    achievementPythonConsole: "Voice in the Console",
    achievementPythonVariables: "Variable Memory",
    achievementPythonBranches: "Path of Decisions",
    achievementPythonLoops: "Loop Tamer",
    achievementPythonLists: "List Collector",
    achievementPythonFunctions: "Function Architect",
    achievementPythonDictionaries: "Dictionary Guardian",
    achievementPythonWhile: "While Master",
    achievementPythonDebug: "Bug Hunter",
    achievementPythonPrecision: "Machine Precision",
    achievementPythonConsoleDescription: "Complete missions 01–05 about print and text.",
    achievementPythonVariablesDescription: "Complete missions 06–10 about variables and values.",
    achievementPythonBranchesDescription: "Complete missions 11–15 about if, comparisons, and else.",
    achievementPythonLoopsDescription: "Complete missions 16–20 about repetition with for.",
    achievementPythonListsDescription: "Complete missions 21–25 about lists.",
    achievementPythonFunctionsDescription: "Complete missions 26–30 about functions, parameters, and return values.",
    achievementPythonDictionariesDescription: "Complete missions 31–35 about keys and values.",
    achievementPythonWhileDescription: "Complete missions 36–40 about repetition with while.",
    achievementPythonDebugDescription: "Correct and complete five missions after at least one incorrect attempt.",
    achievementPythonPrecisionDescription: "Earn three stars in ten missions on the first attempt and without using a hint.",
    achievementFirstMissionDescription: "Complete your first mission and send Mompy's first successful transmission.",
    achievementMissionFiveDescription: "Complete five missions.",
    achievementMissionTenDescription: "Complete ten missions.",
    achievementMissionThirtyDescription: "Complete thirty missions.",
    achievementPerfectMissionDescription: "Earn three stars on a mission.",
    achievementStarCollector25Description: "Collect twenty-five stars.",
    achievementStarCollector60Description: "Collect sixty stars.",
    achievementStarMaster100Description: "Collect one hundred stars.",
    achievementFirstBlockDescription: "Complete every mission in the first block.",
    achievementThreeBlocksDescription: "Complete blocks one through three.",
    achievementSixBlocksDescription: "Complete blocks one through six.",
    achievementPerfectBlockDescription: "Complete all five missions in any block with three stars in each one.",
    achievementCleanStreak3Description: "Complete three missions without a wrong attempt.",
    achievementCleanStreak5Description: "Reach a clean streak of five missions.",
    achievementCleanStreak10Description: "Reach a clean streak of ten missions.",
    achievementHalfwayHeroDescription: "Complete half of the planned learning path.",
    achievementPathCompleteDescription: "Complete the full Python mission path.",
    achievementSteadyStartDescription: "Open Mompy on two different days.",
    achievementThreeDaysOnlineDescription: "Open Mompy on three different days.",
    achievementInitialSequenceDescription: "Open Mompy for three consecutive days.",
    achievementCodeWeekDescription: "Open Mompy on seven different days.",
    achievementAlwaysOnWeekDescription: "Open Mompy for seven consecutive days.",
    achievementFrequentOperatorDescription: "Open Mompy on fourteen different days.",
    achievementMonthOnConsoleDescription: "Open Mompy on thirty different days.",
    achievementQuarterlySignalDescription: "Use Mompy in three different months.",
    achievementProgrammingSemesterDescription: "Use Mompy in six different months.",
    achievementMompyCompanionDescription: "Use Mompy in twelve different months.",
    achievementReturningLearnerDescription: "Practice with Mompy on seven different days.",
    achievementDedicatedLearnerDescription: "Practice with Mompy on fourteen different days.",
    achievementVeteranLearnerDescription: "Practice with Mompy on thirty different days.",
    achievements: "Achievements",
    achievementsSummary: "{earned} of {total} unlocked",
    achievementUnlockedStatus: "Unlocked",
    achievementLockedStatus: "Locked",
    achievementFilterAll: "All",
    achievementFilterUnlocked: "Unlocked",
    achievementFilterLocked: "Locked",
    achievementVisibleSummary: "Showing {visible} of {total}",
    viewAchievements: "View collection",
    achievementCategoryConsistency: "Consistency",
    achievementCategoryPython: "Python",
    achievementCategoryMissions: "Missions",
    achievementCategorySecrets: "Secrets",
    achievementTotalScore: "TOTAL SCORE: {score}",
    achievementDetailsTitle: "ACHIEVEMENT DETAILS",
    achievementRequirement: "REQUIREMENT",
    achievementProgressLabel: "PROGRESS",
    achievementDescriptionLabel: "DESCRIPTION",
    achievementTrack: "Track",
    achievementTracking: "Tracking",
    achievementPlannedCategory: "The next achievements for this category are being planned.",
    achievementProgressDays: "{current} / {target} days",
    achievementProgressStreak: "{current} / {target} consecutive days",
    achievementProgressMonths: "{current} / {target} months",
    achievementProgressMissions: "{current} / {target} missions",
    achievementProgressRecoveries: "{current} / {target} corrected missions",
    achievementProgressPerfectMissions: "{current} / {target} perfect missions",
    achievementProgressStars: "{current} / {target} stars",
    achievementProgressPerfectBlocks: "{current} / {target} perfect block",
    achievementEncouragement: "Keep Mompy in your routine and keep the code flowing. Mompy is proud of your progress!",
    achievementPythonEncouragement: "Keep exploring Python concepts. Every completed challenge makes your code stronger!",
    achievementMissionEncouragement: "Keep advancing through the journey, collecting stars, and completing every mission!",
    rarityCommon: "Common",
    rarityUncommon: "Uncommon",
    rarityRare: "Rare",
    rarityEpic: "Epic",
    rarityLegendary: "Legendary",
    correctOutput: "Correct output:",
    missionCompletedOutput: "Mission completed.",
    missionNotComplete: "The mission is not complete yet",
    checkMissionGoal: "Check the mission goal and try again.",
    checkAttempt: "Check this attempt",
    lineLocation: "Line {line}",
    lineColumnLocation: "Line {line}, column {column}",
    diagnosticCause: "Cause:",
    diagnosticExplanation: "Why this happened:",
    diagnosticSourceLine: "Code on this line:",
    diagnosticSuggestion: "How to fix:",
    tryThis: "Try this:",
    expected: "Expected:",
    received: "Received:",
    noOutput: "(no output)",
    missionRestarted: "Mission restarted. Try again.",
    allMissionsComplete: "All available missions are complete.",
    newMissionsSoon: "New missions will be added soon.",
    noCodeToRun: "No code to run.",
    writeMissionCodeFirst: "Write the mission code first",
    editorEmpty: "The editor does not contain any Python code yet.",
    writeRequestedCode: "Write the requested code in the editor.",
    notQuiteThisTime: "Not quite this time.",
    backendValidationRequired: "Open Mompy through Python to use real mission validation.",
    runningValidation: "Running validation...",
    unexpectedValidationError: "Unexpected validation error:",
    progressReset: "Progress reset.",
    progressResetMissionLoaded: "Progress reset. Mission 01 loaded.",
    firstMissionAlready: "Mompy: You're already on the first mission.",
    exitingApp: "Mompy: Exiting app.",
    fullscreenChangeError: "Mompy: Couldn't change fullscreen mode.",
    diagnosticMissionRequirementTitle: "Check the mission requirement",
    diagnosticMissionRequirementSummary: "One mission requirement is still missing.",
    diagnosticOutputTitle: "The output does not match yet",
    diagnosticOutputSummary: "Python ran the code successfully, but printed a different result.",
    diagnosticOutputSuggestion: "Check the values and text passed to print().",
    diagnosticSyntaxTitle: "Python could not read this line",
    diagnosticSyntaxSummary: "Python found a syntax error on this line.",
    diagnosticSyntaxSuggestion: "Check parentheses, quotes, colons, and indentation.",
    diagnosticSafetyTitle: "This feature is not available in missions",
    diagnosticSafetySummary: "This code uses a feature that is not available in this mission.",
    diagnosticSafetySuggestion: "Use only the Python concepts introduced by the current learning block.",
    diagnosticTimeoutTitle: "The program took too long",
    diagnosticTimeoutSummary: "Mompy stopped the code so the application would remain responsive.",
    diagnosticTimeoutSuggestion: "Check for a loop that never ends or reduce the repeated work.",
    diagnosticRuntimeTitle: "Python stopped while running the code",
    diagnosticRuntimeSummary: "Python found a problem while executing this line.",
    diagnosticRuntimeSuggestion: "Check the highlighted line and the values used there.",
    diagnosticNameErrorTitle: "Name not defined",
    diagnosticNameErrorSummary: "Python could not find one of the names used on this line.",
    diagnosticNameErrorSuggestion: "Check whether the variable was created and whether its name is spelled correctly.",
    diagnosticTypeErrorTitle: "Incompatible value types",
    diagnosticTypeErrorSummary: "Python could not use these values together in this operation.",
    diagnosticTypeErrorSuggestion: "Check whether each value is text, a number, a list, or another expected type.",
    diagnosticZeroDivisionTitle: "Division by zero",
    diagnosticZeroDivisionSummary: "Python cannot divide a value by zero.",
    diagnosticZeroDivisionSuggestion: "Make sure the divisor is different from zero before dividing.",
    diagnosticIndexErrorTitle: "List position not found",
    diagnosticIndexErrorSummary: "The requested position is outside the list.",
    diagnosticIndexErrorSuggestion: "Check the list length and remember that indexes start at zero.",
    advancedSolutionPraise: "Mompy loved this advanced solution!",
  },
  "pt-BR": {
    loadingMompy: "Carregando o Mompy",
    loading: "Carregando...",
    currentLevel: "Nível atual",
    level: "Nível",
    settings: "Configurações",
    gameComingSoon: "Jogo do Mompy — em breve",
    settingsControlPanel: "Painel de controle do Mompy",
    systemOnline: "Sistema online",
    expandWindow: "Expandir janela",
    restoreWindow: "Restaurar janela",
    trainingConsole: "Console de Treinamento Python",
    start: "Começar",
    continue: "Continuar",
    userInformation: "Informações do usuário",
    user: "Usuário",
    beginner: "Iniciante",
    missionsCompleted: "Missões concluídas",
    firstVisit: "Primeira visita",
    firstNameQuestion: "Qual é o seu primeiro nome?",
    firstNamePlaceholder: "Digite seu primeiro nome aqui",
    missionComplete: "Missão concluída.",
    continueQuestion: "Continuar?",
    retry: "Tentar novamente",
    nextMission: "Próxima missão",
    currentMission: "Missão atual",
    mission: "Missão",
    codeEditor: "Editor de código",
    editorActions: "Ações do editor",
    back: "Voltar",
    help: "Ajuda",
    run: "Executar",
    output: "Saída",
    readyOutput: "Mompy pronto. Escreva o código e clique em Executar.",
    close: "Fechar",
    gotIt: "Entendi",
    dontUnderstand: "Não entendi",
    chooseCorrect: "Escolha a resposta correta.",
    correctAnswer: "Resposta correta",
    missionHelp: "Ajuda da missão",
    goal: "Objetivo",
    scrollOrDragForMore: "Role ou arraste para ver mais ↓",
    decrease: "Diminuir",
    increase: "Aumentar",
    on: "LIGADO",
    off: "DESLIGADO",
    shortcuts: "Atalhos",
    audio: "Áudio",
    ambientMusic: "Música ambiente",
    musicVolume: "Volume da música",
    soundEffects: "Efeitos sonoros",
    effectsVolume: "Volume dos efeitos",
    interface: "Interface",
    language: "Idioma",
    crtBrightness: "Brilho do CRT",
    mompyAnimations: "Animações do Mompy",
    progress: "Progresso",
    currentMissionSetting: "Missão atual",
    localProgress: "Progresso local",
    resetProgress: "Redefinir progresso",
    account: "Conta",
    currentUser: "Usuário atual",
    session: "Sessão",
    logOut: "Sair da conta",
    updates: "Atualizações",
    installedVersion: "Versão instalada",
    updateStatus: "Status da atualização",
    checkUpdates: "Verificar atualizações",
    checking: "Verificando",
    openRelease: "Abrir versão",
    queryingReleases: "Consultando versões no GitHub",
    notChecked: "Não verificado",
    checkUnavailable: "Verificação indisponível",
    newVersion: "Nova versão {version}",
    upToDate: "Atualizado",
    exit: "Exit",
    runShortcut: "Executar",
    indentShortcut: "Indentar código",
    newLineShortcut: "Nova linha",
    viewMoreShortcut: "Ver mais conteúdo",
    closeShortcut: "Fechar",
    lessonReady: "Aula pronta.",
    learn: "Aprender",
    skip: "Pular",
    briefingComplete: "Apresentação concluída",
    conceptsLoaded: "Conceitos carregados.",
    goodLuck: "Boa sorte, aprendiz.",
    shortcutAlsoRuns: "Atalho: Ctrl+Enter também executa.",
    stars: "Estrelas",
    streak: "Sequência",
    bestStreak: "Melhor sequência",
    xpEarned: "+{xp} XP",
    blockComplete: "Bloco {block} concluído · {stars}/{max} estrelas",
    blockUnlocked: "Bloco {block} desbloqueado",
    achievementUnlocked: "Conquista: {name}",
    newReward: "Nova recompensa",
    openRewardCapsule: "Abrir cápsula de recompensa",
    openRewardCapsuleHint: "Clique ou pressione Enter para abrir",
    rewardCapsuleOpening: "Abrindo cápsula de recompensa",
    rewardRevealed: "Recompensa revelada",
    achievementFirstMission: "Primeira Transmissão",
    achievementMissionFive: "Aquecimento do console",
    achievementMissionTen: "Dois dígitos",
    achievementMissionThirty: "Circuito profundo",
    achievementPerfectMission: "Início perfeito",
    achievementStarCollector25: "Constelação de Código",
    achievementStarCollector60: "Arquivo brilhante",
    achievementStarMaster100: "Sinal centenário",
    achievementFirstBlock: "Primeiro bloco",
    achievementThreeBlocks: "Três blocos firmes",
    achievementSixBlocks: "Currículo essencial",
    achievementPerfectBlock: "Bloco Perfeito",
    achievementCleanStreak3: "Sequência de três missões",
    achievementCleanStreak5: "Ritmo focado",
    achievementCleanStreak10: "Circuito ininterrupto",
    achievementHalfwayHero: "Metade do caminho",
    achievementPathComplete: "Jornada Python concluída",
    achievementSteadyStart: "Sinal de Retorno",
    achievementThreeDaysOnline: "Três Dias Online",
    achievementInitialSequence: "Sequência Inicial",
    achievementCodeWeek: "Semana de Código",
    achievementAlwaysOnWeek: "Semana Sem Desligar",
    achievementFrequentOperator: "Operador Frequente",
    achievementMonthOnConsole: "Mês no Console",
    achievementQuarterlySignal: "Sinal Trimestral",
    achievementProgrammingSemester: "Semestre de Programação",
    achievementMompyCompanion: "Companheiro do Mompy",
    achievementReturningLearner: "Aprendiz constante",
    achievementDedicatedLearner: "Operador dedicado",
    achievementVeteranLearner: "Veterano do Mompy",
    achievementPythonConsole: "Voz no Console",
    achievementPythonVariables: "Memória de Variáveis",
    achievementPythonBranches: "Caminho das Decisões",
    achievementPythonLoops: "Domador de Laços",
    achievementPythonLists: "Colecionador de Listas",
    achievementPythonFunctions: "Arquiteto de Funções",
    achievementPythonDictionaries: "Guardião dos Dicionários",
    achievementPythonWhile: "Mestre do While",
    achievementPythonDebug: "Caçador de Bugs",
    achievementPythonPrecision: "Precisão de Máquina",
    achievementPythonConsoleDescription: "Conclua as missões 01–05, sobre print e textos.",
    achievementPythonVariablesDescription: "Conclua as missões 06–10, sobre variáveis e valores.",
    achievementPythonBranchesDescription: "Conclua as missões 11–15, sobre if, comparações e else.",
    achievementPythonLoopsDescription: "Conclua as missões 16–20, sobre repetição com for.",
    achievementPythonListsDescription: "Conclua as missões 21–25, sobre listas.",
    achievementPythonFunctionsDescription: "Conclua as missões 26–30, sobre funções, parâmetros e retorno.",
    achievementPythonDictionariesDescription: "Conclua as missões 31–35, sobre chaves e valores.",
    achievementPythonWhileDescription: "Conclua as missões 36–40, sobre repetição com while.",
    achievementPythonDebugDescription: "Corrija e conclua cinco missões depois de pelo menos uma tentativa incorreta.",
    achievementPythonPrecisionDescription: "Obtenha três estrelas em dez missões, sempre na primeira tentativa e sem usar dica.",
    achievementFirstMissionDescription: "Conclua sua primeira missão e envie a primeira transmissão do Mompy.",
    achievementMissionFiveDescription: "Conclua cinco missões.",
    achievementMissionTenDescription: "Conclua dez missões.",
    achievementMissionThirtyDescription: "Conclua trinta missões.",
    achievementPerfectMissionDescription: "Ganhe três estrelas em uma missão.",
    achievementStarCollector25Description: "Colete vinte e cinco estrelas.",
    achievementStarCollector60Description: "Colete sessenta estrelas.",
    achievementStarMaster100Description: "Colete cem estrelas.",
    achievementFirstBlockDescription: "Conclua todas as missões do primeiro bloco.",
    achievementThreeBlocksDescription: "Conclua os blocos um a três.",
    achievementSixBlocksDescription: "Conclua os blocos um a seis.",
    achievementPerfectBlockDescription: "Conclua as cinco missões de qualquer bloco com três estrelas em todas.",
    achievementCleanStreak3Description: "Conclua três missões sem uma tentativa incorreta.",
    achievementCleanStreak5Description: "Alcance uma sequência limpa de cinco missões.",
    achievementCleanStreak10Description: "Alcance uma sequência limpa de dez missões.",
    achievementHalfwayHeroDescription: "Conclua metade da jornada de aprendizado planejada.",
    achievementPathCompleteDescription: "Conclua toda a jornada de missões de Python.",
    achievementSteadyStartDescription: "Entre no Mompy em dois dias diferentes.",
    achievementThreeDaysOnlineDescription: "Entre no Mompy em três dias diferentes.",
    achievementInitialSequenceDescription: "Entre no Mompy durante três dias consecutivos.",
    achievementCodeWeekDescription: "Entre no Mompy em sete dias diferentes.",
    achievementAlwaysOnWeekDescription: "Entre no Mompy durante sete dias consecutivos.",
    achievementFrequentOperatorDescription: "Entre no Mompy em quatorze dias diferentes.",
    achievementMonthOnConsoleDescription: "Entre no Mompy em trinta dias diferentes.",
    achievementQuarterlySignalDescription: "Use o Mompy em três meses diferentes.",
    achievementProgrammingSemesterDescription: "Use o Mompy em seis meses diferentes.",
    achievementMompyCompanionDescription: "Use o Mompy em doze meses diferentes.",
    achievementReturningLearnerDescription: "Pratique com o Mompy em sete dias diferentes.",
    achievementDedicatedLearnerDescription: "Pratique com o Mompy em quatorze dias diferentes.",
    achievementVeteranLearnerDescription: "Pratique com o Mompy em trinta dias diferentes.",
    achievements: "Conquistas",
    achievementsSummary: "{earned} de {total} desbloqueadas",
    achievementUnlockedStatus: "Desbloqueada",
    achievementLockedStatus: "Bloqueada",
    achievementFilterAll: "Todas",
    achievementFilterUnlocked: "Desbloqueadas",
    achievementFilterLocked: "Bloqueadas",
    achievementVisibleSummary: "Mostrando {visible} de {total}",
    viewAchievements: "Ver coleção",
    achievementCategoryConsistency: "Constância",
    achievementCategoryPython: "Python",
    achievementCategoryMissions: "Missões",
    achievementCategorySecrets: "Segredos",
    achievementTotalScore: "TOTAL SCORE: {score}",
    achievementDetailsTitle: "DETALHES DA CONQUISTA",
    achievementRequirement: "REQUISITO",
    achievementProgressLabel: "PROGRESSO",
    achievementDescriptionLabel: "DESCRIÇÃO",
    achievementTrack: "Acompanhar",
    achievementTracking: "Acompanhando",
    achievementPlannedCategory: "As próximas conquistas desta categoria estão sendo planejadas.",
    achievementProgressDays: "{current} / {target} dias",
    achievementProgressStreak: "{current} / {target} dias seguidos",
    achievementProgressMonths: "{current} / {target} meses",
    achievementProgressMissions: "{current} / {target} missões",
    achievementProgressRecoveries: "{current} / {target} missões corrigidas",
    achievementProgressPerfectMissions: "{current} / {target} missões perfeitas",
    achievementProgressStars: "{current} / {target} estrelas",
    achievementProgressPerfectBlocks: "{current} / {target} bloco perfeito",
    achievementEncouragement: "Mantenha a constância e o código fluindo. Continue assim, o Mompy está orgulhoso do seu progresso!",
    achievementPythonEncouragement: "Continue explorando os conceitos de Python. Cada desafio concluído deixa seu código mais forte!",
    achievementMissionEncouragement: "Continue avançando pela jornada, reunindo estrelas e concluindo cada missão!",
    rarityCommon: "Comum",
    rarityUncommon: "Incomum",
    rarityRare: "Rara",
    rarityEpic: "Épica",
    rarityLegendary: "Lendária",
    correctOutput: "Saída correta:",
    missionCompletedOutput: "Missão concluída.",
    missionNotComplete: "A missão ainda não foi concluída",
    checkMissionGoal: "Confira o objetivo da missão e tente novamente.",
    checkAttempt: "Confira esta tentativa",
    lineLocation: "Linha {line}",
    lineColumnLocation: "Linha {line}, coluna {column}",
    diagnosticCause: "Causa:",
    diagnosticExplanation: "Por que isso aconteceu:",
    diagnosticSourceLine: "Código nesta linha:",
    diagnosticSuggestion: "Como corrigir:",
    tryThis: "Tente isto:",
    expected: "Esperado:",
    received: "Recebido:",
    noOutput: "(sem saída)",
    missionRestarted: "Missão reiniciada. Tente novamente.",
    allMissionsComplete: "Todas as missões disponíveis foram concluídas.",
    newMissionsSoon: "Novas missões serão adicionadas em breve.",
    noCodeToRun: "Não há código para executar.",
    writeMissionCodeFirst: "Escreva primeiro o código da missão",
    editorEmpty: "O editor ainda não contém código Python.",
    writeRequestedCode: "Escreva no editor o código solicitado.",
    notQuiteThisTime: "Ainda não foi dessa vez.",
    backendValidationRequired: "Abra o Mompy pelo Python para usar a validação real das missões.",
    runningValidation: "Validando...",
    unexpectedValidationError: "Erro inesperado na validação:",
    progressReset: "Progresso redefinido.",
    progressResetMissionLoaded: "Progresso redefinido. Missão 01 carregada.",
    firstMissionAlready: "Mompy: Você já está na primeira missão.",
    exitingApp: "Mompy: Encerrando o aplicativo.",
    fullscreenChangeError: "Mompy: Não foi possível alterar o modo de tela cheia.",
    diagnosticMissionRequirementTitle: "Confira o requisito da missão",
    diagnosticMissionRequirementSummary: "Ainda falta cumprir um requisito da missão.",
    diagnosticOutputTitle: "A saída ainda não corresponde",
    diagnosticOutputSummary: "O código foi executado, mas imprimiu um resultado diferente.",
    diagnosticOutputSuggestion: "Confira os valores e o texto enviados para print().",
    diagnosticSyntaxTitle: "O Python não conseguiu ler esta linha",
    diagnosticSyntaxSummary: "O Python encontrou um erro de sintaxe nesta linha.",
    diagnosticSyntaxSuggestion: "Confira parênteses, aspas, dois-pontos e indentação.",
    diagnosticSafetyTitle: "Este recurso não está disponível nas missões",
    diagnosticSafetySummary: "Este código usa um recurso que não está disponível nesta missão.",
    diagnosticSafetySuggestion: "Use apenas os conceitos de Python apresentados no bloco atual.",
    diagnosticTimeoutTitle: "O programa demorou demais",
    diagnosticTimeoutSummary: "O Mompy interrompeu o código para manter o aplicativo funcionando.",
    diagnosticTimeoutSuggestion: "Procure um laço que nunca termina ou reduza o trabalho repetido.",
    diagnosticRuntimeTitle: "O Python parou durante a execução",
    diagnosticRuntimeSummary: "O Python encontrou um problema ao executar esta linha.",
    diagnosticRuntimeSuggestion: "Confira a linha destacada e os valores usados nela.",
    diagnosticNameErrorTitle: "Nome não definido",
    diagnosticNameErrorSummary: "O Python não encontrou um dos nomes usados nesta linha.",
    diagnosticNameErrorSuggestion: "Confira se a variável foi criada e se o nome está escrito corretamente.",
    diagnosticTypeErrorTitle: "Tipos de valores incompatíveis",
    diagnosticTypeErrorSummary: "O Python não conseguiu usar esses valores juntos nesta operação.",
    diagnosticTypeErrorSuggestion: "Confira se cada valor é texto, número, lista ou outro tipo esperado.",
    diagnosticZeroDivisionTitle: "Divisão por zero",
    diagnosticZeroDivisionSummary: "O Python não pode dividir um valor por zero.",
    diagnosticZeroDivisionSuggestion: "Garanta que o divisor seja diferente de zero antes de dividir.",
    diagnosticIndexErrorTitle: "Posição da lista não encontrada",
    diagnosticIndexErrorSummary: "A posição solicitada está fora da lista.",
    diagnosticIndexErrorSuggestion: "Confira o tamanho da lista e lembre que os índices começam em zero.",
    advancedSolutionPraise: "O Mompy se apaixonou por esta solução avançada!",
  },
};

const ACHIEVEMENT_DEFINITIONS = Object.freeze([
  { id: "steady_start", category: "consistency", metric: "active_days", target: 2, family: "dedication", titleKey: "achievementSteadyStart", descriptionKey: "achievementSteadyStartDescription", rarityKey: "rarityCommon", rarity: "common", mark: "2D", glyph: "◴", image: "./assets/achievements/achievement-sinal-de-retorno.png?v=1" },
  { id: "three_days_online", category: "consistency", metric: "active_days", target: 3, family: "dedication", titleKey: "achievementThreeDaysOnline", descriptionKey: "achievementThreeDaysOnlineDescription", rarityKey: "rarityCommon", rarity: "common", mark: "3D", glyph: "3", image: "./assets/achievements/achievement-tres-dias-online.png?v=1" },
  { id: "initial_sequence", category: "consistency", metric: "activity_streak", target: 3, family: "dedication", titleKey: "achievementInitialSequence", descriptionKey: "achievementInitialSequenceDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "x3", glyph: "3", image: "./assets/achievements/achievement-sequencia-inicial-turquoise.png?v=1" },
  { id: "code_week", category: "consistency", metric: "active_days", target: 7, family: "dedication", titleKey: "achievementCodeWeek", descriptionKey: "achievementCodeWeekDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "7D", glyph: "7", image: "./assets/achievements/achievement-semana-de-codigo-turquoise.png?v=1" },
  { id: "always_on_week", category: "consistency", metric: "activity_streak", target: 7, family: "dedication", titleKey: "achievementAlwaysOnWeek", descriptionKey: "achievementAlwaysOnWeekDescription", rarityKey: "rarityRare", rarity: "rare", mark: "7x", glyph: "∞", image: "./assets/achievements/achievement-semana-sem-desligar-blue.png?v=1" },
  { id: "frequent_operator", category: "consistency", metric: "active_days", target: 14, family: "dedication", titleKey: "achievementFrequentOperator", descriptionKey: "achievementFrequentOperatorDescription", rarityKey: "rarityRare", rarity: "rare", mark: "14D", glyph: "14", image: "./assets/achievements/achievement-operador-frequente-blue.png?v=1" },
  { id: "month_on_console", category: "consistency", metric: "active_days", target: 30, family: "dedication", titleKey: "achievementMonthOnConsole", descriptionKey: "achievementMonthOnConsoleDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "30D", glyph: "30", image: "./assets/achievements/achievement-mes-no-console-purple.png?v=1" },
  { id: "quarterly_signal", category: "consistency", metric: "active_months", target: 3, family: "dedication", titleKey: "achievementQuarterlySignal", descriptionKey: "achievementQuarterlySignalDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "3M", glyph: "Ⅲ", image: "./assets/achievements/achievement-sinal-trimestral-purple.png?v=1" },
  { id: "programming_semester", category: "consistency", metric: "active_months", target: 6, family: "dedication", titleKey: "achievementProgrammingSemester", descriptionKey: "achievementProgrammingSemesterDescription", rarityKey: "rarityLegendary", rarity: "legendary", mark: "6M", glyph: "Ⅵ", image: "./assets/achievements/achievement-semestre-programacao-gold.png?v=1" },
  { id: "mompy_companion", category: "consistency", metric: "active_months", target: 12, family: "dedication", titleKey: "achievementMompyCompanion", descriptionKey: "achievementMompyCompanionDescription", rarityKey: "rarityLegendary", rarity: "legendary", mark: "12M", glyph: "★", image: "./assets/achievements/achievement-companheiro-do-mompy-gold.png?v=1" },
  { id: "python_console", category: "python", metric: "mission_range", missionStart: 1, missionEnd: 5, target: 5, family: "progress", titleKey: "achievementPythonConsole", descriptionKey: "achievementPythonConsoleDescription", rarityKey: "rarityCommon", rarity: "common", mark: "01–05", glyph: ">_", frames: PYTHON_CONSOLE_ACHIEVEMENT_FRAMES },
  { id: "python_variables", category: "python", metric: "mission_range", missionStart: 6, missionEnd: 10, target: 5, family: "progress", titleKey: "achievementPythonVariables", descriptionKey: "achievementPythonVariablesDescription", rarityKey: "rarityCommon", rarity: "common", mark: "06–10", glyph: "x", image: "./assets/achievements/python/achievement-python-variables.png?v=1" },
  { id: "python_branches", category: "python", metric: "mission_range", missionStart: 11, missionEnd: 15, target: 5, family: "progress", titleKey: "achievementPythonBranches", descriptionKey: "achievementPythonBranchesDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "11–15", glyph: "?", image: "./assets/achievements/python/achievement-python-branches.png?v=1" },
  { id: "python_loops", category: "python", metric: "mission_range", missionStart: 16, missionEnd: 20, target: 5, family: "progress", titleKey: "achievementPythonLoops", descriptionKey: "achievementPythonLoopsDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "16–20", glyph: "↻", image: "./assets/achievements/python/achievement-python-loops.png?v=1" },
  { id: "python_lists", category: "python", metric: "mission_range", missionStart: 21, missionEnd: 25, target: 5, family: "progress", titleKey: "achievementPythonLists", descriptionKey: "achievementPythonListsDescription", rarityKey: "rarityRare", rarity: "rare", mark: "21–25", glyph: "[]", image: "./assets/achievements/python/achievement-python-lists.png?v=1" },
  { id: "python_functions", category: "python", metric: "mission_range", missionStart: 26, missionEnd: 30, target: 5, family: "progress", titleKey: "achievementPythonFunctions", descriptionKey: "achievementPythonFunctionsDescription", rarityKey: "rarityRare", rarity: "rare", mark: "26–30", glyph: "f()", image: "./assets/achievements/python/achievement-python-functions.png?v=1" },
  { id: "python_dictionaries", category: "python", metric: "mission_range", missionStart: 31, missionEnd: 35, target: 5, family: "progress", titleKey: "achievementPythonDictionaries", descriptionKey: "achievementPythonDictionariesDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "31–35", glyph: "{}", image: "./assets/achievements/python/achievement-python-math.png?v=1" },
  { id: "python_while", category: "python", metric: "mission_range", missionStart: 36, missionEnd: 40, target: 5, family: "progress", titleKey: "achievementPythonWhile", descriptionKey: "achievementPythonWhileDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "36–40", glyph: "∞", image: "./assets/achievements/python/achievement-python-while.png?v=1" },
  { id: "python_debug", category: "python", metric: "recovered_missions", target: 5, family: "mastery", titleKey: "achievementPythonDebug", descriptionKey: "achievementPythonDebugDescription", rarityKey: "rarityRare", rarity: "rare", mark: "5 FIX", glyph: "⌁", image: "./assets/achievements/python/achievement-python-debug.png?v=1" },
  { id: "python_precision", category: "python", metric: "perfect_first_try_missions", target: 10, family: "mastery", titleKey: "achievementPythonPrecision", descriptionKey: "achievementPythonPrecisionDescription", rarityKey: "rarityLegendary", rarity: "legendary", mark: "10×3", glyph: "★", image: "./assets/achievements/python/achievement-python-master.png?v=1" },
  { id: "first_mission", category: "missions", metric: "completed_missions", target: 1, family: "progress", titleKey: "achievementFirstMission", descriptionKey: "achievementFirstMissionDescription", rarityKey: "rarityCommon", rarity: "common", mark: "01", glyph: "★", image: "./assets/achievements/missions/achievement-mission-first-transmission.png?v=1" },
  { id: "mission_five", category: "missions", metric: "completed_missions", target: 5, family: "progress", titleKey: "achievementMissionFive", descriptionKey: "achievementMissionFiveDescription", rarityKey: "rarityCommon", rarity: "common", mark: "05", glyph: "✦", image: "./assets/achievements/missions/achievement-mission-console-warmup.png?v=1" },
  { id: "mission_ten", category: "missions", metric: "completed_missions", target: 10, family: "progress", titleKey: "achievementMissionTen", descriptionKey: "achievementMissionTenDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "10", glyph: "◆", image: "./assets/achievements/missions/achievement-mission-double-digits.png?v=1" },
  { id: "halfway_hero", category: "missions", metric: "completed_missions", target: 20, family: "progress", titleKey: "achievementHalfwayHero", descriptionKey: "achievementHalfwayHeroDescription", rarityKey: "rarityRare", rarity: "rare", mark: "1/2", glyph: "◐", image: "./assets/achievements/missions/achievement-mission-halfway.png?v=1" },
  { id: "mission_thirty", category: "missions", metric: "completed_missions", target: 30, family: "progress", titleKey: "achievementMissionThirty", descriptionKey: "achievementMissionThirtyDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "30", glyph: "⚑", image: "./assets/achievements/missions/achievement-mission-deep-circuit.png?v=1" },
  { id: "path_complete", category: "missions", metric: "completed_missions", target: 40, family: "progress", titleKey: "achievementPathComplete", descriptionKey: "achievementPathCompleteDescription", rarityKey: "rarityLegendary", rarity: "legendary", mark: "ALL", glyph: "♛", image: "./assets/achievements/missions/achievement-mission-path-complete.png?v=1" },
  { id: "perfect_mission", family: "mastery", titleKey: "achievementPerfectMission", descriptionKey: "achievementPerfectMissionDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "3X", glyph: "✓" },
  { id: "star_collector_25", category: "missions", metric: "total_stars", target: 25, family: "stars", titleKey: "achievementStarCollector25", descriptionKey: "achievementStarCollector25Description", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "25*", glyph: "✧", image: "./assets/achievements/missions/achievement-mission-code-constellation.png?v=1" },
  { id: "star_collector_60", category: "missions", metric: "total_stars", target: 60, family: "stars", titleKey: "achievementStarCollector60", descriptionKey: "achievementStarCollector60Description", rarityKey: "rarityRare", rarity: "rare", mark: "60*", glyph: "✪", image: "./assets/achievements/missions/achievement-mission-bright-archive.png?v=1" },
  { id: "star_master_100", category: "missions", metric: "total_stars", target: 100, family: "stars", titleKey: "achievementStarMaster100", descriptionKey: "achievementStarMaster100Description", rarityKey: "rarityLegendary", rarity: "legendary", mark: "100", glyph: "☄", image: "./assets/achievements/missions/achievement-mission-centurion-signal.png?v=1" },
  { id: "perfect_block", category: "missions", metric: "perfect_blocks", target: 1, family: "blocks", titleKey: "achievementPerfectBlock", descriptionKey: "achievementPerfectBlockDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "15★", glyph: "★", image: "./assets/achievements/missions/achievement-mission-perfect-block.png?v=1" },
  { id: "first_block", family: "blocks", titleKey: "achievementFirstBlock", descriptionKey: "achievementFirstBlockDescription", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "B1", glyph: "I" },
  { id: "three_blocks", family: "blocks", titleKey: "achievementThreeBlocks", descriptionKey: "achievementThreeBlocksDescription", rarityKey: "rarityRare", rarity: "rare", mark: "B3", glyph: "III" },
  { id: "six_blocks", family: "blocks", titleKey: "achievementSixBlocks", descriptionKey: "achievementSixBlocksDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "B6", glyph: "VI" },
  { id: "clean_streak_3", family: "mastery", titleKey: "achievementCleanStreak3", descriptionKey: "achievementCleanStreak3Description", rarityKey: "rarityUncommon", rarity: "uncommon", mark: "x3", glyph: "↟" },
  { id: "clean_streak_5", family: "mastery", titleKey: "achievementCleanStreak5", descriptionKey: "achievementCleanStreak5Description", rarityKey: "rarityRare", rarity: "rare", mark: "x5", glyph: "⇈" },
  { id: "clean_streak_10", family: "mastery", titleKey: "achievementCleanStreak10", descriptionKey: "achievementCleanStreak10Description", rarityKey: "rarityEpic", rarity: "epic", mark: "x10", glyph: "▲" },
  { id: "returning_learner", family: "dedication", titleKey: "achievementReturningLearner", descriptionKey: "achievementReturningLearnerDescription", rarityKey: "rarityRare", rarity: "rare", mark: "7D", glyph: "◑" },
  { id: "dedicated_learner", family: "dedication", titleKey: "achievementDedicatedLearner", descriptionKey: "achievementDedicatedLearnerDescription", rarityKey: "rarityEpic", rarity: "epic", mark: "14D", glyph: "◕" },
  { id: "veteran_learner", family: "dedication", titleKey: "achievementVeteranLearner", descriptionKey: "achievementVeteranLearnerDescription", rarityKey: "rarityLegendary", rarity: "legendary", mark: "30D", glyph: "∞" },
]);

const PLANNED_ACHIEVEMENT_TOTAL = 40;
const ACHIEVEMENT_GLASS_ASSET = "./assets/achievements/achievement-glass-panel.png?v=1";
const ACHIEVEMENT_METAL_RAIL_ASSET = "./assets/achievements/achievement-metal-rail.png?v=1";
const CONSISTENCY_ACHIEVEMENTS = Object.freeze(
  ACHIEVEMENT_DEFINITIONS.filter(({ category }) => category === "consistency"),
);
const PYTHON_ACHIEVEMENTS = Object.freeze(
  ACHIEVEMENT_DEFINITIONS.filter(({ category }) => category === "python"),
);
const MISSION_ACHIEVEMENTS = Object.freeze(
  ACHIEVEMENT_DEFINITIONS.filter(({ category }) => category === "missions"),
);
const ACHIEVEMENTS_BY_CATEGORY = Object.freeze({
  consistency: CONSISTENCY_ACHIEVEMENTS,
  python: PYTHON_ACHIEVEMENTS,
  missions: MISSION_ACHIEVEMENTS,
  secrets: Object.freeze([]),
});

function getAchievementDefinition(achievementId) {
  return ACHIEVEMENT_DEFINITIONS.find(({ id }) => id === achievementId);
}

let currentLanguage = "en-US";

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : "en-US";
}

function t(key, replacements = {}) {
  const template = UI_TEXT[currentLanguage]?.[key] || UI_TEXT["en-US"][key] || key;
  return Object.entries(replacements).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

function applyStaticTranslations() {
  const readyMessages = Object.values(UI_TEXT).map((messages) => messages.readyOutput);
  const outputElement = document.querySelector("#outputConsole");
  const shouldTranslateReadyOutput = outputElement
    && readyMessages.includes(outputElement.textContent.trim());

  document.documentElement.lang = currentLanguage === "pt-BR" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  if (shouldTranslateReadyOutput) {
    outputElement.textContent = t("readyOutput");
  }
}

function applyLanguage(language, { persist = true } = {}) {
  stopMompyVoice();
  currentLanguage = normalizeLanguage(language);
  settingsState.language = currentLanguage;
  if (persist) {
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  }
  applyStaticTranslations();
  renderStartUserInfo();

  if (
    typeof currentMissionIndex === "number"
    && missions.length >= PLANNED_TOTAL_MISSIONS
    && !activeBriefingId
  ) {
    renderMission(currentMission());
  }

  if (trainingStarted && lastValidationResult) {
    renderDiagnostic(lastValidationResult);
  } else if (trainingStarted && missionCompleted && lastCompletedOutput !== null) {
    renderCompletedMissionOutput(lastCompletedOutput, lastCompletedWasAdvanced);
  } else if (trainingStarted && !missionCompleted) {
    output.textContent = missionIntroText(currentMission());
  }
}

function getLocalizedContent() {
  return window.MOMPY_CONTENT_I18N?.[currentLanguage] || null;
}

function localizeMission(mission) {
  if (!mission || missions.length < PLANNED_TOTAL_MISSIONS) {
    return mission;
  }

  const copy = getLocalizedContent()?.missions?.[mission.id];

  if (!copy) {
    return mission;
  }

  return {
    ...mission,
    title: copy[0],
    description: copy[1],
    objective: copy[2],
    help: copy[3],
    blocks: [
      [{ text: copy[1] }],
      [{ text: `${t("goal")}: ${copy[2]}` }],
    ],
  };
}

function localizeBriefing(briefing) {
  const copy = briefing && getLocalizedContent()?.briefings?.[briefing.id];

  if (!copy) {
    return briefing;
  }

  return {
    ...briefing,
    title: copy.title,
    subtitle: copy.subtitle,
    steps: briefing.steps.map((step, index) => {
      const localizedStep = copy.steps[index];

      if (!localizedStep) {
        return { ...step };
      }

      if (Array.isArray(localizedStep)) {
        return {
          ...step,
          title: localizedStep[0],
          text: localizedStep[1],
          retryText: localizedStep[2],
        };
      }

      return {
        ...step,
        question: localizedStep.question,
        successText: localizedStep.successText,
        failText: localizedStep.failText,
        options: step.options.map((option, optionIndex) => ({
          ...option,
          text: localizedStep.options?.[optionIndex] || option.text,
        })),
      };
    }),
  };
}

const defaultProgressState = {
  currentMissionIndex: 0,
  completedMissionIds: [],
  totalXp: 0,
  totalStars: 0,
  currentStreak: 0,
  bestStreak: 0,
  activeDates: [],
  achievements: [],
  achievementProgress: {},
  lastUpdatedAt: null,
};

const currentUser = {
  name: DEFAULT_USER_NAME,
  level: "01 · Beginner",
  levelNumber: 1,
  xp: 0,
  xpToNextLevel: 100,
  missionsCompleted: 0,
  totalMissions: PLANNED_TOTAL_MISSIONS,
};

const settingsState = {
  language: "en-US",
  ambientMusic: true,
  musicVolume: 10,
  soundEffects: true,
  effectsVolume: 45,
  crtBrightness: 70,
  mompyAnimations: true,
};

const SETTINGS_SECTIONS = [
  { id: "shortcuts" },
  { id: "audio" },
  { id: "interface" },
  { id: "progress" },
  { id: "account" },
  { id: "updates" },
];

let activeSettingsSection = "shortcuts";

let pythonBackendConnected = false;
let pythonBackendSyncPromise = null;
let pythonClassroomLessonPayload = null;
let appVersion = FALLBACK_APP_VERSION;
let updateStatusCache = null;

const PYTHON_HTTP_ROUTES = {
  get_bootstrap_state: { method: "GET", path: "/api/bootstrap" },
  get_progress: { method: "GET", path: "/api/progress" },
  run_lesson_example: { method: "POST", path: "/api/classroom/example/run", body: ([lessonId, stepId, locale]) => ({ lesson_id: lessonId, step_id: stepId, locale }) },
  check_lesson_choice: { method: "POST", path: "/api/classroom/choice/check", body: ([lessonId, stepId, choiceId, locale]) => ({ lesson_id: lessonId, step_id: stepId, choice_id: choiceId, locale }) },
  check_lesson_sequence: { method: "POST", path: "/api/classroom/sequence/check", body: ([lessonId, stepId, itemIds, locale]) => ({ lesson_id: lessonId, step_id: stepId, item_ids: itemIds, locale }) },
  complete_classroom_lesson: { method: "POST", path: "/api/classroom/complete", body: ([lessonId]) => ({ lesson_id: lessonId }) },
  validate_mission: { method: "POST", path: "/api/validate", body: ([missionId, userCode]) => ({ mission_id: missionId, user_code: userCode }) },
  submit_mission: { method: "POST", path: "/api/mission/submit", body: ([missionId, userCode, hintUsed]) => ({ mission_id: missionId, user_code: userCode, hint_used: hintUsed }) },
  complete_mission: { method: "POST", path: "/api/complete", body: ([missionId]) => ({ mission_id: missionId }) },
  reset_progress: { method: "POST", path: "/api/reset", body: () => ({}) },
  set_current_mission_index: { method: "POST", path: "/api/progress/current", body: ([missionIndex]) => ({ current_mission_index: missionIndex }) },
  save_profile: { method: "POST", path: "/api/profile/save", body: ([profile]) => ({ profile }) },
  logout_profile: { method: "POST", path: "/api/profile/logout", body: () => ({}) },
  get_update_status: { method: "GET", path: "/api/update-status" },
};

function getPythonBackend() {
  return window.pywebview?.api || null;
}

function isHttpBackendAvailable() {
  return ["http:", "https:"].includes(window.location.protocol);
}

function waitForPythonBridgeReady(timeoutMs = 1800) {
  if (getPythonBackend() || isHttpBackendAvailable()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = (ready) => {
      if (settled) {
        return;
      }

      settled = true;
      document.removeEventListener("pywebviewready", onReady);
      resolve(ready);
    };

    const onReady = () => finish(true);
    document.addEventListener("pywebviewready", onReady, { once: true });
    setTimeout(() => finish(false), timeoutMs);
  });
}

async function callPythonBackend(method, ...args) {
  const backend = getPythonBackend();

  if (backend && typeof backend[method] === "function") {
    try {
      const result = await backend[method](...args);
      pythonBackendConnected = true;
      return result;
    } catch (error) {
      console.warn(`Mompy Python backend call failed: ${method}`, error);
    }
  }

  const route = PYTHON_HTTP_ROUTES[method];
  const canUseHttpBackend = route && isHttpBackendAvailable();

  if (!canUseHttpBackend) {
    return null;
  }

  try {
    const response = await fetch(route.path, {
      method: route.method,
      headers: route.method === "POST" ? { "Content-Type": "application/json" } : undefined,
      body: route.method === "POST" ? JSON.stringify(route.body(args)) : undefined,
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    pythonBackendConnected = true;
    return result;
  } catch (error) {
    console.warn(`Mompy Python HTTP backend call failed: ${method}`, error);
    return null;
  }
}

function applyPythonProgress(progress) {
  if (!progress || typeof progress !== "object") {
    return;
  }

  const completedIds = progress.completed_mission_ids || progress.completedMissionIds;
  const missionIndex = progress.current_mission_index ?? progress.currentMissionIndex;
  const xp = progress.total_xp ?? progress.totalXp;
  const levelInfo = progress.level_info || progress.levelInfo;
  const stars = progress.total_stars ?? progress.totalStars;
  const streak = progress.current_streak ?? progress.currentStreak;
  const best = progress.best_streak ?? progress.bestStreak;
  const backendActiveDates = progress.active_dates || progress.activeDates;
  const backendAchievementProgress = progress.achievement_progress || progress.achievementProgress;
  const backendCompletedBriefings = progress.completed_briefing_ids || progress.completedBriefingIds;
  const backendSkippedBriefings = progress.skipped_briefing_ids || progress.skippedBriefingIds;

  if (Number.isInteger(missionIndex)) {
    currentMissionIndex = clampMissionIndex(missionIndex);
  }

  if (Array.isArray(completedIds)) {
    completedMissionIds = sanitizeCompletedMissionIds(completedIds);
  }

  if (Number.isFinite(Number(xp))) {
    totalXp = Number(xp);
  } else {
    totalXp = 0;
  }

  if (levelInfo && typeof levelInfo === "object") {
    backendLevelInfo = normalizePythonLevelInfo(levelInfo);
  }

  totalStars = Number(stars) || 0;
  currentStreak = Number(streak) || 0;
  bestStreak = Number(best) || 0;
  blockProgress = Array.isArray(progress.block_progress) ? progress.block_progress : [];
  earnedAchievements = Array.isArray(progress.achievements) ? progress.achievements : [];
  activeDates = sanitizeActiveDates(backendActiveDates);
  achievementProgress = backendAchievementProgress && typeof backendAchievementProgress === "object"
    ? backendAchievementProgress
    : buildConsistencyProgress(activeDates);

  if (Array.isArray(backendCompletedBriefings)) {
    completedBriefingIds = sanitizeBriefingIds(backendCompletedBriefings);
  }
  if (Array.isArray(backendSkippedBriefings)) {
    skippedBriefingIds = sanitizeBriefingIds(backendSkippedBriefings);
  }

  updateProgressUI();
  saveLocalProgress({
    ...currentProgressPayload(),
    lastUpdatedAt: progress.last_updated_at || progress.lastUpdatedAt || new Date().toISOString(),
  });
}

function applyPythonProfile(profile) {
  if (!profile || typeof profile !== "object" || !profile.name) {
    return null;
  }

  const firstName = normalizeName(profile.name);
  const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
  const profileLanguage = firstName === DEFAULT_USER_NAME && storedLanguage
    ? storedLanguage
    : profile.language;
  applyLanguage(profileLanguage || "en-US");

  if (!firstName || firstName === DEFAULT_USER_NAME) {
    localStorage.removeItem(USER_PROFILE_KEY);
    applyUserProfile(null);
    renderStartUserInfo();
    return null;
  }

  const frontendProfile = {
    firstName,
    language: currentLanguage,
    levelPreference: profile.level_preference || profile.levelPreference || "beginner",
    email: profile.email || "",
  };

  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(frontendProfile));
  applyUserProfile(frontendProfile);
  renderStartUserInfo();
  return frontendProfile;
}

function normalizePythonMission(mission) {
  return {
    id: mission.id,
    level: mission.level,
    title: mission.title,
    description: mission.description,
    objective: mission.objective,
    starterCode: mission.starterCode ?? mission.starter_code ?? "",
    expectedOutput: mission.expectedOutput ?? mission.expected_output ?? "",
    help: mission.help,
    blocks: mission.blocks,
    xp: mission.xp,
  };
}

function applyPythonMissions(pythonMissions) {
  if (!Array.isArray(pythonMissions) || pythonMissions.length === 0) {
    return;
  }

  missions.splice(0, missions.length, ...pythonMissions.map(normalizePythonMission));
  currentMissionIndex = clampMissionIndex(currentMissionIndex);
}

function applyPythonClassroomLessons(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }

  const lessons = payload.lessons;
  if (!lessons || (typeof lessons !== "object" && !Array.isArray(lessons))) {
    return;
  }

  pythonClassroomLessonPayload = payload;
}

async function syncPythonBackendState() {
  const state = await callPythonBackend("get_bootstrap_state");

  if (!state) {
    return false;
  }

  applyPythonMissions(state.missions);
  applyPythonClassroomLessons(state.classroom_lessons || state.classroomLessons);
  if (state.backend?.version) {
    appVersion = state.backend.version;
  }
  applyPythonProfile(state.profile);
  applyPythonProgress(state.progress);

  const codeEditor = document.getElementById("codeEditor");
  if (codeEditor) {
    renderMission(currentMission());
    codeEditor.value = currentMission().starterCode || codeEditor.value;
    updateLineNumbers();
  }

  return true;
}

async function ensurePythonBackendState() {
  if (pythonBackendSyncPromise) {
    return pythonBackendSyncPromise;
  }

  pythonBackendSyncPromise = (async () => {
    await waitForPythonBridgeReady();
    return syncPythonBackendState();
  })();

  try {
    return await pythonBackendSyncPromise;
  } finally {
    pythonBackendSyncPromise = null;
  }
}

function schedulePythonBackendSync() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensurePythonBackendState, { once: true });
    return;
  }

  setTimeout(ensurePythonBackendState, 0);
}

document.addEventListener("pywebviewready", () => {
  schedulePythonBackendSync();
});

if (isHttpBackendAvailable()) {
  schedulePythonBackendSync();
}

const learningBriefings = [
  {
    id: "briefing_001",
    title: "Block 01 Briefing",
    subtitle: "First Python commands",
    beforeMissionIndex: 0,
    missionsRange: "1-5",
    steps: [
      {
        type: "lesson",
        title: "What is Python?",
        text: "Python is a programming language. You write instructions, and the computer executes them one by one.",
        retryText: "Think of Python as a way to talk to the computer through written commands. Each command needs to be clear.",
      },
      {
        type: "lesson",
        title: "Instructions",
        text: "An instruction is a small command. The computer doesn't guess intent. It follows exactly what was written.",
        retryText: "A line of code can be like a command: do this now. If the command is wrong, the result will be wrong too.",
      },
      {
        type: "check",
        question: "Python is used to:",
        options: [
          { label: "A", text: "write instructions for the computer", correct: true },
          { label: "B", text: "decorate the computer screen", correct: false },
          { label: "C", text: "connect physical cables", correct: false },
        ],
        successText: "Correct. Python lets you write instructions for the computer to execute.",
        failText: "Almost. Python isn't decoration or a physical cable. It's a language for writing instructions.",
      },
      {
        type: "lesson",
        title: "Text and quotes",
        text: "When we want Python to treat something as text, we usually use quotes. Quotes say: this is a message.",
        retryText: "Without quotes, Python tries to understand the word as the name of something. With quotes, it understands it as text.",
      },
      {
        type: "lesson",
        title: "Showing on screen",
        text: "One of the first ideas is asking the program to show a message. In Python, print is the basic command for that.",
        retryText: "print is a simple way to send a message to the console. It helps you see the result of the program.",
      },
    ],
  },
  {
    id: "briefing_002",
    title: "Block 02 Briefing",
    subtitle: "Variables and values",
    beforeMissionIndex: 5,
    missionsRange: "6-10",
    steps: [
      {
        type: "lesson",
        title: "Storing information",
        text: "A variable is a name that holds a value. You use that name later to retrieve the information.",
        retryText: "Imagine a label on a box. The label is the variable's name. What's inside is the value.",
      },
      {
        type: "lesson",
        title: "Assignment",
        text: "In Python, the equal sign puts a value inside a name. This is called assignment.",
        retryText: "When you write name = value, you're saying: store this value in this name.",
      },
      {
        type: "check",
        question: "In a variable, the = sign means:",
        options: [
          { label: "A", text: "store a value in a name", correct: true },
          { label: "B", text: "show a screen", correct: false },
          { label: "C", text: "delete the program", correct: false },
        ],
        successText: "Correct. The equal sign assigns a value to a name.",
        failText: "Not quite. Here, equal is used to store a value in a variable.",
      },
      {
        type: "lesson",
        title: "Using the value",
        text: "Once a variable exists, you can use its name in commands. Python looks up the stored value.",
        retryText: "You don't need to repeat the value every time. Use the variable's name, and Python fetches its value.",
      },
    ],
  },
  {
    id: "briefing_003",
    title: "Block 03 Briefing",
    subtitle: "Decisions",
    beforeMissionIndex: 10,
    missionsRange: "11-15",
    steps: [
      {
        type: "lesson",
        title: "Condition",
        text: "A condition is a question with a true or false answer. Programs use this to choose paths.",
        retryText: "Think of a door: if the condition is true, the program goes through. If it's false, it takes another path.",
      },
      {
        type: "lesson",
        title: "If",
        text: "The if runs a block only when the condition is true. Indentation shows what belongs to that block.",
        retryText: "if means: if something is true, run the indented lines below.",
      },
      {
        type: "check",
        question: "An if is used to:",
        options: [
          { label: "A", text: "make a decision in the program", correct: true },
          { label: "B", text: "change the editor font", correct: false },
          { label: "C", text: "create ambient sound", correct: false },
        ],
        successText: "Correct. The if creates different paths in the program.",
        failText: "Almost. The if doesn't change the visuals. It decides whether a block should run.",
      },
      {
        type: "lesson",
        title: "Comparisons",
        text: "Comparisons like greater than, less than, or equal to produce true or false answers.",
        retryText: "Comparing is asking: is this bigger? is this equal? The answer helps the program decide.",
      },
    ],
  },
  {
    id: "briefing_004",
    title: "Block 04 Briefing",
    subtitle: "Repetition",
    beforeMissionIndex: 15,
    missionsRange: "16-20",
    steps: [
      {
        type: "lesson",
        title: "Repeating actions",
        text: "Programs often need to repeat an action. Loops avoid copying the same line over and over.",
        retryText: "When a task repeats, a loop helps the computer do it in sequence.",
      },
      {
        type: "lesson",
        title: "For",
        text: "The for goes through a sequence. On each pass, it works with one item or number from the sequence.",
        retryText: "Think of the for as a conveyor belt: each item passes once, and the code block runs for it.",
      },
      {
        type: "check",
        question: "A loop mainly helps you:",
        options: [
          { label: "A", text: "repeat actions without copying code", correct: true },
          { label: "B", text: "turn off the monitor", correct: false },
          { label: "C", text: "change the user's name", correct: false },
        ],
        successText: "Correct. Loops repeat actions in an organized way.",
        failText: "Not quite. Loop is about repeating code, not about the interface.",
      },
      {
        type: "lesson",
        title: "Indentation",
        text: "Indented lines belong to the loop. This shows Python what should repeat.",
        retryText: "Indentation is the space at the start of the line. It marks the block that's inside the loop.",
      },
    ],
  },
  {
    id: "briefing_005",
    title: "Block 05 Briefing",
    subtitle: "Lists",
    beforeMissionIndex: 20,
    missionsRange: "21-25",
    steps: [
      {
        type: "lesson",
        title: "Multiple values",
        text: "A list holds several values in order. Each value is an item.",
        retryText: "A list is like a shelf: several items sit together, each one in a position.",
      },
      {
        type: "lesson",
        title: "Position",
        text: "List items have a position. In Python, the first position is usually zero.",
        retryText: "The first item sits at position 0, the second at position 1, and so on.",
      },
      {
        type: "check",
        question: "A list is used to:",
        options: [
          { label: "A", text: "store several values in order", correct: true },
          { label: "B", text: "save a password online", correct: false },
          { label: "C", text: "increase the sound volume", correct: false },
        ],
        successText: "Correct. Lists organize several values.",
        failText: "Almost. A list is a structure for storing several values.",
      },
    ],
  },
  {
    id: "briefing_006",
    title: "Block 06 Briefing",
    subtitle: "Functions",
    beforeMissionIndex: 25,
    missionsRange: "26-30",
    steps: [
      {
        type: "lesson",
        title: "Named code",
        text: "A function is a block of code with a name. You create it once and call it whenever you need it.",
        retryText: "A function is like a tool: it has a name and performs a task when you call it.",
      },
      {
        type: "lesson",
        title: "Organization",
        text: "Functions help avoid repetition and keep the program more organized.",
        retryText: "When a task shows up many times, putting it in a function keeps everything cleaner.",
      },
      {
        type: "check",
        question: "A function helps you:",
        options: [
          { label: "A", text: "organize and reuse code", correct: true },
          { label: "B", text: "create a new image", correct: false },
          { label: "C", text: "install Python by itself", correct: false },
        ],
        successText: "Correct. Functions organize reusable tasks.",
        failText: "Not quite. A function is about organizing code with a name.",
      },
    ],
  },
  {
    id: "briefing_007",
    title: "Block 07 Briefing",
    subtitle: "Dictionaries",
    beforeMissionIndex: 30,
    missionsRange: "31-35",
    steps: [
      {
        type: "lesson",
        title: "Keys and values",
        text: "A dictionary connects each key to a value. It is useful when data has names, such as a profile name and level.",
        retryText: "Think of a dictionary as labeled drawers: the key is the label and the value is what the drawer stores.",
      },
      {
        type: "lesson",
        title: "Read and update",
        text: "Use square brackets with a key to read or change one value without replacing the whole dictionary.",
        retryText: "profile[\"name\"] reads the name. profile[\"level\"] = 2 changes only the level.",
      },
      {
        type: "check",
        question: "A dictionary is especially useful when you need to:",
        options: [
          { label: "A", text: "connect named keys to values", correct: true },
          { label: "B", text: "repeat a block forever", correct: false },
          { label: "C", text: "draw directly on the screen", correct: false },
        ],
        successText: "Correct. Dictionaries organize values under meaningful keys.",
        failText: "Not quite. Dictionaries connect keys, such as name, to their values.",
      },
    ],
  },
  {
    id: "briefing_008",
    title: "Block 08 Briefing",
    subtitle: "While Loops",
    beforeMissionIndex: 35,
    missionsRange: "36-40",
    steps: [
      {
        type: "lesson",
        title: "Repeat while true",
        text: "A while loop repeats its indented block while its condition remains true.",
        retryText: "Read while as: keep doing this while the condition says yes.",
      },
      {
        type: "lesson",
        title: "Move toward the end",
        text: "The loop must update the value used by its condition. That progress eventually makes the condition false.",
        retryText: "If a counter never changes, the loop may never stop. Update it inside the loop.",
      },
      {
        type: "check",
        question: "What helps a counter-based while loop finish?",
        options: [
          { label: "A", text: "updating the counter inside the loop", correct: true },
          { label: "B", text: "adding more quote marks", correct: false },
          { label: "C", text: "renaming the window", correct: false },
        ],
        successText: "Correct. Updating the counter moves the condition toward false.",
        failText: "Almost. A counter-based loop needs to update its counter so it can finish.",
      },
    ],
  },
];

const CLASSROOM_BRIEFING_EXAMPLES = Object.freeze({
  briefing_001: Object.freeze({
    "en-US": Object.freeze({ code: 'print("Hello, Mompy!")', output: "Hello, Mompy!" }),
    "pt-BR": Object.freeze({ code: 'print("Olá, Mompy!")', output: "Olá, Mompy!" }),
  }),
  briefing_002: Object.freeze({
    "en-US": Object.freeze({ code: 'name = "Mompy"\nprint(name)', output: "Mompy" }),
    "pt-BR": Object.freeze({ code: 'nome = "Mompy"\nprint(nome)', output: "Mompy" }),
  }),
  briefing_003: Object.freeze({
    "en-US": Object.freeze({ code: 'energy = 3\nif energy > 0:\n    print("ON")', output: "ON" }),
    "pt-BR": Object.freeze({ code: 'energia = 3\nif energia > 0:\n    print("LIGADO")', output: "LIGADO" }),
  }),
  briefing_004: Object.freeze({
    "en-US": Object.freeze({ code: "for number in range(3):\n    print(number)", output: "0\n1\n2" }),
    "pt-BR": Object.freeze({ code: "for numero in range(3):\n    print(numero)", output: "0\n1\n2" }),
  }),
  briefing_005: Object.freeze({
    "en-US": Object.freeze({ code: 'items = ["cable", "screen"]\nprint(items[0])', output: "cable" }),
    "pt-BR": Object.freeze({ code: 'itens = ["cabo", "tela"]\nprint(itens[0])', output: "cabo" }),
  }),
  briefing_006: Object.freeze({
    "en-US": Object.freeze({ code: 'def greet(name):\n    return "Hello, " + name\n\nprint(greet("Mompy"))', output: "Hello, Mompy" }),
    "pt-BR": Object.freeze({ code: 'def saudar(nome):\n    return "Olá, " + nome\n\nprint(saudar("Mompy"))', output: "Olá, Mompy" }),
  }),
  briefing_007: Object.freeze({
    "en-US": Object.freeze({ code: 'profile = {"name": "Mompy"}\nprint(profile["name"])', output: "Mompy" }),
    "pt-BR": Object.freeze({ code: 'perfil = {"nome": "Mompy"}\nprint(perfil["nome"])', output: "Mompy" }),
  }),
  briefing_008: Object.freeze({
    "en-US": Object.freeze({ code: "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1", output: "3\n2\n1" }),
    "pt-BR": Object.freeze({ code: "contador = 3\nwhile contador > 0:\n    print(contador)\n    contador -= 1", output: "3\n2\n1" }),
  }),
});

const missions = [
  {
    id: "mission_001",
    level: 1,
    title: "Mission 01 — First Output",
    description: "First step: make the program write a message to the console.",
    objective: "Use print() to show exactly: Hello, Mompy!",
    starterCode: "# write here\n",
    expectedOutput: "Hello, Mompy!",
    help: 'Use quotes inside print: print("Hello, Mompy!")',
    blocks: [
      [
        {
          text: "First step: make the program write a message to the console.",
        },
      ],
      [
        { text: "Write a " },
        { text: "print()", tag: "code" },
        { text: " that shows exactly: " },
        { text: "Hello, Mompy!", tag: "strong" },
      ],
    ],
  },
  {
    id: "mission_002",
    level: 2,
    title: "Mission 02 — Variable",
    description: "Variables store values for you to use later.",
    objective: 'Create name = "Mompy" and then show name with print().',
    starterCode: 'name = "Mompy"\n',
    expectedOutput: "Mompy",
    help: 'After creating the variable, use print(name). Do not put name in quotes inside print.',
  },
  {
    id: "mission_003",
    level: 3,
    title: "Mission 03 — Sum",
    description: "Python can do simple math directly in the code.",
    objective: "Add 2 + 3 and show the result in the console.",
    starterCode: "a = 2\nb = 3\n",
    expectedOutput: "5",
    help: "You can use print(a + b) after creating the variables.",
  },
  {
    id: "mission_004",
    level: 4,
    title: "Mission 04 — If",
    description: "The if runs a block of code only when a condition is true.",
    objective: 'Use if to show exactly: Ready',
    starterCode: "power = True\n",
    expectedOutput: "Ready",
    help: 'Use if power: and, inside it, print("Ready").',
  },
  {
    id: "mission_005",
    level: 5,
    title: "Mission 05 — For Loop",
    description: "The for repeats commands for a sequence of values.",
    objective: "Use range(3) to show 0, 1, and 2.",
    starterCode: "for i in range(3):\n    ",
    expectedOutput: "0\n1\n2",
    help: "Inside the for, use print(i). The print line needs to be indented.",
  },
  {
    id: "mission_006",
    level: 6,
    title: "Mission 06 — List Item",
    description: "Lists store several values in order.",
    objective: 'Create a list with "onion", "terminal", "python" and show the second item.',
    starterCode: 'items = ["onion", "terminal", "python"]\n',
    expectedOutput: "terminal",
    help: "The first item is index 0. The second item is items[1].",
  },
  {
    id: "mission_007",
    level: 7,
    title: "Mission 07 — Length",
    description: "len() counts how many items or characters exist in a value.",
    objective: 'Show the length of the word "Mompy".',
    starterCode: 'word = "Mompy"\n',
    expectedOutput: "5",
    help: "Use print(len(word)) ou print(len(\"Mompy\")).",
  },
  {
    id: "mission_008",
    level: 8,
    title: "Mission 08 — Function",
    description: "Functions store a small task to reuse later.",
    objective: 'Create greet(user) and show: Hello, Mompy',
    starterCode: "def greet(user):\n    ",
    expectedOutput: "Hello, Mompy",
    help: 'Return or print "Hello, " + user, then call greet("Mompy").',
  },
  {
    id: "mission_009",
    level: 9,
    title: "Mission 09 — Boolean",
    description: "Booleans represent true or false.",
    objective: "Create is_ready = True and show that value.",
    starterCode: "is_ready = True\n",
    expectedOutput: "True",
    help: "Use print(is_ready). In Python, True starts with a capital T.",
  },
  {
    id: "mission_010",
    level: 10,
    title: "Mission 10 — Uppercase",
    description: "Strings have methods that transform text.",
    objective: 'Turn "mompy" into uppercase letters.',
    starterCode: 'name = "mompy"\n',
    expectedOutput: "MOMPY",
    help: "Use name.upper() inside print.",
  },
  {
    id: "mission_011",
    level: 11,
    title: "Mission 11 — Append",
    description: "append() adds an item to the end of a list.",
    objective: "Add 4 to [1, 2, 3] and show the list.",
    starterCode: "numbers = [1, 2, 3]\n",
    expectedOutput: "[1, 2, 3, 4]",
    help: "Use numbers.append(4), then print(numbers).",
  },
  {
    id: "mission_012",
    level: 12,
    title: "Mission 12 — Dictionary",
    description: "Dictionaries store values with key names.",
    objective: 'Create a dictionary with name = "Mompy" and show that value.',
    starterCode: 'profile = {"name": "Mompy"}\n',
    expectedOutput: "Mompy",
    help: 'Use print(profile["name"]).',
  },
  {
    id: "mission_013",
    level: 13,
    title: "Mission 13 — While",
    description: "while repeats as long as a condition stays true.",
    objective: "Use while to show 0, 1, and 2.",
    starterCode: "count = 0\nwhile count < 3:\n    ",
    expectedOutput: "0\n1\n2",
    help: "Inside the while, use print(count) and then count += 1.",
  },
  {
    id: "mission_014",
    level: 14,
    title: "Mission 14 — F-String",
    description: "f-strings place variables inside text.",
    objective: 'With user = "Mackson", show: Hello, Mackson',
    starterCode: 'user = "Mackson"\n',
    expectedOutput: "Hello, Mackson",
    help: 'Use print(f"Hello, {user}").',
  },
  {
    id: "mission_015",
    level: 15,
    title: "Mission 15 — Comparison",
    description: "Comparisons return True or False.",
    objective: "Show whether 10 is greater than 3.",
    starterCode: "",
    expectedOutput: "True",
    help: "Use print(10 > 3).",
  },
  {
    id: "mission_016",
    level: 16,
    title: "Mission 16 — Modulo",
    description: "The % operator shows the remainder of a division.",
    objective: "Show the remainder of 8 divided by 2.",
    starterCode: "",
    expectedOutput: "0",
    help: "Use print(8 % 2).",
  },
  {
    id: "mission_017",
    level: 17,
    title: "Mission 17 — List Comprehension",
    description: "List comprehensions create new lists in a single line.",
    objective: "Double [1, 2, 3] and show [2, 4, 6].",
    starterCode: "numbers = [1, 2, 3]\n",
    expectedOutput: "[2, 4, 6]",
    help: "Use print([n * 2 for n in numbers]).",
  },
  {
    id: "mission_018",
    level: 18,
    title: "Mission 18 — Return Value",
    description: "A function can return a result with return.",
    objective: "Create add(a, b) and show add(2, 3).",
    starterCode: "def add(a, b):\n    ",
    expectedOutput: "5",
    help: "The function should return a + b. Then use print(add(2, 3)).",
  },
  {
    id: "mission_019",
    level: 19,
    title: "Mission 19 — Split",
    description: "split() breaks a sentence into a list of words.",
    objective: 'Split "Python is fun" into words and show the list.',
    starterCode: 'phrase = "Python is fun"\n',
    expectedOutput: "['Python', 'is', 'fun']",
    help: "Use print(phrase.split()).",
  },
  {
    id: "mission_020",
    level: 20,
    title: "Mission 20 — Small Loop",
    description: "You can now combine a loop, text, and a string method.",
    objective: 'Show the letters of "py" in uppercase, one per line.',
    starterCode: 'for letter in "py":\n    ',
    expectedOutput: "P\nY",
    help: "Inside the for, use print(letter.upper()).",
  },
];

let currentMissionIndex = 0;
let completedMissionIds = [];
let totalXp = 0;
let backendLevelInfo = null;
let totalStars = 0;
let currentStreak = 0;
let bestStreak = 0;
let blockProgress = [];
let earnedAchievements = [];
let activeDates = [];
let achievementProgress = {};
let completedBriefingIds = [];
let skippedBriefingIds = [];

const loadingScreen = document.querySelector("#loadingScreen");
const loadingBranding = document.querySelector("#loadingBranding");
const loadingProgress = document.querySelector("#loadingProgress");
const loadingRunner = document.querySelector("#loadingRunner");
const machine = document.querySelector(".machine");
const startScreen = document.querySelector("#startScreen");
const startMompySprite = document.querySelector("#startMompySprite");
const startButton = document.querySelector("#startButton");
const continueButton = document.querySelector("#continueButton");
const startUserName = document.querySelector("#startUserName");
const startUserLevel = document.querySelector("#startUserLevel");
const startMissionCount = document.querySelector("#startMissionCount");
const startMompyTerminal = document.querySelector("#startMompyTerminal");
const startMompyTerminalOutput = document.querySelector("#startMompyTerminalOutput");
const onboardingOverlay = document.querySelector("#onboardingOverlay");
const onboardingTerminalOutput = document.querySelector("#onboardingTerminalOutput");
const onboardingNameInput = document.querySelector("#onboardingNameInput");
const onboardingContinueButton = document.querySelector("#onboardingContinueButton");
const onboardingError = document.querySelector("#onboardingError");
const sprite = document.querySelector("#mompySprite");
const missionCopy = document.querySelector("#missionCopy");
const levelValue = document.querySelector("#levelValue");
const levelFill = document.querySelector("#levelFill");
const editor = document.querySelector("#codeEditor");
const lineNumbers = document.querySelector("#lineNumbers");
const output = document.querySelector("#outputConsole");
const runButton = document.querySelector("#runButton");
const backButton = document.querySelector("#backButton");
const helpButton = document.querySelector("#helpButton");
const achievementsButton = document.querySelector("#achievementsButton");
const settingsButton = document.querySelector("#settingsButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const modalActions = document.querySelector("#modalActions");
const modalCloseButton = document.querySelector("#modalCloseButton");
const mompyScreenMessage = document.querySelector("#mompyScreenMessage");
const classroomSceneTransition = document.querySelector(".classroom-scene-transition");
const classroomLessonContent = document.querySelector("#classroomLessonContent");
const classroomLessonPanel = document.querySelector(".classroom-lesson-panel");
const classroomMompyGuide = document.querySelector("#classroomMompyGuide");
const classroomMompyScreenAction = document.querySelector("#classroomMompyScreenAction");
const classroomAuxRail = document.querySelector("#classroomAuxRail");
const classroomAuxMonitor = document.querySelector("#classroomAuxMonitor");
const classroomAuxMonitorContent = document.querySelector("#classroomAuxMonitorContent");
const classroomAuxCrt = document.querySelector("#classroomAuxCrt");
const repeatMissionButton = document.querySelector("#repeatMissionButton");
const nextMissionButton = document.querySelector("#nextMissionButton");

let talkTimer = null;
let settleTimer = null;
let talkFrame = false;
let currentMompyState = "idle";
let currentMompyGaze = "side";
let mompyFirstForwardPending = true;
let mompyBlinkTimer = null;
let mompyBlinkFrameTimers = [];
let mompyGazeTimer = null;
let mompyGazeTransitioning = false;
let mompyTypingPauseTimer = null;
let lastFocusedElement = null;
let modalMompyRestore = null;
let typingTimer = null;
let typingToken = 0;
let trainingStarted = false;
let missionCompleted = false;
let missionHintUsed = false;
let lastMissionReward = null;
let completionTimer = null;
let completionPending = false;
let lastValidationResult = null;
let activeRewardCapsule = null;
let rewardCapsuleHandled = false;
let rewardCapsulePresentationPending = false;
let rewardCapsulePresentationToken = 0;
let rewardCapsuleInstanceId = 0;
let missionRewardSequenceScheduled = false;
let lastCompletedOutput = null;
let lastCompletedWasAdvanced = false;
let startScreenAnimationActive = false;
let startMompyTerminalTimer = null;
let startMompyTypingTimer = null;
let startMompyBlinkTimer = null;
let startMompyBlinkFrameTimers = [];
let startMompyTerminalToken = 0;
let startTerminalExampleIndex = 0;
let loadingInterval = null;
let loadingDoneTimer = null;
let loadingRunnerTimer = null;
let loadingRunnerFrameIndex = 0;
let hepteraktBootTimers = [];
let mompyShutdownAnimating = false;
let mompyShutdownTimers = [];
let currentProfile = null;
let onboardingActive = false;
let onboardingTypingTimer = null;
let onboardingDelayTimer = null;
let onboardingToken = 0;
let activeBriefingId = null;
let activeBriefingStepIndex = 0;
let activeBriefingRetry = false;
let briefingFinalTimer = null;
let classroomStageTimers = [];
let classroomInteractionTimer = null;
let classroomMompyTimer = null;
let classroomTypewriterTimer = null;
let classroomTypewriterToken = 0;
let classroomTypewriterFinisher = null;
let classroomMompyScreenActionHandler = null;
let classroomMompyVisible = false;
let activeMompyVoice = null;
let activeMompyVoiceEndedHandler = null;
let activeMompyVoiceAnimationFrame = null;
let classroomAuxMonitorMode = "closed";
let classroomAuxTransitionToken = 0;
let activeRichLessonState = null;
const CLASSROOM_REVIEW_STEP_BY_QUESTION = Object.freeze({
  "history-check": "guido",
  "name-origin": "python-name-story",
  "python-purpose-check": "what-is-python",
  "predict-output": "print-purpose",
  "two-lines": "two-lines-demo",
  "fill-text": "syntax-pairs",
  "mastery-python": "what-is-python",
  "mastery-print": "print-purpose",
  "mastery-text": "text-intro",
  "mastery-order": "two-lines-demo",
  "mastery-syntax": "syntax-pairs",
});
const briefingOptionOrder = new Map();
let previousCorrectBriefingOptionIndex = -1;

const startTerminalWelcome = [
  '>>> print("Welcome")',
  "Welcome",
];

const startTerminalExamples = [
  [
    '>>> name = "Mompy"',
    ">>> print(name)",
    "Mompy",
  ],
  [
    ">>> for i in range(3):",
    "...     print(i)",
    "0",
    "1",
    "2",
  ],
  [
    ">>> def greet(user):",
    '...     return f"Hello, {user}"',
    '>>> greet("Mackson")',
    "'Hello, Mackson'",
  ],
  [
    ">>> numbers = [1, 2, 3, 4]",
    ">>> [n * 2 for n in numbers]",
    "[2, 4, 6, 8]",
  ],
];

const onboardingIntroLines = [
  '>>> print("Welcome to Mompy")',
  "Welcome to Mompy",
  '>>> name = input("What is your first name? ")',
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clampAudioVolume(value, fallback) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  const normalized = number > 1 ? number / 100 : number;
  return Math.min(1, Math.max(0, normalized));
}

function clampSettingPercentage(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(100, Math.max(0, Math.round(number))) : fallback;
}

function applyCrtBrightness(value, { persist = true } = {}) {
  settingsState.crtBrightness = clampSettingPercentage(value, settingsState.crtBrightness);
  const brightnessFactor = 0.58 + settingsState.crtBrightness * 0.006;
  machine.style.setProperty("--crt-brightness", brightnessFactor.toFixed(3));

  if (persist) {
    try {
      localStorage.setItem(CRT_BRIGHTNESS_KEY, String(settingsState.crtBrightness));
    } catch (error) {
      console.warn(error);
    }
  }
}

function setMompyAnimationsEnabled(value, { persist = true, syncRuntime = true } = {}) {
  settingsState.mompyAnimations = Boolean(value);
  document.documentElement.classList.toggle("mompy-animations-disabled", !settingsState.mompyAnimations);

  if (persist) {
    try {
      localStorage.setItem(MOMPY_ANIMATIONS_KEY, String(settingsState.mompyAnimations));
    } catch (error) {
      console.warn(error);
    }
  }

  if (!syncRuntime) {
    return;
  }

  if (!settingsState.mompyAnimations) {
    stopStartScreenMompyAnimation({ keepFace: true });
    clearMompyAmbientTimers();
    stopTalking();
  } else if (!trainingStarted && currentProfile && !startScreen.hidden) {
    startStartScreenMompyAnimation();
  } else if (trainingStarted && currentMompyState === "idle") {
    scheduleMompyBlink();
    scheduleMompyGaze();
  }
}

function loadInterfaceSettings() {
  let storedBrightness = null;
  let storedAnimations = null;

  try {
    storedBrightness = localStorage.getItem(CRT_BRIGHTNESS_KEY);
    storedAnimations = localStorage.getItem(MOMPY_ANIMATIONS_KEY);
  } catch (error) {
    console.warn(error);
  }

  applyCrtBrightness(storedBrightness === null ? settingsState.crtBrightness : storedBrightness, { persist: false });
  setMompyAnimationsEnabled(storedAnimations === null ? true : storedAnimations === "true", {
    persist: false,
    syncRuntime: false,
  });
}

const audioManager = {
  sfxEnabled: true,
  musicEnabled: true,
  sfxVolume: 0.45,
  musicVolume: 0.1,
  sounds: {},
  music: null,
  unlocked: false,
  ambientFadeTimer: null,

  init() {
    this.loadSettings();
    this.sounds = {
      click: new Audio(ASSETS.clickSfx),
      run: new Audio(ASSETS.runSfx),
      success: new Audio(ASSETS.successSfx),
      error: new Audio(ASSETS.errorSfx),
      shutdown: new Audio(ASSETS.shutdownSfx),
      achievementRail: new Audio(ASSETS.achievementRailSfx),
      achievementGlass: new Audio(ASSETS.achievementGlassSfx),
      achievementReveal: new Audio(ASSETS.achievementRevealSfx),
      settingsGearEngage: new Audio(ASSETS.settingsGearEngageSfx),
      settingsGearsTurn: new Audio(ASSETS.settingsGearsTurnSfx),
      settingsPanelLock: new Audio(ASSETS.settingsPanelLockSfx),
    };

    Object.values(this.sounds).forEach((sound) => {
      sound.preload = "auto";
    });

    this.music = new Audio(ASSETS.ambientLoop);
    this.music.loop = true;
    this.music.preload = "auto";
    this.music.volume = 0;
  },

  unlock() {
    if (this.unlocked) {
      return;
    }

    this.unlocked = true;

    Object.values(this.sounds).forEach((sound) => {
      try {
        sound.load();
      } catch (error) {
        console.warn(error);
      }
    });

    if (this.music) {
      try {
        this.music.load();
      } catch (error) {
        console.warn(error);
      }
    }

    ensureClassroomRecordedTracks().forEach(({ audio }) => {
      try {
        audio.load();
      } catch (error) {
        console.warn(error);
      }
    });

    if (!trainingStarted && loadingScreen?.hidden) {
      this.startAmbientMusic();
    }
  },

  playSfx(name) {
    if (!this.sfxEnabled || !this.unlocked) {
      return;
    }

    const baseSound = this.sounds[name];

    if (!baseSound) {
      return;
    }

    const sound = baseSound.cloneNode(true);
    sound.volume = this.sfxVolume;
    sound.play().catch(() => {});
  },

  playClick() {
    this.playSfx("click");
  },

  playRun() {
    this.playSfx("run");
  },

  playSuccess() {
    this.playSfx("success");
  },

  playError() {
    this.playSfx("error");
  },

  playShutdown() {
    this.playSfx("shutdown");
  },

  playAchievementRail() {
    this.playSfx("achievementRail");
  },

  playAchievementGlass() {
    this.playSfx("achievementGlass");
  },

  playAchievementReveal() {
    this.playSfx("achievementReveal");
  },

  playSettingsGearEngage() {
    this.playSfx("settingsGearEngage");
  },

  playSettingsGearsTurn() {
    this.playSfx("settingsGearsTurn");
  },

  playSettingsPanelLock() {
    this.playSfx("settingsPanelLock");
  },

  startAmbientMusic() {
    if (!this.music || !this.musicEnabled || !this.unlocked || trainingStarted || !loadingScreen?.hidden) {
      return;
    }

    this.fadeInAmbient();
  },

  stopAmbientMusic() {
    this.fadeOutAmbient();
  },

  fadeInAmbient() {
    if (!this.music) {
      return;
    }

    clearInterval(this.ambientFadeTimer);

    const targetVolume = this.musicVolume;

    if (targetVolume <= 0) {
      return;
    }

    this.music.loop = true;
    this.music.play().catch(() => {});
    this.ambientFadeTimer = setInterval(() => {
      if (!this.music || trainingStarted || !this.musicEnabled) {
        this.fadeOutAmbient();
        return;
      }

      this.music.volume = Math.min(targetVolume, this.music.volume + 0.01);

      if (this.music.volume >= targetVolume) {
        clearInterval(this.ambientFadeTimer);
        this.ambientFadeTimer = null;
      }
    }, 70);
  },

  fadeOutAmbient() {
    if (!this.music) {
      return;
    }

    clearInterval(this.ambientFadeTimer);
    this.ambientFadeTimer = setInterval(() => {
      if (!this.music) {
        clearInterval(this.ambientFadeTimer);
        this.ambientFadeTimer = null;
        return;
      }

      this.music.volume = Math.max(0, this.music.volume - 0.015);

      if (this.music.volume <= 0.001) {
        this.music.pause();
        this.music.volume = 0;
        clearInterval(this.ambientFadeTimer);
        this.ambientFadeTimer = null;
      }
    }, 45);
  },

  setSfxEnabled(value) {
    this.sfxEnabled = Boolean(value);
    settingsState.soundEffects = this.sfxEnabled;
    syncClassroomSparkAudio();
    this.saveSettings();
  },

  setMusicEnabled(value) {
    this.musicEnabled = Boolean(value);
    settingsState.ambientMusic = this.musicEnabled;
    this.saveSettings();

    if (classroomEnvironmentAudio.active) {
      syncClassroomMachineAmbience();
    } else if (this.musicEnabled) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
  },

  setSfxVolume(value) {
    this.sfxVolume = clampAudioVolume(value, this.sfxVolume);
    settingsState.effectsVolume = Math.round(this.sfxVolume * 100);
    syncClassroomSparkAudio();
    this.saveSettings();
  },

  setMusicVolume(value) {
    this.musicVolume = clampAudioVolume(value, this.musicVolume);
    settingsState.musicVolume = Math.round(this.musicVolume * 100);

    if (this.music && !this.music.paused) {
      this.music.volume = Math.min(this.music.volume, this.musicVolume);
    }

    syncClassroomMachineAmbience();
    this.saveSettings();
  },

  saveSettings() {
    try {
      localStorage.setItem("mompy_music_enabled", String(this.musicEnabled));
      localStorage.setItem("mompy_music_volume", String(this.musicVolume));
      localStorage.setItem("mompy_sfx_enabled", String(this.sfxEnabled));
      localStorage.setItem("mompy_sfx_volume", String(this.sfxVolume));
    } catch (error) {
      console.warn(error);
    }
  },

  loadSettings() {
    try {
      const storedMusicEnabled = localStorage.getItem("mompy_music_enabled");
      const storedMusicVolume = localStorage.getItem("mompy_music_volume");
      const storedSfxEnabled = localStorage.getItem("mompy_sfx_enabled");
      const storedSfxVolume = localStorage.getItem("mompy_sfx_volume");

      this.musicEnabled = storedMusicEnabled === null ? true : storedMusicEnabled === "true";
      this.musicVolume = clampAudioVolume(storedMusicVolume, 0.1);
      this.sfxEnabled = storedSfxEnabled === null ? true : storedSfxEnabled === "true";
      this.sfxVolume = clampAudioVolume(storedSfxVolume, 0.45);
    } catch (error) {
      console.warn(error);
    }

    settingsState.ambientMusic = this.musicEnabled;
    settingsState.musicVolume = Math.round(this.musicVolume * 100);
    settingsState.soundEffects = this.sfxEnabled;
    settingsState.effectsVolume = Math.round(this.sfxVolume * 100);
  },
};

let classroomMechanismAudioContext = null;

function prepareClassroomAudioContext() {
  if (!audioManager.unlocked) {
    return null;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!classroomMechanismAudioContext) {
    classroomMechanismAudioContext = new AudioContextClass();
  }

  if (classroomMechanismAudioContext.state === "suspended") {
    classroomMechanismAudioContext.resume().catch(() => {});
  }

  return classroomMechanismAudioContext;
}

function prepareClassroomMechanismAudio() {
  if (!audioManager.sfxEnabled) {
    return null;
  }

  return prepareClassroomAudioContext();
}

function playClassroomMechanismCue(phase) {
  const context = prepareClassroomMechanismAudio();
  if (!context) {
    return;
  }

  const now = context.currentTime + 0.015;
  const volume = Math.max(0.0001, audioManager.sfxVolume * 0.42);
  const master = context.createGain();
  master.gain.setValueAtTime(volume, now);
  master.connect(context.destination);

  const strike = ({ offset = 0, frequency, endFrequency = frequency, duration, gain = 0.2, type = "triangle" }) => {
    const startsAt = now + offset;
    const endsAt = startsAt + duration;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startsAt);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), endsAt);
    envelope.gain.setValueAtTime(0.0001, startsAt);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), startsAt + 0.018);
    envelope.gain.exponentialRampToValueAtTime(0.0001, endsAt);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.start(startsAt);
    oscillator.stop(endsAt + 0.025);
  };

  const grind = ({ offset = 0, duration = 0.9, gain = 0.14, frequency = 220 }) => {
    const startsAt = now + offset;
    const endsAt = startsAt + duration;
    const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const samples = buffer.getChannelData(0);
    let previous = 0;

    for (let index = 0; index < frameCount; index += 1) {
      const noise = (Math.random() * 2) - 1;
      previous = (previous * 0.72) + (noise * 0.28);
      samples[index] = previous;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(frequency, startsAt);
    filter.frequency.exponentialRampToValueAtTime(Math.max(70, frequency * 0.62), endsAt);
    filter.Q.setValueAtTime(1.15, startsAt);
    envelope.gain.setValueAtTime(0.0001, startsAt);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), startsAt + 0.05);
    envelope.gain.setValueAtTime(Math.max(0.0002, gain * 0.82), endsAt - 0.08);
    envelope.gain.exponentialRampToValueAtTime(0.0001, endsAt);
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(master);
    source.start(startsAt);
    source.stop(endsAt + 0.02);
  };

  const gearTicks = ({ count, interval, gain, startFrequency, offset = 0 }) => {
    for (let index = 0; index < count; index += 1) {
      const tickOffset = offset + (index * interval);
      strike({
        offset: tickOffset,
        frequency: startFrequency + ((index % 3) * 42),
        endFrequency: 118 + ((index % 2) * 24),
        duration: 0.065,
        gain,
        type: "square",
      });
    }
  };

  if (phase === "exit") {
    strike({ frequency: 78, endFrequency: 46, duration: 0.92, gain: 0.38 });
    grind({ duration: 0.92, gain: 0.18, frequency: 245 });
    gearTicks({ count: 8, interval: 0.11, gain: 0.2, startFrequency: 176, offset: 0.03 });
    strike({ offset: 0.08, frequency: 196, endFrequency: 188, duration: 1.05, gain: 0.15 });
    strike({ offset: 0.12, frequency: 293.66, endFrequency: 282, duration: 0.9, gain: 0.09, type: "sine" });
    return;
  }

  if (phase === "monitor") {
    strike({ frequency: 172, endFrequency: 96, duration: 0.22, gain: 0.25, type: "square" });
    grind({ offset: 0.08, duration: 0.92, gain: 0.13, frequency: 340 });
    gearTicks({ count: 8, interval: 0.12, gain: 0.16, startFrequency: 228, offset: 0.08 });
    strike({ offset: 0.94, frequency: 74, endFrequency: 42, duration: 0.34, gain: 0.44 });
    strike({ offset: 1.02, frequency: 392, endFrequency: 352, duration: 0.28, gain: 0.1, type: "sine" });
    return;
  }

  if (phase === "mompy") {
    strike({ frequency: 146.83, endFrequency: 293.66, duration: 0.3, gain: 0.14, type: "sine" });
    strike({ offset: 0.12, frequency: 220, endFrequency: 440, duration: 0.32, gain: 0.11, type: "triangle" });
    strike({ offset: 0.28, frequency: 329.63, endFrequency: 659.25, duration: 0.24, gain: 0.08, type: "sine" });
    return;
  }

  strike({ frequency: 116, endFrequency: 58, duration: 0.96, gain: 0.25 });
  grind({ duration: 1.08, gain: 0.17, frequency: 285 });
  gearTicks({ count: 9, interval: 0.105, gain: 0.18, startFrequency: 194, offset: 0.02 });
  strike({ offset: 0.02, frequency: 261.63, endFrequency: 248, duration: 1.12, gain: 0.16 });
  strike({ offset: 0.24, frequency: 196, endFrequency: 184, duration: 0.92, gain: 0.17 });
  strike({ offset: 0.78, frequency: 52, endFrequency: 36, duration: 0.5, gain: 0.48 });
  strike({ offset: 0.8, frequency: 104, endFrequency: 62, duration: 0.34, gain: 0.22, type: "square" });
}

const classroomEnvironmentAudio = {
  active: false,
  generation: 0,
  machineMaster: null,
  machineSources: [],
  sparkTimer: null,
  weldAudio: null,
  weldCycleStartedAt: 0,
  machineTimer: null,
  recordedTracks: null,
  recordedFadeTimer: null,
};

const CLASSROOM_WELD_INITIAL_DELAY = 402;
const CLASSROOM_WELD_CYCLE_DELAY = 1800;

function ensureClassroomRecordedTracks() {
  if (classroomEnvironmentAudio.recordedTracks) {
    return classroomEnvironmentAudio.recordedTracks;
  }

  const createTrack = (source, channel, mix) => {
    const audio = new Audio(source);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    return {
      audio,
      channel,
      mix,
      starting: false,
      resetWhenSilent: false,
    };
  };

  classroomEnvironmentAudio.recordedTracks = [
    createTrack(ASSETS.classroomIndustrialLoop, "music", 0.5),
    createTrack(ASSETS.classroomComputersLoop, "music", 0.26),
    createTrack(ASSETS.classroomElectricalLoop, "sfx", 0.1),
    createTrack(ASSETS.classroomRelaysLoop, "sfx", 0.16),
  ];

  return classroomEnvironmentAudio.recordedTracks;
}

function classroomRecordedTarget(track) {
  if (!classroomEnvironmentAudio.active || document.hidden || !audioManager.unlocked) {
    return 0;
  }

  if (track.channel === "music") {
    return audioManager.musicEnabled
      ? Math.min(1, audioManager.musicVolume * track.mix)
      : 0;
  }

  return audioManager.sfxEnabled
    ? Math.min(1, audioManager.sfxVolume * track.mix)
    : 0;
}

function syncClassroomRecordedAudio({ immediate = false, resetWhenSilent = false } = {}) {
  const tracks = ensureClassroomRecordedTracks();
  window.clearInterval(classroomEnvironmentAudio.recordedFadeTimer);
  classroomEnvironmentAudio.recordedFadeTimer = null;

  tracks.forEach((track) => {
    track.resetWhenSilent = track.resetWhenSilent || resetWhenSilent;
  });

  const update = () => {
    let settled = true;

    tracks.forEach((track) => {
      const target = classroomRecordedTarget(track);
      const current = track.audio.volume;
      const difference = target - current;
      const next = immediate || Math.abs(difference) <= 0.008
        ? target
        : current + (Math.sign(difference) * 0.008);

      track.audio.volume = Math.max(0, Math.min(1, next));

      if (target > 0 && track.audio.paused && !track.starting) {
        track.starting = true;
        track.audio.play()
          .catch(() => {})
          .finally(() => {
            track.starting = false;
          });
      }

      if (target === 0 && track.audio.volume <= 0.001) {
        track.audio.pause();
        track.audio.volume = 0;
        if (track.resetWhenSilent) {
          try {
            track.audio.currentTime = 0;
          } catch (error) {
            console.warn(error);
          }
          track.resetWhenSilent = false;
        }
      }

      if (Math.abs(track.audio.volume - target) > 0.001) {
        settled = false;
      }
    });

    if (settled && classroomEnvironmentAudio.recordedFadeTimer) {
      window.clearInterval(classroomEnvironmentAudio.recordedFadeTimer);
      classroomEnvironmentAudio.recordedFadeTimer = null;
    }

    return settled;
  };

  if (!update()) {
    classroomEnvironmentAudio.recordedFadeTimer = window.setInterval(update, 48);
  }
}

function pauseClassroomRecordedAudio({ reset = false } = {}) {
  window.clearInterval(classroomEnvironmentAudio.recordedFadeTimer);
  classroomEnvironmentAudio.recordedFadeTimer = null;

  ensureClassroomRecordedTracks().forEach((track) => {
    track.audio.pause();
    track.audio.volume = 0;
    track.starting = false;
    track.resetWhenSilent = false;
    if (reset) {
      try {
        track.audio.currentTime = 0;
      } catch (error) {
        console.warn(error);
      }
    }
  });
}

function createClassroomNoiseBuffer(context, duration, { brown = false } = {}) {
  const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const samples = buffer.getChannelData(0);
  let previous = 0;

  for (let index = 0; index < frameCount; index += 1) {
    const white = (Math.random() * 2) - 1;
    if (brown) {
      previous = (previous * 0.985) + (white * 0.015);
      samples[index] = Math.max(-1, Math.min(1, previous * 5.2));
    } else {
      samples[index] = white;
    }
  }

  return buffer;
}

function stopClassroomMachineSources({ immediate = false } = {}) {
  const context = classroomMechanismAudioContext;
  const master = classroomEnvironmentAudio.machineMaster;
  const sources = classroomEnvironmentAudio.machineSources;

  classroomEnvironmentAudio.machineMaster = null;
  classroomEnvironmentAudio.machineSources = [];
  window.clearTimeout(classroomEnvironmentAudio.machineTimer);
  classroomEnvironmentAudio.machineTimer = null;

  if (!context || !master) {
    return;
  }

  const now = context.currentTime;
  const release = immediate ? 0.015 : 0.48;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), now);
  master.gain.exponentialRampToValueAtTime(0.0001, now + release);

  window.setTimeout(() => {
    sources.forEach((source) => {
      try {
        source.stop();
      } catch (error) {
        // The source may already have reached its scheduled ending.
      }
      try {
        source.disconnect();
      } catch (error) {
        // A disconnected Web Audio node needs no further cleanup.
      }
    });
    try {
      master.disconnect();
    } catch (error) {
      // The master may already be disconnected during page shutdown.
    }
  }, Math.ceil((release + 0.08) * 1000));
}

function playClassroomMachineRattle() {
  if (
    !classroomEnvironmentAudio.active
    || !audioManager.musicEnabled
    || audioManager.musicVolume <= 0
    || document.hidden
  ) {
    return;
  }

  const context = prepareClassroomAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime + 0.012;
  const master = context.createGain();
  const panner = typeof context.createStereoPanner === "function" ? context.createStereoPanner() : null;
  master.gain.setValueAtTime(Math.max(0.0001, audioManager.musicVolume * 0.17), now);
  if (panner) {
    panner.pan.setValueAtTime((Math.random() * 0.5) - 0.25, now);
    master.connect(panner);
    panner.connect(context.destination);
  } else {
    master.connect(context.destination);
  }

  const hitCount = 2 + Math.floor(Math.random() * 3);
  for (let index = 0; index < hitCount; index += 1) {
    const startsAt = now + (index * (0.055 + (Math.random() * 0.045)));
    const endsAt = startsAt + 0.11 + (Math.random() * 0.08);
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = index % 2 ? "triangle" : "square";
    oscillator.frequency.setValueAtTime(105 + (Math.random() * 95), startsAt);
    oscillator.frequency.exponentialRampToValueAtTime(48 + (Math.random() * 32), endsAt);
    envelope.gain.setValueAtTime(0.0001, startsAt);
    envelope.gain.exponentialRampToValueAtTime(0.17 - (index * 0.018), startsAt + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.0001, endsAt);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.start(startsAt);
    oscillator.stop(endsAt + 0.02);
  }
}

function scheduleClassroomMachineRattle(initialDelay = null) {
  window.clearTimeout(classroomEnvironmentAudio.machineTimer);
  classroomEnvironmentAudio.machineTimer = null;

  if (
    !classroomEnvironmentAudio.active
    || !audioManager.musicEnabled
    || audioManager.musicVolume <= 0
    || document.hidden
  ) {
    return;
  }

  const generation = classroomEnvironmentAudio.generation;
  const delay = initialDelay ?? (3600 + (Math.random() * 4700));
  classroomEnvironmentAudio.machineTimer = window.setTimeout(() => {
    if (!classroomEnvironmentAudio.active || generation !== classroomEnvironmentAudio.generation) {
      return;
    }
    playClassroomMachineRattle();
    scheduleClassroomMachineRattle();
  }, delay);
}

function startClassroomMachineAmbience() {
  if (
    classroomEnvironmentAudio.machineMaster
    || !classroomEnvironmentAudio.active
    || !audioManager.musicEnabled
    || audioManager.musicVolume <= 0
    || document.hidden
  ) {
    return;
  }

  const context = prepareClassroomAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime + 0.015;
  const master = context.createGain();
  const motorBus = context.createGain();
  const lowpass = context.createBiquadFilter();
  const motor = context.createOscillator();
  const harmonic = context.createOscillator();
  const motorGain = context.createGain();
  const harmonicGain = context.createGain();
  const ventilation = context.createBufferSource();
  const ventilationFilter = context.createBiquadFilter();
  const ventilationGain = context.createGain();
  const lfo = context.createOscillator();
  const lfoDepth = context.createGain();

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(
    Math.max(0.0002, audioManager.musicVolume * 0.55),
    now + 1.25,
  );
  master.connect(context.destination);

  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(510, now);
  lowpass.Q.setValueAtTime(0.74, now);
  motorBus.gain.setValueAtTime(0.72, now);
  motorBus.connect(lowpass);
  lowpass.connect(master);

  motor.type = "sawtooth";
  motor.frequency.setValueAtTime(43.5, now);
  motorGain.gain.setValueAtTime(0.12, now);
  motor.connect(motorGain);
  motorGain.connect(motorBus);

  harmonic.type = "sine";
  harmonic.frequency.setValueAtTime(87.2, now);
  harmonic.detune.setValueAtTime(-7, now);
  harmonicGain.gain.setValueAtTime(0.075, now);
  harmonic.connect(harmonicGain);
  harmonicGain.connect(motorBus);

  ventilation.buffer = createClassroomNoiseBuffer(context, 3.4, { brown: true });
  ventilation.loop = true;
  ventilationFilter.type = "bandpass";
  ventilationFilter.frequency.setValueAtTime(215, now);
  ventilationFilter.Q.setValueAtTime(0.68, now);
  ventilationGain.gain.setValueAtTime(0.2, now);
  ventilation.connect(ventilationFilter);
  ventilationFilter.connect(ventilationGain);
  ventilationGain.connect(motorBus);

  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.31, now);
  lfoDepth.gain.setValueAtTime(0.085, now);
  lfo.connect(lfoDepth);
  lfoDepth.connect(motorBus.gain);

  [motor, harmonic, ventilation, lfo].forEach((source) => source.start(now));
  classroomEnvironmentAudio.machineMaster = master;
  classroomEnvironmentAudio.machineSources = [motor, harmonic, ventilation, lfo];
  scheduleClassroomMachineRattle(2300 + (Math.random() * 1600));
}

function syncClassroomMachineAmbience() {
  syncClassroomRecordedAudio();
}

function ensureClassroomWeldAudio() {
  if (!classroomEnvironmentAudio.weldAudio) {
    const audio = new Audio(ASSETS.classroomWeldContact);
    audio.preload = "auto";
    audio.loop = false;
    classroomEnvironmentAudio.weldAudio = audio;
  }
  return classroomEnvironmentAudio.weldAudio;
}

function stopClassroomWeldAudio({ reset = true } = {}) {
  const audio = classroomEnvironmentAudio.weldAudio;
  if (!audio) {
    return;
  }
  audio.pause();
  if (reset) {
    try {
      audio.currentTime = 0;
    } catch (error) {
      console.warn(error);
    }
  }
}

function playClassroomWeldContact() {
  if (
    !classroomEnvironmentAudio.active
    || !audioManager.sfxEnabled
    || audioManager.sfxVolume <= 0
    || document.hidden
  ) {
    return;
  }

  const audio = ensureClassroomWeldAudio();
  audio.pause();
  audio.volume = Math.max(0, Math.min(0.42, audioManager.sfxVolume * 0.36));
  try {
    audio.currentTime = 0;
  } catch (error) {
    console.warn(error);
  }
  audio.play().catch(() => {});
}

function scheduleClassroomSpark(delay = null) {
  window.clearTimeout(classroomEnvironmentAudio.sparkTimer);
  classroomEnvironmentAudio.sparkTimer = null;

  if (
    !classroomEnvironmentAudio.active
    || !audioManager.sfxEnabled
    || audioManager.sfxVolume <= 0
    || !settingsState.mompyAnimations
    || prefersReducedMotion()
    || document.hidden
  ) {
    return;
  }

  const generation = classroomEnvironmentAudio.generation;
  const elapsed = classroomEnvironmentAudio.weldCycleStartedAt
    ? (performance.now() - classroomEnvironmentAudio.weldCycleStartedAt) % CLASSROOM_WELD_CYCLE_DELAY
    : 0;
  const nextContactDelay = elapsed < CLASSROOM_WELD_INITIAL_DELAY
    ? CLASSROOM_WELD_INITIAL_DELAY - elapsed
    : CLASSROOM_WELD_CYCLE_DELAY - elapsed + CLASSROOM_WELD_INITIAL_DELAY;
  const resolvedDelay = delay ?? Math.max(0, nextContactDelay);
  classroomEnvironmentAudio.sparkTimer = window.setTimeout(() => {
    if (!classroomEnvironmentAudio.active || generation !== classroomEnvironmentAudio.generation) {
      return;
    }
    playClassroomWeldContact();
    scheduleClassroomSpark(CLASSROOM_WELD_CYCLE_DELAY);
  }, resolvedDelay);
}

function syncClassroomSparkAudio() {
  syncClassroomRecordedAudio();
  const audio = ensureClassroomWeldAudio();
  audio.volume = Math.max(0, Math.min(0.42, audioManager.sfxVolume * 0.36));
  const canPlay = (
    classroomEnvironmentAudio.active
    && audioManager.sfxEnabled
    && audioManager.sfxVolume > 0
    && settingsState.mompyAnimations
    && !prefersReducedMotion()
    && !document.hidden
  );
  if (!canPlay) {
    window.clearTimeout(classroomEnvironmentAudio.sparkTimer);
    classroomEnvironmentAudio.sparkTimer = null;
    stopClassroomWeldAudio();
  } else if (!classroomEnvironmentAudio.sparkTimer) {
    scheduleClassroomSpark();
  }
}

function startClassroomEnvironmentAudio() {
  classroomEnvironmentAudio.active = true;
  classroomEnvironmentAudio.generation += 1;
  classroomEnvironmentAudio.weldCycleStartedAt = performance.now();
  machine.dataset.classroomAudio = "active";
  pauseClassroomRecordedAudio({ reset: true });
  stopClassroomWeldAudio();
  ensureClassroomWeldAudio().load();
  syncClassroomRecordedAudio();
  scheduleClassroomSpark();
}

function stopClassroomEnvironmentAudio({ immediate = false } = {}) {
  classroomEnvironmentAudio.active = false;
  classroomEnvironmentAudio.generation += 1;
  delete machine.dataset.classroomAudio;
  window.clearTimeout(classroomEnvironmentAudio.sparkTimer);
  classroomEnvironmentAudio.sparkTimer = null;
  stopClassroomWeldAudio();
  stopClassroomMachineSources({ immediate });
  if (immediate) {
    pauseClassroomRecordedAudio({ reset: true });
  } else {
    syncClassroomRecordedAudio({ resetWhenSilent: true });
  }
}

function suspendClassroomEnvironmentAudio() {
  if (!classroomEnvironmentAudio.active) {
    return;
  }
  machine.dataset.classroomAudio = "suspended";
  window.clearTimeout(classroomEnvironmentAudio.sparkTimer);
  classroomEnvironmentAudio.sparkTimer = null;
  stopClassroomWeldAudio();
  stopClassroomMachineSources({ immediate: true });
  pauseClassroomRecordedAudio();
}

function resumeClassroomEnvironmentAudio() {
  if (!classroomEnvironmentAudio.active) {
    return;
  }
  machine.dataset.classroomAudio = "active";
  classroomEnvironmentAudio.weldCycleStartedAt = performance.now();
  syncClassroomRecordedAudio();
  scheduleClassroomSpark();
}

const LOADING_RUNNER_FRAMES = [
  "./assets/loading/mompy-run-01.png?v=2",
  "./assets/loading/mompy-run-02-v3.png?v=1",
  "./assets/loading/mompy-run-03-v3.png?v=1",
  "./assets/loading/mompy-run-04-v3.png?v=1",
  "./assets/loading/mompy-run-05.png?v=2",
];

LOADING_RUNNER_FRAMES.forEach((source) => {
  const frame = new Image();
  frame.src = source;
});

function setLoadingProgress(value) {
  const safeValue = Math.max(0, Math.min(Number(value) || 0, 100));

  if (loadingProgress) {
    loadingProgress.style.width = `${safeValue}%`;
  }

  if (loadingRunner) {
    loadingRunner.style.left = `${safeValue}%`;
  }
}

function stopLoadingRunnerAnimation() {
  clearInterval(loadingRunnerTimer);
  loadingRunnerTimer = null;
}

function startLoadingRunnerAnimation() {
  if (!loadingRunner) {
    return;
  }

  stopLoadingRunnerAnimation();
  loadingRunnerFrameIndex = 0;
  loadingRunner.src = LOADING_RUNNER_FRAMES[loadingRunnerFrameIndex];
  loadingRunnerTimer = setInterval(() => {
    loadingRunnerFrameIndex = (loadingRunnerFrameIndex + 1) % LOADING_RUNNER_FRAMES.length;
    loadingRunner.src = LOADING_RUNNER_FRAMES[loadingRunnerFrameIndex];
  }, 115);
}

function showLoadingScreen() {
  if (!loadingScreen) {
    return;
  }

  clearInterval(loadingInterval);
  clearTimeout(loadingDoneTimer);
  stopLoadingRunnerAnimation();
  loadingScreen.hidden = false;
  loadingScreen.classList.remove("is-intro", "is-intro-out", "is-branding", "is-branding-out", "is-loading");
  setLoadingProgress(0);
}

function hideLoadingScreen() {
  clearInterval(loadingInterval);
  clearTimeout(loadingDoneTimer);
  stopLoadingRunnerAnimation();
  loadingInterval = null;
  loadingDoneTimer = null;

  if (loadingScreen) {
    loadingScreen.hidden = true;
    loadingScreen.classList.remove("is-intro", "is-intro-out", "is-branding", "is-branding-out", "is-loading");
  }
}

function clearHepteraktBootTimers() {
  hepteraktBootTimers.forEach((timer) => clearTimeout(timer));
  hepteraktBootTimers = [];
}

function showMompyBoot(onComplete) {
  if (!loadingScreen) {
    onComplete();
    return;
  }

  clearHepteraktBootTimers();
  showLoadingScreen();
  audioManager.stopAmbientMusic();
  stopStartScreenMompyAnimation();
  loadingScreen.classList.add("is-intro");

  hepteraktBootTimers.push(
    setTimeout(() => {
      loadingScreen.classList.add("is-intro-out");
    }, 1100),
  );

  hepteraktBootTimers.push(
    setTimeout(() => {
      loadingScreen.classList.remove("is-intro", "is-intro-out");
      onComplete();
    }, 2050),
  );
}

function showHepteraktBoot(onComplete) {
  if (!loadingScreen || !loadingBranding) {
    onComplete();
    return;
  }

  clearHepteraktBootTimers();
  showLoadingScreen();
  audioManager.stopAmbientMusic();
  stopStartScreenMompyAnimation();
  loadingScreen.classList.add("is-branding");

  hepteraktBootTimers.push(
    setTimeout(() => {
      loadingScreen.classList.add("is-branding-out");
    }, 1800),
  );

  hepteraktBootTimers.push(
    setTimeout(() => {
      hideHepteraktBoot();
      onComplete();
    }, 2500),
  );
}

function hideHepteraktBoot() {
  clearHepteraktBootTimers();

  if (loadingScreen) {
    loadingScreen.classList.remove("is-branding", "is-branding-out");
  }
}

function continueAfterHepteraktBoot() {
  if (!loadingScreen || !loadingProgress) {
    showStartScreen();
    return;
  }

  let value = 0;
  audioManager.stopAmbientMusic();
  showLoadingScreen();
  loadingScreen.classList.add("is-loading");
  startLoadingRunnerAnimation();
  stopStartScreenMompyAnimation();

  loadingInterval = setInterval(() => {
    value += Math.floor(Math.random() * 7) + 4;
    value = Math.min(value, 100);
    setLoadingProgress(value);

    if (value >= 100) {
      clearInterval(loadingInterval);
      loadingInterval = null;
      stopLoadingRunnerAnimation();

      loadingDoneTimer = setTimeout(() => {
        hideLoadingScreen();
        showStartScreen();
      }, 380);
    }
  }, 120);
}

function startLoadingSequence() {
  if (!loadingScreen || !loadingProgress) {
    showStartScreen();
    return;
  }

  showMompyBoot(() => showHepteraktBoot(continueAfterHepteraktBoot));
}

function currentMission() {
  return localizeMission(missions[currentMissionIndex]);
}

function clampMissionIndex(index) {
  const number = Number(index);

  if (!Number.isInteger(number)) {
    return 0;
  }

  return Math.min(Math.max(number, 0), missions.length - 1);
}

function getCurrentMission() {
  return currentMission();
}

function normalizePythonLevelInfo(levelInfo) {
  const level = Number(levelInfo.level) || 1;
  const title = levelInfo.title || "Beginner";
  const xpToNextLevel = Number(levelInfo.xp_to_next_level ?? levelInfo.xpToNextLevel ?? 0);
  const progress = Number(levelInfo.progress);

  return {
    level,
    title,
    label: levelInfo.label || `${String(level).padStart(2, "0")} · ${title}`,
    currentLevelXp: Number(levelInfo.current_level_xp ?? levelInfo.currentLevelXp ?? 0),
    nextLevelXp: Number(levelInfo.next_level_xp ?? levelInfo.nextLevelXp ?? 0),
    xpIntoLevel: Number(levelInfo.xp_into_level ?? levelInfo.xpIntoLevel ?? 0),
    xpToNextLevel,
    progress: Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0,
  };
}

function getFallbackLevelInfo() {
  return {
    level: 1,
    title: "Beginner",
    label: "01 · Beginner",
    currentLevelXp: 0,
    nextLevelXp: 0,
    xpIntoLevel: 0,
    xpToNextLevel: 0,
    progress: 4,
  };
}

function sanitizeCompletedMissionIds(ids) {
  if (!Array.isArray(ids)) {
    return [];
  }

  const validIds = new Set(missions.map((mission) => mission.id));
  return [...new Set(ids.filter((id) => validIds.has(id)))];
}

function sanitizeBriefingIds(ids) {
  if (!Array.isArray(ids)) {
    return [];
  }

  const validIds = new Set(learningBriefings.map((briefing) => briefing.id));
  return [...new Set(ids.filter((id) => validIds.has(id)))];
}

function localDateKey(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sanitizeActiveDates(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return [...new Set(values.filter((value) => (
    typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(Date.parse(`${value}T12:00:00`))
  )))].sort();
}

function getActivityMetrics(values = activeDates) {
  const dates = sanitizeActiveDates(values);
  let activityStreak = 0;
  let runningStreak = 0;
  let previousDay = null;

  dates.forEach((value) => {
    const currentDay = new Date(`${value}T12:00:00`);
    const isConsecutive = previousDay
      && Math.round((currentDay - previousDay) / 86400000) === 1;
    runningStreak = isConsecutive ? runningStreak + 1 : 1;
    activityStreak = Math.max(activityStreak, runningStreak);
    previousDay = currentDay;
  });

  return {
    active_days: dates.length,
    activity_streak: activityStreak,
    active_months: new Set(dates.map((value) => value.slice(0, 7))).size,
  };
}

function buildConsistencyProgress(values = activeDates) {
  const metrics = getActivityMetrics(values);
  return Object.fromEntries(CONSISTENCY_ACHIEVEMENTS.map((achievement) => [
    achievement.id,
    {
      current: Math.min(metrics[achievement.metric] || 0, achievement.target),
      target: achievement.target,
      metric: achievement.metric,
    },
  ]));
}

function earnedConsistencyAchievements(values = activeDates) {
  const progressById = buildConsistencyProgress(values);
  return CONSISTENCY_ACHIEVEMENTS
    .filter(({ id }) => progressById[id].current >= progressById[id].target)
    .map(({ id }) => id);
}

function recordLocalAppOpen() {
  const today = localDateKey();
  if (!activeDates.includes(today)) {
    activeDates = sanitizeActiveDates([...activeDates, today]);
  }

  achievementProgress = buildConsistencyProgress(activeDates);
  const consistencyIds = new Set(CONSISTENCY_ACHIEVEMENTS.map(({ id }) => id));
  earnedAchievements = [
    ...earnedAchievements.filter((id) => !consistencyIds.has(id)),
    ...earnedConsistencyAchievements(activeDates),
  ];
  saveLocalProgress();
}

function loadBriefingProgress() {
  try {
    const rawProgress = localStorage.getItem(BRIEFING_PROGRESS_KEY);

    if (!rawProgress) {
      completedBriefingIds = [];
      skippedBriefingIds = [];
      return;
    }

  const progress = JSON.parse(rawProgress);
    completedBriefingIds = sanitizeBriefingIds(progress.completedBriefingIds);
    skippedBriefingIds = sanitizeBriefingIds(progress.skippedBriefingIds);
  } catch (error) {
    console.warn(error);
    completedBriefingIds = [];
    skippedBriefingIds = [];
  }
}

function saveBriefingProgress() {
  try {
    localStorage.setItem(
      BRIEFING_PROGRESS_KEY,
      JSON.stringify({
        completedBriefingIds: [...completedBriefingIds],
        skippedBriefingIds: [...skippedBriefingIds],
      }),
    );
  } catch (error) {
    console.warn(error);
  }
}

function resetBriefingProgress() {
  resetClassroomStage();
  completedBriefingIds = [];
  skippedBriefingIds = [];
  activeBriefingId = null;
  activeBriefingStepIndex = 0;
  activeBriefingRetry = false;
  clearTimeout(briefingFinalTimer);

  try {
    localStorage.removeItem(BRIEFING_PROGRESS_KEY);
  } catch (error) {
    console.warn(error);
  }
}

function loadProgress() {
  try {
    const rawProgress = localStorage.getItem(PROGRESS_KEY);

    if (!rawProgress) {
      currentMissionIndex = defaultProgressState.currentMissionIndex;
      completedMissionIds = [...defaultProgressState.completedMissionIds];
      totalXp = defaultProgressState.totalXp;
      totalStars = defaultProgressState.totalStars;
      currentStreak = defaultProgressState.currentStreak;
      bestStreak = defaultProgressState.bestStreak;
      activeDates = [...defaultProgressState.activeDates];
      earnedAchievements = [...defaultProgressState.achievements];
      achievementProgress = { ...defaultProgressState.achievementProgress };
      backendLevelInfo = null;
      updateProgressUI();
      return { ...defaultProgressState };
    }

    const progress = JSON.parse(rawProgress);
    currentMissionIndex = clampMissionIndex(progress.currentMissionIndex);
    completedMissionIds = sanitizeCompletedMissionIds(progress.completedMissionIds);
    totalXp = Number(progress.totalXp) || 0;
    totalStars = Number(progress.totalStars) || 0;
    currentStreak = Number(progress.currentStreak) || 0;
    bestStreak = Number(progress.bestStreak) || 0;
    activeDates = sanitizeActiveDates(progress.activeDates || progress.active_dates);
    earnedAchievements = Array.isArray(progress.achievements) ? [...progress.achievements] : [];
    achievementProgress = progress.achievementProgress && typeof progress.achievementProgress === "object"
      ? progress.achievementProgress
      : buildConsistencyProgress(activeDates);
    backendLevelInfo = null;
    updateProgressUI();
    return {
      currentMissionIndex,
      completedMissionIds: [...completedMissionIds],
      totalXp,
      totalStars,
      currentStreak,
      bestStreak,
      activeDates: [...activeDates],
      achievements: [...earnedAchievements],
      achievementProgress: { ...achievementProgress },
      lastUpdatedAt: progress.lastUpdatedAt || null,
    };
  } catch (error) {
    console.warn(error);
    currentMissionIndex = defaultProgressState.currentMissionIndex;
    completedMissionIds = [...defaultProgressState.completedMissionIds];
    totalXp = defaultProgressState.totalXp;
    totalStars = defaultProgressState.totalStars;
    currentStreak = defaultProgressState.currentStreak;
    bestStreak = defaultProgressState.bestStreak;
    activeDates = [...defaultProgressState.activeDates];
    earnedAchievements = [...defaultProgressState.achievements];
    achievementProgress = { ...defaultProgressState.achievementProgress };
    backendLevelInfo = null;
    updateProgressUI();
    return { ...defaultProgressState };
  }
}

function currentProgressPayload() {
  return {
    currentMissionIndex,
    completedMissionIds: [...completedMissionIds],
    totalXp,
    totalStars,
    currentStreak,
    bestStreak,
    activeDates: [...activeDates],
    achievements: [...earnedAchievements],
    achievementProgress: { ...achievementProgress },
    lastUpdatedAt: new Date().toISOString(),
  };
}

function saveLocalProgress(progress = currentProgressPayload()) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn(error);
  }
}

async function syncCurrentMissionToPython() {
  const progress = await callPythonBackend("set_current_mission_index", currentMissionIndex);
  if (progress) {
    applyPythonProgress(progress);
  }
  return progress;
}

async function refreshPythonProgress() {
  const progress = await callPythonBackend("get_progress");
  if (progress) {
    applyPythonProgress(progress);
  }
  return progress;
}

function saveProgress() {
  const progress = currentProgressPayload();

  saveLocalProgress(progress);

  if (pythonBackendConnected) {
    syncCurrentMissionToPython();
  }

  updateProgressUI();
  return progress;
}

async function resetProgress(options = {}) {
  resetRewardCapsulePresentation();
  currentMissionIndex = 0;
  completedMissionIds = [];
  totalXp = 0;
  totalStars = 0;
  currentStreak = 0;
  bestStreak = 0;
  blockProgress = [];
  earnedAchievements = [];
  activeDates = [];
  achievementProgress = {};
  backendLevelInfo = null;
  missionCompleted = false;
  completionPending = false;
  clearTimeout(completionTimer);
  clearMompyScreenMessage();
  resetBriefingProgress();

  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.warn(error);
  }

  updateProgressUI();
  const pythonProgress = await callPythonBackend("reset_progress");
  applyPythonProgress(pythonProgress);

  if (trainingStarted && !options.keepMissionView) {
    openMissionOrBriefing({
      intro: false,
      outputMessage: t("progressResetMissionLoaded"),
    });
  }
}

function hasSavedProgress() {
  if (pythonBackendConnected && (completedMissionIds.length > 0 || currentMissionIndex > 0)) {
    return true;
  }

  try {
    const rawProgress = localStorage.getItem(PROGRESS_KEY);

    if (!rawProgress) {
      return false;
    }

    const progress = JSON.parse(rawProgress);
    const completedIds = sanitizeCompletedMissionIds(progress.completedMissionIds);
    const missionIndex = Number(progress.currentMissionIndex) || 0;
    const xp = Number(progress.totalXp) || 0;

    return completedIds.length > 0 || missionIndex > 0 || xp > 0;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

function updateProgressUI() {
  const levelInfo = backendLevelInfo || getFallbackLevelInfo();
  currentUser.level = levelInfo.label;
  currentUser.levelNumber = levelInfo.level;
  currentUser.xp = totalXp;
  currentUser.xpToNextLevel = levelInfo.xpToNextLevel;
  currentUser.missionsCompleted = completedMissionIds.length;
  currentUser.totalMissions = PLANNED_TOTAL_MISSIONS;
  renderStartUserInfo();

  if (trainingStarted) {
    updateLevelDisplay();
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mompyButtonClasses(variant, ...classNames) {
  return ["mompy-button", `mompy-button--${variant}`, ...classNames]
    .filter(Boolean)
    .join(" ");
}

function emitRewardCapsuleSound(cue, reward) {
  return window.dispatchEvent(new CustomEvent("mompy:reward-capsule-sound", {
    cancelable: true,
    detail: { cue, reward },
  }));
}

class MompyRewardCapsule {
  constructor({
    reward,
    onComplete = () => {},
    onOpen = () => {},
    onReveal = () => {},
    onViewAchievements = null,
    autoClose = false,
  }) {
    this.reward = reward;
    this.onComplete = onComplete;
    this.onOpen = onOpen;
    this.onReveal = onReveal;
    this.onViewAchievements = onViewAchievements;
    this.autoClose = autoClose;
    this.variant = Array.isArray(reward?.new_achievements)
      && reward.new_achievements.some((achievementId) => getAchievementDefinition(achievementId)?.rarity === "legendary")
      ? "legendary"
      : "standard";
    this.state = "closed";
    this.timers = new Set();
    this.root = null;
    this.trigger = null;
    this.frame = null;
    this.hint = null;
    this.status = null;
    this.result = null;
    this.actions = null;
    this.previousFocus = null;
    this.inertTarget = null;
    this.reduceMotion = false;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  mount(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("MompyRewardCapsule needs a valid container.");
    }

    this.previousFocus = document.activeElement;
    this.reduceMotion = shouldReduceMotion();
    this.root = this.buildInterface();
    this.root.classList.toggle("is-reduced-motion", this.reduceMotion);
    this.inertTarget = container.querySelector(":scope > .overlay");

    if (this.inertTarget) {
      this.inertTarget.inert = true;
    }

    container.classList.add("has-reward-capsule");
    container.append(this.root);
    this.root.addEventListener("keydown", this.handleKeydown);
    this.trigger.focus({ preventScroll: true });
  }

  buildInterface() {
    const instanceId = ++rewardCapsuleInstanceId;
    const titleId = `reward-capsule-title-${instanceId}`;
    const hintId = `reward-capsule-hint-${instanceId}`;

    const root = document.createElement("section");
    root.className = "reward-capsule-overlay";
    root.dataset.capsuleState = "closed";
    root.dataset.capsuleVariant = this.variant;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", titleId);
    root.setAttribute("aria-busy", "false");
    root.tabIndex = -1;

    const experience = document.createElement("div");
    experience.className = "reward-capsule-experience";

    const title = document.createElement("h2");
    title.id = titleId;
    title.className = "reward-capsule-title";
    title.textContent = t("newReward");

    this.trigger = document.createElement("button");
    this.trigger.type = "button";
    this.trigger.className = "reward-capsule-trigger";
    this.trigger.setAttribute("aria-label", t("openRewardCapsule"));
    this.trigger.setAttribute("aria-describedby", hintId);
    this.trigger.addEventListener("click", () => this.open());

    const stage = document.createElement("span");
    stage.className = "reward-capsule-stage";

    const glow = document.createElement("span");
    glow.className = "reward-capsule-glow";
    glow.setAttribute("aria-hidden", "true");

    this.frame = document.createElement(this.variant === "legendary" ? "span" : "img");
    this.frame.className = `reward-capsule-frame${this.variant === "legendary" ? " is-legendary" : ""}`;
    this.frame.dataset.capsuleFrame = "closed";
    if (this.frame instanceof HTMLImageElement) {
      this.frame.src = REWARD_CAPSULE_FRAMES.closed;
      this.frame.alt = "";
      this.frame.draggable = false;
    }
    this.frame.setAttribute("aria-hidden", "true");

    const particles = document.createElement("span");
    particles.className = "reward-capsule-particles";
    particles.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 6; index += 1) {
      const particle = document.createElement("span");
      particle.className = `reward-capsule-particle particle-${index + 1}`;
      particles.append(particle);
    }

    stage.append(glow, this.frame, particles);

    this.hint = document.createElement("span");
    this.hint.id = hintId;
    this.hint.className = "reward-capsule-hint";
    this.hint.textContent = t("openRewardCapsuleHint");

    this.trigger.append(stage, this.hint);

    this.status = document.createElement("span");
    this.status.className = "reward-capsule-sr-only";
    this.status.setAttribute("aria-live", "polite");

    this.result = document.createElement("div");
    this.result.className = "reward-capsule-result";
    this.result.hidden = true;

    const resultTitle = document.createElement("p");
    resultTitle.className = "reward-capsule-result-title";
    resultTitle.textContent = t("rewardRevealed");

    const cards = document.createElement("div");
    cards.className = "reward-capsule-cards";
    cards.setAttribute("role", "list");
    cards.setAttribute("aria-label", t("newReward"));
    const achievementIds = Array.isArray(this.reward?.new_achievements)
      ? this.reward.new_achievements
      : [];
    cards.dataset.count = String(achievementIds.length);
    if (achievementIds.length > 2) {
      cards.tabIndex = 0;
    }
    achievementIds.forEach((achievementId) => {
      cards.append(this.buildRewardCard(achievementId));
    });

    this.result.append(resultTitle, cards);

    this.actions = document.createElement("div");
    this.actions.className = "reward-capsule-actions";
    this.actions.hidden = true;

    const continueButton = document.createElement("button");
    continueButton.type = "button";
    continueButton.className = mompyButtonClasses("primary", "reward-capsule-action");
    continueButton.textContent = t("continue");
    continueButton.addEventListener("click", () => this.complete());

    const viewButton = document.createElement("button");
    viewButton.type = "button";
    viewButton.className = mompyButtonClasses("secondary", "reward-capsule-action");
    viewButton.textContent = t("viewAchievements");
    viewButton.addEventListener("click", () => this.viewAchievements());

    this.actions.append(continueButton, viewButton);
    experience.append(title, this.trigger, this.status, this.result, this.actions);
    root.append(experience);
    return root;
  }

  buildRewardCard(achievementId) {
    const definition = getAchievementDefinition(achievementId);
    const rarity = definition?.rarity || "common";
    const card = document.createElement("article");
    card.className = `reward-capsule-card rarity-${rarity}`;
    card.setAttribute("role", "listitem");
    card.setAttribute(
      "aria-label",
      `${t(definition?.titleKey || achievementId)}. ${t("achievementUnlockedStatus")}.`,
    );

    const art = document.createElement("span");
    art.className = "reward-capsule-card-art";
    art.setAttribute("aria-hidden", "true");

    if (Array.isArray(definition?.frames) && definition.frames.length) {
      art.classList.add("is-animated-achievement");
      definition.frames.forEach((source, index) => {
        const image = document.createElement("img");
        image.className = `python-console-frame python-console-frame-${index + 1}`;
        image.src = source;
        image.alt = "";
        image.draggable = false;
        art.append(image);
      });
    } else if (definition?.image) {
      const image = document.createElement("img");
      image.src = definition.image;
      image.alt = "";
      image.draggable = false;
      art.append(image);
    } else {
      const glyph = document.createElement("span");
      glyph.className = "reward-capsule-card-glyph";
      glyph.textContent = definition?.glyph || "★";
      art.append(glyph);
    }

    card.append(art);
    return card;
  }

  schedule(callback, delay) {
    const timer = window.setTimeout(() => {
      this.timers.delete(timer);
      callback();
    }, delay);
    this.timers.add(timer);
  }

  setFrame(state) {
    this.state = state;
    const frameState = state === "revealed" ? "open" : state;
    this.root.dataset.capsuleState = state;
    this.frame.dataset.capsuleFrame = frameState;
    if (this.frame instanceof HTMLImageElement) {
      this.frame.src = REWARD_CAPSULE_FRAMES[frameState];
    }
  }

  open() {
    if (this.state !== "closed") {
      return;
    }

    this.trigger.disabled = true;
    this.trigger.setAttribute("aria-label", t("rewardCapsuleOpening"));
    this.root.setAttribute("aria-busy", "true");
    this.status.textContent = t("rewardCapsuleOpening");
    this.root.focus({ preventScroll: true });

    if (this.reduceMotion) {
      this.setFrame("open");
      emitRewardCapsuleSound("capsuleOpenSound", this.reward);
      this.onOpen(this.reward);
      this.schedule(() => this.reveal(), 100);
      return;
    }

    this.setFrame("unlocking");
    emitRewardCapsuleSound("capsuleUnlockSound", this.reward);
    this.schedule(() => {
      this.setFrame("opening");
      emitRewardCapsuleSound("capsuleOpenSound", this.reward);
      this.schedule(() => {
        this.setFrame("open");
        this.onOpen(this.reward);
        this.schedule(() => this.reveal(), 190);
      }, 160);
    }, 160);
  }

  reveal() {
    if (this.state !== "open") {
      return;
    }

    this.setFrame("revealed");
    this.root.setAttribute("aria-busy", "false");
    this.hint.hidden = true;
    this.result.hidden = false;
    this.actions.hidden = false;
    this.status.textContent = t("rewardRevealed");
    if (emitRewardCapsuleSound("achievementRevealSound", this.reward)) {
      audioManager.playAchievementReveal();
    }
    this.onReveal(this.reward);

    const firstAction = this.actions.querySelector("button");
    firstAction?.focus({ preventScroll: true });

    if (this.autoClose) {
      this.schedule(() => this.complete(), 1600);
    }
  }

  complete() {
    const callback = this.onComplete;
    const reward = this.reward;
    this.destroy();
    callback(reward);
  }

  viewAchievements() {
    const callback = this.onViewAchievements;
    const reward = this.reward;
    this.destroy();
    callback?.(reward);
  }

  handleKeydown(event) {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(this.root.querySelectorAll("button:not(:disabled)"));
    if (!focusable.length) {
      event.preventDefault();
      this.root.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  destroy() {
    this.timers.forEach((timer) => window.clearTimeout(timer));
    this.timers.clear();
    this.root?.removeEventListener("keydown", this.handleKeydown);
    this.root?.remove();
    machine?.classList.remove("has-reward-capsule");

    if (this.inertTarget) {
      this.inertTarget.inert = false;
    }

    if (this.previousFocus instanceof HTMLElement && this.previousFocus.isConnected) {
      this.previousFocus.focus({ preventScroll: true });
    }
  }
}

function shouldPresentRewardCapsule(reward = lastMissionReward) {
  return Boolean(
    reward?.first_completion
    && Array.isArray(reward.new_achievements)
    && reward.new_achievements.length
    && !rewardCapsuleHandled,
  );
}

function resetRewardCapsulePresentation() {
  rewardCapsulePresentationToken += 1;
  rewardCapsulePresentationPending = false;
  rewardCapsuleHandled = false;
  missionRewardSequenceScheduled = false;
  activeRewardCapsule?.destroy();
  activeRewardCapsule = null;
}

async function beginRewardCapsulePresentation() {
  if (activeRewardCapsule || rewardCapsulePresentationPending || !shouldPresentRewardCapsule()) {
    return;
  }

  const token = rewardCapsulePresentationToken;
  const reward = lastMissionReward;
  let capsule = null;
  rewardCapsulePresentationPending = true;

  try {
    await preloadRewardCapsuleFrames();

    if (
      token !== rewardCapsulePresentationToken
      || reward !== lastMissionReward
      || !missionCompleted
      || !shouldPresentRewardCapsule(reward)
    ) {
      return;
    }

    capsule = new MompyRewardCapsule({
      reward,
      onReveal: () => {
        rewardCapsuleHandled = true;
      },
      onComplete: () => {
        if (activeRewardCapsule === capsule) {
          activeRewardCapsule = null;
        }
        rewardCapsuleHandled = true;
        renderMompyCompletionPrompt();
        mompyScreenMessage.hidden = false;
      },
      onViewAchievements: () => {
        if (activeRewardCapsule === capsule) {
          activeRewardCapsule = null;
        }
        rewardCapsuleHandled = true;
        showAchievements();
      },
    });
    activeRewardCapsule = capsule;
    capsule.mount(machine);
  } catch (error) {
    if (activeRewardCapsule === capsule) {
      activeRewardCapsule = null;
    }
    capsule?.destroy();
    console.warn("Reward capsule could not be shown; using the normal reward panel.", error);
    if (token === rewardCapsulePresentationToken && reward === lastMissionReward && missionCompleted) {
      renderMompyCompletionPrompt();
      mompyScreenMessage.hidden = false;
    }
  } finally {
    if (token === rewardCapsulePresentationToken) {
      rewardCapsulePresentationPending = false;
    }
  }
}

function runLocalRewardCapsuleTestFromQuery() {
  const isLocalHost = ["localhost", "127.0.0.1"].includes(location.hostname);
  if (!isLocalHost) {
    return;
  }

  const rawTestId = new URLSearchParams(location.search).get("capsuleTest");
  if (!rawTestId) {
    return;
  }

  const aliases = {
    python: "python_console",
    missions: "first_mission",
    standard: "first_mission",
    legendary: "programming_semester",
  };
  const achievementId = aliases[rawTestId] || rawTestId;
  const definition = getAchievementDefinition(achievementId);
  if (!definition) {
    console.warn(`Unknown local capsule test achievement: ${achievementId}`);
    return;
  }

  let attempts = 0;
  const launch = async () => {
    attempts += 1;
    if (!loadingScreen?.hidden) {
      if (attempts < 100) {
        window.setTimeout(launch, 120);
      }
      return;
    }

    try {
      await preloadRewardCapsuleFrames();
      activeRewardCapsule?.destroy();

      const fakeReward = {
        first_completion: true,
        new_achievements: [achievementId],
        stars: 3,
        xp_awarded: 0,
        current_streak: 0,
        local_capsule_test: true,
      };
      let capsule = null;
      const clearActiveCapsule = () => {
        if (activeRewardCapsule === capsule) {
          activeRewardCapsule = null;
        }
      };
      capsule = new MompyRewardCapsule({
        reward: fakeReward,
        onComplete: clearActiveCapsule,
        onViewAchievements: () => {
          clearActiveCapsule();
          showAchievements();
        },
      });
      activeRewardCapsule = capsule;
      capsule.mount(machine);
    } catch (error) {
      console.warn("Local reward capsule test could not be started.", error);
    }
  };

  window.setTimeout(launch, 120);
}

function getBriefingForMission(missionIndex) {
  const briefing = learningBriefings.find((item) => item.beforeMissionIndex === missionIndex) || null;
  return localizeBriefing(briefing);
}

function shouldShowBriefingBeforeMission(missionIndex) {
  const briefing = getBriefingForMission(missionIndex);

  if (!briefing) {
    return false;
  }

  return !completedBriefingIds.includes(briefing.id) && !skippedBriefingIds.includes(briefing.id);
}

function findBriefingById(briefingId) {
  const briefing = learningBriefings.find((item) => item.id === briefingId) || null;
  return localizeBriefing(briefing);
}

function getClassroomBriefingExample() {
  const examples = CLASSROOM_BRIEFING_EXAMPLES[activeBriefingId];
  return examples?.[currentLanguage] || examples?.["en-US"] || null;
}

function normalizePythonClassroomLesson(lesson) {
  if (!lesson || typeof lesson !== "object" || !Array.isArray(lesson.steps)) {
    return null;
  }

  const defaultPresentationTypes = {
    question: "choice",
    recap: "summary",
    demo: "run",
  };
  return {
    ...lesson,
    steps: lesson.steps.map((step) => {
      const presentationType = step.presentationType
        || defaultPresentationTypes[step.type]
        || step.type;
      const choices = step.choices || step.assessment?.choices?.map((choice) => ({
        id: choice.id,
        text: choice.text,
        code: choice.code,
      }));
      const sequenceItems = step.sequenceItems || step.assessment?.items?.map((item) => ({
        id: item.id,
        label: item.text,
        detail: Array.isArray(item.body) ? item.body.join(" ") : "",
      }));
      return {
        ...step,
        type: presentationType,
        ...(Array.isArray(choices) ? { choices } : {}),
        ...(Array.isArray(sequenceItems)
          ? { sequenceItems, sequenceLength: sequenceItems.length }
          : {}),
      };
    }),
  };
}

function getRichClassroomLesson(briefingId = activeBriefingId) {
  const localLesson = window.MOMPY_CLASSROOM_LESSONS?.[briefingId];
  const currentLocalLesson = localLesson?.[currentLanguage] || localLesson?.["en-US"] || null;
  if (currentLocalLesson) {
    return currentLocalLesson;
  }

  const backendLessons = pythonClassroomLessonPayload?.lessons;
  const backendRecord = Array.isArray(backendLessons)
    ? backendLessons.find((item) => item?.id === briefingId)
    : backendLessons?.[briefingId];
  if (backendRecord?.steps && (!backendRecord.locale || backendRecord.locale === currentLanguage)) {
    const normalized = normalizePythonClassroomLesson(backendRecord);
    if (normalized) {
      return normalized;
    }
  }
  const backendLocales = backendRecord?.locales || backendRecord;
  const backendLesson = backendLocales?.[currentLanguage] || backendLocales?.["en-US"] || null;
  if (backendLesson) {
    return normalizePythonClassroomLesson(backendLesson) || backendLesson;
  }
  return null;
}

function createClassroomNode(tagName, className = "", text = "") {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== "") {
    element.textContent = text;
  }
  return element;
}

function startClassroomSyntaxAnimation(scene, payload = {}) {
  if (!scene || !activeRichLessonState) {
    return;
  }

  const code = String(payload.code || 'print("Olá, Mompy!")');
  const functionChunk = "print(";
  const stringChunk = code.startsWith(functionChunk) && code.endsWith(")")
    ? code.slice(functionChunk.length, -1)
    : '"Olá, Mompy!"';
  const timings = {
    idle: 500,
    typingFunction: 600,
    typingString: 900,
    closingSyntax: 250,
    validating: 500,
    valid: 1200,
    reset: 300,
    ...(payload.timings || {}),
  };
  const controller = {
    cancelled: false,
    timer: null,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
  };
  activeRichLessonState.syntaxDemo = controller;

  const codeBox = scene.querySelector(".mompy-syntax-code-box");
  const functionToken = scene.querySelector(".mompy-syntax-token--function");
  const openParenthesis = scene.querySelector(".mompy-syntax-parenthesis-open");
  const stringToken = scene.querySelector(".mompy-syntax-token--string");
  const closeParenthesis = scene.querySelector(".mompy-syntax-parenthesis-close");
  const cursor = scene.querySelector(".mompy-syntax-cursor");
  const scan = scene.querySelector(".mompy-syntax-scan");
  const badge = scene.querySelector(".mompy-syntax-valid-badge");
  const functionAnnotation = scene.querySelector(".mompy-syntax-annotation--function");
  const stringAnnotation = scene.querySelector(".mompy-syntax-annotation--string");
  const parenthesesAnnotation = scene.querySelector(".mompy-syntax-annotation--parentheses");
  const accessibleCode = scene.querySelector(".mompy-syntax-sr-only");
  let visibleCode = "";
  let stage = "idle";

  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.syntaxDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );

  const schedule = (callback, delay) => {
    window.clearTimeout(controller.timer);
    controller.timer = window.setTimeout(() => {
      controller.timer = null;
      if (isCurrent()) {
        callback();
      }
    }, Math.max(0, Number(delay) || 0));
  };

  const renderState = (nextStage = stage) => {
    stage = nextStage;
    const functionText = visibleCode.slice(0, 5);
    const hasOpenParenthesis = visibleCode.length >= functionChunk.length;
    const hasClosingParenthesis = visibleCode === code;
    const stringText = visibleCode.slice(
      functionChunk.length,
      hasClosingParenthesis ? -1 : undefined,
    );
    const functionIdentified = functionText === "print";
    const stringIdentified = stringText.startsWith('"');
    const showCursor = ["idle", "typing-function", "typing-string", "closing-syntax"].includes(stage);
    const showValidResult = stage === "valid" || stage === "reset";

    scene.dataset.stage = stage;
    scene.classList.toggle("mompy-syntax-demo--resetting", stage === "reset");
    codeBox?.classList.toggle("mompy-syntax-code-box--valid", showValidResult);
    if (functionToken) functionToken.textContent = functionText;
    if (openParenthesis) openParenthesis.textContent = hasOpenParenthesis ? "(" : "";
    if (stringToken) stringToken.textContent = stringText;
    if (closeParenthesis) closeParenthesis.textContent = hasClosingParenthesis ? ")" : "";
    functionToken?.classList.toggle("mompy-syntax-token--identified", functionIdentified);
    functionToken?.classList.toggle("mompy-syntax-token--active", stage === "typing-function");
    stringToken?.classList.toggle("mompy-syntax-token--identified", stringIdentified);
    stringToken?.classList.toggle("mompy-syntax-token--active", stage === "typing-string");
    [openParenthesis, closeParenthesis].forEach((token) => {
      token?.classList.toggle("mompy-syntax-token--identified", hasClosingParenthesis);
      token?.classList.toggle("mompy-syntax-token--parenthesis-active", stage === "closing-syntax");
    });
    if (cursor) cursor.hidden = !showCursor;
    if (scan) scan.hidden = stage !== "validating";
    badge?.classList.toggle("mompy-syntax-valid-badge--visible", showValidResult);
    badge?.setAttribute("aria-hidden", String(!showValidResult));
    functionAnnotation?.classList.toggle("mompy-syntax-annotation--visible", functionIdentified);
    stringAnnotation?.classList.toggle("mompy-syntax-annotation--visible", stringIdentified);
    parenthesesAnnotation?.classList.toggle("mompy-syntax-annotation--visible", hasClosingParenthesis);
    if (accessibleCode) {
      accessibleCode.textContent = visibleCode || (payload.waitingLabel || "Cursor aguardando");
    }
  };

  const typeChunk = (chunk, totalDuration, onComplete) => {
    const characters = Array.from(chunk);
    const delay = Math.max(1, totalDuration / Math.max(1, characters.length));
    let index = 0;
    const typeNext = () => {
      if (!isCurrent()) return;
      if (index >= characters.length) {
        onComplete();
        return;
      }
      visibleCode += characters[index];
      index += 1;
      renderState();
      schedule(typeNext, delay);
    };
    typeNext();
  };

  const runTimeline = () => {
    visibleCode = "";
    renderState("idle");
    schedule(() => {
      renderState("typing-function");
      typeChunk(functionChunk, timings.typingFunction, () => {
        renderState("typing-string");
        typeChunk(stringChunk, timings.typingString, () => {
          visibleCode = code;
          renderState("closing-syntax");
          schedule(() => {
            renderState("validating");
            schedule(() => {
              renderState("valid");
              schedule(() => {
                renderState("reset");
                schedule(runTimeline, timings.reset);
              }, timings.valid);
            }, timings.validating);
          }, timings.closingSyntax);
        });
      });
    }, timings.idle);
  };

  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    visibleCode = code;
    renderState("valid");
    return;
  }

  runTimeline();
}

function startClassroomStringValueAnimation(scene, payload = {}) {
  if (!scene || !activeRichLessonState) {
    return;
  }

  const text = String(payload.text || "Olá, Mompy!");
  const controller = {
    cancelled: false,
    timer: null,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
  };
  activeRichLessonState.stringValueDemo = controller;

  const openingQuote = scene.querySelector(".mompy-string-opening-quote");
  const closingQuote = scene.querySelector(".mompy-string-closing-quote");
  const stringText = scene.querySelector(".mompy-string-text");
  const cursor = scene.querySelector(".mompy-string-cursor");
  const delimiter = scene.querySelector(".mompy-string-delimiter");
  const explanation = scene.querySelector(".mompy-string-explanation");
  const accessibleText = scene.querySelector(".mompy-string-sr-only");
  let phase = "idle";
  let typed = "";

  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.stringValueDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );

  const schedule = (callback, delay) => {
    window.clearTimeout(controller.timer);
    controller.timer = window.setTimeout(() => {
      controller.timer = null;
      if (isCurrent()) {
        callback();
      }
    }, Math.max(0, Number(delay) || 0));
  };

  const renderState = (nextPhase = phase) => {
    phase = nextPhase;
    const showOpening = phase !== "idle";
    const showClosing = ["closed", "highlight", "delimited", "explained"].includes(phase);
    const highlight = ["highlight", "delimited", "explained"].includes(phase);
    scene.dataset.phase = phase;
    if (openingQuote) openingQuote.textContent = showOpening ? '"' : "";
    if (closingQuote) closingQuote.textContent = showClosing ? '"' : "";
    if (stringText) stringText.textContent = typed;
    openingQuote?.classList.toggle("mompy-string-quote-active", highlight);
    closingQuote?.classList.toggle("mompy-string-quote-active", highlight);
    if (cursor) cursor.hidden = ["closed", "highlight", "delimited", "explained"].includes(phase);
    delimiter?.classList.toggle(
      "mompy-string-delimiter-visible",
      phase === "delimited" || phase === "explained",
    );
    explanation?.classList.toggle("mompy-string-explanation-visible", phase === "explained");
    if (accessibleText) {
      accessibleText.textContent = showOpening ? `"${typed}${showClosing ? '"' : ""}` : "";
    }
  };

  const start = () => {
    typed = "";
    renderState("idle");
    schedule(() => {
      renderState("opening");
      schedule(() => {
        renderState("typing");
        const characters = Array.from(text);
        let index = 0;
        const typeNext = () => {
          if (!isCurrent()) return;
          if (index < characters.length) {
            typed += characters[index];
            index += 1;
            renderState("typing");
            schedule(typeNext, 90);
            return;
          }
          schedule(() => {
            renderState("closed");
            schedule(() => {
              renderState("highlight");
              schedule(() => {
                renderState("delimited");
                schedule(() => {
                  renderState("explained");
                  schedule(start, 1500);
                }, 350);
              }, 420);
            }, 260);
          }, 220);
        };
        typeNext();
      }, 220);
    }, 450);
  };

  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    typed = text;
    renderState("explained");
    return;
  }

  start();
}

function startClassroomPrintFunctionAnimation(scene, payload = {}) {
  if (!scene || !activeRichLessonState) {
    return;
  }

  const codeValue = String(payload.code || 'print("Olá, Mompy!")');
  const outputValue = String(payload.output || "Olá, Mompy!");
  const controller = {
    cancelled: false,
    timer: null,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
  };
  activeRichLessonState.printFunctionDemo = controller;

  const code = scene.querySelector(".mompy-print-code");
  const cursor = scene.querySelector(".mompy-print-cursor");
  const scanbar = scene.querySelector(".mompy-print-scanbar");
  const output = scene.querySelector(".mompy-print-output");
  const resultLabel = scene.querySelector(".mompy-print-label");
  const accessibleText = scene.querySelector(".mompy-print-sr-only");
  let phase = "idle";
  let typed = "";

  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.printFunctionDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );

  const schedule = (callback, delay) => {
    window.clearTimeout(controller.timer);
    controller.timer = window.setTimeout(() => {
      controller.timer = null;
      if (isCurrent()) {
        callback();
      }
    }, Math.max(0, Number(delay) || 0));
  };

  const renderState = (nextPhase = phase) => {
    phase = nextPhase;
    const executing = phase === "executing";
    const showOutput = phase === "output" || phase === "labeled";
    const showLabel = phase === "labeled";
    scene.dataset.phase = phase;
    if (code) code.textContent = typed;
    if (cursor) cursor.hidden = executing || showOutput;
    code?.classList.toggle("mompy-print-execute", executing);
    scanbar?.classList.toggle("mompy-print-scanbar-go", executing);
    output?.classList.toggle("mompy-print-output-show", showOutput);
    resultLabel?.classList.toggle("mompy-print-label-show", showLabel);
    if (accessibleText) {
      accessibleText.textContent = showOutput ? `${codeValue} → ${outputValue}` : typed;
    }
  };

  const start = () => {
    typed = "";
    renderState("idle");
    schedule(() => {
      renderState("typing");
      const characters = Array.from(codeValue);
      let index = 0;
      const typeNext = () => {
        if (!isCurrent()) return;
        if (index < characters.length) {
          typed += characters[index];
          index += 1;
          renderState("typing");
          schedule(typeNext, 72);
          return;
        }
        schedule(() => {
          renderState("executing");
          schedule(() => {
            renderState("output");
            schedule(() => {
              renderState("labeled");
              schedule(start, 1500);
            }, 300);
          }, 520);
        }, 320);
      };
      typeNext();
    }, 500);
  };

  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    typed = codeValue;
    renderState("labeled");
    return;
  }

  start();
}

function startClassroomReadingAnimation(scene, payload = {}) {
  if (!scene || !activeRichLessonState) {
    return;
  }

  const actionValue = String(payload.action || "print");
  const textValue = String(payload.text || '("Olá, Mompy!")');
  const fullCode = actionValue + textValue;
  const controller = {
    cancelled: false,
    timer: null,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
  };
  activeRichLessonState.readingDemo = controller;

  const actionToken = scene.querySelector(".mompy-reading-action-token");
  const textToken = scene.querySelector(".mompy-reading-text-token");
  const cursor = scene.querySelector(".mompy-reading-cursor");
  const actionBox = scene.querySelector(".mompy-reading-action-box");
  const textBox = scene.querySelector(".mompy-reading-text-box");
  const arrow = scene.querySelector(".mompy-reading-arrow");
  const execute = scene.querySelector(".mompy-reading-execute");
  const accessibleText = scene.querySelector(".mompy-reading-sr-only");
  let phase = "idle";
  let typed = "";

  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.readingDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );

  const schedule = (callback, delay) => {
    window.clearTimeout(controller.timer);
    controller.timer = window.setTimeout(() => {
      controller.timer = null;
      if (isCurrent()) {
        callback();
      }
    }, Math.max(0, Number(delay) || 0));
  };

  const renderState = (nextPhase = phase) => {
    phase = nextPhase;
    const actionLength = Math.min(actionValue.length, typed.length);
    scene.dataset.phase = phase;
    if (actionToken) actionToken.textContent = typed.slice(0, actionLength);
    if (textToken) textToken.textContent = typed.length > actionValue.length
      ? typed.slice(actionValue.length)
      : "";
    if (cursor) cursor.hidden = phase !== "idle" && phase !== "typing";
    actionToken?.classList.toggle("mompy-reading-token-hot", phase === "action");
    textToken?.classList.toggle("mompy-reading-token-hot", phase === "text");
    actionBox?.classList.toggle("mompy-reading-box-on", ["action", "text", "arrow", "execute"].includes(phase));
    textBox?.classList.toggle("mompy-reading-box-on", ["text", "arrow", "execute"].includes(phase));
    arrow?.classList.toggle("mompy-reading-arrow-on", phase === "arrow" || phase === "execute");
    execute?.classList.toggle("mompy-reading-execute-on", phase === "execute");
    if (accessibleText) {
      accessibleText.textContent = typed;
    }
  };

  const start = () => {
    typed = "";
    renderState("idle");
    schedule(() => {
      renderState("typing");
      const characters = Array.from(fullCode);
      let index = 0;
      const typeNext = () => {
        if (!isCurrent()) return;
        if (index < characters.length) {
          typed += characters[index];
          index += 1;
          renderState("typing");
          schedule(typeNext, 72);
          return;
        }
        schedule(() => {
          renderState("action");
          schedule(() => {
            renderState("text");
            schedule(() => {
              renderState("arrow");
              schedule(() => {
                renderState("execute");
                schedule(start, 1500);
              }, 450);
            }, 500);
          }, 650);
        }, 300);
      };
      typeNext();
    }, 450);
  };

  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    typed = fullCode;
    renderState("execute");
    return;
  }

  start();
}

function startClassroomLineOrderAnimation(scene) {
  if (!scene || !activeRichLessonState) return;
  const controller = {
    cancelled: false,
    timer: null,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
  };
  activeRichLessonState.lineOrderDemo = controller;
  const rows = [...scene.querySelectorAll(".mompy-order-row")];
  const footer = scene.querySelector(".mompy-order-footer");

  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.lineOrderDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );
  const schedule = (callback, delay) => {
    window.clearTimeout(controller.timer);
    controller.timer = window.setTimeout(() => {
      controller.timer = null;
      if (isCurrent()) callback();
    }, Math.max(0, Number(delay) || 0));
  };
  const renderState = (phase) => {
    scene.dataset.phase = phase;
    rows.forEach((row, index) => {
      const reached = phase === "complete" || phase === `line-${index + 1}` || (phase === "line-2" && index === 0);
      row.classList.toggle("mompy-order-row-reached", reached);
      row.classList.toggle("mompy-order-row-active", phase === `line-${index + 1}`);
    });
    footer?.classList.toggle("mompy-order-footer-visible", phase === "complete");
  };
  const start = () => {
    renderState("idle");
    schedule(() => {
      renderState("line-1");
      schedule(() => {
        renderState("line-2");
        schedule(() => {
          renderState("complete");
          schedule(() => {
            renderState("reset");
            schedule(start, 250);
          }, 1200);
        }, 900);
      }, 900);
    }, 500);
  };
  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    renderState("complete");
    return;
  }
  start();
}

function startClassroomPairAnimation(scene, payload = {}) {
  if (!scene || !activeRichLessonState) return;
  const fullCode = String(payload.code || 'print("Eu consegui!")');
  const controller = {
    cancelled: false,
    timer: null,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
  };
  activeRichLessonState.pairDemo = controller;
  const functionToken = scene.querySelector(".mompy-pair-function");
  const openParenthesis = scene.querySelector(".mompy-pair-open-parenthesis");
  const openQuote = scene.querySelector(".mompy-pair-open-quote");
  const textToken = scene.querySelector(".mompy-pair-text");
  const closeQuote = scene.querySelector(".mompy-pair-close-quote");
  const closeParenthesis = scene.querySelector(".mompy-pair-close-parenthesis");
  const cursor = scene.querySelector(".mompy-pair-cursor");
  const parenthesisTrack = scene.querySelector(".mompy-pair-track-parentheses");
  const quoteTrack = scene.querySelector(".mompy-pair-track-quotes");
  const badge = scene.querySelector(".mompy-pair-valid");
  let visibleCode = "";
  let phase = "idle";

  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.pairDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );
  const schedule = (callback, delay) => {
    window.clearTimeout(controller.timer);
    controller.timer = window.setTimeout(() => {
      controller.timer = null;
      if (isCurrent()) callback();
    }, Math.max(0, Number(delay) || 0));
  };
  const renderState = (nextPhase = phase) => {
    phase = nextPhase;
    const length = visibleCode.length;
    const closeQuoteIndex = fullCode.length - 2;
    scene.dataset.phase = phase;
    if (functionToken) functionToken.textContent = visibleCode.slice(0, Math.min(5, length));
    if (openParenthesis) openParenthesis.textContent = length > 5 ? "(" : "";
    if (openQuote) openQuote.textContent = length > 6 ? '"' : "";
    if (textToken) textToken.textContent = length > 7
      ? visibleCode.slice(7, Math.min(length, closeQuoteIndex))
      : "";
    if (closeQuote) closeQuote.textContent = length > closeQuoteIndex ? '"' : "";
    if (closeParenthesis) closeParenthesis.textContent = length === fullCode.length ? ")" : "";
    if (cursor) cursor.hidden = phase !== "idle" && phase !== "typing";
    [openParenthesis, closeParenthesis].forEach((token) => {
      token?.classList.toggle("mompy-pair-token-hot", phase === "parentheses" || phase === "valid");
    });
    [openQuote, closeQuote].forEach((token) => {
      token?.classList.toggle("mompy-pair-token-hot", phase === "quotes" || phase === "valid");
    });
    parenthesisTrack?.classList.toggle("mompy-pair-track-visible", phase === "parentheses" || phase === "quotes" || phase === "valid");
    quoteTrack?.classList.toggle("mompy-pair-track-visible", phase === "quotes" || phase === "valid");
    badge?.classList.toggle("mompy-pair-valid-visible", phase === "valid");
  };
  const start = () => {
    visibleCode = "";
    renderState("idle");
    schedule(() => {
      renderState("typing");
      const characters = Array.from(fullCode);
      let index = 0;
      const typeNext = () => {
        if (!isCurrent()) return;
        if (index < characters.length) {
          visibleCode += characters[index];
          index += 1;
          renderState("typing");
          schedule(typeNext, 68);
          return;
        }
        schedule(() => {
          renderState("parentheses");
          schedule(() => {
            renderState("quotes");
            schedule(() => {
              renderState("valid");
              schedule(() => {
                renderState("reset");
                schedule(start, 300);
              }, 1200);
            }, 550);
          }, 550);
        }, 300);
      };
      typeNext();
    }, 450);
  };
  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    visibleCode = fullCode;
    renderState("valid");
    return;
  }
  start();
}

function renderClassroomAuxPayload(payload) {
  if (!classroomAuxMonitorContent || !payload) {
    return;
  }

  const supportedKinds = new Set([
    "question",
    "identity",
    "timeline",
    "fact",
    "video",
    "idea-code",
    "output",
    "execution",
    "automation-arm",
    "sites-delivery",
    "data-ai-sequence",
    "science-education-sequence",
    "interpreter-sequence",
    "syntax-animation",
    "string-value-animation",
    "print-function-animation",
    "reading-animation",
    "line-order-animation",
    "pair-animation",
  ]);
  const kind = supportedKinds.has(payload.kind) ? payload.kind : "output";
  classroomAuxMonitorContent.className = `classroom-aux-monitor-content is-${kind}`;
  const label = createClassroomNode("p", "classroom-aux-monitor-label", payload.label || "STATUS");

  if (kind === "question") {
    const scene = createClassroomNode("div", "classroom-aux-question");
    scene.setAttribute("role", "img");
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR" ? "Pergunta aguardando resposta" : "Question awaiting an answer"),
    );
    const symbol = String(payload.symbol || "?");
    const symbolNode = createClassroomNode("span", "classroom-aux-question-mark", symbol);
    symbolNode.classList.toggle("is-success", symbol === "✓");
    scene.append(symbolNode);
    classroomAuxMonitorContent.replaceChildren(scene);
    return;
  }

  if (kind === "pair-animation") {
    const scene = createClassroomNode("section", "mompy-pair-demo");
    scene.dataset.phase = "idle";
    scene.setAttribute("aria-label", payload.alt || "Pares de aspas e parênteses completando uma instrução print");
    const kicker = createClassroomNode("div", "mompy-pair-kicker", payload.kicker || "PARES DA SINTAXE");
    const panel = createClassroomNode("div", "mompy-pair-panel");
    const code = createClassroomNode("div", "mompy-pair-code");
    const functionToken = createClassroomNode("span", "mompy-pair-function");
    const openParenthesis = createClassroomNode("span", "mompy-pair-symbol mompy-pair-open-parenthesis");
    const openQuote = createClassroomNode("span", "mompy-pair-symbol mompy-pair-open-quote");
    const text = createClassroomNode("span", "mompy-pair-text");
    const closeQuote = createClassroomNode("span", "mompy-pair-symbol mompy-pair-close-quote");
    const closeParenthesis = createClassroomNode("span", "mompy-pair-symbol mompy-pair-close-parenthesis");
    const cursor = createClassroomNode("span", "mompy-pair-cursor", "▌");
    cursor.setAttribute("aria-hidden", "true");
    code.append(functionToken, openParenthesis, openQuote, text, closeQuote, closeParenthesis, cursor);
    const tracks = createClassroomNode("div", "mompy-pair-tracks");
    const parenthesisTrack = createClassroomNode("div", "mompy-pair-track mompy-pair-track-parentheses");
    parenthesisTrack.append(createClassroomNode("span", "", payload.parenthesesLabel || "PARÊNTESES: CHAMADA COMPLETA"));
    const quoteTrack = createClassroomNode("div", "mompy-pair-track mompy-pair-track-quotes");
    quoteTrack.append(createClassroomNode("span", "", payload.quotesLabel || "ASPAS: TEXTO COMPLETO"));
    tracks.append(parenthesisTrack, quoteTrack);
    const valid = createClassroomNode("div", "mompy-pair-valid", payload.validLabel || "✓ FORMA COMPLETA");
    panel.append(code, tracks, valid);
    const scan = createClassroomNode("div", "mompy-pair-scan");
    scan.setAttribute("aria-hidden", "true");
    scene.append(kicker, panel, scan);
    classroomAuxMonitorContent.replaceChildren(scene);
    startClassroomPairAnimation(scene, payload);
    return;
  }

  if (kind === "line-order-animation") {
    const scene = createClassroomNode("section", "mompy-order-demo");
    scene.dataset.phase = "idle";
    scene.setAttribute("aria-label", payload.alt || "Duas linhas de código sendo executadas de cima para baixo");
    const kicker = createClassroomNode("div", "mompy-order-kicker", payload.kicker || "ORDEM DE EXECUÇÃO");
    const panel = createClassroomNode("div", "mompy-order-panel");
    const headers = createClassroomNode("div", "mompy-order-headers");
    headers.append(
      createClassroomNode("span", "", payload.codeLabel || "CÓDIGO"),
      createClassroomNode("span", "", ""),
      createClassroomNode("span", "", payload.outputLabel || "RESULTADO"),
    );
    panel.append(headers);
    const codeLines = payload.codeLines || ['print("Linha 1")', 'print("Linha 2")'];
    const outputLines = payload.outputLines || ["Linha 1", "Linha 2"];
    codeLines.slice(0, 2).forEach((line, index) => {
      const row = createClassroomNode("div", "mompy-order-row");
      const codeCell = createClassroomNode("code", "mompy-order-code", line);
      const trace = createClassroomNode("span", "mompy-order-trace", "→");
      const outputCell = createClassroomNode("output", "mompy-order-output", outputLines[index] || "");
      row.append(codeCell, trace, outputCell);
      panel.append(row);
    });
    const footer = createClassroomNode(
      "div",
      "mompy-order-footer",
      payload.footer || "↓ PYTHON LÊ DE CIMA PARA BAIXO",
    );
    panel.append(footer);
    const scan = createClassroomNode("div", "mompy-order-scan");
    scan.setAttribute("aria-hidden", "true");
    scene.append(kicker, panel, scan);
    classroomAuxMonitorContent.replaceChildren(scene);
    startClassroomLineOrderAnimation(scene);
    return;
  }

  if (kind === "reading-animation") {
    const scene = createClassroomNode("section", "mompy-reading-demo");
    scene.dataset.phase = "idle";
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "Leitura da ação print e do texto antes da execução"
        : "Reading the print action and the text before execution"),
    );
    const wrap = createClassroomNode("div", "mompy-reading-wrap");
    const kicker = createClassroomNode(
      "div",
      "mompy-reading-kicker",
      payload.kicker || (currentLanguage === "pt-BR" ? "LEITURA" : "READING"),
    );
    const stage = createClassroomNode("div", "mompy-reading-stage");
    const panel = createClassroomNode("div", "mompy-reading-panel");
    const codeLine = createClassroomNode("div", "mompy-reading-code");
    const actionToken = createClassroomNode("span", "mompy-reading-token mompy-reading-action-token");
    const textToken = createClassroomNode("span", "mompy-reading-token mompy-reading-text-token");
    const cursor = createClassroomNode("span", "mompy-reading-cursor", "▌");
    cursor.setAttribute("aria-hidden", "true");
    codeLine.append(actionToken, textToken, cursor);

    const meaning = createClassroomNode("div", "mompy-reading-meaning");
    const actionBox = createClassroomNode("div", "mompy-reading-box mompy-reading-action-box");
    const actionCopy = createClassroomNode("div");
    actionCopy.append(
      createClassroomNode("strong", "", payload.actionLabel || (currentLanguage === "pt-BR" ? "AÇÃO" : "ACTION")),
      createClassroomNode("span", "", payload.action || "print"),
    );
    actionBox.append(actionCopy);
    const arrow = createClassroomNode("div", "mompy-reading-arrow", "→");
    const textBox = createClassroomNode("div", "mompy-reading-box mompy-reading-text-box");
    const textCopy = createClassroomNode("div");
    textCopy.append(
      createClassroomNode("strong", "", payload.textLabel || (currentLanguage === "pt-BR" ? "TEXTO" : "TEXT")),
      createClassroomNode("span", "", payload.displayText || '"Olá, Mompy!"'),
    );
    textBox.append(textCopy);
    meaning.append(actionBox, arrow, textBox);
    const execute = createClassroomNode(
      "div",
      "mompy-reading-execute",
      payload.executeLabel || (currentLanguage === "pt-BR"
        ? "⚡ PRIMEIRO ENTENDE • DEPOIS EXECUTA"
        : "⚡ UNDERSTAND FIRST • EXECUTE NEXT"),
    );
    panel.append(codeLine, meaning, execute);
    stage.append(panel);
    wrap.append(kicker, stage);
    const scanlines = createClassroomNode("div", "mompy-reading-scanlines");
    scanlines.setAttribute("aria-hidden", "true");
    const accessibleText = createClassroomNode("span", "mompy-reading-sr-only");
    accessibleText.setAttribute("aria-live", "off");
    scene.append(wrap, scanlines, accessibleText);
    classroomAuxMonitorContent.replaceChildren(scene);
    startClassroomReadingAnimation(scene, payload);
    return;
  }

  if (kind === "print-function-animation") {
    const scene = createClassroomNode("section", "mompy-print-demo");
    scene.dataset.phase = "idle";
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "A função print sendo digitada, executada e produzindo uma saída"
        : "The print function being typed, executed, and producing output"),
    );
    const content = createClassroomNode("div", "mompy-print-content");
    const kicker = createClassroomNode(
      "div",
      "mompy-print-kicker",
      payload.kicker || (currentLanguage === "pt-BR" ? "FUNÇÃO — PRINT" : "FUNCTION — PRINT"),
    );
    const stage = createClassroomNode("div", "mompy-print-stage");
    const panel = createClassroomNode("div", "mompy-print-panel");
    const codeRow = createClassroomNode("div", "mompy-print-code-row");
    const code = createClassroomNode("span", "mompy-print-code");
    const cursor = createClassroomNode("span", "mompy-print-cursor", "▌");
    cursor.setAttribute("aria-hidden", "true");
    codeRow.append(createClassroomNode("span", "mompy-print-prompt", ">"), code, cursor);

    const divider = createClassroomNode("div", "mompy-print-divider");
    divider.append(createClassroomNode("div", "mompy-print-scanbar"));
    const outputRow = createClassroomNode("div", "mompy-print-output-row");
    const output = createClassroomNode("span", "mompy-print-output", payload.output || "Olá, Mompy!");
    outputRow.append(createClassroomNode("span", "mompy-print-prompt", "›"), output);
    const resultLabel = createClassroomNode(
      "div",
      "mompy-print-label",
      payload.resultLabel || (currentLanguage === "pt-BR"
        ? "A INFORMAÇÃO FICOU VISÍVEL"
        : "THE INFORMATION BECAME VISIBLE"),
    );
    panel.append(codeRow, divider, outputRow, resultLabel);
    stage.append(panel);
    content.append(kicker, stage);
    const scan = createClassroomNode("div", "mompy-print-scan");
    scan.setAttribute("aria-hidden", "true");
    const accessibleText = createClassroomNode("span", "mompy-print-sr-only");
    accessibleText.setAttribute("aria-live", "off");
    scene.append(content, scan, accessibleText);
    classroomAuxMonitorContent.replaceChildren(scene);
    startClassroomPrintFunctionAnimation(scene, payload);
    return;
  }

  if (kind === "string-value-animation") {
    const scene = createClassroomNode("section", "mompy-string-demo");
    scene.dataset.phase = "idle";
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "Uma string sendo digitada e delimitada por aspas"
        : "A string being typed and delimited by quotation marks"),
    );
    const content = createClassroomNode("div", "mompy-string-content");
    const kicker = createClassroomNode(
      "div",
      "mompy-string-kicker",
      payload.kicker || (currentLanguage === "pt-BR" ? "VALOR DE TEXTO" : "TEXT VALUE"),
    );
    const stage = createClassroomNode("div", "mompy-string-stage");
    const box = createClassroomNode("div", "mompy-string-box");
    const codeLine = createClassroomNode("div", "mompy-string-code");
    const openingQuote = createClassroomNode("span", "mompy-string-quote mompy-string-opening-quote");
    const text = createClassroomNode("span", "mompy-string-text");
    const cursor = createClassroomNode("span", "mompy-string-cursor", "▌");
    cursor.hidden = true;
    cursor.setAttribute("aria-hidden", "true");
    const closingQuote = createClassroomNode("span", "mompy-string-quote mompy-string-closing-quote");
    codeLine.append(openingQuote, text, cursor, closingQuote);

    const delimiter = createClassroomNode("div", "mompy-string-delimiter");
    delimiter.setAttribute("aria-hidden", "true");
    delimiter.append(
      createClassroomNode("span", "mompy-string-delimiter-left"),
      createClassroomNode("span", "mompy-string-delimiter-line"),
      createClassroomNode("span", "mompy-string-delimiter-right"),
    );
    const explanation = createClassroomNode(
      "div",
      "mompy-string-explanation",
      payload.explanation || (currentLanguage === "pt-BR"
        ? "AS ASPAS DELIMITAM A STRING"
        : "QUOTES DELIMIT THE STRING"),
    );
    const accessibleText = createClassroomNode("span", "mompy-string-sr-only");
    accessibleText.setAttribute("aria-live", "off");
    box.append(codeLine, delimiter, explanation);
    stage.append(box);
    content.append(kicker, stage);
    scene.append(
      content,
      createClassroomNode("div", "mompy-string-scan"),
      accessibleText,
    );
    classroomAuxMonitorContent.replaceChildren(scene);
    startClassroomStringValueAnimation(scene, payload);
    return;
  }

  if (kind === "syntax-animation") {
    const scene = createClassroomNode("section", "mompy-syntax-demo");
    scene.dataset.stage = "idle";
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "Demonstração de sintaxe Python sendo construída e validada"
        : "Python syntax demonstration being built and validated"),
    );

    const codeBox = createClassroomNode("div", "mompy-syntax-code-box");
    const codeFade = createClassroomNode("div", "mompy-syntax-fade-layer");
    const codeLine = createClassroomNode("div", "mompy-syntax-code-line");
    const code = createClassroomNode("code");
    const functionToken = createClassroomNode("span", "mompy-syntax-token mompy-syntax-token--function");
    const openParenthesis = createClassroomNode(
      "span",
      "mompy-syntax-token mompy-syntax-token--parenthesis mompy-syntax-parenthesis-open",
    );
    const stringToken = createClassroomNode("span", "mompy-syntax-token mompy-syntax-token--string");
    const closeParenthesis = createClassroomNode(
      "span",
      "mompy-syntax-token mompy-syntax-token--parenthesis mompy-syntax-parenthesis-close",
    );
    const cursor = createClassroomNode("span", "mompy-syntax-cursor");
    cursor.setAttribute("aria-hidden", "true");
    code.append(functionToken, openParenthesis, stringToken, closeParenthesis, cursor);
    codeLine.append(code);

    const scan = createClassroomNode("span", "mompy-syntax-scan");
    scan.hidden = true;
    scan.setAttribute("aria-hidden", "true");
    const badge = createClassroomNode("div", "mompy-syntax-valid-badge");
    badge.setAttribute("aria-hidden", "true");
    badge.append(
      createClassroomNode("span", "mompy-syntax-check", "✓"),
      createClassroomNode("span", "", payload.validLabel || (currentLanguage === "pt-BR" ? "SINTAXE VÁLIDA" : "VALID SYNTAX")),
    );
    codeFade.append(codeLine, scan, badge);
    codeBox.append(codeFade);

    const annotations = createClassroomNode("div", "mompy-syntax-annotations mompy-syntax-fade-layer");
    const annotationData = [
      ["function", payload.functionLabel || (currentLanguage === "pt-BR" ? "FUNÇÃO" : "FUNCTION")],
      ["string", payload.stringLabel || (currentLanguage === "pt-BR" ? "TEXTO (STRING)" : "TEXT (STRING)")],
      ["parentheses", payload.parenthesesLabel || (currentLanguage === "pt-BR" ? "PARÊNTESES" : "PARENTHESES")],
    ];
    annotationData.forEach(([name, text]) => {
      const annotation = createClassroomNode(
        "div",
        `mompy-syntax-annotation mompy-syntax-annotation--${name}`,
      );
      annotation.append(createClassroomNode("span", "", text));
      annotations.append(annotation);
    });
    const accessibleCode = createClassroomNode("span", "mompy-syntax-sr-only", payload.waitingLabel || "Cursor aguardando");
    accessibleCode.setAttribute("aria-live", "off");
    scene.append(codeBox, annotations, accessibleCode);
    classroomAuxMonitorContent.replaceChildren(scene);
    startClassroomSyntaxAnimation(scene, payload);
    return;
  }

  if (kind === "interpreter-sequence") {
    const scene = createClassroomNode("div", "classroom-aux-interpreter-scene");
    scene.setAttribute("role", "img");
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "O intérprete Python recebe instruções, processa o código e comanda a máquina"
        : "The Python interpreter receives instructions, processes code, and controls the machine"),
    );
    (payload.frames || CLASSROOM_INTERPRETER_FRAMES).forEach((source, index) => {
      const frame = createClassroomNode(
        "img",
        `classroom-aux-interpreter-frame is-frame-${index + 1}`,
      );
      frame.src = source;
      frame.alt = "";
      frame.loading = "eager";
      frame.decoding = "async";
      frame.draggable = false;
      scene.append(frame);
    });
    classroomAuxMonitorContent.replaceChildren(scene);
    return;
  }

  if (kind === "identity") {
    const card = createClassroomNode("div", "classroom-aux-identity");
    if (payload.image) {
      const portrait = createClassroomNode("img", "classroom-aux-identity-portrait");
      portrait.src = payload.image;
      portrait.alt = payload.alt || "";
      portrait.loading = "eager";
      portrait.decoding = "async";
      card.append(portrait);
    }

    const details = createClassroomNode("div", "classroom-aux-identity-details");
    details.append(
      createClassroomNode("strong", "classroom-aux-identity-name", payload.title || payload.value || ""),
    );
    if (payload.subtitle) {
      details.append(createClassroomNode("span", "classroom-aux-identity-role", payload.subtitle));
    }
    if (payload.country || payload.flagCode) {
      const country = createClassroomNode("span", "classroom-aux-country");
      if (payload.flagCode) {
        const flag = createClassroomNode(
          "span",
          `classroom-aux-flag is-${String(payload.flagCode).toLowerCase()}`,
        );
        flag.setAttribute("role", "img");
        flag.setAttribute("aria-label", payload.country || payload.flagCode);
        country.append(flag);
      }
      if (payload.country) {
        country.append(createClassroomNode("span", "", payload.country));
      }
      details.append(country);
    }
    if (payload.facts?.length) {
      const facts = createClassroomNode("div", "classroom-aux-tags");
      payload.facts.forEach((fact) => facts.append(createClassroomNode("span", "", fact)));
      details.append(facts);
    }
    card.append(details);
    classroomAuxMonitorContent.replaceChildren(label, card);
    return;
  }

  if (kind === "timeline") {
    const timeline = createClassroomNode("ol", "classroom-aux-timeline");
    const defaultTimelineIcons = ["spark", "code", "community"];
    (payload.items || []).forEach((item, index) => {
      const point = createClassroomNode("li", "");
      point.style.setProperty("--timeline-index", String(index));
      const iconName = item.icon || defaultTimelineIcons[index] || "code";
      const icon = createClassroomNode(
        "span",
        `classroom-aux-timeline-icon is-${iconName}`,
      );
      icon.setAttribute("aria-hidden", "true");
      point.append(
        createClassroomNode("strong", "classroom-aux-timeline-year", item.year),
        createClassroomNode("span", "classroom-aux-timeline-caption", item.caption),
        icon,
      );
      timeline.append(point);
    });
    classroomAuxMonitorContent.replaceChildren(label, timeline);
    return;
  }

  if (kind === "video") {
    const videoShell = createClassroomNode("figure", "classroom-aux-video");
    const video = createClassroomNode("video", "classroom-aux-video-player");
    video.src = payload.src || "";
    video.autoplay = true;
    video.loop = payload.loop !== false;
    const videoAudioEnabled = payload.muted !== true && audioManager.sfxEnabled;
    const configuredVideoVolume = Number(audioManager.sfxVolume);
    const safeVideoVolume = Number.isFinite(configuredVideoVolume) ? configuredVideoVolume : 0.45;
    video.muted = !videoAudioEnabled;
    video.volume = videoAudioEnabled
      ? Math.max(0.18, Math.min(0.55, safeVideoVolume * 0.78))
      : 0;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("aria-label", payload.alt || payload.title || label.textContent);
    if (payload.poster) {
      video.poster = payload.poster;
    }
    videoShell.append(video);
    classroomAuxMonitorContent.replaceChildren(videoShell);
    video.play().catch(() => {});
    return;
  }

  if (kind === "automation-arm") {
    const scene = createClassroomNode("div", "classroom-aux-automation-scene");
    scene.dataset.state = payload.state || "idle";
    scene.dataset.cycle = String(payload.cycle || 1);
    scene.setAttribute("role", "img");
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "Braço robótico aguardando instruções"
        : "Robotic arm waiting for instructions"),
    );
    (payload.frames || CLASSROOM_AUTOMATION_ARM_FRAMES).forEach((source, index) => {
      const frame = createClassroomNode("img", "classroom-aux-automation-frame");
      frame.src = source;
      frame.alt = "";
      frame.loading = "eager";
      frame.decoding = "async";
      frame.draggable = false;
      frame.dataset.frame = String(index + 1);
      scene.append(frame);
    });
    classroomAuxMonitorContent.replaceChildren(scene);
    return;
  }

  if (kind === "sites-delivery") {
    const scene = createClassroomNode("div", "classroom-aux-sites-scene");
    scene.dataset.phase = payload.phase || "idle";
    scene.setAttribute("role", "img");
    scene.setAttribute(
      "aria-label",
      payload.alt || (currentLanguage === "pt-BR"
        ? "Servidor Python preparando uma página para o navegador"
        : "Python server preparing a page for the browser"),
    );

    const server = createClassroomNode("img", "classroom-aux-sites-server");
    server.src = payload.server || ASSETS.classroomSitesServer;
    server.alt = "";
    server.loading = "eager";
    server.decoding = "async";
    server.draggable = false;

    const documentImage = createClassroomNode("img", "classroom-aux-sites-document");
    documentImage.src = payload.document || ASSETS.classroomSitesDocument;
    documentImage.alt = "";
    documentImage.loading = "eager";
    documentImage.decoding = "async";
    documentImage.draggable = false;

    const browser = createClassroomNode("div", "classroom-aux-sites-browser");
    const browserBase = createClassroomNode("img", "classroom-aux-sites-browser-base");
    browserBase.src = payload.browser || ASSETS.classroomSitesBrowser;
    browserBase.alt = "";
    browserBase.loading = "eager";
    browserBase.decoding = "async";
    browserBase.draggable = false;
    const buildClasses = ["hero", "text", "side", "rest"];
    const buildLayers = buildClasses.map((name) => {
      const layer = createClassroomNode("img", `classroom-aux-sites-build-layer is-${name}`);
      layer.src = browserBase.src;
      layer.alt = "";
      layer.loading = "eager";
      layer.decoding = "async";
      layer.draggable = false;
      return layer;
    });
    browser.append(browserBase, ...buildLayers);

    const trail = createClassroomNode("span", "classroom-aux-sites-pixel-trail");
    scene.append(server, trail, documentImage, browser);
    classroomAuxMonitorContent.replaceChildren(scene);
    return;
  }

  if (kind === "data-ai-sequence") {
    const scene = createClassroomNode("div", "classroom-aux-data-ai-scene");
    scene.setAttribute("role", "img");
    const sprite = createClassroomNode("span", "classroom-aux-data-ai-sprite");
    sprite.style.backgroundImage = `url("${payload.sprite || ASSETS.classroomDataAiSequence}")`;
    scene.append(sprite);
    classroomAuxMonitorContent.replaceChildren(scene);
    setClassroomDataAiFrame(scene, Number(payload.frame) || 0);
    return;
  }

  if (kind === "science-education-sequence") {
    const scene = createClassroomNode("div", "classroom-aux-science-education-scene");
    scene.setAttribute("role", "img");
    (payload.frames || CLASSROOM_SCIENCE_EDUCATION_FRAMES).forEach((source, index) => {
      const frame = createClassroomNode("img", "classroom-aux-science-education-frame");
      frame.src = source;
      frame.alt = "";
      frame.loading = "eager";
      frame.decoding = "async";
      frame.draggable = false;
      frame.dataset.frame = String(index + 1);
      scene.append(frame);
    });
    classroomAuxMonitorContent.replaceChildren(scene);
    setClassroomScienceEducationFrame(scene, Number(payload.frame) || 0);
    return;
  }

  if (kind === "idea-code") {
    const scene = createClassroomNode("div", "classroom-aux-idea-code-scene");
    const duration = Math.max(14000, Number(payload.duration) || 24000);
    scene.style.setProperty("--idea-code-loop", `${duration}ms`);
    scene.setAttribute("role", "img");
    scene.setAttribute(
      "aria-label",
      payload.alt || `${payload.idea || "IDEIA"} ${payload.arrow || "→"} ${payload.code || "CÓDIGO"}`,
    );

    const headline = createClassroomNode("div", "classroom-aux-idea-code-headline");
    headline.append(
      createClassroomNode("strong", "classroom-aux-idea-code-idea", payload.idea || "IDEIA"),
      createClassroomNode("span", "classroom-aux-idea-code-arrow", payload.arrow || "→"),
      createClassroomNode("strong", "classroom-aux-idea-code-code", payload.code || "CÓDIGO"),
    );
    const subtitleText = payload.subtitle || "PASSOS EXATOS PARA A MÁQUINA";
    const subtitle = createClassroomNode("p", "classroom-aux-idea-code-subtitle");
    const steps = createClassroomNode("ol", "classroom-aux-idea-code-steps");
    const typedRows = [];
    (payload.steps || []).slice(0, 4).forEach((step, index) => {
      const item = createClassroomNode("li", "");
      const stepText = String(step);
      const stepNode = createClassroomNode("span", "classroom-aux-idea-code-step");
      item.append(
        createClassroomNode("span", "classroom-aux-idea-code-number", String(index + 1).padStart(2, "0")),
        stepNode,
      );
      steps.append(item);
      typedRows.push({ item, node: stepNode, text: stepText });
    });
    scene.append(headline, subtitle, steps);
    classroomAuxMonitorContent.replaceChildren(scene);

    const showCompleteText = () => {
      subtitle.textContent = subtitleText;
      typedRows.forEach(({ item, node, text }) => {
        item.classList.add("is-visible");
        node.textContent = text;
      });
      subtitle.classList.remove("is-cursor");
      typedRows.forEach(({ node }) => node.classList.remove("is-cursor"));
    };

    if (prefersReducedMotion() || !settingsState.mompyAnimations) {
      showCompleteText();
      return;
    }

    const characters = (value) => Array.from(value);
    const subtitleCharacters = characters(subtitleText);
    const rowCharacters = typedRows.map(({ text }) => characters(text));
    const subtitleStart = duration * 0.3;
    const subtitleWindow = duration * 0.1;
    const rowsStart = duration * 0.44;
    const rowsEnd = duration * 0.75;
    const rowSlot = typedRows.length ? (rowsEnd - rowsStart) / typedRows.length : 0;
    const animationStartedAt = performance.now();

    const revealCharacters = (node, values, elapsed, start, windowMs) => {
      if (elapsed < start) {
        node.textContent = "";
        return false;
      }
      const progress = Math.min(1, (elapsed - start) / Math.max(1, windowMs));
      node.textContent = values.slice(0, Math.ceil(values.length * progress)).join("");
      return progress < 1;
    };

    const updateTyping = (now) => {
      if (!scene.isConnected) {
        return;
      }
      const elapsed = (now - animationStartedAt) % duration;
      revealCharacters(subtitle, subtitleCharacters, elapsed, subtitleStart, subtitleWindow);
      let activeCursorNode = elapsed >= subtitleStart && elapsed < rowsStart ? subtitle : null;
      typedRows.forEach(({ item, node }, index) => {
        const start = rowsStart + rowSlot * index;
        const nextStart = Math.min(rowsEnd, start + rowSlot);
        revealCharacters(node, rowCharacters[index], elapsed, start, rowSlot * 0.78);
        item.classList.toggle("is-visible", elapsed >= start);
        if (elapsed >= start && elapsed < nextStart) {
          activeCursorNode = node;
        }
      });
      subtitle.classList.toggle("is-cursor", activeCursorNode === subtitle);
      typedRows.forEach(({ node }) => {
        node.classList.toggle("is-cursor", activeCursorNode === node);
      });
      window.requestAnimationFrame(updateTyping);
    };

    window.requestAnimationFrame(updateTyping);
    return;
  }

  if (kind === "fact") {
    const fact = createClassroomNode("div", "classroom-aux-fact");
    if (payload.icon) {
      fact.append(createClassroomNode("span", "classroom-aux-fact-icon", payload.icon));
    }
    const factCopy = createClassroomNode("div", "classroom-aux-fact-copy");
    factCopy.append(createClassroomNode("strong", "classroom-aux-fact-title", payload.title || payload.value || ""));
    if (payload.subtitle) {
      factCopy.append(createClassroomNode("span", "classroom-aux-fact-subtitle", payload.subtitle));
    }
    fact.append(factCopy);
    classroomAuxMonitorContent.replaceChildren(label, fact);
    return;
  }

  if (kind === "execution") {
    const demo = createClassroomNode("div", "classroom-aux-execution");
    const hasResultVisual = Boolean(payload.image);
    const inputLabel = createClassroomNode(
      "span",
      "classroom-aux-execution-input-label",
      payload.inputLabel || "INPUT",
    );
    const code = createClassroomNode("code", "classroom-aux-execution-code", payload.code || "");
    const outputLabel = createClassroomNode(
      "span",
      "classroom-aux-execution-output-label",
      Object.prototype.hasOwnProperty.call(payload, "outputLabel") ? payload.outputLabel : "OUTPUT",
    );
    const output = createClassroomNode(
      "output",
      "classroom-aux-execution-output",
      payload.output || "",
    );
    output.setAttribute("aria-live", "polite");
    demo.classList.add(`is-${payload.phase || "ready"}`);
    const codeLines = String(payload.code || "").split("\n").length;
    const outputLines = String(payload.output || "").split("\n").length;
    if (codeLines > 1 || outputLines > 1) {
      demo.classList.add("is-multiline");
    }
    if (codeLines + outputLines >= 7) {
      demo.classList.add("is-dense");
    }
    if (hasResultVisual) {
      demo.classList.add("has-result-visual");
    }
    demo.setAttribute("aria-label", payload.ariaLabel || label.textContent);
    demo.append(inputLabel, code, outputLabel, output);
    if (hasResultVisual) {
      const visual = createClassroomNode("figure", "classroom-aux-execution-visual");
      const image = createClassroomNode("img", "classroom-aux-execution-image");
      image.src = payload.image;
      image.alt = payload.imageAlt || payload.resultCaption || "";
      image.loading = "eager";
      image.decoding = "async";
      visual.append(image);
      if (payload.resultCaption) {
        visual.append(createClassroomNode(
          "figcaption",
          "classroom-aux-execution-caption",
          payload.resultCaption,
        ));
      }
      demo.append(visual);
    }
    classroomAuxMonitorContent.replaceChildren(label, demo);
    return;
  }

  const value = createClassroomNode("pre", "classroom-aux-monitor-output", payload.value || "");
  classroomAuxMonitorContent.replaceChildren(label, value);
}

function setClassroomAuxMonitor(payload) {
  if (!classroomAuxMonitor || !classroomLessonPanel) {
    return;
  }

  if (!payload) {
    if (classroomAuxMonitorMode === "open" || classroomAuxMonitorMode === "opening") {
      const transitionToken = ++classroomAuxTransitionToken;
      classroomAuxMonitor.classList.remove("is-opening", "is-open");
      classroomAuxMonitor.classList.add("is-closing");
      classroomAuxRail?.classList.remove("is-opening", "is-open");
      classroomAuxRail?.classList.add("is-closing");
      classroomAuxMonitorMode = "closing";
      classroomAuxMonitorContent?.setAttribute("aria-busy", "true");
      scheduleClassroomStageStep(() => {
        if (
          classroomAuxMonitorMode !== "closing"
          || transitionToken !== classroomAuxTransitionToken
        ) {
          return;
        }
        classroomAuxMonitor.classList.remove("is-closing");
        classroomAuxRail?.classList.remove("is-closing");
        classroomLessonPanel.classList.remove("has-aux-monitor");
        classroomAuxMonitorContent?.replaceChildren();
        classroomAuxMonitorContent?.removeAttribute("aria-busy");
        classroomAuxMonitorMode = "closed";
      }, prefersReducedMotion() ? 20 : 1850);
    } else if (classroomAuxMonitorMode === "closed") {
      classroomLessonPanel.classList.remove("has-aux-monitor");
      classroomAuxMonitorContent?.replaceChildren();
    }
    return;
  }

  classroomLessonPanel.classList.add("has-aux-monitor");
  if (classroomAuxMonitorMode !== "open" && classroomAuxMonitorMode !== "opening") {
    classroomAuxMonitorContent?.setAttribute("aria-busy", "true");
  }
  renderClassroomAuxPayload(payload);

  if (classroomAuxMonitorMode === "open" || classroomAuxMonitorMode === "opening") {
    return;
  }

  classroomAuxMonitor.classList.remove("is-closing");
  classroomAuxMonitor.classList.add("is-opening");
  classroomAuxRail?.classList.remove("is-closing");
  classroomAuxRail?.classList.add("is-opening");
  const transitionToken = ++classroomAuxTransitionToken;
  classroomAuxMonitorMode = "opening";
  if (!prefersReducedMotion()) {
    playClassroomMechanismCue("monitor");
  }
  scheduleClassroomStageStep(() => {
    if (
      classroomAuxMonitorMode !== "opening"
      || transitionToken !== classroomAuxTransitionToken
    ) {
      return;
    }
    classroomAuxMonitor.classList.remove("is-opening");
    classroomAuxMonitor.classList.add("is-open");
    classroomAuxRail?.classList.remove("is-opening");
    classroomAuxRail?.classList.add("is-open");
    classroomAuxMonitorContent?.removeAttribute("aria-busy");
    classroomAuxMonitorMode = "open";
  }, prefersReducedMotion() ? 20 : 2250);
}

function initializeClassroomAuxCrt() {
  if (!classroomAuxMonitor || !classroomAuxMonitorContent || !classroomAuxCrt) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const restingPoint = { x: 52, y: 28 };
  let targetX = restingPoint.x;
  let targetY = restingPoint.y;
  let currentX = restingPoint.x;
  let currentY = restingPoint.y;
  let beam = 0;
  let animationFrame = null;
  let pulseTimer = null;

  const isActive = () => (
    classroomAuxMonitor.classList.contains("is-opening")
    || classroomAuxMonitor.classList.contains("is-open")
  );

  const resetElectricalVariables = () => {
    classroomAuxMonitor.style.setProperty("--crt-flicker", "1");
    classroomAuxMonitor.style.setProperty("--crt-jitter-x", "0px");
    classroomAuxMonitor.style.setProperty("--crt-jitter-y", "0px");
    classroomAuxMonitor.style.setProperty("--crt-ghost-x", "0.08cqw");
  };

  const stopMotion = () => {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    if (pulseTimer !== null) {
      window.clearTimeout(pulseTimer);
      pulseTimer = null;
    }
    targetX = restingPoint.x;
    targetY = restingPoint.y;
    currentX = restingPoint.x;
    currentY = restingPoint.y;
    classroomAuxMonitor.style.setProperty("--crt-mx", `${restingPoint.x}%`);
    classroomAuxMonitor.style.setProperty("--crt-my", `${restingPoint.y}%`);
    classroomAuxMonitor.style.setProperty("--crt-beam", "0");
    resetElectricalVariables();
  };

  const animateGlass = () => {
    if (!isActive() || reducedMotion.matches || document.hidden) {
      animationFrame = null;
      return;
    }

    currentX += (targetX - currentX) * 0.045;
    currentY += (targetY - currentY) * 0.045;
    beam = (beam + 0.11) % 100;
    classroomAuxMonitor.style.setProperty("--crt-mx", `${currentX.toFixed(3)}%`);
    classroomAuxMonitor.style.setProperty("--crt-my", `${currentY.toFixed(3)}%`);
    classroomAuxMonitor.style.setProperty("--crt-beam", beam.toFixed(3));
    animationFrame = window.requestAnimationFrame(animateGlass);
  };

  const scheduleAnalogPulse = () => {
    if (!isActive() || reducedMotion.matches || document.hidden) {
      pulseTimer = null;
      resetElectricalVariables();
      return;
    }

    const random = Math.random();
    let brightness = 1;
    let jitterX = 0;
    let jitterY = 0;
    let ghost = 0.08;

    if (random < 0.09) {
      brightness = 0.985 + Math.random() * 0.012;
    }
    if (random < 0.035) {
      brightness = 0.965 + Math.random() * 0.018;
      jitterX = (Math.random() - 0.5) * 0.7;
    }
    if (random < 0.012) {
      jitterX = (Math.random() - 0.5) * 1.2;
      jitterY = (Math.random() - 0.5) * 0.45;
      ghost = 0.12 + Math.random() * 0.1;
    }

    classroomAuxMonitor.style.setProperty("--crt-flicker", brightness.toFixed(4));
    classroomAuxMonitor.style.setProperty("--crt-jitter-x", `${jitterX.toFixed(3)}px`);
    classroomAuxMonitor.style.setProperty("--crt-jitter-y", `${jitterY.toFixed(3)}px`);
    classroomAuxMonitor.style.setProperty("--crt-ghost-x", `${ghost.toFixed(3)}cqw`);
    pulseTimer = window.setTimeout(scheduleAnalogPulse, 70 + Math.random() * 240);
  };

  const startMotion = () => {
    if (reducedMotion.matches || !isActive()) {
      stopMotion();
      return;
    }
    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(animateGlass);
    }
    if (pulseTimer === null) {
      scheduleAnalogPulse();
    }
  };

  document.addEventListener("pointermove", (event) => {
    if (!isActive() || reducedMotion.matches) {
      return;
    }
    const rect = classroomAuxCrt.getBoundingClientRect();
    const inside = event.clientX >= rect.left
      && event.clientX <= rect.right
      && event.clientY >= rect.top
      && event.clientY <= rect.bottom;
    if (!inside || rect.width <= 0 || rect.height <= 0) {
      targetX = restingPoint.x;
      targetY = restingPoint.y;
      return;
    }
    targetX = ((event.clientX - rect.left) / rect.width) * 100;
    targetY = ((event.clientY - rect.top) / rect.height) * 100;
  }, { passive: true });

  const monitorObserver = new MutationObserver(() => {
    if (isActive()) {
      startMotion();
    } else {
      stopMotion();
    }
  });
  monitorObserver.observe(classroomAuxMonitor, { attributes: true, attributeFilter: ["class"] });

  reducedMotion.addEventListener?.("change", () => {
    if (isActive()) {
      startMotion();
    } else {
      stopMotion();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopMotion();
    } else if (isActive()) {
      startMotion();
    }
  });
}

function setClassroomMompyGuide(visible, { speak = false, forceMaterialize = false } = {}) {
  if (!classroomMompyGuide || !classroomLessonPanel) {
    return;
  }

  clearTimeout(classroomMompyTimer);
  classroomMompyTimer = null;
  if (speak) {
    stopMompyVoice();
  }
  classroomLessonPanel.classList.toggle("has-classroom-mompy", Boolean(visible));

  if (!visible) {
    stopMompyVoice();
    classroomMompyGuide.classList.remove("is-materializing", "is-speaking", "is-visible");
    if (classroomMompyVisible && !prefersReducedMotion()) {
      classroomMompyGuide.classList.add("is-dematerializing");
      classroomMompyTimer = window.setTimeout(() => {
        classroomMompyGuide.classList.remove("is-dematerializing");
      }, 760);
    } else {
      classroomMompyGuide.classList.remove("is-dematerializing");
    }
    classroomMompyVisible = false;
    return;
  }

  classroomMompyGuide.classList.remove("is-dematerializing");
  const shouldMaterialize = forceMaterialize || !classroomMompyVisible;
  classroomMompyVisible = true;

  if (shouldMaterialize && !prefersReducedMotion()) {
    classroomMompyGuide.classList.remove("is-visible", "is-speaking");
    // Restart the six-frame assembly only when Mompy actually re-enters.
    void classroomMompyGuide.offsetWidth;
    classroomMompyGuide.classList.add("is-materializing");
    playClassroomMechanismCue("mompy");
    classroomMompyTimer = window.setTimeout(() => {
      classroomMompyGuide.classList.remove("is-materializing");
      classroomMompyGuide.classList.add("is-visible");
      if (speak) {
        classroomMompyGuide.classList.add("is-speaking");
        classroomMompyTimer = window.setTimeout(() => {
          classroomMompyGuide.classList.remove("is-speaking");
        }, 1900);
      }
    }, 1900);
    return;
  }

  classroomMompyGuide.classList.add("is-visible");
  classroomMompyGuide.classList.toggle("is-speaking", Boolean(speak && settingsState.mompyAnimations));
  if (speak && settingsState.mompyAnimations) {
    classroomMompyTimer = window.setTimeout(() => {
      classroomMompyGuide.classList.remove("is-speaking");
    }, 1900);
  }
}

function stopMompyVoiceMouth() {
  window.cancelAnimationFrame(activeMompyVoiceAnimationFrame);
  activeMompyVoiceAnimationFrame = null;
  classroomMompyGuide?.classList.remove("is-voice-driven", "is-mouth-open");
  classroomMompyGuide?.removeAttribute("data-mouth-frame");
}

function pickMompyTalkFrame(voiceLevel, currentFrame, previousFrame) {
  let weightedFrames;
  if (voiceLevel < 0.2) {
    weightedFrames = [2, 6, 2, 5, 1, 2];
  } else if (voiceLevel < 0.45) {
    weightedFrames = [2, 5, 2, 4, 6, 2, 5];
  } else if (voiceLevel < 0.7) {
    weightedFrames = [2, 4, 2, 3, 5, 2, 4];
  } else {
    weightedFrames = [3, 2, 4, 3, 2, 5, 4];
  }

  const nonRepeatingFrames = weightedFrames.filter((frame) => (
    frame !== currentFrame && frame !== previousFrame
  ));
  const availableFrames = nonRepeatingFrames.length
    ? nonRepeatingFrames
    : weightedFrames.filter((frame) => frame !== currentFrame);
  const framePool = availableFrames.length ? availableFrames : [2];
  return framePool[Math.floor(Math.random() * framePool.length)];
}

function getMompyTalkFrameDelay(voiceLevel) {
  const level = Math.min(1, Math.max(0, voiceLevel));
  const variationMs = (Math.random() - 0.5) * 18;
  return Math.round(Math.min(120, Math.max(60, 118 - level * 50 + variationMs)));
}

function startMompyVoiceMouth(voice, voiceConfig) {
  stopMompyVoiceMouth();
  if (!settingsState.mompyAnimations || prefersReducedMotion()) {
    return;
  }

  classroomMompyGuide?.classList.remove("is-screen-action-ready");

  const mouthLevels = voiceConfig.mouthLevels;
  const mouthWindowMs = voiceConfig.mouthWindowMs;
  if (!mouthLevels?.length || !mouthWindowMs) {
    return;
  }

  let mouthOpen = false;
  let mouthFrame = 1;
  let previousMouthFrame = 1;
  let nextMouthFrame = 0;

  const updateMouth = (now) => {
    if (activeMompyVoice !== voice || voice.ended) {
      return;
    }
    if (voice.paused) {
      activeMompyVoiceAnimationFrame = window.requestAnimationFrame(updateMouth);
      return;
    }

    const levelIndex = Math.min(
      mouthLevels.length - 1,
      Math.floor((voice.currentTime * 1000) / mouthWindowMs),
    );
    const voiceLevel = mouthLevels[Math.max(0, levelIndex)] || 0;
    const hasVoice = voiceLevel > 0.075;

    if (!hasVoice) {
      mouthOpen = false;
      previousMouthFrame = mouthFrame;
      mouthFrame = 1;
      nextMouthFrame = now;
    } else if (now >= nextMouthFrame) {
      if (USE_EXTENDED_TALK_FRAMES) {
        const nextFrame = pickMompyTalkFrame(voiceLevel, mouthFrame, previousMouthFrame);
        previousMouthFrame = mouthFrame;
        mouthFrame = nextFrame;
        nextMouthFrame = now + getMompyTalkFrameDelay(voiceLevel);
      } else {
        mouthOpen = !mouthOpen;
        nextMouthFrame = now + Math.round(190 - voiceLevel * 115);
      }
    }

    classroomMompyGuide?.classList.add("is-speaking", "is-voice-driven");
    if (USE_EXTENDED_TALK_FRAMES) {
      classroomMompyGuide?.classList.remove("is-mouth-open");
      if (classroomMompyGuide) {
        classroomMompyGuide.dataset.mouthFrame = String(mouthFrame);
      }
    } else {
      classroomMompyGuide?.removeAttribute("data-mouth-frame");
      classroomMompyGuide?.classList.toggle("is-mouth-open", mouthOpen);
    }
    activeMompyVoiceAnimationFrame = window.requestAnimationFrame(updateMouth);
  };

  activeMompyVoiceAnimationFrame = window.requestAnimationFrame(updateMouth);
}

function stopMompyVoice() {
  const voice = activeMompyVoice;
  const endedHandler = activeMompyVoiceEndedHandler;
  activeMompyVoice = null;
  activeMompyVoiceEndedHandler = null;
  stopMompyVoiceMouth();
  classroomMompyGuide?.classList.remove("is-speaking");

  if (!voice) {
    return;
  }

  if (endedHandler) {
    voice.removeEventListener("ended", endedHandler);
  }
  voice.pause();
  voice.currentTime = 0;
}

function playMompyVoice(voiceKey, { onEnded } = {}) {
  stopMompyVoice();
  const voiceConfig = MOMPY_VOICE_MANIFEST[voiceKey];
  if (!voiceConfig || voiceConfig.enabled === false) {
    return null;
  }

  const voice = new Audio(voiceConfig.source);
  voice.preload = "auto";
  const handleEnded = () => {
    if (activeMompyVoice !== voice) {
      return;
    }

    activeMompyVoice = null;
    activeMompyVoiceEndedHandler = null;
    stopMompyVoiceMouth();
    classroomMompyGuide?.classList.remove("is-speaking");
    if (classroomMompyGuide?.classList.contains("is-use-cases-screen")) {
      classroomMompyGuide.classList.add("is-screen-action-ready");
    }
    onEnded?.();
  };

  activeMompyVoice = voice;
  activeMompyVoiceEndedHandler = handleEnded;
  voice.addEventListener("ended", handleEnded, { once: true });
  startMompyVoiceMouth(voice, voiceConfig);
  const playAttempt = voice.play();
  playAttempt?.catch((error) => {
    if (activeMompyVoice !== voice) {
      return;
    }

    voice.removeEventListener("ended", handleEnded);
    activeMompyVoice = null;
    activeMompyVoiceEndedHandler = null;
    stopMompyVoiceMouth();
    classroomMompyGuide?.classList.remove("is-speaking");
    if (classroomMompyGuide?.classList.contains("is-use-cases-screen")) {
      classroomMompyGuide.classList.add("is-screen-action-ready");
    }
    console.warn("Mompy voice playback failed.", error);
    onEnded?.();
  });
  return voice;
}

function clearRichLessonInteractionTimer() {
  window.clearTimeout(classroomInteractionTimer);
  classroomInteractionTimer = null;
  if (activeRichLessonState?.automationDemo) {
    activeRichLessonState.automationDemo.cancelled = true;
    activeRichLessonState.automationDemo = null;
  }
  if (activeRichLessonState?.sitesDemo) {
    activeRichLessonState.sitesDemo.cancelled = true;
    activeRichLessonState.sitesDemo = null;
  }
  if (activeRichLessonState?.dataAiDemo) {
    activeRichLessonState.dataAiDemo.cancelled = true;
    activeRichLessonState.dataAiDemo = null;
  }
  if (activeRichLessonState?.scienceEducationDemo) {
    activeRichLessonState.scienceEducationDemo.cancelled = true;
    activeRichLessonState.scienceEducationDemo = null;
  }
  if (activeRichLessonState?.syntaxDemo) {
    activeRichLessonState.syntaxDemo.cancelled = true;
    window.clearTimeout(activeRichLessonState.syntaxDemo.timer);
    activeRichLessonState.syntaxDemo = null;
  }
  if (activeRichLessonState?.stringValueDemo) {
    activeRichLessonState.stringValueDemo.cancelled = true;
    window.clearTimeout(activeRichLessonState.stringValueDemo.timer);
    activeRichLessonState.stringValueDemo = null;
  }
  if (activeRichLessonState?.printFunctionDemo) {
    activeRichLessonState.printFunctionDemo.cancelled = true;
    window.clearTimeout(activeRichLessonState.printFunctionDemo.timer);
    activeRichLessonState.printFunctionDemo = null;
  }
  if (activeRichLessonState?.readingDemo) {
    activeRichLessonState.readingDemo.cancelled = true;
    window.clearTimeout(activeRichLessonState.readingDemo.timer);
    activeRichLessonState.readingDemo = null;
  }
  if (activeRichLessonState?.lineOrderDemo) {
    activeRichLessonState.lineOrderDemo.cancelled = true;
    window.clearTimeout(activeRichLessonState.lineOrderDemo.timer);
    activeRichLessonState.lineOrderDemo = null;
  }
  if (activeRichLessonState?.pairDemo) {
    activeRichLessonState.pairDemo.cancelled = true;
    window.clearTimeout(activeRichLessonState.pairDemo.timer);
    activeRichLessonState.pairDemo = null;
  }
}

function clearClassroomMompyScreenAction() {
  if (!classroomMompyGuide || !classroomMompyScreenAction) {
    return;
  }

  classroomMompyGuide.classList.remove("has-screen-action");
  classroomMompyGuide.classList.remove("is-automation-code-mode");
  classroomMompyScreenAction.hidden = true;
  classroomMompyScreenAction.disabled = false;
  classroomMompyScreenAction.classList.remove("has-code", "is-automation-display", "has-inline-continue");
  classroomMompyScreenAction.textContent = "";
  classroomMompyScreenActionHandler = null;
  classroomMompyScreenAction.removeAttribute("aria-label");
}

function showClassroomMompyScreenAction(label, onClick, { code = "" } = {}) {
  if (!classroomMompyGuide || !classroomMompyScreenAction) {
    return;
  }

  if (!classroomMompyVisible) {
    setClassroomMompyGuide(true, { speak: false, forceMaterialize: true });
    window.setTimeout(() => {
      showClassroomMompyScreenAction(label, onClick, { code });
    }, prefersReducedMotion() ? 20 : 1920);
    return;
  }

  classroomMompyGuide.classList.remove("is-speaking");
  classroomMompyGuide.classList.add("has-screen-action");
  classroomMompyGuide.classList.remove("is-automation-code-mode");
  classroomMompyScreenAction.classList.remove("is-automation-display", "has-inline-continue");
  classroomMompyScreenAction.classList.toggle("has-code", Boolean(code));
  classroomMompyScreenAction.disabled = false;
  if (code) {
    classroomMompyScreenAction.replaceChildren(
      createClassroomNode("code", "classroom-mompy-screen-code", code),
      createClassroomNode("span", "classroom-mompy-screen-action-label", label),
    );
  } else {
    classroomMompyScreenAction.textContent = label;
  }
  classroomMompyScreenAction.setAttribute("aria-label", code ? `${code}. ${label}` : label);
  classroomMompyScreenAction.hidden = false;
  classroomMompyScreenActionHandler = onClick;
  window.requestAnimationFrame(() => {
    if (classroomLessonContent?.dataset.interactive === "true") {
      classroomMompyScreenAction.focus({ preventScroll: true });
    }
  });
}

classroomMompyScreenAction?.addEventListener("click", () => {
  const handler = classroomMompyScreenActionHandler;
  clearClassroomMompyScreenAction();
  handler?.();
});

function clearClassroomTypewriter({ complete = false } = {}) {
  if (complete && classroomTypewriterFinisher) {
    classroomTypewriterFinisher();
    return;
  }

  stopMompyVoice();
  classroomTypewriterToken += 1;
  window.clearTimeout(classroomTypewriterTimer);
  classroomTypewriterTimer = null;
  classroomTypewriterFinisher = null;
  classroomLessonContent?.classList.remove("is-typing");
  classroomLessonContent?.removeAttribute("aria-busy");
  classroomLessonContent
    ?.querySelectorAll(".is-currently-typing")
    .forEach((element) => element.classList.remove("is-currently-typing"));
  classroomLessonContent
    ?.querySelectorAll(".classroom-rich-callout")
    .forEach((element) => element.style.removeProperty("visibility"));
  classroomLessonContent
    ?.querySelectorAll(".classroom-rich-mompy-line")
    .forEach((element) => element.style.removeProperty("visibility"));
  classroomMompyGuide?.classList.remove("is-speaking");
}

function runClassroomTypewriter(root, { delay = 120, onComplete } = {}) {
  clearClassroomTypewriter();
  if (!root) {
    onComplete?.();
    return;
  }

  const selectors = [
    ".classroom-rich-title",
    ".classroom-rich-lead",
    ".classroom-rich-paragraph",
    ".classroom-rich-list li",
    ".classroom-rich-callout-copy",
    ".classroom-rich-note",
    ".classroom-rich-mompy-copy",
  ];
  const entries = [...root.querySelectorAll(selectors.join(","))]
    .map((element) => ({ element, text: element.textContent || "" }))
    .filter((entry) => entry.text.length > 0);

  if (!entries.length) {
    onComplete?.();
    return;
  }

  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    const hasMompyCopy = entries.some(({ element }) => element.classList.contains("classroom-rich-mompy-copy"));
    const voiceKey = `${currentLanguage}:${activeRichLessonState?.lessonId}:${activeRichLessonState?.stepId}:mompy`;
    const voice = hasMompyCopy ? playMompyVoice(voiceKey, { onEnded: onComplete }) : null;
    if (!voice) {
      onComplete?.();
    }
    return;
  }

  entries.forEach(({ element, text }) => {
    const height = element.getBoundingClientRect().height;
    if (height > 0) {
      element.style.minHeight = `${height}px`;
    }
    element.setAttribute("aria-label", text);
    element.textContent = "";
    element.closest(".classroom-rich-callout")?.style.setProperty("visibility", "hidden");
    element.closest(".classroom-rich-mompy-line")?.style.setProperty("visibility", "hidden");
  });

  classroomLessonContent?.classList.add("is-typing");
  classroomLessonContent?.setAttribute("aria-busy", "true");
  const token = ++classroomTypewriterToken;
  const totalCharacters = entries.reduce((total, entry) => total + entry.text.length, 0);
  const characterDelay = Math.max(12, Math.min(34, Math.round(4700 / Math.max(1, totalCharacters))));
  let entryIndex = 0;
  let characterIndex = 0;
  let finished = false;
  let mompyVoiceStarted = false;
  let mompyVoice = null;
  let waitingForMompyVoice = false;
  let finish = null;
  const mompyVoiceKey = `${currentLanguage}:${activeRichLessonState?.lessonId}:${activeRichLessonState?.stepId}:mompy`;
  const mompyVoiceConfig = MOMPY_VOICE_MANIFEST[mompyVoiceKey];
  const mompyVoiceDuration = mompyVoiceConfig?.enabled === false
    ? 0
    : (mompyVoiceConfig?.durationMs || 0);
  const hasMompyCopy = entries.some(({ element }) => element.classList.contains("classroom-rich-mompy-copy"));

  const startMompySpeech = () => {
    if (mompyVoiceStarted || !hasMompyCopy) {
      return;
    }
    mompyVoiceStarted = true;
    mompyVoice = playMompyVoice(mompyVoiceKey, {
      onEnded: () => {
        if (waitingForMompyVoice) {
          finish?.();
        }
      },
    });
    if (classroomMompyVisible && settingsState.mompyAnimations) {
      classroomMompyGuide?.classList.add("is-speaking");
    }
  };

  const revealAllText = () => {
    entries.forEach(({ element, text }) => {
      element.textContent = text;
      element.classList.remove("is-currently-typing");
      element.style.removeProperty("min-height");
      element.removeAttribute("aria-label");
      element.closest(".classroom-rich-callout")?.style.removeProperty("visibility");
      element.closest(".classroom-rich-mompy-line")?.style.removeProperty("visibility");
    });
    classroomLessonContent?.classList.remove("is-typing");
    classroomLessonContent?.removeAttribute("aria-busy");
  };

  finish = () => {
    if (finished || token !== classroomTypewriterToken) {
      return;
    }
    startMompySpeech();
    window.clearTimeout(classroomTypewriterTimer);
    classroomTypewriterTimer = null;
    revealAllText();
    if (mompyVoice && activeMompyVoice === mompyVoice && !mompyVoice.ended) {
      waitingForMompyVoice = true;
      return;
    }

    finished = true;
    waitingForMompyVoice = false;
    classroomTypewriterFinisher = null;
    if (!activeMompyVoice) {
      classroomMompyGuide?.classList.remove("is-speaking");
    }
    onComplete?.();
  };

  classroomTypewriterFinisher = finish;
  const typeNextCharacter = () => {
    if (token !== classroomTypewriterToken || finished) {
      return;
    }

    const current = entries[entryIndex];
    if (!current) {
      finish();
      return;
    }

    entries.forEach(({ element }) => element.classList.remove("is-currently-typing"));
    current.element.closest(".classroom-rich-callout")?.style.removeProperty("visibility");
    current.element.closest(".classroom-rich-mompy-line")?.style.removeProperty("visibility");
    const isMompyCopy = current.element.classList.contains("classroom-rich-mompy-copy");
    if (isMompyCopy && characterIndex === 0) {
      startMompySpeech();
    }
    current.element.classList.add("is-currently-typing");
    characterIndex += 1;
    current.element.textContent = current.text.slice(0, characterIndex);
    if (characterIndex >= current.text.length) {
      current.element.classList.remove("is-currently-typing");
      entryIndex += 1;
      characterIndex = 0;
    }
    const nextCharacterDelay = isMompyCopy && mompyVoice && mompyVoiceDuration
      ? Math.max(characterDelay, Math.round(mompyVoiceDuration / Math.max(1, current.text.length)))
      : characterDelay;
    classroomTypewriterTimer = window.setTimeout(typeNextCharacter, nextCharacterDelay);
  };

  classroomTypewriterTimer = window.setTimeout(() => {
    if (token !== classroomTypewriterToken) {
      return;
    }
    typeNextCharacter();
  }, delay);
}

function runClassroomExecutionDemo(demo, onComplete) {
  clearRichLessonInteractionTimer();
  if (!demo?.code) {
    onComplete?.();
    return;
  }

  const lessonId = activeRichLessonState?.lessonId;
  const stepId = activeRichLessonState?.stepId;
  const isCurrentStep = () => (
    activeRichLessonState?.lessonId === lessonId
    && activeRichLessonState?.stepId === stepId
  );

  if (pythonClassroomLessonPayload && !demo.pythonResolved) {
    callPythonBackend("run_lesson_example", lessonId, stepId, currentLanguage)
      .then((result) => {
        if (!isCurrentStep()) {
          return;
        }
        const resolvedOutput = result?.ok
          ? String(result.output ?? "").replace(/\r?\n$/, "")
          : (currentLanguage === "pt-BR" ? "Falha ao executar o exemplo." : "Example execution failed.");
        runClassroomExecutionDemo({
          ...demo,
          output: resolvedOutput,
          pythonResolved: true,
        }, onComplete);
      })
      .catch(() => {
        if (isCurrentStep()) {
          runClassroomExecutionDemo({
            ...demo,
            output: currentLanguage === "pt-BR" ? "Falha ao executar o exemplo." : "Example execution failed.",
            pythonResolved: true,
          }, onComplete);
        }
      });
    return;
  }

  const label = demo.label || (currentLanguage === "pt-BR" ? "EXECUÇÃO" : "EXECUTION");
  const inputLabel = demo.inputLabel || "INPUT";
  const outputLabel = Object.prototype.hasOwnProperty.call(demo, "outputLabel")
    ? demo.outputLabel
    : "OUTPUT";
  const resultVisual = {
    image: demo.image,
    imageAlt: demo.imageAlt,
    resultCaption: demo.resultCaption,
  };
  const schedule = (callback, delay) => {
    window.clearTimeout(classroomInteractionTimer);
    classroomInteractionTimer = window.setTimeout(() => {
      classroomInteractionTimer = null;
      if (isCurrentStep()) {
        callback();
      }
    }, delay);
  };

  if (prefersReducedMotion() || !settingsState.mompyAnimations) {
    setClassroomAuxMonitor({
      kind: "execution",
      label: outputLabel,
      phase: "result",
      inputLabel,
      code: demo.code,
      outputLabel,
      output: demo.output,
      ...resultVisual,
    });
    schedule(() => onComplete?.(), 80);
    return;
  }

  let characterIndex = 0;
  const renderTypingFrame = () => {
    characterIndex += 1;
    setClassroomAuxMonitor({
      kind: "execution",
      label: inputLabel,
      phase: "typing",
      inputLabel,
      code: demo.code.slice(0, characterIndex),
      outputLabel,
    });

    if (characterIndex < demo.code.length) {
      schedule(renderTypingFrame, 52);
      return;
    }

    schedule(() => {
      setClassroomAuxMonitor({
        kind: "execution",
        label,
        phase: "running",
        inputLabel,
        code: demo.code,
        outputLabel,
        ariaLabel: demo.running || (currentLanguage === "pt-BR" ? "Python executando o código" : "Python running the code"),
      });
      schedule(() => {
        setClassroomAuxMonitor({
          kind: "execution",
          label: outputLabel,
          phase: "result",
          inputLabel,
          code: demo.code,
          outputLabel,
          output: demo.output,
          ...resultVisual,
        });
        schedule(() => onComplete?.(), 900);
      }, 900);
    }, 360);
  };

  const monitorNeedsOpening = !["open", "opening"].includes(classroomAuxMonitorMode);
  setClassroomAuxMonitor({
    kind: "execution",
    label: inputLabel,
    phase: "ready",
    inputLabel,
    code: "",
    outputLabel,
  });
  schedule(renderTypingFrame, monitorNeedsOpening && !prefersReducedMotion() ? 2380 : 180);
}

function scheduleRichLessonAdvance(briefing, stepIndex, delay = 950, anchor = null) {
  clearRichLessonInteractionTimer();
  const lessonId = activeRichLessonState?.lessonId;
  const stepId = activeRichLessonState?.stepId;
  classroomInteractionTimer = window.setTimeout(() => {
    classroomInteractionTimer = null;
    if (
      activeRichLessonState?.lessonId !== lessonId
      || activeRichLessonState?.stepId !== stepId
    ) {
      return;
    }

    const container = anchor?.parentElement || classroomLessonContent?.querySelector(".classroom-rich-shell");
    if (!container || container.querySelector("[data-answer-continue]")) {
      return;
    }

    const actions = createClassroomNode("div", "classroom-rich-actions");
    actions.classList.add("is-answer-continue");
    actions.dataset.answerContinue = "true";
    const continueButton = createRichLessonButton(
      currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE",
      {
        primary: true,
        onClick: () => renderBriefingStep(briefing, stepIndex + 1),
      },
    );
    actions.append(continueButton);
    if (anchor?.parentElement === container) {
      anchor.after(actions);
    } else {
      container.append(actions);
    }
    continueButton.focus({ preventScroll: true });
  }, prefersReducedMotion() ? 80 : delay);
}

function createRichLessonButton(label, { primary = false, className = "", onClick } = {}) {
  const button = createClassroomNode(
    "button",
    ["classroom-rich-action", primary ? "is-primary" : "", className].filter(Boolean).join(" "),
    label,
  );
  button.type = "button";
  if (onClick) {
    button.addEventListener("click", onClick);
  }
  return button;
}

function appendRichLessonCopy(container, step) {
  if (step.lead) {
    container.append(createClassroomNode("p", "classroom-rich-lead", step.lead));
  }

  const appendCallout = (kind, labelPt, labelEn, value) => {
    if (!value) return;
    const callout = createClassroomNode("section", `classroom-rich-callout is-${kind}`);
    callout.append(
      createClassroomNode(
        "strong",
        "classroom-rich-callout-label",
        currentLanguage === "pt-BR" ? labelPt : labelEn,
      ),
      createClassroomNode("p", "classroom-rich-callout-copy", value),
    );
    container.append(callout);
  };

  appendCallout("definition", "CONCEITO", "CONCEPT", step.definition);

  (step.body || []).forEach((line) => {
    container.append(createClassroomNode("p", "classroom-rich-paragraph", line));
  });

  appendCallout("mental-model", "COMO PENSAR", "MENTAL MODEL", step.mentalModel);

  if (step.bullets?.length) {
    const list = createClassroomNode("ul", "classroom-rich-list");
    step.bullets.forEach((item) => {
      list.append(createClassroomNode("li", "", item));
    });
    container.append(list);
  }

  if (step.code && !step.hideCodeUntilReveal) {
    const codeShell = createClassroomNode("div", "classroom-rich-code");
    codeShell.append(createClassroomNode("span", "classroom-rich-code-label", "PYTHON"));
    codeShell.append(createClassroomNode("pre", "", step.code));
    container.append(codeShell);
  }

  appendCallout("warning", "ATENÇÃO", "WATCH OUT", step.warning);

  if (step.note) {
    container.append(createClassroomNode("p", "classroom-rich-note", step.note));
  }
}

function renderRichProcessMap(shell, step) {
  if (!step.processStages?.length) {
    return null;
  }

  const process = createClassroomNode("ol", "classroom-rich-process");
  process.setAttribute(
    "aria-label",
    currentLanguage === "pt-BR" ? "Etapas do programa" : "Program stages",
  );
  step.processStages.forEach((stage, index) => {
    const item = createClassroomNode("li", "classroom-rich-process-stage");
    item.dataset.processStage = String(index);
    item.append(
      createClassroomNode("span", "classroom-rich-process-number", String(index + 1).padStart(2, "0")),
      createClassroomNode("strong", "classroom-rich-process-label", stage.label),
      createClassroomNode("span", "classroom-rich-process-detail", stage.detail || ""),
    );
    process.append(item);
  });
  shell.append(process);
  return process;
}

function setRichProcessStage(process, currentIndex, { completeCurrent = false } = {}) {
  process?.querySelectorAll(".classroom-rich-process-stage").forEach((item, index) => {
    item.classList.toggle("is-current", index === currentIndex && !completeCurrent);
    item.classList.toggle("is-complete", index < currentIndex || (completeCurrent && index === currentIndex));
  });
}

function startGuidedClassroomRun(briefing, step, stepIndex, shell, process) {
  const lessonId = activeRichLessonState?.lessonId;
  const stepId = activeRichLessonState?.stepId;
  const isCurrentStep = () => (
    activeRichLessonState?.lessonId === lessonId
    && activeRichLessonState?.stepId === stepId
  );
  const schedule = (callback, delay) => {
    clearRichLessonInteractionTimer();
    classroomInteractionTimer = window.setTimeout(() => {
      classroomInteractionTimer = null;
      if (isCurrentStep()) callback();
    }, delay);
  };
  const inputLabel = step.inputLabel || (currentLanguage === "pt-BR" ? "CÓDIGO" : "CODE");
  const outputLabel = step.outputLabel || (currentLanguage === "pt-BR" ? "RESULTADO" : "OUTPUT");
  const status = createClassroomNode(
    "p",
    "classroom-rich-guided-status",
    currentLanguage === "pt-BR"
      ? "Comece revelando a instrução que será entregue ao Python."
      : "Start by revealing the instruction that will be given to Python.",
  );
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  shell.append(status);
  setRichProcessStage(process, 0);

  const revealResult = () => {
    if (!isCurrentStep()) return;
    setClassroomAuxMonitor({
      kind: "execution",
      label: outputLabel,
      phase: "result",
      inputLabel,
      code: step.code,
      outputLabel,
      output: activeRichLessonState.resolvedOutput ?? step.output ?? "",
    });
    setRichProcessStage(process, 2, { completeCurrent: true });
    status.textContent = currentLanguage === "pt-BR"
      ? "Resultado é a resposta produzida pela execução. O código continua sendo a instrução."
      : "Output is the answer produced by execution. The code remains the instruction.";
    audioManager.playSuccess();
    showClassroomMompyScreenAction(
      currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE",
      () => renderBriefingStep(briefing, stepIndex + 1),
    );
  };

  const handleExecutionFailure = () => {
    if (!isCurrentStep()) return;
    activeRichLessonState.locked = false;
    activeRichLessonState.resolvedOutput = null;
    setRichProcessStage(process, 1);
    status.textContent = currentLanguage === "pt-BR"
      ? "O intérprete não concluiu esta execução. Tente novamente; nenhum resultado foi aceito."
      : "The interpreter did not complete this run. Try again; no output was accepted.";
    setClassroomAuxMonitor({
      kind: "execution",
      label: currentLanguage === "pt-BR" ? "ERRO DE EXECUÇÃO" : "EXECUTION ERROR",
      phase: "result",
      inputLabel,
      code: step.code,
      outputLabel: currentLanguage === "pt-BR" ? "SEM RESULTADO" : "NO OUTPUT",
      output: currentLanguage === "pt-BR" ? "TENTE NOVAMENTE" : "TRY AGAIN",
    });
    audioManager.playError();
    showClassroomMompyScreenAction(
      currentLanguage === "pt-BR" ? "TENTAR NOVAMENTE" : "TRY AGAIN",
      executeCode,
    );
  };

  const executeCode = async () => {
    if (!isCurrentStep() || activeRichLessonState.locked) return;
    activeRichLessonState.locked = true;
    clearClassroomMompyScreenAction();
    setRichProcessStage(process, 1);
    status.textContent = currentLanguage === "pt-BR"
      ? "Python está lendo a instrução e realizando a ação pedida."
      : "Python is reading the instruction and performing the requested action.";
    setClassroomAuxMonitor({
      kind: "execution",
      label: currentLanguage === "pt-BR" ? "PYTHON EXECUTANDO" : "PYTHON RUNNING",
      phase: "running",
      inputLabel,
      code: step.code,
      outputLabel,
      ariaLabel: currentLanguage === "pt-BR" ? "Python executando o código" : "Python running the code",
    });

    let resolvedOutput = step.output ?? "";
    if (pythonClassroomLessonPayload) {
      try {
        const result = await callPythonBackend("run_lesson_example", lessonId, stepId, currentLanguage);
        if (!result?.ok || result.matches_expected_output !== true) {
          handleExecutionFailure();
          return;
        }
        resolvedOutput = String(result.output ?? "").replace(/\r?\n$/, "");
      } catch {
        handleExecutionFailure();
        return;
      }
    }
    if (!isCurrentStep()) return;
    activeRichLessonState.resolvedOutput = resolvedOutput;
    schedule(() => {
      activeRichLessonState.locked = false;
      setRichProcessStage(process, 2);
      status.textContent = currentLanguage === "pt-BR"
        ? "A execução terminou. Agora revele a resposta produzida."
        : "Execution finished. Now reveal the answer it produced.";
      showClassroomMompyScreenAction(
        currentLanguage === "pt-BR" ? "VER RESULTADO" : "SEE OUTPUT",
        revealResult,
      );
    }, prefersReducedMotion() ? 80 : 850);
  };

  const revealCode = () => {
    if (!isCurrentStep()) return;
    clearClassroomMompyScreenAction();
    status.textContent = currentLanguage === "pt-BR"
      ? "Código é a instrução escrita. Observe a telinha montar cada símbolo."
      : "Code is the written instruction. Watch the small monitor assemble every symbol.";
    setClassroomAuxMonitor({
      kind: "execution",
      label: inputLabel,
      phase: "typing",
      inputLabel,
      code: "",
      outputLabel,
    });

    let characterIndex = 0;
    const typeNextCharacter = () => {
      if (!isCurrentStep()) return;
      characterIndex += 1;
      setClassroomAuxMonitor({
        kind: "execution",
        label: inputLabel,
        phase: "typing",
        inputLabel,
        code: step.code.slice(0, characterIndex),
        outputLabel,
      });
      if (characterIndex < step.code.length) {
        schedule(typeNextCharacter, prefersReducedMotion() ? 8 : 58);
        return;
      }
      setRichProcessStage(process, 1);
      status.textContent = currentLanguage === "pt-BR"
        ? "A instrução está pronta. Agora peça ao Python para executá-la."
        : "The instruction is ready. Now ask Python to run it.";
      showClassroomMompyScreenAction(
        currentLanguage === "pt-BR" ? "EXECUTAR" : "RUN",
        executeCode,
      );
    };
    schedule(typeNextCharacter, prefersReducedMotion() ? 30 : 2050);
  };

  showClassroomMompyScreenAction(
    currentLanguage === "pt-BR" ? "VER CÓDIGO" : "SEE CODE",
    revealCode,
  );
}

function appendRichMompyLine(container, step) {
  if (!step.mompy || !step.mompyVisible) {
    return;
  }

  const line = createClassroomNode("p", "classroom-rich-mompy-line");
  line.append(createClassroomNode("span", "classroom-rich-mompy-label", "MOMPY // "));
  line.append(createClassroomNode("span", "classroom-rich-mompy-copy", step.mompy));
  container.append(line);
}

function renderRichLessonFeedback(shell) {
  const feedback = createClassroomNode("p", "classroom-rich-feedback");
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  shell.append(feedback);
  return feedback;
}

function renderRichLessonHint(shell) {
  const hint = createClassroomNode("p", "classroom-rich-feedback is-hint");
  hint.hidden = true;
  hint.setAttribute("role", "status");
  hint.setAttribute("aria-live", "polite");
  shell.append(hint);
  return hint;
}

function revealRichLessonHint(step, hint) {
  if (!step.hint || !hint) {
    return;
  }

  setClassroomMompyGuide(true, { speak: true, forceMaterialize: !classroomMompyVisible });
  hint.hidden = false;
  hint.textContent = `MOMPY // ${step.hint}`;
}

function scheduleRichLessonHint(step, hint) {
  const lessonId = activeRichLessonState?.lessonId;
  const stepId = activeRichLessonState?.stepId;
  const attempts = activeRichLessonState?.attempts || 0;
  window.setTimeout(() => {
    if (
      activeRichLessonState?.lessonId !== lessonId
      || activeRichLessonState?.stepId !== stepId
      || (activeRichLessonState?.attempts || 0) < attempts
    ) {
      return;
    }
    revealRichLessonHint(step, hint);
  }, prefersReducedMotion() ? 120 : 900);
}

async function checkRichLessonChoiceWithPython(briefing, step, choice, choiceIndex) {
  if (typeof choice.correct === "boolean") {
    return { correct: Boolean(choice.correct), offline: true };
  }

  const choiceId = choice.id || `choice_${String.fromCharCode(97 + choiceIndex)}`;
  const result = await callPythonBackend(
    "check_lesson_choice",
    briefing.id,
    step.id,
    choiceId,
    currentLanguage,
  );
  return result && typeof result.correct === "boolean" ? result : null;
}

function getRichLessonReviewStepIndex(briefing, questionStepId) {
  const reviewStepId = CLASSROOM_REVIEW_STEP_BY_QUESTION[questionStepId];
  const lesson = getRichClassroomLesson(briefing?.id);
  if (!reviewStepId || !lesson?.steps?.length) {
    return -1;
  }
  return lesson.steps.findIndex((candidate) => candidate.id === reviewStepId);
}

function renderRichChoiceInteraction(shell, briefing, step, stepIndex) {
  const choices = createClassroomNode("div", "classroom-rich-choices");
  const feedback = renderRichLessonFeedback(shell);
  const hint = renderRichLessonHint(shell);

  (step.choices || []).forEach((choice, choiceIndex) => {
    const prefix = String.fromCharCode(65 + choiceIndex);
    const button = createRichLessonButton(`${prefix}. ${choice.text}`, {
      className: `classroom-rich-choice${choice.code ? " is-code" : ""}`,
    });
    button.dataset.choiceId = choice.id || `choice_${String.fromCharCode(97 + choiceIndex)}`;
    button.addEventListener("click", async () => {
      if (activeRichLessonState?.locked) {
        return;
      }

      activeRichLessonState.locked = true;
      choices.querySelectorAll("button").forEach((candidate) => {
        candidate.disabled = true;
      });
      const validation = await checkRichLessonChoiceWithPython(briefing, step, choice, choiceIndex);
      if (!validation) {
        activeRichLessonState.locked = false;
        choices.querySelectorAll("button").forEach((candidate) => {
          candidate.disabled = false;
        });
        feedback.className = "classroom-rich-feedback is-wrong";
        feedback.textContent = currentLanguage === "pt-BR"
          ? "Não foi possível validar esta resposta com o Python. Tente novamente."
          : "Python could not validate this answer. Try again.";
        return;
      }

      if (validation.correct) {
        activeRichLessonState.locked = true;
        button.classList.add("is-correct");
        feedback.className = "classroom-rich-feedback is-correct";
        feedback.textContent = validation.feedback || step.success || t("correctAnswer");
        setClassroomAuxMonitor({
          kind: "question",
          symbol: "✓",
          alt: currentLanguage === "pt-BR" ? "Resposta correta" : "Correct answer",
        });
        audioManager.playSuccess();
        scheduleRichLessonAdvance(briefing, stepIndex, 180, feedback);
        return;
      }

      const reviewStepIndex = getRichLessonReviewStepIndex(briefing, step.id);
      if (reviewStepIndex >= 0 && reviewStepIndex < stepIndex) {
        activeRichLessonState.locked = true;
        activeRichLessonState.attempts += 1;
        button.classList.add("is-wrong");
        feedback.className = "classroom-rich-feedback is-wrong";
        feedback.textContent = `${validation.feedback || step.error || t("chooseCorrect")} ${
          currentLanguage === "pt-BR"
            ? "Vamos rever o conceito antes de tentar novamente."
            : "Let us review the concept before trying again."
        }`;
        setClassroomAuxMonitor({
          kind: "question",
          symbol: "↺",
          alt: currentLanguage === "pt-BR"
            ? "Revisão do conceito necessária"
            : "Concept review required",
        });
        audioManager.playError();
        window.setTimeout(() => {
          renderBriefingStep(briefing, reviewStepIndex, {
            reviewReturnStepIndex: stepIndex,
          });
        }, prefersReducedMotion() ? 120 : 950);
        return;
      }

      activeRichLessonState.locked = false;
      choices.querySelectorAll("button").forEach((candidate) => {
        candidate.disabled = false;
      });
      activeRichLessonState.attempts += 1;
      button.classList.add("is-wrong");
      feedback.className = "classroom-rich-feedback is-wrong";
      feedback.textContent = validation.feedback || step.error || t("chooseCorrect");
      audioManager.playError();
      if (activeRichLessonState.attempts >= 2) {
        scheduleRichLessonHint(step, hint);
      }
      window.setTimeout(() => {
        button.classList.remove("is-wrong");
      }, prefersReducedMotion() ? 60 : 620);
    });
    choices.append(button);
  });

  shell.insertBefore(choices, feedback);
}

function renderRichSequenceInteraction(shell, briefing, step, stepIndex) {
  const sequence = createClassroomNode("div", "classroom-rich-sequence");
  const answer = createClassroomNode("div", "classroom-rich-sequence-answer");
  const feedback = renderRichLessonFeedback(shell);
  const hint = renderRichLessonHint(shell);
  shell.insertBefore(answer, feedback);
  shell.insertBefore(sequence, answer);

  const resetSelection = () => {
    activeRichLessonState.sequence = [];
    answer.replaceChildren();
    sequence.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
      button.classList.remove("is-selected", "is-wrong");
      button.removeAttribute("data-order");
    });
  };

  (step.sequenceItems || []).forEach((item) => {
    const button = createRichLessonButton(item.label, { className: "classroom-rich-sequence-item" });
    button.title = item.detail;
    button.addEventListener("click", async () => {
      if (activeRichLessonState?.locked || button.disabled) {
        return;
      }
      activeRichLessonState.sequence.push(item.id);
      button.disabled = true;
      button.classList.add("is-selected");
      button.dataset.order = String(activeRichLessonState.sequence.length);
      answer.append(createClassroomNode("span", "", item.label));

      const requiredLength = Number(step.sequenceLength)
        || step.sequenceItems?.length
        || step.correctOrder?.length
        || 0;
      if (activeRichLessonState.sequence.length < requiredLength) {
        return;
      }

      sequence.querySelectorAll("button").forEach((candidate) => {
        candidate.disabled = true;
      });
      const validation = Array.isArray(step.correctOrder)
        ? {
          correct: activeRichLessonState.sequence.every((id, index) => id === step.correctOrder[index]),
          offline: true,
        }
        : pythonClassroomLessonPayload
          ? await callPythonBackend(
          "check_lesson_sequence",
          briefing.id,
          step.id,
          [...activeRichLessonState.sequence],
          currentLanguage,
        )
          : null;

      if (!validation || typeof validation.correct !== "boolean") {
        feedback.className = "classroom-rich-feedback is-wrong";
        feedback.textContent = currentLanguage === "pt-BR"
          ? "Não foi possível validar esta ordem com o Python. Tente novamente."
          : "Python could not validate this order. Try again.";
        window.setTimeout(resetSelection, prefersReducedMotion() ? 80 : 900);
        return;
      }

      if (validation.correct) {
        activeRichLessonState.locked = true;
        sequence.querySelectorAll("button").forEach((candidate) => {
          candidate.classList.add("is-correct");
          candidate.disabled = true;
        });
        feedback.className = "classroom-rich-feedback is-correct";
        feedback.textContent = validation.feedback || step.success;
        setClassroomAuxMonitor({
          kind: "question",
          symbol: "✓",
          alt: currentLanguage === "pt-BR" ? "Resposta correta" : "Correct answer",
        });
        audioManager.playSuccess();
        scheduleRichLessonAdvance(briefing, stepIndex, 180, feedback);
        return;
      }

      activeRichLessonState.attempts += 1;
      sequence.querySelectorAll("button").forEach((candidate) => candidate.classList.add("is-wrong"));
      feedback.className = "classroom-rich-feedback is-wrong";
      feedback.textContent = validation.feedback || step.error;
      audioManager.playError();
      if (activeRichLessonState.attempts >= 2) {
        scheduleRichLessonHint(step, hint);
      }
      window.setTimeout(resetSelection, prefersReducedMotion() ? 80 : 900);
    });
    sequence.append(button);
  });
}

function createClassroomAutomationCodePanel(card) {
  const code = String(card.code || "");
  const codeLines = code.split("\n");
  const scrollCode = card.codeScroll === true;
  const longestCodeLine = codeLines.reduce(
    (largest, line) => Math.max(largest, Array.from(line).length),
    0,
  );
  const topic = String(card.codeTitle || card.label || "PYTHON");
  const root = createClassroomNode("div", "classroom-automation-code-panel");
  root.hidden = true;
  root.dataset.phase = "idle";
  root.dataset.codeScroll = scrollCode ? "true" : "false";
  root.dataset.codeDensity = scrollCode
    ? "normal"
    : longestCodeLine > 38
    ? "dense"
    : longestCodeLine > 28
      ? "compact"
      : "normal";
  root.setAttribute(
    "aria-label",
    currentLanguage === "pt-BR"
      ? `Demonstração sincronizada do código de ${topic}`
      : `Synchronized ${topic} code demonstration`,
  );

  const header = createClassroomNode("div", "classroom-automation-code-header");
  const title = createClassroomNode(
    "span",
    "classroom-automation-code-title",
    `PYTHON // ${topic}`,
  );
  const status = createClassroomNode(
    "span",
    "classroom-automation-code-status",
    currentLanguage === "pt-BR" ? "AGUARDANDO" : "WAITING",
  );
  status.setAttribute("aria-live", "polite");
  const cycle = createClassroomNode("span", "classroom-automation-code-cycle", "— / 3");
  header.append(title, status, cycle);

  const listing = createClassroomNode("div", "classroom-automation-code-listing");
  const lines = codeLines.map((lineText, index) => {
    const row = createClassroomNode("div", "classroom-automation-code-line");
    row.dataset.line = String(index + 1);
    const number = createClassroomNode(
      "span",
      "classroom-automation-line-number",
      index === 0 ? ">>>" : "...",
    );
    number.setAttribute("aria-hidden", "true");
    const codeText = createClassroomNode("code", "classroom-automation-line-code");
    row.append(number, codeText);
    listing.append(row);
    return { row, code: codeText, fullText: lineText };
  });
  root.append(header, listing);
  return { root, status, cycle, listing, lines, code, topic, scrollCode };
}

function mountClassroomAutomationCodePanel(panel) {
  if (!panel || !classroomMompyGuide || !classroomMompyScreenAction) return;
  classroomMompyGuide.classList.remove("is-speaking");
  classroomMompyGuide.classList.add("has-screen-action", "is-automation-code-mode");
  classroomMompyScreenAction.classList.remove("has-code", "has-inline-continue");
  classroomMompyScreenAction.classList.add("is-automation-display");
  classroomMompyScreenAction.disabled = true;
  panel.root.classList.remove("has-continue");
  panel.root.querySelector(".classroom-automation-continue-label")?.remove();
  classroomMompyScreenAction.replaceChildren(panel.root);
  classroomMompyScreenAction.hidden = false;
  classroomMompyScreenActionHandler = null;
  classroomMompyScreenAction.setAttribute(
    "aria-label",
    currentLanguage === "pt-BR"
      ? `Código de ${panel.topic} sendo executado.`
      : `${panel.topic} code running.`,
  );
  panel.root.hidden = false;
}

function showClassroomAutomationContinue(panel, onClick) {
  if (!panel || !classroomMompyGuide || !classroomMompyScreenAction) return;
  if (!panel.root.isConnected) {
    mountClassroomAutomationCodePanel(panel);
  }
  let label = panel.root.querySelector(".classroom-automation-continue-label");
  if (!label) {
    label = createClassroomNode(
      "span",
      "classroom-automation-continue-label",
      currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE",
    );
    panel.root.append(label);
  }
  panel.root.classList.add("has-continue");
  classroomMompyGuide.classList.add("has-screen-action", "is-automation-code-mode");
  classroomMompyScreenAction.classList.add("is-automation-display", "has-inline-continue");
  classroomMompyScreenAction.disabled = false;
  classroomMompyScreenAction.hidden = false;
  classroomMompyScreenActionHandler = onClick;
  classroomMompyScreenAction.setAttribute(
    "aria-label",
    currentLanguage === "pt-BR"
      ? `Demonstração de ${panel.topic} em andamento. Continuar disponível.`
      : `${panel.topic} demonstration running. Continue available.`,
  );
}

function updateClassroomCardsMompyAction() {
  const state = activeRichLessonState;
  if (!state?.cardDemoVisited || !state.cardsContinueHandler) return;
  const allVisited = state.cardDemoVisited.size >= state.cardDemoTotal;
  if (allVisited) {
    if (state.activeCodePanel?.root.isConnected) {
      showClassroomAutomationContinue(state.activeCodePanel, state.cardsContinueHandler);
      return;
    }
    showClassroomMompyScreenAction(
      currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE",
      state.cardsContinueHandler,
    );
    return;
  }
  if (state.activeCardLabel && state.activeCardDemoKind !== "automation-sync") {
    clearClassroomMompyScreenAction();
    setClassroomMompyGuide(true, { speak: false });
  }
}

function resetClassroomAutomationCodePanel(panel) {
  if (!panel) return;
  panel.root.dataset.phase = "idle";
  panel.status.textContent = currentLanguage === "pt-BR" ? "AGUARDANDO" : "WAITING";
  panel.cycle.textContent = "— / 3";
  if (panel.scrollCode && panel.listing) {
    panel.listing.scrollTop = 0;
  }
  panel.lines.forEach(({ row, code }) => {
    row.classList.remove("is-visible", "is-typing", "is-current", "is-complete");
    code.textContent = "";
  });
}

function setClassroomAutomationCurrentLine(panel, lineIndex = -1) {
  const activeRow = panel.lines[lineIndex]?.row || null;
  panel.lines.forEach(({ row }, index) => {
    row.classList.toggle("is-current", index === lineIndex);
    row.classList.remove("is-typing");
  });
  if (!panel.scrollCode || !panel.listing || !activeRow) return;

  const listing = panel.listing;
  const rowTop = activeRow.offsetTop;
  const rowBottom = rowTop + activeRow.offsetHeight;
  const viewportTop = listing.scrollTop;
  const viewportBottom = viewportTop + listing.clientHeight;
  const margin = Math.max(2, activeRow.offsetHeight);
  let targetTop = null;

  if (rowTop < viewportTop + margin) {
    targetTop = rowTop - margin;
  } else if (rowBottom > viewportBottom - margin) {
    targetTop = rowBottom - listing.clientHeight + margin;
  }

  if (targetTop !== null) {
    listing.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }
}

function typeClassroomUseCaseCode(panel, controller, schedule, onComplete) {
  if (!panel) {
    onComplete?.();
    return;
  }
  controller.typedCharacters = 0;
  resetClassroomAutomationCodePanel(panel);
  panel.root.dataset.phase = "typing";
  panel.status.textContent = currentLanguage === "pt-BR" ? "DIGITANDO CÓDIGO" : "TYPING CODE";
  const characterDelay = panel.scrollCode
    ? Math.max(5, Math.min(12, Math.round(2400 / Math.max(1, panel.code.length))))
    : 28;
  const initialDelay = panel.scrollCode ? 60 : 160;

  const renderTypedCode = () => {
    const typedCode = panel.code.slice(0, controller.typedCharacters);
    const typedLines = typedCode.split("\n");
    const activeLineIndex = Math.min(panel.lines.length - 1, typedLines.length - 1);
    panel.lines.forEach(({ row, code }, index) => {
      const hasReachedLine = index < typedLines.length;
      code.textContent = hasReachedLine ? (typedLines[index] || "") : "";
      row.classList.toggle("is-visible", hasReachedLine);
      row.classList.toggle("is-typing", hasReachedLine && index === activeLineIndex);
      row.classList.remove("is-current", "is-complete");
    });
    if (panel.scrollCode && panel.listing) {
      panel.listing.scrollTop = panel.listing.scrollHeight;
    }
  };

  const typeNextCharacter = () => {
    if (controller.typedCharacters >= panel.code.length) {
      panel.lines.forEach(({ row }) => row.classList.remove("is-typing"));
      panel.root.dataset.phase = "ready";
      panel.status.textContent = currentLanguage === "pt-BR" ? "CÓDIGO PRONTO" : "CODE READY";
      schedule(() => onComplete?.(), 320);
      return;
    }
    controller.typedCharacters += 1;
    renderTypedCode();
    schedule(typeNextCharacter, characterDelay);
  };

  renderTypedCode();
  schedule(typeNextCharacter, initialDelay);
}

function setClassroomAutomationArmState(state, cycle = 1) {
  const scene = classroomAuxMonitorContent?.querySelector(".classroom-aux-automation-scene");
  if (!scene) return;
  scene.dataset.state = state;
  scene.dataset.cycle = String(cycle);
  const descriptions = currentLanguage === "pt-BR"
    ? {
        idle: "Braço parado, garra aberta e bloco sobre a esteira",
        approach: "Braço se aproximando do bloco",
        grip: "Garra fechando sobre o bloco",
        lift: "Braço levantando o bloco",
        move: "Braço transportando o bloco",
        release: "Garra abrindo e soltando o bloco",
        vanishing: "Braço desaparecendo antes de reiniciar",
      }
    : {
        idle: "Arm stopped with its claw open and the block on the conveyor",
        approach: "Arm moving toward the block",
        grip: "Claw closing around the block",
        lift: "Arm lifting the block",
        move: "Arm carrying the block",
        release: "Claw opening and releasing the block",
        vanishing: "Arm fading before restarting",
      };
  scene.setAttribute("aria-label", descriptions[state] || descriptions.idle);
}

function runClassroomAutomationDemo(card, panel, onComplete) {
  clearRichLessonInteractionTimer();
  resetClassroomAutomationCodePanel(panel);
  panel.root.hidden = false;

  const controller = {
    cancelled: false,
    lessonId: activeRichLessonState?.lessonId,
    stepId: activeRichLessonState?.stepId,
    typedCharacters: 0,
    cycle: 1,
    actionIndex: 0,
    completionReported: false,
  };
  if (!activeRichLessonState) return;
  activeRichLessonState.automationDemo = controller;

  setClassroomAuxMonitor({
    kind: "automation-arm",
    state: "idle",
    cycle: 1,
    frames: CLASSROOM_AUTOMATION_ARM_FRAMES,
  });

  const reducedMotion = prefersReducedMotion() || !settingsState.mompyAnimations;
  const isCurrent = () => (
    !controller.cancelled
    && panel.root.isConnected
    && activeRichLessonState?.automationDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );
  const schedule = (callback, delay) => {
    window.clearTimeout(classroomInteractionTimer);
    classroomInteractionTimer = window.setTimeout(() => {
      classroomInteractionTimer = null;
      if (isCurrent()) callback();
    }, reducedMotion ? Math.min(180, delay) : delay);
  };
  const languageText = currentLanguage === "pt-BR"
    ? {
        typing: "DIGITANDO CÓDIGO",
        ready: "CÓDIGO PRONTO",
        loop: (cycle) => `CICLO ${cycle} DE 3`,
        approach: "INDO ATÉ O BLOCO",
        grip: "FECHANDO A GARRA",
        lift: "LEVANTANDO O BLOCO",
        move: "MOVENDO O BLOCO",
        release: "SOLTANDO O BLOCO",
        complete: "3 CICLOS CONCLUÍDOS",
        reset: "REINICIANDO DEMONSTRAÇÃO",
      }
    : {
        typing: "TYPING CODE",
        ready: "CODE READY",
        loop: (cycle) => `CYCLE ${cycle} OF 3`,
        approach: "MOVING TO THE BLOCK",
        grip: "CLOSING THE CLAW",
        lift: "LIFTING THE BLOCK",
        move: "MOVING THE BLOCK",
        release: "RELEASING THE BLOCK",
        complete: "3 CYCLES COMPLETED",
        reset: "RESTARTING DEMONSTRATION",
      };
  const actions = [
    { lineIndex: 1, state: "approach", duration: 940 },
    { lineIndex: 2, state: "grip", duration: 760 },
    { lineIndex: 3, state: "lift", duration: 860 },
    { lineIndex: 4, state: "move", duration: 980 },
    { lineIndex: 5, state: "release", duration: 920 },
  ];

  const renderTypedCode = () => {
    const typedCode = panel.code.slice(0, controller.typedCharacters);
    const typedLines = typedCode.split("\n");
    const activeLineIndex = Math.min(panel.lines.length - 1, typedLines.length - 1);
    panel.lines.forEach(({ row, code }, index) => {
      const hasReachedLine = index < typedLines.length;
      code.textContent = hasReachedLine ? (typedLines[index] || "") : "";
      row.classList.toggle("is-visible", hasReachedLine);
      row.classList.toggle("is-typing", hasReachedLine && index === activeLineIndex);
      row.classList.remove("is-current", "is-complete");
    });
  };

  const finishLoop = () => {
    setClassroomAutomationCurrentLine(panel, -1);
    panel.root.dataset.phase = "complete";
    panel.status.textContent = languageText.complete;
    panel.cycle.textContent = "3 / 3";
    schedule(() => {
      if (!controller.completionReported) {
        controller.completionReported = true;
        onComplete?.();
      }
      panel.root.dataset.phase = "reset";
      panel.status.textContent = languageText.reset;
      setClassroomAutomationArmState("vanishing", 3);
      schedule(startTyping, 460);
    }, 900);
  };

  const executeAction = () => {
    const action = actions[controller.actionIndex];
    if (!action) {
      if (controller.cycle >= 3) {
        finishLoop();
        return;
      }
      setClassroomAutomationArmState("vanishing", controller.cycle);
      schedule(() => {
        controller.cycle += 1;
        beginCycle();
      }, 460);
      return;
    }
    setClassroomAutomationCurrentLine(panel, action.lineIndex);
    panel.status.textContent = languageText[action.state];
    setClassroomAutomationArmState(action.state, controller.cycle);
    controller.actionIndex += 1;
    schedule(executeAction, action.duration);
  };

  const beginCycle = () => {
    controller.actionIndex = 0;
    panel.root.dataset.phase = "running";
    panel.cycle.textContent = `${controller.cycle} / 3`;
    panel.status.textContent = languageText.loop(controller.cycle);
    setClassroomAutomationCurrentLine(panel, 0);
    setClassroomAutomationArmState("idle", controller.cycle);
    schedule(executeAction, 620);
  };

  const typeNextCharacter = () => {
    if (controller.typedCharacters >= panel.code.length) {
      panel.lines.forEach(({ row }) => row.classList.remove("is-typing"));
      panel.status.textContent = languageText.ready;
      panel.root.dataset.phase = "ready";
      schedule(beginCycle, 560);
      return;
    }
    controller.typedCharacters += 1;
    renderTypedCode();
    schedule(typeNextCharacter, 34);
  };

  function startTyping() {
    controller.typedCharacters = 0;
    controller.cycle = 1;
    controller.actionIndex = 0;
    resetClassroomAutomationCodePanel(panel);
    panel.root.dataset.phase = "typing";
    panel.status.textContent = languageText.typing;
    panel.cycle.textContent = "— / 3";
    setClassroomAutomationArmState("idle", 1);
    renderTypedCode();
    schedule(typeNextCharacter, 180);
  }

  startTyping();
}

function setClassroomSitesPhase(scene, phase) {
  if (!scene) return;
  const stateMap = {
    idle: { server: "idle", document: "hidden", browser: "empty" },
    active: { server: "active", document: "hidden", browser: "empty" },
    emerging: { server: "active", document: "emerging", browser: "empty" },
    traveling: { server: "active", document: "traveling", browser: "empty" },
    entering: { server: "active", document: "enteringBrowser", browser: "receiving" },
    buildHero: { server: "idle", document: "hidden", browser: "building" },
    buildText: { server: "idle", document: "hidden", browser: "building" },
    buildSide: { server: "idle", document: "hidden", browser: "building" },
    buildRest: { server: "idle", document: "hidden", browser: "building" },
    complete: { server: "idle", document: "hidden", browser: "complete" },
    reset: { server: "idle", document: "hidden", browser: "empty" },
  };
  const state = stateMap[phase] || stateMap.idle;
  scene.dataset.phase = phase;
  scene.dataset.serverState = state.server;
  scene.dataset.documentState = state.document;
  scene.dataset.browserState = state.browser;
  const descriptions = currentLanguage === "pt-BR"
    ? {
        idle: "Servidor e navegador aguardando",
        active: "Servidor Python preparando a página",
        emerging: "Documento saindo do servidor",
        traveling: "Documento viajando até o navegador",
        entering: "Navegador recebendo o documento",
        buildHero: "Navegador construindo o bloco principal do site",
        buildText: "Navegador adicionando as linhas de texto",
        buildSide: "Navegador adicionando o bloco lateral",
        buildRest: "Navegador concluindo os elementos da página",
        complete: "Site completo no navegador",
        reset: "Demonstração reiniciando",
      }
    : {
        idle: "Server and browser waiting",
        active: "Python server preparing the page",
        emerging: "Document leaving the server",
        traveling: "Document traveling to the browser",
        entering: "Browser receiving the document",
        buildHero: "Browser building the main site block",
        buildText: "Browser adding text lines",
        buildSide: "Browser adding the side block",
        buildRest: "Browser completing the page elements",
        complete: "Complete site in the browser",
        reset: "Demonstration restarting",
      };
  scene.setAttribute("aria-label", descriptions[phase] || descriptions.idle);
}

function runClassroomSitesDemo(card, panel, onComplete) {
  clearRichLessonInteractionTimer();
  if (!activeRichLessonState) return;

  const controller = {
    cancelled: false,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
    phaseIndex: 0,
    typedCharacters: 0,
  };
  activeRichLessonState.sitesDemo = controller;
  setClassroomAuxMonitor({ kind: "sites-delivery", phase: "idle" });
  const scene = classroomAuxMonitorContent?.querySelector(".classroom-aux-sites-scene");
  if (!scene) return;

  const reducedMotion = prefersReducedMotion() || !settingsState.mompyAnimations;
  const phases = [
    { name: "idle", duration: 760 },
    { name: "active", duration: 520 },
    { name: "emerging", duration: 540 },
    { name: "traveling", duration: 1560 },
    { name: "entering", duration: 560 },
    { name: "buildHero", duration: 360 },
    { name: "buildText", duration: 300 },
    { name: "buildSide", duration: 320 },
    { name: "buildRest", duration: 340 },
    { name: "complete", duration: 1100 },
    { name: "reset", duration: 380 },
  ];
  const phaseLineIndexes = [0, 4, 5, 6, 8, 9, 10, 12, 14, 14, -1];
  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.sitesDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );
  const schedule = (callback, delay) => {
    window.clearTimeout(classroomInteractionTimer);
    classroomInteractionTimer = window.setTimeout(() => {
      classroomInteractionTimer = null;
      if (isCurrent()) callback();
    }, reducedMotion ? Math.min(220, delay) : delay);
  };
  const advance = () => {
    if (controller.phaseIndex >= phases.length) {
      onComplete?.();
      return;
    }
    const phase = phases[controller.phaseIndex];
    setClassroomAutomationCurrentLine(panel, phaseLineIndexes[controller.phaseIndex]);
    panel.cycle.textContent = `${controller.phaseIndex + 1} / ${phases.length}`;
    panel.status.textContent = card.running || card.label;
    setClassroomSitesPhase(scene, phase.name);
    controller.phaseIndex += 1;
    schedule(advance, phase.duration);
  };
  typeClassroomUseCaseCode(panel, controller, schedule, advance);
}

function setClassroomDataAiFrame(scene, frameIndex) {
  if (!scene) return;
  const safeFrame = Math.max(0, Math.min(19, Number(frameIndex) || 0));
  const stabilizationOffsets = [
    [0, 0], [1, 0], [1, 0], [8, 0], [8, 0],
    [1, 14], [1, 14], [1, 14], [7, 13], [10, 11],
    [1, 26], [1, 27], [3, 24], [9, 27], [19, 30],
    [5, 42], [2, 43], [-3, 41], [10, 41], [9, 42],
  ];
  const column = safeFrame % 5;
  const row = Math.floor(safeFrame / 5);
  const sprite = scene.querySelector(".classroom-aux-data-ai-sprite");
  if (!sprite) return;
  const [shiftX, shiftY] = stabilizationOffsets[safeFrame];
  scene.dataset.frame = String(safeFrame + 1);
  sprite.style.backgroundPosition = `${column * 25}% ${row * (100 / 3)}%`;
  sprite.style.setProperty("--data-ai-shift-x", `${((shiftX - 6.5) / 307.2) * 100}%`);
  sprite.style.setProperty("--data-ai-shift-y", `${((shiftY - 35) / 256) * 100}%`);
  scene.setAttribute(
    "aria-label",
    currentLanguage === "pt-BR"
      ? `Inteligência artificial processando dados, quadro ${safeFrame + 1} de 20`
      : `Artificial intelligence processing data, frame ${safeFrame + 1} of 20`,
  );
}

function runClassroomDataAiDemo(card, panel, onComplete) {
  clearRichLessonInteractionTimer();
  if (!activeRichLessonState) return;

  const controller = {
    cancelled: false,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
    frameIndex: 0,
    completionReported: false,
    typedCharacters: 0,
  };
  activeRichLessonState.dataAiDemo = controller;
  setClassroomAuxMonitor({
    kind: "data-ai-sequence",
    frame: 0,
    sprite: ASSETS.classroomDataAiSequence,
  });
  const scene = classroomAuxMonitorContent?.querySelector(".classroom-aux-data-ai-scene");
  if (!scene) return;

  const reducedMotion = prefersReducedMotion() || !settingsState.mompyAnimations;
  const frameDurations = [
    560, 230, 230, 230, 240,
    240, 240, 240, 250, 250,
    260, 260, 270, 270, 280,
    300, 320, 340, 380, 280,
  ];
  const playbackFactor = 0.82;
  const lineForFrame = (frameIndex) => {
    if (frameIndex < 5) return 0;
    if (frameIndex < 10) return 6;
    if (frameIndex < 15) return 8;
    return 16;
  };
  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.dataAiDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );
  const schedule = (callback, delay) => {
    window.clearTimeout(classroomInteractionTimer);
    classroomInteractionTimer = window.setTimeout(() => {
      classroomInteractionTimer = null;
      if (isCurrent()) callback();
    }, reducedMotion ? Math.min(150, delay) : Math.round(delay * playbackFactor));
  };
  const advance = () => {
    if (controller.frameIndex >= 19) {
      schedule(() => {
        if (!controller.completionReported) {
          controller.completionReported = true;
          onComplete?.();
        }
        controller.frameIndex = 0;
        setClassroomDataAiFrame(scene, 0);
        setClassroomAutomationCurrentLine(panel, 0);
        panel.cycle.textContent = "1 / 20";
        advance();
      }, frameDurations[19]);
      return;
    }
    schedule(() => {
      controller.frameIndex += 1;
      setClassroomDataAiFrame(scene, controller.frameIndex);
      setClassroomAutomationCurrentLine(panel, lineForFrame(controller.frameIndex));
      panel.cycle.textContent = `${controller.frameIndex + 1} / 20`;
      panel.status.textContent = card.running || card.label;
      advance();
    }, frameDurations[controller.frameIndex]);
  };
  setClassroomDataAiFrame(scene, 0);
  typeClassroomUseCaseCode(panel, controller, schedule, () => {
    setClassroomAutomationCurrentLine(panel, 0);
    panel.cycle.textContent = "1 / 20";
    panel.status.textContent = card.running || card.label;
    advance();
  });
}

function setClassroomScienceEducationFrame(scene, frameIndex) {
  if (!scene) return;
  const safeFrame = Math.max(0, Math.min(3, Number(frameIndex) || 0));
  scene.dataset.frame = String(safeFrame + 1);
  const descriptions = currentLanguage === "pt-BR"
    ? [
        "Laboratório científico aguardando uma descoberta",
        "Um livro de conhecimento se materializando",
        "Livro científico aberto sobre a bancada",
        "Laboratório completo com livro, microscópio e átomo na tela",
      ]
    : [
        "Science laboratory waiting for a discovery",
        "A knowledge book materializing",
        "Open science book on the workbench",
        "Complete laboratory with book, microscope, and atom on screen",
      ];
  scene.setAttribute("aria-label", descriptions[safeFrame]);
}

function runClassroomScienceEducationDemo(card, panel, onComplete) {
  clearRichLessonInteractionTimer();
  if (!activeRichLessonState) return;

  const controller = {
    cancelled: false,
    lessonId: activeRichLessonState.lessonId,
    stepId: activeRichLessonState.stepId,
    frameIndex: 0,
    typedCharacters: 0,
  };
  activeRichLessonState.scienceEducationDemo = controller;
  setClassroomAuxMonitor({
    kind: "science-education-sequence",
    frame: 0,
    frames: CLASSROOM_SCIENCE_EDUCATION_FRAMES,
  });
  const scene = classroomAuxMonitorContent?.querySelector(".classroom-aux-science-education-scene");
  if (!scene) return;

  const reducedMotion = prefersReducedMotion() || !settingsState.mompyAnimations;
  const frameDurations = [760, 380, 190, 1150];
  const isCurrent = () => (
    !controller.cancelled
    && scene.isConnected
    && activeRichLessonState?.scienceEducationDemo === controller
    && activeRichLessonState?.lessonId === controller.lessonId
    && activeRichLessonState?.stepId === controller.stepId
  );
  const schedule = (callback, delay) => {
    window.clearTimeout(classroomInteractionTimer);
    classroomInteractionTimer = window.setTimeout(() => {
      classroomInteractionTimer = null;
      if (isCurrent()) callback();
    }, reducedMotion ? Math.max(45, Math.round(delay * (180 / 760))) : delay);
  };
  const advance = () => {
    if (controller.frameIndex >= 3) {
      schedule(() => onComplete?.(), frameDurations[3]);
      return;
    }
    schedule(() => {
      controller.frameIndex += 1;
      setClassroomScienceEducationFrame(scene, controller.frameIndex);
      const scienceLineIndexes = [0, 5, 8, 19];
      setClassroomAutomationCurrentLine(panel, scienceLineIndexes[controller.frameIndex]);
      panel.cycle.textContent = `${controller.frameIndex + 1} / 4`;
      panel.status.textContent = card.running || card.label;
      advance();
    }, frameDurations[controller.frameIndex]);
  };
  setClassroomScienceEducationFrame(scene, 0);
  typeClassroomUseCaseCode(panel, controller, schedule, () => {
    setClassroomAutomationCurrentLine(panel, 0);
    panel.cycle.textContent = "1 / 4";
    panel.status.textContent = card.running || card.label;
    advance();
  });
}

function renderRichCardsInteraction(shell, step) {
  const cards = createClassroomNode("div", "classroom-rich-cards");
  const automationCard = (step.cards || []).find((card) => card.demoKind === "automation-sync");
  const codePanels = new Map(
    (step.cards || [])
      .filter((card) => card.code)
      .map((card) => [card.label, createClassroomAutomationCodePanel(card)]),
  );
  const automationPanel = automationCard ? codePanels.get(automationCard.label) : null;
  activeRichLessonState.cardDemoCompleted = new Set();
  activeRichLessonState.cardDemoVisited = new Set();
  activeRichLessonState.cardDemoTotal = (step.cards || []).length;
  activeRichLessonState.activeCardLabel = null;
  activeRichLessonState.activeCardDemoKind = "";
  activeRichLessonState.activeCodePanel = null;
  activeRichLessonState.automationPanel = automationPanel;
  activeRichLessonState.useCaseCodePanels = codePanels;
  (step.cards || []).forEach((card) => {
    const button = createRichLessonButton(card.label, { className: "classroom-rich-card" });
    const detail = createClassroomNode("span", "classroom-rich-card-detail", card.detail);
    button.append(detail);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      clearRichLessonInteractionTimer();
      cards.querySelectorAll(".classroom-rich-card").forEach((candidate) => {
        candidate.classList.remove("is-expanded", "is-selected");
        candidate.setAttribute("aria-expanded", "false");
        candidate.setAttribute("aria-pressed", "false");
      });
      button.classList.remove("is-complete");
      button.classList.add("is-expanded", "is-selected");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-pressed", "true");
      activeRichLessonState.cardDemoVisited.add(card.label);
      activeRichLessonState.activeCardLabel = card.label;
      activeRichLessonState.activeCardDemoKind = card.demoKind || "";
      const codePanel = codePanels.get(card.label) || null;
      activeRichLessonState.activeCodePanel = codePanel;
      updateClassroomCardsMompyAction();
      const completeCard = () => {
        if (
          activeRichLessonState?.stepId !== step.id
          || activeRichLessonState?.activeCardLabel !== card.label
        ) {
          return;
        }
        activeRichLessonState.cardDemoCompleted.add(card.label);
        if (activeRichLessonState.cardDemoVisited.size < activeRichLessonState.cardDemoTotal) {
          activeRichLessonState.activeCardLabel = null;
          activeRichLessonState.activeCardDemoKind = "";
        }
        button.classList.remove("is-expanded", "is-selected");
        button.classList.add("is-complete");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-pressed", "false");
        audioManager.playSuccess();
        updateClassroomCardsMompyAction();
      };
      if (card.demoKind === "automation-sync" && automationPanel) {
        mountClassroomAutomationCodePanel(automationPanel);
        runClassroomAutomationDemo(card, automationPanel, completeCard);
        updateClassroomCardsMompyAction();
        return;
      }
      if (codePanel) {
        mountClassroomAutomationCodePanel(codePanel);
        if (
          activeRichLessonState.cardDemoVisited.size
          >= activeRichLessonState.cardDemoTotal
        ) {
          updateClassroomCardsMompyAction();
        }
      }
      if (card.demoKind === "sites-delivery" && codePanel) {
        runClassroomSitesDemo(card, codePanel, completeCard);
        return;
      }
      if (card.demoKind === "data-ai-sequence" && codePanel) {
        runClassroomDataAiDemo(card, codePanel, completeCard);
        return;
      }
      if (card.demoKind === "science-education-sequence" && codePanel) {
        runClassroomScienceEducationDemo(card, codePanel, completeCard);
        return;
      }
      if (card.code) {
        runClassroomExecutionDemo({
          code: card.code,
          output: card.result || "",
          label: card.label,
          inputLabel: currentLanguage === "pt-BR" ? "CÓDIGO DEMONSTRATIVO" : "DEMO CODE",
          outputLabel: "",
          image: card.image,
          imageAlt: card.imageAlt,
          resultCaption: card.resultCaption || card.detail,
          running: card.running,
          pythonResolved: true,
        }, completeCard);
      }
    });
    cards.append(button);
  });
  shell.append(cards);
}

function renderRichInspectInteraction(shell, briefing, step, stepIndex) {
  const inspector = createClassroomNode("div", "classroom-rich-inspector");
  const detail = createClassroomNode(
    "p",
    "classroom-rich-inspector-detail",
    currentLanguage === "pt-BR" ? "Selecione uma peça do código." : "Select one piece of the code.",
  );
  (step.inspectItems || []).forEach((item) => {
    const button = createRichLessonButton(item.label, { className: "classroom-rich-inspect-item" });
    button.addEventListener("click", () => {
      activeRichLessonState.inspected.add(item.label);
      button.classList.add("is-inspected");
      detail.textContent = `${item.label} — ${item.detail}`;
      if (activeRichLessonState.inspected.size === step.inspectItems.length) {
        showClassroomMompyScreenAction(
          step.actionLabel || t("gotIt"),
          () => renderBriefingStep(briefing, stepIndex + 1),
        );
      }
    });
    inspector.append(button);
  });
  shell.append(inspector, detail);
}

function renderRichSummary(shell, step) {
  const columns = createClassroomNode("div", "classroom-rich-summary-grid");
  const learned = createClassroomNode("section", "classroom-rich-summary-block");
  learned.append(createClassroomNode("h3", "", currentLanguage === "pt-BR" ? "VOCÊ APRENDEU" : "YOU LEARNED"));
  const learnedList = createClassroomNode("ul", "");
  (step.learned || []).forEach((item) => learnedList.append(createClassroomNode("li", "", item)));
  learned.append(learnedList);

  const missions = createClassroomNode("section", "classroom-rich-summary-block is-missions");
  missions.append(createClassroomNode("h3", "", currentLanguage === "pt-BR" ? "PRONTO PARA PRATICAR" : "READY TO PRACTICE"));
  const missionList = createClassroomNode("ul", "");
  (step.missions || []).forEach((item) => missionList.append(createClassroomNode("li", "", item)));
  missions.append(missionList);
  columns.append(learned, missions);
  shell.append(columns);

}

function renderRichClassroomLessonStep(briefing, lesson, stepIndex, navigation = {}) {
  const step = lesson.steps?.[stepIndex];
  if (!step) {
    completeBriefing(briefing.id, { directToMission: true });
    return;
  }

  clearRichLessonInteractionTimer();
  clearClassroomTypewriter();
  clearClassroomMompyScreenAction();
  classroomMompyGuide?.classList.toggle(
    "is-use-cases-screen",
    step.type === "cards" && step.id === "uses",
  );
  classroomMompyGuide?.classList.remove("is-screen-action-ready");
  activeBriefingStepIndex = stepIndex;
  activeBriefingRetry = false;
  const reviewReturnStepIndex = Number.isInteger(navigation.reviewReturnStepIndex)
    ? navigation.reviewReturnStepIndex
    : -1;
  const isDirectedReview = reviewReturnStepIndex >= 0;
  const advanceFromCurrentStep = () => {
    if (isDirectedReview) {
      renderBriefingStep(briefing, reviewReturnStepIndex, { reviewCompleted: true });
      return;
    }
    renderBriefingStep(briefing, stepIndex + 1);
  };
  activeRichLessonState = {
    lessonId: briefing.id,
    stepId: step.id,
    attempts: 0,
    sequence: [],
    inspected: new Set(),
    locked: false,
    runComplete: false,
    resolvedOutput: null,
    reviewReturnStepIndex,
  };

  const mompyNeedsMaterialize = Boolean(step.mompyVisible && !classroomMompyVisible);
  const actionUsesMompyScreen = Boolean(
    step.actionOnMompy
    || ["lesson", "cards", "run", "summary"].includes(step.type),
  );
  setMompyState("briefing");
  const isQuestionStep = ["choice", "sequence"].includes(step.type);
  setClassroomAuxMonitor(
    step.guidedExecution
      ? null
      : isQuestionStep
        ? {
          kind: "question",
          symbol: "?",
          alt: currentLanguage === "pt-BR"
            ? "Pergunta aguardando resposta"
            : "Question awaiting an answer",
        }
        : (step.aux || null),
  );
  setClassroomMompyGuide(Boolean(step.mompyVisible), {
    speak: false,
    forceMaterialize: mompyNeedsMaterialize,
  });

  classroomLessonContent.hidden = false;
  classroomLessonContent.className = `classroom-lesson-content is-rich is-${step.type}`;
  classroomLessonContent.dataset.lessonStep = step.id;

  const shell = createClassroomNode("div", "classroom-rich-shell");
  const meta = createClassroomNode("div", "classroom-rich-meta");
  meta.append(
    createClassroomNode("span", "classroom-rich-phase", step.phase || lesson.title),
    createClassroomNode("span", "classroom-rich-progress", `${stepIndex + 1} / ${lesson.steps.length}`),
  );
  const copy = createClassroomNode("div", "classroom-rich-copy");
  copy.append(createClassroomNode("h2", "classroom-rich-title", step.title));
  if (isDirectedReview) {
    copy.append(createClassroomNode(
      "p",
      "classroom-rich-review-notice is-directed",
      currentLanguage === "pt-BR"
        ? "REVISÃO DIRECIONADA // Releia este conceito. Ao concluir, você voltará à pergunta."
        : "DIRECTED REVIEW // Read this concept again. When finished, you will return to the question.",
    ));
  } else if (navigation.reviewCompleted) {
    copy.append(createClassroomNode(
      "p",
      "classroom-rich-review-notice is-complete",
      currentLanguage === "pt-BR"
        ? "REVISÃO CONCLUÍDA // Tente novamente com o conceito fresco."
        : "REVIEW COMPLETE // Try again with the concept fresh in mind.",
    ));
  }
  appendRichLessonCopy(copy, step);
  appendRichMompyLine(copy, step);
  shell.append(meta, copy);
  const process = renderRichProcessMap(shell, step);

  if (step.type === "choice") {
    renderRichChoiceInteraction(shell, briefing, step, stepIndex);
  } else if (step.type === "sequence") {
    renderRichSequenceInteraction(shell, briefing, step, stepIndex);
  } else if (step.type === "cards") {
    renderRichCardsInteraction(shell, step);
  } else if (step.type === "run") {
    // Execution and continuation controls are revealed on Mompy's own screen.
  } else if (step.type === "inspect") {
    renderRichInspectInteraction(shell, briefing, step, stepIndex);
  } else if (step.type === "summary") {
    renderRichSummary(shell, step);
  } else {
    if (!actionUsesMompyScreen) {
      const actions = createClassroomNode("div", "classroom-rich-actions");
      actions.append(createRichLessonButton(step.actionLabel || (currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE"), {
        primary: true,
        onClick: advanceFromCurrentStep,
      }));
      shell.append(actions);
    }
  }

  classroomLessonContent.replaceChildren(shell);
  const revealPresentationAction = () => {
    if (step.type === "run") {
      if (step.guidedExecution) {
        startGuidedClassroomRun(briefing, step, stepIndex, shell, process);
        return;
      }
      showClassroomMompyScreenAction(step.actionLabel || t("run"), () => {
        activeRichLessonState.runComplete = true;
        setClassroomAuxMonitor({
          label: currentLanguage === "pt-BR" ? "RESULTADO" : "OUTPUT",
          value: step.output,
        });
        audioManager.playSuccess();
        showClassroomMompyScreenAction(
          currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE",
          () => renderBriefingStep(briefing, stepIndex + 1),
        );
      });
      return;
    }
    if (step.type === "summary") {
      showClassroomMompyScreenAction(
        step.actionLabel || (currentLanguage === "pt-BR" ? "PRATICAR" : "PRACTICE"),
        () => completeBriefing(briefing.id, { directToMission: true }),
      );
      return;
    }
    if (step.type === "cards" && activeRichLessonState?.cardDemoVisited) {
      activeRichLessonState.cardsContinueHandler = () => renderBriefingStep(briefing, stepIndex + 1);
      updateClassroomCardsMompyAction();
      return;
    }
    if (actionUsesMompyScreen) {
      showClassroomMompyScreenAction(
        isDirectedReview
          ? (currentLanguage === "pt-BR" ? "VOLTAR À PERGUNTA" : "BACK TO QUESTION")
          : step.actionLabel || (step.type === "cards"
          ? t("gotIt")
          : (currentLanguage === "pt-BR" ? "CONTINUAR" : "CONTINUE")),
        advanceFromCurrentStep,
        { code: step.screenCode || "" },
      );
      return;
    }
    if (classroomLessonContent.dataset.interactive === "true") {
      window.requestAnimationFrame(() => {
        classroomLessonContent.querySelector("button:not([disabled])")?.focus({ preventScroll: true });
      });
    }
  };
  const finishPresentation = () => {
    if (step.executionDemo) {
      runClassroomExecutionDemo(step.executionDemo, revealPresentationAction);
      return;
    }
    revealPresentationAction();
  };

  if (step.mompyVisible && step.mompy) {
    runClassroomTypewriter(shell, {
      delay: mompyNeedsMaterialize ? 1900 : 220,
      onComplete: finishPresentation,
    });
  } else {
    finishPresentation();
  }
}

classroomLessonContent?.addEventListener("click", (event) => {
  if (!classroomTypewriterFinisher || event.target.closest("button")) {
    return;
  }
  clearClassroomTypewriter({ complete: true });
});

function renderClassroomAuxiliaryMonitor(example, variant) {
  if (!classroomAuxMonitorContent) {
    return;
  }

  if (variant === "check") {
    setClassroomAuxMonitor({
      label: currentLanguage === "pt-BR" ? "SUA VEZ" : "YOUR TURN",
      value: "?",
    });
    return;
  }

  if (example) {
    setClassroomAuxMonitor({
      label: currentLanguage === "pt-BR" ? "RESULTADO" : "OUTPUT",
      value: example.output,
    });
    return;
  }

  setClassroomAuxMonitor({
    label: "STATUS",
    value: currentLanguage === "pt-BR" ? "AULA CONCLUÍDA" : "LESSON COMPLETE",
  });
}

function renderMompyScreenPanel({ title, lines = [], actions = [], variant = "" }) {
  stopTalking();
  clearTimeout(settleTimer);
  machine.classList.remove("is-success", "is-error", "is-impressed");
  sprite.src = ASSETS.blank;

  const useClassroomScreen = machine.classList.contains("classroom-stage-active")
    && classroomLessonContent;
  const panel = useClassroomScreen ? classroomLessonContent : mompyScreenMessage;
  const example = useClassroomScreen ? getClassroomBriefingExample() : null;

  if (useClassroomScreen) {
    mompyScreenMessage.hidden = true;
    panel.hidden = false;
    panel.className = "classroom-lesson-content is-briefing";
    if (!getRichClassroomLesson(activeBriefingId)) {
      setClassroomMompyGuide(true, {
        speak: Boolean(lines.length),
        forceMaterialize: !classroomMompyVisible,
      });
    }
  } else {
    panel.hidden = false;
    panel.className = "mompy-screen-message is-briefing";
  }

  if (variant) {
    panel.classList.add(`is-${variant}`);
  }

  const text = document.createElement("div");
  text.className = useClassroomScreen ? "classroom-lesson-text" : "mompy-screen-text";

  if (title) {
    const heading = document.createElement("p");
    heading.className = useClassroomScreen ? "classroom-lesson-heading" : "mompy-screen-heading";
    heading.textContent = title;
    text.append(heading);
  }

  lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    text.append(paragraph);
  });

  if (useClassroomScreen && example && variant !== "check") {
    const exampleShell = document.createElement("div");
    exampleShell.className = "classroom-lesson-example";
    const exampleLabel = document.createElement("span");
    exampleLabel.className = "classroom-lesson-example-label";
    exampleLabel.textContent = currentLanguage === "pt-BR" ? "EXEMPLO" : "EXAMPLE";
    const code = document.createElement("pre");
    code.textContent = example.code;
    exampleShell.append(exampleLabel, code);
    text.append(exampleShell);
  }

  const actionShell = document.createElement("div");
  actionShell.className = "mompy-screen-actions";

  if (variant === "check") {
    actionShell.classList.add("is-answer-list");
  }

  if (actions.length > 2) {
    actionShell.classList.add("is-stacked");
  } else if (actions.length === 1) {
    actionShell.classList.add("is-single");
  }

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.className = [
      "mompy-screen-text-action",
      variant === "check" ? "mompy-answer-choice" : "",
      action.primary ? "is-primary" : "is-secondary",
    ].filter(Boolean).join(" ");

    button.addEventListener("click", action.onClick);

    actionShell.append(button);
  });

  panel.replaceChildren(text, actionShell);

  if (useClassroomScreen) {
    renderClassroomAuxiliaryMonitor(example, variant);
    if (panel.dataset.interactive === "true") {
      window.requestAnimationFrame(() => {
        panel.querySelector("button")?.focus({ preventScroll: true });
      });
    }
  }
}

function renderMompyCompletionPrompt() {
  mompyScreenMessage.className = "mompy-screen-message is-briefing is-reward";

  const text = document.createElement("div");
  text.className = "mompy-screen-text";

  const reward = lastMissionReward;
  const appendLine = (line, className) => {
    const paragraph = document.createElement("p");
    paragraph.className = className;
    paragraph.textContent = line;
    text.append(paragraph);
  };

  appendLine(t("missionComplete"), "reward-title");

  if (reward?.stars) {
    appendLine(
      "★".repeat(reward.stars) + "☆".repeat(Math.max(0, 3 - reward.stars)),
      "reward-stars",
    );
  }

  if (reward?.first_completion) {
    appendLine(
      `${t("xpEarned", { xp: reward.xp_awarded })} · ${t("streak")} ${reward.current_streak}`,
      "reward-detail",
    );
  }

  const progression = [];
  if (reward?.block_completed && reward.block) {
    progression.push(t("blockComplete", {
      block: String(reward.block.block).padStart(2, "0"),
      stars: reward.block.stars,
      max: reward.block.max_stars,
    }));
  }
  if (reward?.unlocked_block) {
    progression.push(t("blockUnlocked", { block: String(reward.unlocked_block).padStart(2, "0") }));
  }
  if (progression.length) {
    appendLine(progression.join(" · "), "reward-detail reward-progression");
  }

  // Achievement unlocks are presented by the full-screen reward capsule.
  // Avoid duplicating them as a small notification on Mompy's own display.
  appendLine(t("continueQuestion"), "reward-question");

  const actionShell = document.createElement("div");
  actionShell.className = "mompy-screen-actions";

  const repeatButton = document.createElement("button");
  repeatButton.type = "button";
  repeatButton.className = "mompy-screen-text-action is-secondary";
  repeatButton.textContent = t("retry");
  repeatButton.addEventListener("click", repeatMission);

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "mompy-screen-text-action is-primary";
  nextButton.textContent = t("nextMission");
  nextButton.addEventListener("click", goToNextMission);

  actionShell.append(repeatButton, nextButton);
  mompyScreenMessage.replaceChildren(text, actionShell);
}

function showLearningBriefing(briefingId) {
  const briefing = findBriefingById(briefingId);

  if (!briefing) {
    renderCurrentMission({ intro: true });
    return;
  }

  activeBriefingId = briefing.id;
  activeBriefingStepIndex = 0;
  activeBriefingRetry = false;
  activeRichLessonState = null;
  resetClassroomStage();
  clearTimeout(briefingFinalTimer);
  stopMissionTyping();
  clearMompyScreenMessage();
  setMissionActionsEnabled(false);
  setMompyState("briefing");
  editor.value = "";
  updateLineNumbers();
  output.textContent = `Mompy: ${t("lessonReady")}`;
  renderBriefingIntro(briefing);
}

function clearClassroomStageTimers() {
  classroomStageTimers.forEach((timer) => window.clearTimeout(timer));
  classroomStageTimers = [];
}

function resetClassroomStage() {
  stopClassroomEnvironmentAudio({ immediate: true });
  clearClassroomStageTimers();
  clearRichLessonInteractionTimer();
  clearClassroomTypewriter();
  clearClassroomMompyScreenAction();
  window.clearTimeout(classroomMompyTimer);
  classroomMompyTimer = null;
  classroomMompyVisible = false;
  classroomAuxMonitorMode = "closed";
  classroomAuxTransitionToken += 1;
  activeRichLessonState = null;
  machine.classList.remove(
    "classroom-stage-activating",
    "classroom-stage-dimming",
    "classroom-stage-opening",
    "classroom-doors-closing",
    "classroom-doors-sealed",
    "classroom-doors-travelling",
    "classroom-doors-opening",
    "classroom-background-exiting",
    "classroom-background-dropping",
    "classroom-stage-active",
  );
  classroomSceneTransition?.setAttribute("aria-hidden", "true");
  classroomLessonPanel?.classList.remove("has-classroom-mompy", "has-aux-monitor");
  classroomMompyGuide?.classList.remove(
    "is-materializing",
    "is-dematerializing",
    "is-visible",
    "is-speaking",
    "has-screen-action",
    "is-use-cases-screen",
  );
  classroomAuxMonitor?.classList.remove("is-opening", "is-open", "is-closing");
  classroomAuxRail?.classList.remove("is-opening", "is-open", "is-closing");
  if (classroomLessonContent) {
    classroomLessonContent.hidden = true;
    classroomLessonContent.className = "classroom-lesson-content";
    classroomLessonContent.replaceChildren();
    delete classroomLessonContent.dataset.interactive;
  }
  classroomAuxMonitorContent?.replaceChildren();
  classroomAuxMonitorContent?.removeAttribute("aria-busy");
  mompyScreenMessage
    ?.querySelectorAll(".is-classroom-launching")
    .forEach((button) => {
      button.classList.remove("is-classroom-launching");
      button.removeAttribute("aria-busy");
      button.disabled = false;
    });
}

function scheduleClassroomStageStep(callback, delay) {
  const timer = window.setTimeout(() => {
    classroomStageTimers = classroomStageTimers.filter((candidate) => candidate !== timer);
    callback();
  }, delay);
  classroomStageTimers.push(timer);
}

function beginClassroomStage(briefing, triggerButton) {
  if (
    !briefing
    || machine.classList.contains("classroom-stage-activating")
    || machine.classList.contains("classroom-stage-active")
  ) {
    return;
  }

  clearClassroomStageTimers();
  clearClassroomTypewriter();
  clearClassroomMompyScreenAction();
  classroomSceneTransition?.setAttribute("aria-hidden", "false");
  if (classroomLessonContent) {
    classroomLessonContent.hidden = true;
    classroomLessonContent.replaceChildren();
    delete classroomLessonContent.dataset.interactive;
  }
  classroomLessonPanel?.classList.remove("has-classroom-mompy", "has-aux-monitor");
  classroomMompyGuide?.classList.remove(
    "is-materializing",
    "is-dematerializing",
    "is-visible",
    "is-speaking",
    "has-screen-action",
  );
  classroomAuxMonitor?.classList.remove("is-opening", "is-open", "is-closing");
  classroomAuxRail?.classList.remove("is-opening", "is-open", "is-closing");
  classroomMompyVisible = false;
  classroomAuxMonitorMode = "closed";
  classroomAuxTransitionToken += 1;
  activeRichLessonState = null;
  classroomAuxMonitorContent?.replaceChildren();
  classroomAuxMonitorContent?.removeAttribute("aria-busy");
  const reduceMotion = prefersReducedMotion() || !settingsState.mompyAnimations;
  const query = new URLSearchParams(location.search);
  const holdClassroomLab = ["localhost", "127.0.0.1"].includes(location.hostname)
    && query.get("classroomHold") === "1";
  const timings = reduceMotion
    ? { dim: 10, grow: 20, close: 30, seal: 45, travel: 60, open: 80, reveal: 100, drop: 5100, finish: 5140 }
    : { dim: 120, grow: 240, close: 260, seal: 1300, travel: 1510, open: 3520, reveal: 4680, drop: 14680, finish: 17880 };

  prepareClassroomAudioContext();
  triggerButton?.classList.add("is-classroom-launching");
  triggerButton?.setAttribute("aria-busy", "true");
  mompyScreenMessage.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  machine.classList.add("classroom-stage-activating");

  scheduleClassroomStageStep(() => {
    machine.classList.add("classroom-stage-dimming");
  }, timings.dim);

  scheduleClassroomStageStep(() => {
    machine.classList.add("classroom-stage-opening");
  }, timings.grow);

  scheduleClassroomStageStep(() => {
    machine.classList.add("classroom-doors-closing");
    if (!reduceMotion) {
      audioManager.playSettingsGearEngage();
      audioManager.playSettingsGearsTurn();
    }
  }, timings.close);

  scheduleClassroomStageStep(() => {
    machine.classList.remove("classroom-doors-closing");
    machine.classList.add("classroom-doors-sealed");
    if (!reduceMotion) {
      audioManager.playSettingsPanelLock();
    }
  }, timings.seal);

  scheduleClassroomStageStep(() => {
    machine.classList.remove("classroom-doors-sealed");
    machine.classList.add("classroom-doors-travelling");
    machine.classList.add("classroom-background-exiting");
    if (!reduceMotion) {
      playClassroomMechanismCue("exit");
    }
  }, timings.travel);

  scheduleClassroomStageStep(() => {
    machine.classList.remove("classroom-doors-travelling");
    machine.classList.add("classroom-doors-opening");
    startClassroomEnvironmentAudio();
    if (!reduceMotion) {
      audioManager.playSettingsGearsTurn();
    }
  }, timings.open);

  scheduleClassroomStageStep(() => {
    machine.classList.remove("classroom-doors-opening");
    if (!reduceMotion) {
      audioManager.playSettingsGearEngage();
    }
  }, timings.reveal);

  if (!holdClassroomLab) {
    scheduleClassroomStageStep(() => {
      machine.classList.remove("classroom-background-exiting");
      machine.classList.add("classroom-background-dropping");
      stopClassroomEnvironmentAudio();
      if (!reduceMotion) {
        playClassroomMechanismCue("drop");
        audioManager.playAchievementRail();
      }
    }, timings.drop);

    scheduleClassroomStageStep(() => {
      machine.classList.remove(
        "classroom-stage-activating",
        "classroom-stage-dimming",
        "classroom-stage-opening",
        "classroom-doors-closing",
        "classroom-doors-sealed",
        "classroom-doors-travelling",
        "classroom-doors-opening",
        "classroom-background-exiting",
        "classroom-background-dropping",
      );
      machine.classList.add("classroom-stage-active");
      activeBriefingStepIndex = 0;
      activeBriefingRetry = false;
      if (!reduceMotion) {
        audioManager.playAchievementReveal();
      }
      renderBriefingStep(briefing, 0);
      scheduleClassroomStageStep(() => {
        if (!classroomLessonContent) {
          return;
        }
        classroomLessonContent.dataset.interactive = "true";
        classroomLessonContent.querySelector("button")?.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 1840);
    }, timings.finish);
  }
}

function renderBriefingIntro(briefing) {
  renderMompyScreenPanel({
    title: "Mompy",
    lines: [
      briefing.subtitle,
    ],
    variant: "intro",
    actions: [
      {
        label: t("learn"),
        primary: true,
        onClick: (event) => beginClassroomStage(briefing, event.currentTarget),
      },
      {
        label: t("skip"),
        onClick: () => skipBriefing(briefing.id),
      },
    ],
  });
}

function renderBriefingStep(briefing, stepIndex, navigation = {}) {
  const richLesson = getRichClassroomLesson(briefing?.id);
  if (richLesson) {
    renderRichClassroomLessonStep(briefing, richLesson, stepIndex, navigation);
    return;
  }

  const step = briefing.steps[stepIndex];

  if (!step) {
    completeBriefing(briefing.id);
    return;
  }

  activeBriefingStepIndex = stepIndex;
  activeBriefingRetry = false;

  if (step.type === "check") {
    renderBriefingCheck(briefing, stepIndex);
    return;
  }

  setMompyState("briefing");
  renderMompyScreenPanel({
    title: step.title,
    lines: [step.text],
    actions: [
      {
        label: t("gotIt"),
        primary: true,
        onClick: handleBriefingUnderstood,
      },
      {
        label: t("dontUnderstand"),
        onClick: handleBriefingNotUnderstood,
      },
    ],
  });
}

function renderBriefingRetry(briefing, stepIndex, contextLine = "") {
  const step = briefing.steps[stepIndex];

  if (!step) {
    completeBriefing(briefing.id);
    return;
  }

  activeBriefingRetry = true;
  setMompyState("briefing");
  renderMompyScreenPanel({
    title: step.title,
    lines: [contextLine, step.retryText || step.text].filter(Boolean),
    actions: [
      {
        label: t("gotIt"),
        primary: true,
        onClick: handleBriefingUnderstood,
      },
      {
        label: t("dontUnderstand"),
        onClick: handleBriefingNotUnderstood,
      },
    ],
  });
}

function getDisplayBriefingOptions(briefingId, stepIndex, options) {
  const key = `${briefingId}:${stepIndex}`;

  if (briefingOptionOrder.has(key)) {
    return briefingOptionOrder.get(key);
  }

  const source = Array.isArray(options) ? options.map((option) => ({ ...option })) : [];
  const correctOptions = source.filter((option) => option.correct);
  const correctOption = correctOptions[0];
  const incorrectOptions = source.filter((option) => !option.correct);

  if (correctOptions.length !== 1 || source.length < 2) {
    return source;
  }

  let correctIndex = Math.floor(Math.random() * source.length);
  if (correctIndex === previousCorrectBriefingOptionIndex) {
    correctIndex = (correctIndex + 1 + Math.floor(Math.random() * (source.length - 1))) % source.length;
  }

  previousCorrectBriefingOptionIndex = correctIndex;
  const displayed = [];
  let incorrectIndex = 0;

  for (let index = 0; index < source.length; index += 1) {
    displayed.push(index === correctIndex ? correctOption : incorrectOptions[incorrectIndex++]);
  }

  const labeled = displayed.map((option, index) => ({
    ...option,
    label: `${String.fromCharCode(65 + index)}.`,
  }));
  briefingOptionOrder.set(key, labeled);
  return labeled;
}

function renderBriefingCheck(briefing, stepIndex, feedback = "") {
  const step = briefing.steps[stepIndex];

  if (!step) {
    completeBriefing(briefing.id);
    return;
  }

  activeBriefingStepIndex = stepIndex;
  setMompyState("briefing");
  renderMompyScreenPanel({
    title: step.question,
    lines: [feedback || t("chooseCorrect")],
    variant: "check",
    actions: getDisplayBriefingOptions(briefing.id, stepIndex, step.options).map((option) => ({
      label: `${option.label} ${option.text}`,
      primary: false,
      onClick: () => handleBriefingCheckAnswer(briefing, stepIndex, option),
    })),
  });
}

function handleBriefingUnderstood() {
  const briefing = findBriefingById(activeBriefingId);

  if (!briefing) {
    closeModal();
    return;
  }

  renderBriefingStep(briefing, activeBriefingStepIndex + 1);
}

function handleBriefingNotUnderstood() {
  const briefing = findBriefingById(activeBriefingId);

  if (!briefing) {
    closeModal();
    return;
  }

  renderBriefingRetry(briefing, activeBriefingStepIndex);
}

function handleBriefingCheckAnswer(briefing, stepIndex, option) {
  const step = briefing.steps[stepIndex];

  if (option.correct) {
    audioManager.playSuccess();
    setMompyState("briefing");
    renderMompyScreenPanel({
      title: t("correctAnswer"),
      lines: [step.successText],
      actions: [
        {
          label: t("gotIt"),
          primary: true,
          onClick: () => renderBriefingStep(briefing, stepIndex + 1),
        },
      ],
    });
    return;
  }

  audioManager.playError();
  let explanationStepIndex = -1;
  for (let index = stepIndex - 1; index >= 0; index -= 1) {
    const candidate = briefing.steps[index];
    if (candidate.type !== "check" && (candidate.retryText || candidate.text)) {
      explanationStepIndex = index;
      break;
    }
  }

  if (explanationStepIndex >= 0) {
    renderBriefingRetry(briefing, explanationStepIndex, step.failText);
    return;
  }

  renderBriefingCheck(briefing, stepIndex, step.failText);
}

function completeBriefing(briefingId, { directToMission = false, pythonConfirmed = false } = {}) {
  const briefing = findBriefingById(briefingId);

  if (!briefing) {
    renderCurrentMission({ intro: true });
    return;
  }

  if (pythonClassroomLessonPayload && !pythonConfirmed) {
    callPythonBackend("complete_classroom_lesson", briefingId)
      .then((result) => {
        if (!result) {
          audioManager.playError();
          showClassroomMompyScreenAction(
            currentLanguage === "pt-BR" ? "TENTAR NOVAMENTE" : "TRY AGAIN",
            () => completeBriefing(briefingId, { directToMission }),
          );
          return;
        }
        applyPythonProgress(result.progress || result);
        completeBriefing(briefingId, { directToMission, pythonConfirmed: true });
      });
    return;
  }

  if (!completedBriefingIds.includes(briefingId)) {
    completedBriefingIds.push(briefingId);
  }

  skippedBriefingIds = skippedBriefingIds.filter((id) => id !== briefingId);
  saveBriefingProgress();
  activeBriefingId = null;
  activeBriefingStepIndex = 0;
  activeBriefingRetry = false;
  activeRichLessonState = null;

  if (directToMission) {
    audioManager.playSuccess();
    resetClassroomStage();
    clearMompyScreenMessage();
    renderCurrentMission({ intro: true });
    return;
  }

  setMompyState("briefing");
  renderMompyScreenPanel({
    title: t("briefingComplete"),
    lines: [
      `${t("briefingComplete")}.`,
      t("conceptsLoaded"),
      t("goodLuck"),
    ],
    actions: [],
  });

  briefingFinalTimer = setTimeout(() => {
    resetClassroomStage();
    clearMompyScreenMessage();
    renderCurrentMission({ intro: true });
  }, 1200);
}

function skipBriefing(briefingId) {
  resetClassroomStage();
  if (!skippedBriefingIds.includes(briefingId)) {
    skippedBriefingIds.push(briefingId);
  }

  saveBriefingProgress();
  activeBriefingId = null;
  activeBriefingStepIndex = 0;
  activeBriefingRetry = false;
  clearMompyScreenMessage();
  renderCurrentMission({ intro: true });
}

function openMissionOrBriefing(options = {}) {
  const briefing = getBriefingForMission(currentMissionIndex);

  if (briefing && shouldShowBriefingBeforeMission(currentMissionIndex)) {
    showLearningBriefing(briefing.id);
    return;
  }

  renderCurrentMission(options);
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function randomDuration(minimum, maximum) {
  return minimum + Math.round(Math.random() * (maximum - minimum));
}

function canAnimateMompyGaze() {
  return (
    settingsState.mompyAnimations
    &&
    trainingStarted
    && currentMompyState === "idle"
    && Boolean(sprite)
    && !mompyShutdownAnimating
    && !activeBriefingId
  );
}

function currentMompyGazeAsset() {
  return currentMompyGaze === "front" ? ASSETS.front : ASSETS.side;
}

function clearMompyBlinkTimers() {
  clearTimeout(mompyBlinkTimer);
  mompyBlinkFrameTimers.forEach((timer) => clearTimeout(timer));
  mompyBlinkTimer = null;
  mompyBlinkFrameTimers = [];
}

function clearMompyGazeTimer() {
  clearTimeout(mompyGazeTimer);
  mompyGazeTimer = null;
  mompyGazeTransitioning = false;
}

function clearMompyAmbientTimers() {
  clearMompyBlinkTimers();
  clearMompyGazeTimer();
  clearTimeout(mompyTypingPauseTimer);
  mompyTypingPauseTimer = null;
}

function pointMompyAtEditor() {
  if (
    !trainingStarted
    || missionCompleted
    || activeBriefingId
    || !sprite
    || !["idle", "talking"].includes(currentMompyState)
  ) {
    return;
  }

  if (currentMompyState === "talking") {
    finishMissionIntro();
    stopTalking();
    currentMompyState = "idle";
  }

  clearMompyAmbientTimers();
  currentMompyGaze = "side";
  mompyFirstForwardPending = true;
  sprite.src = ASSETS.side;

  mompyTypingPauseTimer = setTimeout(() => {
    mompyTypingPauseTimer = null;

    if (canAnimateMompyGaze() && currentMompyGaze === "side") {
      scheduleMompyGaze();
    }
  }, MOMPY_TYPING_PAUSE_MS);
}

function playMompyBlink() {
  if (
    !canAnimateMompyGaze()
    || currentMompyGaze !== "front"
    || mompyGazeTransitioning
  ) {
    return;
  }

  mompyBlinkFrameTimers = [];
  sprite.src = ASSETS.frontBlink;

  mompyBlinkFrameTimers.push(setTimeout(() => {
    mompyBlinkFrameTimers = [];

    if (
      canAnimateMompyGaze()
      && currentMompyGaze === "front"
      && !mompyGazeTransitioning
    ) {
      sprite.src = ASSETS.front;
      scheduleMompyBlink();
    }
  }, MOMPY_FRONT_BLINK_MS));
}

function scheduleMompyBlink() {
  clearTimeout(mompyBlinkTimer);
  mompyBlinkTimer = null;

  if (
    !canAnimateMompyGaze()
    || currentMompyGaze !== "front"
    || mompyGazeTransitioning
  ) {
    return;
  }

  const delay = randomDuration(MOMPY_FRONT_BLINK_MIN_MS, MOMPY_FRONT_BLINK_MAX_MS);
  mompyBlinkTimer = setTimeout(() => {
    mompyBlinkTimer = null;
    playMompyBlink();
  }, delay);
}

function beginMompyGazeTransition(nextGaze) {
  clearMompyGazeTimer();
  clearMompyBlinkTimers();

  if (!canAnimateMompyGaze()) {
    return;
  }

  mompyGazeTransitioning = true;
  sprite.src = ASSETS.gazeTransition;
  mompyGazeTimer = setTimeout(() => {
    mompyGazeTimer = null;

    if (!canAnimateMompyGaze()) {
      mompyGazeTransitioning = false;
      return;
    }

    currentMompyGaze = nextGaze;
    mompyGazeTransitioning = false;
    sprite.src = currentMompyGazeAsset();

    if (currentMompyGaze === "front") {
      mompyFirstForwardPending = false;
      scheduleMompyBlink();
    }

    scheduleMompyGaze();
  }, MOMPY_GAZE_TRANSITION_MS);
}

function scheduleMompyGaze() {
  clearMompyGazeTimer();

  if (!canAnimateMompyGaze()) {
    return;
  }

  const lookingForward = currentMompyGaze === "front";
  const delay = lookingForward
    ? randomDuration(MOMPY_FORWARD_GAZE_MIN_MS, MOMPY_FORWARD_GAZE_MAX_MS)
    : mompyFirstForwardPending
      ? randomDuration(MOMPY_FIRST_FORWARD_MIN_MS, MOMPY_FIRST_FORWARD_MAX_MS)
      : randomDuration(MOMPY_SIDE_GAZE_MIN_MS, MOMPY_SIDE_GAZE_MAX_MS);

  mompyGazeTimer = setTimeout(() => {
    if (!canAnimateMompyGaze()) {
      return;
    }

    beginMompyGazeTransition(lookingForward ? "side" : "front");
  }, delay);
}

function stopTalking() {
  if (talkTimer) {
    clearInterval(talkTimer);
    talkTimer = null;
  }
}

function clearMompyShutdownTimers() {
  mompyShutdownTimers.forEach((timer) => clearTimeout(timer));
  mompyShutdownTimers = [];
}

function stopMompyShutdownAnimation() {
  clearMompyShutdownTimers();
  mompyShutdownAnimating = false;
}

function playShutdownSound() {
  audioManager.playShutdown();
}

function playMompyShutdownAnimation() {
  if (!settingsState.mompyAnimations || !trainingStarted || !sprite || mompyShutdownAnimating || talkTimer || completionPending || activeBriefingId) {
    return;
  }

  mompyShutdownAnimating = true;
  clearMompyAmbientTimers();
  clearMompyShutdownTimers();
  playShutdownSound();

  const originalSrc = currentMompyState === "idle"
    ? currentMompyGazeAsset()
    : sprite.getAttribute("src") || ASSETS.idle;
  const steps = [
    [0, ASSETS.shutdown2],
    [120, ASSETS.shutdown3],
    [240, ASSETS.shutdown4],
    [420, ASSETS.shutdown4],
    [700, originalSrc],
  ];

  steps.forEach(([delay, source]) => {
    const timer = setTimeout(() => {
      sprite.src = source;

      if (delay === 700) {
        mompyShutdownAnimating = false;
        clearMompyShutdownTimers();
        scheduleMompyBlink();
        scheduleMompyGaze();
      }
    }, delay);

    mompyShutdownTimers.push(timer);
  });
}

function setMompyState(state, options = {}) {
  currentMompyState = state;
  clearMompyAmbientTimers();
  stopTalking();
  clearTimeout(settleTimer);
  machine.classList.remove("is-success", "is-error", "is-impressed");

  if (state === "talking") {
    talkFrame = false;
    sprite.src = ASSETS.talk1;
    if (!settingsState.mompyAnimations) {
      return;
    }
    talkTimer = setInterval(() => {
      talkFrame = !talkFrame;
      sprite.src = talkFrame ? ASSETS.talk2 : ASSETS.talk1;
    }, 260);
    return;
  }

  if (state === "briefing") {
    sprite.src = ASSETS.blank;
  } else if (state === "complete") {
    machine.classList.add("is-success");
    sprite.src = ASSETS.shutdown;
  } else if (state === "success") {
    machine.classList.add("is-success");
    sprite.src = ASSETS.success;
  } else if (state === "impressed") {
    machine.classList.add("is-success", "is-impressed");
    sprite.src = ASSETS.success;
  } else if (state === "error") {
    machine.classList.add("is-error");
    sprite.src = ASSETS.error;
  } else {
    currentMompyGaze = "side";
    mompyFirstForwardPending = true;
    sprite.src = currentMompyGazeAsset();
    scheduleMompyBlink();
    scheduleMompyGaze();
  }

  if (options.returnToIdle) {
    settleTimer = setTimeout(() => setMompyState("idle"), options.returnToIdle);
  }
}

function normalizeName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function readStoredUserProfile() {
  try {
    const rawProfile = localStorage.getItem(USER_PROFILE_KEY);

    if (!rawProfile) {
      return null;
    }

    const profile = JSON.parse(rawProfile);
    const firstName = normalizeName(profile.firstName);

    if (!firstName) {
      return null;
    }

    return {
      firstName,
      language: normalizeLanguage(profile.language),
      levelPreference: profile.levelPreference || "beginner",
      email: profile.email || "",
    };
  } catch (error) {
    console.warn(error);
    return null;
  }
}

function applyUserProfile(profile) {
  currentProfile = profile;
  currentUser.name = profile?.firstName || DEFAULT_USER_NAME;
}

function loadUserProfile() {
  const profile = readStoredUserProfile();
  applyUserProfile(profile);
  applyLanguage(profile?.language || localStorage.getItem(LANGUAGE_KEY) || "en-US");
  return profile;
}

async function saveUserProfile(firstName) {
  const profile = {
    firstName: normalizeName(firstName),
    language: "en-US",
    levelPreference: "beginner",
    email: "",
  };

  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  applyUserProfile(profile);
  renderStartUserInfo();

  const savedProfile = await callPythonBackend("save_profile", {
    name: profile.firstName,
    language: profile.language,
    level_preference: profile.levelPreference,
    email: profile.email,
  });

  return applyPythonProfile(savedProfile) || profile;
}

async function savePreferredLanguage(language) {
  applyLanguage(language);

  if (!currentProfile) {
    return currentLanguage;
  }

  const profile = {
    ...currentProfile,
    language: currentLanguage,
  };
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  applyUserProfile(profile);

  const savedProfile = await callPythonBackend("save_profile", {
    name: profile.firstName,
    language: currentLanguage,
    level_preference: profile.levelPreference,
    email: profile.email,
  });
  applyPythonProfile(savedProfile);
  return currentLanguage;
}

function clearUserProfile() {
  localStorage.removeItem(USER_PROFILE_KEY);
  applyUserProfile(null);
  renderStartUserInfo();
  callPythonBackend("logout_profile").then(applyPythonProfile);
}

function renderStartUserInfo() {
  startUserName.textContent = currentUser.name;
  startUserLevel.textContent = currentLanguage === "pt-BR"
    ? currentUser.level.replace("Beginner", "Iniciante")
    : currentUser.level.replace("Iniciante", "Beginner");
  startMissionCount.textContent = `${currentUser.missionsCompleted} / ${currentUser.totalMissions}`;
}

function clearOnboardingTimers() {
  clearTimeout(onboardingTypingTimer);
  clearTimeout(onboardingDelayTimer);
  onboardingTypingTimer = null;
  onboardingDelayTimer = null;
}

function typeOnboardingLine(line, speed = 36, token = onboardingToken) {
  return new Promise((resolve) => {
    if (!onboardingActive || token !== onboardingToken || !onboardingTerminalOutput) {
      resolve(false);
      return;
    }

    if (onboardingTerminalOutput.textContent) {
      onboardingTerminalOutput.textContent += "\n";
    }

    let index = 0;

    const tick = () => {
      if (!onboardingActive || token !== onboardingToken) {
        resolve(false);
        return;
      }

      onboardingTerminalOutput.textContent += line.charAt(index);
      index += 1;

      if (index >= line.length) {
        resolve(true);
        return;
      }

      onboardingTypingTimer = setTimeout(tick, speed);
    };

    tick();
  });
}

async function typeOnboardingIntro(token = onboardingToken) {
  for (const line of onboardingIntroLines) {
    const completed = await typeOnboardingLine(line, line.startsWith(">>>") ? 34 : 42, token);

    if (!completed) {
      return;
    }

    await wait(line.startsWith(">>>") ? 260 : 460);
  }

  if (!onboardingActive || token !== onboardingToken) {
    return;
  }

  onboardingNameInput.disabled = false;
  onboardingContinueButton.disabled = false;
  onboardingNameInput.focus();
}

function openOnboarding() {
  if (!onboardingOverlay) {
    return;
  }

  onboardingActive = true;
  onboardingToken += 1;
  clearOnboardingTimers();
  stopStartScreenMompyAnimation({ keepFace: true });

  onboardingOverlay.hidden = false;
  onboardingOverlay.setAttribute("aria-hidden", "false");
  onboardingOverlay.classList.remove("is-on");
  onboardingTerminalOutput.textContent = "";
  onboardingNameInput.value = "";
  onboardingNameInput.disabled = true;
  onboardingContinueButton.disabled = true;
  onboardingError.textContent = "";

  const token = onboardingToken;
  onboardingDelayTimer = setTimeout(() => {
    if (!onboardingActive || token !== onboardingToken) {
      return;
    }

    onboardingOverlay.classList.add("is-on");
    typeOnboardingIntro(token);
  }, 520);
}

function closeOnboarding() {
  if (!onboardingOverlay) {
    return;
  }

  onboardingActive = false;
  onboardingToken += 1;
  clearOnboardingTimers();
  onboardingOverlay.hidden = true;
  onboardingOverlay.setAttribute("aria-hidden", "true");
  onboardingOverlay.classList.remove("is-on");
  onboardingTerminalOutput.textContent = "";
  onboardingError.textContent = "";
}

async function submitOnboardingName() {
  const firstName = normalizeName(onboardingNameInput.value);

  if (!firstName) {
    onboardingError.textContent = "Type your first name.";
    onboardingNameInput.focus();
    return;
  }

  onboardingError.textContent = "";
  onboardingNameInput.disabled = true;
  onboardingContinueButton.disabled = true;

  if (onboardingTerminalOutput.textContent) {
    onboardingTerminalOutput.textContent += "\n";
  }

  onboardingTerminalOutput.textContent += `> ${firstName}\n>>> print(name)\n${firstName}\n\nProfile saved.\nLoading workspace...`;
  await saveUserProfile(firstName);
  await wait(720);
  closeOnboarding();
  startStartScreenMompyAnimation();
  audioManager.startAmbientMusic();
}

function clearStartMompyBlinkTimers() {
  clearTimeout(startMompyBlinkTimer);
  startMompyBlinkFrameTimers.forEach((timer) => clearTimeout(timer));
  startMompyBlinkTimer = null;
  startMompyBlinkFrameTimers = [];
}

function scheduleStartMompyBlink() {
  clearStartMompyBlinkTimers();

  if (
    prefersReducedMotion()
    || !startScreenAnimationActive
    || !startMompySprite
    || !startMompyTerminal.hidden
  ) {
    return;
  }

  const token = startMompyTerminalToken;
  startMompyBlinkTimer = setTimeout(() => {
    if (
      !startScreenAnimationActive
      || token !== startMompyTerminalToken
      || !startMompyTerminal.hidden
    ) {
      return;
    }

    startMompySprite.src = ASSETS.frontBlink;
    startMompyBlinkFrameTimers.push(setTimeout(() => {
      if (
        startScreenAnimationActive
        && token === startMompyTerminalToken
        && startMompyTerminal.hidden
      ) {
        startMompySprite.src = ASSETS.front;
      }
    }, MOMPY_FRONT_BLINK_MS));
  }, 920);
}

function showStartMompyFace() {
  startMompySprite.src = ASSETS.front;
  startMompyTerminal.hidden = true;
  startMompyTerminal.setAttribute("aria-hidden", "true");
  scheduleStartMompyBlink();
}

function showStartMompyTerminal() {
  clearStartMompyBlinkTimers();
  startMompySprite.src = ASSETS.blank;
  startMompyTerminal.hidden = false;
  startMompyTerminal.setAttribute("aria-hidden", "false");
}

function clearStartMompyTerminal() {
  startMompyTerminalOutput.textContent = "";
}

function terminalLineCount() {
  const text = startMompyTerminalOutput.textContent;
  return text ? text.split("\n").length : 0;
}

function appendTerminalText(text) {
  startMompyTerminalOutput.textContent += text;
}

function typeTerminalLine(line, speed = 45, token = startMompyTerminalToken) {
  return new Promise((resolve) => {
    if (!startScreenAnimationActive || token !== startMompyTerminalToken) {
      resolve(false);
      return;
    }

    if (startMompyTerminalOutput.textContent) {
      appendTerminalText("\n");
    }

    let index = 0;

    const tick = () => {
      if (!startScreenAnimationActive || token !== startMompyTerminalToken) {
        resolve(false);
        return;
      }

      appendTerminalText(line.charAt(index));
      index += 1;

      if (index >= line.length) {
        resolve(true);
        return;
      }

      startMompyTypingTimer = setTimeout(tick, speed);
    };

    tick();
  });
}

function waitStartTerminal(ms, token = startMompyTerminalToken) {
  return new Promise((resolve) => {
    startMompyTypingTimer = setTimeout(() => {
      resolve(startScreenAnimationActive && token === startMompyTerminalToken);
    }, ms);
  });
}

async function typeTerminalBlock(lines, token, options = {}) {
  const nextLineCount = terminalLineCount() + lines.length;

  if (options.clearBefore || nextLineCount > 7) {
    clearStartMompyTerminal();
  }

  for (const line of lines) {
    const completed = await typeTerminalLine(line, line.startsWith("...") ? 34 : 43, token);

    if (!completed) {
      return false;
    }

    const paused = await waitStartTerminal(line.startsWith(">>>") || line.startsWith("...") ? 230 : 420, token);

    if (!paused) {
      return false;
    }
  }

  return true;
}

async function startPythonTerminalLoop(token = startMompyTerminalToken) {
  const welcomed = await typeTerminalBlock(startTerminalWelcome, token, { clearBefore: true });

  if (!welcomed) {
    return;
  }

  await waitStartTerminal(1100, token);

  while (startScreenAnimationActive && token === startMompyTerminalToken) {
    const lines = startTerminalExamples[startTerminalExampleIndex];
    startTerminalExampleIndex = (startTerminalExampleIndex + 1) % startTerminalExamples.length;

    const completed = await typeTerminalBlock(lines, token);

    if (!completed) {
      return;
    }

    await waitStartTerminal(1450, token);
  }
}

function startStartScreenMompyAnimation() {
  if (!settingsState.mompyAnimations) {
    showStartMompyFace();
    return;
  }

  stopStartScreenMompyAnimation({ keepFace: true });
  startScreenAnimationActive = true;
  startMompyTerminalToken += 1;
  startTerminalExampleIndex = 0;
  showStartMompyFace();

  const token = startMompyTerminalToken;
  startMompyTerminalTimer = setTimeout(() => {
    if (!startScreenAnimationActive || token !== startMompyTerminalToken) {
      return;
    }

    clearStartMompyTerminal();
    showStartMompyTerminal();
    startPythonTerminalLoop(token);
  }, 2500);
}

function stopStartScreenMompyAnimation(options = {}) {
  startScreenAnimationActive = false;
  startMompyTerminalToken += 1;
  clearStartMompyBlinkTimers();
  clearTimeout(startMompyTerminalTimer);
  clearTimeout(startMompyTypingTimer);
  startMompyTerminalTimer = null;
  startMompyTypingTimer = null;
  clearStartMompyTerminal();
  startMompyTerminal.hidden = true;
  startMompyTerminal.setAttribute("aria-hidden", "true");

  if (!options.keepFace) {
    startMompySprite.src = ASSETS.front;
  }
}

async function showStartScreen() {
  stopClassroomEnvironmentAudio({ immediate: true });
  const backendSynced = await ensurePythonBackendState();
  const profile = loadUserProfile();

  if (!backendSynced) {
    loadProgress();
  } else {
    updateProgressUI();
  }

  loadBriefingProgress();
  trainingStarted = false;
  missionCompleted = false;
  completionPending = false;
  clearTimeout(completionTimer);
  stopMissionTyping();
  stopTalking();
  clearMompyAmbientTimers();
  stopMompyShutdownAnimation();
  clearTimeout(settleTimer);
  clearMompyScreenMessage();
  machine.classList.remove("training-active", "is-success", "is-error");
  startScreen.hidden = false;
  sprite.src = ASSETS.front;
  setMissionActionsEnabled(true);
  renderStartUserInfo();
  if (profile) {
    closeOnboarding();
    if (settingsState.mompyAnimations) {
      startStartScreenMompyAnimation();
    } else {
      showStartMompyFace();
    }
  } else {
    openOnboarding();
  }
  audioManager.startAmbientMusic();
}

function enterTraining() {
  stopClassroomEnvironmentAudio({ immediate: true });
  closeOnboarding();
  stopStartScreenMompyAnimation();
  stopMompyShutdownAnimation();
  audioManager.stopAmbientMusic();
  trainingStarted = true;
  missionCompleted = false;
  completionPending = false;
  clearTimeout(completionTimer);
  startScreen.hidden = true;
  machine.classList.add("training-active");
  machine.classList.remove("is-success", "is-error", "is-impressed");
  clearMompyScreenMessage();
  setMissionActionsEnabled(true);
  openMissionOrBriefing({ intro: true });
  editor.focus();
}

async function startFreshTraining() {
  await resetProgress({ keepMissionView: true });
  enterTraining();
}

function confirmStartOver() {
  openModal({
    title: "Start from scratch",
    body: "<p>You already have saved progress.<br>Do you want to start from scratch?</p>",
    actions: [
      {
        label: "Cancel",
        onClick: () => {
          closeModal();
          restoreAfterModal();
        },
      },
      {
        label: "Start from scratch",
        primary: true,
        variant: "danger",
        onClick: () => {
          closeModal();
          startFreshTraining();
        },
      },
    ],
  });
}

async function handleStart() {
  const backendSynced = await ensurePythonBackendState();

  if (!backendSynced) {
    loadProgress();
  }

  loadBriefingProgress();
  await refreshPythonProgress();

  if (hasSavedProgress()) {
    confirmStartOver();
    return;
  }

  await startFreshTraining();
}

async function handleContinue() {
  await ensurePythonBackendState();
  await refreshPythonProgress();

  if (hasSavedProgress()) {
    loadProgress();
    await refreshPythonProgress();
  } else {
    await resetProgress({ keepMissionView: true });
  }

  loadBriefingProgress();
  enterTraining();
}

function updateLevelDisplay() {
  const levelInfo = backendLevelInfo || getFallbackLevelInfo();
  levelValue.textContent = String(levelInfo.level).padStart(2, "0");
  levelFill.style.width = `${Math.max(4, levelInfo.progress)}%`;
}

function stopMissionTyping() {
  typingToken += 1;

  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
}

function buildMissionNodes(mission) {
  missionCopy.replaceChildren();

  const targets = [];
  const heading = document.createElement("h2");
  missionCopy.append(heading);
  targets.push({ node: heading, text: mission.title });

  const blocks = mission.blocks || [
    [{ text: mission.description }],
    [{ text: `Goal: ${mission.objective}` }],
  ];

  blocks.forEach((block) => {
    const paragraph = document.createElement("p");

    block.forEach((segment) => {
      const node = segment.tag
        ? document.createElement(segment.tag)
        : document.createTextNode("");

      paragraph.append(node);
      targets.push({ node, text: segment.text });
    });

    missionCopy.append(paragraph);
  });

  return targets;
}

function writeNode(node, text) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.nodeValue = text;
    return;
  }

  node.textContent = text;
}

function renderMission(mission) {
  updateLevelDisplay();
  buildMissionNodes(mission).forEach((target) => writeNode(target.node, target.text));
}

function missionIntroText(mission) {
  return `Mompy: ${mission.objective}\n${t("shortcutAlsoRuns")}`;
}

function renderCurrentMission(options = {}) {
  resetRewardCapsulePresentation();
  const mission = currentMission();
  missionCompleted = false;
  missionHintUsed = false;
  lastMissionReward = null;
  lastValidationResult = null;
  lastCompletedOutput = null;
  lastCompletedWasAdvanced = false;
  completionPending = false;
  clearTimeout(completionTimer);
  clearMompyScreenMessage();
  stopMissionTyping();
  setMissionActionsEnabled(true);
  setMompyState("idle");
  renderMission(mission);
  editor.value = mission.starterCode || "";
  updateLineNumbers();
  updateProgressUI();
  output.textContent = options.outputMessage || missionIntroText(mission);

  if (options.intro) {
    playMissionIntro();
  }
}

function typeText(target, token) {
  return new Promise((resolve) => {
    let index = 0;

    const tick = () => {
      if (token !== typingToken) {
        resolve(false);
        return;
      }

      writeNode(target.node, target.text.slice(0, index));

      if (index >= target.text.length) {
        resolve(true);
        return;
      }

      index += 1;
      typingTimer = setTimeout(tick, 22);
    };

    tick();
  });
}

async function playMissionIntro() {
  if (!trainingStarted) {
    return;
  }

  const mission = currentMission();
  stopMissionTyping();
  updateLevelDisplay();

  const token = typingToken;
  const targets = buildMissionNodes(mission);
  setMompyState("talking");

  for (const target of targets) {
    const completed = await typeText(target, token);

    if (!completed) {
      return;
    }

    await wait(80);
  }

  setMompyState("idle");
}

function finishMissionIntro() {
  if (!trainingStarted) {
    return;
  }

  stopMissionTyping();
  renderMission(currentMission());
}

function setMissionActionsEnabled(enabled) {
  backButton.disabled = !enabled;
  helpButton.disabled = !enabled;
  runButton.disabled = !enabled;
}

function showMissionCompleteOnMompy() {
  renderMompyCompletionPrompt();
  mompyScreenMessage.hidden = false;

  const reward = lastMissionReward;
  if (missionRewardSequenceScheduled || !reward?.first_completion || !reward.stars) {
    return;
  }

  missionRewardSequenceScheduled = true;
  const token = rewardCapsulePresentationToken;

  completionTimer = setTimeout(() => {
    if (
      token !== rewardCapsulePresentationToken
      || reward !== lastMissionReward
      || !missionCompleted
    ) {
      return;
    }

    const flightDuration = animateMissionReward(reward);
    if (!shouldPresentRewardCapsule(reward)) {
      return;
    }

    completionTimer = setTimeout(() => {
      if (
        token !== rewardCapsulePresentationToken
        || reward !== lastMissionReward
        || !missionCompleted
        || !shouldPresentRewardCapsule(reward)
      ) {
        return;
      }

      mompyScreenMessage.hidden = true;
      beginRewardCapsulePresentation();
    }, flightDuration + 180);
  }, 1000);
}

function clearMompyScreenMessage() {
  mompyScreenMessage.hidden = true;
  mompyScreenMessage.className = "mompy-screen-message";
  clearClassroomTypewriter();
  clearClassroomMompyScreenAction();
  if (classroomLessonContent) {
    classroomLessonContent.hidden = true;
    classroomLessonContent.className = "classroom-lesson-content";
    classroomLessonContent.replaceChildren();
    delete classroomLessonContent.dataset.interactive;
  }
  classroomAuxMonitorContent?.replaceChildren();
}

function resumeMompyAfterCodeEdit() {
  if (mompyScreenMessage.classList.contains("is-diagnostic")) {
    clearMompyScreenMessage();
    setMompyState("idle");
  }

  pointMompyAtEditor();
}

function showMompyPanelState(asset) {
  const showingStartScreen = !trainingStarted && Boolean(startMompySprite);
  const activeSprite = showingStartScreen ? startMompySprite : sprite;

  if (!activeSprite) {
    return;
  }

  if (!modalMompyRestore) {
    modalMompyRestore = {
      src: activeSprite.getAttribute("src") || ASSETS.idle,
      state: currentMompyState,
      gaze: currentMompyGaze,
      showingStartScreen,
      startAnimationActive: startScreenAnimationActive,
    };
  }

  if (showingStartScreen) {
    stopStartScreenMompyAnimation({ keepFace: true });
  } else {
    clearMompyAmbientTimers();
    stopTalking();
    clearTimeout(settleTimer);
    currentMompyState = "panel";
  }

  activeSprite.src = asset;
}

function restoreAfterModal() {
  const panelRestore = modalMompyRestore;
  modalMompyRestore = null;

  if (missionCompleted) {
    if (completionPending) {
      setMompyState("success");
    } else {
      setMompyState("complete");
      showMissionCompleteOnMompy();
    }
    return;
  }

  if (trainingStarted) {
    if (mompyScreenMessage.classList.contains("is-diagnostic")) {
      currentMompyState = "error";
      clearMompyAmbientTimers();
      stopTalking();
      clearTimeout(settleTimer);
      machine.classList.remove("is-success", "is-impressed");
      machine.classList.add("is-error");
      sprite.src = ASSETS.blank;
      return;
    }
    setMompyState("idle");
    return;
  }

  if (panelRestore?.showingStartScreen && startMompySprite) {
    currentMompyState = panelRestore.state;
    currentMompyGaze = panelRestore.gaze;
    startMompySprite.src = panelRestore.src;

    if (panelRestore.startAnimationActive) {
      startStartScreenMompyAnimation();
    }
  }
}

function shouldReduceMotion() {
  return !settingsState.mompyAnimations
    || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function animateMissionReward(reward) {
  if (!reward?.first_completion || !reward.stars || shouldReduceMotion()) {
    return 0;
  }

  const source = document.querySelector(".mascot-panel")?.getBoundingClientRect();
  const target = document.querySelector(".level-panel")?.getBoundingClientRect();
  if (!source || !target) {
    return 0;
  }

  const startX = source.left + source.width * 0.5;
  const startY = source.top + source.height * 0.45;
  const endX = target.left + target.width * 0.5;
  const endY = target.top + target.height * 0.5;

  Array.from({ length: reward.stars }, (_, index) => index).forEach((index) => {
    const star = document.createElement("span");
    star.className = "reward-star-flight";
    star.textContent = "★";
    star.style.left = `${startX - 11}px`;
    star.style.top = `${startY - 11}px`;
    document.body.append(star);

    const animation = star.animate([
      { transform: `translate(${(index - 1) * 18}px, 8px) scale(.55)`, opacity: 0 },
      { transform: `translate(${(index - 1) * 28}px, -28px) scale(1.15)`, opacity: 1, offset: 0.32 },
      { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(.45)`, opacity: 0.15 },
    ], {
      duration: 760,
      delay: index * 110,
      easing: "cubic-bezier(.2,.75,.25,1)",
      fill: "forwards",
    });
    animation.addEventListener("finish", () => star.remove(), { once: true });
  });

  return 760 + Math.max(0, reward.stars - 1) * 110;
}

function hasAdvancedSolutionSignal(...sources) {
  const advancedQualityNames = new Set(["advanced", "professional", "expert", "elegant"]);

  return sources.some((source) => {
    if (!source || typeof source !== "object") {
      return false;
    }

    if (
      source.advanced_solution === true
      || source.advancedSolution === true
      || source.professional_solution === true
      || source.professionalSolution === true
    ) {
      return true;
    }

    const quality = source.solution_quality
      ?? source.solutionQuality
      ?? source.solution_tier
      ?? source.solutionTier;
    return advancedQualityNames.has(String(quality || "").trim().toLowerCase());
  });
}

function completeMission(result) {
  const mission = currentMission();
  resetRewardCapsulePresentation();
  missionCompleted = true;
  completionPending = true;
  const alreadyCompleted = completedMissionIds.includes(mission.id);
  lastMissionReward = result.reward || null;

  if (result.progress) {
    applyPythonProgress(result.progress);
  } else {
    callPythonBackend("complete_mission", mission.id).then((progress) => {
      if (progress) {
        applyPythonProgress(progress);
        return;
      }

      if (!alreadyCompleted) {
        completedMissionIds.push(mission.id);
        backendLevelInfo = null;
      }

      saveLocalProgress();
      updateProgressUI();
    });
  }
  clearTimeout(completionTimer);
  setMissionActionsEnabled(false);
  clearMompyScreenMessage();
  lastValidationResult = null;
  lastCompletedOutput = result.output ?? "";
  lastCompletedWasAdvanced = Boolean(result.advancedSolution);
  renderCompletedMissionOutput(lastCompletedOutput, lastCompletedWasAdvanced);
  audioManager.playSuccess();
  setMompyState(lastCompletedWasAdvanced ? "impressed" : "success");
  completionTimer = setTimeout(() => {
    if (!missionCompleted) {
      return;
    }

    completionPending = false;
    setMompyState("complete");
    showMissionCompleteOnMompy();
  }, lastCompletedWasAdvanced ? 2300 : 1500);
}

function renderCompletedMissionOutput(programOutput, advancedSolution = false) {
  const lines = [
    `${t("correctOutput")}\n${programOutput}`,
    t("missionCompletedOutput"),
  ];

  if (advancedSolution) {
    lines.push(`♥ ${t("advancedSolutionPraise")} ♥`);
  }

  output.textContent = lines.join("\n\n");
}

function editorOffsetAt(lineNumber, columnNumber = 1) {
  const lines = editor.value.split("\n");
  const safeLine = Math.max(1, Math.min(Number(lineNumber) || 1, lines.length));
  const lineText = lines[safeLine - 1] || "";
  const safeColumn = Math.max(1, Math.min(Number(columnNumber) || 1, lineText.length + 1));
  const previousLength = lines
    .slice(0, safeLine - 1)
    .reduce((total, line) => total + line.length + 1, 0);
  return previousLength + safeColumn - 1;
}

function focusDiagnosticLocation(diagnostic) {
  if (!diagnostic?.line) {
    return;
  }

  const start = editorOffsetAt(diagnostic.line, diagnostic.column || 1);
  const endLine = diagnostic.end_line || diagnostic.line;
  let end = editorOffsetAt(endLine, diagnostic.end_column || diagnostic.column || 1);

  if (end <= start) {
    const sourceLength = String(diagnostic.source_line || "").length;
    end = sourceLength > 0
      ? editorOffsetAt(diagnostic.line, sourceLength + 1)
      : Math.min(start + 1, editor.value.length);
  }

  editor.focus();
  editor.setSelectionRange(start, end);
}

function appendDiagnosticText(parent, className, label, value) {
  if (!value) {
    return;
  }

  const paragraph = document.createElement("p");
  paragraph.className = className;

  if (label) {
    const strong = document.createElement("strong");
    strong.textContent = label;
    paragraph.append(strong, document.createTextNode(" "));
  }

  paragraph.append(document.createTextNode(String(value)));
  parent.append(paragraph);
}

function normalizeDiagnosticPayload(diagnostic = {}, result = {}) {
  const location = diagnostic.location && typeof diagnostic.location === "object"
    ? diagnostic.location
    : {};
  const range = diagnostic.range && typeof diagnostic.range === "object"
    ? diagnostic.range
    : {};
  const line = diagnostic.line ?? diagnostic.line_number ?? diagnostic.lineno ?? location.line ?? range.start_line;
  const column = diagnostic.column ?? diagnostic.column_number ?? diagnostic.offset ?? location.column ?? range.start_column;
  const endLine = diagnostic.end_line ?? diagnostic.endLine ?? range.end_line ?? line;
  const endColumn = diagnostic.end_column ?? diagnostic.endColumn ?? range.end_column ?? column;
  const summary = diagnostic.summary ?? diagnostic.message ?? diagnostic.detail ?? result.message;
  const suggestion = diagnostic.suggestion
    ?? diagnostic.action
    ?? diagnostic.fix
    ?? diagnostic.how_to_fix
    ?? diagnostic.recommendation
    ?? result.detail;

  return {
    ...diagnostic,
    category: diagnostic.category || diagnostic.type || "mission",
    title: diagnostic.title || diagnostic.name || result.title,
    summary,
    cause: diagnostic.cause ?? diagnostic.reason ?? summary,
    explanation: diagnostic.explanation ?? diagnostic.detailed_explanation ?? diagnostic.details,
    suggestion,
    action: diagnostic.action ?? suggestion,
    line,
    column,
    end_line: endLine,
    end_column: endColumn,
    source_line: diagnostic.source_line ?? diagnostic.sourceLine ?? diagnostic.source ?? location.source_line,
    expected: diagnostic.expected ?? result.expectedOutput,
    actual: diagnostic.actual ?? result.actualOutput,
    hasExplicitCause: Boolean(diagnostic.cause || diagnostic.reason),
    hasExplicitAction: Boolean(diagnostic.action),
  };
}

function localizedDiagnostic(diagnostic) {
  if (currentLanguage !== "pt-BR") {
    return diagnostic;
  }

  const mission = currentMission();
  const translations = {
    empty_editor: {
      title: t("writeMissionCodeFirst"),
      summary: t("editorEmpty"),
      suggestion: mission.help || t("writeRequestedCode"),
    },
    mission_requirement_missing: {
      title: t("diagnosticMissionRequirementTitle"),
      summary: t("diagnosticMissionRequirementSummary"),
      suggestion: mission.help || t("diagnosticMissionRequirementSuggestion"),
    },
    output_mismatch: {
      title: t("diagnosticOutputTitle"),
      summary: t("diagnosticOutputSummary"),
      suggestion: t("diagnosticOutputSuggestion"),
    },
    syntax_error: {
      title: t("diagnosticSyntaxTitle"),
      summary: t("diagnosticSyntaxSummary"),
      suggestion: t("diagnosticSyntaxSuggestion"),
    },
    code_too_long: {
      title: t("diagnosticSafetyTitle"),
      summary: t("diagnosticSafetySummary"),
      suggestion: t("diagnosticSafetySuggestion"),
    },
    feature_not_available: {
      title: t("diagnosticSafetyTitle"),
      summary: t("diagnosticSafetySummary"),
      suggestion: t("diagnosticSafetySuggestion"),
    },
    time_limit_exceeded: {
      title: t("diagnosticTimeoutTitle"),
      summary: t("diagnosticTimeoutSummary"),
      suggestion: t("diagnosticTimeoutSuggestion"),
    },
    missing_execution_response: {
      title: t("diagnosticRuntimeTitle"),
      summary: t("diagnosticRuntimeSummary"),
      suggestion: t("diagnosticRuntimeSuggestion"),
    },
    nameerror: {
      title: t("diagnosticNameErrorTitle"),
      summary: t("diagnosticNameErrorSummary"),
      suggestion: t("diagnosticNameErrorSuggestion"),
    },
    typeerror: {
      title: t("diagnosticTypeErrorTitle"),
      summary: t("diagnosticTypeErrorSummary"),
      suggestion: t("diagnosticTypeErrorSuggestion"),
    },
    zerodivisionerror: {
      title: t("diagnosticZeroDivisionTitle"),
      summary: t("diagnosticZeroDivisionSummary"),
      suggestion: t("diagnosticZeroDivisionSuggestion"),
    },
    indexerror: {
      title: t("diagnosticIndexErrorTitle"),
      summary: t("diagnosticIndexErrorSummary"),
      suggestion: t("diagnosticIndexErrorSuggestion"),
    },
  };
  const fallback = diagnostic.category === "mission" || diagnostic.category === "concept"
    ? {
        title: t("diagnosticMissionRequirementTitle"),
        summary: t("diagnosticMissionRequirementSummary"),
        suggestion: mission.help || t("diagnosticMissionRequirementSuggestion"),
      }
    : {
        title: t("diagnosticRuntimeTitle"),
        summary: t("diagnosticRuntimeSummary"),
        suggestion: t("diagnosticRuntimeSuggestion"),
      };

  const translation = translations[String(diagnostic.code || "").toLowerCase()];
  if (!translation) {
    const suggestion = diagnostic.action || diagnostic.suggestion || fallback.suggestion;
    return {
      ...diagnostic,
      title: diagnostic.title || fallback.title,
      cause: diagnostic.cause || diagnostic.summary || fallback.summary,
      summary: diagnostic.summary || fallback.summary,
      suggestion,
      action: suggestion,
    };
  }

  const suggestion = diagnostic.hasExplicitAction ? diagnostic.action : translation.suggestion;
  return {
    ...diagnostic,
    title: translation.title,
    cause: diagnostic.hasExplicitCause ? diagnostic.cause : translation.summary,
    summary: translation.summary,
    suggestion,
    action: suggestion,
  };
}

function primaryDiagnostic(result = {}) {
  const rawDiagnostic = result.diagnostics?.[0] || result.diagnostic || {
    category: "mission",
    title: t("missionNotComplete"),
    summary: result.message || t("checkMissionGoal"),
    suggestion: result.detail,
  };
  return localizedDiagnostic(normalizeDiagnosticPayload(rawDiagnostic, result));
}

function renderMompyDiagnostic(result = {}) {
  const diagnostic = primaryDiagnostic(result);
  const mission = currentMission();
  const sourceLine = diagnostic.source_line || (
    diagnostic.line ? editor.value.split("\n")[Number(diagnostic.line) - 1] : ""
  );
  const locationText = diagnostic.line
    ? diagnostic.column
      ? t("lineColumnLocation", { line: diagnostic.line, column: diagnostic.column })
      : t("lineLocation", { line: diagnostic.line })
    : "";

  stopTalking();
  clearTimeout(settleTimer);
  currentMompyState = "error";
  machine.classList.remove("is-success", "is-impressed");
  machine.classList.add("is-error");
  sprite.src = ASSETS.blank;
  mompyScreenMessage.hidden = false;
  mompyScreenMessage.className = "mompy-screen-message is-briefing is-diagnostic";

  const viewport = document.createElement("div");
  viewport.className = "mompy-screen-diagnostic-viewport";

  const content = document.createElement("div");
  content.className = "mompy-screen-text mompy-screen-diagnostic-content";
  content.tabIndex = 0;
  content.setAttribute("role", "region");
  content.setAttribute("aria-label", t("missionHelp"));

  const appendText = (label, value, className = "") => {
    if (value == null || String(value).trim() === "") {
      return;
    }

    const paragraph = document.createElement("p");
    if (className) {
      paragraph.className = className;
    }
    if (label) {
      const strong = document.createElement("strong");
      strong.textContent = label;
      paragraph.append(strong, document.createTextNode(` ${String(value)}`));
    } else {
      paragraph.textContent = String(value);
    }
    content.append(paragraph);
  };

  appendText("", diagnostic.title || t("checkAttempt"), "mompy-screen-diagnostic-title");
  appendText("", locationText, "mompy-screen-diagnostic-location");

  if (sourceLine) {
    const source = document.createElement("p");
    source.className = "mompy-screen-diagnostic-source";
    const label = document.createElement("strong");
    label.textContent = t("diagnosticSourceLine");
    const code = document.createElement("code");
    code.textContent = String(sourceLine);
    source.append(label, code);
    content.append(source);
  }

  appendText(
    t("diagnosticCause"),
    diagnostic.cause || diagnostic.summary || result.message,
    "mompy-screen-diagnostic-cause",
  );
  if (diagnostic.explanation && diagnostic.explanation !== diagnostic.cause) {
    appendText(
      t("diagnosticExplanation"),
      diagnostic.explanation,
      "mompy-screen-diagnostic-explanation",
    );
  }
  appendText(
    t("diagnosticSuggestion"),
    diagnostic.action || diagnostic.suggestion || result.detail || mission.help,
    "mompy-screen-diagnostic-fix",
  );

  if (diagnostic.category === "output") {
    appendText(t("expected"), diagnostic.expected ?? result.expectedOutput ?? t("noOutput"));
    appendText(t("received"), diagnostic.actual ?? result.actualOutput ?? t("noOutput"));
  }

  const helpText = String(mission.help || "").trim();
  const suggestionText = String(diagnostic.action || diagnostic.suggestion || result.detail || "").trim();
  if (helpText && helpText !== suggestionText) {
    appendText("", helpText, "mompy-screen-diagnostic-help");
  }
  appendText(t("goal"), mission.objective, "mompy-screen-diagnostic-goal");

  const scrollHint = document.createElement("p");
  scrollHint.className = "mompy-screen-scroll-hint";
  scrollHint.textContent = t("scrollOrDragForMore");
  scrollHint.hidden = true;

  const updateScrollHint = () => {
    const hasOverflow = content.scrollHeight > content.clientHeight + 2;
    const reachedEnd = content.scrollTop + content.clientHeight >= content.scrollHeight - 2;
    scrollHint.hidden = !hasOverflow || reachedEnd;
  };

  content.addEventListener("scroll", updateScrollHint, { passive: true });
  viewport.append(content, scrollHint);
  mompyScreenMessage.replaceChildren(viewport);
  bindPointerDragScroll(content);
  window.requestAnimationFrame(updateScrollHint);
  window.setTimeout(updateScrollHint, 80);
}

function renderDiagnostic(result) {
  lastValidationResult = result;
  const diagnostic = primaryDiagnostic(result);

  output.replaceChildren();

  const report = document.createElement("article");
  report.className = `diagnostic-report diagnostic-${diagnostic.category || "mission"}`;

  const heading = document.createElement("div");
  heading.className = "diagnostic-heading";

  const title = document.createElement("h3");
  title.textContent = diagnostic.title || t("checkAttempt");
  heading.append(title);

  if (diagnostic.line) {
    const location = document.createElement("button");
    location.type = "button";
    location.className = "diagnostic-location";
    location.textContent = diagnostic.column
      ? t("lineColumnLocation", { line: diagnostic.line, column: diagnostic.column })
      : t("lineLocation", { line: diagnostic.line });
    location.addEventListener("click", () => focusDiagnosticLocation(diagnostic));
    heading.append(location);
  }

  report.append(heading);
  const sourceLine = diagnostic.source_line || (
    diagnostic.line ? editor.value.split("\n")[Number(diagnostic.line) - 1] : ""
  );
  if (sourceLine) {
    const source = document.createElement("p");
    source.className = "diagnostic-source";
    const label = document.createElement("strong");
    label.textContent = t("diagnosticSourceLine");
    const code = document.createElement("code");
    code.textContent = String(sourceLine);
    source.append(label, code);
    report.append(source);
  }

  appendDiagnosticText(
    report,
    "diagnostic-summary",
    t("diagnosticCause"),
    diagnostic.cause || diagnostic.summary || result.message,
  );
  if (diagnostic.explanation && diagnostic.explanation !== diagnostic.cause) {
    appendDiagnosticText(
      report,
      "diagnostic-explanation",
      t("diagnosticExplanation"),
      diagnostic.explanation,
    );
  }
  appendDiagnosticText(
    report,
    "diagnostic-suggestion",
    t("diagnosticSuggestion"),
    diagnostic.action || diagnostic.suggestion || result.detail,
  );

  const expected = diagnostic.expected ?? result.expectedOutput;
  const actual = diagnostic.actual ?? result.actualOutput;
  if (diagnostic.category === "output" && (expected != null || actual != null)) {
    const comparison = document.createElement("div");
    comparison.className = "diagnostic-comparison";
    appendDiagnosticText(
      comparison,
      "diagnostic-expected",
      t("expected"),
      expected || t("noOutput"),
    );
    appendDiagnosticText(
      comparison,
      "diagnostic-actual",
      t("received"),
      actual || t("noOutput"),
    );
    report.append(comparison);
    report.classList.add("has-comparison");
  }

  output.append(report);

  if (diagnostic.line) {
    window.setTimeout(() => focusDiagnosticLocation(diagnostic), 0);
  }
}

function showMissionExplanation(result = null, { automatic = false } = {}) {
  if (!automatic && helpButton.disabled) {
    return;
  }

  if (!automatic) {
    finishMissionIntro();
  }

  missionHintUsed = true;
  const diagnosticOnMompyScreen = Boolean(
    result && mompyScreenMessage.classList.contains("is-diagnostic"),
  );
  if (!diagnosticOnMompyScreen) {
    setMompyState("talking");
  }
  const mission = currentMission();
  const diagnostic = result ? primaryDiagnostic(result) : null;
  const sourceLine = diagnostic && (
    diagnostic.source_line
    || (diagnostic.line ? editor.value.split("\n")[Number(diagnostic.line) - 1] : "")
  );
  const locationText = diagnostic?.line
    ? diagnostic.column
      ? t("lineColumnLocation", { line: diagnostic.line, column: diagnostic.column })
      : t("lineLocation", { line: diagnostic.line })
    : "";
  const expected = diagnostic?.expected ?? result?.expectedOutput;
  const actual = diagnostic?.actual ?? result?.actualOutput;
  const diagnosticMarkup = diagnostic ? `
    <section class="mission-explanation-diagnostic">
      <h3>${escapeHtml(diagnostic.title || t("checkAttempt"))}</h3>
      ${locationText ? `<p class="mission-explanation-location">${escapeHtml(locationText)}</p>` : ""}
      ${sourceLine ? `<p class="mission-explanation-source"><strong>${escapeHtml(t("diagnosticSourceLine"))}</strong><code>${escapeHtml(sourceLine)}</code></p>` : ""}
      <p><strong>${escapeHtml(t("diagnosticCause"))}</strong> ${escapeHtml(diagnostic.cause || diagnostic.summary || result?.message)}</p>
      ${diagnostic.explanation && diagnostic.explanation !== diagnostic.cause ? `<p><strong>${escapeHtml(t("diagnosticExplanation"))}</strong> ${escapeHtml(diagnostic.explanation)}</p>` : ""}
      <p><strong>${escapeHtml(t("diagnosticSuggestion"))}</strong> ${escapeHtml(diagnostic.action || diagnostic.suggestion || result?.detail || mission.help)}</p>
      ${diagnostic.category === "output" ? `
        <div class="mission-explanation-comparison">
          <p><strong>${escapeHtml(t("expected"))}</strong> ${escapeHtml(expected || t("noOutput"))}</p>
          <p><strong>${escapeHtml(t("received"))}</strong> ${escapeHtml(actual || t("noOutput"))}</p>
        </div>
      ` : ""}
    </section>
  ` : "";

  openModal({
    title: t("missionHelp"),
    variant: "mission-help",
    body: `
      <div class="mission-explanation ${automatic ? "is-automatic" : ""}">
        ${diagnosticMarkup}
        <p class="mission-explanation-help">${escapeHtml(mission.help)}</p>
        <p><strong>${escapeHtml(t("goal"))}:</strong> ${escapeHtml(mission.objective)}</p>
      </div>
    `,
    actions: [
      {
        label: t("gotIt"),
        primary: true,
        onClick: () => {
          closeModal();
          if (!mompyScreenMessage.classList.contains("is-diagnostic")) {
            setMompyState("idle");
          }
          editor.focus();
        },
      },
    ],
  });
}

function failMission(result) {
  renderDiagnostic(result);
  audioManager.playError();
  renderMompyDiagnostic(result);
}

function repeatMission() {
  resetRewardCapsulePresentation();
  missionCompleted = false;
  completionPending = false;
  missionHintUsed = false;
  lastMissionReward = null;
  lastValidationResult = null;
  lastCompletedOutput = null;
  lastCompletedWasAdvanced = false;
  clearTimeout(completionTimer);
  clearMompyScreenMessage();
  setMissionActionsEnabled(true);
  setMompyState("idle");
  editor.value = currentMission().starterCode || "";
  updateLineNumbers();
  output.textContent = t("missionRestarted");
  editor.focus();
}

function goToNextMission() {
  if (currentMissionIndex >= missions.length - 1) {
    missionCompleted = true;
    completionPending = false;
    clearTimeout(completionTimer);
    clearMompyScreenMessage();
    setMissionActionsEnabled(false);
    setMompyState("complete");
    output.textContent = [
      t("allMissionsComplete"),
      t("newMissionsSoon"),
    ].join("\n");
    saveProgress();
    return;
  }

  currentMissionIndex = clampMissionIndex(currentMissionIndex + 1);
  missionCompleted = false;
  completionPending = false;
  clearTimeout(completionTimer);
  saveProgress();
  openMissionOrBriefing({ intro: true });
  editor.focus();
}

function updateLineNumbers() {
  const total = Math.max(1, editor.value.split("\n").length);
  lineNumbers.textContent = Array.from({ length: total }, (_, index) => index + 1).join("\n");
}

function extractPrintOutput(code) {
  const printCall = code.match(/print\s*\(\s*(["'`])([\s\S]*?)\1\s*\)/);
  return printCall ? printCall[2] : "";
}

async function validateCode(code) {
  await wait(450);

  const mission = currentMission();
  const trimmed = code.trim();
  if (!trimmed || trimmed === "# write here") {
    return {
      ok: false,
      output: t("noCodeToRun"),
      diagnostics: [
        {
          category: "mission",
          code: "empty_editor",
          title: t("writeMissionCodeFirst"),
          summary: t("editorEmpty"),
          suggestion: mission.help || t("writeRequestedCode"),
        },
      ],
      detail: mission.help || t("writeRequestedCode"),
    };
  }

  const usedHint = missionHintUsed;
  missionHintUsed = false;
  const submission = await callPythonBackend("submit_mission", mission.id, code, usedHint);
  const backendValidation = submission?.validation || submission;
  if (backendValidation && typeof backendValidation.correct === "boolean") {
    if (submission?.progress) {
      applyPythonProgress(submission.progress);
    }
    return {
      ok: Boolean(backendValidation.correct),
      output: backendValidation.actual_output || backendValidation.expected_output || mission.expectedOutput,
      actualOutput: backendValidation.actual_output,
      expectedOutput: backendValidation.expected_output || mission.expectedOutput,
      message: backendValidation.message,
      diagnostics: Array.isArray(backendValidation.diagnostics) ? backendValidation.diagnostics : [],
      detail: backendValidation.correct
        ? backendValidation.message || t("missionCompletedOutput")
        : backendValidation.runtime_error || backendValidation.hints?.[0] || backendValidation.message || mission.help,
      advancedSolution: hasAdvancedSolutionSignal(backendValidation, submission, submission?.reward),
      progress: submission?.progress,
      reward: submission?.reward,
    };
  }

  const printed = extractPrintOutput(code);
  return {
    ok: false,
    output: printed || t("notQuiteThisTime"),
    actualOutput: printed,
    expectedOutput: mission.expectedOutput,
    diagnostics: [],
    detail: t("backendValidationRequired"),
  };
}

async function runCode() {
  if (!trainingStarted || missionCompleted || runButton.disabled) {
    return;
  }

  finishMissionIntro();
  if (mompyScreenMessage.classList.contains("is-diagnostic")) {
    clearMompyScreenMessage();
  }
  const code = editor.value;
  runButton.disabled = true;
  lastValidationResult = null;
  lastCompletedOutput = null;
  lastCompletedWasAdvanced = false;
  output.textContent = t("runningValidation");
  audioManager.playRun();
  setMompyState("talking");

  try {
    const result = await validateCode(code);
    if (result.ok) {
      completeMission(result);
      return;
    }

    failMission(result);
  } catch (error) {
    output.textContent = `${t("unexpectedValidationError")}\n${error.message}`;
    audioManager.playError();
    setMompyState("error", { returnToIdle: 3200 });
  } finally {
    if (!missionCompleted) {
      runButton.disabled = false;
    }

    if (modalBackdrop.hidden) {
      editor.focus();
    }
  }
}

function openModal({ title, body, actions = [], variant = "default" }) {
  const immersiveVariant = variant === "achievements" || variant === "settings";
  const modal = modalBackdrop.querySelector(".modal");
  lastFocusedElement = document.activeElement;
  modalBackdrop.dataset.modalVariant = variant;
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  modalActions.replaceChildren();

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    const buttonVariant = action.variant || (action.primary ? "primary" : "secondary");
    button.className = mompyButtonClasses(
      buttonVariant,
      "modal-button",
      action.primary ? "primary" : "",
    );
    button.textContent = action.label;
    button.addEventListener("click", action.onClick);
    modalActions.append(button);
  });

  modalBackdrop.hidden = false;
  modalCloseButton.disabled = immersiveVariant;
  const firstAction = modalActions.querySelector("button");

  if (immersiveVariant) {
    modal?.setAttribute("tabindex", "-1");
    modal?.focus({ preventScroll: true });
    return;
  }

  if (firstAction) {
    firstAction.focus();
  } else {
    modalCloseButton.focus();
  }
}

function closeModal() {
  modalBackdrop.hidden = true;
  modalCloseButton.disabled = false;
  modalBackdrop.querySelector(".modal")?.removeAttribute("tabindex");
  delete modalBackdrop.dataset.modalVariant;
  modalTitle.textContent = "";
  modalBody.textContent = "";
  modalActions.replaceChildren();

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function showBackConfirmation() {
  if (backButton.disabled) {
    return;
  }

  finishMissionIntro();
  setMompyState("idle");

  if (currentMissionIndex <= 0) {
    output.textContent = t("firstMissionAlready");
    return;
  }

  openModal({
    title: "Go back a mission",
    variant: "mission-help",
    body: "<p>Are you sure you want to go back to the previous mission?</p>",
    actions: [
      {
        label: "Cancel",
        onClick: () => {
          closeModal();
          setMompyState("idle");
        },
      },
      {
        label: "Confirm",
        primary: true,
        onClick: () => {
          closeModal();
          currentMissionIndex = clampMissionIndex(currentMissionIndex - 1);
          saveProgress();
          openMissionOrBriefing({ intro: true });
        },
      },
    ],
  });
}

function showHelp() {
  const hadDiagnostic = mompyScreenMessage.classList.contains("is-diagnostic");
  const diagnosticResult = hadDiagnostic ? lastValidationResult : null;

  if (hadDiagnostic) {
    clearMompyScreenMessage();
  }

  showMissionExplanation(diagnosticResult);
}

function toggleLabel(value) {
  return value ? t("on") : t("off");
}

function settingMeter(settingName) {
  const value = settingsState[settingName];
  return `
    <div class="setting-stepper">
      <button class="setting-step mompy-button mompy-button--icon" type="button" data-setting-step="${settingName}" data-delta="-10" aria-label="${t("decrease")}">-</button>
      <span class="setting-meter" data-setting-meter="${settingName}" style="--value: ${value}%">
        <span data-setting-value="${settingName}">${value}%</span>
      </span>
      <button class="setting-step mompy-button mompy-button--icon" type="button" data-setting-step="${settingName}" data-delta="10" aria-label="${t("increase")}">+</button>
    </div>
  `;
}

function updateStatusText() {
  if (!updateStatusCache) {
    return t("notChecked");
  }

  if (updateStatusCache.error) {
    return t("checkUnavailable");
  }

  if (updateStatusCache.update_available) {
    return t("newVersion", { version: updateStatusCache.latest_version });
  }

  return t("upToDate");
}

function settingsSectionMeta(sectionId) {
  return SETTINGS_SECTIONS.find(({ id }) => id === sectionId) || SETTINGS_SECTIONS[0];
}

function renderSettingsSection(sectionId) {
  const section = settingsSectionMeta(sectionId);

  if (section.id === "audio") {
    return `
      <section class="settings-active-section settings-active-section--audio" aria-label="${t(section.id)}">
        <div class="settings-section-rows">
          <div class="settings-slot" data-settings-slot="a">
            <div class="settings-row">
              <span>${t("ambientMusic")}</span>
              <button class="settings-control settings-toggle mompy-toggle" type="button" data-setting-toggle="ambientMusic" aria-pressed="${settingsState.ambientMusic}">
                ${toggleLabel(settingsState.ambientMusic)}
              </button>
            </div>
          </div>
          <div class="settings-slot" data-settings-slot="b">
            <div class="settings-row"><span>${t("musicVolume")}</span>${settingMeter("musicVolume")}</div>
          </div>
          <div class="settings-slot" data-settings-slot="c">
            <div class="settings-row">
              <span>${t("soundEffects")}</span>
              <button class="settings-control settings-toggle mompy-toggle" type="button" data-setting-toggle="soundEffects" aria-pressed="${settingsState.soundEffects}">
                ${toggleLabel(settingsState.soundEffects)}
              </button>
            </div>
          </div>
          <div class="settings-slot" data-settings-slot="d">
            <div class="settings-row"><span>${t("effectsVolume")}</span>${settingMeter("effectsVolume")}</div>
          </div>
        </div>
      </section>
    `;
  }

  if (section.id === "interface") {
    return `
      <section class="settings-active-section settings-active-section--interface" aria-label="${t(section.id)}">
        <div class="settings-section-rows">
          <div class="settings-slot" data-settings-slot="a">
            <div class="settings-row settings-language-row">
              <span>${t("language")}</span>
              <div class="language-selector" role="group" aria-label="${t("language")}">
                <button class="language-option mompy-button mompy-button--tab" type="button" data-language-option="en-US" aria-pressed="${currentLanguage === "en-US"}">English</button>
                <button class="language-option mompy-button mompy-button--tab" type="button" data-language-option="pt-BR" aria-pressed="${currentLanguage === "pt-BR"}">Português</button>
              </div>
            </div>
          </div>
          <div class="settings-slot" data-settings-slot="b">
            <div class="settings-row"><span>${t("crtBrightness")}</span>${settingMeter("crtBrightness")}</div>
          </div>
          <div class="settings-slot" data-settings-slot="c">
            <div class="settings-row">
              <span>${t("mompyAnimations")}</span>
              <button class="settings-control settings-toggle mompy-toggle" type="button" data-setting-toggle="mompyAnimations" aria-pressed="${settingsState.mompyAnimations}">
                ${toggleLabel(settingsState.mompyAnimations)}
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  if (section.id === "progress") {
    return `
      <section class="settings-active-section settings-active-section--progress" aria-label="${t(section.id)}">
        <div class="settings-section-rows">
          <div class="settings-slot settings-slot--stacked" data-settings-slot="a">
            <div class="settings-row"><span>${t("missionsCompleted")}</span><span class="settings-control">${completedMissionIds.length} / ${PLANNED_TOTAL_MISSIONS}</span></div>
            <div class="settings-row"><span>${t("currentMissionSetting")}</span><span class="settings-control">${String(currentMissionIndex + 1).padStart(2, "0")}</span></div>
          </div>
          <div class="settings-slot" data-settings-slot="b">
            <div class="settings-row"><span>${t("stars")}</span><span class="settings-control">${totalStars} / ${PLANNED_TOTAL_MISSIONS * 3}</span></div>
          </div>
          <div class="settings-slot" data-settings-slot="c">
            <div class="settings-row"><span>${t("achievements")}</span><span class="settings-control">${countUnlockedAchievements()}</span></div>
          </div>
          <div class="settings-slot settings-slot--halves" data-settings-slot="d">
            <div class="settings-row"><span>${t("streak")}</span><span class="settings-control">${currentStreak}</span></div>
            <div class="settings-row"><span>${t("bestStreak")}</span><span class="settings-control">${bestStreak}</span></div>
          </div>
          <div class="settings-slot" data-settings-slot="e">
            <div class="settings-row settings-action-row">
              <span>${t("localProgress")}</span>
              <button id="resetProgressButton" class="settings-inline-button mompy-button mompy-button--danger" type="button">${t("resetProgress")}</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  if (section.id === "account") {
    return `
      <section class="settings-active-section settings-active-section--account" aria-label="${t(section.id)}">
        <div class="settings-section-rows">
          <div class="settings-slot" data-settings-slot="a">
            <div class="settings-row"><span>${t("currentUser")}</span><span class="settings-control">${escapeHtml(currentUser.name)}</span></div>
          </div>
          <div class="settings-slot" data-settings-slot="e">
            <div class="settings-row settings-action-row">
              <span>${t("session")}</span>
              <button id="logoutUserButton" class="settings-inline-button mompy-button mompy-button--danger" type="button">${t("logOut")}</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  if (section.id === "updates") {
    return `
      <section class="settings-active-section settings-active-section--updates" aria-label="${t(section.id)}">
        <div class="settings-section-rows">
          <div class="settings-slot" data-settings-slot="a">
            <div class="settings-row"><span>${t("installedVersion")}</span><span class="settings-control">v${escapeHtml(appVersion)}</span></div>
          </div>
          <div class="settings-slot" data-settings-slot="b">
            <div class="settings-row"><span>${t("updateStatus")}</span><span id="updateStatusText" class="settings-control settings-update-status">${escapeHtml(updateStatusText())}</span></div>
          </div>
          <div class="settings-slot" data-settings-slot="e">
            <div class="settings-row settings-action-row">
              <span></span>
              <button id="checkUpdatesButton" class="settings-inline-button mompy-button mompy-button--secondary" type="button">${updateStatusCache?.update_available ? t("openRelease") : t("checkUpdates")}</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="settings-active-section settings-active-section--shortcuts" aria-label="${t(section.id)}">
      <div class="settings-section-rows">
        <div class="settings-slot" data-settings-slot="a">
          <div class="settings-row"><code>Ctrl + Enter</code><span class="settings-control">${t("runShortcut")}</span></div>
        </div>
        <div class="settings-slot" data-settings-slot="b">
          <div class="settings-row"><code>F1</code><span class="settings-control">${t("help")}</span></div>
        </div>
        <div class="settings-slot" data-settings-slot="c">
          <div class="settings-row"><code>Esc</code><span class="settings-control">${t("closeShortcut")}</span></div>
        </div>
        <div class="settings-slot settings-slot--halves" data-settings-slot="d">
          <div class="settings-row"><code>Tab</code><span class="settings-control">${t("indentShortcut")}</span></div>
          <div class="settings-row"><code>Enter</code><span class="settings-control">${t("newLineShortcut")}</span></div>
        </div>
        <div class="settings-slot" data-settings-slot="e">
          <div class="settings-row"><code>Scroll / Drag</code><span class="settings-control">${t("viewMoreShortcut")}</span></div>
        </div>
      </div>
    </section>
  `;
}

function renderSettingsBody({ animate = true } = {}) {
  const animateOpening = animate && !shouldReduceMotion();
  const navigation = SETTINGS_SECTIONS.map((section) => {
    const active = section.id === activeSettingsSection;
    return `
      <button
        class="settings-nav-button mompy-button mompy-button--nav${active ? " is-active" : ""}"
        type="button"
        role="tab"
        aria-selected="${active}"
        aria-controls="settingsSectionContent"
        data-settings-section="${section.id}"
      >
        <span class="settings-nav-label">${t(section.id)}</span>
      </button>
    `;
  }).join("");

  return `
    <div class="settings-machine ${animateOpening ? "is-opening" : "is-static"}" data-settings-machine>
      <img class="settings-machine-background" src="${ASSETS.settingsPanel}" alt="" draggable="false" aria-hidden="true" />

      <div class="settings-gear-stage" aria-hidden="true">
        <img class="settings-gear settings-gear--large" src="${ASSETS.settingsGearLarge}" alt="" draggable="false" />
        <img class="settings-gear settings-gear--medium" src="${ASSETS.settingsGearMedium}" alt="" draggable="false" />
        <img class="settings-gear settings-gear--small" src="${ASSETS.settingsGearSmall}" alt="" draggable="false" />
      </div>

      <div class="settings-interface-layer"${animateOpening ? " inert" : ""}>
        <header class="settings-machine-header">
          <img class="settings-machine-header-icon" src="${ASSETS.settings}" alt="" draggable="false" aria-hidden="true" />
          <div class="settings-machine-heading">
            <p class="settings-machine-title">${t("settings")}</p>
            <p class="settings-machine-subtitle">${t("settingsControlPanel")}</p>
          </div>
        </header>

        <nav class="settings-machine-navigation" role="tablist" aria-label="${t("settings")}">
          ${navigation}
        </nav>

        <main id="settingsSectionContent" class="settings-machine-content" role="tabpanel" aria-live="polite">
          ${renderSettingsSection(activeSettingsSection)}
        </main>

        <div class="settings-system-status" aria-label="${t("systemOnline")}">
          <span aria-hidden="true"></span>
          <strong>${t("systemOnline")}</strong>
        </div>

        <button class="settings-machine-exit" type="button" data-settings-exit>${t("exit")}</button>
      </div>
    </div>
  `;
}

function updateSettingView(settingName) {
  const valueElement = modalBody.querySelector(`[data-setting-value="${settingName}"]`);
  const meter = modalBody.querySelector(`[data-setting-meter="${settingName}"]`);

  if (!valueElement || !meter) {
    return;
  }

  const value = settingsState[settingName];
  valueElement.textContent = `${value}%`;
  meter.style.setProperty("--value", `${value}%`);
}

function renderActiveSettingsSection({ focus = false } = {}) {
  const content = modalBody.querySelector("#settingsSectionContent");

  if (!content) {
    return;
  }

  content.innerHTML = renderSettingsSection(activeSettingsSection);
  modalBody.querySelectorAll("[data-settings-section]").forEach((button) => {
    const active = button.dataset.settingsSection === activeSettingsSection;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  bindActiveSettingsControls();

  if (focus) {
    modalBody.querySelector(`[data-settings-section="${activeSettingsSection}"]`)?.focus({ preventScroll: true });
  }
}

function bindActiveSettingsControls() {
  modalBody.querySelectorAll("[data-language-option]").forEach((button) => {
    button.addEventListener("click", async () => {
      await savePreferredLanguage(button.dataset.languageOption);
      modalTitle.textContent = t("settings");
      modalBody.innerHTML = renderSettingsBody({ animate: false });
      bindSettingsControls();
      modalBody.querySelector(`[data-settings-section="${activeSettingsSection}"]`)?.focus({ preventScroll: true });
    });
  });

  modalBody.querySelectorAll("[data-setting-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const settingName = button.dataset.settingToggle;

      if (settingName === "ambientMusic") {
        audioManager.setMusicEnabled(!settingsState.ambientMusic);
      } else if (settingName === "soundEffects") {
        audioManager.setSfxEnabled(!settingsState.soundEffects);
      } else if (settingName === "mompyAnimations") {
        setMompyAnimationsEnabled(!settingsState.mompyAnimations);
      } else {
        settingsState[settingName] = !settingsState[settingName];
      }

      button.textContent = toggleLabel(settingsState[settingName]);
      button.setAttribute("aria-pressed", String(settingsState[settingName]));
    });
  });

  modalBody.querySelectorAll("[data-setting-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const settingName = button.dataset.settingStep;
      const delta = Number(button.dataset.delta);
      const nextValue = Math.min(100, Math.max(0, settingsState[settingName] + delta));

      if (settingName === "musicVolume") {
        audioManager.setMusicVolume(nextValue / 100);
      } else if (settingName === "effectsVolume") {
        audioManager.setSfxVolume(nextValue / 100);
      } else if (settingName === "crtBrightness") {
        applyCrtBrightness(nextValue);
      } else {
        settingsState[settingName] = nextValue;
      }

      updateSettingView(settingName);
    });
  });

  modalBody.querySelector("#logoutUserButton")?.addEventListener("click", confirmLogoutUser);
  modalBody.querySelector("#resetProgressButton")?.addEventListener("click", confirmResetProgress);
  modalBody.querySelector("#checkUpdatesButton")?.addEventListener("click", checkUpdatesFromSettings);
}

function bindSettingsControls() {
  modalBody.querySelectorAll("[data-settings-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSettingsSection = settingsSectionMeta(button.dataset.settingsSection).id;
      renderActiveSettingsSection();
    });
  });

  modalBody.querySelector("[data-settings-exit]")?.addEventListener("click", () => {
    closeModal();
    restoreAfterModal();
  });

  bindActiveSettingsControls();
}

async function checkUpdatesFromSettings() {
  const button = modalBody.querySelector("#checkUpdatesButton");
  const statusText = modalBody.querySelector("#updateStatusText");

  if (updateStatusCache?.update_available && updateStatusCache.release_url) {
    window.open(updateStatusCache.release_url, "_blank", "noopener");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = t("checking");
  }

  if (statusText) {
    statusText.textContent = t("queryingReleases");
  }

  updateStatusCache = await callPythonBackend("get_update_status");

  if (statusText) {
    statusText.textContent = updateStatusText();
  }

  if (button) {
    button.disabled = false;
    button.textContent = updateStatusCache?.update_available ? t("openRelease") : t("checkUpdates");
  }
}

function showSettings() {
  finishMissionIntro();

  if (trainingStarted && !missionCompleted) {
    setMompyState("idle");
  }

  showMompyPanelState(ASSETS.settings);

  const animateOpening = !shouldReduceMotion();

  openModal({
    title: t("settings"),
    body: renderSettingsBody({ animate: animateOpening }),
    variant: "settings",
  });
  bindSettingsControls();

  if (!animateOpening) {
    audioManager.playSettingsPanelLock();
    modalBody.querySelector(`[data-settings-section="${activeSettingsSection}"]`)?.focus({ preventScroll: true });
  }
}

const ACHIEVEMENT_TRACKING_KEY = "mompy_tracked_achievement_v1";
const ACHIEVEMENT_CATEGORIES = Object.freeze([
  { id: "consistency", titleKey: "achievementCategoryConsistency" },
  { id: "python", titleKey: "achievementCategoryPython" },
  { id: "missions", titleKey: "achievementCategoryMissions" },
  { id: "secrets", titleKey: "achievementCategorySecrets" },
]);

function missionNumberFromId(missionId) {
  const match = String(missionId || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function completedMissionsInRange(start, end) {
  return completedMissionIds.filter((missionId) => {
    const missionNumber = missionNumberFromId(missionId);
    return missionNumber >= start && missionNumber <= end;
  }).length;
}

function completedPerfectBlocks() {
  return blockProgress.filter((block) => {
    const stars = Number(block?.stars ?? block?.total_stars ?? block?.totalStars) || 0;
    const maxStars = Number(block?.max_stars ?? block?.maxStars) || 15;
    return maxStars > 0 && stars >= maxStars;
  }).length;
}

function getAchievementProgress(achievement) {
  const stored = achievementProgress[achievement.id];
  const live = buildConsistencyProgress(activeDates)[achievement.id];
  const target = Number(stored?.target ?? achievement.target ?? 1);
  const metric = stored?.metric || achievement.metric || "active_days";
  const localCurrent = metric === "completed_missions"
    ? completedMissionIds.length
    : metric === "mission_range"
      ? completedMissionsInRange(achievement.missionStart, achievement.missionEnd)
      : metric === "total_stars"
        ? totalStars
        : metric === "perfect_blocks"
          ? completedPerfectBlocks()
          : 0;
  const current = Math.min(
    Math.max(Number(stored?.current) || 0, Number(live?.current) || 0, localCurrent),
    target,
  );
  return {
    current,
    target,
    metric,
    percent: target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0,
  };
}

function achievementProgressText(progress) {
  const key = progress.metric === "completed_missions" || progress.metric === "mission_range"
    ? "achievementProgressMissions"
    : progress.metric === "total_stars"
      ? "achievementProgressStars"
      : progress.metric === "perfect_blocks"
        ? "achievementProgressPerfectBlocks"
    : progress.metric === "recovered_missions"
      ? "achievementProgressRecoveries"
      : progress.metric === "perfect_first_try_missions"
        ? "achievementProgressPerfectMissions"
    : progress.metric === "active_months"
    ? "achievementProgressMonths"
    : progress.metric === "activity_streak"
      ? "achievementProgressStreak"
      : "achievementProgressDays";
  return t(key, progress);
}

function isAchievementUnlocked(achievement) {
  if (!achievement) {
    return false;
  }
  const progress = getAchievementProgress(achievement);
  return earnedAchievements.includes(achievement.id)
    || (progress.target > 0 && progress.current >= progress.target);
}

function countUnlockedAchievements() {
  return ACHIEVEMENT_DEFINITIONS.filter((achievement) => isAchievementUnlocked(achievement)).length;
}

function achievementVisual(achievement, className = "") {
  if (Array.isArray(achievement.frames) && achievement.frames.length) {
    const frames = achievement.frames.map((source, index) => `<img class="achievement-art python-console-frame python-console-frame-${index + 1}" src="${source}" alt="" draggable="false" />`).join("");
    return `<span class="achievement-art-shell is-animated-achievement ${className}" aria-hidden="true">${frames}</span>`;
  }
  if (achievement.image) {
    return `<span class="achievement-art-shell ${className}" aria-hidden="true"><img class="achievement-art" src="${achievement.image}" alt="" draggable="false" /></span>`;
  }
  return `<span class="achievement-medal ${className}" aria-hidden="true"><span class="achievement-glyph">${achievement.glyph}</span><small>${achievement.mark}</small></span>`;
}

function renderAchievementCard(achievement, selectedId) {
  const isUnlocked = isAchievementUnlocked(achievement);
  const progress = getAchievementProgress(achievement);
  return `
    <button type="button" class="${["achievement-badge", "has-art", achievement.id === selectedId ? "is-selected" : "", isUnlocked ? "is-unlocked" : "is-locked", `rarity-${achievement.rarity}`].filter(Boolean).join(" ")}" data-achievement-id="${achievement.id}" aria-pressed="${achievement.id === selectedId}" aria-label="${t(achievement.titleKey)}. ${t(isUnlocked ? "achievementUnlockedStatus" : "achievementLockedStatus")}. ${t(achievement.rarityKey)}.">
      <span class="achievement-card-rarity">${t(achievement.rarityKey)}</span>
      <span class="achievement-card-art-wrapper">
        ${achievementVisual(achievement)}
      </span>
      <span class="achievement-card-title">${t(achievement.titleKey)}</span>
      <span class="achievement-card-progress">
        <span class="achievement-card-track" aria-hidden="true"><span style="--achievement-card-progress: ${progress.percent}%"></span></span>
        <strong>${progress.current} / ${progress.target}</strong>
      </span>
    </button>
  `;
}

function renderAchievementDetailsPanel(achievement) {
  if (!achievement) {
    return `<p class="achievement-category-empty">${t("achievementPlannedCategory")}</p>`;
  }

  const isUnlocked = isAchievementUnlocked(achievement);
  const progress = getAchievementProgress(achievement);
  const isTracked = localStorage.getItem(ACHIEVEMENT_TRACKING_KEY) === achievement.id;
  return `
    <div class="${["achievement-detail", isUnlocked ? "is-unlocked" : "is-locked", `rarity-${achievement.rarity}`].join(" ")}">
      <h3>${t("achievementDetailsTitle")}</h3>
      <div class="achievement-detail-art-wrapper">
        ${achievementVisual(achievement, "achievement-detail-art")}
      </div>
      <h4>${t(achievement.titleKey)}</h4>
      <span class="achievement-detail-rarity">${t(achievement.rarityKey)}</span>
      <section>
        <strong>${t("achievementRequirement")}</strong>
        <p>${t(achievement.descriptionKey)}</p>
      </section>
      <section>
        <strong>${t("achievementProgressLabel")}</strong>
        <p class="achievement-detail-progress-value">${achievementProgressText(progress)}</p>
        <span class="achievement-detail-progress" aria-hidden="true"><span style="--achievement-detail-progress: ${progress.percent}%"></span></span>
      </section>
      <section>
        <strong>${t("achievementDescriptionLabel")}</strong>
        <p>${t(achievement.category === "python"
          ? "achievementPythonEncouragement"
          : achievement.category === "missions"
            ? "achievementMissionEncouragement"
            : "achievementEncouragement")}</p>
      </section>
      <button class="achievement-track-button mompy-button mompy-button--secondary ${isTracked ? "is-tracked" : ""}" type="button" data-track-achievement="${achievement.id}">
        ${t(isTracked ? "achievementTracking" : "achievementTrack")} <span aria-hidden="true">›</span>
      </button>
    </div>
  `;
}

function renderAchievementCategory(categoryId, selectedId) {
  const achievements = ACHIEVEMENTS_BY_CATEGORY[categoryId] || [];
  if (!achievements.length) {
    return `<div class="achievement-category-empty"><strong>${t("achievementPlannedCategory")}</strong></div>`;
  }
  return achievements.map((achievement) => renderAchievementCard(achievement, selectedId)).join("");
}

function renderAchievementsBody() {
  const unlockedAchievements = ACHIEVEMENT_DEFINITIONS.filter((achievement) => isAchievementUnlocked(achievement));
  const trackedId = localStorage.getItem(ACHIEVEMENT_TRACKING_KEY);
  const selected = CONSISTENCY_ACHIEVEMENTS.find(({ id }) => id === trackedId)
    || CONSISTENCY_ACHIEVEMENTS[0];
  const score = totalXp + (totalStars * 10);
  const categoryTabs = ACHIEVEMENT_CATEGORIES.map((category, index) => `
    <button type="button" class="achievement-category-tab mompy-button mompy-button--tab ${index === 0 ? "is-active" : ""}" data-achievement-category="${category.id}" aria-pressed="${index === 0}">${t(category.titleKey)}</button>
  `).join("");

  return `
    <div class="achievement-machine">
      <div class="achievements-content" inert>
        <div class="achievements-board">
          <header class="achievements-header">
            <img src="${ASSETS.achievements}" alt="" aria-hidden="true" draggable="false" />
            <div>
              <h2>${t("achievements")}</h2>
              <strong>${String(unlockedAchievements.length).padStart(2, "0")} / ${PLANNED_ACHIEVEMENT_TOTAL}</strong>
              <span>${t("achievementTotalScore", { score })}</span>
            </div>
          </header>
          <nav class="achievement-category-tabs" aria-label="${t("achievements")}">${categoryTabs}</nav>
          <div class="achievement-grid" data-achievement-list tabindex="0" aria-label="${t("achievements")}">${renderAchievementCategory("consistency", selected.id)}</div>
          <aside class="achievement-details-panel" data-achievement-details tabindex="0" aria-label="${t("achievementDetailsTitle")}">${renderAchievementDetailsPanel(selected)}</aside>
        </div>
      </div>
      <div class="achievement-glass" aria-hidden="true">
        <div class="achievement-glass-panel">
          <img src="${ACHIEVEMENT_GLASS_ASSET}" alt="" draggable="false" />
        </div>
      </div>
      <div class="achievement-metal-rail" aria-hidden="true">
        <img src="${ACHIEVEMENT_METAL_RAIL_ASSET}" alt="" draggable="false" />
      </div>
    </div>
  `;
}

function bindAchievementDetailTracking() {
  modalBody.querySelector("[data-track-achievement]")?.addEventListener("click", (event) => {
    const achievementId = event.currentTarget.dataset.trackAchievement;
    localStorage.setItem(ACHIEVEMENT_TRACKING_KEY, achievementId);
    const details = modalBody.querySelector("[data-achievement-details]");
    if (details) {
      details.innerHTML = renderAchievementDetailsPanel(getAchievementDefinition(achievementId));
      bindAchievementDetailTracking();
    }
  });
}

function showAchievementDetails(achievementId) {
  const achievement = getAchievementDefinition(achievementId);
  const details = modalBody.querySelector("[data-achievement-details]");
  if (!achievement || !details) {
    return;
  }

  modalBody.querySelectorAll("[data-achievement-id]").forEach((card) => {
    const isSelected = card.dataset.achievementId === achievementId;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
  });
  details.innerHTML = renderAchievementDetailsPanel(achievement);
  bindAchievementDetailTracking();
}

function bindPointerDragScroll(element) {
  if (!element || element.dataset.dragScrollBound === "true") {
    return;
  }

  element.dataset.dragScrollBound = "true";
  let pointerId = null;
  let startY = 0;
  let startScrollTop = 0;
  let dragging = false;
  let suppressClick = false;
  const dragThreshold = 7;

  const finishDrag = (event) => {
    if (pointerId === null || (event?.pointerId != null && event.pointerId !== pointerId)) {
      return;
    }

    if (dragging) {
      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    }

    if (element.hasPointerCapture?.(pointerId)) {
      element.releasePointerCapture(pointerId);
    }
    element.classList.remove("is-drag-scrolling");
    pointerId = null;
    dragging = false;
  };

  element.addEventListener("pointerdown", (event) => {
    if (
      event.pointerType === "touch"
      || event.button !== 0
      || !event.isPrimary
      || element.scrollHeight <= element.clientHeight
    ) {
      return;
    }

    pointerId = event.pointerId;
    startY = event.clientY;
    startScrollTop = element.scrollTop;
    dragging = false;
    suppressClick = false;
  });

  element.addEventListener("pointermove", (event) => {
    if (pointerId === null || event.pointerId !== pointerId) {
      return;
    }

    const deltaY = event.clientY - startY;
    if (!dragging && Math.abs(deltaY) < dragThreshold) {
      return;
    }

    if (!dragging) {
      dragging = true;
      element.classList.add("is-drag-scrolling");
      element.setPointerCapture?.(pointerId);
    }

    event.preventDefault();
    element.scrollTop = startScrollTop - deltaY;
  });

  element.addEventListener("pointerup", finishDrag);
  element.addEventListener("pointercancel", finishDrag);
  element.addEventListener("lostpointercapture", finishDrag);
  element.addEventListener("click", (event) => {
    if (!suppressClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);
}

function bindAchievementControls() {
  const list = modalBody.querySelector("[data-achievement-list]");
  const details = modalBody.querySelector("[data-achievement-details]");
  bindPointerDragScroll(list);
  bindPointerDragScroll(details);
  const bindCards = () => {
    modalBody.querySelectorAll("[data-achievement-id]").forEach((card) => {
      card.addEventListener("click", () => showAchievementDetails(card.dataset.achievementId));
    });
  };

  modalBody.querySelectorAll("[data-achievement-category]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const categoryId = tab.dataset.achievementCategory;
      modalBody.querySelectorAll("[data-achievement-category]").forEach((button) => {
        const isActive = button === tab;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      const categoryAchievements = ACHIEVEMENTS_BY_CATEGORY[categoryId] || [];
      if (categoryAchievements.length) {
        const selected = categoryAchievements[0];
        list.innerHTML = renderAchievementCategory(categoryId, selected.id);
        details.innerHTML = renderAchievementDetailsPanel(selected);
        bindCards();
        bindAchievementDetailTracking();
      } else {
        list.innerHTML = renderAchievementCategory(categoryId, null);
        details.innerHTML = `<p class="achievement-category-empty">${t("achievementPlannedCategory")}</p>`;
      }
    });
  });

  bindCards();
  bindAchievementDetailTracking();
}

function showAchievements() {
  finishMissionIntro();

  if (trainingStarted && !missionCompleted) {
    setMompyState("idle");
  }

  showMompyPanelState(ASSETS.achievements);

  openModal({
    title: t("achievements"),
    body: renderAchievementsBody(),
    variant: "achievements",
  });
  bindAchievementControls();
}

function confirmExitApp() {
  openModal({
    title: "Exit app",
    body: "<p>Are you sure you want to exit?</p>",
    actions: [
      {
        label: "Cancel",
        onClick: showSettings,
      },
      {
        label: "Exit",
        primary: true,
        variant: "secondary",
        onClick: () => {
          closeModal();
          exitApp();
        },
      },
    ],
  });
}

function confirmLogoutUser() {
  openModal({
    title: "Log out",
    body: "<p>Do you want to log out of this user?</p>",
    actions: [
      {
        label: "Cancel",
        onClick: showSettings,
      },
      {
        label: "Log out",
        primary: true,
        variant: "danger",
        onClick: () => {
          logoutUser();
          closeModal();
          showStartScreen();
        },
      },
    ],
  });
}

function confirmResetProgress() {
  openModal({
    title: "Reset progress",
    body: "<p>Are you sure you want to reset your mission progress?</p>",
    actions: [
      {
        label: "Cancel",
        onClick: showSettings,
      },
      {
        label: "Reset progress",
        primary: true,
        variant: "danger",
        onClick: () => {
          resetProgress();
          closeModal();

          if (trainingStarted) {
            output.textContent = t("progressReset");
            editor.focus();
          } else {
            showStartScreen();
          }
        },
      },
    ],
  });
}

function logoutUser() {
  resetRewardCapsulePresentation();
  console.log("Logging out current user");
  clearUserProfile();
}

function exitApp() {
  resetRewardCapsulePresentation();
  stopClassroomEnvironmentAudio({ immediate: true });
  audioManager.playShutdown();
  audioManager.stopAmbientMusic();
  clearMompyScreenMessage();
  stopStartScreenMompyAnimation();
  stopMissionTyping();
  stopTalking();
  stopMompyShutdownAnimation();
  clearTimeout(settleTimer);
  clearTimeout(completionTimer);
  completionPending = false;
  setMompyState("idle");
  startMompySprite.src = ASSETS.front;

  if (output) {
    output.textContent = t("exitingApp");
  }

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  window.close();
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    const message = `${t("fullscreenChangeError")}\n${error.message}`;

    if (trainingStarted) {
      output.textContent = message;
      setMompyState("error", { returnToIdle: 2600 });
    } else {
      console.warn(message);
    }
  }
}

function updateFullscreenButton() {
  if (!fullscreenButton) {
    return;
  }

  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenButton.classList.toggle("is-fullscreen", isFullscreen);
  fullscreenButton.setAttribute(
    "aria-label",
    isFullscreen ? "Exit fullscreen" : "Expand window",
  );
}

function unlockAudioOnFirstInteraction() {
  audioManager.unlock();
}

document.addEventListener("pointerdown", unlockAudioOnFirstInteraction, { once: true, capture: true });
document.addEventListener("keydown", unlockAudioOnFirstInteraction, { once: true, capture: true });

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopMompyVoice();
    suspendClassroomEnvironmentAudio();
  } else {
    resumeClassroomEnvironmentAudio();
  }
});

window.addEventListener("pagehide", () => {
  stopMompyVoice();
  stopClassroomEnvironmentAudio({ immediate: true });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || button.id === "runButton" || button.id === "achievementsButton" || button.id === "settingsButton") {
    return;
  }

  audioManager.playClick();
});

modalBody.addEventListener("animationstart", (event) => {
  const variant = modalBackdrop.dataset.modalVariant;

  if (variant === "settings") {
    if (event.animationName === "settings-panel-engage" && event.target.classList.contains("settings-machine-background")) {
      audioManager.playSettingsGearEngage();
      return;
    }

    if (event.animationName === "settings-gears-turn" && event.target.classList.contains("settings-gear-stage")) {
      audioManager.playSettingsGearsTurn();
      return;
    }

    if (event.animationName === "settings-interface-reveal" && event.target.classList.contains("settings-interface-layer")) {
      audioManager.playSettingsPanelLock();
    }
    return;
  }

  if (variant !== "achievements") {
    return;
  }

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    if (event.animationName === "achievement-content-reveal" && event.target.classList.contains("achievements-content")) {
      audioManager.playAchievementReveal();
    }
    return;
  }

  if (event.animationName === "achievement-rail-arrive" && event.target.classList.contains("achievement-metal-rail")) {
    audioManager.playAchievementRail();
    return;
  }

  if (event.animationName === "achievement-glass-descend" && event.target.classList.contains("achievement-glass-panel")) {
    audioManager.playAchievementGlass();
    return;
  }

  if (event.animationName === "achievement-content-reveal" && event.target.classList.contains("achievements-content")) {
    audioManager.playAchievementReveal();
  }
});

modalBody.addEventListener("animationend", (event) => {
  const variant = modalBackdrop.dataset.modalVariant;

  if (variant === "settings") {
    if (event.animationName !== "settings-interface-reveal" || !event.target.classList.contains("settings-interface-layer")) {
      return;
    }

    event.target.inert = false;
    modalBody.querySelector(`[data-settings-section="${activeSettingsSection}"]`)?.focus({ preventScroll: true });
    return;
  }

  if (variant !== "achievements") {
    return;
  }

  const animatedPiece = event.target.closest?.(
    ".achievement-metal-rail, .achievement-glass-panel, .achievements-content",
  );

  if (animatedPiece === event.target) {
    animatedPiece.style.willChange = "auto";
  }

  if (event.animationName !== "achievement-content-reveal" || !event.target.classList.contains("achievements-content")) {
    return;
  }

  event.target.inert = false;
  modalCloseButton.disabled = false;
  modalCloseButton.focus({ preventScroll: true });
});

editor.addEventListener("input", () => {
  updateLineNumbers();
  resumeMompyAfterCodeEdit();
});
editor.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();

    if (!runButton.disabled) {
      runCode();
    }
  }

  if (event.key === "Tab") {
    event.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = `${editor.value.slice(0, start)}    ${editor.value.slice(end)}`;
    editor.selectionStart = editor.selectionEnd = start + 4;
    updateLineNumbers();
    resumeMompyAfterCodeEdit();
  }
});

startButton.addEventListener("click", handleStart);
continueButton.addEventListener("click", handleContinue);
onboardingContinueButton?.addEventListener("click", submitOnboardingName);
onboardingNameInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitOnboardingName();
  }
});
runButton.addEventListener("click", runCode);
backButton.addEventListener("click", showBackConfirmation);
helpButton.addEventListener("click", showHelp);
achievementsButton?.addEventListener("click", showAchievements);
settingsButton.addEventListener("click", showSettings);
fullscreenButton?.addEventListener("click", toggleFullscreen);
sprite?.addEventListener("click", playMompyShutdownAnimation);
modalCloseButton.addEventListener("click", () => {
  closeModal();
  restoreAfterModal();
});
repeatMissionButton.addEventListener("click", repeatMission);
nextMissionButton.addEventListener("click", goToNextMission);
document.addEventListener("fullscreenchange", updateFullscreenButton);

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
    restoreAfterModal();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (modalBackdrop.hidden) {
    return;
  }

  const modal = modalBackdrop.querySelector(".modal");
  if (!(event.target instanceof Node) || modal?.contains(event.target)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  closeModal();
  restoreAfterModal();
}, true);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalBackdrop.hidden) {
    event.preventDefault();
    closeModal();
    restoreAfterModal();
  }

  if (event.key === "F1" && trainingStarted && !helpButton.disabled) {
    event.preventDefault();
    showHelp();
  }
});

audioManager.init();
initializeClassroomAuxCrt();
loadUserProfile();
loadInterfaceSettings();
loadProgress();
recordLocalAppOpen();
loadBriefingProgress();
renderMission(currentMission());
editor.value = currentMission().starterCode || editor.value;
updateLineNumbers();
updateFullscreenButton();
preloadRewardCapsuleFrames().catch((error) => {
  console.warn("Reward capsule frames could not be preloaded.", error);
});
startLoadingSequence();

const isLocalPreview = ["localhost", "127.0.0.1"].includes(location.hostname);

runLocalRewardCapsuleTestFromQuery();

if ("serviceWorker" in navigator && isLocalPreview) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) =>
      registrations.forEach((registration) => registration.unregister()),
    )
    .catch(() => {});
}

if ("serviceWorker" in navigator && location.protocol !== "file:" && !isLocalPreview) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
