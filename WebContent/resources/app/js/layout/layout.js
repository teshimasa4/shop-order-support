'use strict';

$(function() {

	$('.drawer').drawer({
	});

	$('a#logout').click(function() {
		console.log('logout');
		$('form#logout').submit();
	});
});
