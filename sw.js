const CACHE_NAME = "phuquoc-v1";

// ✅ 여기 목록에 있는 파일이 “오프라인에서 보장”됩니다.
// 사진을 추가하면 여기에 파일명도 같이 추가해 주세요.
const ASSETS = [
  "./",
  "./index.html",
  "./spots.html",
  "./food.html",
  "./tips.html",
  "./emergency.html",
  "./styles.css",
  "./manifest.json",
  "./assets/cover.jpg",
  "./assets/spot1.jpg",
  "./assets/food1.jpg",
  "./assets/tip1.jpg",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())))
    ).then(() => self.clients.claim())
  );
});

// 기본: 캐시 우선 → 없으면 네트워크
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});