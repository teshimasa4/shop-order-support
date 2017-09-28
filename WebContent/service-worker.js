'use strict';

var root = 'shop-order-support';
var cacheName = root + '_0.0.1';
var dataCacheName = root + '_data_0.0.1';

var filesToCache = [
	'/' + root + '/manifest.json'
//	, fetch('/' + root + '/', {credentials: 'include'})

	, '/' + root + '/resources/jquery/js/jquery-3.2.1.min.js'

	, '/' + root + '/resources/bootstrap/css/bootstrap-3.3.7.min.css'
	, '/' + root + '/resources/bootstrap/js/dropdown-3.3.7.js'

	, '/' + root + '/resources/jquery/css/drawer.min-3.2.2.css'
	, '/' + root + '/resources/jquery/js/iscroll-5.2.0.js'
	, '/' + root + '/resources/jquery/js/drawer.min-3.2.2.js'

	, '/' + root + '/resources/moment/js/moment-2.18.1.js'



	, '/' + root + '/resources/app/css/common/common.css'
	, '/' + root + '/resources/app/js/common/common.js'

	, '/' + root + '/resources/app/css/layout/layout.css'
	, '/' + root + '/resources/app/js/layout/layout.js'

	, '/' + root + '/resources/app/js/common/service-worker-registration.js'
	, '/' + root + '/resources/app/js/common/indexedDB-registration.js'


	, '/' + root + '/resources/app/js/order/common.js'
	, '/' + root + '/resources/app/js/order/input.js'
	, '/' + root + '/resources/app/js/order/regist.js'
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
	} else if (e.request.url.indexOf('/api/') > -1) {
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

						if (!response) {
							console.log('[Service Worker] No response');
							return response;
						}

						if (response.status !== 200 && response.status !== 201) {
							console.log('[Service Worker] NG response.status: ' + response.status);
							return response;
						}

						if (response.type !== 'basic') {
							console.log('[Service Worker] NG response.type: ' + response.type);
							return response;
						}

						var responseToCache = response.clone();
						caches.open(cacheName).then(function(cache) {
							if (e.request.method === 'GET') {
								cache.put(e.request, responseToCache);
							}
						});

						console.log('[Service Worker] from fetch');
						return response;
					});

				})
		);
	}
});
