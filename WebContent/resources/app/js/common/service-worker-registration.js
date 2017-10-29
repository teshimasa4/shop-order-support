'use strict';

(function() {

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register(app.constants.root_url + '/service-worker.js')
			.then(function() {
				console.log('Service Worker Registered');
			});
	}
})();