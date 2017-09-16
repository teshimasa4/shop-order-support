'use strict';

app.order.input = {
		constants: {},
		events: {},
		modules: {}
};

app.order.input.events = {

		input_itemCd_blur: function(event) {
			console.log('[Event] input item_cd blur');

			var itemCd = $('#item_cd').val();
			var last_update_time = undefined;

			if(itemCd) {
				var url = app.constants.root_url + '/api/item?shop_cd=' + $('#shop_cd').val() + '&item_cd=' + itemCd;

				if ('caches' in window) {
					caches.match(url).then(function(response) {
						if (response) {
							response.json().then(function updateFromCache(data) {
								console.log('[Data] from cache');
								last_update_time = data.last_update_time;
								app.order.input.modules.updateItem(data);
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

						if(last_update_time === undefined || last_update_time < data.last_update_time) {
							console.log('[Result] use fetch (cache is nothing or old)');
							app.order.input.modules.updateItem(data);
						} else {
							console.log('[Result] use cache');
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log('[Data] fetch NG');
					}
				});
			}
		},

		button_save_click: function(event) {
			console.log('[Event] button save click');

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

			dbModule.add(order);
			app.order.input.modules.clearItem();
		}
};

app.order.input.modules = {

		updateItem: function(data) {
			console.log('[Module] updateItem');
			$('#item_nm').text(data.item_nm);
			$('#item_category_cd').val(data.item_category_cd);
			$('#item_category_nm').text(data.item_category_nm);
			$('#order_quantity').val(data.min_order_quantity);
		},

		clearItem: function() {
			console.log('[Module] clearItem');
			$('#item_cd').val('');
			$('#item_nm').text('');
			$('#item_category_cd').val('');
			$('#item_category_nm').text('');
			$('#order_quantity').val('');
		}
};


$(function() {

	$('input#item_cd').blur(function(event) {
		app.order.input.events.input_itemCd_blur(event);
	});

	$('button#save').click(function(event) {
		app.order.input.events.button_save_click(event);
	});
});
