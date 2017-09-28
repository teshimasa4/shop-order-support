'use strict';

app.order.regist = {
		constants: {},
		events: {},
		modules: {}
};

app.order.regist.events = {
		document_ready: function() {
			console.log('[Event] document ready');

			var userCd = $('#user_cd').val();
			var shopCd = $('#shop_cd').val();
			var orderDate = app.utils.date.today();

			dbModule.getByOrderDate(userCd, shopCd, orderDate).then(
					function(result) {
						console.log(result);
						app.order.regist.modules.show(result);
					}
			);
		},

		button_regist_click: function(event) {
			console.log('[Event] button regist click');

			var param = [];
			$.each($('table#regist_data tbody tr:not(:first, .info)'), function() {
				if($(this).find('#send:checked').val()) {
					var order = {
							user_cd: $('#user_cd').val(),
							shop_cd: $('#shop_cd').val(),
							item_cd: $(this).find('#item_cd').val(),
							order_quantity: $(this).find('#order_quantity').val(),
							idb_key: $(this).find('#idb_id').val()
					};
					param.push(order);
				}
			});

			app.order.regist.modules.regist(param);
		}
};

app.order.regist.modules = {
		show: function(data) {
			console.log('[Module] show');

			data.forEach(function(value, index, array) {

				var sended = (value.regist_time === undefined ? true:false);

				$('#regist_data tbody > tr:last').after(
						'<tr ' + createTrStyle() +'>'
							+ '<td>' + createSendCheckbox() + '</td>'
							+ '<td>' + value.item_nm + '<input type="hidden" id="item_cd" value="' + value.item_cd + '"></input></td>'
							+ '<td>' + value.item_category_nm + '</td>'
							+ '<td>' + createOrderQuantity() + '</td>'
							+ '<td>' + app.utils.date.format(value.input_time, 'YYYY/MM/DD HH:mm:ss') + '</td>'
							+ '<td><input type="hidden" id="idb_id" value="' + value.id + '"></td>'
						+ '</tr>'
						);

				function createTrStyle() {
					if (sended) {
						return '';
					} else {
						return 'class="info"';
					}
				}

				function createSendCheckbox() {
					if (sended) {
						return '<input type="checkbox" id="send" checked="checked">';
					} else {
						return '';
					}
				}

				function createOrderQuantity() {
					if (sended) {
						return '<input type="text" id="order_quantity" value="' + value.order_quantity + '"></input>';
					} else {
						return value.order_quantity;
					}
				}
			});
		},

		regist: function(param) {
			console.log('[Module] regist');
			console.log(param);

			var url = app.constants.root_url + '/order/regist/orders';

			$.ajax({
				url: url,
				type:'POST',
				dataType: 'json',
				contentType: 'application/json',
				scriptCharset: 'utf-8',
				data: JSON.stringify(param)
			})
			.done(function() {
				console.log('[Data] regist OK');
				app.order.regist.modules.update(param);
			})
			.fail(function(XMLHttpRequest, textStatus, errorThrown) {
					console.log('[Data] regist NG ' + textStatus);
			});
		},

		update: function(param) {
			console.log('[Module] update');

			var nowTime = new Date();
			param.forEach(function(value, index, array) {
				dbModule.updateRegistTime(value.idb_key, nowTime);
			});

			location.reload();
		}
};


$(function() {
	dbModule.init().then(
			app.order.regist.events.document_ready
	);

	$('button#regist').click(function(event) {
		app.order.regist.events.button_regist_click(event);
	});
});
