const ASSETS = {
  idle: "./assets/mompy_idle.png",
  talk1: "./assets/mompy_talk_1.png",
  talk2: "./assets/mompy_talk_2.png",
  success: "./assets/mompy_happy.png",
  error: "./assets/mompy_sad.png",
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
  ambientLoop: "./assets/audio/mompy_crt_ambient_loop_minimal.wav",
};

const USER_PROFILE_KEY = "mompy_user_profile_v1";
const PROGRESS_KEY = "mompy_progress_v1";
const BRIEFING_PROGRESS_KEY = "mompy_briefing_progress_v1";
const DEFAULT_USER_NAME = "Guest";
const PLANNED_TOTAL_MISSIONS = 30;
const FALLBACK_APP_VERSION = "0.1.2";

const defaultProgressState = {
  currentMissionIndex: 0,
  completedMissionIds: [],
  totalXp: 0,
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
  ambientMusic: true,
  musicVolume: 10,
  soundEffects: true,
  effectsVolume: 45,
  crtBrightness: 70,
  mompyAnimations: true,
};

let pythonBackendConnected = false;
let pythonBackendSyncPromise = null;
let appVersion = FALLBACK_APP_VERSION;
let updateStatusCache = null;

const PYTHON_HTTP_ROUTES = {
  get_bootstrap_state: { method: "GET", path: "/api/bootstrap" },
  get_progress: { method: "GET", path: "/api/progress" },
  validate_mission: { method: "POST", path: "/api/validate", body: ([missionId, userCode]) => ({ mission_id: missionId, user_code: userCode }) },
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

  updateProgressUI();
  saveLocalProgress({
    currentMissionIndex,
    completedMissionIds: [...completedMissionIds],
    totalXp,
    lastUpdatedAt: progress.last_updated_at || progress.lastUpdatedAt || new Date().toISOString(),
  });
}

