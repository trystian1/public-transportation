var cacheName = 'cache-v3';

self.addEventListener('install', function(event) {
  console.log('INSTALL');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        '../fonts/style.css',
        'https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic',
        '../bundle.js',
        '../fonts/icomoon.ttf?xgm77o'
      ])
    })
  )
});

self.addEventListener('fetch', function(event) {

  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});
