(function() {
	'use strict';

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/shop-order-support/service-worker.js')
			.then(function() { console.log('Service Worker Registered');});
	}

})();