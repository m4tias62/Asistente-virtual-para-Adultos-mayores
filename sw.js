// Service Worker para la Tarjeta Experta
// Esta versión (v4) se utiliza para invalidar cachés anteriores y
// garantizar que la última versión de los archivos se descargue.
const CACHE = "tarjeta-experta-v5";
const ASSETS = [
  "./",            // índice (redirige a voice-agent.html)
  "./index.html",
  "./voice-agent.html",
  "./manifest.json"
  // Iconos opcionales se pueden agregar aquí si existen
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
