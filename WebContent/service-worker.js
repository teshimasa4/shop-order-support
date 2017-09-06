'use strict';

var cacheName = 'shop-order-support_0.0.1';
var dataCacheName = 'shop-order-support_data_0.0.1';
var filesToCache = [
	'/shop-order-support/resources/bootstrap/css/bootstrap-3.3.7.min.css'

	, '/shop-order-support/resources/jquery/js/jquery-3.2.1.min.js'

	, '/shop-order-support/resources/jquery/css/slimmenu.min.css'
	, '/shop-order-support/resources/jquery/js/jquery.slimmenu.min.js'

	, '/shop-order-support/resources/app/css/common/common.css'

	, '/shop-order-support/resources/app/js/common/common.js'
	, '/shop-order-support/resources/app/js/common/header.js'

	, '/shop-order-support/resources/app/js/common/service-worker-registration.js'
];

self.addEventListener('install', function(e) {
	console.log('[Service Worker] Install');
	caches.delete(cacheName);

	e.waitUntil(
			caches.open(cacheName).then(function(cache) {
				console.log('[Service Worker] Caching app shell');
				return cache.addAll(filesToCache);
			})
	);
});

self.addEventListener('activate', function(e) {
	console.log('[Service Worker] Activate');
	e.waitUntil(
			caches.keys().then(function(keyList) {
				return Promise.all(keyList.map(function(key) {
					if (key !== cacheName && key !== dataCacheName) {
						console.log('[ServiceWorker] Removing old cache', key);
						return caches.delete(key);
					}
				}));
			})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	console.log('[Service Worker] Fetch', e.request.url);

	e.respondWith(
			caches.match(e.request).then(function(response) {

				if (response) {
					return response;
		        }

				var fetchRequest = e.request.clone();
				return fetch(fetchRequest).then(function(response) {

					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}

					var responseToCache = response.clone();
					caches.open(cacheName).then(function(cache) {
						cache.put(e.request, responseToCache);
					});

					return response;
				});

			})
	);
});
