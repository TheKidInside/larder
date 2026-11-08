// Replaces the old Larder offline worker: deletes its cached copy of the app,
// removes itself and sends any open Larder page to the new address, /grocer/.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('larder-')) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate('/grocer/');
  })());
});
