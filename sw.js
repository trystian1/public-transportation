var currentCacheName = 'cache-v5';

self.addEventListener('install', function(event) {
  console.log('INSTALL');
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
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

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('cache-') &&
                 cacheName !== currentCacheName
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