function applyPythonProfile(profile) {
  if (!profile || typeof profile !== "object" || !profile.name) {
    return null;
  }

  const firstName = normalizeName(profile.name);

  if (!firstName || firstName === DEFAULT_USER_NAME) {
    localStorage.removeItem(USER_PROFILE_KEY);
    applyUserProfile(null);
    renderStartUserInfo();
    return null;
  }

  const frontendProfile = {
    firstName,
    language: profile.language || "en-US",
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

async function syncPythonBackendState() {
  const state = await callPythonBackend("get_bootstrap_state");

  if (!state) {
    return false;
  }

  applyPythonMissions(state.missions);
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
];

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
let completedBriefingIds = [];
let skippedBriefingIds = [];

const loadingScreen = document.querySelector("#loadingScreen");
const loadingBranding = document.querySelector("#loadingBranding");
const loadingProgress = document.querySelector("#loadingProgress");
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
const settingsButton = document.querySelector("#settingsButton");
const fullscreenButton = document.querySelector("#fullscreenButton");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const modalActions = document.querySelector("#modalActions");
const modalCloseButton = document.querySelector("#modalCloseButton");
const mompyScreenMessage = document.querySelector("#mompyScreenMessage");
const repeatMissionButton = document.querySelector("#repeatMissionButton");
const nextMissionButton = document.querySelector("#nextMissionButton");

let talkTimer = null;
let settleTimer = null;
let talkFrame = false;
let lastFocusedElement = null;
let typingTimer = null;
let typingToken = 0;
let trainingStarted = false;
let missionCompleted = false;
let completionTimer = null;
let completionPending = false;
let startScreenAnimationActive = false;
let startMompyTerminalTimer = null;
let startMompyTypingTimer = null;
let startMompyTerminalToken = 0;
let startTerminalExampleIndex = 0;
let loadingInterval = null;
let loadingDoneTimer = null;
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
    this.saveSettings();
  },

  setMusicEnabled(value) {
    this.musicEnabled = Boolean(value);
    settingsState.ambientMusic = this.musicEnabled;
    this.saveSettings();

    if (this.musicEnabled) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
  },

  setSfxVolume(value) {
    this.sfxVolume = clampAudioVolume(value, this.sfxVolume);
    settingsState.effectsVolume = Math.round(this.sfxVolume * 100);
    this.saveSettings();
  },

  setMusicVolume(value) {
    this.musicVolume = clampAudioVolume(value, this.musicVolume);
    settingsState.musicVolume = Math.round(this.musicVolume * 100);

    if (this.music && !this.music.paused) {
      this.music.volume = Math.min(this.music.volume, this.musicVolume);
    }

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

function showLoadingScreen() {
  if (!loadingScreen) {
    return;
  }

  clearInterval(loadingInterval);
  clearTimeout(loadingDoneTimer);
  loadingScreen.hidden = false;
  loadingScreen.classList.remove("is-branding", "is-branding-out", "is-loading");

  if (loadingProgress) {
    loadingProgress.style.width = "0%";
  }
}

function hideLoadingScreen() {
  clearInterval(loadingInterval);
  clearTimeout(loadingDoneTimer);
  loadingInterval = null;
  loadingDoneTimer = null;

  if (loadingScreen) {
    loadingScreen.hidden = true;
    loadingScreen.classList.remove("is-branding", "is-branding-out", "is-loading");
  }
}

function clearHepteraktBootTimers() {
  hepteraktBootTimers.forEach((timer) => clearTimeout(timer));
  hepteraktBootTimers = [];
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
  stopStartScreenMompyAnimation();

  loadingInterval = setInterval(() => {
    value += Math.floor(Math.random() * 7) + 4;
    value = Math.min(value, 100);
    loadingProgress.style.width = `${value}%`;

    if (value >= 100) {
      clearInterval(loadingInterval);
      loadingInterval = null;

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

  showHepteraktBoot(continueAfterHepteraktBoot);
}

function currentMission() {
  return missions[currentMissionIndex];
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
      backendLevelInfo = null;
      updateProgressUI();
      return { ...defaultProgressState };
    }

    const progress = JSON.parse(rawProgress);
    currentMissionIndex = clampMissionIndex(progress.currentMissionIndex);
    completedMissionIds = sanitizeCompletedMissionIds(progress.completedMissionIds);
    totalXp = Number(progress.totalXp) || 0;
    backendLevelInfo = null;
    updateProgressUI();
    return {
      currentMissionIndex,
      completedMissionIds: [...completedMissionIds],
      totalXp,
      lastUpdatedAt: progress.lastUpdatedAt || null,
    };
  } catch (error) {
    console.warn(error);
    currentMissionIndex = defaultProgressState.currentMissionIndex;
    completedMissionIds = [...defaultProgressState.completedMissionIds];
    totalXp = defaultProgressState.totalXp;
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
  const progress = {
    currentMissionIndex,
    completedMissionIds: [...completedMissionIds],
    totalXp,
    lastUpdatedAt: new Date().toISOString(),
  };

  saveLocalProgress(progress);

  if (pythonBackendConnected) {
    syncCurrentMissionToPython();
  }

  updateProgressUI();
  return progress;
}

async function resetProgress(options = {}) {
  currentMissionIndex = 0;
  completedMissionIds = [];
  totalXp = 0;
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
      outputMessage: "Progress reset. Mission 01 loaded.",
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

function getBriefingForMission(missionIndex) {
  return learningBriefings.find((briefing) => briefing.beforeMissionIndex === missionIndex) || null;
}

function shouldShowBriefingBeforeMission(missionIndex) {
  const briefing = getBriefingForMission(missionIndex);

  if (!briefing) {
    return false;
  }

  return !completedBriefingIds.includes(briefing.id) && !skippedBriefingIds.includes(briefing.id);
}

function findBriefingById(briefingId) {
  return learningBriefings.find((briefing) => briefing.id === briefingId) || null;
}

function renderMompyScreenPanel({ title, lines = [], actions = [], variant = "" }) {
  stopTalking();
  clearTimeout(settleTimer);
  machine.classList.remove("is-success", "is-error");
  sprite.src = ASSETS.blank;

  mompyScreenMessage.hidden = false;
  mompyScreenMessage.className = "mompy-screen-message is-briefing";

  if (variant) {
    mompyScreenMessage.classList.add(`is-${variant}`);
  }

  const text = document.createElement("div");
  text.className = "mompy-screen-text";

  if (title) {
    const heading = document.createElement("p");
    heading.className = "mompy-screen-heading";
    heading.textContent = title;
    text.append(heading);
  }

  lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    text.append(paragraph);
  });

  const actionShell = document.createElement("div");
  actionShell.className = "mompy-screen-actions";

  if (actions.length > 2) {
    actionShell.classList.add("is-stacked");
  }

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;

    if (action.primary) {
      button.classList.add("is-primary");
    }

    button.addEventListener("click", () => {
      audioManager.playClick();
      action.onClick();
    });

    actionShell.append(button);
  });

  mompyScreenMessage.replaceChildren(text, actionShell);
}

function renderMompyCompletionPrompt() {
  mompyScreenMessage.className = "mompy-screen-message";

  const text = document.createElement("div");
  text.className = "mompy-screen-text";

  ["Mission complete.", "Continue?"].forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    text.append(paragraph);
  });

  const actionShell = document.createElement("div");
  actionShell.className = "mompy-screen-actions";

  const repeatButton = document.createElement("button");
  repeatButton.type = "button";
  repeatButton.textContent = "Retry";
  repeatButton.addEventListener("click", repeatMission);

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.textContent = "Next mission";
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
  clearTimeout(briefingFinalTimer);
  stopMissionTyping();
  clearMompyScreenMessage();
  setMissionActionsEnabled(false);
  setMompyState("briefing");
  editor.value = "";
  updateLineNumbers();
  output.textContent = "Mompy: Lesson ready.";
  renderBriefingIntro(briefing);
}

