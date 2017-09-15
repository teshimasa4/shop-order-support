(function() {
	'use strict';

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register(ROOT_URL + '/service-worker.js')
			.then(function() { console.log('Service Worker Registered');});
	}

})();