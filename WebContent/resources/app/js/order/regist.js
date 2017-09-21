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
						app.order.regist.modules.updateData(result);
					}
			);
		},

		button_regist_click: function(event) {
			console.log('[Event] button regist click');

			// TODO
		}
};

app.order.regist.modules = {
		updateData: function(data) {
			console.log('[Module] updateData');

			data.forEach(function(value, index, array) {

				$('#regist_data tbody > tr:last').after(
						'<tr id="data_id_' + value.id +'"' + createTrStyle() +'>'
							+ '<td>' + createCheckbox() + '</td>'
							+ '<td>' + value.item_nm + '</td>'
							+ '<td>' + value.item_category_nm + '</td>'
							+ '<td>' + value.order_quantity + '</td>'
							+ '<td>' + app.utils.date.format(value.input_time, 'YYYY/MM/DD HH:mm:ss') + '</td>'
							+ '<td></td>'
						+ '</tr>'
						);

				function createTrStyle() {
					if (value.regist_time === undefined) {
						return '';
					} else {
						return 'class="info"';
					}
				}

				function createCheckbox() {
					if (value.regist_time === undefined) {
						return '<input type="checkbox" id="send" checked="checked">';
					} else {
						return '';
					}
				}
			});
		},

		regist: function(data) {
			console.log('[Module] regist');

			// TODO
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