function renderBriefingIntro(briefing) {
  renderMompyScreenPanel({
    title: "Mompy",
    lines: [
      briefing.subtitle,
    ],
    actions: [
      {
        label: "Learn",
        primary: true,
        onClick: () => {
          activeBriefingStepIndex = 0;
          activeBriefingRetry = false;
          renderBriefingStep(briefing, 0);
        },
      },
      {
        label: "Skip",
        onClick: () => skipBriefing(briefing.id),
      },
    ],
  });
}

function renderBriefingStep(briefing, stepIndex) {
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
        label: "Got it",
        primary: true,
        onClick: handleBriefingUnderstood,
      },
      {
        label: "I don't understand",
        onClick: handleBriefingNotUnderstood,
      },
    ],
  });
}

function renderBriefingRetry(briefing, stepIndex) {
  const step = briefing.steps[stepIndex];

  if (!step) {
    completeBriefing(briefing.id);
    return;
  }

  activeBriefingRetry = true;
  setMompyState("briefing");
  renderMompyScreenPanel({
    title: step.title,
    lines: [step.retryText || step.text],
    actions: [
      {
        label: "Got it",
        primary: true,
        onClick: handleBriefingUnderstood,
      },
      {
        label: "I don't understand",
        onClick: handleBriefingNotUnderstood,
      },
    ],
  });
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
    lines: [feedback || "Choose the correct answer."],
    variant: "check",
    actions: step.options.map((option) => ({
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
      title: "Correct answer",
      lines: [step.successText],
      actions: [
        {
          label: "Got it",
          primary: true,
          onClick: () => renderBriefingStep(briefing, stepIndex + 1),
        },
      ],
    });
    return;
  }

  audioManager.playError();
  renderBriefingCheck(briefing, stepIndex, step.failText);
}

function completeBriefing(briefingId) {
  const briefing = findBriefingById(briefingId);

  if (!briefing) {
    renderCurrentMission({ intro: true });
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
  setMompyState("briefing");
  renderMompyScreenPanel({
    title: "Briefing complete",
    lines: [
      "Briefing complete.",
      "Concepts loaded.",
      "Good luck, trainee.",
    ],
    actions: [],
  });

  briefingFinalTimer = setTimeout(() => {
    clearMompyScreenMessage();
    renderCurrentMission({ intro: true });
  }, 1200);
}

function skipBriefing(briefingId) {
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
  if (!trainingStarted || !sprite || mompyShutdownAnimating || talkTimer || completionPending || activeBriefingId) {
    return;
  }

  mompyShutdownAnimating = true;
  clearMompyShutdownTimers();
  playShutdownSound();

  const originalSrc = sprite.getAttribute("src") || ASSETS.idle;
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
      }
    }, delay);

    mompyShutdownTimers.push(timer);
  });
}

