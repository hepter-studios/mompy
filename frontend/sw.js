const CACHE_NAME = "mompy-v81";
const FILES = [
  "./",
  "./index.html",
  "./css/styles.css?v=57",
  "./js/content-i18n.js?v=1",
  "./js/app.js?v=81",
  "./manifest.webmanifest",
  "./assets/grade.png",
  "./assets/grade_entrada.png",
  "./assets/mompy_loading_base.png",
  "./assets/hepterakt_boot_monitor.png",
  "./assets/mompy_idle.ico",
  "./assets/mompy_idle.png",
  "./assets/mompy_look_side.png",
  "./assets/mompy_talk_1.png",
  "./assets/mompy_talk_2.png",
  "./assets/mompy_happy.png",
  "./assets/mompy_sad.png",
  "./assets/mompy_front.png?v=5",
  "./assets/mompy_gaze_transition.png?v=1",
  "./assets/mompy_front_blink.png?v=1",
  "./assets/mompy_achievements.png?v=1",
  "./assets/mompy_settings.png?v=1",
  "./assets/mompy_celebrate.png",
  "./assets/mompy_shutdown.png",
  "./assets/achievements/achievement-star-terminal.png",
  "./assets/achievements/achievement-sinal-de-retorno.png?v=1",
  "./assets/achievements/achievement-tres-dias-online.png?v=1",
  "./assets/achievements/achievement-sequencia-inicial-turquoise.png?v=1",
  "./assets/achievements/achievement-semana-de-codigo-turquoise.png?v=1",
  "./assets/achievements/achievement-semana-sem-desligar-blue.png?v=1",
  "./assets/achievements/achievement-operador-frequente-blue.png?v=1",
  "./assets/achievements/achievement-mes-no-console-purple.png?v=1",
  "./assets/achievements/achievement-sinal-trimestral-purple.png?v=1",
  "./assets/achievements/achievement-semestre-programacao-gold.png?v=1",
  "./assets/achievements/achievement-companheiro-do-mompy-gold.png?v=1",
  "./assets/desligando5.png",
  "./assets/desligando2.png",
  "./assets/desligando3.png",
  "./assets/desligando4.png",
  "./assets/audio/click.wav",
  "./assets/audio/run.wav",
  "./assets/audio/success.wav",
  "./assets/audio/error.wav",
  "./assets/audio/shutdown.wav",
  "./assets/audio/mompy_crt_ambient_loop_minimal.wav",
  "./assets/name_mompy.png",
  "./assets/hepterakt_boot_logo_green.png",
  "./assets/settings.svg",
  "./assets/square-arrow-up-left.svg",
  "./assets/square-arrow-down-right.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
