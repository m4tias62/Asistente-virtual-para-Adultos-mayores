// Service Worker para la Tarjeta Experta
// Versión (v6): invalida cachés previas y toma control al instalar.
const CACHE = "tarjeta-experta-v6";
const ASSETS = ["./", "./index.html", "./voice-agent.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE && caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));
});