function setMompyState(state, options = {}) {
  stopTalking();
  clearTimeout(settleTimer);
  machine.classList.remove("is-success", "is-error");

  if (state === "talking") {
    talkFrame = false;
    sprite.src = ASSETS.talk1;
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
  } else if (state === "error") {
    machine.classList.add("is-error");
    sprite.src = ASSETS.error;
  } else {
    sprite.src = ASSETS.idle;
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
      language: profile.language || "en-US",
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

function clearUserProfile() {
  localStorage.removeItem(USER_PROFILE_KEY);
  applyUserProfile(null);
  renderStartUserInfo();
  callPythonBackend("logout_profile").then(applyPythonProfile);
}

function renderStartUserInfo() {
  startUserName.textContent = currentUser.name;
  startUserLevel.textContent = currentUser.level;
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

function showStartMompyFace() {
  startMompySprite.src = ASSETS.idle;
  startMompyTerminal.hidden = true;
  startMompyTerminal.setAttribute("aria-hidden", "true");
}

function showStartMompyTerminal() {
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
  clearTimeout(startMompyTerminalTimer);
  clearTimeout(startMompyTypingTimer);
  startMompyTerminalTimer = null;
  startMompyTypingTimer = null;
  clearStartMompyTerminal();
  startMompyTerminal.hidden = true;
  startMompyTerminal.setAttribute("aria-hidden", "true");

  if (!options.keepFace) {
    startMompySprite.src = ASSETS.idle;
  }
}

async function showStartScreen() {
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
  stopMompyShutdownAnimation();
  clearTimeout(settleTimer);
  clearMompyScreenMessage();
  machine.classList.remove("training-active", "is-success", "is-error");
  startScreen.hidden = false;
  sprite.src = ASSETS.idle;
  setMissionActionsEnabled(true);
  renderStartUserInfo();
  if (profile) {
    closeOnboarding();
    startStartScreenMompyAnimation();
  } else {
    openOnboarding();
  }
  audioManager.startAmbientMusic();
}

function enterTraining() {
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
  machine.classList.remove("is-success", "is-error");
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
  return `Mompy: ${mission.objective}\nShortcut: Ctrl+Enter also runs.`;
}

function renderCurrentMission(options = {}) {
  const mission = currentMission();
  missionCompleted = false;
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
}

function clearMompyScreenMessage() {
  mompyScreenMessage.hidden = true;
  mompyScreenMessage.className = "mompy-screen-message";
}

function restoreAfterModal() {
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
    setMompyState("idle");
  }
}

function completeMission(result) {
  const mission = currentMission();
  missionCompleted = true;
  completionPending = true;
  const alreadyCompleted = completedMissionIds.includes(mission.id);

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
  clearTimeout(completionTimer);
  setMissionActionsEnabled(false);
  clearMompyScreenMessage();
  output.textContent = `Correct output:\n${result.output}\n\nMission completed.`;
  audioManager.playSuccess();
  setMompyState("success");
  completionTimer = setTimeout(() => {
    if (!missionCompleted) {
      return;
    }

    completionPending = false;
    setMompyState("complete");
    showMissionCompleteOnMompy();
  }, 1500);
}

function failMission(result) {
  output.textContent = [
    `> ${result.output}`,
    "",
    "Not quite this time.",
    "Check the mission's goal and try again.",
    "",
    `Tip: ${result.detail}`,
  ].join("\n");
  audioManager.playError();
  setMompyState("error", { returnToIdle: 3200 });
}

function repeatMission() {
  missionCompleted = false;
  completionPending = false;
  clearTimeout(completionTimer);
  clearMompyScreenMessage();
  setMissionActionsEnabled(true);
  setMompyState("idle");
  editor.value = currentMission().starterCode || "";
  updateLineNumbers();
  output.textContent = "Mission restarted. Try again.";
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
      "All available missions are complete.",
      "New missions will be added soon.",
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
      output: "No code to run.",
      detail: mission.help || "Write the requested code in the editor.",
    };
  }

  const backendValidation = await callPythonBackend("validate_mission", mission.id, code);
  if (backendValidation && typeof backendValidation.correct === "boolean") {
    return {
      ok: Boolean(backendValidation.correct),
      output: backendValidation.actual_output || backendValidation.expected_output || mission.expectedOutput,
      detail: backendValidation.correct
        ? backendValidation.message || "Mission complete."
        : backendValidation.runtime_error || backendValidation.hints?.[0] || backendValidation.message || mission.help,
    };
  }

  const printed = extractPrintOutput(code);
  return {
    ok: false,
    output: printed || "Not quite this time.",
    detail: "Open Mompy through Python to use real mission validation.",
  };
}

