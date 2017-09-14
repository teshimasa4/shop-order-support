$(function() {
	'use strict';

	var app = {
			cacheLastUpdateTime: undefined
	};

	$('input#item_cd').blur(function(event) {

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
					console.log('[Data] fetch OK');
					app.updateItemByFetch(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log('[Data] fetch NG');
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
		$('#item_nm').text(data.item_nm);
		$('#item_category_cd').val(data.item_category_cd);
		$('#item_category_nm').text(data.item_category_nm);
		$('#order_quantity').val(data.min_order_quantity);
	};

	app.clearItem = function() {
		$('#item_cd').val('');
		$('#item_nm').text('');
		$('#item_category_cd').val('');
		$('#item_category_nm').text('');
		$('#order_quantity').val('');
	};

	$('button#save').click(function(event) {
		console.log('save');

		var order = {
			user_cd: $('#user_cd').val(),
			order_date: new Date(),
			shop_cd: $('#shop_cd').val(),
			item_cd: $('#item_cd').val(),
			item_nm: $('#item_nm').text(),
			item_category_cd: $('#item_category_cd').val(),
			item_category_nm: $('#item_category_nm').text(),
			order_quantity: $('#order_quantity').val(),
			order_time: new Date(),
			registed: false,
			regist_date: undefined
		};

		module.add(order);
		app.clearItem();
	});
});
