// Service worker do Alemanha 27.
// Página: rede primeiro (as atualizações aparecem na hora); sem internet, usa a cópia guardada.
// Dados da nuvem (Apps Script), clima e tradutor nunca passam pelo cache.
const CACHE = 'alemanha27-v2';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // APIs externas: direto na rede

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          // página aberta por "compartilhar" (?share_url=...) é guardada como a página principal
          const key = req.mode === 'navigate' ? './' : req;
          caches.open(CACHE).then((c) => c.put(key, copy));
        }
        return res;
      })
      .catch(() => caches.match(req.mode === 'navigate' ? './' : req, { ignoreSearch: true }))
  );
});