async function runCode() {
  if (!trainingStarted || missionCompleted || runButton.disabled) {
    return;
  }

  finishMissionIntro();
  const code = editor.value;
  runButton.disabled = true;
  output.textContent = "Running validation...";
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
    output.textContent = `Falha inesperada:\n${error.message}`;
    audioManager.playError();
    setMompyState("error", { returnToIdle: 3200 });
  } finally {
    if (!missionCompleted) {
      runButton.disabled = false;
    }

    editor.focus();
  }
}

function openModal({ title, body, actions = [] }) {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  modalActions.replaceChildren();

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = action.primary ? "modal-button primary" : "modal-button";
    button.textContent = action.label;
    button.addEventListener("click", action.onClick);
    modalActions.append(button);
  });

  modalBackdrop.hidden = false;
  const firstAction = modalActions.querySelector("button");

  if (firstAction) {
    firstAction.focus();
  } else {
    modalCloseButton.focus();
  }
}

function closeModal() {
  modalBackdrop.hidden = true;
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
    output.textContent = "Mompy: You're already on the first mission.";
    return;
  }

  openModal({
    title: "Go back a mission",
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
  if (helpButton.disabled) {
    return;
  }

  finishMissionIntro();
  setMompyState("talking");
  const mission = currentMission();
  openModal({
    title: "Mission help",
    body: `
      <p>${mission.help}</p>
      <p><strong>Goal:</strong> ${mission.objective}</p>
    `,
    actions: [
      {
        label: "Got it",
        primary: true,
        onClick: () => {
          closeModal();
          setMompyState("idle");
        },
      },
    ],
  });
}

function toggleLabel(value) {
  return value ? "ON" : "OFF";
}

function settingMeter(settingName) {
  const value = settingsState[settingName];
  return `
    <div class="setting-stepper">
      <button class="setting-step" type="button" data-setting-step="${settingName}" data-delta="-10" aria-label="Decrease">-</button>
      <span class="setting-meter" data-setting-meter="${settingName}" style="--value: ${value}%">
        <span data-setting-value="${settingName}">${value}%</span>
      </span>
      <button class="setting-step" type="button" data-setting-step="${settingName}" data-delta="10" aria-label="Increase">+</button>
    </div>
  `;
}

function updateStatusText() {
  if (!updateStatusCache) {
    return "Not checked";
  }

  if (updateStatusCache.error) {
    return "Check unavailable";
  }

  if (updateStatusCache.update_available) {
    return `New version ${updateStatusCache.latest_version}`;
  }

  return "Up to date";
}

function renderSettingsBody() {
  return `
    <div class="settings-grid">
      <section class="settings-section">
        <h3>Shortcuts</h3>
        <div class="settings-row"><span><code>Ctrl + Enter</code></span><span class="settings-control">Run</span></div>
        <div class="settings-row"><span><code>F1</code></span><span class="settings-control">Help</span></div>
        <div class="settings-row"><span><code>Esc</code></span><span class="settings-control">Close</span></div>
      </section>

      <section class="settings-section">
        <h3>Audio</h3>
        <div class="settings-row">
          <span>Ambient music</span>
          <button class="settings-control settings-toggle" type="button" data-setting-toggle="ambientMusic" aria-pressed="${settingsState.ambientMusic}">
            ${toggleLabel(settingsState.ambientMusic)}
          </button>
        </div>
        <div class="settings-row"><span>Music volume</span>${settingMeter("musicVolume")}</div>
        <div class="settings-row">
          <span>Sound effects</span>
          <button class="settings-control settings-toggle" type="button" data-setting-toggle="soundEffects" aria-pressed="${settingsState.soundEffects}">
            ${toggleLabel(settingsState.soundEffects)}
          </button>
        </div>
        <div class="settings-row"><span>Effects volume</span>${settingMeter("effectsVolume")}</div>
      </section>

      <section class="settings-section">
        <h3>Interface</h3>
        <div class="settings-row"><span>CRT brightness</span>${settingMeter("crtBrightness")}</div>
        <div class="settings-row">
          <span>Mompy animations</span>
          <button class="settings-control settings-toggle" type="button" data-setting-toggle="mompyAnimations" aria-pressed="${settingsState.mompyAnimations}">
            ${toggleLabel(settingsState.mompyAnimations)}
          </button>
        </div>
      </section>

      <section class="settings-section">
        <h3>Progress</h3>
        <div class="settings-row">
          <span>Missions completed</span>
          <span class="settings-control">${completedMissionIds.length} / ${PLANNED_TOTAL_MISSIONS}</span>
        </div>
        <div class="settings-row">
          <span>Current mission</span>
          <span class="settings-control">${String(currentMissionIndex + 1).padStart(2, "0")}</span>
        </div>
        <div class="settings-row">
          <span>Local progress</span>
          <button id="resetProgressButton" class="settings-inline-button" type="button">Reset progress</button>
        </div>
      </section>

      <section class="settings-section">
        <h3>Account</h3>
        <div class="settings-row">
          <span>Current user</span>
          <span class="settings-control">${currentUser.name}</span>
        </div>
        <div class="settings-row">
          <span>Session</span>
          <button id="logoutUserButton" class="settings-inline-button" type="button">Log out</button>
        </div>
      </section>

      <section class="settings-section">
        <h3>Updates</h3>
        <div class="settings-row">
          <span>Installed version</span>
          <span class="settings-control">v${appVersion}</span>
        </div>
        <div class="settings-row">
          <span id="updateStatusText">${updateStatusText()}</span>
          <button id="checkUpdatesButton" class="settings-inline-button" type="button">Check for updates</button>
        </div>
      </section>
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

function bindSettingsControls() {
  modalBody.querySelectorAll("[data-setting-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const settingName = button.dataset.settingToggle;

      if (settingName === "ambientMusic") {
        audioManager.setMusicEnabled(!settingsState.ambientMusic);
      } else if (settingName === "soundEffects") {
        audioManager.setSfxEnabled(!settingsState.soundEffects);
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

async function checkUpdatesFromSettings() {
  const button = modalBody.querySelector("#checkUpdatesButton");
  const statusText = modalBody.querySelector("#updateStatusText");

  if (updateStatusCache?.update_available && updateStatusCache.release_url) {
    window.open(updateStatusCache.release_url, "_blank", "noopener");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Checking";
  }

  if (statusText) {
    statusText.textContent = "Querying GitHub Releases";
  }

  updateStatusCache = await callPythonBackend("get_update_status");

  if (statusText) {
    statusText.textContent = updateStatusText();
  }

  if (button) {
    button.disabled = false;
    button.textContent = updateStatusCache?.update_available ? "Open release" : "Check for updates";
  }
}

function showSettings() {
  finishMissionIntro();

  if (trainingStarted && !missionCompleted) {
    setMompyState("idle");
  }

  openModal({
    title: "Settings",
    body: renderSettingsBody(),
    actions: [
      {
        label: "Exit",
        onClick: confirmExitApp,
      },
    ],
  });
  bindSettingsControls();
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
        onClick: () => {
          resetProgress();
          closeModal();

          if (trainingStarted) {
            output.textContent = "Progress reset.";
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
  console.log("Logging out current user");
  clearUserProfile();
}

function exitApp() {
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
  startMompySprite.src = ASSETS.idle;

  if (output) {
    output.textContent = "Mompy: Exiting app.";
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
    const message = `Mompy: Couldn't change fullscreen mode.\n${error.message}`;

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

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || button.id === "runButton") {
    return;
  }

  audioManager.playClick();
});

editor.addEventListener("input", updateLineNumbers);
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
loadUserProfile();
loadProgress();
loadBriefingProgress();
renderMission(currentMission());
editor.value = currentMission().starterCode || editor.value;
updateLineNumbers();
updateFullscreenButton();
startLoadingSequence();

const isLocalPreview = ["localhost", "127.0.0.1"].includes(location.hostname);

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
