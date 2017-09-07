$(function() {
	'use strict';

	var app = {
			cacheLastUpdateTime: undefined
	};

	$('#item_cd').blur(function(event) {

		var itemCd = $('#item_cd').val();

		if(itemCd) {
			var url = '/shop-order-support/api/item?shop_cd=' + $('#shop_cd').val() + '&item_cd=' + itemCd;

			if ('caches' in window) {
				caches.match(url).then(function(response) {
					if (response) {
						response.json().then(function updateFromCache(data) {
							console.log('[Data] from cache');
							app.updateItemByCache(data);
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
					app.updateItemByFetch(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log('データ取得NG');
				}
			});
		}
	});

	app.updateItemByCache = function(data) {
		console.log(data);
		app.cacheLastUpdateTime = data.last_update_time;
		app.updateItem(data);
	};

	app.updateItemByFetch = function(data) {
		console.log(data);

		if(app.cacheLastUpdateTime === undefined) {
			console.log('no cache');
			app.updateItem(data);
		}

		if(app.cacheLastUpdateTime < data.last_update_time) {
			console.log('new data');
			app.updateItem(data);
		}
	};

	app.updateItem = function(data) {
		console.log('updateItem');
		$('#item_name').text(data.item_name);
		$('#item_category_name').text(data.item_category_name);
		$('#order_quantity').val(data.min_order_quantity);
	};
});
