$(function() {
	'use strict';

	var app = {};

	$('#item_cd').blur(function(event) {

		var item_cd = $('#item_cd').val();

		if(item_cd) {
			var url = 'http://localhost:8080/shop-order-support/api/item?shop_cd=' + $('#shop_cd').val() + '&item_cd=' + item_cd;

			if ('caches' in window) {
				caches.match(url).then(function(response) {
					if (response) {
						response.json().then(function updateFromCache(data) {
							console.log('[Data] from cache');
							app.updateItem('cache', data);
						});
					}
				});
			}

			console.log('[Data] from fetch');
			$.ajax({
				url: url,
				type:'GET',
				dataType: 'json',
				success: function(data) {
					console.log('データ取得OK');
					app.updateItem('fetch', data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log('データ取得NG');
				}
			});
		}
	});

	app.updateItem = function(from, data) {
		console.log(from + ' : ' + JSON.stringify(data));
		$('#item_name').text(data.item_name);
	};
});
