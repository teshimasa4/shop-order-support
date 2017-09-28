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

			if (param.length > 0) {
				app.order.regist.modules.regist(param);
			} else {
				console.log('no selected');
			}

		},

		button_delete_click: function(element, event) {
			console.log('[Event] button delete click');

			var idb_id = element.parents('tr').find('#idb_id').val();
			app.order.regist.modules.delete(idb_id);

			element.parents('tr').fadeOut(500, function() {$(this).remove();});
		}
};

app.order.regist.modules = {
		show: function(data) {
			console.log('[Module] show');

			data.forEach(function(value, index, array) {

				var sended = (value.regist_time === undefined ? false:true);
				var style = app.order.regist.modules.style(sended);

				$('#regist_data tbody > tr:last').after(
						'<tr ' + style.tr() +'>'
							+ '<td>' + style.sendCheckbox() + '</td>'
							+ '<td>' + value.item_nm + '</td>'
							+ '<td>' + value.item_category_nm + '</td>'
							+ '<td>' + style.orderQuantity(value.order_quantity) + '</td>'
							+ '<td>' + app.utils.date.format(value.input_time, 'YYYY/MM/DD HH:mm:ss') + '</td>'
							+ '<td>' + style.trashIcon() + '</td>'
							+ '<td>'
								+ '<input type="hidden" id="item_cd" value="' + value.item_cd + '"></input>'
								+ '<input type="hidden" id="idb_id" value="' + value.id + '">'
							+ '</td>'
						+ '</tr>'
						);
			});

			$('button#delete').click(function(event) {
				app.order.regist.events.button_delete_click($(this), event);
			});
		},

		style: function(sended) {
			return {
				tr: function() {
					if (sended) {
						return 'class="info"';
					} else {
						return '';
					}
				},

				sendCheckbox: function() {
					if (sended) {
						return '';
					} else {
						return '<input type="checkbox" id="send" checked="checked">';
					}
				},

				orderQuantity: function(orderQuantity) {
					if (sended) {
						return orderQuantity;
					} else {
						return '<input type="number" id="order_quantity" value="' + orderQuantity + '"></input>';
					}
				},

				trashIcon() {
					if (sended) {
						return '';
					} else {
						return '<button id="delete" class="btn btn-link"><span class="glyphicon glyphicon-trash"></span></button>';
					}
				}
			};
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
				dbModule.updateRegistTime(value.idb_key, value.order_quantity, nowTime);
			});

			$('table#regist_data tbody tr:not(:first)').remove();
			app.order.regist.events.document_ready();
		},

		delete: function(id) {
			console.log('[Module] delete(' + id + ')');
			dbModule.delete(id);
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
