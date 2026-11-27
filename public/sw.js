/* RCCG Beautiful Gate service worker: installable app + offline support.
 *
 * - Public pages: network first, saved as people visit them, served from the cache when offline.
 * - App files and images: cached for speed.
 * - Private areas (/admin, /workers, /api, sign-in) are NEVER stored: they hold personal data.
 *   When offline they show the offline page instead.
 * - Anything else falls back to /offline.
 *   Failed navigations are redirected to /offline?from=<page> rather than showing the offline page at
 *   the original address: if the address and the page didn't match, Next.js would force a reload,
 *   which fails offline.
 * Bump VERSION to clear old caches after big changes.
 */
const VERSION = "bg-v3";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;
const IMAGES = `${VERSION}-images`;
const OFFLINE_URL = "/offline";
const PRECACHE = [OFFLINE_URL, "/", "/icons/icon192x192.png"];
const PRIVATE = [/^\/admin/, /^\/workers/, /^\/api\//, /^\/sign-in/, /^\/sign-up/, /^\/sso-callback/];
const MAX_IMAGES = 80;

const cacheable = (res) => res && res.ok && res.type === "basic" && !res.redirected;

// Script/style files a page needs (from its HTML, including the RSC data Next inlines), so the
// offline page can start without a connection. Otherwise Next forces a reload, which fails offline.
const assetsIn = (html) => [
  ...new Set(
    [...html.matchAll(/(?:\/_next\/)?static\/(?:chunks|css|media)\/[^"'\\\s)]+/g)].map((m) => `/_next/${m[0].replace(/^\/_next\//, "")}`)
  ),
];

async function precache() {
  const pages = await caches.open(PAGES);
  const assets = await caches.open(ASSETS);
  await Promise.all(
    PRECACHE.map(async (url) => {
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!cacheable(res)) return;
        await pages.put(url, res.clone());
        if ((res.headers.get("content-type") || "").includes("text/html")) {
          const files = assetsIn(await res.text());
          await Promise.all(files.map((f) => assets.add(f).catch(() => undefined)));
        }
      } catch {
        /* offline during install: try again next time */
      }
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const toOffline = (url) =>
  url.pathname === OFFLINE_URL
    ? caches.match(OFFLINE_URL)
    : Response.redirect(`${OFFLINE_URL}?from=${encodeURIComponent(url.pathname + url.search)}`, 302);

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // React Server Component payloads (client-side navigation): leave to the network.
  if (req.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  const isPrivate = PRIVATE.some((re) => re.test(url.pathname));

  if (req.mode === "navigate") {
    if (isPrivate) {
      // Never cache private pages; just show the offline page if there's no connection.
      event.respondWith(fetch(req).catch(() => toOffline(url)));
      return;
    }
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (cacheable(res)) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(async () => (url.pathname !== OFFLINE_URL && (await caches.match(req))) || toOffline(url))
    );
    return;
  }

  if (isPrivate) return;

  // Hashed build files never change: cache first.
  if (url.pathname.startsWith("/_next/static/") || /\.(?:woff2?|ttf|ico|webmanifest)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (cacheable(res)) {
              const copy = res.clone();
              caches.open(ASSETS).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
    return;
  }

  // Images: show the saved copy straight away and refresh it in the background.
  if (url.pathname.startsWith("/_next/image") || /\.(?:png|jpe?g|webp|gif|svg|avif)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGES).then(async (cache) => {
        const hit = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (cacheable(res)) cache.put(req, res.clone()).then(() => trim(IMAGES, MAX_IMAGES));
            return res;
          })
          .catch(() => hit);
        return hit || network;
      })
    );
  }
});
