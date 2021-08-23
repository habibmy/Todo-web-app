var CACHE_NAME = 'v2.1';
var urlsToCache = [
    'index.html',
    'style.css',
    'app.js',
    'favicon.ico',
    'manifest.json',
    'icons/icon512.png',
    'icons/icon256.png',
    'icons/icon128.png',
    'icons/icon64.png',
    'icons/icon32.png'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

self.addEventListener('activate', function (event) {

    var cacheAllowlist = ['v1'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
