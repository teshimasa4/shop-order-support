$(function() {
	'use strict';

	$('#navigation').slimmenu(
		{
		    resizeWidth: '767',
		    collapserTitle: 'Menu'
		}
	);

	$('a#logout').click(function() {
		console.log('logout');
		$('form#logout').submit();
	});
});
