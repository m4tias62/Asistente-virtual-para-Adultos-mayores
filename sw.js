// Service Worker para la Tarjeta Experta
// Versión 3: fuerza la descarga de los archivos actualizados.
const CACHE = "tarjeta-experta-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./voice-agent.html",
  "./manifest.json"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => { if (key !== CACHE) return caches.delete(key); }))
    )
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
