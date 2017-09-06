$(function() {
	'use strict';

	$('#navigation').slimmenu(
		{
		    resizeWidth: '767',
		    collapserTitle: 'Menu'
		}
	);
});

function logout() {

	navigator.serviceWorker.getRegistrations()
		.then(function(registrations) {
			for(let registration of registrations) {
				registration.unregister()
			}
		});

	$('#logout').submit();
}