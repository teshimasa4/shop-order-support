'use strict';

var cacheName = 'shop-order-support_0.0.1';
var dataCacheName = 'shop-order-support_data_0.0.1';
var filesToCache = [
	'/shop-order-support/resources/bootstrap/css/bootstrap-3.3.7.min.css'

	, '/shop-order-support/resources/jquery/js/jquery-3.2.1.min.js'

	, '/shop-order-support/resources/jquery/css/slimmenu.min.css'
	, '/shop-order-support/resources/jquery/js/jquery.slimmenu.min.js'


	, '/shop-order-support/resources/app/css/common/common.css'
	, '/shop-order-support/resources/app/css/layout/layout.css'


	, '/shop-order-support/resources/app/js/common/common.js'

	, '/shop-order-support/resources/app/js/common/service-worker-registration.js'
	, '/shop-order-support/resources/app/js/common/indexedDB-registration.js'

	, '/shop-order-support/resources/app/js/layout/header.js'

	, '/shop-order-support/resources/app/js/order/input.js'

];

self.addEventListener('install', function(e) {
	console.log('[Service Worker] Install');
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

	if (e.request.url.indexOf('/login') > -1) {
		return fetch(e.request);
	} else if (e.request.url.indexOf('/logout') > -1) {
		caches.delete(cacheName);
		return fetch(e.request);
	} else 	if (e.request.url.indexOf('/api/') > -1) {
		e.respondWith(
				caches.open(dataCacheName).then(function(cache) {
					return fetch(e.request).then(function(response) {
						cache.put(e.request.url, response.clone());
						return response;
						});
					}
				)
		);
	} else {
		e.respondWith(
				caches.match(e.request).then(function(response) {

					if (response) {
						console.log('[Service Worker] from cache');
						return response;
			        }

					var fetchRequest = e.request.clone();
					return fetch(fetchRequest).then(function(response) {

						if (!response || response.status !== 200 || response.type !== 'basic') {
							console.log('[Service Worker] NG response');
							return response;
						}

						var responseToCache = response.clone();
						caches.open(cacheName).then(function(cache) {
							cache.put(e.request.url, responseToCache);
						});

						console.log('[Service Worker] from fetch');
						return response;
					});

				})
		);
	}
});
